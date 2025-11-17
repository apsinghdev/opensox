import { SheetModule } from "./types";

export const module3: SheetModule = {
  id: "module-3",
  name: "Explore and Select projects to contribute",
  docContent: `
      <p>hey, welcome back. in the last module, we talked about what you need to know before contributing to open source. if you haven't watched that yet, go check out module 2 first — the modules are mostly independent, but watching them in order helps things click better.</p>
      
      <p>in this module, we're diving into something super practical — how to find open source projects and how to explore them properly. because honestly, finding good projects isn't as easy as it sounds. there are tons of repos out there — some great, some meh — and your job is to pick the ones worth your time.</p>
      
      <p>so let's get into it — i'll show you 10+ ways to discover awesome open source projects:</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 1 — opensox.ai</h3>
      
      <p>this one's built exactly for this purpose.</p>
      
      <p>head over to <a href="https://www.opensox.ai/" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">opensox.ai</a>, click get started → find projects, choose your tech stack — say typescript — then adjust filters like popularity or competition level. hit search, and boom — you'll get a curated list of projects you can explore.</p>
      
      <p>ignore random personal projects and focus on official or company-backed ones. opensox gives you a good mix, but it's still improving, so you might see a few irrelevant ones here and there.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 2 — algora.io</h3>
      
      <p>next up, <a href="https://algora.io/" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">algora.io</a>.</p>
      
      <p>this site lists a ton of open source projects, especially those offering bounties. perfect if you're aiming for paid contributions.</p>
      
      <p>they also have a projects section, though you'll have to explore manually since there aren't filters. still, it's solid for discovering new repos like ts circuit, rasp, activepieces, and more.</p>
      
      <p>btw, you'll find this whole list in the discord community doc if you're part of it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 3 — yc startup directory</h3>
      
      <p>yc (y combinator) has a directory of startups, including many open source ones.</p>
      
      <p>just search "yc open source projects 2025" — click the first link — and you'll find companies like gitlab, docker, airbyte, skyvern, tip tap, and tons more.</p>
      
      <p>personally, i suggest exploring newer yc-backed projects. they're usually more open to new contributors and provide better mentorship and community engagement. older, massive ones like gitlab are great too but tend to have slower response times.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 4 — gsoc project list</h3>
      
      <p>yeah, gsoc. the og of open source.</p>
      
      <p>search "gsoc project list" and open the organizations page. use the filters — for example, type "rust" and you'll get all rust-based orgs.</p>
      
      <p>each org page links to their website or repo, where you can join their community or explore issues. just a reminder — don't spam readme updates. contribute meaningfully.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 5 — github trending</h3>
      
      <p>this one's simple but underrated.</p>
      
      <p>go to <a href="https://github.com/trending" target="_blank" rel="noopener noreferrer" style="color: #9455f4; text-decoration: underline;">github.com/trending</a>. you'll see projects blowing up right now — many are new and buzzing.</p>
      
      <p>you'll find established names like appsmith, meshery, zod, and a bunch of new ones. trending repos are gold because they show what's hot in the dev world.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 6 — open source communities (discord / slack)</h3>
      
      <p>joining open source communities is a cheat code.</p>
      
      <p>when you join one, you naturally get exposed to many others because maintainers and founders share each other's announcements.</p>
      
      <p>so start with a few like appsmith, docs, or meshery. you'll usually find their discord or slack links on their landing page — scroll to the footer or "community" section.</p>
      
      <p>one community always leads to another — and soon you'll be looped into everything happening in the open source world.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 7 — twitter (x)</h3>
      
      <p>twitter (okay, x) is another goldmine.</p>
      
      <p>most new open source launches, updates, and funding news drop there first.</p>
      
      <p>just follow people who are active in the open source ecosystem — contributors, founders, maintainers, or tech builders. i followed around 40–50 when i started, and that alone kept me updated daily.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 8 — funding news & newsletters</h3>
      
      <p>follow sites like techcrunch, product hunt, hacker news, and mashable. they often cover open source startups that recently launched, got funded, or announced something big.</p>
      
      <p>you can also subscribe to newsletters like indie hackers, starter story, or mark lowe's newsletter. they aren't open source–only, but you'll still discover cool projects and communities through them.</p>
      
      <p>btw, i'm also launching an opensox newsletter soon that'll include curated open source updates every week.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 9 — follow active open source contributors</h3>
      
      <p>this one's a secret gem.</p>
      
      <p>when you follow active contributors on github or twitter, you automatically get access to the projects they work on, the issues they solve, and the new repos they star or contribute to.</p>
      
      <p>but do this respectfully. don't dm random contributors asking for hand-holding. just quietly observe and learn — it's the easiest way to find high-quality projects and understand how top devs contribute.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">way 10 — oss friends</h3>
      
      <p>this is one of my personal favorite tricks.</p>
      
      <p>many open source companies mention their "oss friends" — basically other open source projects they use or partner with.</p>
      
      <p>scroll to the footer of their site, look for "oss friends", "open source friends", or just "friends". click it, and you'll find a list of related projects — all open source too. it's like a mini-network of connected ecosystems.</p>
      
      <p>you can repeat this recursively — click one project, see its oss friends, and so on. total goldmine.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">how to explore and shortlist projects</h3>
      
      <p>now that you've got a long list, the next step is exploring and shortlisting.</p>
      
      <p>you obviously can't contribute to all 100 — so pick around 10–15 projects that look interesting.</p>
      
      <p>make a simple doc (obsidian, notion, or even notepad) and list them. for each project, check:</p>
      
      <ol style="padding-left: 24px;">
        <li style="margin-bottom: 12px;">is the repo active? (recent commits, frequent prs, community chatter)</li>
        <li style="margin-bottom: 12px;">does it match your tech stack? no point joining a rust project if you only know typescript.</li>
        <li style="margin-bottom: 12px;">is the community active? check their discord — if no one replies for weeks, maybe skip it.</li>
        <li style="margin-bottom: 12px;">do they label issues clearly for contributors? good projects usually tag issues with good first issue, help wanted, or bounty.</li>
      </ol>
      
      <p>every time you find one that fits, add it to your list. aim for 10, not 100 — focus is key.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">trimming your list</h3>
      
      <p>once you've explored enough, narrow your 10–15 projects down to maybe 5 or 6 based on these filters:</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">high activity</li>
        <li style="margin-bottom: 8px;">solid maintainer/community support</li>
        <li style="margin-bottom: 8px;">tech stack you understand</li>
        <li style="margin-bottom: 8px;">meaningful issues you can actually work on</li>
      </ul>
      
      <p>this helps you focus your energy where it matters instead of spreading too thin.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">todos:</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>using the above methods, explore and find 7-8 open source projects</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>explore the selected open source projects deeply and trim down to 2-3</span>
        </li>
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>join the communities (slack, matrix, discord) of those 2-3 projects</span>
        </li>
      </ul>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">final thoughts</h3>
      
      <p>remember — these aren't hard rules. these are just proven ways to discover great projects. you might find your own methods too, and that's completely fine.</p>
      
      <p>the key is simple: don't overthink. explore, shortlist, start contributing. you'll figure things out as you go.</p>
      
      <p>so yeah, that's all for this module. hope it helps you discover your next favorite open source project. this is ajeetunc. see you in the next module</p>
    `,
  videoUrl: "https://youtu.be/bviwfDq-CTo?si=EwH1AFUpDM7p_FFy",
};
