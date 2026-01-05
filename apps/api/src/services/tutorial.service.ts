import { callLLM } from "./llm.service.js";
import { crawlGitHubFiles, crawlSelectedFiles, parseGitHubUrl } from "./github-crawler.service.js";

// Types for tutorial generation
interface FileData {
  path: string;
  content: string;
}

interface Abstraction {
  name: string;
  description: string;
  files: number[]; // indices into files array
}

interface Relationship {
  from: number;
  to: number;
  label: string;
}

interface RelationshipsData {
  summary: string;
  details: Relationship[];
}

export interface ChapterFile {
  filename: string;
  content: string;
}

interface TutorialResult {
  projectName: string;
  indexContent: string;
  chapters: ChapterFile[];
  mermaidDiagram: string;
}

export interface GenerateTutorialOptions {
  repoUrl: string;
  language?: string;
  maxAbstractions?: number;
  maxFiles?: number;
  selectedFiles?: string[] | undefined; // Optional: specific file paths to use
}

/**
 * Helper to get content for specific file indices
 */
function getContentForIndices(
  files: FileData[],
  indices: number[]
): Map<string, string> {
  const contentMap = new Map<string, string>();
  for (const i of indices) {
    if (i >= 0 && i < files.length) {
      const file = files[i];
      if (file) {
        const { path, content } = file;
        contentMap.set(`${i} # ${path}`, content);
      }
    }
  }
  return contentMap;
}

/**
 * Parse JSON from LLM response
 */
function parseJsonFromResponse(response: string): any {
  // Try to find JSON block in markdown code fence
  const jsonMatch = response.match(/```json\n?([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    return JSON.parse(jsonMatch[1].trim());
  }
  
  // Try to find raw JSON array or object
  const rawJsonMatch = response.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (rawJsonMatch && rawJsonMatch[1]) {
    return JSON.parse(rawJsonMatch[1]);
  }
  
  throw new Error("No JSON block found in LLM response");
}

/**
 * Step 1: Identify core abstractions in the codebase
 */
async function identifyAbstractions(
  files: FileData[],
  projectName: string,
  language: string,
  maxAbstractions: number
): Promise<Abstraction[]> {
  console.log("Identifying abstractions using LLM...");

  // Send full file content
  const codeContext = files.map((f, i) => `--- File ${i}: ${f.path} ---\n${f.content}`).join("\n\n");
  console.log(`Full content context: ${(codeContext.length / 1024).toFixed(1)}KB`);

  // Build file listing for reference
  const fileListingForPrompt = files
    .map((f, i) => `- ${i} # ${f.path}`)
    .join("\n");

  const languageInstruction = language.toLowerCase() !== "english"
    ? `IMPORTANT: Generate the \`name\` and \`description\` for each abstraction in **${language}** language. Do NOT use English for these fields.\n\n`
    : "";

  const prompt = `
For the project \`${projectName}\`:

${codeContext}

${languageInstruction}Based on the codebase above, identify the top 5-${maxAbstractions} core most important abstractions to help those new to the codebase understand it.

For each abstraction, provide:
1. A concise \`name\`.
2. A beginner-friendly \`description\` explaining what it is with a simple analogy, in around 100 words.
3. A list of relevant \`file_indices\` (integers only).

File indices reference:
${fileListingForPrompt}

Format the output as a JSON array:

\`\`\`json
[
  {
    "name": "Query Processing",
    "description": "Explains what the abstraction does. It's like a central dispatcher routing requests.",
    "file_indices": [0, 3]
  },
  {
    "name": "Query Optimization",
    "description": "Another core concept, similar to a blueprint for objects.",
    "file_indices": [5]
  }
]
\`\`\`

Now, provide ONLY the JSON output (up to ${maxAbstractions} abstractions):`;

  const response = await callLLM(prompt);
  const abstractionsRaw = parseJsonFromResponse(response);

  if (!Array.isArray(abstractionsRaw)) {
    throw new Error("LLM output is not a list");
  }

  const validatedAbstractions: Abstraction[] = [];
  
  for (const item of abstractionsRaw) {
    if (!item.name || !item.description || !item.file_indices) {
      throw new Error(`Missing keys in abstraction item: ${JSON.stringify(item)}`);
    }

    const validatedIndices: number[] = [];
    for (const idxEntry of item.file_indices) {
      let idx: number;
      if (typeof idxEntry === "number") {
        idx = idxEntry;
      } else if (typeof idxEntry === "string" && idxEntry.includes("#")) {
        const parts = idxEntry.split("#");
        const firstPart = parts[0];
        idx = firstPart ? parseInt(firstPart.trim(), 10) : -1;
      } else {
        idx = parseInt(String(idxEntry).trim(), 10);
      }

      if (idx >= 0 && idx < files.length) {
        validatedIndices.push(idx);
      }
    }

    validatedAbstractions.push({
      name: String(item.name).trim(),
      description: String(item.description).trim(),
      files: [...new Set(validatedIndices)].sort((a, b) => a - b),
    });
  }

  console.log(`Identified ${validatedAbstractions.length} abstractions.`);
  return validatedAbstractions;
}

/**
 * Step 2: Analyze relationships between abstractions
 */
async function analyzeRelationships(
  abstractions: Abstraction[],
  files: FileData[],
  projectName: string,
  language: string
): Promise<RelationshipsData> {
  console.log("Analyzing relationships using LLM...");

  const numAbstractions = abstractions.length;
  const abstractionInfoForPrompt: string[] = [];

  // Create context with abstractions info
  let context = "Identified Abstractions:\n";
  for (let i = 0; i < abstractions.length; i++) {
    const abstr = abstractions[i];
    if (!abstr) continue;
    const fileIndicesStr = abstr.files.join(", ");
    context += `- Index ${i}: ${abstr.name} (Relevant file indices: [${fileIndicesStr}])\n  Description: ${abstr.description}\n`;
    abstractionInfoForPrompt.push(`${i} # ${abstr.name}`);
  }

  // Get relevant file indices
  const seenIndices = new Set<number>();
  for (const abstr of abstractions) {
    if (!abstr) continue;
    for (const idx of abstr.files) {
      seenIndices.add(idx);
    }
  }

  // Send full content
  context += "\nRelevant Files Content:\n";
  for (const idx of seenIndices) {
    const file = files[idx];
    if (file) {
      context += `\n--- File ${idx}: ${file.path} ---\n${file.content}\n`;
    }
  }
  console.log(`Relationships context: ${(context.length / 1024).toFixed(1)}KB`);

  const languageInstruction = language.toLowerCase() !== "english"
    ? `IMPORTANT: Generate the \`summary\` and relationship \`label\` fields in **${language}** language. Do NOT use English for these fields.\n\n`
    : "";

  const prompt = `
Based on the following abstractions and their code structure from the project \`${projectName}\`:

List of Abstraction Indices and Names:
${abstractionInfoForPrompt.join("\n")}

Context (Abstractions, Descriptions, File Structure):
${context}

${languageInstruction}Please provide:
1. A high-level \`summary\` of the project's main purpose and functionality in a few beginner-friendly sentences.
2. A list (\`relationships\`) describing the key interactions between these abstractions. For each relationship, specify:
    - \`from\`: Index of the source abstraction (integer)
    - \`to\`: Index of the target abstraction (integer)
    - \`label\`: A brief label for the interaction in just a few words (e.g., "Manages", "Inherits", "Uses").

IMPORTANT: Make sure EVERY abstraction is involved in at least ONE relationship (either as source or target).

Format the output as JSON:

\`\`\`json
{
  "summary": "A brief, simple explanation of the project.",
  "relationships": [
    { "from": 0, "to": 1, "label": "Manages" },
    { "from": 2, "to": 0, "label": "Provides config" }
  ]
}
\`\`\`

Now, provide ONLY the JSON output:
`;

  const response = await callLLM(prompt);
  const relationshipsData = parseJsonFromResponse(response);

  if (!relationshipsData.summary || !relationshipsData.relationships) {
    throw new Error("LLM output missing 'summary' or 'relationships'");
  }

  const validatedRelationships: Relationship[] = [];
  
  for (const rel of relationshipsData.relationships) {
    if (rel.from === undefined || rel.to === undefined) continue;
    
    let fromIdx = -1;
    if (typeof rel.from === 'number') {
      fromIdx = rel.from;
    } else {
      const parts = String(rel.from).split("#");
      if (parts.length > 0 && parts[0]) {
        fromIdx = parseInt(parts[0].trim(), 10);
      }
    }

    let toIdx = -1;
    if (typeof rel.to === 'number') {
      toIdx = rel.to;
    } else {
      const parts = String(rel.to).split("#");
      if (parts.length > 0 && parts[0]) {
        toIdx = parseInt(parts[0].trim(), 10);
      }
    }

    if (fromIdx >= 0 && fromIdx < numAbstractions && toIdx >= 0 && toIdx < numAbstractions) {
      validatedRelationships.push({
        from: fromIdx,
        to: toIdx,
        label: String(rel.label),
      });
    }
  }

  console.log("Generated project summary and relationship details.");
  return {
    summary: String(relationshipsData.summary),
    details: validatedRelationships,
  };
}

/**
 * Step 3: Determine chapter order
 */
async function orderChapters(
  abstractions: Abstraction[],
  relationships: RelationshipsData,
  projectName: string
): Promise<number[]> {
  console.log("Determining chapter order using LLM...");

  const abstractionListing = abstractions
    .map((a, i) => `- ${i} # ${a.name}`)
    .join("\n");

  let context = `Project Summary:\n${relationships.summary}\n\n`;
  context += "Relationships (Indices refer to abstractions above):\n";
  
  for (const rel of relationships.details) {
    const fromAbstr = abstractions[rel.from];
    const toAbstr = abstractions[rel.to];
    
    if (fromAbstr && toAbstr) {
      const fromName = fromAbstr.name;
      const toName = toAbstr.name;
      context += `- From ${rel.from} (${fromName}) to ${rel.to} (${toName}): ${rel.label}\n`;
    }
  }

  const prompt = `
Given the following project abstractions and their relationships for the project \`${projectName}\`:

Abstractions (Index # Name):
${abstractionListing}

Context about relationships and project summary:
${context}

If you are going to make a tutorial for \`${projectName}\`, what is the best order to explain these abstractions, from first to last?
Ideally, first explain those that are the most important or foundational, perhaps user-facing concepts or entry points. Then move to more detailed, lower-level implementation details or supporting concepts.

Output the ordered list of abstraction indices as a JSON array of integers.

\`\`\`json
[2, 0, 1, 3]
\`\`\`

Now, provide ONLY the JSON array:
`;

  const response = await callLLM(prompt);
  const orderedIndicesRaw = parseJsonFromResponse(response);

  if (!Array.isArray(orderedIndicesRaw)) {
    throw new Error("LLM output is not a list");
  }

  const orderedIndices: number[] = [];
  const seenIndices = new Set<number>();

  for (const entry of orderedIndicesRaw) {
    let idx: number;
    if (typeof entry === "number") {
      idx = entry;
    } else if (typeof entry === "string" && entry.includes("#")) {
      const parts = entry.split("#");
      const firstPart = parts[0];
      idx = firstPart ? parseInt(firstPart.trim(), 10) : -1;
    } else {
      idx = parseInt(String(entry).trim(), 10);
    }

    if (idx >= 0 && idx < abstractions.length && !seenIndices.has(idx)) {
      orderedIndices.push(idx);
      seenIndices.add(idx);
    }
  }

  // Add any missing abstractions at the end
  for (let i = 0; i < abstractions.length; i++) {
    if (!seenIndices.has(i)) {
      orderedIndices.push(i);
    }
  }

  console.log(`Determined chapter order: ${orderedIndices}`);
  return orderedIndices;
}

/**
 * Step 4: Write individual chapters
 */
async function writeChapters(
  chapterOrder: number[],
  abstractions: Abstraction[],
  files: FileData[],
  projectName: string,
  language: string
): Promise<string[]> {
  console.log(`Writing ${chapterOrder.length} chapters...`);

  // Create chapter filename mapping
  const chapterFilenames: Map<number, { num: number; name: string; filename: string }> = new Map();
  const allChapters: string[] = [];

  for (let i = 0; i < chapterOrder.length; i++) {
    const abstractionIndex = chapterOrder[i];
    if (abstractionIndex === undefined) continue;

    const chapterNum = i + 1;
    const abstraction = abstractions[abstractionIndex];
    
    if (!abstraction) continue;

    const chapterName = abstraction.name;
    const safeName = chapterName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const filename = `${String(chapterNum).padStart(2, "0")}_${safeName}.md`;
    
    chapterFilenames.set(abstractionIndex, { num: chapterNum, name: chapterName, filename });
    allChapters.push(`${chapterNum}. [${chapterName}](${filename})`);
  }

  const fullChapterListing = allChapters.join("\n");
  const chapters: string[] = [];
  const chaptersWrittenSoFar: string[] = [];

  for (let i = 0; i < chapterOrder.length; i++) {
    const abstractionIndex = chapterOrder[i];
    if (abstractionIndex === undefined) continue;
    
    const abstraction = abstractions[abstractionIndex];
    
    if (!abstraction) continue;

    const chapterNum = i + 1;

    console.log(`Writing chapter ${chapterNum} for: ${abstraction.name}`);

    // Build context with full file content
    let fileContextStr = "## Relevant Code Files\n\n";
    let totalContextSize = 0;

    for (const fileIdx of abstraction.files) {
      const file = files[fileIdx];
      if (file) {
        fileContextStr += `### ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
        totalContextSize += file.content.length;
      }
    }
    
    console.log(`Chapter ${chapterNum} context: ${(totalContextSize / 1024).toFixed(1)}KB`);

    // Get previous and next chapter info
    const prevIdx = i > 0 ? chapterOrder[i - 1] : undefined;
    const nextIdx = i < chapterOrder.length - 1 ? chapterOrder[i + 1] : undefined;
    
    const prevChapter = prevIdx !== undefined ? chapterFilenames.get(prevIdx) : null;
    const nextChapter = nextIdx !== undefined ? chapterFilenames.get(nextIdx) : null;

    // Summarize previous chapters instead of including full content
    const previousChaptersSummary = chaptersWrittenSoFar.length > 0
      ? `Previous chapters covered: ${chaptersWrittenSoFar.map((_, idx) => {
          const prevAbstIdx = chapterOrder[idx];
          const prevAbst = prevAbstIdx !== undefined ? abstractions[prevAbstIdx] : null;
          return prevAbst ? prevAbst.name : "";
        }).filter(Boolean).join(", ")}`
      : "This is the first chapter.";

    const languageInstruction = language.toLowerCase() !== "english"
      ? `IMPORTANT: Write this ENTIRE tutorial chapter in **${language}**. Translate ALL content including explanations, examples, and technical terms. DO NOT use English except in code syntax.\n\n`
      : "";

    const prompt = `
${languageInstruction}Write a very beginner-friendly tutorial chapter (in Markdown format) for the project \`${projectName}\` about the concept: "${abstraction.name}". This is Chapter ${chapterNum}.

Concept Details:
- Name: ${abstraction.name}
- Description:
${abstraction.description}

Complete Tutorial Structure:
${fullChapterListing}

Context from previous chapters:
${previousChaptersSummary}

${fileContextStr}

Instructions for the chapter:
- Start with a clear heading (e.g., \`# Chapter ${chapterNum}: ${abstraction.name}\`).

${prevChapter ? `- Begin with a brief transition from the previous chapter, referencing [${prevChapter.name}](${prevChapter.filename}).` : ""}

- Begin with a high-level motivation explaining what problem this abstraction solves. Start with a central use case as a concrete example.

- If complex, break it down into key concepts. Explain each concept one-by-one in a very beginner-friendly way.

- Each code block should be BELOW 10 lines! If longer, break them down. Use comments to skip non-important implementation details.

- Describe the internal implementation. First provide a non-code walkthrough, then use a simple mermaid sequenceDiagram with at most 5 participants.

- Use mermaid diagrams (\`\`\`mermaid\`\`\` format) to illustrate complex concepts.

- Heavily use analogies and examples to help beginners understand.

${nextChapter ? `- End with a conclusion and transition to the next chapter: [${nextChapter.name}](${nextChapter.filename}).` : "- End with a conclusion summarizing what was learned."}

- Output *only* the Markdown content for this chapter.

Now, directly provide a super beginner-friendly Markdown output (DON'T need \`\`\`markdown\`\`\` tags):
`;

    const chapterContent = await callLLM(prompt, false); // Don't cache chapter content
    
    // Ensure proper heading
    let finalContent = chapterContent;
    const actualHeading = `# Chapter ${chapterNum}: ${abstraction.name}`;
    if (!finalContent.trim().startsWith(`# Chapter ${chapterNum}`)) {
      const lines = finalContent.trim().split("\n");
      const firstLine = lines[0];
      if (lines.length > 0 && firstLine && firstLine.startsWith("#")) {
        lines[0] = actualHeading;
        finalContent = lines.join("\n");
      } else {
        finalContent = `${actualHeading}\n\n${finalContent}`;
      }
    }

    chapters.push(finalContent);
    chaptersWrittenSoFar.push(finalContent);
  }

  console.log(`Finished writing ${chapters.length} chapters.`);
  return chapters;
}

/**
 * Step 5: Combine everything into a tutorial
 */
function combineTutorial(
  projectName: string,
  repoUrl: string,
  abstractions: Abstraction[],
  relationships: RelationshipsData,
  chapterOrder: number[],
  chaptersContent: string[]
): TutorialResult {
  console.log("Combining tutorial...");

  // Generate Mermaid diagram
  const mermaidLines = ["flowchart TD"];
  
  for (let i = 0; i < abstractions.length; i++) {
    const abstr = abstractions[i];
    if (!abstr) continue;
    const nodeId = `A${i}`;
    const sanitizedName = abstr.name.replace(/"/g, "");
    mermaidLines.push(`    ${nodeId}["${sanitizedName}"]`);
  }

  for (const rel of relationships.details) {
    const fromNodeId = `A${rel.from}`;
    const toNodeId = `A${rel.to}`;
    let edgeLabel = rel.label.replace(/"/g, "").replace(/\n/g, " ");
    if (edgeLabel.length > 30) {
      edgeLabel = edgeLabel.substring(0, 27) + "...";
    }
    mermaidLines.push(`    ${fromNodeId} -- "${edgeLabel}" --> ${toNodeId}`);
  }

  const mermaidDiagram = mermaidLines.join("\n");

  // Generate index.md content
  let indexContent = `# Tutorial: ${projectName}\n\n`;
  indexContent += `${relationships.summary}\n\n`;
  indexContent += `**Source Repository:** [${repoUrl}](${repoUrl})\n\n`;
  indexContent += "```mermaid\n";
  indexContent += mermaidDiagram + "\n";
  indexContent += "```\n\n";
  indexContent += "## Chapters\n\n";

  const chapterFiles: ChapterFile[] = [];

  for (let i = 0; i < chapterOrder.length; i++) {
    const abstractionIndex = chapterOrder[i];
    if (abstractionIndex === undefined) continue;

    const abstraction = abstractions[abstractionIndex];
    
    if (abstractionIndex < abstractions.length && i < chaptersContent.length && abstraction) {
      const abstractionName = abstraction.name;
      const safeName = abstractionName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const filename = `${String(i + 1).padStart(2, "0")}_${safeName}.md`;
      
      indexContent += `${i + 1}. [${abstractionName}](${filename})\n`;

      let chapterContent = chaptersContent[i] || "";
      if (!chapterContent.endsWith("\n\n")) {
        chapterContent += "\n\n";
      }
      chapterFiles.push({ filename, content: chapterContent });
    }
  }
  console.log("Tutorial generation complete!");

  return {
    projectName,
    indexContent,
    chapters: chapterFiles,
    mermaidDiagram,
  };
}

/**
 * Main function to generate tutorial from a GitHub repository
 */
export async function generateTutorial(
  options: GenerateTutorialOptions
): Promise<TutorialResult> {
  const {
    repoUrl,
    language = "english",
    maxAbstractions = 8,
    maxFiles = 30,
    selectedFiles,
  } = options;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Starting tutorial generation for: ${repoUrl}`);
  console.log(`Language: ${language}, Max Abstractions: ${maxAbstractions}`);
  if (selectedFiles) {
    console.log(`Using ${selectedFiles.length} user-selected files`);
  }
  console.log(`${"=".repeat(60)}\n`);

  // Step 0: Parse repo URL and get project name
  const { repo: projectName } = parseGitHubUrl(repoUrl);

  // Step 1: Fetch repository files
  console.log("\n--- Step 1: Fetching repository files ---");
  let files: FileData[];
  
  if (selectedFiles && selectedFiles.length > 0) {
    // Use user-selected files
    const crawlResult = await crawlSelectedFiles(repoUrl, selectedFiles);
    files = crawlResult.files;
  } else {
    // Use automatic file selection
    const crawlResult = await crawlGitHubFiles(repoUrl, { maxFiles });
    files = crawlResult.files;
  }

  if (files.length === 0) {
    throw new Error("No files found in repository");
  }

  // Step 2: Identify abstractions
  console.log("\n--- Step 2: Identifying abstractions ---");
  const abstractions = await identifyAbstractions(files, projectName, language, maxAbstractions);

  // Step 3: Analyze relationships
  console.log("\n--- Step 3: Analyzing relationships ---");
  const relationships = await analyzeRelationships(abstractions, files, projectName, language);

  // Step 4: Order chapters
  console.log("\n--- Step 4: Ordering chapters ---");
  const chapterOrder = await orderChapters(abstractions, relationships, projectName);

  // Step 5: Write chapters
  console.log("\n--- Step 5: Writing chapters ---");
  const chaptersContent = await writeChapters(chapterOrder, abstractions, files, projectName, language);

  // Step 6: Combine tutorial
  console.log("\n--- Step 6: Combining tutorial ---");
  const tutorial = combineTutorial(projectName, repoUrl, abstractions, relationships, chapterOrder, chaptersContent);

  return tutorial;
}

export const tutorialService = {
  generateTutorial,
  identifyAbstractions,
  analyzeRelationships,
  orderChapters,
  writeChapters,
  combineTutorial,
};
