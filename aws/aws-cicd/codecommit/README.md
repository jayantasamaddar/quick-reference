# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Why use AWS CodeCommit?](#why-use-aws-codecommit)
- [AWS CodeCommit Actions](#aws-codecommit-actions)
  - [Create a Repository](#create-a-repository)
    - [Create a Repository: Using Console](#create-a-repository-using-console)
    - [Create a Repository: Using AWS CLI](#create-a-repository-using-aws-cli)
  - [List all Repositories (using CLI)](#list-all-repositories-using-cli)
  - [Add a File to a Repository (Specific branch)](#add-a-file-to-a-repository-specific-branch)
    - [Add a File to a Repository: Using CLI](#add-a-file-to-a-repository-using-cli)
  - [Delete a Repository](#delete-a-repository)
    - [Delete a Repository: Using Console](#delete-a-repository-using-console)
    - [Delete a Repository: Using CLI](#delete-a-repository-using-cli)
- [AWS CodeCommit and Git Workflow](#aws-codecommit-and-git-workflow)
- [Event Handling](#event-handling)
  - [Notification Rules](#notification-rules)
  - [Triggers](#triggers)
  - [Differences between Notification and Trigger](#differences-between-notification-and-trigger)

--

# Overview

AWS CodeCommit is a secure, highly scalable, fully managed source control service that hosts private Git repositories. It's AWS' proprietary competitor for GitHub or GitLab.

- Version Control is the ability to understand the various code changes that happened in the code (who committed, what was added and removed) over time and possibly rollback if necessary.
- All these are enabled using an underlying version control system such as **Git**.
- A Git repository can be synchronized on your computer, but it is usually uploaded on a central online repository
- Benefits:
  - Collaboration between developers
  - Code is backed up
  - Code is viewable easily and audited

---

# Why use AWS CodeCommit?

- Git repositories (The industry includes GitHub, GitLab, BitBucket) can be expensive
- AWS CodeCommit:
  - Private Git repositories (Code lives and stays within your VPC in AWS)
  - No size limit on repositories (scale seamlessly)
  - Fully managed, highly available
  - Code only in AWS Cloud account - increased security and compliance
  - Security (encrypted, access control using IAM etc)
    - Interactions are done using Git (standard)
    - **Authentication**:
      - SSH Keys - AWS users can configure SSH Keys in their IAM Console
      - HTTPS - with AWS CLI Credential helper or Git Credentials for IAM user
    - **Authorization**:
      - IAM policies to manage users/roles permissions to repositories
    - **Encryption**:
      - Repositories are automatically encrypted at rest using AWS KMS (no one else but you can retrieve the contents)
      - Encrypted in transit (can only use HTTPS or SSH - both secure)
    - Cross-account Access:
      - Do NOT share your SSH Keys or your AWS Credentials
      - Use an IAM Role in your AWS account and use AWS STS (AssumeRole API) to get access to a CodeCommit repo
  - Integrations with industry standard tools (AWS CodeBuild, Jenkins and other CI tools)

**CodeCommit vs GitHub**

|                                     | CodeCommit              | GitHub                         |
| ----------------------------------- | ----------------------- | ------------------------------ |
| Support Code Review (Pull Requests) | Yes                     | Yes                            |
| Integration with AWS CodeBuild      | Yes                     | Yes                            |
| Authentication (SSH and HTTPS)      | Yes                     | Yes                            |
| Security                            | IAM Roles & Users       | GitHub Users                   |
| Hosting                             | Managed & hosted by AWS | Hosted by GitHub / self hosted |
| UI                                  | Minimal                 | Fully Featured                 |

---

# AWS CodeCommit Actions

## Create a Repository

### Create a Repository: Using Console

1. Go to the **[AWS CodeCommit Repositories page](https://ap-south-1.console.aws.amazon.com/codesuite/codecommit/repositories)**.
2. Click **`Create repository`**.
3. Enter the following information:

   - **Repository Settings**:
     - **Repository name**: 100 characters maximum. Other limits apply. (Mandatory)
     - **Description (optional)**: 1,000 characters maximum.
   - **Tags**: Repository Tags that are a key-value pair. (A tag is a label that you assign to an AWS resource. Each tag consists of a key and an optional value. You can use tags to help manage and secure your resources or to help track costs.)

---

### Create a Repository: Using AWS CLI

**Syntax:**

```s
aws codecommit create-repository --repository-name [name] --repository-description [description] --tags [key1=value,key2=value,...]
```

**Example:**

```s
aws codecommit create-repository --repository-name test-repo-cli --repository-description "This is a test repo created from AWS CLI using the AWS CodeCommit API" --tags type=test,author="Jayanta Samaddar"
```

**Response:**

```json
{
  "repositoryMetadata": {
    "accountId": "336463900088",
    "repositoryId": "7d4472e1-039c-4994-956a-5b66b8e4e386",
    "repositoryName": "test-repo-cli",
    "repositoryDescription": "This is a test repo created from AWS CLI using the AWS CodeCommit API",
    "lastModifiedDate": "2022-11-22T18:47:32.292000+05:30",
    "creationDate": "2022-11-22T18:47:32.292000+05:30",
    "cloneUrlHttp": "https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/test-repo-cli",
    "cloneUrlSsh": "ssh://git-codecommit.ap-south-1.amazonaws.com/v1/repos/test-repo-cli",
    "Arn": "arn:aws:codecommit:ap-south-1:336463900088:test-repo-cli"
  }
}
```

---

## List all Repositories (using CLI)

**Command:**

```s
aws codecommit list-repositories
```

**Response:**

```json
{
  "repositories": [
    {
      "repositoryName": "test-repo-cli",
      "repositoryId": "d58f3b22-36a1-40bd-a10b-a68893775c9a"
    }
  ]
}
```

---

## Add a File to a Repository (Specific branch)

### Add a File to a Repository: Using CLI

**Syntax:**

```s
aws codecommit put-file \
 --repository-name [repoName] \
 --branch-name [branchName] \
 --file-content [base64-encoded-binary-data-object] \
 --file-path [filePath] \
 --commit-message [message]
```

**Example:**

```s
aws codecommit put-file \
 --repository-name test-repo-cli \
 --branch-name main \
 --file-content $(cat hello.txt | base64) \
 --file-path ~/hello.txt \
 --commit-message "Added Hello World"
```

**Response:**

```json
{
  "commitId": "486ae887ca1c13ca1652a05c6b53e5701346321c",
  "blobId": "980a0d5f19a64b4b30a87d4206aade58726b60e3",
  "treeId": "172c7dcda7f72766bc94727beab70d8486ce8cea"
}
```

---

## Delete a Repository

### Delete a Repository: Using Console

1. Go to the **[AWS CodeCommit Repositories page](https://ap-south-1.console.aws.amazon.com/codesuite/codecommit/repositories)**.
2. Select the repository you want to delete.
3. Click **`Delete repository`** from the Action Buttons above. You will get a message that reads:

   "Are you sure you want to delete the repository test-repo-cli?

   This will delete the repository in AWS CodeCommit, including all branches, triggers, comments, pull requests, and history. Deleting the repository cannot be undone.

   Users will no longer be able to connect to the repository in AWS CodeCommit, but they will still have access to their local repositories."

4. Type `delete` to confirm deletion and click the **`Delete`** button to delete the repository.

---

### Delete a Repository: Using CLI

**Syntax:**

```s
aws codecommit delete-repository --repository-name [name]
```

**Example:**

```s
aws codecommit delete-repository --repository-name test-repo-cli
```

**Response:**

```json
{
  "repositoryId": "7d4472e1-039c-4994-956a-5b66b8e4e386"
}
```

---

# AWS CodeCommit and Git Workflow

We will probably want to synchronize our local Git repo with Amazon CodeCommit instead of GitHub while having the same Git-based workflow that we usually have.

**Steps to link a Local Repository with AWS CodeCommit are as follows:**

1. [Create a Repository on AWS CodeCommit](#actions-create-a-repository)
2. Create a Local folder where you want to clone the CodeCommit repo.
3. We need to **Setup Git credentials for AWS CodeCommit**. We can do it in the following ways:

   1. **[Setup HTTPS Git Credentials for CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-gc.html)**

      - Go to **[AWS CodeCommit Credentials on the IAM Security Credentials](https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials?credentials=codecommit)**
      - In the **`HTTPS Git credentials for AWS CodeCommit`** section, click **`Generate Credentials`**.
      - Copy the Username and Password or Download credentials
      - We will be requiring this while cloning the repo.
      - **Important**: We may want to use a **[Credentials store](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)** or the **[AWS CLI credential helper](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-https-unixes.html)** to store the Username and Password to avoid repeated prompts.

   2. **[Setup SSH Connection for CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-unixes.html) - RECOMMENDED**

      - Generate a ssh key-pair using RSA encryption :

        ```s
        ssh-keygen -b 4096 -f ~/.ssh/aws-codecommit.key -t rsa
        ```

        This should generate a private key `aws-codecommit.key` and a public key `aws-codecommit.key.pub` in the `~/.ssh` folder.

      - `cat aws-codecommit.key.pub` to display and copy the value of the public key.
      - Go to **[AWS CodeCommit Credentials on the IAM Security Credentials](https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials?credentials=codecommit)**
      - Click the **`Upload SSH public key`** button and paste the contents of the public key there and click the `Upload SSH public key` button to save it.
      - Copy the **SSH key ID** that shows for the newly added SSH Public Key.
      - Back in the local computer, open the ssh config file in a text editor, e.g. `nano ~/.ssh/config`. There may be existing entries or this maybe a completely new file.
      - At the end of existing entries, enter:

        ```s
        Host git-codecommit.*.amazonaws.com
          User APKAEIBAERJR2EXAMPLE (Your SSH key ID)
          IdentityFile ~/.ssh/aws-codecommit.key
        ```

        Save and exit the file.

      - Ensure `read` and `write` permissions are present for the config file. Or run `chmod 600 ~/.ssh/config`
      - Run the following to test the SSH connection:

        ```s
        ssh git-codecommit.us-east-2.amazonaws.com
        ```

        Continue connecting by entering `yes` when prompted to add SSH connection to list of known hosts. We should get a confirmation of the authentication over ssh.

4. Go to the Repository and get the Clone URL. We will need this to run `git clone`.
   Note: You have to choose HTTPS URL if connecting over HTTPS or SSH URL when connecting over SSH

5. Run `git clone [ HTTPS_URL | SSH_URL ]`.

   - **When connecting over HTTPS**: You maybe prompted to enter the Username and Password we got from the IAM.
   - **When connecting over SSH**: The authenticity of the host maybe asked to be verified. Enter `yes` to continue connecting by adding to the list of known hosts.

6. We should see the repository appear as a folder.

   - Note: The default branch is `master`. A new branch can be created using `git branch -M [branchName]`, after the first commit (before first push).

7. To check if Git and CodeCommit are linked:

   - `cd` into the repo folder
   - `ls -a` to show all files and folders (including the hidden `.git` folder)
   - `cat config` to see the configuration. You'll find under `[remote "origin"]` the url to be the CodeCommit repo URL. This shows that the local repository and the CodeCommit repository are now linked.

8. We can test it out by creating a file locally and attempting to push it to the AWS CodeCommit repo:

   - Run `echo "Hello World!" > hello.txt` in the local repo folder.
   - `git add .` to stage the file(s); in this case, just the `hello.txt` file.
   - `git commit -m "First commit"` to commit the staged file(s).
   - `git push origin master` to push to the CodeCommit repo.
     - **If connected over HTTPS**: Unless we are using a Credentials store we maybe prompted to enter the IAM Git Credentials for AWS CodeCommit Username and Password again. Once entered the file(s) should be pushed to the remote CodeCommit repo.
     - **If connected over SSH**: The push should be seamless.

---

# Event Handling

## Notification Rules

Notification rules set up a subscription to events that happen with your resources. When these events occur, you will receive notifications sent to the targets you designate. You can manage your notification preferences in Settings.

- **[Create a Notification Rule](https://docs.aws.amazon.com/dtconsole/latest/userguide/notification-rule-create.html?icmpid=docs_acn_console_acc)**
- **[Create or configure a Notification rule target](https://docs.aws.amazon.com/dtconsole/latest/userguide/notification-target-create.html?icmpid=docs_acn_console_acc)**
- **[Events for Notification rules on Repositories](https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html?icmpid=docs_acn_console_acc#events-ref-repositories)**
- **[Configure Integration between Notifications and AWS Chatbot](https://docs.aws.amazon.com/dtconsole/latest/userguide/notifications-chatbot?icmpid=docs_acn_console_acc)**

---

## Triggers

You can configure a CodeCommit repository so that code pushes or other events trigger actions, such as sending a notification from `Amazon Simple Notification Service (Amazon SNS)` or invoking a function in `AWS Lambda`. You can create up to `10` triggers for each CodeCommit repository.

[Triggers](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify.html) are commonly configured to:

- Send emails to subscribed users every time someone pushes to the repository.
- Notify an external build system to start a build after someone pushes to the main branch of the repository.

Scenarios like notifying an external build system require writing a Lambda function to interact with other applications. The email scenario simply requires creating an Amazon SNS topic.

**To Setup Triggers**:

1. Select your Repository and go to **`Settings`** --> **`Triggers`**.
2. Click **`Create Trigger`** to create a Trigger.
3. Enter the following configuration:

   - **Trigger details**:

     - **Trigger name**:
     - **Events**:
       - `All repository events`
       - `Push to existing branch`
       - `Create branch or tag`
       - `Delete branch or tag`
     - **Branch names** (optional):

   - **Service details**:
     - **Choose the service to use**:
       - `Amazon SNS`
       - `AWS Lambda`
     - **Custom data** (optional): For example, a channel name or ID for your chat platform

---

## Differences between Notification and Trigger

<!-- prettier-ignore -->
| Notification           | Trigger                                                                   |
| -----------------------| ------------------------------------------------------------------------- |
| Uses CloudWatch Events | Do not use CloudWatch Events rules to evaluate repository events          |
| Wider scope            | Limited scope. Events are limited to operational events: such as creating and deleting branches and tags, pushing code to a branch or all repository events                    |
| Triggers for all branches | Can Trigger for all branches or specific branch(es)                    |
| Multiple targets possible (Amazon SNS and/or AWS Chatbot) | Only one target possible (Amazon SNS or AWS Lambda)                                                                                          |
|  | Can Optionally add custom data, for example: a channel name or ID in a separate field           |

---
