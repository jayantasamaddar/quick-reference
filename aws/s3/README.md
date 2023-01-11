# Table of Contents

- [Table of Contents](#table-of-contents)
- [S3: Introduction](#s3-introduction)
- [S3: Terminology](#s3-terminology)
  - [Buckets](#buckets)
  - [Objects](#objects)
- [S3: Create a Bucket](#s3-create-a-bucket)
- [S3: Uploading Files](#s3-uploading-files)
- [S3: Folders](#s3-folders)
- [S3: Security](#s3-security)
  - [S3 Security: Overview](#s3-security-overview)
  - [S3 Security: Bucket Policy](#s3-security-bucket-policy)
    - [Public Access using S3 Bucket Policy](#public-access-using-s3-bucket-policy)
    - [IAM User Access to S3 using IAM Policies](#iam-user-access-to-s3-using-iam-policies)
    - [Example: EC2 Instance Access using IAM Roles](#example-ec2-instance-access-using-iam-roles)
    - [Cross-Account Bucket Access](#cross-account-bucket-access)
    - [Cross-Account Bucket Access while granting full access to Bucket Owner](#cross-account-bucket-access-while-granting-full-access-to-bucket-owner)
    - [Example: Controlling access from VPC endpoints with bucket policies](#example-controlling-access-from-vpc-endpoints-with-bucket-policies)
  - [S3 Security: Access Control Lists (ACL)](#s3-security-access-control-lists-acl)
  - [S3 Security: Encryption](#s3-security-encryption)
    - [S3 Encryption: Object Encryption](#s3-encryption-object-encryption)
    - [S3 Encryption: Encryption in Transit](#s3-encryption-encryption-in-transit)
    - [S3 Glacier: Encryption](#s3-glacier-encryption)
    - [S3 Encryption: Implement Server-Side Encryption](#s3-encryption-implement-server-side-encryption)
    - [S3 Encryption: Default Encryption vs Bucket Policies](#s3-encryption-default-encryption-vs-bucket-policies)
  - [S3 Security: CORS](#s3-security-cors)
    - [CORS: Overview](#cors-overview)
    - [CORS: Amazon S3](#cors-amazon-s3)
  - [S3 Security: MFA Delete](#s3-security-mfa-delete)
  - [S3 Security: Other Security Settings](#s3-security-other-security-settings)
    - [Block Public Access](#block-public-access)
  - [S3 Security: Audit Logs](#s3-security-audit-logs)
    - [Audit Logs: Overview](#audit-logs-overview)
    - [Audit Logs: Setup Access Logs using Console](#audit-logs-setup-access-logs-using-console)
  - [S3 Security: Pre-Signed URLs](#s3-security-pre-signed-urls)
  - [S3 Security: Access Points](#s3-security-access-points)
  - [S3 Security: Object Lambda](#s3-security-object-lambda)
  - [S3 Security: Object Lock](#s3-security-object-lock)
    - [Object Lock: Overview](#object-lock-overview)
    - [S3 Security: Glacier Vault Lock](#s3-security-glacier-vault-lock)
- [S3: Static Website Hosting](#s3-static-website-hosting)
- [S3: Versioning](#s3-versioning)
- [S3: Replication](#s3-replication)
  - [S3 Replication: Overview](#s3-replication-overview)
  - [S3 Replication: Create Replication Rule](#s3-replication-create-replication-rule)
- [S3: Storage Classes](#s3-storage-classes)
  - [S3 Storage Classes: Overview](#s3-storage-classes-overview)
  - [S3 Storage Classes: Durability \& Availability](#s3-storage-classes-durability--availability)
  - [S3 Storage Classes: Types](#s3-storage-classes-types)
  - [S3 Storage Classes: Lifecycle Rules](#s3-storage-classes-lifecycle-rules)
    - [Lifecycle Rules: Overview](#lifecycle-rules-overview)
    - [Lifecycle Rules: Create Lifecycle Rule](#lifecycle-rules-create-lifecycle-rule)
  - [S3 Storage Classes: Storage Class Analysis](#s3-storage-classes-storage-class-analysis)
- [S3: Event Notifications](#s3-event-notifications)
  - [S3 Event Notifications: Overview](#s3-event-notifications-overview)
  - [S3 Event Notifications: Create an S3 Event Notification](#s3-event-notifications-create-an-s3-event-notification)
  - [S3 Event Notifications: Setup Amazon EventBridge](#s3-event-notifications-setup-amazon-eventbridge)
- [S3: Performance](#s3-performance)
- [S3: Requester Pays](#s3-requester-pays)
- [S3: S3 Select \& Glacier Select](#s3-s3-select--glacier-select)
- [S3: Batch Operations](#s3-batch-operations)
- [S3: Consistency Model](#s3-consistency-model)
- [S3: Using the CLI](#s3-using-the-cli)
  - [S3 API](#s3-api)
    - [`mb`](#mb)
    - [`cp`](#cp)
    - [`mv`](#mv)
    - [`sync`](#sync)
    - [`ls`](#ls)
    - [`presign`](#presign)
    - [`website`](#website)
    - [`rm`](#rm)
    - [`rb`](#rb)
  - [S3API API](#s3api-api)
    - [`create-bucket`](#create-bucket)
    - [`put-public-access-block`](#put-public-access-block)
    - [`put-bucket-policy`](#put-bucket-policy)
    - [`put-bucket-notification-configuration`](#put-bucket-notification-configuration)
    - [`put-bucket-versioning`](#put-bucket-versioning)
    - [`get-bucket-versioning`](#get-bucket-versioning)
    - [`get-object-attributes`](#get-object-attributes)
    - [`list-object-versions`](#list-object-versions)
    - [`delete-object`](#delete-object)
    - [`delete-objects`](#delete-objects)
    - [`delete-bucket`](#delete-bucket)
- [References](#references)

---

# S3: Introduction

Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. S3 is one of the main building blocks of AWS.

- It is advertised as "infinitely scaling" storage.
- Many websites use Amazon S3 as a backbone.
- Many AWS services use Amazon S3 as an integration as well.
- Use Cases:
  - Backup & Storage
  - Disaster Recovery
  - Archive
  - Hybrid Cloud Storage
  - Application Hosting
  - Media hosting
  - Data Lakes & Big Data Analytics
  - Delivering Software Updates
  - Static Website
  - E.g. Nasdaq stores 7 years of data into S3 Glacier (archival service of S3)
  - E.g. Sysco runs analytics on its data and gain business insights from Amazon S3

---

# S3: Terminology

## Buckets

- Amazon S3 allows people to store objects (files) in "buckets" (top-level directories)
- Buckets must have a **globally unique name** (across all regions, all accounts in AWS)
- Buckets are defined at the region level. S3 looks like a global service but the buckets are created regionally.
- Naming convention:
  - No uppercase,
  - no underscore,
  - 3-63 characters long,
  - Not an IP,
  - Must start with a lowercase letter or number
  - MUST NOT start with the prefix `xn--`
  - MUST NOT end with the suffix `-s3alias`

---

## Objects

- Objects (files) have a Key
- The key is the FULL path of your file
  - `s3://mybucket/myfile.txt`
  - `s3://mybucket/myfolder/myfile.txt`
  - The key is composed of a prefix + object name
  - There's no concept of "directories" within buckets per se (Although the UI will trick you to think otherwise). Anything and everything in S3 is actually a key
- Objects values are the contents of the body
  - Max object size: **`5TB`**
  - If uploading more than `5GB`, MUST use **`multi-part upload`**. Multi-Part Upload is RECOMMENDED as soon as the file is over `100 MB`.
- Objects can also have Metadata
  - List of text key / value pairs - system or user metadata
- Objects can have Tags
  - Unicode key / value pair, upto 10 - useful for security / lifecycle
- Version ID if you've enabled versioning

---

# S3: Create a Bucket

- Go to S3 Console and click **[Create a bucket](https://us-east-1.console.aws.amazon.com/s3/bucket/create?region=ap-south-1)**
- Enter the Configuration for the S3 Bucket:

  - **General Configuration**:

    - **Bucket name**: [Naming Convention](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html)
    - **AWS region**: `ap-south-1`
    - **Copy settings from AWS bucket (optional)**: Only the bucket settings in the following configuration are copied.

  - **Object Ownership**: Control ownership of objects written to this bucket from other AWS accounts and the use of access control lists (ACLs). Object ownership determines who can specify access to objects.

    - **ACLs disabled**: All objects in this bucket are owned by this account. Access to this bucket and its objects is specified using only policies. (Default)
    - **ACLs enabled**: Objects in this bucket can be owned by other AWS accounts. Access to this bucket and its objects can be specified using ACLs.

  - **Block Public Access settings for this bucket**:

    - **Block all public access** (default)

  - **Bucker Versioning**: Versioning is a means of keeping multiple variants of an object in the same bucket. You can use versioning to preserve, retrieve, and restore every version of every object stored in your Amazon S3 bucket. With versioning, you can easily recover from both unintended user actions and application failures

    - **Disable** (default)
    - **Enable**

  - **Default encryption**: Automatically encrypt new objects stored in this bucket. Server-side encryption.
    - **Disable** (default)
    - **Enable**

- Click `Create bucket` to create a bucket

---

# S3: Uploading Files

- Pre-signed URL vs Public URL

---

# S3: Folders

In Amazon S3, buckets and objects are the primary resources, and objects are stored in buckets. Amazon S3 has a flat structure instead of a hierarchy like you would see in a file system. However, for the sake of organizational simplicity, the Amazon S3 console supports the folder concept as a means of grouping objects. It does this by using a shared name prefix for objects (that is, objects have names that begin with a common string). Object names are also referred to as key names.

**Examples:**

- You can create a folder on the console named `photos` and store an object named `myphoto.jpg` in it. The object is then stored with the key name `photos/myphoto.jpg`, where `photos/` is the prefix.

- If you have three objects in your bucket - `logs/date1.txt`, `logs/date2.txt`, and `logs/date3.txt` - the console will show a folder named `logs`. If you open the folder in the console, you will see three objects: `date1.txt`, `date2.txt`, and `date3.txt`.

- If you have an object named `photos/2017/example.jpg`, the console will show you a folder named photos containing the folder `2017`. The folder `2017` will contain the object `example.jpg`.

---

# S3: Security

## S3 Security: Overview

Security is a shared responsibility between AWS and you. For Amazon S3, your responsibility includes the following areas:

1. **Data Protection**: The following measures can be taken to protect data in Amazon S3

   - [Encryption: In-flight encryption and Object encryption](#s3-security-encryption)
   - [Storage Classes](#s3-storage-classes)
   - [Lifecycle Configuration](#lifecycle-rules-overview)
   - [S3 Versioning](#s3-versioning)
   - [S3 Object Lock](#s3-security-object-lock)
   - [S3 Replication](#s3-replication)

2. **Identity and Access Management**

   - **User-Based**

     - **IAM Policies**: Which API calls should be allowed for a specific user from IAM

   - **Resource-Based**

     - **[Bucket Policies](#s3-security-bucket-policy)**: Bucket wide rules that can be assigned directly from the S3 Console. Allows cross account access. Most common way to handle Security in S3.
     - **[Access Control Lists (ACL)](#s3-security-access-control-lists-acl)** You can use ACLs to grant basic read/write permissions to other AWS accounts.
       - **Object Access Control List (ACL)**: Finer grain security (can be disabled)
       - **Bucket Access Control List (ACL)**: Less common use (can be disabled)

   - [CORS: Cross-Origin Resource sharing](#s3-security-cors): Control whether S3 static website can load assets from another S3 bucket.

> **Note**: An IAM Principal can access an S3 object if:
>
> - The user IAM permissions `ALLOW` it **OR** the resource policy `ALLOWS` it **AND** there's no explicit `DENY`

---

## S3 Security: Bucket Policy

**Example:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::examplebucket/*"]
    }
  ]
}
```

- **JSON based Policies**

  - **`Resource`**: Set of Buckets and Objects
  - **`Effect`**: `Allow` / `Deny`
  - **`Action`**: Set of API to Allow or Deny
  - **`Principal`**: The account or user to apply the policy to
  - **[Conditions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-condition-keys.html)**: Amazon S3‐specific condition keys and AWS-wide condition keys

- **Use Cases**:
  - Grant public access to the bucket
  - Force objects to be encrypted on Upload
  - Grant access to another account (Cross Account)

---

### Public Access using S3 Bucket Policy

**Use Case**: The user is an user on the Worldwide Web and he wants to view files within our S3 buckets. We need to attach an S3 bucket policy to the S3 bucket that allows Public Access with only viewing permissions for objects within the S3 Bucket.

**Enable Public Access and Edit Bucket Policy**:

1. Go to the Specific S3 Bucket and click the **`Permissions`** tab
2. Change the **`Block public access (bucket settings)`** to **`Off`**, i.e. enable Public Access
3. Go to the **Bucket policy** section and click **`Edit`**
4. Click the **`Policy Generator`** to launch the AWS Policy Generator
5. Fill out the Policy generator form, click **`Add Statement`** and **`Generate Policy`** as below:

**Final Policy**:

```json
{
  "Id": "Policy1668584228030",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1668584225486",
      "Action": ["s3:GetObject"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::jayanta-s3-bucket/*",
      "Principal": "*"
    }
  ]
}
```

---

### IAM User Access to S3 using IAM Policies

**Use Case**: The user is an IAM user and he wants to access files within our S3 buckets. We need to assign IAM permissions to that specific IAM User, through a policy to allow access to our S3 buckets.

---

### Example: EC2 Instance Access using IAM Roles

**Use Case**: An EC2 Instance wants to access the S3 buckets and we know IAM roles have to be used to make this possible. We need to create an EC2 Instance Role with the correct IAM permissions and then attach the IAM Role to an existing EC2 Instance.

**Create Role:**

1. Go to **[IAM Roles](https://us-east-1.console.aws.amazon.com/iamv2/home?region=ap-south-1#/roles)** and click **`Create role`**
2. Select **`AWS Service`** as **Trusted entity type** and **`EC2`** as Use Case and click **`Next`**
3. From the permissions, select **`AmazonS3FullAccess`** as permissions (select any others if needed)
4. Click **`Next`** and enter the **`Name`** (e.g. **`EC2UserWithS3FullAccess`**) and **`Description`** and click **`Create role`** to create the Role

**Attach Role to existing EC2 Instance**:

1. Go to the **[Instances Page on the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:)**
2. Select the EC2 Instance and click on **`Actions`** ---> **`Security`** ---> **`Modify IAM Role`**
3. We can then select the target Role: **`EC2UserWithS3FullAccess`** and click **`Update IAM Role`**.

---

### Cross-Account Bucket Access

**Use Case**: We have an IAM User in another AWS `AccountB` who we need to give permissions to access our S3 Bucket. We need to create a S3 Bucket Policy that allows Cross-Account Access for that specific IAM user(s) and therefore the IAM user will be able to make API calls into our S3 Buckets

**Pre-requisite**: Ensure `AccountB` can access S3, including this particular S3 bucket by setting IAM Role and/or user permissions for `AccountB`

**S3 Bucket Policy in AccountA:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "StmntID-GetObjects",
      "Principal": [
        {
          "AWS": "arn:aws:iam::AccountB:user/AccountBUserName"
        }
      ],
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:PutObjectAcl"],
      "Resource": ["arn:aws:s3:::AccountABucketName/*"]
    }
  ]
}
```

---

### Cross-Account Bucket Access while granting full access to Bucket Owner

**Use Case:** We have an IAM User in another AWS Account B who we need to give permissions to access our S3 Bucket. We need to create a S3 Bucket Policy that allows Cross-Account Uploads for that specific IAM user(s) and therefore the IAM user will be able to make API calls into our S3 Buckets. At the same time, the Bucket Owner must be granted full control of all uploads.

1. **When ACL is Disabled**: If ACL is Disabled, Bucket Owner is automatically the owner of all objects.

2. **If ACL is Enabled**:

   The following bucket policy grants the `s3:PutObject` permission to `AccountB` with a condition using either of the following conditions:

   - **For giving permission to any specific Account(s) (including bucket owner)**: `s3:x-amz-grant-full-control` condition key, which requires the request to include the `x-amz-full-control` header. `"s3:x-amz-grant-full-control": "id=AccountA-CanonicalUserIDOfBucketOwner"`

   - **Use Canned ACL**: `x-amz-acl` with condition key, which requires the `bucket-owner-full-control` header to give permission to Bucket Owner. `"s3:x-amz-acl": "bucket-owner-full-control"`

   - **Using an Explicit Deny policy**: Loopholes may exist while granting policies to users. For example: If AccountB who is trying to access the bucket is in also in group that is allowed permissions without any condition, AccountB could create Objects that do not require the `bucket-owner-full-control` header. An Explicit Deny always supercedes any other condition granted, therefore an Explicit Deny that triggers when the header is not present, will ensure loopholes involving permissions.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "statement1",
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::AccountB-ID:user/AccountB"
         },
         "Action": "s3:PutObject",
         "Resource": "arn:aws:s3:::awsexamplebucket1/*",
         "Condition": {
           "StringEquals": {
             "s3:x-amz-grant-full-control": "id=AccountA-CanonicalUserIDOfBucketOwner"
             // "s3:x-amz-acl": "bucket-owner-full-control"
           }
         }
       },
       {
         "Sid": "statement2",
         "Effect": "Deny",
         "Principal": {
           "AWS": "arn:aws:iam::AccountB-ID:user/AccountB"
         },
         "Action": "s3:PutObject",
         "Resource": "arn:aws:s3:::awsexamplebucket1/*",
         "Condition": {
           "StringNotEquals": {
             "s3:x-amz-grant-full-control": "id=AccountA-CanonicalUserIDOfBucketOwner"
             // "s3:x-amz-acl": "bucket-owner-full-control"
           }
         }
       }
     ]
   }
   ```

---

### [Example: Controlling access from VPC endpoints with bucket policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies-vpc-endpoint.html)

---

## [S3 Security: Access Control Lists (ACL)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html)

Amazon S3 access control lists (ACLs) enable you to manage access to buckets and objects. Each bucket and object has an ACL attached to it as a subresource. It defines which AWS accounts or groups are granted access and the type of access. When a request is received against a resource, Amazon S3 checks the corresponding ACL to verify that the requester has the necessary access permissions.

---

## S3 Security: Encryption

### S3 Encryption: Object Encryption

You can encrypt objects in Amazon S3 using one of 4 Methods.

> **Note**: Metadata, which can be included with the object, is not encrypted while being stored on Amazon S3. Therefore, AWS recommends that customers not place sensitive information in Amazon S3 metadata.

- **Server-Side Encryption (SSE)**

  1. **Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3)**:

     - Encrypts each S3 objects using keys, handled, managed and owned by AWS
     - Object is encrypted server-side
     - Encryption type is AES-256
     - As an additional safeguard, it encrypts the key itself with a root key that it regularly rotates
     - Must set header to `"x-amz-server-side-encryption":"AES-256"`

  2. **Server-Side Encryption with KMS Keys stored in AWS KMS (SSE-KMS)**:

     - Leverage AWS Key Management Service (AWS KMS) to manage encryption keys
     - Object is encrypted server-side
     - Must set header to `"x-amz-server-side-encryption":"aws:kms"`
     - **KMS Advantages:**

       - User control, for e.g. control over the rotation policy of the encryption key
       - Audit trail of key usage (by who and whom) using CloudTrail

     - **KMS Limitations**:
       - If you use SSE-KMS, you maybe impacted by the KMS Limits
       - When you upload, it calls the `GenerateDataKey` KMS API
       - When you download, it calls the `Decrypt` KMS API
       - Each of these API calls are going to count towards KMS quota per second (5500, 10000, 30000 req/s based on region)
       - You can request a quota increase using the Service Quotas API or the Service Quotas Console

  3. **Server-Side Encryption with Customer-Provided Keys (SSE-C)**: When you want to manage your own encryption keys

     - Server-side encryption using keys fully managed by the customer, outside of AWS
     - Amazon S3 does **NOT** store the encryption key you provide
     - **`HTTPS`** must be used
     - Encryption key must be provided in HTTP headers, for every HTTP request made
     - Cannot be used from the Console, must use AWS CLI, AWS SDK or Amazon S3 REST API

- **Client-Side Encryption (CSE)**: Encrypt client-side and then upload to Amazon S3

  - Use client libraries such as Amazon S3 Client-Side Encryption Library
  - Clients must encrypt data themselves before sending to Amazon S3
  - Clients must decrypt data themselves when retrieving from Amazon S3
  - Clients fully manage the keys and the encryption cycle

---

### S3 Encryption: Encryption in Transit

- Encryption in flight is also called SSL/TLS
- Amazon S3 exposes two endpoints:
  - HTTP endpoint: not encrypted
  - HTTPS endpoint: encrypted in flight
- HTTPS is recommended
- HTTPS is mandatory for SSE-C
- Most clients would use the HTTPS endpoint by default

- Forcing SSL

  - To force SSL, create a S3 bucket policy with a DENY on the condition `"aws:SecureTransport":"false"`
  - **Note**: Using an Allow on `"aws:SecureTransport": "true"` would allow anonymous `GetObject` if using SSL.
  - [Read more on the Documentation page](https://aws.amazon.com/premiumsupport/knowledge-center/s3-bucket-policy-for-config-rule)

    ```json
    {
      "Id": "ForceSSLPolicy",
      "Version": "2010-10-17",
      "Statement": [
        {
          "Sid": "AllowS3RequestsOnlyOverSSL",
          "Effect": "Deny",
          "Principal": "*",
          "Action": "s3:*",
          "Resource": [
            "arn:aws:s3:::awsexamplebucket",
            "arn:aws:s3:::awsexamplebucket/*"
          ],
          "Condition": {
            "Bool": {
              "aws:SecureTransport": "false"
            }
          }
        }
      ]
    }
    ```

---

### S3 Glacier: Encryption

- Amazon S3 Glacier automatically encrypts data at rest using Advanced Encryption Standard (AES) 256-bit symmetric keys
- Supports secure transfer of your data over Secure Sockets Layer (SSL) or Client-side encryption.

---

### S3 Encryption: Implement Server-Side Encryption

1. **Using the Console:**

   - Go to the S3 Bucket and click the **`Properties`** Tab.
   - Scroll down to the **`Encryption`** section.

2. **Using the CLI:**

   ```s
   aws s3api put-object \
   --bucket [BucketName] \
   --key [object-key-name] \
   --server-side-encryption ["AES256" | "aws:kms"] \
   --ssekms-key-id [KMSKeyID] \ # Required if `--server-side-encryption "aws:kms"` is provided
   --bucket-key-enabled \ # When KMS encryption is used to encrypt new objects in this bucket, the bucket key reduces encryption costs by lowering calls to AWS KMS.
   --body [ObjectBlob]
   ```

---

### S3 Encryption: Default Encryption vs Bucket Policies

- One way to force encryption is to use a bucket policy and refuse any API call to PUT an S3 object without encryption headers

  ```json
  {
    "Version": "2012-10-17",
    "Id": "PutObjectPolicy",
    "Statement": [
      {
        "Sid": "DenyIncorrectDecryptionHeader",
        "Effect": "Deny",
        "Principal": "*",
        "Action": ["s3:PutObject"],
        "Resource": ["arn:aws:s3:::examplebucket/*"],
        "Condition": {
          "StringNotEquals": {
            "s3:x-amz-server-side-encryption": "AES256"
          }
        }
      }
    ]
  }
  ```

- Another way is to force encryption is to use the **`Default encryption`** option in S3. That way, even if an unencrypted object is uploaded, it will be server-side encrypted by Amazon S3.

> **Note**: Bucket Policies are evaluated before **`Default encryption`**

---

## S3 Security: CORS

### CORS: Overview

- CORS (Cross-Origin Resource Sharing) is a Web Browser based security mechanism to allow requests to other origins while visiting the main origin
- Origin = Protocol + Host + Port
  - e.g. `https://www.example.com` (implied port is 443 for HTTPS and 80 for HTTP)
  - Same origin: `http://example.com/app1` and `http://example.com/app2`
  - Different origin: `http://example.com/app1` and `http://other.example.com/app1`
- The requests won't be fulfilled unless the destination origin allows for the requests, using CORS headers (`Access-Control-Allow-Credentials`, `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` headers)

---

### CORS: Amazon S3

- If a client makes a cross-origin request on our S3 bucket, we need to enable the correct CORS headers
- You can allow for a specific origin or `*` for all origins
- On the Destination S3 Bucket:

  - Go to the **`Permissions`** Tab
  - Scroll down to the **`Cross-origin resource sharing (CORS)`** and click **`Edit`**
  - We need to enter the CORS headers in JSON format:

    ```json
    [
      {
        "AllowedHeaders": ["Authorization"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": [
          "<url of first bucket with http://...without the slash in the end>"
        ],
        "ExposedHeaders": [],
        "MaxAgeSeconds": 3000
      }
    ]
    ```

---

## S3 Security: MFA Delete

MFA (Multi-Factor Authentication) forces users to generate a code on a device (using a hardware or a virtual device like an Authenticator App) before doing important operations on S3

MFA will be required to:

- Permanently delete an object version
- Suspend Versioning on an object

MFA won't be required to:

- Enable versioning
- List deleted versions

- To use MFA Delete, Versioning must be enabled on the bucket.
- MFA delete is an extra protection to prevent against the accidental permanent deletion of specific object versions.
- **Only the bucket owner (root account) can enable/disable MFA Delete. The root account should have MFA enabled.**
- The Amazon CLI must be used to perform a MFA Delete operation as it cannot be done via the Console
- **To enable MFA Delete, using the AWS CLI**

  ```s
  aws s3api put-bucket-versioning --bucket [ bucket-name ] --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa "[ arn-of-mfa-device ] [ mfa-code ]" --profile [ root-profile ]
  ```

- **To disable MFA Delete, using the AWS CLI**

  ```s
  aws s3api put-bucket-versioning --bucket [ bucket-name ] --versioning-configuration Status=Enabled,MFADelete=Disabled --mfa "[ arn-of-mfa-device ] [ mfa-code ]" --profile [ root-profile ]
  ```

---

## S3 Security: Other Security Settings

### Block Public Access

- These settings are available during Bucket creation. By default this setting is **`On`**
- These settings were created by AWS as an extra layer of security to prevent company data leaks. So even though you may set an S3 bucket policy that would make it public, if these settings are enabled, the bucket would never be public
- If you know your bucket should never be public, leave these settings enabled
- Can be set at the Account level (if you want none of your S3 buckets to be public)

---

## S3 Security: Audit Logs

### Audit Logs: Overview

- For audit purpose, you may want to log all access to S3 buckets
- Any request made to S3, from any account, authorized or denied, will be logged as a file into another S3 bucket
- The data can then be analyzed using a Data Analysis tool such as Amazon Athena
- The target logging bucket must also be in the same AWS region
- The log format is at https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html

> **Warning:** NEVER EVER set your logging bucket to be the same as the bucket you are monitoring or we will end up triggering an infinite loop.

> **Note**: AWS recommends that you use **AWS CloudTrail** for logging bucket and object-level actions for your Amazon S3 resources, as it provides more options to store, analyze and act on the log information.

---

### Audit Logs: Setup Access Logs using Console

- Select the S3 Bucket and click on the **`Properties`** Tab
- Scroll down to the **`Server access logging`** section. Click **`Edit`**
- **`Enable`** the Server access logging and select the **`Target bucket`**. The bucket policy of the target bucket will be updated automatically to allow the logging service of Amazon S3.
- **`Save changes`** to log all access logs to this target bucket

---

## S3 Security: Pre-Signed URLs

- Generate pre-signed URLs using the S3 Console, AWS CLI or SDK
- URL has an Expiration
  - **S3 Console**: 1 min to 720 mins (12 hrs)
  - **AWS CLI**: configure expiration with `expires_in` parameter in seconds (default 3600 secs, max 604800 seconds ~ 168 hours)
- Users given a pre-signed URL inherit the permissions of the user that generated the URL for `GET` / `PUT` until the url is expired
- Use Case:
  - Allows only logged-in users to download a premium video from your S3 bucket
  - Allows an ever-changing list of users to download files by generating URLs dynamically
  - Allows temporarily an user to upload a file to a precise location in your S3 bucket, while maintaining the S3 bucket private
- Steps:
  - Select the Bucket and click **`Object actions`** --> **`Share with a presigned URL`**
  - Enter a Time interval in either `Minutes` or `Hours`
  - Click **`Create presigned URL`**

---

## S3 Security: Access Points

**Amazon S3 Access Points** simplify managing data access at scale for shared datasets in S3. With S3 Access Points, customers can create unique access control policies for each access point to easily control access to shared datasets. Customers with shared data sets including data lakes, media archives, and user-generated content can easily scale access for hundreds of applications by creating individualized access points with names and permissions customized for each application. Any access point can be restricted to a Virtual Private Cloud (VPC) to firewall S3 data access within customers’ private networks, and **AWS Service Control Policies** can be used to ensure all access points are VPC restricted. S3 Access Points are available in all regions at no additional cost.

- Each Access Point has its own DNS and own Policy to limit who can access it.
  - A specific IAM User / Group
  - Each access point is associated with exactly one bucket.
  - Access point policies are limited to 20 KB in size.
  - One Policy per Access Point => Easier to manage than complex bucket policies
  - After you create an access point, you can't change its virtual private cloud (VPC) configuration.
  - **Default**: `10,000` access points per Region for each of your AWS accounts. If you need more than 10,000 access points for a single account in a single Region, you can request a AWS Service Quota increase.

---

## S3 Security: Object Lambda

The idea: You have an S3 Bucket, but you want to modify the object just before it is being retrieved by a caller application. Instead of duplicating buckets to have different versions for each object, we can use S3 Object Lambda instead.

- Use AWS Lambda Functions to change the object before its being retrieved by the caller application
- Only one S3 bucket is needed, on top of which we create S3 Access Point and a Lambda Function accessing the S3 Access Point that redact the object as it is retrieved. On top of the Lambda function, we can then create a **S3 Object Lambda Access Point** and send it to the client.
- Use Cases:
  - Redacting personally identifyable information for analytics or non-production environments.
  - Converting data formats, such as converting XML to JSON.
  - Resizing and watermarking images on the fly using caller-specific details, such as the user who requested the object.

---

## [S3 Security: Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-overview.html)

### Object Lock: Overview

S3 Object Lock allows to store objects using a **write-once-read-many (WORM) model** to help you prevent objects from being deleted or overwritten for a fixed amount of time or indefinitely. You can use S3 Object Lock to meet regulatory requirements that require WORM storage, or add an extra layer of protection against object changes and deletion.

> **Note:**
>
> - You can only enable Object Lock for new buckets. If you want to turn on Object Lock for an existing bucket, contact AWS Support.
> - When you create a bucket with Object Lock enabled, Amazon S3 automatically enables versioning for the bucket.
> - When you create a bucket with Object Lock enabled, Amazon S3 automatically enables versioning for the bucket.

**Important Concepts to make Object Lock work:**

1. **Retention Modes**: These retention modes apply different levels of protection to your objects. You can apply either retention mode to any object version that is protected by Object Lock. S3 Object Lock provides two retention modes:

   - **`Governance mode`**: Users can't overwrite or delete an object version or alter its lock settings unless they have special permissions. With governance mode, you protect objects against being deleted by most users, but you can still grant some users permission to alter the retention settings or delete the object if necessary. You can also use governance mode to test retention-period settings before creating a compliance-mode retention period.

   To override or remove governance-mode retention settings, a user must have the `s3:BypassGovernanceRetention` permission and must explicitly include `x-amz-bypass-governance-retention:true` as a request header with any request that requires overriding governance mode.

   - **`Compliance mode`**: In compliance mode, a protected object version can't be overwritten or deleted by any user, including the root user in your AWS account. When an object is locked in compliance mode, its retention mode can't be changed, and its retention period can't be shortened. Compliance mode helps ensure that an object version can't be overwritten or deleted for the duration of the retention period.

2. **Retention Periods**: A retention period protects an object version for a fixed amount of time.

3. **Legal Holds**: With Object Lock you can also place a legal hold on an object version. Like a retention period, a legal hold prevents an object version from being overwritten or deleted. However, a legal hold doesn't have an associated retention period and remains in effect until removed. Legal holds can be freely placed and removed by any user who has the s3:PutObjectLegalHold permission.

For example, suppose that you place a legal hold on an object version while the object version is also protected by a retention period. If the retention period expires, the object doesn't lose its WORM protection. Rather, the legal hold continues to protect the object until an authorized user explicitly removes it. Similarly, if you remove a legal hold while an object version has a retention period in effect, the object version remains protected until the retention period expires.

4. **Bucket configuration**: To use Object Lock, you must `enable` it for a bucket. You can also optionally configure a default retention mode and period that applies to new objects that are placed in the bucket.

5. **Required permissions**: Object Lock operations require specific permissions. Depending on the exact operation you are attempting, you might need any of the following permissions:

   - `s3:BypassGovernanceRetention`
   - `s3:GetBucketObjectLockConfiguration`
   - `s3:GetObjectLegalHold`
   - `s3:GetObjectRetention`
   - `s3:PutBucketObjectLockConfiguration`
   - `s3:PutObjectLegalHold`
   - `s3:PutObjectRetention`

---

### [S3 Security: Glacier Vault Lock](https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html)

S3 Glacier Vault Lock helps you to easily deploy and enforce compliance controls for individual S3 Glacier vaults with a Vault Lock policy. You can specify controls such as "write once read many" (WORM) in a Vault Lock policy and lock the policy from future edits.

- After a Vault Lock policy is locked, the policy can no longer be changed or deleted.
- This is similar to the S3 Object Lock when Retention Mode is set to `Compliance` but for S3 Glacier.

---

# S3: Static Website Hosting

- S3 Can host static websites and have them accessible on the Internet
- The website URL will depend on the region:
  - `http://bucket-name.s3-website-aws-region.amazonaws.com` OR
  - `http://bucket-name.s3-website.aws-region.amazonaws.com`
- If you get a 403 Forbidden Request, make sure the bucket policy allows public reads!

- Go to your S3 Bucket and click the **`Properties`** tab.
- Scroll all the way down to find the **`Static website hosting`** section. Click **`Edit`**.
- Click **`Enable`** to enable the static hosting, then choose the following options:
  - **Hosting type**:
    - **Host a static website**: Use the bucket endpoint as the website address (Select this)
    - **Redirect requests for an object**: Redirect requests to another website or domain
  - **Index document**: Specify the home or default page of the website. (`index.html`)
  - **Error document** (optional): This is returned when an error occurs. (Leave blank)
  - **Redirection rules** (optional): Redirection rules, written in JSON, automatically redirect webpage requests for specific content. See [Configuring a webpage redirect](https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-page-redirect.html)
- Click **`Save changes`** to enable these static website settings.
- Ensure the `index.html` file is uploaded.
- Go to this S3 Bucket page and click the **`Properties`** tab.
- Scroll all the way down to find the **`Static website hosting`** section and find the URL. The website is now accessible from this URL

---

# S3: Versioning

- You can version your files in Amazon S3
- It is enabled at the **bucket level** so when the user uploads a file, it's going to create a version of the file at the selected key
- Same key overwrite will increment the version
- It is considered best practice to version your buckets:
  - Protects against unintended deletes (ability to restore a version)
  - Easy roll back to previous version
- Any file that is not versioned prior to enable versioning will have version: `null`

- **Enabling versioning from the S3 Console**:

  - Go to your S3 Bucket and click the **`Properties`** tab.
  - Scroll down to find the **`Bucket Versioning`** section. Click **`Edit`**.
  - Click **`Enable`** to enable the bucket versioning, and click **`Save changes`**.

- Can also be `Enabled` or `Suspended` using the **`PutBucketVersioning`** API.

- **Suspend versioning**:

  - Suspending versioning stops accruing new versions of the same object in the bucket.
  - If you suspend versioning, it does not delete the previous versions (safe operation). What changes is no new versions will be created by Amazon S3.

---

# S3: Replication

## S3 Replication: Overview

- Replication only works if `Versioning` is enabled in source and destination buckets as version IDs are replicated
- Replication is asynchronous
- Buckets can be in different AWS accounts
- Must give proper permissions to S3
- After you enable `Replication`, only new objects are replicated. Optionally, you can replicate existing objects and objects that have failed replication using **S3 Batch Replication**
- For DELETE operations:

  - You can replicate delete markers from source to target destination (optional setting).
  - Deletion with a Version ID is a permanent deletetion and is not replicated (so as to avoid malicious deletes)

- There is no **"chaining"** of replications:

  - If **Bucket 1** has replication into **Bucket 2** and **Bucket 2** has replication into **Bucket 3**, then objects created in **Bucket 1** are not replicated into **Bucket 3**

- **CRR (Cross-Region Replication)**

  - Use Cases:
    - Compliance,
    - Lower latency access,
    - Replication across accounts

- **SRR (Same-Region Replication)**

  - Use Cases:
    - Log Aggregation
    - Live replication between production and test accounts

- **Encryption**: The encryption of the objects in the destination bucket varies depending on whether the objects in the source bucket are encrypted or not:

  - **If objects in the source bucket are NOT ENCRYPTED**: This results in the `ETag` of the source object being different from the `ETag` of the replica object. You must update applications that use the `ETag` to accommodate for this difference.

  - **If objects in the source bucket are ENCRYPTED using SSE-S3 or SSE-KMS**: The replica objects in the destination bucket use the same encryption as the source object encryption. The default encryption settings of the destination bucket are not used.

---

## S3 Replication: Create Replication Rule

We have two buckets `jayanta-s3-origin-bucket` and `jayanta-s3-destination-bucket` where we have setup versioning in both of them. If not we will get a warning to enable versioning when we create a replication rule. **`Replication requires versioning to be enabled for the source bucket. Enable object versioning on this bucket to continue creating the replication rule.`**

- Go to the Origin bucket and then click on the **`Management`** tab
- Scroll down to the **`Replication rules`** section. Click **`Create replication rule`**.
- Enter the following configurations:

  - **Replication rule configuration**:

    - **Replication rule name**: Up to 255 characters. In order for CloudWatch metrics to monitor the progress of your replication rule, the replication rule must contain only English characters
    - **Status**: `Enabled` / `Disabled` (Choose `Enabled`)
    - **Priority**: `0` (Default). The priority value resolves conflicts that occur when an object is eligible for replication under multiple rules to the same destination. The rule is added to the configuration at the highest priority and the priority can be changed on the replication rules table.

  - **Source bucket**:

    - Source bucket name: Automatically identified
    - Source region: Automatically identified
    - **Choose a rule scope**:
      - `Limit the scope of this rule using one or more filters` (Default)
      - `Apply to all objects in the bucket` (Choose this option)

  - **Destination bucket**:

    - **Destination**: You can replicate objects across buckets in different AWS Regions (Cross-Region Replication) or you can replicate objects across buckets in the same AWS Region (Same-Region Replication). You can also specify a different bucket for each rule in the configuration.
      - `Choose a bucket in this account` (default)
      - `Specify a bucket in another account` (CRR)
    - **Bucket name**: Choose a bucket name that will receive replicated objects
    - **Destination region**: Automatically identified by Bucket name matching

  - **IAM role**:

    - `Choose from existing IAM roles` (default) - Select this option and select `Create a new role` from the dropdown
    - `Enter IAM role ARN`

  - **Encryption**: (optional)

    - **Replicate objects encrypted with AWS KMS**: You can replicate objects that are encrypted with AWS Key Management Service (AWS KMS) keys. (default: off)

  - **Destination storage class**: (optional) Amazon S3 offers a range of storage classes designed for different use cases. [See more](https://docs.aws.amazon.com/console/s3/storageclasses)

    - `Change the storage class for the replicated objects`: `On` / `Off`

  - **Additional replication options**: (optional)

    - `Replication Time Control (RTC)`: Replication Time Control replicates 99.99% of new objects within 15 minutes and provides replication metrics and notifications. Additional fees will apply.
    - `Replication metrics and notifications`: Monitor the progress of your replication rule through Cloudwatch Metrics. Cloudwatch metrics fees apply.
    - `Delete marker replication`: Delete markers created by S3 delete operations will be replicated. Delete markers created by lifecycle rules are not replicated.
    - `Replica modification sync`: Replicate metadata changes made to replicas in this bucket to the destination bucket.

  - Click `Save` to save Replication configurations. We will get a prompt that says:

    **Replicate existing objects?**

    You can enable a one-time **Batch Operations job** from this replication configuration to replicate objects that already exist in the bucket and to synchronize the source and destination buckets.

    We can either choose to replicate existing objects or not. By default it will only replicate objects from the moment we set it, hence this is an optional configuration we have to either enable or disable.

---

# S3: Storage Classes

## S3 Storage Classes: Overview

- Can move between classes manually
- Use S3 Lifecycle configurations to move objects automatically between storage classes

---

## S3 Storage Classes: Durability & Availability

**Durability**: Durability represents how many times an object is going to be lost by Amazon S3.

- **High Durability**:

  - 99.999999999% (11 9s) of objects data durability across Multi-AZ
  - If you store 10,000,000 objects with Amazon S3, you can on average expect to incur a loss of a single object, once every 10,000 years
  - Same for all storage classes

- **Availability**: Measures how readily available a service is

  - Varies depends on the storage class.
  - E.g. S3 Standard has 99.99% availability = not availability 53 minutes a year

---

## S3 Storage Classes: Types

1. **Amazon S3 Standard - General Purpose**

   - 99.99% Availability
   - Used for frequently accessed data
   - Low latency and high throughput
   - Sustain 2 concurrent facility failures on the side of AWS
   - Use Cases:
     - Big Data Analytics
     - Mobile and Gaming Apps
     - Content Distribution

2. **Amazon S3 Standard-Infrequent Access (IA)**

   - For data that is less frequently accessed, but requires rapid access when needed
   - Lower cost than S3 Standard but there's a cost on retrieval
   - 99.9% Availability (bit less available than S3 Standard)
   - **Use Cases**:

     - Disaster Recovery
     - Backups

   - **Minimum capacity charge per object**: `128 KB`
   - **Minimum storage duration**: `30 days`

3. **Amazon S3 One Zone-Infrequent Access (One-Zone IA)**

   - High durability (99.999999999%) in a Single-AZ; data lost when AZ destroyed
   - 99.5% Availability (lesser than Standard-Infrequent Access)
   - **Use Cases**:

     - Storing Secondary backup copies of on-premise data
     - Data you can recreate

   - **Minimum capacity charge per object**: `128 KB`
   - **Minimum storage duration**: `30 days`

4. **Amazon S3 Glacier Instant Retrieval**

   - 99.9% Availability (Same as S3 Standard-Infrequent Access) backed by Amazon S3 SLA.
   - High durability (99.999999999%) of objects across multiple AZs.
   - Low-cost object storage meant for archiving / backup
   - Pricing: Price for storage + object retrieval cost
   - Millisecond retrieval, great for data accessed once a quarter
   - **Minimum storage duration**: `90 days`
   - **Minimum capacity charge per object**: `128 KB`
   - Supports SSL for data in transit and encryption of data at rest (using AES-256 symmetric keys)
   - Save up to `68%` on storage costs compared to using the S3 Standard-Infrequent Access (S3 Standard-IA) storage class

5. **Amazon S3 Glacier Flexible Retrieval**

   - Lower-cost object storage meant for archiving / backup
   - **Three flexibility tiers**:

     - `Expedited`: 1-5 minutes
     - `Standard`: 3-5 hours
     - `Bulk`: 5-12 hours (FREE)

   - **Minimum storage duration**: `90 days`
   - **Minimum capacity charge per object**: `40 KB`
   - Supports SSL for data in transit and encryption of data at rest (using AES-256 symmetric keys)

6. **Amazon S3 Glacier Deep Archive**

   - Meant for Long term storage .
   - Lowest cost storage class designed for long-term retention of data.

   - **Two flexibility tiers**:

     - `Standard`: 12 hours
     - `Bulk`: 48 hours

   - - **Use Cases**:

     - Archive data that maybe accessed 1-2 times a year.
     - Industries like health, banking, public sectors that retain data upto 7-10 years to meet compliance requirements.
     - Ideal alternative to magnetic tape libraries

   - **Minimum storage duration**: `180 days`
   - **Minimum capacity charge per object**: `40 KB`

7. **Amazon S3 Glacier Intelligent-Tiering**

   - Moves objects automatically between Access Tiers based on usage
   - Small monthly monitoring and auto-tiering fee
   - There are no retrieval charges in S3 Intelligent-Tiering
   - Tiers:
     - `Frequent Access` tier (automatic): Default tier
     - `Infrequent Access` tier (automatic): Objects not accessed in 30 days
     - `Archive Instant Access` tier (automatic): Objects not accessed for 90 days
     - `Archive Access` tier (optional): configurable from 90 days to 700+ days
     - `Deep Archive Access` tier (optional): configurable from 180 days to 700+ days

---

## S3 Storage Classes: Lifecycle Rules

### Lifecycle Rules: Overview

A lifecycle configuration is a set of rules that define actions that Amazon S3 applies to a group of objects. With lifecycle configuration rules, you can tell Amazon S3 to transition objects to less expensive storage classes, archive them, or delete them.

- Move objects between storage classes automatically based on Lifecycle Rules
- The minimum storage duration is `30 days` before you can transition objects from S3 Standard to S3 One Zone-IA or S3 Standard-IA.
- Lifecycle Rules:

  - **Transition Actions**: Configure objects to transition to another storage class
    - E.g. Move to Standard IA class 60 days after creation
    - E.g. Move to Glacier for archiving after 180 days
  - **Expiration Actions**: Configure objects to expire (delete) after some time

    - Can be used to make Access log files set to delete after 365 days
    - Can be used to delete old versions of files (if versioning is enabled)
    - Can be used to delete incomplete multi-part uploads if more than x days old

  - Rules can be created for a certain prefix or certain path within the bucket (example: `s3//mybucket/mp3/*`)
  - Rules can be created for certain object Tags (example: `Department:Finance`)

**Scenario 1:** Your application on EC2 creates image thumbnails after profile photos are uploaded to Amazon S3. These thumbnails can be easily recreated, and only need to be kept for 60 days. The source images should be able to be immediately retrieved for these 60 days, and afterwards the user can wait upto 6 hours. How would you design this?

**Ans:**

- S3 Source Images can be on the **Standard** storage class, with a Lifecycle configuration to transition them to **Glacier** in 60 days.
- S3 Thumbnails can be a **One-Zone IA**, with a lifecycle configuration to expire them (delete them) after 60 days.

**Scenario 2:** A rule in your company states that you should be able to recover your deleted S3 objects immediately for 30 days, although this may happen rarely. After this time, and for upto 365 days, deleted objects should be recoverable within 48 hours.

**Ans:**

- **Enable S3 Versioning**: In order to have different object versions so that **"deleted objects"** are in fact hidden by a `Delete Marker` and can be recovered.
- Transition the `non-current versions` of the objects to **Standard IA**
- Transition these `non-current versions` to **Glacier Deep Archive**

---

### Lifecycle Rules: Create Lifecycle Rule

- Go to the S3 Bucket and click the **`Management`** Tab.
- Click on **`Create lifecycle rule`**
- Fill the following configuration:

- **Lifecycle rule configuration**:

  - **Lifecycle rule name**:
  - **Choose a rule scope**:

  - **Filter type**: You can filter objects by prefix, object tags, object size, or whatever combination suits your usecase.

    - **Prefix**: Add filter to limit the scope of this rule to a single prefix. Don't include the bucket name in the prefix. Using certain characters in key names can cause problems with some applications and protocols. [Learn more](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html)

    - **Object tags**: You can limit the scope of this rule to the key/value pairs added below.

    - **Object size**: You can limit the scope of this rule to apply to objects based on their size. For example, you can filter out objects that might not be cost effective to transition to Glacier Flexible Retrieval (formerly Glacier) because of per-object fees.
      - **Specify minimum object size**
      - **Specify maximum object size**

- **Lifecycle rule actions**: Choose the actions you want this rule to perform. [Per-request fees apply](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html#glacier-pricing-considerations).

  - `Move current versions of objects between storage classes`
  - `Move noncurrent versions of objects between storage classes`
  - `Expire current versions of objects`
  - `Permanently delete noncurrent versions of objects`
  - `Delete expired object delete markers or incomplete multipart uploads`

  Each of these actions have their own options and need to be filled.

- Review transition and expiration actions and click **`Create rule`**

---

## S3 Storage Classes: Storage Class Analysis

- Help you decide when to transition objects to the right storage class
- Recommendations for **`Standard`** and **`Standard IA`**. Does not work for **`One-Zone IA`** or **`Glacier`**
- **S3 Analytics** run on top of the S3 bucket and creates a CSV report that gives recommendations and statistics
- Report is updated daily
- 24 to 48 hours to start seeing data analysis

---

# S3: Event Notifications

## S3 Event Notifications: Overview

You can use the Amazon S3 Event Notifications feature to receive notifications when certain events happen in your S3 bucket.

- E.g. `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, `S3:Replication`
- Object name filtering possible (e.g. `*.jpg`)
- **Use case**: Generate thumbnails of images uploaded to S3

- **Workflow**:

  - Create an Event Notification
  - Send it to SNS, SQS, a Lambda function or Amazon EventBridge (and send to over 18 AWS services as destinations from EventBridge).

    > **Note**: **SQS FIFO Queue and SNS FIFO Topic are NOT allowed.**

- Can create as many S3 events as desired
- Amazon S3 event notifications are designed to be delivered at least once.
- S3 event notifications typically deliver events in seconds but can sometimes take a minute or longer
- With EventBridge:
  - Advanced filtering options with JSON rules (metadata, object size, name etc)
  - Multiple Destinations - e.g. Step Functions, Kinesis Streams, Firehose
  - EventBridge Capabilities: Archive, Replay Events, Reliable Delivery

---

## S3 Event Notifications: Create an S3 Event Notification

- Go to the S3 Bucket and click the **`Properties`** Tab.
- Scroll down to the **Event notifications** section and Click on **`Create event Notification`**
- Enter the following configurations:

- **Generation configration**:

  - **Event name**: Event name can contain up to 255 characters.
  - **Prefix (optional)**: Limit the notifications to objects with key starting with specified characters.
  - **Suffix (optional)**: Limit the notifications to objects with key ending with specified characters.

- **Event types**: Specify at least one event for which you want to receive notifications. For each group, you can choose an event type for all events, or you can choose one or more individual events.

  1. **Object creation**:

     - **All object create events**: `s3:ObjectCreated:*`
     - **Put**: `s3:ObjectCreated:Put`
     - **Post**: `s3:ObjectCreated:Post`
     - **Copy**: `s3:ObjectCreated:Copy`
     - **Multipart upload completed**: `s3:ObjectCreated:CompleteMultipartUpload`

  2. **Object restore**:

     - **All restore object events**: `s3:ObjectRestore:*`
     - **Restore initiated**: `s3:ObjectRestore:Post`
     - **Restore completed**: `s3:ObjectRestore:Completed`
     - **Restore object expired**: `s3:ObjectRestore:Delete`

  3. **Object ACL**:

     - **Object ACL events**: `s3:ObjectAcl:Put`

  4. **Object tagging**:

     - **All object tagging events**: `s3:ObjectTagging:*`
     - **Object tags added**: `s3:ObjectTagging:Put`
     - **Object tags deleted**: `s3:ObjectTagging:Delete`

  5. **Reduced Redundancy Storage**:

     - **Reduced Redundancy Storage (RRS) object lost events**: `s3:ReducedRedundancyLostObject`

  6. **Replication**:

     - **All replication events**: `s3:Replication:*`
     - **Replication Time Control: Object exceeded 15 minute threshold**: `s3:Replication:OperationMissedThreshold`
     - **Replication Time Control: Object replicated after 15 minute threshold**: `s3:Replication:OperationReplicatedAfterThreshold`
     - **Object not tracked by replication**: `s3:Replication:OperationNotTracked`
     - **Object failed to replicate**: `s3:Replication:OperationFailedReplication`

  7. **Lifecycle**:

     - **Lifecycle transition events**: `s3:LifecycleTransition`
     - **All lifecycle expiration events**: `s3:LifecycleExpiration:*`
     - **Object expired**: `s3:LifecycleExpiration:Delete`
     - **Delete marker added by Lifecycle for a versioned object**: `s3:LifecycleExpiration:DeleteMarkerCreated`

  8. **Intelligent Tiering**:

     - **Intelligent-Tiering archive events**: `s3:IntelligentTiering`

- **Destination**: Choose a destination to publish the event. Note: You need to validate the destination configuration. (e.g. Change Access Policy to allow permissions in SQS for S3)

  - **Lambda function**:

    - Specify Lambda function:
      - Choose from your Lambda functions
      - Enter Lambda function ARN

  - **SNS topic**:

    - Specify SNS topic:
      - Choose from your SNS topics
      - Enter SNS topic ARN

  - **SQS queue**:

    - Specify SQS queue:
      - Choose from your SQS queues
      - Enter SQS queue ARN

- Click `Save changes` once done to create an event notification

---

## S3 Event Notifications: Setup Amazon EventBridge

- Go to the S3 Bucket and click the **`Properties`** Tab.
- Scroll down to the **Amazon EventBridge** section and Click on **`Edit`**
- Turn the **`Send notifications to Amazon EventBridge for all events in this bucket`** setting **`On`**
- Click **`Save changes`** to save the changes

---

# S3: Performance

- Amazon S3 automatically scales to high request rates, latency `100-200 ms`
- Your application can achieve at least **`3,500`** `PUT` / `COPY` / `POST` / `DELETE` requests and **`5,500`** `GET` / `HEAD` requests per seconds per prefix in a bucket.
- There is no limits to the number of prefixes per bucket.
- Example: (object path => prefix)
  - `bucket/folder1/sub1/file` => `/folder/sub1/`
  - `bucket/folder1/sub2/file` => `/folder/sub2/`
  - `bucket/1/file` => `/1/`
  - `bucket/2/file` => `/2/`
- If you spread your READs across all four prefixes evenly, you can achieve **`22,000`** requests per second for GET and HEAD requests.

- **Multi-Part upload**:

  - Recommended for files > 100MB
  - Must use for files > 5GB
  - Parallelizes uploads (speed up transfers). A big file is broken down into chunks and uploaded to Amazon S3. Amazon S3 then stitches up these chunks into a single file after uploads are completed.

- **Retry Requests for Latency-Sensitive Applications**:

  - Aggressive timeouts and retries help drive consistent latency.
  - Given the large scale of Amazon S3, if the first request is slow, a retried request is likely to take a different path and quickly succeed.
  - The AWS SDKs have configurable timeout and retry values that you can tune to the tolerances of your specific application

- **S3 Transfer Acceleration**:

  - Increase transfer speed by transferring file to an AWS edge location which will forward the data to the S3 bucket in the target region.
    - E.g. A File in USA needs to be uploaded to a S3 bucket in Australia
    - The File is uploaded through an edge location in USA over the public internet
    - The Edge location transfers the file from the edge location to the S3 bucket in Australia over private AWS network
    - The idea is to minimize the public network the file has to be transferred through and maximize the fast private network the file is transferred through
  - Compatible with multi-part upload
  - **Pricing**: There is a charge on accelerated transfers but if there is no accelerated transfer then there are no charges for the transfer (AWS uses a speed comparison tool to determine whether an acceleration occured)

- **S3 Byte-Range Fetches**:

  - Parallelizes GETs by requesting specific byte ranges
  - Better resilience in case of failures:
    - In case there is a failure to get a specific byte range, then you can retry a smaller byte range
  - Can be used to speed up downloads
  - A large file can be downloaded in chunks (byte ranges) that are downloaded in parallel
  - Can be used to retrieve only a partial data (for example: the head of a file)
    - Byte-range request for header (first xx bytes)

---

# S3: Requester Pays

In general, bucket owners pay for all Amazon S3 storage and data transfer costs that are associated with their bucket. However, you can configure a bucket to be a Requester Pays bucket.

- With Requester Pays buckets, the requester instead of the bucket owner pays the cost of the request and the data download from the bucket.
- The bucket owner always pays the cost of storing data.
- Typically, you configure buckets to be Requester Pays buckets when you want to share data but not incur charges associated with others accessing the data.

- **Use Case**:

  - You might use Requester Pays buckets when making available large datasets, such as zip code directories, reference data, geospatial information, or web crawling data.

- Requester Pays buckets do not support the following:
  - Anonymous requests (must be authenticated in AWS)
  - SOAP requests
  - Using a Requester Pays bucket as the target bucket for end-user logging, or vice versa. However, you can turn on end-user logging on a Requester Pays bucket where the target bucket is not a Requester Pays bucket.

---

# S3: S3 Select & Glacier Select

- Retrieve less data using SQL by performing server-side filtering
- Can filter by rows and columns (simple SQL filtering)
- Less network transfer; less CPU cost client-side

---

# S3: Batch Operations

- Perform bulk operations on existing S3 objects with a single request.

- **Examples**:

  - Modify object metadata and properties
  - Copy objects between S3 objects
  - Encrypt unencrypted objects
  - Modify ACL Tags
  - Restore objects from S3 Glacier
  - Invoke Lambda function to perform custom action on each object

- A batch job consists of:

  - A list of objects
  - The action to perform
  - Optional parameters

- S3 Batch Operations manages retries, tracks progress, sends completion notifications, generate reports etc.

- You can use **S3 Inventory** to get Object List and use **S3 Select** to filter your objects and then pass the filtered list to a S3 batch job

---

# [S3: Consistency Model](https://aws.amazon.com/blogs/aws/amazon-s3-update-strong-read-after-write-consistency/)

- **S3 is Strongly Consistent** - what you write is what you read.

- There are two types of consistency models for large-scale distributed systems:

  - **Eventually Consistent**: After a call to an UPDATE API call that stores or modifies data, there’s a small time window where the data has been accepted and durably stored, but not yet visible to all GET or LIST requests. S3 used to be eventually consistent until 2020.

  - **Strongly Consistent**: In a strongly consistent model, all WRITE operations are immediately reflected - what you write is what you read. S3 is strongly consistent and all **S3** **`GET`**, **`PUT`**, and **`LIST`** operations, as well as operations that change **object tags**, **ACLs**, or **metadata**, are now strongly consistent. The results of a `LIST` will be an accurate reflection of what’s in the bucket.

---

# S3: Using the CLI

## S3 API

### [`mb`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/mb.html)

Creates a S3 bucket.

**Syntax:**

```s
aws s3 mb [S3Uri] \
 --region [Region] \ # The region to use. Overrides config/env settings.
 --profile [Profile] \ # Use a specific profile from your credential file.
```

**Example:**

```s
aws s3 mb s3://jayanta-s3-bucket
```

**Response:**

make_bucket: jayanta-s3-bucket

---

### [`cp`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/cp.html)

Copies a local file(s) or S3 object(s) to another location locally or in S3.

When copying an object, you can preserve all metadata (default) or specify new metadata. However, the ACL is not preserved and is set to private for the user making the request. To override the default ACL setting, specify a new ACL when generating a copy request.

- Can Copy Local file(s) to S3
- Can Copy S3 file(s) to Local Disk
- Can Copy Files within the same S3 bucket
- Can Copy Files across S3 buckets
- Can Recursively copy files to and from S3

**Syntax:**

```s
aws s3 cp [source] [destination] \
  --acl ["private" | "public-read" | "public-read-write" | "authenticated-read" | "aws-exec-read", "bucket-owner-read" | "bucket-owner-full-control" | "log-delivery-write"] \
  --expires [ISO 8601 Timestamp] \
  --dryrun \ # execute as a dryrun
  --recursive \ # Recursively copy all non-versioned objects
  --quiet \ # Do not show copy related logs in the console
  --exclude [RegExPattern] \
  --include [RegExPattern] \
  --storage-class [STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE | GLACIER_IR] \ # Defaults to "STANDARD"
  --sse ["AES256" | "aws:kms"] \
  --sse-c ["AES256"] \
  --sse-c-key [EncryptionKeyBlob] \
  --sse-kms-key-id [KMSKeyID] \
  --sse-c-copy-source [DecryptingAlgorithm | "AES256"] \ # Defaults to "AES256"
  --sse-c-copy-source-key [EncryptionKeyBlob] \ # `--sse-c-copy-source` must be specified as well
  --copy-props [none|metadata-directive|default] \
  --expected-size [bytes] \
  --only-show-errors \
  --metadata [KeyName1=string,KeyName2=string] \
  --request-payer requester # Confirms that the requester knows that they will be charged for the request
```

Where,

- **The S3 location must be a S3 URI**

**EXAMPLES:**

1. **Copying a local file to S3**

   ```s
   aws s3 cp ~/hello.txt s3://jayanta-s3-bucket/
   ```

   **Response:**

   ```
   upload: ./hello.txt to s3://jayanta-s3-bucket/hello.txt
   ```

2. **Copying a file from S3 to S3**

   ```s
   aws s3 cp s3://jayanta-s3-bucket/hello.txt s3://jayanta-s3-bucket/copied/hello.txt
   ```

   **Response:**

   ```
   copy: s3://jayanta-s3-bucket/hello.txt to s3://jayanta-s3-bucket/copied/hello.txt
   ```

3. **Copying an S3 object to a local file**

   ```s
   aws s3 cp s3://jayanta-s3-bucket/hello.txt ~/hello1.txt
   ```

   **Response:**

   ```
   download: s3://jayanta-s3-bucket/policy.json to ./policy1.json
   ```

4. **Recursively copies S3 objects to a local directory**

   ```s
   aws s3 cp s3://jayanta-s3-bucket . --recursive
   ```

   **Response:**

   ```
   download: s3://mybucket/test1.txt to test1.txt
   download: s3://mybucket/test2.txt to test2.txt
   ```

5. **Recursively copying local files to S3**

   ```s
   aws s3 cp ~/s3TestFolder s3://jayanta-s3-bucket --recursive
   ```

   **Response:**

   ```
   upload: s3TestFolder/hello.txt to s3://jayanta-s3-bucket/hello.txt
   upload: s3TestFolder/quickbrownfox.txt to s3://jayanta-s3-bucket/quickbrownfox.txt
   ```

---

### [`mv`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/mv.html)

Moves a local file(s) or S3 object(s) to another location locally or in S3.

- Can Move Local file(s) to S3
- If Move is done at the same location, the file is renamed.
- Can Move S3 file(s) to Local Disk
- Can Move Files within the same S3 bucket
- Can Move Files across S3 buckets
- Can Recursively Move files to and from S3

**Syntax:**

```s
aws s3 mv [source] [destination] \
  --acl ["private" | "public-read" | "public-read-write" | "authenticated-read" | "aws-exec-read", "bucket-owner-read" | "bucket-owner-full-control" | "log-delivery-write"] \
  --expires [ISO 8601 Timestamp] \
  --dryrun \ # execute as a dryrun
  --recursive \ # Recursively move all non-versioned objects
  --quiet \ # Do not show move related logs in the console
  --exclude [RegExPattern] \
  --include [RegExPattern] \
  --storage-class [STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE | GLACIER_IR] \ # Defaults to "STANDARD"
  --sse ["AES256" | "aws:kms"] \
  --sse-c ["AES256"] \
  --sse-c-key [EncryptionKeyBlob] \
  --sse-kms-key-id [KMSKeyID] \
  --sse-c-copy-source [DecryptingAlgorithm | "AES256"] \ # Defaults to "AES256"
  --sse-c-copy-source-key [EncryptionKeyBlob] \ # `--sse-c-copy-source` must be specified as well
  --copy-props [none|metadata-directive|default] \
  --expected-size [bytes] \
  --only-show-errors \
  --request-payer requester # Confirms that the requester knows that they will be charged for the request
```

Where,

- **The S3 location must be a S3 URI**

**EXAMPLES:**

1. **Moving a local file to S3**

   ```s
   aws s3 mv ~/hello.txt s3://jayanta-s3-bucket/
   ```

   **Response:**

   ```
   upload: ./hello.txt to s3://jayanta-s3-bucket/hello.txt
   ```

2. **Renaming a file on S3**

   ```s
   aws s3 mv s3://jayanta-s3-bucket/quickbrownfox.txt s3://jayanta-s3-bucket/thefoxandthelazydog.txt
   ```

   **Response:**

   ```
   move: s3://jayanta-s3-bucket/quickbrownfox.txt to s3://jayanta-s3-bucket/thefoxandthelazydog.txt
   ```

3. **Moving a file from S3 to S3**

   ```s
   aws s3 mv s3://jayanta-s3-bucket/thefoxandthelazydog.txt s3://jayanta-s3-bucket/fox
   ```

   **Response:**

   ```
   move: s3://jayanta-s3-bucket/thefoxandthelazydog.txt to s3://jayanta-s3-bucket/fox
   ```

4. **Moving an S3 object to a local file**

   ```s
   aws s3 mv s3://jayanta-s3-bucket/hello.txt ~/hello1.txt
   ```

   **Response:**

   ```
   download: s3://jayanta-s3-bucket/policy.json to ./policy1.json
   ```

5. **Recursively moving S3 objects to a local directory**

   ```s
   aws s3 mv s3://jayanta-s3-bucket . --recursive
   ```

   **Response:**

   ```
   download: s3://mybucket/test1.txt to test1.txt
   download: s3://mybucket/test2.txt to test2.txt
   ```

6. **Recursively moving local files to S3**

   ```s
   aws s3 mv ~/s3TestFolder s3://jayanta-s3-bucket --recursive
   ```

   **Response:**

   ```
   upload: s3TestFolder/hello.txt to s3://jayanta-s3-bucket/hello.txt
   upload: s3TestFolder/quickbrownfox.txt to s3://jayanta-s3-bucket/quickbrownfox.txt
   ```

---

### [`sync`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html)

Syncs directories and S3 prefixes. Recursively copies new and updated files from the source directory to the destination. Only creates folders in the destination if they contain one or more files.

**Syntax:**

```s
aws s3 sync [source] [destination] \
  --acl ["private" | "public-read" | "public-read-write" | "authenticated-read" | "aws-exec-read", "bucket-owner-read" | "bucket-owner-full-control" | "log-delivery-write"] \
  --expires [ISO 8601 Timestamp] \
  --dryrun \ # execute as a dryrun
  --recursive \ # Recursively delete all non-versioned objects
  --quiet \ # Do not show delete logs in the console
  --exclude [RegExPattern] \
  --include [RegExPattern] \
  --storage-class [STANDARD | REDUCED_REDUNDANCY | STANDARD_IA | ONEZONE_IA | INTELLIGENT_TIERING | GLACIER | DEEP_ARCHIVE | GLACIER_IR] \ # Defaults to "STANDARD"
  --sse ["AES256" | "aws:kms"] \
  --sse-c ["AES256"] \
  --sse-c-key [EncryptionKeyBlob] \
  --sse-kms-key-id [KMSKeyID] \
  --sse-c-copy-source [DecryptingAlgorithm | "AES256"] \ # Defaults to "AES256"
  --sse-c-copy-source-key [EncryptionKeyBlob] \ # `--sse-c-copy-source` must be specified as well
  --copy-props [none|metadata-directive|default] \
  --expected-size [bytes] \
  --only-show-errors \
  --request-payer requester # Confirms that the requester knows that they will be charged for the request
```

**Example:**

```s
aws s3 sync ~/s3TestFolder s3://jayanta-s3-bucket/S3TestFolder
```

**Response:**

```
upload: s3TestFolder/hello.txt to s3://jayanta-s3-bucket/S3TestFolder/hello.txt
upload: s3TestFolder/quickbrownfox.txt to s3://jayanta-s3-bucket/S3TestFolder/quickbrownfox.txt
upload: s3TestFolder/testSync.txt to s3://jayanta-s3-bucket/S3TestFolder/testSync.txt
```

---

### [`ls`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/ls.html)

List S3 objects and common prefixes under a prefix or all S3 buckets.

> **Note:** The `--output` and `--no-paginate` arguments are ignored for this command.

**Syntax:**

```s
aws s3 ls [S3Uri | NONE] \
 --recursive \
 --human-readable \
 --summarize \
```

1. **Show all Buckets**

   ```s
   aws s3 ls
   ```

   **Response:**

   ```
   2022-11-21 17:15:37 elasticbeanstalk-ap-south-1-336463900088
   2022-11-27 12:00:19 jayanta-s3-bucket
   ```

2. **Show all objects inside a S3 bucket**

   ```s
   aws s3 ls s3://jayanta-s3-bucket --recursive
   ```

   **Response:**

   ```
   2022-11-27 13:24:00         13 S3TestFolder/hello.txt
   2022-11-27 13:24:00         44 S3TestFolder/quickbrownfox.txt
   ```

---

### [`presign`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/presign.html)

Generate a pre-signed URL for an Amazon S3 object. This allows anyone who receives the pre-signed URL to retrieve the S3 object with an HTTP GET request. All presigned URL’s now use sigv4 so the region needs to be configured explicitly.

**Syntax:**

```s
aws s3 presign [S3Uri] \
 --expires-in [Seconds | 3600]
```

Where,

- `--expires-in` (integer): Number of seconds until the pre-signed URL expires. Default is `3600` seconds. Maximum is `604800` seconds.

**Example:**

```s
aws s3 presign s3://jayanta-s3-bucket/test2.txt \
  --expires-in 604800
```

**Response:**

```
https://jayanta-s3-bucket.s3.ap-south-1.amazonaws.com/key?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAEXAMPLE123456789%2F20210621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210621T041609Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=EXAMBLE1234494d5fba3fed607f98018e1dfc62e2529ae96d844123456
```

---

### [`website`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/website.html)

Set the website configuration for a bucket.

**Syntax:**

```s
aws s3 website [S3Uri] \
 --index-document [suffix]
 --error-document [errorKey]
```

Where,

- **`--index-document`** (string): A suffix that is appended to a request that is for a directory on the website endpoint (e.g. if the suffix is index.html and you make a request to samplebucket/images/ the data that is returned will be for the object with the key name images/index.html) The suffix must not be empty and must not include a slash character.

- **`--error-document`** (string): The object key name to use when a 4XX class error occurs.

**Example:**

```s
aws s3 website s3://jayanta-s3-bucket --index-document index.html --error-document error.html
```

---

### [`rm`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rm.html)

Deletes an S3 object.

**Syntax:**

```s
aws s3 rm [S3Uri] \
  --dryrun \ # execute as a dryrun
  --recursive \ # Recursively delete all non-versioned objects
  --quiet \ # Do not show delete logs in the console
  --exclude [RegExPattern] \
  --include [RegExPattern] \
  --only-show-errors \ # Only show errors in the console
  --page-size [Number] \
  --request-payer requester # Confirms that the requester knows that they will be charged for the request
```

**Example: Recursively delete all objects in a S3 Bucket that has versioning disabled in quiet mode**

```s
aws s3 rm s3://jayanta-s3-bucket --recursive --quiet
```

---

### [`rb`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/rb.html)

Deletes an empty S3 bucket. A bucket must be completely empty of objects and versioned objects before it can be deleted. However, the `--force` parameter can be used to delete the non-versioned objects in the bucket before the bucket is deleted.

**Syntax:**

```s
aws s3 rm [S3Uri] \
 --force
```

Where,

- `S3Uri`: The Bucket URI
- `--force`: Deletes all objects in the bucket including the bucket itself. Note that versioned objects will not be deleted in this process which would cause the bucket deletion to fail because the bucket would not be empty.

  > Note: To delete versioned objects, use:
  >
  > - The **[`s3api delete-object`]** command with the `--version-id` parameter to delete one versioned object at a time.
  > - The **[`s3api delete-objects`](#delete-objects)** command with the `--delete` option taking the versioned objects queried using [`list-object-versions`](#list-object-versions), to delete multiple/all objects.

**Example 1: Delete an empty bucket**

```s
aws s3 rb s3://jayanta-s3-bucket
```

**Example 2: Delete the non-versioned objects before deleting the bucket**

```s
aws s3 rb s3://jayanta-s3-bucket --force
```

**Response:**

remove_bucket: jayanta-s3-bucket

---

## S3API API

### [`create-bucket`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html)

Creates a new S3 bucket.

By default, the bucket is created in the US East (N. Virginia) Region (`us-east-1`). You can optionally specify a Region in the request body. You might choose a Region to optimize latency, minimize costs, or address regulatory requirements. For example, if you reside in Europe, you will probably find it advantageous to create buckets in the Europe (Ireland) Region.

**Syntax:**

```s
aws s3api create-bucket \
  --bucket [GloballyUniqueBucketName] \
  --region [Region] \
  --create-bucket-configuration LocationConstraint=[Region]
```

**Example:**

```s
aws s3api create-bucket \
  --bucket "aws-cloudtrail-logs-336463900088-7a23c688" \
  --region ap-south-1
  --create-bucket-configuration LocationConstraint=ap-south-1
```

---

### [`put-public-access-block`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-public-access-block.html)

Creates or modifies the **`PublicAccessBlock`** configuration for an Amazon S3 bucket. To use this operation, you must have the **`s3:PutBucketPublicAccessBlock`** permission.

**Syntax:**

```s
aws s3api put-public-access-block \
  --bucket [BucketName] \
  --public-access-block-configuration BlockPublicAcls=boolean,IgnorePublicAcls=boolean,BlockPublicPolicy=boolean,RestrictPublicBuckets=boolean
```

**Example: Block public access completely**

```s
aws s3api put-public-access-block \
  --bucket "aws-cloudtrail-logs-336463900088-7a23c688" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

---

### [`put-bucket-policy`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html)

Applies an Amazon S3 bucket policy to an Amazon S3 bucket. If you are using an identity other than the root user of the Amazon Web Services account that owns the bucket, the calling identity must have the **`PutBucketPolicy`** permissions on the specified bucket and belong to the bucket owner’s account in order to use this operation.

If you don’t have **`PutBucketPolicy`** permissions, Amazon S3 returns a `403 Access Denied error`. If you have the correct permissions, but you’re not using an identity that belongs to the bucket owner’s account, Amazon S3 returns a `405 Method Not Allowed` error.

> **Note**: As a security precaution, the root user of the Amazon Web Services account that owns a bucket can always use this operation, even if the policy explicitly denies the root user the ability to perform this action.

**Syntax**:

```s
aws s3api put-bucket-policy \
  --bucket [BucketName] \
  --policy [PolicyJSONString | JSONFilePathURL]
```

**Example**:

```s
aws s3api put-bucket-policy \
  --bucket "aws-cloudtrail-logs-336463900088-7a23c688" \
  --policy file:///home/jayantasamaddar/Work/quick-reference/aws/monitoring/assets/s3policy.json
```

---

### [`put-bucket-notification-configuration`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-notification-configuration.html)

Enables adding and modifying notifications of specified events for a bucket.

> **Note**: The PUT notification is an atomic operation. For example, suppose your notification configuration includes SNS topic, SQS queue, and Lambda function configurations. When you send a PUT request with this configuration, Amazon S3 sends test messages to your SNS topic. If the message fails, the entire PUT action will fail, and Amazon S3 will not add the configuration to your bucket.

**EXAMPLES:**

1. **Add a SQS Notification**

   In `assets/s3-sqs-notification-config.json`,

   ```json
   {
     "QueueConfigurations": [
       {
         "QueueArn": "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue",
         "Events": [
           "s3:ObjectCreated:Put",
           "s3:ObjectCreated:Post",
           "s3:ObjectCreated:Copy",
           "s3:ObjectCreated:CompleteMultipartUpload",
           "s3:ObjectRemoved:Delete",
           "s3:ObjectRemoved:DeleteMarkerCreated",
           "s3:ObjectRestore:Post",
           "s3:ObjectRestore:Completed"
         ]
       }
     ]
   }
   ```

   ```s
   aws s3api put-bucket-notification-configuration \
    --bucket jayanta-s3-bucket \
    --notification-configuration file:///home/jayantasamaddar/Work/quick-reference/aws/messaging/assets/s3-sqs-notification-config.json
   ```

2. **Remove All Queue and SNS notifications** (but leave LambdaFunction Notifications)

   ```s
   aws s3api put-bucket-notification-configuration \
   --bucket=jayanta-s3-bucket \
   --notification-configuration='{"QueueConfigurations": [], "TopicConfigurations": []}'
   ```

3. **Remove All notifications**

   ```s
   aws s3api put-bucket-notification-configuration \
   --bucket=jayanta-s3-bucket \
   --notification-configuration='{}'
   ```

---

### [`put-bucket-versioning`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html)

Sets the versioning state of an existing bucket.

You can set the versioning state with one of the following values:

- **Enabled**: Enables versioning for the objects in the bucket. All objects added to the bucket receive a unique version.
- **Suspended**: Disables versioning for the objects in the bucket. All objects added to the bucket receive the version ID null.

In order to enable MFA Delete, you must be the bucket owner. If you are the bucket owner and want to enable MFA Delete in the bucket versioning configuration, you must include the `x-amz-mfa` request header and the Status and the **`MfaDelete`** request elements in a request to set the versioning state of the bucket.

**Syntax:**

```s
aws s3api put-bucket-versioning \
 --bucket [BucketName] \
 --versioning-configuration MFADelete=["Enabled"|"Disabled"],Status=["Enabled"|"Suspended"] \
 --mfa [DeviceSerialNumber AuthenticationCode] # Required if versioning is configured with MFA enabled
```

**Example:**

```s
aws s3api put-bucket-versioning \
 --bucket "jayanta-s3-bucket" \
 --versioning-configuration Status=Enabled
```

**Response:**

None

(use **[`aws s3api get-bucket-versioning`](#get-bucket-versioning)** to check)

---

### [`get-bucket-versioning`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/get-bucket-versioning.html)

Returns the versioning state of a bucket.

To retrieve the versioning state of a bucket, you must be the bucket owner.

This implementation also returns the MFA Delete status of the versioning state. If the MFA Delete status is enabled, the bucket owner must use an authentication device to change the versioning state of the bucket.

If the versioning state has never been set on a bucket, it has no versioning state; a **`GetBucketVersioning`** request does not return a versioning state value.

**Syntax:**

```s
aws s3api get-bucket-versioning --bucket [BucketName]
```

**Example:**

```s
aws s3api get-bucket-versioning --bucket jayanta-s3-bucket
```

**Response: If Bucket Versioning is Enabled**

```json
{
  "Status": "Enabled"
}
```

---

### [`get-object-attributes`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/get-object-attributes.html)

Retrieves all the metadata from an object without returning the object itself. This action is useful if you’re interested only in an object’s metadata. To use **`GetObjectAttributes`**, you must have READ access to the object.

If you encrypt an object by using server-side encryption with customer-provided encryption keys (SSE-C) when you store the object in Amazon S3, then when you retrieve the metadata from the object, you must use the following headers:

- `x-amz-server-side-encryption-customer-algorithm`

- `x-amz-server-side-encryption-customer-key`

- `x-amz-server-side-encryption-customer-key-MD5`

**Syntax:**

```s
aws s3api get-object-attributes \
 --bucket [BucketName] \
 --key [ObjectPath] \
 --version-id [ObjectVersionID] \
 --max-parts [Number] \
 --part-number-marker [Number] \
 --sse-customer-algorithm [EncryptionAlgorithm] \
 --sse-customer-key [EncryptionKey] \
 --sse-customer-key-md5 [MD5KeyDigest] \
 --object-attributes ["ETag" | "Checksum" | "ObjectParts" | "StorageClass" | "ObjectSize" ]
```

**Example:**

```s
aws s3api get-object-attributes \
 --bucket jayanta-s3-bucket \
 --key policy.txt \
 --object-attributes "ETag" "Checksum" "ObjectParts" "StorageClass" "ObjectSize"
```

**Response:**

```json
{
  "LastModified": "2022-11-27T15:34:14+00:00",
  "VersionId": "vdVersjEM3ydRTp85T7F659c8.XYNQT6",
  "ETag": "13f6882179b5feca4156474fcf0db2aa",
  "StorageClass": "STANDARD",
  "ObjectSize": 274
}
```

---

### [`list-object-versions`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/list-object-versions.html)

Returns metadata about all versions of the objects in a bucket. You can also use request parameters as selection criteria to return metadata about a subset of all the object versions.

> **Note**:
>
> - To use this operation, you must have permissions to perform the **`s3:ListBucketVersions`** action. Be aware of the name difference.
> - To use this operation, you must have **READ** access to the bucket.
> - A 200 OK response can contain valid or invalid XML. Make sure to design your application to parse the contents of the response and handle it appropriately.

`list-object-versions` is a paginated operation. Multiple API calls may be issued in order to retrieve the entire data set of results. You can disable pagination by providing the `--no-paginate` argument. When using `--output` text and the `--query` argument on a paginated response, the `--query` argument must extract data from the results of the following query expressions: `Versions`, `DeleteMarkers`, `CommonPrefixes`

**Syntax:**

```s
aws s3api list-object-versions \
 --bucket [BucketName] \
 --output [json|text|table|yaml|yaml-stream] \
 --query [JMESPathQueryFilter]
```

**Example:**

```s
aws s3api list-object-versions \
 --bucket "aws-cloudtrail-logs-336463900088-7a23c688" \
```

**Response:**

```json
{
  "Versions": [
    {
      "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
      "Size": 0,
      "StorageClass": "STANDARD",
      "Key": "AWSLogs/336463900088/CloudTrail-Digest/",
      "VersionId": "null",
      "IsLatest": true,
      "LastModified": "2022-11-27T05:47:59+00:00",
      "Owner": {
        "ID": "361bd2122fc9fc14028f71099415497160d1c4521906aba4ef590b0fab39151b"
      }
    },
    {
      "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
      "Size": 0,
      "StorageClass": "STANDARD",
      "Key": "AWSLogs/336463900088/CloudTrail/",
      "VersionId": "null",
      "IsLatest": true,
      "LastModified": "2022-11-27T05:47:59+00:00",
      "Owner": {
        "ID": "361bd2122fc9fc14028f71099415497160d1c4521906aba4ef590b0fab39151b"
      }
    },
    {
      "ETag": "\"a3f37dbb365ee9c34a60a695117771d8\"",
      "Size": 4507,
      "StorageClass": "STANDARD",
      "Key": "AWSLogs/336463900088/CloudTrail/ap-south-1/2022/11/27/336463900088_CloudTrail_ap-south-1_20221127T0500Z_JDGrCnhiCAnXixjI.json.gz",
      "VersionId": "null",
      "IsLatest": true,
      "LastModified": "2022-11-27T05:49:31+00:00",
      "Owner": {
        "ID": "361bd2122fc9fc14028f71099415497160d1c4521906aba4ef590b0fab39151b"
      }
    }
  ]
}
```

---

### [`delete-object`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/delete-object.html)

Removes the null version (if there is one) of an object and inserts a delete marker, which becomes the latest version of the object. If there isn’t a null version, Amazon S3 does not remove any objects but will still respond that the command was successful.

**Syntax:**

```s
aws s3api delete-object \
 --bucket [BucketName] \
 --key [ObjectKey] \
 --mfa [DeviceSerialNumber AuthenticationCode] # Required if versioning is configured with MFA enabled \
 --version-id [ObjectVersionId] \ # To delete a specific version
 --request-payer requester # Confirms that the requester knows that they will be charged for the request
```

**Example: Delete an object**

```s
aws s3api delete-object \
 --bucket "aws-cloudtrail-logs-336463900088-7a23c688" \
 --key test.txt
```

**Response:**

```json
{
  "VersionId": "9_gKg5vG56F.TTEUdwkxGpJ3tNDlWlGq",
  "DeleteMarker": true
}
```

---

### [`delete-objects`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/delete-objects.html)

This action enables you to delete multiple objects from a bucket using a single HTTP request. If you know the object keys that you want to delete, then this action provides a suitable alternative to sending individual delete requests, reducing per-request overhead.

The request contains a list of up to 1000 keys that you want to delete.

**Syntax:**

```s
aws s3api delete-objects
 --bucket [BucketName]
 --delete Objects=[{Key=string,VersionId=string},{Key=string,VersionId=string}],Quiet=boolean
 --mfa [DeviceSerialNumber AuthenticationCode] # Required if versioning is configured with MFA enabled
```

**Example: Empty a S3 bucket (delete all objects including those versioned)**

```s
aws s3api delete-objects \
 --bucket "aws-cloudtrail-logs-336463900088-38430ad1" \
 --delete "$(aws s3api list-object-versions \
 --bucket 'aws-cloudtrail-logs-336463900088-38430ad1' \
 --output=json \
 --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"
```

---

### [`delete-bucket`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/delete-bucket.html)

Deletes the S3 bucket. All objects (including all object versions and delete markers) in the bucket must be deleted before the bucket itself can be deleted.

**Syntax:**

```s
aws s3api delete-bucket
 --bucket [BucketName]
```

**Example:**

```s
aws s3api delete-bucket
 --bucket "aws-cloudtrail-logs-336463900088-7a23c688"
```

---

# References

- [S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing)
- [Empty S3 Bucket](https://towardsthecloud.com/aws-cli-empty-s3-bucket)
- [Cross-Account S3 Access](https://aws.amazon.com/premiumsupport/knowledge-center/cross-account-access-s3/)
- [S3 Bucket Owner full Control for Cross Access](https://aws.amazon.com/premiumsupport/knowledge-center/s3-bucket-owner-full-control-acl/)
