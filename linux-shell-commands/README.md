# Table of Contents

- [Table of Contents](#table-of-contents)
- [General Commands](#general-commands)
- [Using Multiple Commands](#using-multiple-commands)
- [Continuing a Long Command on the Next Line](#continuing-a-long-command-on-the-next-line)
- [Perusing Command History](#perusing-command-history)
- [Hotkeys and Keyboard Shortcuts](#hotkeys-and-keyboard-shortcuts)
- [Navigation](#navigation)
- [Basic CRUD Tasks.](#basic-crud-tasks)
- [Move, Rename, Copy](#move-rename-copy)
  - [Move and Rename](#move-and-rename)
  - [Copy](#copy)
- [Matching File Names Using Path Name Expansion](#matching-file-names-using-path-name-expansion)
  - [Pattern Matching / Globbing](#pattern-matching--globbing)
  - [Brace Expansion](#brace-expansion)
  - [Variable Expansion](#variable-expansion)
  - [Preventing Arguments from Expansion](#preventing-arguments-from-expansion)
- [Users and Groups](#users-and-groups)
  - [Superuser](#superuser)
  - [Configuring the Superuser access and privileges](#configuring-the-superuser-access-and-privileges)
  - [Managing Local Users](#managing-local-users)
  - [Managing Local Groups](#managing-local-groups)
- [File System Permissions](#file-system-permissions)
  - [View File Permissions](#view-file-permissions)
  - [Changing Permissions](#changing-permissions)
    - [Changing Permissions using the Symbolic Method](#changing-permissions-using-the-symbolic-method)
    - [Changing Permissions with the Numeric Method](#changing-permissions-with-the-numeric-method)
  - [Changing Ownership](#changing-ownership)
  - [Overriding Default File Permissions with `umask`](#overriding-default-file-permissions-with-umask)
- [Managing Processes and Jobs](#managing-processes-and-jobs)
  - [Controlling Processes and Jobs](#controlling-processes-and-jobs)
  - [Killing Processes](#killing-processes)
    - [Termination Signals](#termination-signals)
    - [Kill Commands](#kill-commands)
  - [Monitoring Processes](#monitoring-processes)
- [Managing Packages](#managing-packages)
- [Logging in to Remote Host via SSH](#logging-in-to-remote-host-via-ssh)
- [Secure Copy - Copying files from one host to another over a network using SSH](#secure-copy---copying-files-from-one-host-to-another-over-a-network-using-ssh)
    - [Copy file from local machine to remote host](#copy-file-from-local-machine-to-remote-host)
    - [Copy file from remote host to local machine](#copy-file-from-remote-host-to-local-machine)
- [Shell I/O Redirection](#shell-io-redirection)
- [Third Party Packages](#third-party-packages)
  - [Installing Nodejs via shell commands](#installing-nodejs-via-shell-commands)
  - [Updating Nodejs](#updating-nodejs)
  - [Preparing Package for Publishing to NPM](#preparing-package-for-publishing-to-npm)

---

# General Commands

| Command               | Function                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `whoami`              | Prints the current user to the terminal.                             |
| `echo`                | Prints a line of text to the terminal.                               |
| `pwd`                 | Prints the absolute path to the working directory.                   |
| `ls`                  | List contents of the directory.                                      |
| `history`             | List the last 1000 commands executed, numbered by execution order.   |
| `!1001`               | Execute the 1001th command executed.                                 |
| `clear`<br>`Ctrl + L` | Clear the terminal screen.                                           |
| `sudo su <user>`      | Switch User. Password required. Default: **`root`** user.            |
| `free`                | Shows the memory usage information.                                  |
| `date`                | Shows the date in local machine's configured timezone.               |
| `passwd`              | Password options, including changing or deleting the password.       |
| `file`                | Scans a file and determines what kind of content is within the file. |
| `cat`                 | Output the contents of the file to the screen.                       |
| `less`                | Displays a file page by page. Up-Down to scroll. Space to turn page. |
| `head`                | First `10` lines of the file.                                        |
| `tail`                | Last `10` lines of the file.                                         |
| `wc`                  | Returns lines, words and characters of a given file.                 |
| `pwd`                 | Prints name of the current/working directory.                        |
| `id`                  | Prints real and effective user and group IDs.                        |
| `man <command>`       | Access the interface to the system reference manuals.                |
| `w`                   | Show who is logged in and what they are doing.                       |

---

# Using Multiple Commands

We can use the semi-colon (`;`) as a separator to chain multiple commands in the same line.

```bash
whoami; ls -a;
```

---

# Continuing a Long Command on the Next Line

To use a long command, for e.g. when we want to use curl to send a HTTP POST request, we can use the backslash (`\`) as a separator to press Enter and go to the new line and continue the same command without executing it immediately. It allows us to skips the execution on pressing Enter.

```bash
curl -d '{"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}}' \
-X POST "https://your-development-store.myshopify.com/admin/api/2022-04/customers.json" \
-H "X-Shopify-Access-Token: {access_token}" \
-H "Content-Type: application/json"
```

---

# Perusing Command History

The `history` commands allows us to see a list of the most recent commands.

The bang (`!`) is used as a way to access these already executed commands.

| Command      | Function                                             |
| ------------ | ---------------------------------------------------- |
| `!<n>`       | Execute the nth command from the history of commands |
| `!<command>` | Executes the last `<command>` command                |

---

# Hotkeys and Keyboard Shortcuts

| Hotkeys               | Function                                                       |
| --------------------- | -------------------------------------------------------------- |
| `Ctrl` + `A`          | Jump to the beginning of the command line                      |
| `Ctrl` + `E`          | Jump to the end of the command line                            |
| `Ctrl` + `U`          | Clear the console to the beginning of the command line         |
| `Ctrl` + `K`          | Clear the console to the end of the command line               |
| `Ctrl` + `LeftArrow`  | Jump to the beginning of the previous word on the command line |
| `Ctrl` + `RightArrow` | Jump to the end of the next word on the command line           |
| `Ctrl` + `R`          | Search the history list of commands for a pattern              |
| `Esc` + `.`           | Reuse last argument of previous commands                       |

---

# Navigation

| Command        | Function                                                                           |
| -------------- | ---------------------------------------------------------------------------------- |
| `cd`           | Changes to the default working directory                                           |
| `cd directory` | Changes directory to 'directory' if it is a direct child of the current directory. |
| `cd ~`         | Changes directory to the current user's Home directory. Same as `cd /home/$USER`   |
| `cd ..`        | Changes directory to the parent directory.                                         |
| `cd /`         | Changes directory to the current user's root directory.                            |
| `cd -`         | Changes directory to the last visited directory.                                   |

---

# Basic CRUD Tasks.

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `mkdir directory` | Create a directory with the name `directory` |
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

> The `rm` and `rmdir` commands do not send the files or directories to the trash bin.

---

# Move, Rename, Copy

## Move and Rename

The syntax for move, is:

```bash
mv [flag] source destination
```

**Notes:**

> - Flags are optional.
> - If the destination is the same as the source, then the source is renamed.

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `mv test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. Works for directories too, as the `mv` command is a `move` command, which is a cut-and-paste command. |
| `mv -n test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-n` flag (no-clobber), if `newtest.txt` already exists, the `mv` command will not execute and the file will not be overwritten with the contents of the `test.txt`. |
| `mv -i test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-i` flag (interactive), it will ask the user for confirmation to execute the command. If `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`. |
| `mv -b test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-b` flag (backup), it will if `newtest.txt` already exists, it will be overwritten with the contents of the `test.txt`, however a backup of the original file with a tilde character(`~`) appended to it. |
| `mv -f test.txt newtest.txt` | Renames file 'test.txt' to 'newtest.txt' if it is a direct child of the current directory. With the `-f` flag (force), if `newtest.txt` already exists but is also write-protected, it will still be overwritten with the contents of the `test.txt`. Without the `-f` flag, write-protected files are ignored for overwriting and in such a case, the `mv` command will not execute. |
| `mv test.txt ~` | Moves file `test.txt` to the Home directory. |

---

## Copy

The syntax for copy, is:

```bash
cp [flag] source destination
```

**Notes:**

> - Flags are optional.
> - Copy (`cp`) only works on local machine. For remote copy, use `scp` command.

<!--prettier-ignore-->
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

# Matching File Names Using Path Name Expansion

## Pattern Matching / Globbing

| Command             | Function                                                                   |
| ------------------- | -------------------------------------------------------------------------- |
| `cat [!b]*`         | Prints contents of all files that do not start with `b`                    |
| `cat ???*`          | Print contents of all files that have least 3 characters in the filename   |
| `cat *[[:digit:]]*` | Print contents of all files that have at least one digit in the filename   |
| `cat [[:upper:]]*`  | Print contents of all files whose filenames begin with an uppercase letter |

---

## Brace Expansion

| Command                       | Function                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `touch test{1..4}.txt`        | Creates: `test1.txt` `test2.txt` `test3.txt` `test4.txt`     |
| `touch test{a..b}{1..2}.txt`  | Creates: `test1a.txt` `test1b.txt` `test2a.txt` `test2b.txt` |
| `touch test{a{1..2},b,c}.txt` | Creates: `testa1.txt` `testa2.txt` `testb.txt` `testc.txt`   |
| `mkdir -p ~/season{1..2}`     | Creates directories in home directory: `season1` `season2`   |

---

## Variable Expansion

<!--prettier-ignore-->
| Command        | Function                                 |
| -------------- | ---------------------------------------- |
| `echo ${USER}` | Displays the current user on the screen. |
| `echo Today is the $(date +%d)th of $(date +%B), $(date +%Y).` | Outputs: `Today is the 21th of August, 2022.` |

---

## Preventing Arguments from Expansion

<!--prettier-ignore-->
| Command          | Function                                                                         |
| ---------------- | -------------------------------------------------------------------------------- |
| `echo ${USER}`   | Displays the current user on the screen. If USER=`username`. Outputs: `username` |
| `echo \${USER}.` | Escape character. Prevents next character from expansion. Outputs: `$USER`       |
| `echo "*** User: ${USER} ***"` | Suppresses Globbing and Brace Expansion but allows Command and Variable Substitution. Outputs: `*** User: jayantasamaddar ***`                                       |
| `echo '*** User: $USER} ***'`  | Stops all Shell Expansion. Outputs: `*** User: ${USER} ***`        |

---

# Users and Groups

<!--prettier-ignore-->
| Command              | Function                                                   |
| -------------------- | ---------------------------------------------------------- |
| `id`                 | Print real and effective user and group IDs.               |
| `id <user>`          | Show information about an user                             |
| `ls -l <directory>`  | View the owner of all files in the directory               |
| `ls -ld <directory>` | View the owner of the directory                            |
| `ps`                 | Reports a snapshot of processes in the current shell       |
| `ps -a`              | Reports a snapshot of processes associated with a terminal |
| `ps -au`             | Reports a snapshot of processes associated with a terminal with their associated users |

## Superuser

| Command       | Function                                                                      |
| ------------- | ----------------------------------------------------------------------------- |
| `su`          | Switches to root user. Note: In Ubuntu, the root user is disabled by default. |
| `sudo -i`     | In Ubuntu, switch to the root user with a login shell.                        |
| `sudo - user` | Start new user with a login shell                                             |
| `sudo user`   | Switch to the user with a non-login shell.                                    |
| `sudo visudo` | Opens `/etc/sudoers.tmp` where we can modify superuser access and privileges. |
| `echo $0`     | Check if this is a login shell (`-bash`) or non-login shell (`bash`).         |

## Configuring the Superuser access and privileges

Open the `/etc/sudoers.tmp` configuration file to modify root user access and privileges by using:

```bash
sudo visudo
```

Discretion must be used while modifying this file.

Example:

```bash
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults        env_reset
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Members of the admin group may gain root privileges without a password
# %admin ALL=(ALL) NOPASSWD:ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d

```

> **Note:**
>
> You may see `sudo su -` used instead of `sudo -i`. Both commands work, but there are some subtle differences between them.
>
> The `sudo su -` command sets up the root environment exactly like a normal login because the `su -` command ignores the settings made by sudo and sets up the environment from scratch.
>
> The default configuration of the `sudo -i` command actually sets up some details of the **root** user's environment differently than a normal login. For example, it sets the **PATH** environment variable slightly differently. This affects where the shell will
> look to find commands.
>
> You can make **`sudo -i`** behave more like **`su -`** by editing **`/etc/sudoers`** with
> **`visudo`**. Find the line
>
> ```bash
> Defaults secure_path = /sbin:/bin:/usr/sbin:/usr/bin
> ```
>
> and replace it with the following two lines:
>
> ```
> Defaults secure_path = /usr/local/bin:/usr/bin
> Defaults>root secure_path = /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
> ```

---

## Managing Local Users

| Command              | Function                                                             |
| -------------------- | -------------------------------------------------------------------- |
| `useradd <username>` | Creates a new user named `<username>`. Password is not yet set.      |
| `usermod <username>` | Modifies an user named `<username>`.                                 |
| `userdel <username>` | Deletes a user.                                                      |
| `passwd <username>`  | Sets initial password or changes existing password for `<username>`. |

> **Note:**
>
> - The **`SYS_UID_MIN`** and **`SYS_UID_MAX`** configuration items in **`/etc/login.defs`** define the range of system UIDs. **Default:** `100-999`.

---

## Managing Local Groups

Groups must exist before an user can be added to that group.

| Command                      | Function                                                          |
| ---------------------------- | ----------------------------------------------------------------- |
| `groupadd <group>`           | Creates a new group named `<group>`. Uses the next available GID. |
| `groupadd -g <n> <group>`    | Creates a new group named `<group>` with GID `<n>`.               |
| `groupadd -r <group>`        | Creates a system group named `<group>` using a valid system GID.  |
| `groupmod <group>`           | Modifies an group named `<group>`.                                |
| `groupmod -n <group>`        | Rename the group.                                                 |
| `groupmod -g <n> <group>`    | Reassign a GID `<n>` to the group.                                |
| `groupdel <group>`           | Deletes a group.                                                  |
| `usermod -g <group> <user>`  | Change a user's primary group.                                    |
| `usermod -aG <group> <user>` | Add a user to a supplementary group.                              |

> **Note:**
>
> - The **`SYS_GID_MIN`** and **`SYS_GID_MAX`** configuration items in **`/etc/login.defs`** define the range of system GIDs. **Default:** `100-999`.
> - You cannot remove a group if it is the primary group of any existing user. As with **`userdel`** check file systems to ensure no files remain on the system that are owned by the group.

---

# File System Permissions

## View File Permissions

| Command  | Function                                                                          |
| -------- | --------------------------------------------------------------------------------- |
| `ls -l`  | View permissions of all files in a directory. Default: Current working directory. |
| `ls -ld` | View permissions of a directory. Default: Current working directory.              |

---

## Changing Permissions

### Changing Permissions using the Symbolic Method

```bash
chmod [Who][What][Which] [file|directory]
```

Where,

- **_Who_** is either **`u`**(user) or **`g`**(group) or **`o`**(others) or `a`(all)
- **_What_** is either **`+`**(add) or **`-`**(remove) or **`=`**(set)
- **_What_** is either **`r`**(read) or **`w`**(write) or **`x`**(execute)

<!--prettier-ignore-->
| Command       | Function                                                        |
| ------------- | --------------------------------------------------------------- |
| `chmod g=rwx PATH` | Set all `read`,`write` and `execute` permissions for directory or file for the group. |

---

### Changing Permissions with the Numeric Method

```bash
chmod [3 or 4-digit-Octal] [file|directory]
```

| Command           | Function                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| `chmod 600 PATH`  | Set `read`, `write` permissions for user.                                      |
| `chmod 640 PATH`  | Set `read`, `write` permissions for user.<br>Set `read` permissions for group. |
| `chmod 750 PATH`  | Set `read`, `write`, `execute` for user.<br> Set `read`, `execute` for group.  |
| `chmod 2770 PATH` | Set `read`, `write`, `execute` for group and user along with `setgid` bit.     |

---

## Changing Ownership

```bash
chown [flag] [user]:[optional group] [file-or-directory]
```

```bash
chgrp [flag] [group] [file-or-directory]
```

| Command                            | Function                                                         |
| ---------------------------------- | ---------------------------------------------------------------- |
| `chown <user> <file>`              | Set ownership of `file` to `user`                                |
| `chown -R <user> <directory>`      | Recursively change ownership of directory and all subdirectories |
| `chown :<group> <directory>`       | Changes the group ownership of `directory` to `group`            |
| `chown <user>:<group> <directory>` | Change the owner and group to `user` and `group` respectively    |
| `chgrp <group> <directory>`        | Changes the group ownership of `directory` to `group`            |

---

## Overriding Default File Permissions with `umask`

```bash
umask [permission-to-clear]
```

| Command      | File Permissions | Directory Permissions | Function                                   |
| ------------ | ---------------- | --------------------- | ------------------------------------------ |
| `umask 0002` | `-rw-rw-r`       | `drwxrwxr-x`          | Clears the write permission from `other`   |
| `umask 0004` | `-rw-rw--w-`     | `drwxrwx-wx`          | Clears the read permission from `other`    |
| `umask 0001` | `-rw-rw-rw-`     | `drwxrwxrw-`          | Clears the execute permission from `other` |

---

# Managing Processes and Jobs

## Controlling Processes and Jobs

<!--prettier-ignore-->
| Command  | Function                                                                                   |
| -------- | ------------------------------------------------------------------------------------------ |
| `ps`     | Report a snapshot of the current processes in the controlling terminal.                    |
| `ps -ef` | Reports a snapshot of all processes including processes without a controlling terminal.    |
| `top`    | Display a dynamically updating process list, memory usage, load average.                   |
| `sleep 10 &`      | The `&` implies a process running in the background.                              |
| `jobs`   | Displays the list of jobs that bash is tracking.                                           |
| `fg %<jobNumber>` | Brings background job with job number to the foreground.                          |
| `ps j`   | Reports of snapshot of the job details related to the processes that are running.<br>Returns the PGID (Process Group ID), SID (PID of the session leader or terminal that has launched the job). |
| `bg`    | Restarts the current job that is suspended.                                                 |
| `bg %<jobNumber>` | Restart a suspended process in the background.                                    |
| `w`             | Show who is logged in and what they are doing, including load average.              |

> **Note:** Users may kill their own processes only but root privilege is needed to kill processes owned by others.

---

## Killing Processes

### Termination Signals

<!--prettier-ignore-->
| Signal No. | Short Name | Definition         | Purpose |
| ---------- | ---------- | ------------------ | ------- |
| 1          | HUP        | Hangup             | Used to report termination of the controlling process of a terminal. Also used to request process reinitialization (configuration reload) without termination. |
| 2          | INT        | Keyboard Interrupt | Causes program termination. Can be blocked or handled. Sent by pressing INTR key sequence (**Ctrl+c**). |
| 3          | QUIT       | Keyboard Quit      | Similar to SIGINT; adds a process dump at termination. Sent by pressing QUIT key sequence (**Ctrl+\\**). |
| 9          | KILL       | Kill, unblockable  | Causes abrupt program termination. Cannot be blocked, ignored, or handled; always fatal. |
| 15 default | TERM       | Terminate          | Causes program termination. Unlike SIGKILL, can be blocked, ignored, or handled. The “polite” way to ask a program to terminate; allows self-cleanup. |
| 18         | CONT       | Continue           | Sent to a process to resume, if stopped. Cannot be blocked. Even if handled, always resumes the process. |
| 19         | STOP       | Stop, Unblockable  | Suspends the process. Cannot be blocked or handled. |
| 20         | TSTP       | Keyboard Stop      | Unlike SIGSTOP, can be blocked, ignored, or handled. Sent by pressing SUSP key sequence (**Ctrl+z**). |

> **Note:** Refer to signals by either their short (HUP) or proper (SIGHUP) name.

---

### Kill Commands

<!--prettier-ignore-->
| Command  | Function                                                                                   |
| -------- | ------------------------------------------------------------------------------------------ |
| `kill <signal>` | Sends any signal to a process by PID number.                                        |
| `kill -l`       | Lists all available signal targets.                                                 |
| `killall <prefix>` | Kills all processes with the prefix `prefix`.                                    |
| `pstree -p <user>` | View a process tree for the system for an user. The parent process' PID can be used to kill all children they have created (The parent bash login shell survives because the signal is only directed at child processes).                                                                      |
| `pkill <options>` | Kills one or many processes based on the following options: `Command name` \| `UID` \| `GID` \| `Parent` \| `Terminal`                                                                |
| `pkill -t tty3` | Terminate all processes run on the terminal but not the terminal itself.            |
| `pkill -SIGKILL -t tty3` | Terminate all processes including the terminal.                            |
| `pkill -p <PPID>` | Kill all child processes of process `PPID` but not the parent itself.             |
| `pkill -SIGKILL -P <PPID>` | Kill all child processes of process `PPID` but not the parent itself.    |
| `pgrep -ul <options>` | Lists one or many processes based on the following options: `Command name` \| `UID` \| `GID` \| `Parent` \| `Terminal`                                                                |
| `Ctrl + Z`      | Suspend Process.                                                                    |
| `Ctrl + C`      | Kill Process.                                                                       |
| `Ctrl + \`      | Core Dump and Kill Process.                                                         |

---

## Monitoring Processes

| Command  | Function                                                                          |
| -------- | --------------------------------------------------------------------------------- |
| `uptime` | Displays how long the system has been running, users, the current load average.   |
| `lscpu`  | Display information about the CPU architecture from `sysfs`, `/proc/cpuinfo` etc. |
| `top`    | Real-Time Monitoring of Processes                                                 |

**Keystrokes used with `top`**

<!--prettier-ignore-->
| Key              | Purpose                                                                         |
| ---------------- | ------------------------------------------------------------------------------- |
| `?` or `h`       | Help for interactive keystrokes.                                                |
| `l`, `t`, `m`    | Toggles for load, threads, and memory header lines.                             |
| `1`              | Toggle showing individual CPUs or a summary for all CPUs in header.             |
| `s`              | Change the refresh (screen) rate, in decimal seconds (e.g., 0.5, 1, 5).         |
| `b`              | Toggle reverse highlighting for **Running** processes; default is bold only.    |
| `Shift + b`      | Enables use of bold in display, in the header, and for Running processes.       |
| `Shift + h`      | Toggle threads; show process summary or individual threads.                     |
| `u`, `Shift + u` | Filter for any user name (effective, real).                                     |
| `Shift + m`      | Sorts process listing by memory usage, in descending order.                     |
| `Shift + p`      | Sorts process listing by processor utilization, in descending order.            |
| `k`              | Kill a process. When prompted, enter **PID**, then **signal**.                  |
| `r`              | Renice a process. When prompted, enter **PID**, then **nice_value**.            |
| `Shift + w`      | Write (save) current display configuration for use at the next **top** restart. |
| `q`              | Quit.                                                                           |
| `f` | Manage the columns by enabling or disabling fields. Also allows you to set the sort field for **top**. |

---

# Managing Packages

These days most operating systems and development platforms come with a package manager.

Common package managers are:

- yum
- apt
- npm
- yarn
- pip
- NuGet

In Ubuntu, we have a package manager called `apt` which is short for, **Advanced Package Tool**.

The apt related commands are as follows:

| Command                           | Function                                                      |
| --------------------------------- | ------------------------------------------------------------- |
| `sudo apt update`                 | Updates the package database, i.e. list of available packages |
| `sudo apt upgrade`                | Updates the list of upgradeable packages                      |
| `sudo apt install <package-name>` | Installs the package                                          |
| `sudo apt remove <package-name>`  | Removes the package                                           |
| `apt list`                        | Lists all the available packages                              |
| `apt list --upgradable`           | Lists all the installed packages that can be upgraded         |
| `apt search <term>`               | Searches the available package list for packages              |
| `apt info <package-name>`         | Prints the info of the software package                       |

---

# Logging in to Remote Host via SSH

```bash
ssh
    [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
    [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
    [-i identity_file] [-J [user@]host[:port]] [-L address]
    [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
    [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
    [-w local_tun[:remote_tun]] destination [command [argument ...]]

```

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `ssh -i [private-key] [user]@[host]:[port]`<br>`ssh -i .ssh/root@oracle ubuntu@ocu1.duckdns.org`<br>`ssh -i .ssh/root@oracle ubuntu@158.101.20.236` | Connect to host via ssh |
| `curl icanhazip.com` | Gets the public IP address of the machine from the external address. |

---

# Secure Copy - Copying files from one host to another over a network using SSH

```bash
scp [flag] [private-key] sourceFilePath destinationFilePath
```

**Flags:**

<!--prettier-ignore-->
| Flag | Function |
| ---- | -------- |
| `-i` | Selects the file from which the identity (private key) for public key authentication is read. This option is directly passed to ssh |
| `-r` | Recursively copies the contents of the source directory to the destination directory. |

### Copy file from local machine to remote host

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `scp -i .ssh/root@oracle test.txt ubuntu@ocu1.duckdns.org:/home/ubuntu/` | Copies test.txt from the current local machine folder to the host/home/ubuntu/ folder |

### Copy file from remote host to local machine

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `scp -i .ssh/root@oracle ubuntu@ocu1.duckdns.org:/home/ubuntu/test.txt  ~` | Copies test.txt from the remote host to the Home folder in local machine |

---

# Shell I/O Redirection

One of the most important concepts of Linux is the concept of Standard Input and Standard Output.
So by default Standard Input represents the keyboard and Standard Output represents the screen.
But in the shell, we can change the source of the Standard Input and Standard Output to different files. This is called, **Redirection**.

- The redirection operator for Standard Output is the greater than `>`. This also overwrites if it is done on a file that exists.
- The redirection operator `>>` is used to append to a file that already exists.
- The redirection operator for Standard Input is the less than `<`.

<!--prettier-ignore-->
| Command | Function |
| ------- | -------- |
| `cat file1.txt` | Reads the contents of the file and prints it on default standard output - the screen |
| `cat file1.txt > file2.txt` | Reads the contents of the file and prints it on the redirected standard output, i.e. `file2.txt`. If `file2.txt` doesn't exist, it is created and the contents of `file1.txt` is written on it. If `file2.txt` exists, it is overwritten with contents of `file1.txt`. |
| `cat file1.txt file2.txt > combinedfile.txt` | Reads the contents of the files and prints it on the redirected standard output, i.e. `combinedfile.txt`. If `combinedfile.txt` doesn't exist, it is created and the contents of `file1.txt` and `file2.txt` are written on it. If `combinedfile.txt` exists, it is overwritten with contents of `file1.txt` and `file2.txt`. |
| `ls -l Work > TestFolder/Work.txt` | Lists the contents of the directory `Work` and writes the contents on the redirected standard output, i.e. `TestFolder/Work.txt`.<br>If `Testfolder` directory doesn't exist, then it defaults to the default standard output, i.e. the screen.<br>If `TestFolder/Work.txt` doesn't exist, it is created and the results of `ls -l Work` are written on it.<br>If `TestFolder/Work.txt` exists, it is overwritten with the results of `ls -l Work`. |

---

# Third Party Packages

## [Installing Nodejs via shell commands](https://github.com/nodesource/distributions)

<!--prettier-ignore-->
Command | Function
------- | --------
`curl -fsSL https://deb.nodesource.com/setup_lts.x \| sudo -E bash -sudo apt-get install -y nodejs` | Installs nodejs LTS sources in Apt
`sudo apt-get install -y nodejs` | Installs nodejs and npm

---

## Updating Nodejs

| Command                          | Function                                    |
| -------------------------------- | ------------------------------------------- |
| `node -v`                        | Check node version                          |
| `npm -v`                         | Check Node package manager version          |
| `npm cache clean -f`             | Clears npm cache                            |
| `sudo npm install -g npm@latest` | Upgrade npm to latest version of npm        |
| `sudo npm install -g n`          | Install n, node's version manager           |
| `sudo n stable`                  | Installs the current stable version of node |
| `sudo n latest`                  | Installs the latest version of node         |
| `hash -r`                        | Resets the location hash                    |

---

## Preparing Package for Publishing to NPM

<!--prettier-ignore-->
Command | Function
------- | --------
`node -v > .nvmrc` | Creates a .nvmrc file with the current node version.
`npm pack` | Creates a package.tgz file with the current project.
`npm link` | Creates a symlink to the package.tgz file in the project's node_modules folder.
`npm adduser`<br>`npm adduser --registry https://registry.npmjs.org` | Adds a user to the npm registry.
`npm adduser --registry https://registry.npmjs.org --scope public` | Adds a user to the npm registry and makes it public.
`npm adduser --registry https://registry.npmjs.org --scope private` | Adds a user to the npm registry and makes it private.
`npm publish` | Publishes the current package to npm.
`npm publish --access public` | Publishes the current package to npm and makes it public.
`npm publish --access private` | Publishes the current package to npm and makes it private.

---
