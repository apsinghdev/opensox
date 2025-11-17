import { SheetModule } from "./types";

export const module6: SheetModule = {
  id: "module-6",
  name: "Find the issues to work on",
  docContent: `
      <p>hey, welcome back</p>
      
      <p>in this module, we're gonna talk about how to pick the right issue to work on — especially if you're just starting out.</p>
      
      <p>finding issues isn't the hard part. there are tons of them.</p>
      
      <p>the tricky part is choosing one that's actually right for you — something small, doable, and meaningful, without wasting hours or getting stuck for days.</p>
      
      <p>let's break that down:</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 1 — start small (but meaningful)</h3>
      
      <p>when you're new to an open source project, never start with a complex issue.</p>
      
      <p>your first goal isn't to "prove your genius" — it's to understand how contributions actually work in that project.</p>
      
      <p>so pick something small but useful — like fixing a minor bug, improving logs, or tweaking small functions.</p>
      
      <p>just avoid low-value stuff like "update readme" or "add full stops".</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 2 — understanding issue types</h3>
      
      <p>when you open the issues tab, you'll usually see a mix of two kinds:</p>
      
      <ol style="padding-left: 24px;">
        <li style="margin-bottom: 12px;"><strong>maintainer-created issues</strong> – made by the project's core team.</li>
        <li style="margin-bottom: 12px;"><strong>contributor-created issues</strong> – made by community members like you.</li>
      </ol>
      
      <p>if it's a bug created by maintainers, you can usually start right away.</p>
      
      <p>but if it's a feature request by another contributor, always confirm with maintainers first — ask if they actually want that change before you spend time on it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 3 — analyze one issue example (browseruse repo)</h3>
      
      <p>let's look at a real one.</p>
      
      <p>there's a bug:</p>
      
      <p>"action field consistently missing in the response of llm."</p>
      
      <p>sounds simple, but let's read it.</p>
      
      <p>the user says that when using the deepseek LLM model, the action field isn't returned in the response. the logs show schema mismatches.</p>
      
      <p>that instantly tells us — this issue might need setting up the deepseek API or model locally. so we have to decide:</p>
      
      <p>is this a "first-issue" level problem or something that'll eat my whole weekend?</p>
      
      <p>if it looks like a multi-hour setup, skip it for now. you'll get there later.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 4 — using ai tools (like cursor) smartly</h3>
      
      <p>to really understand what's going wrong, copy the issue text into cursor and ask:</p>
      
      <p>"where in the codebase is this issue occurring, and why?"</p>
      
      <p>cursor will instantly scan the repo and point to relevant files or functions (like chat.py or views.py) — giving you a clear idea of what's breaking.</p>
      
      <p>but don't jump straight to "fix this."</p>
      
      <p>instead, first ask why the issue exists — learn the cause before trying to patch it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 5 — understanding the root cause</h3>
      
      <p>in this deepseek issue, cursor explains that the schema defines action as a required field,</p>
      
      <p>but the deepseek model doesn't return that field in its response.</p>
      
      <p>so the problem isn't your code — it's a schema mismatch between your definition and deepseek's actual output.</p>
      
      <p>basically:</p>
      
      <p>the repo expects { action: ... } in every response,</p>
      
      <p>but the model is like "nah, not gonna send that."</p>
      
      <p>this kind of issue is super common in llm-based projects — when the model's schema handling differs from others like openai or anthropic.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 6 — check how hard it is to fix</h3>
      
      <p>before deciding, ask cursor:</p>
      
      <p>"will fixing this require a deepseek api or local setup? and how long might it take?"</p>
      
      <p>cursor says:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">you can test schema logic without an api</li>
        <li style="margin-bottom: 8px;">but you can't test full responses unless you have one</li>
        <li style="margin-bottom: 8px;">time estimate: around 30–60 minutes if you just handle schema validation</li>
      </ul>
      
      <p>so that's a green light — it's small, scoped, and fixable. perfect for a first issue.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 7 — plan the fix before writing code</h3>
      
      <p>when cursor gives you possible fixes, don't just accept the first one.</p>
      
      <p>read them all, question them.</p>
      
      <p>ask things like:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">"why is option one better than option two?"</li>
        <li style="margin-bottom: 8px;">"what could break if i try this approach?"</li>
      </ul>
      
      <p>your goal is to understand the logic, not just copy-paste ai suggestions.</p>
      
      <p>in this case, the recommended fix was to:</p>
      
      <ol style="padding-left: 24px;">
        <li style="margin-bottom: 12px;">add validation handling in chat.py around line 169–180</li>
        <li style="margin-bottom: 12px;">catch missing action errors and retry with a clearer prompt</li>
        <li style="margin-bottom: 12px;">update the schema description so it clearly marks action as required</li>
      </ol>
      
      <p>once you understand that, then start implementing.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 8 — setting up environment + branch</h3>
      
      <p>create a test api key for deepseek (openrouter gives free keys btw).</p>
      
      <p>add it to your env file.</p>
      
      <p>then create a clean branch like:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>fix/action-field-missing</code></pre>
      
      <p>short, clear, self-explanatory.</p>
      
      <p>never code directly on main.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 9 — be patient with yourself</h3>
      
      <p>look, you won't nail every fix perfectly. and that's fine.</p>
      
      <p>the goal is to figure things out, not to look like a pro.</p>
      
      <p>i'm not some flawless coder — i mess up, get stuck, debug badly, and still somehow figure it out eventually. that's the real process.</p>
      
      <p>so if you get stuck — don't panic.</p>
      
      <p>use cursor, ask maintainers polite questions, and keep learning through each issue.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">step 10 — summary</h3>
      
      <p>so here's the mindset recap:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">start small but meaningful</li>
        <li style="margin-bottom: 8px;">confirm maintainer approval if needed</li>
        <li style="margin-bottom: 8px;">read the issue carefully</li>
        <li style="margin-bottom: 8px;">use ai tools to understand the root cause</li>
        <li style="margin-bottom: 8px;">estimate difficulty before committing</li>
        <li style="margin-bottom: 8px;">plan the fix, don't rush it</li>
        <li style="margin-bottom: 8px;">make a clean branch and start simple</li>
      </ul>
      
      <p>once you fix it, test locally → push → raise a pr.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">todos:</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>watch <a href="https://youtu.be/0U_v8WK48fo?si=1-oj2Rz7pxX8r_z6" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">this video</a> to make sense of this yap</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>following the steps mentioned, pick and understand an issue to work on further</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>create a branch to work on that issue</span>
        </li>
      </ul>
      
      <p>and that's it for this module</p>
      
      <p>in the next one, we'll actually implement the fix, test it, and raise our first pull request together.</p>
      
      <p>until then — keep exploring, keep breaking things, and keep building your open source story</p>
      
      <p>this is ajeetunc. see you in the next module</p>
    `,
  videoUrl: "https://youtu.be/0U_v8WK48fo?si=1-oj2Rz7pxX8r_z6",
};
