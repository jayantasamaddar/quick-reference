# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [The `buildspec.yml` file](#the-buildspecyml-file)
- [Running CodeBuild Locally](#running-codebuild-locally)
- [Running CodeBuild within a VPC](#running-codebuild-within-a-vpc)
- [References](#references)

---

# Overview

**AWS CodeBuild** is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy. With CodeBuild, you don’t need to provision, manage, and scale your own build servers. CodeBuild scales continuously and processes multiple builds concurrently, so your builds are not left waiting in a queue.

- **Expects a Source**: `AWS CodeCommit`, `S3`, `Bitbucket`, `GitHub`
- **Expects Build Instructions**: Code file **`buildspec.yml`** to be present in the repository or inserted manually via Console
- Output logs can be stored into Amazon S3 and CloudWatch logs for later analysis
- Use **`CloudWatch Metrics`** to monitor build statistics
- Use **`CloudWatch Events`** to detect failed builds and trigger notifications
- Use **`CloudWatch Alarms`** to notify if you need **_"thresholds"_** for failures
- Build Projects can be defined either within **`CodePipeline`** or **`CodeBuild`**
- Supported Environments:

  - Java
  - Ruby
  - Python
  - Go
  - Node.js
  - Android
  - .NET Core
  - PHP
  - Docker - extend any environment you like

- How does it work:
  - We have the Source Code + `buildspec.yml` in our source repository
  - CodeBuild will fetch this code and then run it in a container (a build environment pulled from a Docker image). This container will load all the source code and the `buildspec.yml` and is going to run all the instructions that are specified in the `buildspec.yml` file.
  - The build can be lengthy so there is a feature to cache a bunch of files in a S3 Bucket to reuse some build files
  - Logs are stored in Amazon S3 and CloudWatch Logs if you enable it.
  - Once CodeBuild is done building / testing your code, it can produce some artifacts. These artifacts will be extracted out of the container and stored in an S3 Bucket. This is where you can find your final outputs of CodeBuild.

---

# The `buildspec.yml` file

A `buildspec` is a collection of build commands and related settings, in YAML format, that CodeBuild uses to run a build. You can include a buildspec as part of the source code or you can define a buildspec when you create a build project.

**Syntax:**

```yml
version: 0.2

run-as: Linux-user-name

env:
  shell: shell-tag
  variables:
    key: "value"
    key: "value"
  parameter-store:
    key: "value"
    key: "value"
  exported-variables:
    - variable
    - variable
  secrets-manager:
    key: secret-id:json-key:version-stage:version-id
  git-credential-helper: no | yes

proxy:
  upload-artifacts: no | yes
  logs: no | yes

batch:
  fast-fail: false | true
  # build-list:
  # build-matrix:
  # build-graph:

phases:
  install:
    run-as: Linux-user-name
    on-failure: ABORT | CONTINUE
    runtime-versions:
      runtime: version
      runtime: version
    commands:
      - command
      - command
    finally:
      - command
      - command
  pre_build:
    run-as: Linux-user-name
    on-failure: ABORT | CONTINUE
    commands:
      - command
      - command
    finally:
      - command
      - command
  build:
    run-as: Linux-user-name
    on-failure: ABORT | CONTINUE
    commands:
      - command
      - command
    finally:
      - command
      - command
  post_build:
    run-as: Linux-user-name
    on-failure: ABORT | CONTINUE
    commands:
      - command
      - command
    finally:
      - command
      - command
reports:
  report-group-name-or-arn:
    files:
      - location
      - location
    base-directory: location
    discard-paths: no | yes
    file-format: report-format
artifacts:
  files:
    - location
    - location
  name: artifact-name
  discard-paths: no | yes
  base-directory: location
  exclude-paths: excluded paths
  enable-symlinks: no | yes
  s3-prefix: prefix
  secondary-artifacts:
    artifactIdentifier:
      files:
        - location
        - location
      name: secondary-artifact-name
      discard-paths: no | yes
      base-directory: location
    artifactIdentifier:
      files:
        - location
        - location
      discard-paths: no | yes
      base-directory: location
cache:
  paths:
    - path
    - path
```

Where,

- **`version`**: `0.2` (Recommended). Represents the buildspec version. (**REQUIRED**)

- **`run-as`**: Available to Linux users only. Specifies a Linux user that runs commands in this buildspec file. `run-as` grants the specified user read and run permissions. When you specify `run-as` at the top of the buildspec file, it applies globally to all commands. If you don't want to specify a user for all buildspec file commands, you can specify one for commands in a phase by using `run-as` in one of the `phases` blocks. If `run-as` is not specified, then all commands run as the root user. (**OPTIONAL**)

- **`proxy`**: Used to represent settings if you run your build in an explicit proxy server. For more information, see [Run CodeBuild in an explicit proxy server](https://docs.aws.amazon.com/codebuild/latest/userguide/use-proxy-server.html#run-codebuild-in-explicit-proxy-server) (**OPTIONAL**)

- **`env`**: Represents information for one or more custom environment variables. (**OPTIONAL**)

  - `variables`: plaintext variables
  - `parameter-store`: variables stored in SSM Parameter Store
  - `secrets-manager`: variables stored in AWS Secrets Manager

- **`phases`**: Represents the commands CodeBuild runs during each phase of the build. (**REQUIRED**)

  - `install`: install dependencies you may need for your build
  - `pre_build`: final commands to execute just before build
  - `build`: actual build commands
  - `post_build`: finishing touches right after build (e.g. zip output)

- **`artifacts`**: what to upload to Amazon S3 (encrypted with KMS)

- **`cache`**: files to cache (usually dependencies) to S3 for future build speed up

---

# Running CodeBuild Locally

AWS CodeBuild is something that runs on the Cloud, but it is possible if you need some deep troubleshooting beyond the logs to run CodeBuild locally on your Desktop.

- Install Docker
- [Run the CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html).
- This allows you to reproduce a CodeBuild build on your local machine and really see what's going on when you have failures.

---

# Running CodeBuild within a VPC

- By default AWS CodeBuild containers are launched outside your VPC. The limitaions are:
  - It cannot access resources within a VPC
- You can specify a VPC configuration:
  - VPC ID
  - Subnet IDs
  - Security Group IDs
- Then your build can access resources in your VPC (e.g. RDS, ElastiCache, EC2, ALB etc.)
- Use Cases:
  - Integration testing
  - Data query
  - Talk to internal load balancers, etc.

---

# References

- [Build spec reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
- [Run CodeBuild in an explicit proxy server](https://docs.aws.amazon.com/codebuild/latest/userguide/use-proxy-server.html#run-codebuild-in-explicit-proxy-server)
- [Run the CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html)
