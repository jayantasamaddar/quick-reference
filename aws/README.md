# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction to AWS](#introduction-to-aws)
  - [What is AWS](#what-is-aws)
  - [AWS Cloud: A Brief History](#aws-cloud-a-brief-history)
  - [AWS Cloud: Use Cases](#aws-cloud-use-cases)
  - [AWS Cloud: Global Infrastructure](#aws-cloud-global-infrastructure)
    - [Regions and Availability Zones (AZs)](#regions-and-availability-zones-azs)
    - [Choosing an AWS Region](#choosing-an-aws-region)
  - [AWS Console: Tour](#aws-console-tour)
- [IAM - Identity and Access Management](#iam---identity-and-access-management)
  - [IAM: Users and Groups](#iam-users-and-groups)
  - [IAM: Permissions](#iam-permissions)
  - [IAM: Policies](#iam-policies)
    - [Overview: Inheritance](#overview-inheritance)
    - [Overview: Structure](#overview-structure)
  - [IAM: Roles](#iam-roles)
- [AWS CLI](#aws-cli)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Default Configuration](#default-configuration)
    - [Profiles](#profiles)
    - [Retrieving Configuration](#retrieving-configuration)
    - [Updating Configuration](#updating-configuration)
    - [Other Configuration Commands](#other-configuration-commands)
    - [Other Configuration Settings](#other-configuration-settings)
- [AWS SDK](#aws-sdk)
  - [Modular Packages for JavaScript](#modular-packages-for-javascript)

# Introduction to AWS

## What is AWS

**AWS** (Amazon Web Services) is a Cloud Provider that providers you with servers and services that you can use on demand and scale easily. This allows companies to run websites and applications that serve millions of users with only a handful engineers.

---

## AWS Cloud: A Brief History

- **2002**: AWS was launched by Amazon.com internally in 2002 but they realised their IT Departments could be externalized. The Amazon infrastructure was one of the company's core strengths and they thought, "Maybe we could do IT for others and offer this as a service".
- **2004**: The first AWS public offering was SQS in 2004.
- **2006**: In 2006, they expanded their offering and they relaunched with the availability of SQS, S3 and EC2.
- **2007**: Launched in Europe. Today many companies like Dropbox, Netflix, Airbnb, NASA use AWS.

---

## AWS Cloud: Use Cases

AWS enables you to build sophisticated applications easily applicable to a diverse set of industries.
Use cases involve:

- Enterprise IT
- Backup and Storage
- Big Data Analysis
- Website Hosting
- Mobile and Social Apps
- Gaming

---

## AWS Cloud: Global Infrastructure

### Regions and Availability Zones (AZs)

AWS is a Global service. There are:

- **Regions**: Each Region is a separate geographic area.

  - North America,
  - South America,
  - Europe,
  - Middle East,
  - Asia,
  - Africa,
  - Asia Pacific,
  - Australia

  E.g. In the **Asia-Pacific** continent we have the following sub-geographical areas,

  - Singapore - `ap-southeast-1`
  - Tokyo - `ap-northeast-1`
  - Seoul - `ap-northeast-2`
  - Mumbai - `ap-south-1`
  - Hong Kong - `ap-east-1`
  - Osaka - `ap-northeast-3`
  - Jakarta - `ap-southeast-3`
  - Beijing
  - Ningxia
  - Sydney - `ap-southeast-2`

  Together, they are referred as a region: **`Asia Pacific (Mumbai) Region`**. Each Region is a cluster of Data Centers spread across **Availability Zones (AZs)**.

- **Availability Zones (AZs)**: AZs are multiple, isolated locations within each Region. For example the **`Asia Pacific (Mumbai) Region`** has 3 Availability Zones:

  - `ap-south-1a`
  - `ap-south-1b`
  - `ap-south-1c`

- **Data Centers**: Each Availability Zone is one or more discrete data centers with redundant power, networking and connectivity. AWS doesn't really tell us how many data centers are there within each Availability Zone. These Data Centers in each Avaiability Zone are designed to be separate from each other, so that they are isolated from disasters to avoid cascading effects.

  So if anything happens to Data Center(s) in `ap-south-1a` we know that it is designed not to cascade to `ap-south-1b` or `ap-south-1c`.

  These Data Centers in the Availability Zones are connected with high bandwidth, ultra-low latency networking and all together linked, will form a Region.

- **Edge Locations / Points of Presence**: The AWS Points of Presence are designed to deliver content to end users with lowest latency possible. Amazon CloudFront uses a global network of 410+ Points of Presence (400+ Edge locations and 13 regional mid-tier caches) in 90+ cities across 48 countries. Edge locations are mini data centers.

---

### Choosing an AWS Region

When we use AWS services, most services would be linked or scoped to a specific region. That means that if we use a service in one region and we try to use it in another region, it will be a new time of using the service. So where should we launch a service? Let's look at some factors to look at when deciding this:

- **Compliance**: Sometimes Governments want the data of their citizens to be local to the country.
- **Latency**: Proximity to customers reduce latency.
- **Availability of Services** - Not all regions have all services.
- **Pricing** - Pricing varies from region-to-region.

---

## AWS Console: Tour

AWS has Global services, such as:

- **IAM** (Identity and Access Management)
- **Route 53** (DNS Service)
- **Cloudfront** (Content Delivery Network)
- **WAF** (Web Application Firewall)

Most AWS Services are Region Scoped, such as:

- **Amazon EC2** (Infrastructure-as-a-Service)
- **AWS Elasic Beanstalk** (Platform-as-a-Service)
- **Lambda** (Function-as-a-Service)
- **Rekognition** (Software-as-a-Service)

To view if a service is available in a region, [Visit the Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)

---

# IAM - Identity and Access Management

## IAM: Users and Groups

We will start our first deep dive into an AWS service with IAM. IAM stands for Identity and Access Management. It is a Global service because this is where we create our **Users** and assign them to **Groups**.

- **Root Account**: The Root Account is created by default and shouldn't be used or shared. Instead an IAM User should be created and used from hence.
- **Users**: Users are people in your Organization and can be grouped together. Users can also exist without being grouped although that is not considered as a Best Practice.
- **Groups**: Groups are a way to categorize Users. Groups can contain Users and not other Groups. Users can also exist in Multiple Groups. For Example:

  If `User: Charles` belongs to the `Group: Developers` and `User: David` belongs to the `Group: Operations`, we may create a third group `Group: Audit Team` and have both Users, Charles and David in it.

---

## IAM: Permissions

So why create Users and Groups? That is because we want to let Users use our AWS Accounts and to allow them to do so, we have to give them permissions. Users and Groups can be assigned a JSON Document called Policies. It looks just like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "elasticloadbalancing:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:ListMetrics",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:Describe"
      ],
      "Resource": "*"
    }
  ]
}
```

In AWS, to prevent new Users from launching multiple services mistakenly and mistakenly increasing the organization's bill, we have to use Permissions. To do so, we apply a principle called **The Least Privilege Principle**: Don't give more permissions than what a User needs.

---

## IAM: Policies

### Overview: Inheritance

- A Policy attached to a Group gets inherited by every single member of the Group.
- An Inline Policy is a Policy attached to the User at an User level.
- Users belonging to Multiple Groups inherit the Union of the permissions for all the policies of the Groups they belong to.

### Overview: Structure

```json
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permissions",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["arn:aws:iam::123456789012:root"]
      },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3::mybucket/*"]
    }
  ]
}
```

- **`Version`**: Policy Language Version. E.g. `2012-10-17` (Required)
- **`Id`**: An unique identifier for the Policy. (Optional)
- **`Statement`**: One or more individual Statements. (Required)
  - **`Sid`**: Statement ID. (Optional)
  - **`Effect`**: Whether the statement allows or denies access. (`Allow`, `Deny`)
  - **`Principal`**: Which `Account`/`User`/`Role`, this policy will be applied to.
  - **`Action`**: List of actions the policy allows or denies. (Required)
  - **`Resource`**: List of resources to which the actions will be applied to. (Required)
  - **`Condition`**: Conditions when the policy is in effect. (Optional)

---

## IAM: Roles

You can use roles to delegate access to users, applications, or services that don't normally have access to your AWS resources. An IAM role is similar to an IAM user, in that it is an AWS identity with permission policies that determine what the identity can and cannot do in AWS. However, instead of being uniquely associated with a physical person, a role is intended to be assumable by anyone (including an AWS service) who needs it. Also, a role does not have standard long-term credentials such as a password or access keys associated with it. Instead, when you assume a role, it provides you with temporary security credentials for your role session.

**Example:**

- You might want to grant users in your AWS account access to resources they don't usually have, or
- Grant users in one AWS account access to resources in another account.
- Or you might want to allow a mobile app to use AWS resources, but not want to embed AWS keys within the app (where they can be difficult to rotate and where users can potentially extract them).
- Sometimes you want to give AWS access to users who already have identities defined outside of AWS, such as in your corporate directory.
- Or, you might want to grant access to your account to third parties so that they can perform an audit on your resources.
- An AWS Service like EC2 to temporarily access SES for example.

For these scenarios, you can delegate access to AWS resources using an IAM role.

---

# AWS CLI

## Installation

**Install the AWS CLI (For Linux):**

```s
# Run the Following Commands
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**Check the AWS CLI Version:**

```s
aws --version
# Returns: aws-cli/2.8.9 Python/3.9.11 Linux/5.15.0-52-generic exe/x86_64.ubuntu.20 prompt/off
```

[Check other Installation Setups](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

---

## Configuration

### Default Configuration

Before the AWS CLI can be used to run queries on any service, we need to configure a default pair of Access Key Id and Secret. This is the primary access point for making queries to AWS via the AWS CLI.

**Create default credentials:**

```s
aws configure

# AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name [None]: ap-south-1
# Default output format [None]: json
```

**Check `.aws` folder for two files: `credentials` and `config`**

```s
cat ~/.aws/credentials

# [default]
# aws_access_key_id = AKIAIOSFODNN7EXAMPLE
# aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

```s
cat ~/.aws/config

# [default]
# region = ap-south-1
# output = json
```

The AWS CLI stores sensitive credential information that you specify with aws configure in a local file named `credentials`, in a folder named `.aws` in your home directory.

---

### Profiles

A collection of settings is called a profile. By default, the AWS CLI uses the **`default`** profile. You can notice this in the `credentials` and `config` files in the folder named `.aws` in the your home directory.

You can create and use additional named profiles with varying credentials and settings by specifying the `--profile` option and assigning a name.

The following example creates a profile named `s3admin`.

```s
aws configure --profile s3admin

# AWS Access Key ID [None]: AKIAI44QH8DHBEXAMPLE
# AWS Secret Access Key [None]: je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
# Default region name [None]: us-east-1
# Default output format [None]: text
```

You can then specify a `--profile [ profilename ]` and use the credentials and settings stored under that name.

```s
aws s3 ls --profile s3admin
```

Viewing the `credentials` and `config` files now show:

```s
cat ~/.aws/credentials

# [default]
# aws_access_key_id=AKIAIOSFODNN7EXAMPLE
# aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# [s3admin]
# aws_access_key_id=AKIAI44QH8DHBEXAMPLE
# aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

```s
cat ~/.aws/config

# [default]
# region=ap-south-`
# output=json

# [s3admin]
# region=us-east-1
# output=text
```

---

### Retrieving Configuration

We can use the `aws configure get [ setting ]` syntax to retrieve a particular setting.

```s
# Gets the `aws_access_key_id` from the `default` profile
aws configure get aws_access_key_id

# Gets the `aws_secret_access_key` from the `default` profile
aws configure get aws_secret_access_key

# Gets the `region` from the profile named `s3admin`.
aws configure get region --profile s3admin

# Gets the `output` from the profile named `s3admin`.
aws configure get output --profile s3admin
```

---

### Updating Configuration

We can update the settings in two ways:

1. **Overwrite**: To update these settings, run `aws configure` again (with or without the `--profile` parameter, depending on which profile you want to update) and enter new values as appropriate.

2. **Using a Setter**: We can use `aws configure set [ setting ]` (with or without the `--profile [ profilename ]` parameter, depending on which profile you want to update) to only set a specific field. This overwrites only that particular field and leaves other fields as it is.

   ```s
   # Sets the `aws_access_key_id` in the `default` profile
   aws configure set aws_access_key_id AKIAI44QH8DHBEXAMPLE

   # Sets the `aws_secret_access_key` in the `default` profile
   aws configure set aws_secret_access_key je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY

   # Sets the `region` in the profile named `s3admin`.
   aws configure set region us-west-2 --profile s3admin

   # Sets the `output` in the profile named `s3admin`.
   aws configure set output table --profile s3admin
   ```

---

### Other Configuration Commands

| Command                       | Function                                                  |
| ----------------------------- | --------------------------------------------------------- |
| `aws configure list-profiles` | List all your profile names                               |
| `aws configure list`          | List all profile data                                     |
| `aws configure import`        | Import CSV credentials generated from the AWS web console |

---

### Other Configuration Settings

The following settings are supported in the `config` file. The values listed in the specified (or default) profile are used unless they are overridden by the presence of an environment variable with the same name, or a command line option with the same name. For more information on what order settings take precendence, see [Configuration settings and precedence](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-precedence)

- [Global Settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-global)
- [S3 Custom Command Settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-s3)

---

# AWS SDK

## [Modular Packages for JavaScript](https://aws.amazon.com/blogs/developer/modular-packages-in-aws-sdk-for-javascript/)

In v3 of AWS SDK for JavaScript, modularity was introduced by breaking the JavaScript SDK core into multiple packages and publishing each service as its own package. These packages are published under `@aws-sdk/` scope on NPM to make it easy to identify packages that are part of the official AWS SDK for JavaScript.

---
