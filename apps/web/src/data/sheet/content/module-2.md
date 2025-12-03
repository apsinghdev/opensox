---
id: "module-2"
name: "Get the basics done - prerequisites, tools and tips"
videoUrl: "https://youtu.be/f-l7zO_J4HU?si=5Cc6IB6TAi3wjZ71"
comingSoon: false
---

hey everyone, in this module we're gonna talk about the basics you need to know before contributing to open source — the tools, concepts, and a few practical tips to get started right.

**quick request though** — please don't spam any open source repo i mention here. i'm using them just to explain stuff. making random prs just for numbers actually hurts projects, so be cool.

### what to learn before contributing

**first things first — learn git and github. they're not optional.**

and no, you don't need to master every command under the sun. you just need to understand the full workflow of open source contributions — how to fork, clone, branch, rebase, push, and make prs.

### forking & cloning

so let's say you find a cool open source project.

**step one — fork it**. when you fork, github creates a copy of that repo in your own account. this copy is yours to mess with — any changes you make affect your fork, not the main project.

**step two — clone it to your local machine**.

just grab the repo's url, open your terminal, and run:

```bash
git clone <repo-url>
```

that downloads the project to your computer so you can actually make code changes.

### setting up locally

now comes the "fun" part — setting it up.

almost every project has a section called local development in its readme. it'll list tools you need — like nodejs, postgresql, or docker.

honestly, i recommend learning docker. it saves tons of setup time and works almost everywhere. but you can do manual setup too if you prefer.

and just know — setup errors are normal. everyone faces them. first, try fixing things using google or chatgpt. if you're truly stuck for a day or two, then ask in the community or tag a maintainer.

### branches & syncing

you'll often create your own branch for each feature or fix.

run:

```bash
git checkout -b fix-xyz
```

this makes a new branch and switches you there.

but since multiple contributors are working at once, your local copy can fall behind the main project. that's where syncing comes in.

you can use either git merge or git rebase.

**merge** combines changes but adds extra "merge commits" — can get messy.

**rebase** keeps history clean and linear — i usually prefer this.

if conflicts appear, open the files, decide which version to keep, delete the unwanted lines, then run:

```bash
git add .
git rebase --continue
```

boom, conflict fixed and you're good to go.

### cherry-picking commits

sometimes your branch gets too messy — too many commits, too much noise.

if you just want a few clean commits from another branch, use `git cherry-pick <commit-hash>`. it copies only that specific commit into your branch. huge time saver when cleaning things up.

### fetch vs pull (and how everything connects)

here's a quick mental model:

- **upstream** = the original repo you forked from
- **origin** = your fork on github
- **local** = your copy on your laptop

`git fetch` gets updates from upstream without changing your local branch.

`git pull` gets updates and merges them into your current branch.

that's the basic flow:

local → origin → upstream (via PRs), and upstream → origin → local (via pulls).

### pushing your branch & raising a PR

once your changes are ready:

```bash
git add .
git commit -m "fix: something"
git push origin fix-xyz
```

that pushes your branch to your github fork. you'll see a "compare & pull request" button — click it, write a short, clear description, and raise a pr.

**pro tip: raise draft prs early**.

don't wait until everything's perfect — just raise a draft once the core part is working. it helps maintainers see your progress, prevents duplication, and gets you feedback early. just don't spam with one-line drafts.

### stashing changes

sometimes you're mid-work but don't wanna commit yet.

you can stash your changes temporarily:

```bash
git stash save "my changes"
```

to get them back later:

```bash
git stash apply
```

this keeps your workspace clean while switching branches or testing something else.

### quick git tricks

check commit history: `git log --oneline`

create short aliases (like git ac for add + commit) in your shell config — saves time.

there are plenty of short youtube guides for that.

### learn the basics of your stack

besides git, know the basics of your programming stack.

you should understand simple logic, loops, and core syntax. if you're into frontend, know your react/vue basics; if backend, know your frameworks; if infra or ai, know basic concepts like neural nets or containerization.

you don't need to be an expert — just enough to make sense of what's happening in the code.

### finding projects by niche

right now, there's no perfect tool to find open source projects by niche.

but i'm building [opensox.ai](https://www.opensox.ai/), which will let you filter projects by category — ai, infra, frontend, backend, etc. can't wait to ship that one.

### extra skills that help

anything else you know — dsa, previous internship experience, math, or theory — is a bonus. for example, if you know dsa, it helps you contribute to low-level libraries faster. every bit of prior knowledge compounds.

### the "am i ready enough?" dilemma

this is the most common question i get: am i ready to contribute?

honestly — you'll never feel ready. even devs with years of experience hesitate at first.

the best way to find out? just start. fork a repo, clone it, pick an issue, and go for it. you'll get stuck — that's where the learning happens.

each time you hit a wall, ask yourself: what do i need to learn to fix this?

need redis? learn it. need trpc? google it. learn just enough to solve the problem, fix it, move on, repeat.

this "learn → apply → move" cycle will skyrocket your skills way faster than spending months watching tutorials or building yet another to-do app.

of course, don't just stay on the surface — later, revisit the core concepts and learn them deeply. but for now, action > preparation.

### todos:

- [ ] practice these git commands once or twice
- [ ] get the basics of your tech stack (full stack, ai, web3, etc) done in one or two weeks
- [ ] learn naming conventions for [branches](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534), [commits](https://www.conventionalcommits.org/en/v1.0.0/)

### closing thoughts

so yeah — that's everything you need before diving into open source.

git, github, a basic tech stack, and the courage to start even when you don't feel ready.

don't wait for "perfect timing" — just fork, clone, and begin.

you'll figure things out as you go, and that's where the real growth happens.

this is ajeetunc. see you in the next module
