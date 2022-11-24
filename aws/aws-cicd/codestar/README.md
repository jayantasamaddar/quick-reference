# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Create a Project](#create-a-project)
- [Codestar Project Actions](#codestar-project-actions)

---

# Overview

- An integrated solution that groups: `GitHub`, `CodeCommit`, `CodeBuild`, `CodeDeploy`, `CloudFormation`, `CodePipeline`, `CloudWatch` and so on. (One view for all these tools)
- Quickly create **CICD-ready** projects for EC2, Lambda, Elastic Beanstalk
- **Supported Languages**:
  - C#
  - Go
  - HTML 5
  - Java
  - Node.js
  - PHP,
  - Python,
  - Ruby
- Issue tracking integration with `JIRA` / `GitHub Issues`
- Ability to integrate with **`Cloud9`** to obtain a Web IDE (not all regions)
- One Dashboard to view all your components.
- Free service, pay only for the underlying usage of other services
- Limited Customization (Customize each tool in greater details in their own console)

---

# Create a Project

- Go to the **[AWS Codestar console](https://ap-southeast-1.console.aws.amazon.com/codesuite/codestar/projects?region=ap-southeast-1)**.

- If there is no Service Role created for AWS Codestar, we will find a warning at the top of the screen that says we have to create an IAM Service Role first.

- Click the **`Create service role`** button to create the Service Role. This will be done behind the scenes. We can find this role as **`aws-codestar-service-role`** in IAM Roles.

- Click the **`Create a Project`** button.

- Choose a Project template among the many available and Click **`Next`**. Each template consists of:

  - **A programming language / framework**: `C#`, `HTML 5`, `PHP`, `Python`, `Ruby`, `Node.js`, `Go`, `Java`, etc.
  - **Application type**: `Web application`, `Web service`, `Static website`, `Alexa skill`, `AWS Config rule`
  - **AWS service**:
    - `AWS Lambda`: Runs serverless
    - `AWS EC2`: Runs on virtual servers that you manage
    - `AWS Elastic Beanstalk`: Runs in a managed application environment

- Set up your Project:

  1. **Project details**:

     - **Project name**:
     - **Project ID**: This ID will be appended to names generated for resource ARNs and other AWS resources. Project ID must be within 2-15 characters, start with a letter, and can only contain lowercase letters, numbers, and dashes.

  2. **Project repository**:

  - **Select a repository provider**:

    - **`CodeCommit`**: Use a new AWS CodeCommit repository for your project.
    - **`GitHub`**: Use a new GitHub source repository for your project (requires an existing GitHub account).

  - **Repository name**: Repository name can only contain letters, numbers, dashes, underscores, and periods. It cannot end with ".git".

  3. **EC2 Configuration**:

  - **Instance type**: E.g. `t2.micro`
  - **Key pair**: Use a key pair to securely connect to your instance. We may need to **Create a key pair**

- Click **`Next`** to Review all configuration.

- Click **`Create project`** to create the project and setup project resources. The provisioning is backed by CloudFormation stack.

---

# Codestar Project Actions

1. **`Set up AWS Cloud9`**: The AWS Cloud9 cloud-based IDE is fully integrated into AWS developer tools and ready to use in seconds.
2. **`Set up other IDEs`**: Add integrations with Visual Studio, Eclipse and the CLI.
3. **`Set up issue tracking`**: Add issue tracking to your development workflow. Integrations with Atlassian Jira.
4. **`Add people to your project`**: Add team members to the project with IAM users.

---
