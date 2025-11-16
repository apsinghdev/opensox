import { SheetModule } from "./types";

export const module5: SheetModule = {
  id: "module-5",
  name: "Introduce yourself and familiarize",
  docContent: `
      <p>hey everyone, welcome to module 5!</p>
      
      <p>in module 3 and 4, we talked about how to find good open source projects and how to choose which ones to contribute to.</p>
      
      <p>now, it's time to actually dive in — to learn how to understand a project's codebase, introduce yourself to the community, and start feeling at home inside a repo.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">quick reality check</h3>
      
      <p><strong>you don't need to know everything about a project to contribute</strong>.</p>
      
      <p>just yesterday, i met a guy who wasn't contributing because he thought he had to learn every single part of the tech stack before touching code. that's completely wrong.</p>
      
      <p>open source doesn't work like that. you learn while contributing — not before it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 1 — joining the project</h3>
      
      <p>for this example, i'll take <a href="https://github.com/browser-use/browser-use" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">browser use</a>, a YC-funded open source project that builds ai-powered browser agents. super cool stuff.</p>
      
      <p>first, clone the repo locally and open it in cursor (or any ai-assisted editor).</p>
      
      <p>if you don't use cursor yet, please start — not for writing code, but for understanding it. it saves hours of manual digging.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 2 — read the code of conduct + contribution guide</h3>
      
      <p>every open source project has these — sometimes hidden in the repo root.</p>
      
      <p>you don't need to memorize them, just skim to understand their style, policies, and dos/don'ts.</p>
      
      <p>avoid giving "linkedin vibes" when you join. don't drop a whole autobiography like:</p>
      
      <p>"hi i'm from xyz college, participated in 10 hackathons, worked on abc…"</p>
      
      <p>none of that matters. just say something like:</p>
      
      <p>"hey everyone, i'm new here. excited to help with &lt;area&gt;."</p>
      
      <p>and please — don't join saying "i want a job/internship." you earn that through consistent contributions, not by asking for it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 3 — join their community</h3>
      
      <p>most active projects have a discord or slack. join it. that's where maintainers discuss bugs, new ideas, and upcoming features.</p>
      
      <p>if you skip it, you'll keep asking basic questions that were already answered there — which can annoy maintainers.</p>
      
      <p>also, join their showcase channel if they have one — projects that highlight contributors' work usually have a great culture.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 4 — understand the tech stack</h3>
      
      <p>head to the repo and check what language dominates the code.</p>
      
      <p>in browser use, it's ~98% python.</p>
      
      <p>use cursor or any ai tool to ask:</p>
      
      <p>"summarize the libraries and frameworks used in this project."</p>
      
      <p>you'll get a clear breakdown. for example, browser use uses:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">chromium CDP (chrome devtools protocol) for browser automation</li>
        <li style="margin-bottom: 8px;">pydantic for data models</li>
        <li style="margin-bottom: 8px;">httpx, aiohttp, requests for api calls</li>
        <li style="margin-bottom: 8px;">openai, anthropic, google genai for llm support</li>
        <li style="margin-bottom: 8px;">rich, click, dotenv, pillow, numpy, etc.</li>
      </ul>
      
      <p>now here's the important part — you don't need to know them all.</p>
      
      <p>you just need a rough idea of what each one does.</p>
      
      <p>later, when you see an issue mentioning "pydantic" or "rich", you'll remember, "oh yeah, that's probably related to data validation or ui formatting."</p>
      
      <p>that tiny context saves hours later.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 5 — understand architecture</h3>
      
      <p>now, use cursor again and ask it to:</p>
      
      <p>"map out the architecture and organization of this codebase."</p>
      
      <p>it'll usually show:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;"><strong>core layers</strong> — agent, tools, browser, dom, llm</li>
        <li style="margin-bottom: 8px;"><strong>architecture style</strong> — event-driven, async-first, modular</li>
        <li style="margin-bottom: 8px;"><strong>patterns</strong> — dependency injection, registry pattern, lazy imports</li>
      </ul>
      
      <p>don't panic if you don't know these terms yet.</p>
      
      <p>just note them down. later, when you actually contribute, you'll revisit and everything will start to click.</p>
      
      <p>remember: this step isn't about mastering the architecture — it's about familiarity.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">quick detour — what's CDP?</h3>
      
      <p>CDP stands for chrome devtools protocol — basically a bridge between your code and the browser's brain.</p>
      
      <p>before CDP, you could open devtools manually (press F12), but there was no way to automate that programmatically.</p>
      
      <p>CDP fixed that.</p>
      
      <p>it lets your code send commands to the browser — like "click this button", "fill this form", "screenshot this page".</p>
      
      <p>it's literally how browser use automates actions — you tell the agent "fill this form for me", and under the hood, CDP executes those actions on chrome.</p>
      
      <p>so now you kinda get the magic behind it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 6 — understanding the flow</h3>
      
      <p>architecture tells you how the system is built.</p>
      
      <p>the flow tells you how data moves when you perform an action.</p>
      
      <p>for example, in browser use, there's a feature:</p>
      
      <p>"fill in this job application with my resume."</p>
      
      <p>to understand the flow, ask cursor:</p>
      
      <p>"explain the code flow for this feature step by step."</p>
      
      <p>and it'll map it like this:</p>
      
      <ol style="padding-left: 24px;">
        <li style="margin-bottom: 12px;">user triggers the command</li>
        <li style="margin-bottom: 12px;">agent gets created</li>
        <li style="margin-bottom: 12px;">agent collects data (DOM, browser state, tools, etc.)</li>
        <li style="margin-bottom: 12px;">LLM decides what to do next (click, type, upload, etc.)</li>
        <li style="margin-bottom: 12px;">those actions get executed via CDP</li>
        <li style="margin-bottom: 12px;">browser updates the DOM and returns results</li>
      </ol>
      
      <p>this is how you build intuition. you don't need to understand every function — just how things connect.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 7 — read a few core files</h3>
      
      <p>cursor will also tell you which files are key (like agent/service.py, apply_to_jobs.py, browser/session.py, etc.).</p>
      
      <p>open them, skim through, and note down what each roughly does.</p>
      
      <p>you'll start to notice patterns like "okay, this file handles browser actions" or "this one manages LLM communication."</p>
      
      <p>that's all you need at this stage.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 8 — don't get stuck in the learning loop</h3>
      
      <p>this whole process — joining, reading, exploring, mapping flow — should take less than a day.</p>
      
      <p>don't spend weeks "understanding everything."</p>
      
      <p>if you wait until you know every tool, every function, every file, you'll never start.</p>
      
      <p>the goal is to gain enough familiarity to confidently pick small issues and learn as you go.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">what's next</h3>
      
      <p>in the next module, we'll cover how to pick the right issues — because not every issue is beginner-friendly. we'll talk about which ones to start with, which ones to avoid, and how to build momentum without burning out.</p>
      
      <p>so yeah, that's it for this one.</p>
      
      <p>remember: you don't need to know everything — just start.</p>
      
      <p>learn, contribute, repeat.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">todos:</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>whichever project you chose in the previous module, fork and clone it locally</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>find CODE OF CONDUCT and CONTRIBUTING.md files and read them</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>join their community - on slack, discord, etc</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>understand the tech stack (you can follow the way ive mentioned here <a href="https://www.youtube.com/watch?v=wvl_SkMwbrU&t=490s" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">08:10</a>)</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>understand the architecture like this <a href="https://www.youtube.com/watch?v=wvl_SkMwbrU&t=967s" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">16:07</a></span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>go through the code flow <a href="https://www.youtube.com/watch?v=wvl_SkMwbrU&t=2014s" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">33:34</a></span>
        </li>
      </ul>
      
      <p>this is ajeetunc. see you in the next module</p>
    `,
  videoUrl: "https://youtu.be/wvl_SkMwbrU?si=HlFe4Kj9Tz2J_d6B",
};
