---
id: "module-9"
name: "Live fix of the issue - Part-1"
videoUrl: "https://youtu.be/hRMtIB-pkeE"
comingSoon: false
---

# module 9: extending the browser-use contribution

**note:** as this module is implementation focused, try watching the [video](https://youtu.be/hRMtIB-pkeE) so that you can have better understanding.

in this module we're continuing the contribution we started in module 8. in module 8 we began working on an issue in the browser-use repo, and here we'll extend that work.

**note:** if you haven't watched module 7 and module 8, you should do that first — otherwise nothing in this module will make sense.

### checking the issue status

so let's open the issue we were working on. it's already closed.

four days ago, in module 8, we commented that we weren't able to reproduce the exact error described in the issue.

now, someone else replied saying that when the error triggers, the whole system crashes and floods the terminal with a huge amount of errors, which makes it impossible to see the real root cause.

he didn't attach screenshots, so we still didn't have full clarity.

after that, the original issue creator replied and tagged me. he shared screenshots and explained the real behavior.

### understanding what the issue creator meant

the contributor said:

_when the deepseek model returns a response without the action field, the error is added to the agent history, but the LLM doesn't react to that error._

so even if the agent says "hey deepseek, action field is missing", deepseek still keeps responding without the action field.

**this creates a repeating loop of failures.**

the contributor also fixed a local FILE-URL security issue for himself, but clarified that the core bug has nothing to do with files — it's purely about deepseek not returning the required field.

he then shared screenshots showing:

- the schema has required fields: thinking, evaluation, previous_goal, memory, next_goal, action
- deepseek returns everything except action
- pydantic throws a validation error
- agent retries, sends that error back
- deepseek still doesn't fix itself
- that means the failure multiplies

this exactly matches what another commenter said earlier: **multiple errors spam the terminal.**

so now we finally understand the real root cause.

### reproducing the issue properly

since the real bug isn't tied to FILE-URL access or html parsing, we don't need to recreate the whole file scenario from module 8.

the bug appears in any task as long as deepseek returns a response missing "action".

we just need to run a task with deepseek, catch the output, and check agent history.

the maintainer also pointed out where the missing check might live:

`browser_use.agent.service.Agent.get_model_output_with_retry()`

### why the issue was closed without a PR

now the important part: **why did the maintainer close the issue with no PR?**

here's the maintainer's final comment:

_some models are unfortunately bad at obeying the structured output schema._

_we recommend using system_prompt_extension to explicitly describe the output format to the model._

**in short:**

- deepseek simply doesn't follow the schema
- so this isn't a browser-use bug, it's a model behavior problem

the library already provides a built-in solution:

**extend_system_message** — a system-prompt extension that lets you explicitly tell the model how to format its output.

so rather than patch browser-use for a model-specific issue, the correct fix is:

use the system prompt extension to force deepseek to follow the required schema.

**that's why the maintainers didn't want a PR for this.**

### lessons from the PR attempt by someone else

another contributor opened a PR to "fix" this issue. the PR wasn't merged, and here are the mistakes worth learning from:

- ❌ **didn't get maintainer approval first** — always ask maintainers before fixing unclear issues
- ❌ **didn't fully understand the root cause** — he attempted to fix a model-side issue at the agent level
- ❌ **didn't use proper PR formatting** — he didn't use "fixes #<issue-number>" or "addresses #<issue-number>", so Github couldn't auto-close anything
- ❌ **no tests, no screenshots** — always attach before/after results or output logs
- ❌ **poor commit messages** — commit messages should follow good conventions like "fix: missing action field validation" instead of random unclear messages
- ❌ **didn't sign the CLA** — most OPEN SOURCE projects require this before merging

**learning these early will save months of frustration.**

### what "system prompt extension" actually means

`extend_system_message` lets you ADD extra instructions to the LLM without replacing the default system prompt.

**example:**

tell the model explicitly — "always include an action field in your response."

this is like the "additional note" option in food-delivery apps: the system already knows your order, but you add a custom instruction like "please bring cutlery" or "don't ring the bell".

same vibe here.

so instead of hacking the agent code, you use the built-in system message extension to guide the model.

**problem solved.**

### the wrap-up

even though the issue got closed before we could raise a PR, we still learned a lot:

- ✓ how to reproduce bugs
- ✓ how to interpret contributor comments
- ✓ how agent history works
- ✓ how retry loops create cascading failures
- ✓ how to ask clarifying questions
- ✓ how maintainers think about issues
- ✓ how to avoid bad PR habits
- ✓ how the model vs agent boundary works

in the next module, we'll pick another issue — ideally one we can actually fix and raise a PR for.

this is ajeetunc. see you in the next module.
