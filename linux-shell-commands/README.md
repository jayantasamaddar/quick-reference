# Linux Shell Commands

## Basic CRUD Tasks.

| Command | Function |
| ------- | -------- |
| `mkdir directory` | Create a directory with the name 'directory' |
| `cd directory` | Changes directory to 'directory' if it is a direct child of the current directory. |
| `cd ~` | Changes directory to the Home directory. Same as `cd /home/$USER` |
| `cd ..` | Changes directory to the parent directory. |
| `cd /` | Changes directory to the root directory. |
| `ls` | Shows all the directories and files of the current directory. |
| `touch test.txt` | Creates an empty file in the current directory with the name 'test.txt'. |
| `nano test.txt` | Opens the file 'test.txt' for edit in the text editor nano. Opens a blank text file for edit, if it doesn't exist. |
| `cat test.txt` | Reads the contents of the 'test.txt' file and displays it on the terminal. |
| `rm test.txt` | Removes 'test.txt' if it is a direct child of the current directory. |
| `rm -d testfolder`<br>`rmdir testfolder` | Removes 'testfolder' if it is a direct child of the current directory and is empty. |
| `rm -r testfolder` | Removes 'testfolder' if it is a direct child of the current directory and contains subfolders and files (`-r` flag for recursive removal). |
| `rm -d -i testfolder` | Prompts to remove 'testfolder' if it is a direct child of the current directory. |

Note: The rm and rmdir commands do not send the files or directories to the trash bin.
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
> - If the destination is the same as the source, then the source is renamed.



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

## Installing Nodejs via shell commands

Command | Function
------- | --------
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -sudo apt-get install -y nodejs | Installs nodejs LTS sources in Apt
sudo apt-get install -y nodejs | Installs nodejs and npm

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

## Logging in to Host via SSH 

Command | Function
------- | --------
ssh -i .ssh/root@oracle **username**@**hostname**<br>ssh -i .ssh/root@oracle ubuntu@ocu1.duckdns.org<br>ssh -i .ssh/root@oracle ubuntu@158.101.20.236 | Connect to host via ssh
curl icanhazip.com | Gets the public IP address of the machine from the external address.


## Copy from one host to another

Command | Function
------- | --------
scp -i .ssh/root@oracle test.txt ubuntu@ocu1.duckdns.org:/home/ubuntu/ | Copies test.txt from the current local machine folder to the host/home/ubuntu/ folder