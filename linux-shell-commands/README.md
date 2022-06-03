# Linux Shell Commands

## General Commands

| Command | Function |
| ------- | -------- |
| `whoami`<br>`echo $USER` | Prints the current user to the terminal |
| `pwd` | Prints the absolute path to the working directory. |
| `ls` | Shows all the directories and files of the current directory. |
| `history` | List the last 1000 commands executed, numbered by execution order |
| `!1001` | Execute the 1001th command executed |
| `clear`<br>`Ctrl + L` | Clear the terminal screen |

---

## Basic CRUD Tasks.

| Command | Function |
| ------- | -------- |
| `mkdir directory` | Create a directory with the name `directory` |
| `cd directory` | Changes directory to 'directory' if it is a direct child of the current directory. |
| `cd ~` | Changes directory to the Home directory. Same as `cd /home/$USER` |
| `cd ..` | Changes directory to the parent directory. |
| `cd /` | Changes directory to the root directory. |
| `touch test.txt` | Creates an empty file in the current directory with the name `test.txt`. |
| `nano test.txt` | Opens the file `test.txt` for edit in the text editor nano. Opens a blank text file for edit, if it doesn't exist. |
| `cat test.txt` | Reads the contents of the `test.txt` file and displays it on the terminal.<br>`cat` is short for concatenate. |
| `more test.txt` | Reads the contents of the `test.txt` file and displays it on the terminal .<br>Useful for larger files as it allows pagination (`Space` to go to view more or `Enter` to go one line down at a time)<br>The problem with `more` is we can only scroll down but not up. |
| `less more.txt` | If `less` is not installed on the system, we can install it with `apt install less`. `less` is a more advanced text file viewer that allows scrolling up and down using the arrow keys. |
| `head test.txt`<br>`head -n 5 test.txt` | Prints the first 10 lines of the `test.txt` file.<br>Prints the first 5 lines of the `test.txt` file. |
| `tail test.txt`<br>`tail -n 5 test.txt` | Prints the last 10 lines of the `test.txt` file.<br>Prints the last 5 lines of the `test.txt` file. |
| `rm test.txt` | Removes 'test.txt' if it is a direct child of the current directory. |
| `rm -d testfolder`<br>`rmdir testfolder` | Removes `testfolder` if it is a direct child of the current directory and is empty. |
| `rm -r testfolder` | Removes `testfolder` if it is a direct child of the current directory and contains subfolders and files (`-r` flag for recursive removal). |
| `rm -d -i testfolder` | Prompts to remove `testfolder` if it is a direct child of the current directory. |


**Notes:**
> The rm and rmdir commands do not send the files or directories to the trash bin.

---

## Move, Rename, Copy.

# Move and Rename

The syntax for move, is: 

```
mv [flag] source destination
```

**Notes:**
> - Flags are optional.
> - If the destination is the same as the source, then the source is renamed.


| Command | Function |
| ------- | -------- |
| `mv test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. Works for directories too, as the `mv` command is a `move` command, which is a cut-and-paste command. |
| `mv -n test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-n` flag (no-clobber), if `newtest.txt` already exists, the `mv` command will not execute and the file will not be overwritten with the contents of the `test.txt`. |
| `mv -i test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-i` flag (interactive), it will ask the user for confirmation to execute the command. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. |
| `mv -b test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-b` flag (backup), it will if `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`, however a backup of the original file with a tilde character(`~`) appended to it. |
| `mv -f test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-f` flag (force), if `newtest.txt` already exists but is also write-protected, it will still be overwritten with the contents of the `test.txt`. Without the `-f` flag, write-protected files are ignored for overwriting and in such a case, the `mv` command will not execute. |
| `mv test.txt ~` | Moves file 'test.txt' to the Home directory. |


## Copy

The syntax for copy, is: 

```
cp [flag] source destination
```

**Notes:**
> - Flags are optional.
> - Copy (`cp`) only works on local machine. For remote copy, use `scp` command.


| Command | Function |
| ------- | -------- |
| `cp test.txt newtest.txt` | Copies contents of file `test.txt` to `newtest.txt`. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. Works for directories too, as the `mv` command is a `move` command, which is a copy-and-paste command. |
| `cp test.txt ~` | Copies file `test.txt` to the Home directory. |
| `cp test.txt test1.txt test2.txt ~` | Copies files `test.txt` to `test1.txt` and `test2.txt` to the Home directory.<br>When copying multiple files, each filepath must be separated by a space AND **the last argument MUST be a directory name that ALREADY EXISTS** because the `cp` command will not create it. |
| `cp -r testfolder1 testfolder2` | Copies directory `testfolder1` to `testfolder2` recursively, i.e. it creates all subfolders and files in testfolder2 and even testfolder2 itself, if they do not exist. |
| `cp -n test.txt newtest.txt` | Copies contents of file `test.txt` to `newtest.txt`. With the `-n` flag (no-clobber), if `newtest.txt` already exists, the `mv` command will not execute and the file will not be overwritten with the contents of the `test.txt`. |
| `cp -i test.txt newtest.txt` | Copies contents of file `test.txt` to `newtest.txt`. With the `-i` flag (interactive), it will ask the user for confirmation to execute the command. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. |
| `cp -b test.txt newtest.txt` | Copies contents of file `test.txt` to `newtest.txt`. With the `-b` flag (backup), it will if `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`, however a backup of the original file with a tilde character(`~`) appended to it. |
| `cp -f test.txt newtest.txt` | Copies contents of file `test.txt` to `newtest.txt`. With the `-f` flag (force), if `newtest.txt` already exists but is also write-protected or the destination folder is write-protected, it will still be overwritten with the contents of the `test.txt`. Without the `-f` flag, write-protected files are ignored for overwriting and in such a case, the `cp` command will not execute. |


---

## [Installing Nodejs via shell commands](https://github.com/nodesource/distributions)

Command | Function
------- | --------
`curl -fsSL https://deb.nodesource.com/setup_lts.x \| sudo -E bash -sudo apt-get install -y nodejs` | Installs nodejs LTS sources in Apt
`sudo apt-get install -y nodejs` | Installs nodejs and npm

---

## Updating Nodejs

Command | Function
------- | --------
`node -v` | Check node version
`npm -v` | Check Node package manager version
`npm cache clean -f` | Clears npm cache
`sudo npm install -g npm@latest` | Upgrade npm to latest version of npm
`sudo npm install -g n` | Install n, node's version manager
`sudo n stable` | Installs the current stable version of node
`sudo n latest` | Installs the latest version of node
`hash -r` | Resets the location hash

---

## Logging in to Host via SSH 

| Command | Function |
| ------- | -------- |
| `ssh -i .ssh/root@oracle <username>@<hostname>`<br>`ssh -i .ssh/root@oracle ubuntu@ocu1.duckdns.org`<br>`ssh -i .ssh/root@oracle ubuntu@158.101.20.236` | Connect to host via ssh |
| `curl icanhazip.com` | Gets the public IP address of the machine from the external address. |

---

## Secure Copy - Copying files from one host to another over a network using SSH


**Syntax:**

```
scp [flag] [private-key] sourceFilePath destinationFilePath
```

Flags:
| Flag | Function |
| ---- | -------- |
| `-i` | Selects the file from which the identity (private key) for public key authentication is read. This option is directly passed to ssh |
| `-r` | Recursively copies the contents of the source directory to the destination directory. |


### Copy file from local machine to remote host

| Command | Function |
| ------- | -------- |
| `scp -i .ssh/root@oracle test.txt ubuntu@ocu1.duckdns.org:/home/ubuntu/` | Copies test.txt from the current local machine folder to the host/home/ubuntu/ folder |

### Copy file from remote host to local machine

| Command | Function |
| ------- | -------- |
| `scp -i .ssh/root@oracle ubuntu@ocu1.duckdns.org:/home/ubuntu/test.txt  ~` | Copies test.txt from the remote host to the Home folder in local machine |

---

## Managing Packages
These days most operating systems and development platforms come with a package manager.

Common package managers are:

- npm
- yarn
- pip
- NuGet

In Ubuntu, we have a package manager called `apt` which is short for, **Advanced Package Tool**.

The apt related commands are as follows:

| Command | Function |
| ------- | -------- |
| `sudo apt update` | Updates the package database, i.e. list of available packages |
| `apt list` | Lists all the available packages |
| `apt list --upgradable` | Lists all the installed packages that can be upgraded |
| `sudo apt upgrade` | Updates the list of upgradeable packages |
| `sudo apt install <package-name>` | Installs the package |
| `sudo apt remove <package-name>` | Removes the package |

---

# Redirection

One of the most important concepts of Linux is the concept of Standard Input and Standard Output.
So by default Standard Input represents the keyboard and Standard Output represents the screen.
But in the shell, we can change the source of the Standard Input and Standard Output to different files. This is called, **Redirection**. 

- The redirection operator for Standard Output is the greater than `>`.
- The redirection operator for Standard Input is the less than `<`.

| Command | Function |
| ------- | -------- |
| `cat file1.txt` | Reads the contents of the file and prints it on default standard output - the screen |
| `cat file1.txt > file2.txt` | Reads the contents of the file and prints it on the redirected standard output, i.e. `file2.txt`. If `file2.txt` doesn't exist, it is created and the contents of `file1.txt` is written on it. If `file2.txt` exists, it is overwritten with contents of `file1.txt`. |
| `cat file1.txt file2.txt > combinedfile.txt` | Reads the contents of the files and prints it on the redirected standard output, i.e. `combinedfile.txt`. If `combinedfile.txt` doesn't exist, it is created and the contents of `file1.txt` and `file2.txt` are written on it. If `combinedfile.txt` exists, it is overwritten with contents of `file1.txt` and `file2.txt`. |
| `ls -l Work > TestFolder/Work.txt` | Lists the contents of the directory `Work` and writes the contents on the redirected standard output, i.e. `TestFolder/Work.txt`.<br>If `Testfolder` directory doesn't exist, then it defaults to the default standard output, i.e. the screen.<br>If `TestFolder/Work.txt` doesn't exist, it is created and the results of `ls -l Work` are written on it.<br>If `TestFolder/Work.txt` exists, it is overwritten with the results of `ls -l Work`. |

---