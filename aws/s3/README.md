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
  - [Example: Public Access using S3 Bucket Policy](#example-public-access-using-s3-bucket-policy)
  - [Example: IAM User Access to S3 using IAM Policies](#example-iam-user-access-to-s3-using-iam-policies)
  - [Example: EC2 Instance Access using IAM Roles](#example-ec2-instance-access-using-iam-roles)
  - [Example: Cross-Account Access using Bucket Policy](#example-cross-account-access-using-bucket-policy)
  - [S3 Security: Encryption](#s3-security-encryption)
    - [Encryption: Overview](#encryption-overview)
    - [Encryption: Encryption in Transit](#encryption-encryption-in-transit)
    - [Encryption: Implement Server-Side Encryption](#encryption-implement-server-side-encryption)
    - [Encryption: Default Encryption vs Bucket Policies](#encryption-default-encryption-vs-bucket-policies)
  - [S3 Security: CORS](#s3-security-cors)
    - [CORS: Overview](#cors-overview)
    - [CORS: Amazon S3](#cors-amazon-s3)
  - [S3 Security: MFA Delete](#s3-security-mfa-delete)
  - [S3 Security: Other Security Settings](#s3-security-other-security-settings)
    - [Block Public Access](#block-public-access)
  - [S3 Security: Audit Logs](#s3-security-audit-logs)
    - [Audit Logs: Overview](#audit-logs-overview)
    - [Audit Logs: Setup Access Logs](#audit-logs-setup-access-logs)
  - [S3 Security: Pre-Signed URLs](#s3-security-pre-signed-urls)
  - [S3 Security: Access Points](#s3-security-access-points)
  - [S3 Security: Object Lambda](#s3-security-object-lambda)
- [S3: Static Website Hosting](#s3-static-website-hosting)
- [S3: Versioning](#s3-versioning)
- [S3: Replication](#s3-replication)
  - [S3 Replication: Overview](#s3-replication-overview)
  - [S3 Replication: Create Replication Rule](#s3-replication-create-replication-rule)
- [S3: Storage Classes](#s3-storage-classes)
  - [S3 Storage Classes: Overview](#s3-storage-classes-overview)
  - [S3 Storage Classes: Durability & Availability](#s3-storage-classes-durability--availability)
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
- [S3: S3 Select & Glacier Select](#s3-s3-select--glacier-select)
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
  - If uploading more than 5GB, MUST use **`multi-part upload`**. Multi-Part Upload is RECOMMENDED as soon as the file is over 100 MB.
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

---

# S3: Security

## S3 Security: Overview

- **User-Based**

  - **IAM Policies**: Which API calls should be allowed for a specific user from IAM

- **Resource-Based**

  - **Bucket Policies**: Bucket wide rules that can be assigned directly from the S3 Console. Allows cross account access. Most common way to handle Security in S3.
  - **Object Access Control List (ACL)**: Finer grain security (can be disabled)
  - **Bucket Access Control List (ACL)**: Less common use (can be disabled)

- **Encryption**
  - Encrypt objects in Amazon S3 using encryption keys

> **Note**: An IAM Principal can access an S3 object if:
>
> - The user IAM permissions `ALLOW` it **OR** the resource policy `ALLOWS` it
> - **AND** there's no explicity `DENY`

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

- **Use Cases**:
  - Grant public access to the bucket
  - Force objects to be encrypted on Upload
  - Grant access to another account (Cross Account)

---

## Example: Public Access using S3 Bucket Policy

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

## Example: IAM User Access to S3 using IAM Policies

**Use Case**: The user is an IAM user and he wants to access files within our S3 buckets. We need to assign IAM permissions to that specific IAM User, through a policy to allow access to our S3 buckets.

---

## Example: EC2 Instance Access using IAM Roles

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

## Example: Cross-Account Access using Bucket Policy

**Use Case**: We have an IAM User in another AWS Account who we need to give permissions to access our S3 Bucket. We need to create a S3 Bucket Policy that allows Cross-Account Access for that specific IAM user and therefore the IAM user will be able to make API calls into our S3 Buckets

---

## S3 Security: Encryption

### Encryption: Overview

- You can encrypt objects in Amazon S3 using one of 4 Methods

  - **Server-Side Encryption (SSE)**

    1. **Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3)**:

       - Encrypts S3 objects using keys, handled, managed and owned by AWS
       - Object is encrypted server-side
       - Encryption type is AES-256
       - Must set header to `"x-amz-server-side-encryption":"AES-256"`

    2. **Server-Side Encryption with KMS Keys stored in AWS KMS (SSE-KMS)**:

       - Leverage AWS Key Management Service (AWS KMS) to manage encryption keys
       - KMS Advantages:
         - user control, for e.g. control over the rotation policy of the encryption key
         - audit key using CloudTrail
       - Object is encrypted server-side
       - Must set header to `"x-amz-server-side-encryption":"aws:kms"`
       - Limitations:
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

### Encryption: Encryption in Transit

- Encryption in flight is also called SSL/TLS
- Amazon S3 exposes two endpoints:
  - HTTP endpoint: not encrypted
  - HTTPS endpoint: encrypted in flight
- HTTPS is recommended
- HTTPS is mandatory for SSE-C
- Most clients would use the HTTPS endpoint by default

---

### Encryption: Implement Server-Side Encryption

- Go to the S3 Bucket and click the **`Properties`** Tab.
- Scroll down to the **`Encryption`** section.

---

### Encryption: Default Encryption vs Bucket Policies

- One way to force encryption is to use a bucket policy and refuse any API call to PUT an S3 object without encryption headers

  ```json
  {
    "Version": "2012-10-17",
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
- Only the bucket owner (root account) can enable/disable MFA Delete. The root account should have MFA enabled.
- The Amazon CLI must be used to perform a MFA Delete operation as it cannot be done via the Console
- To enable MFA Delete, use the AWS CLI

  ```s
  aws s3api put-bucket-versioning --bucket [ bucket-name ] --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa "[ arn-of-mfa-device ] [ mfa-code ]" --profile [ root-profile ]
  ```

- To disable MFA Delete, use the AWS CLI

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

- Warning:
  - NEVER EVER set your logging bucket to be the same as the bucket you are monitoring or we will end up triggering an infinite loop.

---

### Audit Logs: Setup Access Logs

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

- Each Access Point has its own DNS and own Policy to limit who can access it
  - A specific IAM User / Group
  - One Policy per Access Point => Easier to manage than complex bucket policies

---

## S3 Security: Object Lambda

The idea: You have an S3 Bucket, but you want to modify the object just before it is being retrieved by a caller application. Instead of duplicating buckets to have different versions for each object, we can use S3 Object Lambda instead.

- Use AWS Lambda Functions to change the object before its being retrieved by the caller application
- Only one S3 bucket is needed, on top of which we create S3 Access Point and **S3 Object Lambda Access Points**.
- Use Cases:
  - Redacting personally identifyable information for analytics or non-production environments.
  - Converting data formats, such as converting XML to JSON.
  - Resizing and watermarking images on the fly using caller-specific details, such as the user who requeste the object.

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
- If you suspend versioning, it does not delete the previous version (safe operation)

- Go to your S3 Bucket and click the **`Properties`** tab.
- Scroll down to find the **`Bucket Versioning`** section. Click **`Edit`**.
- Click **`Enable`** to enable the bucket versioning, and click **`Save changes`**.

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

- **High Durability**: 99.999999999% (11 9s) of objects across Multi-AZ
- If you store 10,000,000 objects with Amazon S3, you can on average expect to incur a loss of a single object, once every 10,000 years
- Same for all storage classes

**Availability**: Measures how readily available a service is

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
   - Use Cases:
     - Disaster Recovery
     - Backups

3. **Amazon S3 One Zone-Infrequent Access**

   - High durability (99.999999999%) in a Single-AZ; data lost when AZ destroyed
   - 99.5% Availability (lesser than Standard-Infrequent Access)
   - Use Cases:
     - Storing Secondary backup copies of on-premise data
     - Data you can recreate

4. **Amazon S3 Glacier Instant Retrieval**

   - Low-cost object storage meant for archiving / backup
   - Pricing: Price for storage + object retrieval cost
   - Millisecond retrieval, great for data accessed once a quarter
   - Minimum storage duration is 90 days

5. **Amazon S3 Glacier Flexible Retrieval**

   - Lower-cost object storage meant for archiving / backup
   - Three flexibility tiers:
     - `Expedited`: 1-5 minutes
     - `Standard`: 3-5 hours
     - `Bulk`: 5-12 hours (FREE)
   - Minimum storage duration is 90 days

6. **Amazon S3 Glacier Deep Archive**

   - Meant for Long term storage
   - Lowest cost
   - Two flexibility tiers:
     - `Standard`: 12 hours
     - `Bulk`: 48 hours
   - Minimum storage duration is 180 days

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

- Move objects between storage classes automatically based on Lifecycle Rules
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
- S3 Analytics run on top of the S3 bucket and creates a CSV report that gives recommendations and statistics
- Report is updated daily
- 24 to 48 hours to start seeing data analysis

---

# S3: Event Notifications

## S3 Event Notifications: Overview

You can use the Amazon S3 Event Notifications feature to receive notifications when certain events happen in your S3 bucket.

- E.g. `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, `S3:Replication`
- Object name filtering possible (e.g. `*.jpg`)
- Use case: Generate thumbnails of images uploaded to S3
  - Create an Event Notification
  - Send it to SNS, SQS, a Lambda function or Amazon EventBridge (and send to over 18 AWS services as destinations from EventBridge)
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

- Amazon S3 automatically scales to high request rates, latency 100-200 ms
- Your application can achieve at least **3,500** `PUT` / `COPY` / `POST` / `DELETE` requests and **5,500** `GET` / `HEAD` requests per seconds per prefix in a bucket.
- There is no limits to the number of prefixes per bucket.
- Example: (object path => prefix)
  - `bucket/folder1/sub1/file` => `/folder/sub1/`
  - `bucket/folder1/sub2/file` => `/folder/sub2/`
  - `bucket/1/file` => `/1/`
  - `bucket/2/file` => `/2/`
- If you spread your READs across all four prefixes evenly, you can achieve **22,000** requests per second for GET and HEAD requests.

- **Multi-Part upload**:

  - Recommended for files > 100MB
  - Must use for files > 5GB
  - Parallelizes uploads (speed up transfers). A big file is broken down into chunks and uploaded to Amazon S3. Amazon S3 then stitches up these chunks into a single file after uploads are completed.

- **S3 Transfer Acceleration**:

  - Increase transfer speed by transferring file to an AWS edge location which will forward the data to the S3 bucket in the target region.
    - E.g. A File in USA needs to be uploaded to a S3 bucket in Australia
    - The File is uploaded through an edge location in USA over the public internet
    - The Edge location transfers the file from the edge location to the S3 bucket in Australia over private AWS network
    - The idea is to minimize the public network the file has to be transferred through and maximize the fast private network the file is transferred through
  - Compatible with multi-part upload

- **S3 Byte-Range Fetches**:

  - Parallelizes GETs by requesting specific byte ranges
  - Better resilience in case of failures:
    - In case there is a failure to get a specific byte range, then you can retry a smaller byte range
  - Can be used to speed up downloads
  - A large file can be downloaded in chunks (byte ranges) that are downloaded in parallel
  - Can be used to retrieve only a partial data (for example: the head of a file)
    - Byte-range request for header (first xx bytes)

---

# S3: S3 Select & Glacier Select

- Retrieve less data using SQL by performing server-side filtering
- Can filter by rows and columns (simple SQL filtering)
- Less network transfer; less CPU cost client-side

---

# References

- [S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing)
