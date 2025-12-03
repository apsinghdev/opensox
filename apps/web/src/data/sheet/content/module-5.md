---
id: "module-5"
name: "Introduce yourself and familiarize"
videoUrl: "https://youtu.be/wvl_SkMwbrU?si=HlFe4Kj9Tz2J_d6B"
comingSoon: false
---

hey everyone, welcome to module 5!

in module 3 and 4, we talked about how to find good open source projects and how to choose which ones to contribute to.

now, it's time to actually dive in — to learn how to understand a project's codebase, introduce yourself to the community, and start feeling at home inside a repo.

### quick reality check

**you don't need to know everything about a project to contribute**.

just yesterday, i met a guy who wasn't contributing because he thought he had to learn every single part of the tech stack before touching code. that's completely wrong.

open source doesn't work like that. you learn while contributing — not before it.

### step 1 — joining the project

for this example, i'll take [browser use](https://github.com/browser-use/browser-use), a YC-funded open source project that builds ai-powered browser agents. super cool stuff.

first, clone the repo locally and open it in cursor (or any ai-assisted editor).

if you don't use cursor yet, please start — not for writing code, but for understanding it. it saves hours of manual digging.

### step 2 — read the code of conduct + contribution guide

every open source project has these — sometimes hidden in the repo root.

you don't need to memorize them, just skim to understand their style, policies, and dos/don'ts.

avoid giving "linkedin vibes" when you join. don't drop a whole autobiography like:

"hi i'm from xyz college, participated in 10 hackathons, worked on abc…"

none of that matters. just say something like:

"hey everyone, i'm new here. excited to help with <area>."

and please — don't join saying "i want a job/internship." you earn that through consistent contributions, not by asking for it.

### step 3 — join their community

most active projects have a discord or slack. join it. that's where maintainers discuss bugs, new ideas, and upcoming features.

if you skip it, you'll keep asking basic questions that were already answered there — which can annoy maintainers.

also, join their showcase channel if they have one — projects that highlight contributors' work usually have a great culture.

### step 4 — understand the tech stack

head to the repo and check what language dominates the code.

in browser use, it's ~98% python.

use cursor or any ai tool to ask:

"summarize the libraries and frameworks used in this project."

you'll get a clear breakdown. for example, browser use uses:

- chromium CDP (chrome devtools protocol) for browser automation
- pydantic for data models
- httpx, aiohttp, requests for api calls
- openai, anthropic, google genai for llm support
- rich, click, dotenv, pillow, numpy, etc.

now here's the important part — you don't need to know them all.

you just need a rough idea of what each one does.

later, when you see an issue mentioning "pydantic" or "rich", you'll remember, "oh yeah, that's probably related to data validation or ui formatting."

that tiny context saves hours later.

### step 5 — understand architecture

now, use cursor again and ask it to:

"map out the architecture and organization of this codebase."

it'll usually show:

- **core layers** — agent, tools, browser, dom, llm
- **architecture style** — event-driven, async-first, modular
- **patterns** — dependency injection, registry pattern, lazy imports

don't panic if you don't know these terms yet.

just note them down. later, when you actually contribute, you'll revisit and everything will start to click.

remember: this step isn't about mastering the architecture — it's about familiarity.

### quick detour — what's CDP?

CDP stands for chrome devtools protocol — basically a bridge between your code and the browser's brain.

before CDP, you could open devtools manually (press F12), but there was no way to automate that programmatically.

CDP fixed that.

it lets your code send commands to the browser — like "click this button", "fill this form", "screenshot this page".

it's literally how browser use automates actions — you tell the agent "fill this form for me", and under the hood, CDP executes those actions on chrome.

so now you kinda get the magic behind it.

### step 6 — understanding the flow

architecture tells you how the system is built.

the flow tells you how data moves when you perform an action.

for example, in browser use, there's a feature:

"fill in this job application with my resume."

to understand the flow, ask cursor:

"explain the code flow for this feature step by step."

and it'll map it like this:

1. user triggers the command
2. agent gets created
3. agent collects data (DOM, browser state, tools, etc.)
4. LLM decides what to do next (click, type, upload, etc.)
5. those actions get executed via CDP
6. browser updates the DOM and returns results

this is how you build intuition. you don't need to understand every function — just how things connect.

### step 7 — read a few core files

cursor will also tell you which files are key (like agent/service.py, apply_to_jobs.py, browser/session.py, etc.).

open them, skim through, and note down what each roughly does.

you'll start to notice patterns like "okay, this file handles browser actions" or "this one manages LLM communication."

that's all you need at this stage.

### step 8 — don't get stuck in the learning loop

this whole process — joining, reading, exploring, mapping flow — should take less than a day.

don't spend weeks "understanding everything."

if you wait until you know every tool, every function, every file, you'll never start.

the goal is to gain enough familiarity to confidently pick small issues and learn as you go.

### what's next

in the next module, we'll cover how to pick the right issues — because not every issue is beginner-friendly. we'll talk about which ones to start with, which ones to avoid, and how to build momentum without burning out.

so yeah, that's it for this one.

remember: you don't need to know everything — just start.

learn, contribute, repeat.

### todos:

- [ ] whichever project you chose in the previous module, fork and clone it locally
- [ ] find CODE OF CONDUCT and CONTRIBUTING.md files and read them
- [ ] join their community - on slack, discord, etc
- [ ] understand the tech stack (you can follow the way ive mentioned here [08:10](https://www.youtube.com/watch?v=wvl_SkMwbrU&t=490s))
- [ ] understand the architecture like this [16:07](https://www.youtube.com/watch?v=wvl_SkMwbrU&t=967s)
- [ ] go through the code flow [33:34](https://www.youtube.com/watch?v=wvl_SkMwbrU&t=2014s)

this is ajeetunc. see you in the next module
