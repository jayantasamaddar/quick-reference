# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Git?](#what-is-git)
- [What is Version Control?](#what-is-version-control)
- [Git vs Github](#git-vs-github)
- [Installing Git](#installing-git)
- [Branching in Git](#branching-in-git)
  - [What happens when we create a new branch?](#what-happens-when-we-create-a-new-branch)
  - [Why is Branching useful?](#why-is-branching-useful)
  - [Creating a Branching Convention](#creating-a-branching-convention)
  - [Integrating Changes and Structuring Releases](#integrating-changes-and-structuring-releases)
  - [Branching Workflows](#branching-workflows)
  - [Branching Workflows: Mainline Development](#branching-workflows-mainline-development)
  - [Branching Workflows: State, Release and Feature Branches](#branching-workflows-state-release-and-feature-branches)
  - [Types of Branches](#types-of-branches)
    - [Long-Running Branches](#long-running-branches)
    - [Short-Lived Branches](#short-lived-branches)
  - [Branching Strategies](#branching-strategies)
    - [GitHub Flow](#github-flow)
    - [GitFlow](#gitflow)
- [Git Commands](#git-commands)
  - [Basic Commands](#basic-commands)
  - [Other Useful Commands](#other-useful-commands)
- [Git Conflicts in a Professional Environment](#git-conflicts-in-a-professional-environment)
    - [The question here is: How do they make their changes to the repo without breaking the project](#the-question-here-is-how-do-they-make-their-changes-to-the-repo-without-breaking-the-project)
      - [Use Case 1 - Persons B and C are also making changes to `Filename1` :](#use-case-1---persons-b-and-c-are-also-making-changes-to-filename1-)

---

# What is Git?

Git is a free open source version control system.

---

# What is Version Control?

The management of changes to documents, computer programs, large web sites, and other collections of information is known as version control. Programmers use version control to track code changes by saving an initial version of the code to Git and then updating the code by saving into Git again and again. As the code continues to change, the programmer can look back at all the changes made over time. This helps us to see what we did, when, track down bugs as well as revert to a previous version if necessary.

---

# Git vs Github

Git is the tool that tracks the code changes over time. Github is a website where you host all your Git repositories. Being online, it makes it easy to work in groups with other people and organize projects under a single portfolio.

---

# Installing Git

Follow the tutorial by Atlassian to **[Install Git](https://www.atlassian.com/git/tutorials/install-git)**

---

# Branching in Git

## What happens when we create a new branch?

Initially, the code on master and this new feature branch will be exactly the same. But as you make updates to the feature branch, those changes are only seen in the feature branch.

So if we make changes to a feature branch and commit to save those changes onto that branch and then if you switch back to the master branch, you won't be able to see any of those changes that you made on that feature branch. Each branch maintains its own independent set of commits and has no way of knowing what commits happen in another branch.

---

## Why is Branching useful?

It is extremely useful because you will be building new features to applications that may break your code or they are a work-in-progress that you do not want to save on your main/master branch. You want to work on them in kind of a sandbox area. So you can write and experiment with code on the feature branch and get it to the state you want for production, before merging it back into the main/branch of the codebase.

This is really helpful when there are multiple people working on the same repository or a lot of different branches going on at once.

One very common thing that you'll see in development is that you'll be working on this feature branch for a week or more and you have all of these changes that you've made. Suddenly you encounter this major bug, that you have to fix really quickly. For this, we make this other branch, called a **Hot Fix Branch** represented by yellow. After the code is fixed on the Hot Fix Branch and you make sure it is working correctly, this branch is then merged back into the master branch.

![Git Branching](images/git-branching.png)

---

## Creating a Branching Convention

Git allows us to create branches but doesn't tell us _how_ to do them. Every team, organization is different and for the most efficient collaboration, it needs to figure out what would be the conventions or best practices of how work should be structured in the team - to avoid mistakes and collisions. A written Branching Convention allows a consistent and dependable branching workflow within a team.

A List of conventions should be made answering some questions like:

- What should be naming convention of branches and why?
- When should a new branch be created?
- What should be the best practices for committing?
- When should or should not a branch be merged with main? If so, how and who holds the power to do so?
- When to raise a pull request?

---

## Integrating Changes and Structuring Releases

## Branching Workflows

Branching workflows can primarily be categorized into two kinds.

1. **Mainline Development ("Always be Integrating")**
2. **State, Release and Feature Branches**

---

## Branching Workflows: Mainline Development

Mainline Development refers to the idea of always integrating your workflow with the team. Code is very quickly integrated into production.

**Characteristics:**

- **Few branches** - Easier to keep track of things in the project.
- **Relatively small commits** - Cannot risk big bloated commits in such an environment where things are constantly integrated to production code.
- **High-quality testing & QA Standards** - This also means a high quality testing environment setup or this workflow will not work.

**Example:** A single branch where everyone commits.

```s
(C) --- (C) --- (C) main branch ---->
```

---

## Branching Workflows: State, Release and Feature Branches

The other end of the spectrum is when multiple different types of branches are used.

**Characteristics:**

- Branches enchance structures and workflows and are used to fullfill different jobs.
- New features and experiments are kept in their own branches.
- Releases can be planned and managed in their own branches.
- Different states in the development flow, like production and development can be represented by different branches.

The exact structure will vary from team-to-team depending on their needs and it's hard to say which particular structure is better. Although this sounds complicated, this is a matter of getting used to.

In reality, most teams are working somewhere in between these two extremes.

---

## Types of Branches

The two types of branches are:

1. Long-Running Branches
2. Short-Lived Branches

### Long-Running Branches

Every git repository has at least one Long-running branch, the `master` or the `main` branch.
There maybe other long-running branches, like `development`, `staging` or `production`. These branches have one common characteristic: The exist throughout the complete lifecycle of the project.

Integration Branches - often named `development` or `staging`, typically these branches reflect states in a project release or deployment process. If your code moves through different states, for example, from development to staging to production, it makes a lot of sense to mirror the structure in the branches too.

Usually teams have conventions connected to these long-running branches. Typically commits are never directly added to these branches. Commits should only make it to the long running branch, through integration, i.e. through a merge or rebase.

There are couple of reasons for such a rule:

1.  **Quality** - You don't want to add untested and unreviewed code to your production environment as an example. That's why code should go through different states, tests and reviews before it finally arrives on production.

2.  **Release Bundling and Scheduling** - You might want to release new code in batches, maybe even thoroughly scheduled. And without such a rule, when code is directly committed to long running branches like **`main`**, keeping an eye on what's released becomes pretty difficult.

---

### Short-Lived Branches

The other type of branches are Short-Lived Branches.

In contrast to Long-running branches, they are created for certain specific purposes, and then deleted after they have been integrated.

There are many different reasons to create short-lived branches.

**For example:** When you start working on a new feature, a bug fix or refactoring or an experiment. Typically, a short-lived branch will be based on a long running branch. For example, when you start a new feature, you might base that new feature on your long running main branch. After making some commits and finishing your work, you probably want to re-integrate it back into `main`. And after you've safely merged or rebased it, your feature branch can be deleted.

> **Note:** Branching strategies will be different based on preferences of the team, size and type of the project.

---

## Branching Strategies

Let's take a look at two examples of branching strategies:

1. GitHub Flow
2. GitFlow

---

### GitHub Flow

GitHub advocates a workflow that is extremely lean and simple.

- One, long-running branch (`main`)
- Feature branches - A short-lived branch for a feature, bug-fix or a re-factoring

---

### GitFlow

Another popular model is called GitFlow. This offers a bit more structure but also more rules to follow.

- The `main` branch is the reflection of the current production state.
- The other long-running branches are typically `develop`.
- Any feature branches start from this `develop` branch and will be merged back into it.
- `develop` is also the starting point for any new releases, you would open a new `release` branch, do your testing, commit any bug fixes to that `release` branch.
- One you are confident `release` is ready for production, you merge it back into `main`.
- You would then add a `tag` for that `release` commit on main and close the `release` branch.

As you can see GitFlow defines quite a couple of tasks and steps in the process.

---

# Git Commands

## Basic Commands

We initialize Git by using `git init` inside the directory after which the following commands can be used:

<!--prettier-ignore-->
| Command | Function | Syntax | Example |
| ------- | -------- | ------ | ------- |
| `clone` | - Bring a repository that is hosted somewhere like Github into a folder on your local machine.<br>- Clones a particular branch of a repo<br>Cloning adds an `origin` remote by default which can then be used to push:<br>`git push -u origin <branch>` | `git clone <address>`<br><br>`git clone -b <branch> <address>` | `git clone https://github.com/jayantasamaddar/quick-reference`<br><br>`git clone -b test https://github.com/jayantasamaddar/quick-reference`
| `remote` | If a repo is not cloned we need to add a remote from the local directory to the repo. | `git remote add <name> https://github.com/user/repo` | `git remote add origin https://github.com/jayantasamaddar/quick-reference`
| `add` | - Stage a single file in folder.<br>- Stage all files in folder. | `git add <filename>`<br>`git add --all` | `git add README.md`<br>`git add --all` or `git add .` |
| `commit` | Save your file changes in Git | `git commit -m <description>` | `git commit -m "first commit"` |
| `push` | - Upload Git commits to a remote repo, like Github, Gitlab, Bitbucket<br>- Deletes a remote branch on the repo | `git push <remote> <branch>`<br>`git push <remote> -d <branch>` | `git push origin main`<br>`git push origin -d test` |
| `pull` | Download changes from a remote repo to your local machine. Opposite of push. Useful when working with multiple teams who are constantly updating the repo | `git pull <remote> <branch>` | `git pull origin main` |
| `checkout` | - Create a new branch<br>- Switch to an existing branch | `git checkout -b <name>`<br>`git checkout <name>` | `git checkout -b new-feature`<br>`git checkout main` |
| `branch` | - List local branches<br>- List all branches (remote and local)<br>- Rename current local branch<br>- Delete local branch | `git branch`<br>`git branch -a`<br>`git branch <rename>`<br>`git branch -d <branch>` | `git branch`<br>`git branch -a`<br>`git branch -m new-name`<br>`git branch -d test` |
| `merge` | Merge an existing branch into the current branch.<br>After merge, the `<from-branch>` can be deleted using `git push -d <from-branch>` | `git checkout <to-Branch>`<br>`git merge <from-Branch>` | `git checkout main`<br>`git merge new-feature` |
| `revert` | Revert to a previous commit version. | `git revert <commit_ID>` | `git revert 077151a` |
| `reset` | - Unstage the staged local changes of a single file in a Git repo to the most recent commit.<br>- Unstage the staged local changes of a Git repo to most recent commit.<br>- Unstage to most recent commit AND obliterates all uncommitted changes in working directory. Use only when you want to throw away all local developments. | `git reset <filepath>`<br>`git reset`<br>`git reset --hard` | `git reset ./filename.txt`<br>`git reset`<br>`git reset --hard` |
| `diff` | Show the differences in local and remote versions | `git diff` | `git diff` |

> **Git commands are case sensitive and must be in _lowercase_**

## Other Useful Commands

<!--prettier-ignore-->
| Command | Function | Example |
| ------- | -------- | ------- |
| `git --version` | Check the current Git version. | N/A |
| `git --help` | View a list of all Git commands and their functionality and other helpers. | N/A |
| `git <command> --help` | View a list of all Git subcommands of a git command and their functionality. | `git checkout --help` |
| `git log --oneline` | View a list of commits. Read Only. Press `Q` to Quit. | N/A |
| `git status` | Shows a status overview of current branch, staged/untracked files, uncommitted changes etc. | N/A |
| `git rm --cached <path>` | Untrack it and remove it from the remote repository without deleting the file locally. Usually used when a file has been mistakenly committed that needed to be added to `.gitignore` but wasn't. So we first untrack and remove it from the remote repo and then commit and push again after adding it to the `.gitignore` file. This way the file stays locally but is not added to the repo. | `git rm --cached .env` |

---

# Git Conflicts in a Professional Environment

When multiple people are working on the same branch there might be some conflicts in the version due to changing of the version history.

**Situation:**

- Let's say three people, **Person A**, **Person B**, **Person C** clone the same repo and start working.
- There are three files in the repo: `Filename1`, `Filename2`, `Filename3`

**Problem:**

**Person A** modifies `Filename1` and commits changes and publishes the repo. Now **Person B** and **Person C** do not have the same versions, as they continue to make their own changes to their cloned versions locally. So when they make a commit and push changes, they get an error saying that they do not have the latest version of the repo.

### The question here is: How do they make their changes to the repo without breaking the project

#### Use Case 1 - Persons B and C are also making changes to `Filename1` :

If three people are working on the same file, Git can still handle the changes. The first person to push, manages to do it without a problem. The next pushes by the other two people will face a problem because now the repo version has changed. They first have to pull the repo now to sync it to the current version. The pulled repo will identify the conflicted file and suggest how you should proceed.

There are three options if the same file has been unsynced changes to the file after completion of a pull request:

- Use the modified version - Use the pulled version
- Use the current version - Use the local version
- Use both versions - Appends the changes to the local version

Once the Person is happy with the changes, he/she may commit the changes and push the changes back to the repo. This is how version control ensures that there is no conflict.

---
