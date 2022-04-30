# List of Command Line commands

- `git add --all` - Stage all files in folder.
- `git commit -m "name of commit"` - Make commit of staged files
- `git remote add origin https://github.com/jayantasamaddar/RapidTest.git` - Create remote origin
- `git push -u origin main` - push the main branch

# What is Git?

Git is a free open source version control system.

# What is Version Control?

The management of changes to documents, computer programs, large web sites, and other collections of information is known as version control. Programmers use version control to track code changes by saving an initial version of the code to Git and then updating the code by saving into Git again and again. As the code continues to change, the programmer can look back at all the changes made over time. This helps us to see what we did, when, track down bugs as well as revert to a previous version if necessary.

# Git vs Github
Git is the tool that tracks the code changes over time. Github is a website where you host all your Git repositories. Being online, it makes it easy to work in groups with other people and organize projects under a single portfolio.

# Installing Git
Follow the tutorial by Atlassian to **[Install Git](https://www.atlassian.com/git/tutorials/install-git)**

# Git Commands and their functions
We initialize Git by using `git init` inside the directory after which the following commands can be used:

| Command | Function | Syntax | Example |
| ------- | -------- | ------ | ------- |
| clone | Bring a repository that is hosted somewhere like Github into a folder on your local machine | `git clone address` |
| add | Track your file and changes in Git<br>Stage all files in folder | `git add <filename>`<br>`git add --all` | `git add README.md` |
| commit | Save your file changes in Git | `git commit -m <description>` | `git commit -m "first commit"` |
| push | Upload Git commits to a remote repo, like Github, Gitlab, Bitbucket | `git push -u <local branch> <remote branch>` | `git push -u origin main` |
| pull | Download changes from a remote repo to your local machine. Opposite of push. Useful when working with multiple teams who are constantly updating the repo | `git push` |

> Git commands are case sensitive and must be in lowercase

#### Other commands 
> `git --version` to check the current Git version.
> `git --help` to view a list of Git commands and their functionality and other helpers.