# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon Security Token Service (STS)](#amazon-security-token-service-sts)
- [Use STS to Assume a Role](#use-sts-to-assume-a-role)
- [STS with MFA](#sts-with-mfa)
- [Cross-Account Access with STS](#cross-account-access-with-sts)
- [Advanced IAM](#advanced-iam)
  - [Authorization Model](#authorization-model)
  - [IAM Policies and S3 Bucket Policies](#iam-policies-and-s3-bucket-policies)
  - [Dynamic Policies with IAM](#dynamic-policies-with-iam)
  - [Policies: Types of Policies](#policies-types-of-policies)
- [Granting Permission to pass a Role to a Service](#granting-permission-to-pass-a-role-to-a-service)
  - [Overview](#overview)
  - [Trust Policy](#trust-policy)
- [Microsoft Active Directory (AD)](#microsoft-active-directory-ad)
- [AWS Directory Services](#aws-directory-services)
- [Using the CLI](#using-the-cli)
  - [`create-role`](#create-role)
  - [`create-policy`](#create-policy)
  - [`attach-policy`](#attach-policy)
- [Reference](#reference)

---

# Amazon Security Token Service (STS)

AWS provides AWS Security Token Service (AWS STS) as a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or for users you authenticate (federated users) for 1 hour up to 12 hours.

**APIs:**

- **`AssumeRole`**: Assume roles with your account or cross-account
- **`AssumeRoleWithSAML`**: Return credentials for users logged in with SAML
- **`AssumeRoleWithWebIdentity`**:
  - Return credentials for users logged in with an Identity Provider (Facebook Login, Google Login, OpenID Connect compatible providers).
  - AWS recommends against using this and recommends using **Cognito Identity Pools** instead.
- **`GetSessionToken`**: For MFA, from a user or AWS Account root user
- **`GetFederationToken`**: Obtain temporary credentials for a federation user
- **`GetCallerIdentity`**: Return details about an IAM user or role used in the API call
- **`DecodeAuthorizationMessage`**: Decode error message when an AWS API is denied

---

# Use STS to Assume a Role

- Define an IAM Role within your account or cross-account
- Define which principals can assume this IAM role - Service(s) and/or User(s)
- Use AWS STS to retrieve credentialsand impersonate the IAM Role you have access to (AssumeRole API)
- Temporary credentials can be valid between `900 secs` (15 mins) to `3600 secs` (1 hour)

**Example:**

```json
{
  "Version": "2010-10-17",
  "Statement": [
    {
      "Sid": "AWSLambdaBasicExecutionRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Action": ["sts:AssumeRole"]
    }
  ]
}
```

---

# STS with MFA

- Use GetSessionToken API from STS
- Appropriate IAM policy using IAM conditions
- Add `aws:MultiFactorAuthPresent:true` in the policy

  **Example**: This role only allows to Stop or Terminate EC2 Instances if MultiFactorAuthentication is turned on

  ```json
  {
    "Version": "2010-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["ec2:StopInstances", "ec2:TerminateInstances"],
        "Resource": "*",
        "Condition": {
          "Bool": {
            "aws:MultiFactorAuthPresent": "true"
          }
        }
      }
    ]
  }
  ```

- Returns:
  - Access ID
  - Secret Key
  - Session Token
  - Expiration date

---

# Cross-Account Access with STS

AWS STS (Security Token Service) allows you to get cross-account access through the creation of an IAM Role in your AWS account authorized to assume an IAM Role in another AWS account. See more here: https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html

---

# Advanced IAM

## Authorization Model

- If there's an explicit `Deny`, end decision and `Deny`
- If there's an `Allow`, end decision with `Allow`
- Else `Deny`

---

## IAM Policies and S3 Bucket Policies

| IAM Policies                                      | S3 Bucket Policies                     |
| ------------------------------------------------- | -------------------------------------- |
| IAM Policies are attached to Users, Roles, Groups | S3 Policies are attached to S3 Buckets |

When evaluating if an IAM Principal can perform an operation X on a Bucket, the **UNION** of its assigned Policies and S3 Bucket Policies will be evaluated.

- **Scenario 1:**

  - IAM Role attached to EC2 Instance, authorizes Read-Write to S3 Bucket
  - No S3 Bucket Policy attached

  **Question:** Can the EC2 Instance Read-Write to the Bucket?
  **Answer:** Yes. The Union of the IAM and Bucket Policies still permits the Role to write to the bucket.

- **Scenario 2:**

  - IAM Role attached to EC2 Instance, authorizes Read-Write to S3 Bucket
  - S3 Bucket Policy attached has an explicit Deny to the IAM Role

  **Question:** Can the EC2 Instance Read-Write to the Bucket?
  **Answer:** No. The Union of the IAM and Bucket Policies makes sure that the presence of an Explicit Deny in the bucket policy takes precedence than explicit Allow.

- **Scenario 3:**

  - IAM Role attached to EC2 Instance, no S3 Bucket permissions
  - S3 Bucket Policy attached has an explicit Read-Write Allow to the IAM Role

  **Question:** Can the EC2 Instance Read-Write to the Bucket?
  **Answer:** Yes. The Union of the IAM and Bucket Policies still permits the Role to write to the bucket.

- **Scenario 4:**

  - IAM Role attached to EC2 Instance, explicitly Deny S3 Bucket permissions
  - S3 Bucket Policy attached has an explicit Read-Write Allow to the IAM Role

  **Question:** Can the EC2 Instance Read-Write to the Bucket?
  **Answer:** No. The Union of the IAM and Bucket Policies makes sure that the presence of an Explicit Deny in the bucket policy takes precedence than explicit Allow.

---

## Dynamic Policies with IAM

How do you assign a `/home/<user>` folder in an S3 bucket such that each user in your IAM organization will have their own folder and can Read-Write to it only?

- We will leverage the use of a dynamic variable called `aws:username` to fetch the human-readable username of the current user. This will replace the variable dynamically with the username and allow every user the access to the `/home/<user>` folder.

```json
{
  "Version": "2010-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject*",
        "s3:ListObjects",
        "s3:PutObject*",
        "s3:Replicate*",
        "s3:RestoreObject"
      ],
      "Resource": ["arn:aws:s3:::my-bucket/home/${aws:username}/*"]
    }
  ]
}
```

---

## Policies: Types of Policies

1. **AWS Managed Policy:**

   - Maintained by AWS
   - Good for Power Users and Administrators
   - Updated in case of new services / new APIs

2. **Customer Managed Policy:**

   - Best Practice
   - Allows more granular control
   - Can be applied to many Principals
   - Version controlled
   - Rollback possible
   - Central change management (who did what)

3. **Inline Policy:**

   - Strict one-to-one relationship between the Policy and the Principal
   - Not version controlled
   - Cannot be rolled back to an older version
   - Hard to audit
   - Policy is deleted when the IAM Principal is deleted
   - Maximum Policy size: 2048 bytes (2 KB)

---

# Granting Permission to pass a Role to a Service

## Overview

- To configure many AWS services, you must pass an IAM Role to the service when setting up for the first time.
- The service can then assume the role and perform the actions allowed by the attached Policies

- **Examples of passing a Role**:

  - To an EC2 Instance to allow it to access S3.
  - To a Lambda Instance to write to CloudWatch Logs
  - To CodePipeline to allow it to invoke other services

- For this, you need the IAM Permission: `iam:PassRole`
- It often comes with another permission: `iam:GetRole` to view the role being passed

  **Example:** A policy that allows the user to take any action on EC2 Instances but can only pass only the `S3Access` Role to the EC2 Instance

  ```json
  {
    "Version": "2010-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "ec2:*",
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": ["iam:PassRole"],
        "Resource": "arn:aws:iam::123456789012:role/S3Access"
      }
    ]
  }
  ```

> - Question: Can any role be passed to any service ?
>   Answer: No. Roles can only be passed to what their **trust** allows. A **_trust policy_** for a role is an indication to which service can assume that role.

---

## Trust Policy

A **_trust policy_** is a JSON policy document in which you define the principals that you trust to assume the role. A role trust policy is a required resource-based policy that is attached to a role in IAM. The principals that you can specify in the trust policy include users, roles, accounts, and services.

**Example:**

```json
{
  "Version": "2010-10-17",
  "Statement": [
    {
      "Sid": "TrustPolicyForAmazonEC2",
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

# Microsoft Active Directory (AD)

- Found on any Windows Server with AD Domain Services
- Database of Objects: User Accounts, Computers, Printers, File Shares, Security Groups
- Centralized security management: Create Account, assign permissions etc.
- Objects are organized in trees
- A group of trees are called a forest
- The Domain Controller stores the user accounts.
- Any other machines within the network are going to be connected to the Domain Controller.
- Any user login attempt made from any of these other machines will be successful as they will ask the Domain Controller for authentication and be granted as long as they are part of the same network.

---

# AWS Directory Services

- Provides a way to create an Active Directory on AWS.
- Comes in three flavours:

  1. **AWS Managed Microsoft AD**

  - Create your own AD in AWS, manage users locally, supports MFA.
  - With AWS Managed Microsoft AD, you can run directory-aware workloads in the AWS Cloud such as SQL Server-based applications.
  - Establish "trust" connections with your on-premise AD, providing users and groups with access to resources in either domain, using single sign-on (SSO).

  1. **AD Connector**

  - Direct Active Directory Gateway proxy to redirect to on-premise AD, supports .
  - Users are managed on the on-premise AD.
  - You cannot use it to run directory-aware workloads on AWS.

  3. **Simple AD**

  - AD-compatible standalone managed directory on AWS, powered by a Samba 4 Active Directory Compatible Server.
  - Provides a subset of the features offered by AWS Managed Microsoft AD.
  - Cannot be joined with on-premise AD.

The idea is that using Active Directory you can create EC2 Instances that run on Windows, and these windows instances can join the Domain controllers for your network and share all the login credentials.

---

# Using the CLI

## [`create-role`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-role.html)

**Example: Create a Service Role**

```s
aws iam create-role \
 --role-name "AWSLambdaBasicRole" \
 --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}' \
 --permissions-boundary [PolicyARN] \
 --tags [Key=string,Value=string ...]
```

```json

```

---

## [`create-policy`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-policy.html)

**Syntax:**

```s
aws iam create-policy \
 --policy-name [PolicyName] \
 --description [Description] \
 --policy-document [JSON | JSONFilePathURL]
```

**Example:**

```s
aws iam create-policy \
 --policy-name "AWSLambdaAllDestinations" \
 --description "Allows Publish access to all AWS Lambda Destinations" \
 --policy-document file:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/policies/all-destination-policy.json
```

**Response:**

```json
{
  "Policy": {
    "PolicyName": "AWSLambdaAllDestinations",
    "PolicyId": "ANPAU4VWPVW4MQ4FPPCOK",
    "Arn": "arn:aws:iam::336463900088:policy/AWSLambdaAllDestinations",
    "Path": "/",
    "DefaultVersionId": "v1",
    "AttachmentCount": 0,
    "PermissionsBoundaryUsageCount": 0,
    "IsAttachable": true,
    "Description": "Gives Publish access to all AWS Lambda Destinations",
    "CreateDate": "2022-11-30T12:57:46+00:00",
    "UpdateDate": "2022-11-30T12:57:46+00:00"
  }
}
```

---

## [`attach-policy`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/attach-policy.html)

**Syntax:**

```s
aws iam attach-policy \
 --role-name [IAMRoleName] \
 --policy-arn [PolicyName] \
```

**Example:**

```s
aws iam attach-role-policy \
  --role-name AWSLambdaBasicRole \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
```

**Response:**

None

---

# Reference

- [IAM Roles and Concepts](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html)
- [List of all IAM Actions](https://github.com/rvedotrc/aws-iam-reference/blob/master/all-actions.txt)
