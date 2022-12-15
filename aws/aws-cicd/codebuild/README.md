# Table of Contents

- [Table of Contents](#table-of-contents)
- [Codebuild: Overview](#codebuild-overview)
- [CodeBuild: Build Projects](#codebuild-build-projects)
- [CodeBuild: Report Groups](#codebuild-report-groups)
- [CodeBuild: The `buildspec.yml` file](#codebuild-the-buildspecyml-file)
- [Running CodeBuild Locally](#running-codebuild-locally)
- [Running CodeBuild within a VPC](#running-codebuild-within-a-vpc)
- [Using the CLI](#using-the-cli)
  - [`create-project`](#create-project)
  - [`create-report-group`](#create-report-group)
  - [`list-projects`](#list-projects)
  - [`delete-report-group`](#delete-report-group)
- [References](#references)

---

# Codebuild: Overview

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

# CodeBuild: Build Projects

A **build project** includes information about how to run a build, including:

- Where to get the source code
- Which build environment to use
- Which build commands to run
- Where to store the build output

---

# CodeBuild: Report Groups

A report group contains reports created during the run of a build project. You specify test cases for a report group in the `buildspec.yml` file. Each time the test cases run during a new run of a project build, a new test report is created in that report group.

---

# CodeBuild: The `buildspec.yml` file

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

  - `upload-artifacts`: (Optional) Set to `yes` if you want your build in an explicit proxy server to upload artifacts. The default is `no`.
  - `logs`: (Optional) Set to `yes` for your build in a explicit proxy server to create CloudWatch logs. The default is `no`.

- **`env`**: Represents information for one or more custom environment variables. (**OPTIONAL**)

  - `variables`: plaintext variables
  - `parameter-store`: variables stored in SSM Parameter Store
  - `secrets-manager`: variables stored in AWS Secrets Manager
  - `exported-variables`: Used to list environment variables you want to export. Exported environment variables are used in conjunction with AWS CodePipeline to export environment variables from the current build stage to subsequent stages in the pipeline.

- **`phases`**: Represents the commands CodeBuild runs during each phase of the build. (**REQUIRED**)

  - `install`: install dependencies you may need for your build
  - `pre_build`: final commands to execute just before build
  - `build`: actual build commands
  - `post_build`: finishing touches right after build (e.g. zip output)

  - Each phase - `install`, `pre_build`, `build` and `post_build` has the following common blocks:

    - `run-as`: The user to run the phase as
    - `on-failure`: Option to either `ABORT` | `CONTINUE`
    - `commands`: Contains a sequence of scalars, where each scalar represents a single command that CodeBuild runs during installation. CodeBuild runs each command, one at a time, in the order listed, from beginning to end.
    - `finally`: Commands specified here, run after the commands in the `commands` block

- **`reports`**:

  - `report-group-name-or-arn`: If you use the buildspec to create a new report group, it is named using the format `project-name-report-group-name-specified-in-buildspec`. To use an existing report group, use the report group ARN instead.
    - `files`: Specifies the files that contain the test case results
    - `base-directory`: (Optional): Specifies the directory where the test case files are located
    - `discard-paths`: (Optional) Specifies whether paths to test result files uploaded to an Amazon S3 bucket are discarded.

- **`artifacts`**: What to upload to Amazon S3 (encrypted with KMS). This sequence is not required if, for example, you are building and pushing a Docker image to Amazon ECR, or you are running unit tests on your source code, but not building it.

  - `files`: (Required) Represents the locations that contain the build output artifacts in the build environment. Locations can include the following:

    - A single file (for example, `my-file.jar`).
    - A single file in a subdirectory (for example, `my-subdirectory/my-file.jar` or `my-parent-subdirectory/my-subdirectory/my-file.jar`).
    - `'**/*'` represents all files recursively.
    - `my-subdirectory/*` represents all files in a subdirectory named `my-subdirectory`.
    - `my-subdirectory/**/*` represents all files recursively starting from a subdirectory named `my-subdirectory`.

  - `name`: (Optional) Specifies a name for your build artifact. This name is used when one of the following is true. You can specify a name in the buildspec file that is calculated at build time. The name specified in a buildspec file uses the Shell command language.

    ```yml
    artifacts:
      files:
        - '**/*'
      name: myname-$(date +%Y-%m-%d)
    ```

  - `discard-paths`: (Optional) Specifies if the build artifact directories are flattened in the output. If this is not specified, or contains `no`, build artifacts are output with their directory structure intact. If this contains `yes`, all of the build artifacts are placed in the same output directory. For example, if a path to a file in the build output artifact is `com/mycompany/app/HelloWorld.java`, specifying `yes` will place this file in `/HelloWorld.java`.
  - `base-directory`: (Optional) Represents one or more top-level directories, relative to the original build location, that CodeBuild uses to determine which files and subdirectories to include in the build output artifact.
  - `exclude-paths`: (Optional) Represents one or more paths, relative to base-directory, that CodeBuild will exclude from the build artifacts.
  - `enable-symlinks`: (Optional) If the output type is `ZIP`, specifies if internal symbolic links are preserved in the ZIP file. If this contains yes, all internal symbolic links in the source will be preserved in the artifacts ZIP file.
  - `s3-prefix`: (Optional) Specifies a prefix used when the artifacts are output to an Amazon S3 bucket and the namespace type is `BUILD_ID`. When used, the output path in the bucket is `<s3-prefix>/<build-id>/<name>.zip`.
  - `secondary-artifacts`:

- **`cache`**: files to cache (usually dependencies) to S3 for future build speed up

  - `paths`: (Required) Represents the locations of the cache. Contains a sequence of scalars, with each scalar representing a separate location where CodeBuild can find build output artifacts, relative to the original build location or, if set, the base directory. Locations can include the following:

    - A single file (for example, `my-file.jar`).
    - A single file in a subdirectory (for example, `my-subdirectory/my-file.jar` or `my-parent-subdirectory/my-subdirectory/my-file.jar`).
    - `'**/*'` represents all files recursively.
    - `my-subdirectory/*` represents all files in a subdirectory named `my-subdirectory`.
    - `my-subdirectory/**/*` represents all files recursively starting from a subdirectory named `my-subdirectory`.

---

# Running CodeBuild Locally

AWS CodeBuild is something that runs on the Cloud, but it is possible if you need some deep troubleshooting beyond the logs to run CodeBuild locally on your Desktop.

- Install Docker
- [Run the CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html). There are agents available for x86_64 and ARM platforms.
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

# Using the CLI

## [`create-project`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/codebuild/create-project.html)

Creates a build project.

**Syntax:**

```s
aws codebuild create-project \
  --name [ProjectName] \
  --description [ProjectDescription] \
  --source type=["BITBUCKET" | "CODECOMMIT" | "CODEPIPELINE" | "GITHUB" | "GITHUB_ENTERPRISE" | "NO_SOURCE" | "S3"],location=[LocationForSourceType],gitCloneDepth=integer,gitSubmodulesConfig={fetchSubmodules=[true | false]},buildspec=[S3ObjectPathARN],auth={type=["OAUTH"],resource=string},reportBuildStatus=boolean,buildStatusConfig={context=string,targetUrl=string},insecureSsl=boolean,sourceIdentifier=string \
  --badge-enabled \
  --vpc-config vpcId=[vpc-id],subnets=[subnet-id1, subnet-id2, ...],securityGroupIds=[sg-id1,sg-id2, ...] \
  --logs-config cloudWatchLogs={status=["ENABLED" | "DISABLED"],groupName=[LogGroupName],streamName=[LogStreamName]},s3Logs={status=["ENABLED" | "DISABLED"],location=[S3Path | S3BucketPathARN],encryptionDisabled=[true | false],bucketOwnerAccess=["NONE" | "READ_ONLY" | "FULL"]} \
  --concurrent-build-limit [Number]
```

**Example: To create an AWS CodeBuild build project using a JSON input file for the parameters**

```s
aws codebuild create-project --cli-input-json file://project.json
```

---

## `create-report-group`

Creates a report group. A report group contains a collection of reports.

**Syntax:**

```s
aws codebuild create-report-group \
  --name [ReportGroupName] \
  --type ["TEST" | "CODE_COVERAGE"] \
  --export-config exportConfigType=["S3" | "NO_EXPORT"],s3Destination={bucket=[BucketName],bucketOwner=[BucketOwnerID],path=[S3BucketPath],packaging=["ZIP" | "NONE"],encryptionKey=[EncryptionKeyString],encryptionDisabled=[true | false]}
```

**Example: Using Inline Parameters**

```s
aws codebuild create-report-group --name Test-ReportGroup --type TEST --export-config exportConfigType=S3,s3Destination={bucket=codebuild-Test-RG,path=test,packaging=ZIP}
```

**Example: Using a JSON file as input parameters**

```s
aws codebuild create-report-group --cli-input-json file://report-group.json
```

**Response:**

```json
{
  "reportGroup": {
    "arn": "arn:aws:codebuild:ap-south-1:336463900088:report-group/Test-ReportGroup",
    "name": "Test-ReportGroup",
    "type": "TEST",
    "exportConfig": {
      "exportConfigType": "S3",
      "s3Destination": {
        "bucket": "codebuild-Test-RG",
        "bucketOwner": "336463900088",
        "path": "test",
        "packaging": "ZIP",
        "encryptionKey": "arn:aws:kms:ap-south-1:336463900088:alias/aws/s3"
      }
    },
    "created": "2022-12-11T19:17:47.444000+05:30",
    "lastModified": "2022-12-11T19:17:47.444000+05:30",
    "status": "ACTIVE"
  }
}
```

---

## [`list-projects`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/codebuild/list-projects.html)

Gets a list of build project names, with each build project name representing a single build project.

`list-projects` is a paginated operation. Multiple API calls may be issued in order to retrieve the entire data set of results. You can disable pagination by providing the `--no-paginate` argument. When using `--output` text and the `--query` argument on a paginated response, the `--query` argument must extract data from the results of the following query expressions: `projects`

**Syntax:**

```s
aws codebuild list-projects \
  --sort-by ["NAME" | "CREATED_TIME" | "LAST_MODIFIED_TIME"] \
  --sort-order ["ASCENDING" | "DESCENDING"] \
  --starting-token [NextTokenFromPreviousResponse]
```

**Example:**

```s
aws codebuild list-projects \
  --sort-by "CREATED_TIME" \
  --sort-order "DESCENDING"
```

**Response:**

```json

```

---

## [`delete-report-group`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/codebuild/delete-report-group.html)

**Syntax:**

```s
aws codebuild delete-report-group \
  --arn [CodeBuildReportGroupARN] \
  --delete-reports \
  --no-delete-reports \
```

**Example:**

```s
aws codebuild delete-report-group \
  --arn "arn:aws:codebuild:ap-south-1:336463900088:report-group/Test-ReportGroup" \
  --delete-reports
```

**Response:**

None

---

# References

- [Build spec reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
- [Run CodeBuild in an explicit proxy server](https://docs.aws.amazon.com/codebuild/latest/userguide/use-proxy-server.html#run-codebuild-in-explicit-proxy-server)
- [Run the CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html)
