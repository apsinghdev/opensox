---
id: "module-1"
name: "Things to know before jumping to Open Source"
videoUrl: "https://youtu.be/PHKy2izX2Hs?si=loy2Wy_iGwYMKPk7"
comingSoon: false
---

hey, im back. in this module we're gonna talk about what you should know before contributing to open source.

### quick disclaimer

everything i say here is from my personal experience. it's not some rulebook or law. i might be wrong in a few places, and you might have a better take on things. so feel free to pick whatever works best for you.

### first things first — know your goals from open source

everyone joins with different reasons. some wanna learn, some want a job or internship, some are in it for gsoc or bounties, and some just do it for fun. but behind all that, the real goal is to make _impactful contributions_.

whether it's learning, landing a gig, or just enjoying the process — everything eventually comes down to one thing: making meaningful, high-impact contributions. that's what truly moves the needle.

### mindset while contributing to open source

when it comes to open source, remember — it's not always about code.

people usually think contributors only write code, but that's not true. a good contributor isn't just someone pushing commits; they're someone who _understands the product_, keeps the docs clean, helps others, reviews prs, and improves the overall project vibe.

so yeah, code matters — but contribution goes way beyond that. even if you're mainly into coding, try helping out in other areas too. things like improving docs, giving feedback on prs, or helping someone debug can be super valuable.

### quality > quantity + start small + ego + tracking

**quality always beats quantity** — that's one of my favorite philosophies.

you can raise two prs instead of ten, but if they're high-quality and impactful, that's what really counts. don't chase numbers, chase impact. that's what helps you hit your goals — whether it's learning, landing gigs, or just building credibility.

in the beginning, it's totally fine to just focus on getting started and getting your first pr merged. once you're comfortable, start paying attention to quality — learn what makes an issue truly valuable or impactful.

also, **start small**. most beginners try to take on massive issues and then get stuck or burned out. pick small, easy tasks first, build confidence, and then slowly move to the bigger stuff.

and please — **leave your ego at the door**. sometimes your pr won't get merged, or someone else might propose a better solution. that's okay. open source isn't about proving you're the best; it's about learning, improving, and growing together.

finally, **track everything**. open source has a lot of moving parts — issues, prs, reviews, updates. if you don't track them properly, you'll get overwhelmed. below is a simple doc i use to keep things organized, the main idea is: stay structured so you can move fast without burning out.

![Ajeet's work screenshot](/images/doc.webp)

### hard things have less competition + confidence + compounding

here's a cool mindset shift — **hard things have less competition**.

you'll notice this once you start contributing: easy issues always have a crowd. everyone's like "assign this to me!" meanwhile, the complex ones just sit there untouched. that's your time to shine. when you pick those tougher tasks, you stand out fast.

and don't fall into the comparison trap. it's easy to feel small when you see people with years of experience contributing. but remember — everyone starts somewhere. even the best maintainers were beginners once. so don't let someone's fancy green github chart hypnotize you. focus on your lane.

**open source compounds over time**. the more you contribute, the faster you get. your first few prs might take weeks, but later you'll do the same kind of work in days. every hard issue you solve today makes you 10x faster tomorrow. that's why staying consistent matters — because open source has crazy long-term roi if you just stick with it.

### don't chase perfection + blind confidence + pr/issue closures

**don't chase perfection — just ship it**.

a lot of people waste time endlessly tweaking their prs or adding "one more improvement." instead, once your code works, passes tests, and meets the requirements, just raise the pr. let the maintainer review it. done is better than perfect.

also, **blind confidence helps** — especially when you're starting out. when i first got into open source, i took on a backend issue written in python even though i only knew typescript back then. i just said "yeah i'll fix it," learned on the go, and somehow pulled it off. sometimes you need that slightly overconfident push to grow.

and if your pr or issue gets closed, chill. it happens to everyone. maybe the maintainer had a fight with his wife, or your idea didn't fit the project. no big deal. open source is full of different opinions — just respect that and move on. what matters is you tried and learned.

### aura boosters — being proactive, attention, and smart communication

to level up your aura in open source, be _hyper proactive_ — but not annoying.

there are two types of people: the ones who _talk_ about doing things, and the ones who _just do it_. always be the doer. instead of telling the maintainer, "i'll do this, i'll do that," just try it. make a quick proof-of-concept, raise a draft pr, show results, and then ask for feedback. that's how you earn respect fast.

remember — **maintainer attention is limited**. big projects have tons of contributors and issues, so use their time wisely. before asking anything, see if google, chatgpt, or docs can solve it. 90% of answers already exist somewhere. only ping the maintainer when you've tried everything and still can't figure it out.

and when you do ask, **ask smart**. frame your question clearly, short, and to the point. show that you've already done your homework. people are way more likely to reply if your message is crisp and easy to understand. this rule also works great for cold dms and emails — clarity gets attention.

here's a dm i did to one of a guy i appreciate most and got his reply:

![Ajeet's work screenshot](/images/dm.webp)

### homework before asking + using the project + helping others

**before you ask for help, always do your homework**.

read the issue carefully, understand its context, and explore the repo a bit. in open source, no one's gonna spoon-feed you — you've gotta figure things out yourself first.

one of the best hacks to understand a project deeply is to _use it yourself_. if it's a docs tool, use it to write your docs. if it's a web app, play around with it. when you see it from a user's perspective, you spot bugs, missing features, and potential improvements easily. that's how you start thinking like a product contributor, not just a coder.

and **help others**. that's literally the spirit of open source — you help someone today, someone else helps you tomorrow. plus, teaching someone (even through text) forces you to understand things better yourself. people also notice contributors who help others — it naturally builds your reputation.

### code of conduct + knowing basics + patience + tracker doc

**read the code of conduct — seriously**.

almost every open source project has one, but barely anyone reads it. it usually explains how to contribute, whether you need permission to start on an issue, and what coding practices the project follows. it also covers simple but crucial stuff like being respectful, not spamming, or posting rude comments.

taking 10–20 minutes to read it already puts you ahead of 80% of contributors. most skip it because it looks boring, but it actually gives you the rules of the game.

next — **know the basics**.

open source isn't for "absolute" beginners. you don't need to be a pro, but you should at least know how to fork and clone a repo, use branches, handle merge conflicts, push code, and keep things in sync. also, learn basic git terms like _origin_, _upstream_, _fetch_, and _rebase_. it won't take more than a day.

and yeah — **have patience**.

maintainers are busy. sometimes your pr might take days or even weeks to get reviewed. that's normal. while waiting, don't just sit idle — use that time to learn new stuff or pick another issue.

to stay organized, maintain a simple tracker doc. i use one with four sections —

1. **to raise** (issues you plan to raise)
2. **to work on** (issues you've picked)
3. **in progress** (what you're currently coding)
4. **to review / get merged** (prs waiting for review)

### low / no aura things to avoid — the don'ts

alright, let's talk about what _not_ to do — the stuff that kills your aura fast.

**first — don't overping maintainers**. their time is super limited, so avoid bothering them for small or googleable stuff. i've seen people spam maintainers like "can you assign me this issue?" again and again. sometimes, they even ping on a pull request instead of an issue 💀. don't be that person.

**second — no personal dms**. messaging maintainers privately without permission is a big no. keep everything public unless they _explicitly_ ask you to dm. open source thrives on transparency.

**third — don't pull others down**. if someone's already working on an issue, don't try to snatch it or comment things like "can i take this?" unless they say they're leaving it. just move to another issue.

**fourth — don't move slow**. once you take up an issue, stay active. being slow makes you forget context and gives the impression you're not serious. use your waiting time to learn or find new bugs — stay in motion.

**fifth — always follow the code of conduct**. it's not optional. i once saw someone threaten a gsoc maintainer because they got rejected — total red flag. don't ever do that. same goes for stealing someone's work — you can learn from others' code, but don't copy-paste their prs or proposals. that'll destroy your credibility instantly.

**lastly — keep your promises**. if you say you'll fix an issue, actually do it. missing deadlines again and again makes maintainers lose trust. start small, prove reliability first, and then go for bigger features once you're confident.

### beginner's dilemma + closing thoughts

when you're new to open source, you'll face what i call the _beginner's dilemma_.

you'll ask yourself things like —

- what tools or tech do i need to know?
- how do i find good issues to work on?
- how do i pick the right project?
- why is setting it up locally so damn hard?
- why does everything feel so complex?

and trust me — everyone goes through this. it's normal to feel stuck, lost, or even dumb sometimes. i've been there too. but that's exactly how you grow. every small win — cloning your first repo, fixing your first bug, getting your first pr merged — adds up fast.

we'll dive deeper into all these beginner problems in upcoming modules — how to find beginner-friendly issues, how to pick projects that match your tech stack, how to set things up quickly, and how to stay consistent without burning out.

### todos:

- [ ] keep everything ive explained earlier in mind

so yeah, that's all for this one. this module was more of a mindset and theory piece, but honestly, these are the things most people skip — and end up making mistakes that cost them their aura.

if you vibed with it, share it with other (coz i dont have a marketing budget), and this is ajeetunc. see you in the next module
