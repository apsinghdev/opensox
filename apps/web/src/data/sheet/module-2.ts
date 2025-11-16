import { SheetModule } from "./types";

export const module2: SheetModule = {
  id: "module-2",
  name: "Get the basics done - prerequisites, tools and tips",
  docContent: `
      <p>hey everyone, in this module we're gonna talk about the basics you need to know before contributing to open source — the tools, concepts, and a few practical tips to get started right.</p>
      
      <p><strong>quick request though</strong> — please don't spam any open source repo i mention here. i'm using them just to explain stuff. making random prs just for numbers actually hurts projects, so be cool.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">what to learn before contributing</h3>
      
      <p><strong>first things first — learn git and github. they're not optional.</strong></p>
      
      <p>and no, you don't need to master every command under the sun. you just need to understand the full workflow of open source contributions — how to fork, clone, branch, rebase, push, and make prs.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">forking & cloning</h3>
      
      <p>so let's say you find a cool open source project.</p>
      
      <p><strong>step one — fork it</strong>. when you fork, github creates a copy of that repo in your own account. this copy is yours to mess with — any changes you make affect your fork, not the main project.</p>
      
      <p><strong>step two — clone it to your local machine</strong>.</p>
      
      <p>just grab the repo's url, open your terminal, and run:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git clone &lt;repo-url&gt;</code></pre>
      
      <p>that downloads the project to your computer so you can actually make code changes.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">setting up locally</h3>
      
      <p>now comes the "fun" part — setting it up.</p>
      
      <p>almost every project has a section called local development in its readme. it'll list tools you need — like nodejs, postgresql, or docker.</p>
      
      <p>honestly, i recommend learning docker. it saves tons of setup time and works almost everywhere. but you can do manual setup too if you prefer.</p>
      
      <p>and just know — setup errors are normal. everyone faces them. first, try fixing things using google or chatgpt. if you're truly stuck for a day or two, then ask in the community or tag a maintainer.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">branches & syncing</h3>
      
      <p>you'll often create your own branch for each feature or fix.</p>
      
      <p>run:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git checkout -b fix-xyz</code></pre>
      
      <p>this makes a new branch and switches you there.</p>
      
      <p>but since multiple contributors are working at once, your local copy can fall behind the main project. that's where syncing comes in.</p>
      
      <p>you can use either git merge or git rebase.</p>
      
      <p><strong>merge</strong> combines changes but adds extra "merge commits" — can get messy.</p>
      
      <p><strong>rebase</strong> keeps history clean and linear — i usually prefer this.</p>
      
      <p>if conflicts appear, open the files, decide which version to keep, delete the unwanted lines, then run:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git add .
git rebase --continue</code></pre>
      
      <p>boom, conflict fixed and you're good to go.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">cherry-picking commits</h3>
      
      <p>sometimes your branch gets too messy — too many commits, too much noise.</p>
      
      <p>if you just want a few clean commits from another branch, use <code>git cherry-pick &lt;commit-hash&gt;</code>. it copies only that specific commit into your branch. huge time saver when cleaning things up.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">fetch vs pull (and how everything connects)</h3>
      
      <p>here's a quick mental model:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;"><strong>upstream</strong> = the original repo you forked from</li>
        <li style="margin-bottom: 8px;"><strong>origin</strong> = your fork on github</li>
        <li style="margin-bottom: 8px;"><strong>local</strong> = your copy on your laptop</li>
      </ul>
      
      <p><code>git fetch</code> gets updates from upstream without changing your local branch.</p>
      
      <p><code>git pull</code> gets updates and merges them into your current branch.</p>
      
      <p>that's the basic flow:</p>
      
      <p>local → origin → upstream (via PRs), and upstream → origin → local (via pulls).</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">pushing your branch & raising a PR</h3>
      
      <p>once your changes are ready:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git add .
git commit -m "fix: something"
git push origin fix-xyz</code></pre>
      
      <p>that pushes your branch to your github fork. you'll see a "compare & pull request" button — click it, write a short, clear description, and raise a pr.</p>
      
      <p><strong>pro tip: raise draft prs early</strong>.</p>
      
      <p>don't wait until everything's perfect — just raise a draft once the core part is working. it helps maintainers see your progress, prevents duplication, and gets you feedback early. just don't spam with one-line drafts.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">stashing changes</h3>
      
      <p>sometimes you're mid-work but don't wanna commit yet.</p>
      
      <p>you can stash your changes temporarily:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git stash save "my changes"</code></pre>
      
      <p>to get them back later:</p>
      
      <pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 16px 0;"><code>git stash apply</code></pre>
      
      <p>this keeps your workspace clean while switching branches or testing something else.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">quick git tricks</h3>
      
      <p>check commit history: <code>git log --oneline</code></p>
      
      <p>create short aliases (like git ac for add + commit) in your shell config — saves time.</p>
      
      <p>there are plenty of short youtube guides for that.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">learn the basics of your stack</h3>
      
      <p>besides git, know the basics of your programming stack.</p>
      
      <p>you should understand simple logic, loops, and core syntax. if you're into frontend, know your react/vue basics; if backend, know your frameworks; if infra or ai, know basic concepts like neural nets or containerization.</p>
      
      <p>you don't need to be an expert — just enough to make sense of what's happening in the code.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">finding projects by niche</h3>
      
      <p>right now, there's no perfect tool to find open source projects by niche.</p>
      
      <p>but i'm building <a href="https://www.opensox.ai/" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">opensox.ai</a>, which will let you filter projects by category — ai, infra, frontend, backend, etc. can't wait to ship that one.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">extra skills that help</h3>
      
      <p>anything else you know — dsa, previous internship experience, math, or theory — is a bonus. for example, if you know dsa, it helps you contribute to low-level libraries faster. every bit of prior knowledge compounds.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">the "am i ready enough?" dilemma</h3>
      
      <p>this is the most common question i get: am i ready to contribute?</p>
      
      <p>honestly — you'll never feel ready. even devs with years of experience hesitate at first.</p>
      
      <p>the best way to find out? just start. fork a repo, clone it, pick an issue, and go for it. you'll get stuck — that's where the learning happens.</p>
      
      <p>each time you hit a wall, ask yourself: what do i need to learn to fix this?</p>
      
      <p>need redis? learn it. need trpc? google it. learn just enough to solve the problem, fix it, move on, repeat.</p>
      
      <p>this "learn → apply → move" cycle will skyrocket your skills way faster than spending months watching tutorials or building yet another to-do app.</p>
      
      <p>of course, don't just stay on the surface — later, revisit the core concepts and learn them deeply. but for now, action > preparation.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">todos:</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>practice these git commands once or twice</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>get the basics of your tech stack (full stack, ai, web3, etc) done in one or two weeks</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>learn naming conventions for <a href="https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">branches</a>, <a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">commits</a></span>
        </li>
      </ul>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">closing thoughts</h3>
      
      <p>so yeah — that's everything you need before diving into open source.</p>
      
      <p>git, github, a basic tech stack, and the courage to start even when you don't feel ready.</p>
      
      <p>don't wait for "perfect timing" — just fork, clone, and begin.</p>
      
      <p>you'll figure things out as you go, and that's where the real growth happens.</p>
      
      <p>this is ajeetunc. see you in the next module</p>
    `,
  videoUrl: "https://youtu.be/f-l7zO_J4HU?si=5Cc6IB6TAi3wjZ71",
};
