# contributing to opensox ai

thank you for your interest in contributing to opensox ai! 🎉

## getting started

please refer to our [readme.md](./readme.md) for detailed setup instructions on how to get the project running locally.

## contribution guidelines

1. **we love our contributors and love the contributions!**

2. **please propose a plan before actually working on an issue so that you can save your time.**

3. **to avoid hurting feelings, please ask for an assignment before raising a pr.**

4. **if you face any problem, feel free to ping maintainers.**

5. **be nice to everyone and help others.**

6. **don't spam.**

7. **enjoy open source values.**

## we can't be linus torvalds but we can follow these good practices:

### 1. naming conventions

#### a). commits

name your commits like this:

```
<type>: <short summary>

# types: feat, fix, docs, style, refactor, perf, test, chore

# examples:
feat: add user login api
fix: correct null pointer in payment service
docs: update installation guide
```

#### b). branches

name your branches like this:

```
<branch-type>/<short-description>

# branch types: feature, fix, hotfix, release, chore
# examples:
feature/user-auth
fix/cart-crash
hotfix/payment-timeout
release/v1.2.0
chore/update-deps
```

#### c). issues

name your issues like this:

```
[category] short clear issue title

# categories: bug, feature, improvement, docs, task
# examples:
[bug] cart not updating on quantity change
[feature] add otp login
[improvement] speed up dashboard api
[docs] add steps to run locally
```

#### d). pull requests

name your pull requests like this:

```
<type>: <what this pr does>

# types: feat, fix, chore, docs, refactor, style, test
# examples:
feat: implement otp login flow
fix: resolve cart sync issue
docs: add api usage examples
refactor: clean up order controller
```

### 2. code review guidelines

please don't mark the coderabit reviews as resolved without any reason. mark them resolved only when:

- you have applied the solution/fix suggested by coderabit and tested it
- you are very confident that this review fix isn't very much necessary or not an actual improvement (in this case, write down your reason first in the comment, only then mark it as resolved)
- if something not clear in reviews, you can ping @apsinghdev for help.

### 3. pull request guidelines

#### a). ui/ux changes

if it's a ui/ux related change, always attach screenshots/screen recording of the changes you've made.

#### b). issue references

if your pull request fully resolves a bug or completes a feature, include (in the description):

```
fixes #<issue-number>
```

if your pull request is related to an issue but does not completely fix it, use one of the following instead:

- `refs #<issue-number>` - related, but not fixing
- `addresses #<issue-number>` - partially solves or progresses the issue

this keeps the issue-tracking clean and prevents issues from closing prematurely.

### need help?

if you have any questions or need assistance, feel free to:

- [open an issue](https://github.com/apsinghdev/opensox/issues)
- join our [discord community](https://discord.gg/zbHzgMNBrm)
- email us at hi@opensox.ai

we're here to help! ❤️
