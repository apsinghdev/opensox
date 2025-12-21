import dotenv from "dotenv";

dotenv.config();

// Simple in-memory cache for LLM responses
const llmCache: Map<string, string> = new Map();

/**
 * Call OpenRouter API with Gemini 2.5 Flash
 * Uses OpenAI-compatible API format with full 1M token context
 */
async function callOpenRouter(prompt: string): Promise<string> {
  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPEN_ROUTER_API_KEY is required but not set in environment variables");
  }

  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
  const url = "https://openrouter.ai/api/v1/chat/completions";

  // Log prompt size for debugging
  const promptSizeKB = (prompt.length / 1024).toFixed(1);
  const estimatedTokens = Math.ceil(prompt.length / 4);
  console.log(`Calling OpenRouter API with model: ${model}`);
  console.log(`Prompt size: ${promptSizeKB}KB (~${estimatedTokens.toLocaleString()} tokens)`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://opensox.dev",
      "X-Title": "OpenSox Tutorial Generator",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 16000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorBody = await response.text();
      console.error(`OpenRouter API Error Response:`, errorBody);
      const errorJson = JSON.parse(errorBody);
      errorMessage = errorJson.error?.message || errorJson.message || errorBody;
    } catch (e) {
      // Couldn't parse error body
    }
    throw new Error(`OpenRouter API error: ${errorMessage}`);
  }

  const data = await response.json();
  
  if (!data.choices?.[0]?.message?.content) {
    console.error(`OpenRouter API unexpected response:`, JSON.stringify(data, null, 2));
    throw new Error(`OpenRouter API returned unexpected response format`);
  }
  
  console.log(`OpenRouter API response received (${(data.choices[0].message.content.length / 1024).toFixed(1)}KB)`);
  return data.choices[0].message.content;
}

/**
 * Main LLM calling function with caching support
 * Uses OpenRouter with Gemini 2.5 Flash (1M token context)
 */
export async function callLLM(prompt: string, useCache: boolean = true): Promise<string> {
  // Check cache if enabled
  if (useCache && llmCache.has(prompt)) {
    console.log("LLM cache hit");
    return llmCache.get(prompt)!;
  }

  console.log(`Calling LLM provider: OpenRouter`);
  const response = await callOpenRouter(prompt);

  // Update cache if enabled
  if (useCache) {
    llmCache.set(prompt, response);
  }

  return response;
}

export const llmService = {
  callLLM,
};
