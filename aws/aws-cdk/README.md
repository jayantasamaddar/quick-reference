# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Cloud Development Kit (CDK): Overview](#aws-cloud-development-kit-cdk-overview)
- [CDK: Workflow](#cdk-workflow)
- [CDK vs SAM](#cdk-vs-sam)

---

# AWS Cloud Development Kit (CDK): Overview

- Define your Cloud infrastructure using a familiar language:
  - JavaScript, TypeScript, Python, Java, C# and Go
  - Contains high level components called constructs
  - The code is compiled into a CloudFormation template (JSON/YAML)
  - You can deploy infrastructure and application runtime code together
    - Great for Lambda functions
    - Great for Docker containers in ECS / EKS
  - Benefits over CloudFormation:
    - CloudFormation YAML files are not type safe
    - The ability to use programming logic

---

# CDK: Workflow

**Example: Using TypeScript**

1. Create a new folder `src` and `cd src` into it.
2. Run `cdk init --language typescript` to get started.
3. In the [`lib/src-stack.ts`](src/lib/src-stack.ts), write CDK Application Constructs using TypeScript (Programming Lang).
4. Run `cdk bootstrap` from the application root (`src`) folder. This Bootstraps our CDK application in an environment and create CloudFormation stack called `CDKToolkit` that gets the necessary S3 buckets, IAM Roles that are going to be used CDK to deploy our application. This needs to be done once per account per region. If successful will log out a message in the console.

   ```s
   ✅  Environment aws://336463900088/ap-south-1 bootstrapped.
   ```

5. Optional: Synthesize using the CDK CLI into a CloudFormation Template (`cdk synth`)
6. Deploy the CDK stack using `cdk deploy`

To Delete the deployment:

1. Delete any files added to the S3 bucket.
2. Use `cdk destroy` if you want to destroy the deployment.

---

# CDK vs SAM

| SAM                                               | CDK                                      |
| ------------------------------------------------- | ---------------------------------------- |
| Serverless focussed                               | All AWS Services                         |
| Write your template declaratively in JSON or YAML | Write infra using a programming language |
| Great for quickly getting started with Lambda     |                                          |
| Leverages CloudFormation in the backend           | A Superset of CloudFormation             |

---
