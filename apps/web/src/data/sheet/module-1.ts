import { SheetModule } from "./types";

export const module1: SheetModule = {
  id: "module-1",
  name: "Things to know before jumping to Open Source",
  docContent: `
      <p>hey, im back. in this module we're gonna talk about what you should know before contributing to open source.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">quick disclaimer</h3>
      <p>everything i say here is from my personal experience. it's not some rulebook or law. i might be wrong in a few places, and you might have a better take on things. so feel free to pick whatever works best for you.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">first things first — know your goals from open source</h3>
      <p>everyone joins with different reasons. some wanna learn, some want a job or internship, some are in it for gsoc or bounties, and some just do it for fun. but behind all that, the real goal is to make <em>impactful contributions</em>.</p>
      
      <p>whether it's learning, landing a gig, or just enjoying the process — everything eventually comes down to one thing: making meaningful, high-impact contributions. that's what truly moves the needle.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">mindset while contributing to open source</h3>
      
      <p>when it comes to open source, remember — it's not always about code.</p>
      
      <p>people usually think contributors only write code, but that's not true. a good contributor isn't just someone pushing commits; they're someone who <em>understands the product</em>, keeps the docs clean, helps others, reviews prs, and improves the overall project vibe.</p>
      
      <p>so yeah, code matters — but contribution goes way beyond that. even if you're mainly into coding, try helping out in other areas too. things like improving docs, giving feedback on prs, or helping someone debug can be super valuable.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">quality > quantity + start small + ego + tracking</h3>
      
      <p><strong>quality always beats quantity</strong> — that's one of my favorite philosophies.</p>
      
      <p>you can raise two prs instead of ten, but if they're high-quality and impactful, that's what really counts. don't chase numbers, chase impact. that's what helps you hit your goals — whether it's learning, landing gigs, or just building credibility.</p>
      
      <p>in the beginning, it's totally fine to just focus on getting started and getting your first pr merged. once you're comfortable, start paying attention to quality — learn what makes an issue truly valuable or impactful.</p>
      
      <p>also, <strong>start small</strong>. most beginners try to take on massive issues and then get stuck or burned out. pick small, easy tasks first, build confidence, and then slowly move to the bigger stuff.</p>
      
      <p>and please — <strong>leave your ego at the door</strong>. sometimes your pr won't get merged, or someone else might propose a better solution. that's okay. open source isn't about proving you're the best; it's about learning, improving, and growing together.</p>
      
      <p>finally, <strong>track everything</strong>. open source has a lot of moving parts — issues, prs, reviews, updates. if you don't track them properly, you'll get overwhelmed. below is a simple doc i use to keep things organized, the main idea is: stay structured so you can move fast without burning out.</p>
      
      <img src="/images/doc.webp" alt="Ajeet's work screenshot" style="width: 60%; max-width: 60%; height: auto; border-radius: 8px; margin: 20px auto; display: block;" />
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">hard things have less competition + confidence + compounding</h3>
      
      <p>here's a cool mindset shift — <strong>hard things have less competition</strong>.</p>
      
      <p>you'll notice this once you start contributing: easy issues always have a crowd. everyone's like "assign this to me!" meanwhile, the complex ones just sit there untouched. that's your time to shine. when you pick those tougher tasks, you stand out fast.</p>
      
      <p>and don't fall into the comparison trap. it's easy to feel small when you see people with years of experience contributing. but remember — everyone starts somewhere. even the best maintainers were beginners once. so don't let someone's fancy green github chart hypnotize you. focus on your lane.</p>
      
      <p><strong>open source compounds over time</strong>. the more you contribute, the faster you get. your first few prs might take weeks, but later you'll do the same kind of work in days. every hard issue you solve today makes you 10x faster tomorrow. that's why staying consistent matters — because open source has crazy long-term roi if you just stick with it.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">don't chase perfection + blind confidence + pr/issue closures</h3>
      
      <p><strong>don't chase perfection — just ship it</strong>.</p>
      
      <p>a lot of people waste time endlessly tweaking their prs or adding "one more improvement." instead, once your code works, passes tests, and meets the requirements, just raise the pr. let the maintainer review it. done is better than perfect.</p>
      
      <p>also, <strong>blind confidence helps</strong> — especially when you're starting out. when i first got into open source, i took on a backend issue written in python even though i only knew typescript back then. i just said "yeah i'll fix it," learned on the go, and somehow pulled it off. sometimes you need that slightly overconfident push to grow.</p>
      
      <p>and if your pr or issue gets closed, chill. it happens to everyone. maybe the maintainer had a fight with his wife, or your idea didn't fit the project. no big deal. open source is full of different opinions — just respect that and move on. what matters is you tried and learned.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">aura boosters — being proactive, attention, and smart communication</h3>
      
      <p>to level up your aura in open source, be <em>hyper proactive</em> — but not annoying.</p>
      
      <p>there are two types of people: the ones who <em>talk</em> about doing things, and the ones who <em>just do it</em>. always be the doer. instead of telling the maintainer, "i'll do this, i'll do that," just try it. make a quick proof-of-concept, raise a draft pr, show results, and then ask for feedback. that's how you earn respect fast.</p>
      
      <p>remember — <strong>maintainer attention is limited</strong>. big projects have tons of contributors and issues, so use their time wisely. before asking anything, see if google, chatgpt, or docs can solve it. 90% of answers already exist somewhere. only ping the maintainer when you've tried everything and still can't figure it out.</p>
      
      <p>and when you do ask, <strong>ask smart</strong>. frame your question clearly, short, and to the point. show that you've already done your homework. people are way more likely to reply if your message is crisp and easy to understand. this rule also works great for cold dms and emails — clarity gets attention.</p>
      
      <p>here's a dm i did to one of a guy i appreciate most and got his reply:</p>

      <img src="/images/dm.webp" alt="Ajeet's work screenshot" style="width: 60%; max-width: 60%; height: auto; border-radius: 8px; margin: 20px auto; display: block;" />
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">homework before asking + using the project + helping others</h3>
      
      <p><strong>before you ask for help, always do your homework</strong>.</p>
      
      <p>read the issue carefully, understand its context, and explore the repo a bit. in open source, no one's gonna spoon-feed you — you've gotta figure things out yourself first.</p>
      
      <p>one of the best hacks to understand a project deeply is to <em>use it yourself</em>. if it's a docs tool, use it to write your docs. if it's a web app, play around with it. when you see it from a user's perspective, you spot bugs, missing features, and potential improvements easily. that's how you start thinking like a product contributor, not just a coder.</p>
      
      <p>and <strong>help others</strong>. that's literally the spirit of open source — you help someone today, someone else helps you tomorrow. plus, teaching someone (even through text) forces you to understand things better yourself. people also notice contributors who help others — it naturally builds your reputation.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">code of conduct + knowing basics + patience + tracker doc</h3>
      
      <p><strong>read the code of conduct — seriously</strong>.</p>
      
      <p>almost every open source project has one, but barely anyone reads it. it usually explains how to contribute, whether you need permission to start on an issue, and what coding practices the project follows. it also covers simple but crucial stuff like being respectful, not spamming, or posting rude comments.</p>
      
      <p>taking 10–20 minutes to read it already puts you ahead of 80% of contributors. most skip it because it looks boring, but it actually gives you the rules of the game.</p>
      
      <p>next — <strong>know the basics</strong>.</p>
      
      <p>open source isn't for "absolute" beginners. you don't need to be a pro, but you should at least know how to fork and clone a repo, use branches, handle merge conflicts, push code, and keep things in sync. also, learn basic git terms like <em>origin</em>, <em>upstream</em>, <em>fetch</em>, and <em>rebase</em>. it won't take more than a day.</p>
      
      <p>and yeah — <strong>have patience</strong>.</p>
      
      <p>maintainers are busy. sometimes your pr might take days or even weeks to get reviewed. that's normal. while waiting, don't just sit idle — use that time to learn new stuff or pick another issue.</p>
      
      <p>to stay organized, maintain a simple tracker doc. i use one with four sections —</p>
      
      <ol style="padding-left: 24px;">
        <li style="margin-bottom: 12px;"><strong>to raise</strong> (issues you plan to raise)</li>
        <li style="margin-bottom: 12px;"><strong>to work on</strong> (issues you've picked)</li>
        <li style="margin-bottom: 12px;"><strong>in progress</strong> (what you're currently coding)</li>
        <li style="margin-bottom: 12px;"><strong>to review / get merged</strong> (prs waiting for review)</li>
      </ol>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">low / no aura things to avoid — the don'ts</h3>
      
      <p>alright, let's talk about what <em>not</em> to do — the stuff that kills your aura fast.</p>
      
      <p><strong>first — don't overping maintainers</strong>. their time is super limited, so avoid bothering them for small or googleable stuff. i've seen people spam maintainers like "can you assign me this issue?" again and again. sometimes, they even ping on a pull request instead of an issue 💀. don't be that person.</p>
      
      <p><strong>second — no personal dms</strong>. messaging maintainers privately without permission is a big no. keep everything public unless they <em>explicitly</em> ask you to dm. open source thrives on transparency.</p>
      
      <p><strong>third — don't pull others down</strong>. if someone's already working on an issue, don't try to snatch it or comment things like "can i take this?" unless they say they're leaving it. just move to another issue.</p>
      
      <p><strong>fourth — don't move slow</strong>. once you take up an issue, stay active. being slow makes you forget context and gives the impression you're not serious. use your waiting time to learn or find new bugs — stay in motion.</p>
      
      <p><strong>fifth — always follow the code of conduct</strong>. it's not optional. i once saw someone threaten a gsoc maintainer because they got rejected — total red flag. don't ever do that. same goes for stealing someone's work — you can learn from others' code, but don't copy-paste their prs or proposals. that'll destroy your credibility instantly.</p>
      
      <p><strong>lastly — keep your promises</strong>. if you say you'll fix an issue, actually do it. missing deadlines again and again makes maintainers lose trust. start small, prove reliability first, and then go for bigger features once you're confident.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">beginner's dilemma + closing thoughts</h3>
      
      <p>when you're new to open source, you'll face what i call the <em>beginner's dilemma</em>.</p>
      
      <p>you'll ask yourself things like —</p>
      
      <ul style="padding-left: 24px;">
        <li style="margin-bottom: 8px;">what tools or tech do i need to know?</li>
        <li style="margin-bottom: 8px;">how do i find good issues to work on?</li>
        <li style="margin-bottom: 8px;">how do i pick the right project?</li>
        <li style="margin-bottom: 8px;">why is setting it up locally so damn hard?</li>
        <li style="margin-bottom: 8px;">why does everything feel so complex?</li>
      </ul>
      
      <p>and trust me — everyone goes through this. it's normal to feel stuck, lost, or even dumb sometimes. i've been there too. but that's exactly how you grow. every small win — cloning your first repo, fixing your first bug, getting your first pr merged — adds up fast.</p>
      
      <p>we'll dive deeper into all these beginner problems in upcoming modules — how to find beginner-friendly issues, how to pick projects that match your tech stack, how to set things up quickly, and how to stay consistent without burning out.</p>
      
      <h3 style="margin-top: 40px; margin-bottom: 20px; color: #9455f4;">todos:</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li style="margin-bottom: 12px; padding-left: 24px; position: relative;">
          <span style="position: absolute; left: 0;">☐</span>
          <span>keep everything ive explained earlier in mind</span>
        </li>
      </ul>
      
      <p>so yeah, that's all for this one. this module was more of a mindset and theory piece, but honestly, these are the things most people skip — and end up making mistakes that cost them their aura.</p>
      
      <p>if you vibed with it, share it with other (coz i dont have a marketing budget), and this is ajeetunc. see you in the next module</p>
    `,
  videoUrl: "https://youtu.be/PHKy2izX2Hs?si=loy2Wy_iGwYMKPk7",
};
