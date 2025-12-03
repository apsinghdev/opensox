---
id: "module-6"
name: "Find the issues to work on"
videoUrl: "https://youtu.be/0U_v8WK48fo?si=1-oj2Rz7pxX8r_z6"
comingSoon: false
---

hey, welcome back

in this module, we're gonna talk about how to pick the right issue to work on — especially if you're just starting out.

finding issues isn't the hard part. there are tons of them.

the tricky part is choosing one that's actually right for you — something small, doable, and meaningful, without wasting hours or getting stuck for days.

let's break that down:

### step 1 — start small (but meaningful)

when you're new to an open source project, never start with a complex issue.

your first goal isn't to "prove your genius" — it's to understand how contributions actually work in that project.

so pick something small but useful — like fixing a minor bug, improving logs, or tweaking small functions.

just avoid low-value stuff like "update readme" or "add full stops".

### step 2 — understanding issue types

when you open the issues tab, you'll usually see a mix of two kinds:

1. **maintainer-created issues** – made by the project's core team.
2. **contributor-created issues** – made by community members like you.

if it's a bug created by maintainers, you can usually start right away.

but if it's a feature request by another contributor, always confirm with maintainers first — ask if they actually want that change before you spend time on it.

### step 3 — analyze one issue example (browseruse repo)

let's look at a real one.

there's a bug:

"action field consistently missing in the response of llm."

sounds simple, but let's read it.

the user says that when using the deepseek LLM model, the action field isn't returned in the response. the logs show schema mismatches.

that instantly tells us — this issue might need setting up the deepseek API or model locally. so we have to decide:

is this a "first-issue" level problem or something that'll eat my whole weekend?

if it looks like a multi-hour setup, skip it for now. you'll get there later.

### step 4 — using ai tools (like cursor) smartly

to really understand what's going wrong, copy the issue text into cursor and ask:

"where in the codebase is this issue occurring, and why?"

cursor will instantly scan the repo and point to relevant files or functions (like chat.py or views.py) — giving you a clear idea of what's breaking.

but don't jump straight to "fix this."

instead, first ask why the issue exists — learn the cause before trying to patch it.

### step 5 — understanding the root cause

in this deepseek issue, cursor explains that the schema defines action as a required field,

but the deepseek model doesn't return that field in its response.

so the problem isn't your code — it's a schema mismatch between your definition and deepseek's actual output.

basically:

the repo expects { action: ... } in every response,

but the model is like "nah, not gonna send that."

this kind of issue is super common in llm-based projects — when the model's schema handling differs from others like openai or anthropic.

### step 6 — check how hard it is to fix

before deciding, ask cursor:

"will fixing this require a deepseek api or local setup? and how long might it take?"

cursor says:

- you can test schema logic without an api
- but you can't test full responses unless you have one
- time estimate: around 30–60 minutes if you just handle schema validation

so that's a green light — it's small, scoped, and fixable. perfect for a first issue.

### step 7 — plan the fix before writing code

when cursor gives you possible fixes, don't just accept the first one.

read them all, question them.

ask things like:

- "why is option one better than option two?"
- "what could break if i try this approach?"

your goal is to understand the logic, not just copy-paste ai suggestions.

in this case, the recommended fix was to:

1. add validation handling in chat.py around line 169–180
2. catch missing action errors and retry with a clearer prompt
3. update the schema description so it clearly marks action as required

once you understand that, then start implementing.

### step 8 — setting up environment + branch

create a test api key for deepseek (openrouter gives free keys btw).

add it to your env file.

then create a clean branch like:

```bash
fix/action-field-missing
```

short, clear, self-explanatory.

never code directly on main.

### step 9 — be patient with yourself

look, you won't nail every fix perfectly. and that's fine.

the goal is to figure things out, not to look like a pro.

i'm not some flawless coder — i mess up, get stuck, debug badly, and still somehow figure it out eventually. that's the real process.

so if you get stuck — don't panic.

use cursor, ask maintainers polite questions, and keep learning through each issue.

### step 10 — summary

so here's the mindset recap:

- start small but meaningful
- confirm maintainer approval if needed
- read the issue carefully
- use ai tools to understand the root cause
- estimate difficulty before committing
- plan the fix, don't rush it
- make a clean branch and start simple

once you fix it, test locally → push → raise a pr.

### todos:

- [ ] watch [this video](https://youtu.be/0U_v8WK48fo?si=1-oj2Rz7pxX8r_z6) to make sense of this yap
- [ ] following the steps mentioned, pick and understand an issue to work on further
- [ ] create a branch to work on that issue

and that's it for this module

in the next one, we'll actually implement the fix, test it, and raise our first pull request together.

until then — keep exploring, keep breaking things, and keep building your open source story

this is ajeetunc. see you in the next module
