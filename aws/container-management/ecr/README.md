# Table of Contents

- [Table of Contents](#table-of-contents)
- [ECR: Overview](#ecr-overview)
- [ECR: Create a Repository from the Console](#ecr-create-a-repository-from-the-console)
- [ECR: Using AWS CLI](#ecr-using-aws-cli)
  - [`ecr`](#ecr)
    - [`create-repository`](#create-repository)
    - [`get-login-password`](#get-login-password)
    - [`describe-repositories`](#describe-repositories)
    - [`delete-repository`](#delete-repository)
  - [`ecr-public`](#ecr-public)
    - [`create-repository`](#create-repository-1)
    - [`get-login-password`](#get-login-password-1)
  - [Docker `push`](#docker-push)

---

# ECR: Overview

Amazon ECR stands for Amazon Elastic Container Registry.

- Used to store and manage Docker images on AWS.
- Private and Public repository ([Amazon ECR Public Gallery](https://gallery.ecr.aws))
- Fully integrated with ECS, backed by Amazon S3.
- So your ECR repository may contain different Docker images and then for example, an EC2 Instance on your ECS Cluster may want to pull these images.

- To make this possible:
  - Assign an IAM Role to our EC2 Instance that allows us to pull Docker images.
- Access to ECR is controlled through IAM (permissions errors refer to policy issues)
- Apart from being a repository for images, it also supports Image Vulnerability Scanning, Versioning, Image Tags, Image Lifecycle.

---

# ECR: Create a Repository from the Console

A repository is where you store your Docker or Open Container Initiative (OCI) images in Amazon ECR. Each time you push or pull an image from Amazon ECR, you specify the repository and the registry location which informs where to push the image to or where to pull it from.

- Go to [Repositories](https://ap-south-1.console.aws.amazon.com/ecr/repositories?region=ap-south-1) from the Amazon ECR Console.
- Click the `Create repository` button.
- Enter the following configurations:

  1. **General Settings**:

     - **Visibility settings**: Choose the visibility setting for the repository. Once a repository is created, the visibility setting of the repository can't be changed.

       - **Private**: Access is managed by IAM and repository policy permissions.
       - **Public**: Publicly visible and accessible for image pulls.

     - **Repository name**: Provide a concise name. A developer should be able to identify the repository contents by the name. 2 characters minimum. The name must start with a letter and can only contain lowercase letters, numbers, hyphens, underscores, periods and forward slashes.

     - **Tag immutability**: Enable tag immutability to prevent image tags from being overwritten by subsequent image pushes using the same tag. Disable tag immutability to allow image tags to be overwritten. Default: `Mutable`

  2. **Image scan settings**: Deprecation warning: ScanOnPush configuration at the repository level is deprecated in favor of registry level scan filters. For more information, see [Image scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html).

     - **Scan on push**: Enable scan on push to have each image automatically scanned after being pushed to a repository. If disabled, each image scan must be manually started to get scan results. Default: `False`

  3. **Encryption settings**: The KMS encryption settings cannot be changed or disabled after the repository is created.

     - **KMS encryption**: You can use AWS Key Management Service (KMS) to encrypt images stored in this repository, instead of using the default encryption settings. Default: `Disabled`

- Click `Create repository` to create a repository.

> **Note**: Images need to be pushed into the repository using the **[Push commands](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)**

---

# ECR: Using AWS CLI

ECR has two APIs:

1. `ecr`: For private repositories
2. `ecr-public`: For public repositories

---

## `ecr`

### [`create-repository`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/create-repository.html)

**Syntax:**

```s
aws ecr create-repository \
  --registry-id [RegistryAccountID] \
  --repository-name [RepositoryName] \
  --tags [Key=string,Value=string ...] \
  --image-tag-mutability ["MUTABLE"|"IMMUTABLE"] \
  --image-scanning-configuration scanOnPush=[true|false] \
  --encryption-configuration encryptionType=["KMS"|"AES256"],kmsKey=[KMSKey]
```

**Example:**

```s
aws ecr create-repository --repository-name "demorepo"
```

**Response:**

```json
{
  "repository": {
    "repositoryArn": "arn:aws:ecr:ap-south-1:336463900088:repository/demorepo",
    "registryId": "336463900088",
    "repositoryName": "demorepo",
    "repositoryUri": "336463900088.dkr.ecr.ap-south-1.amazonaws.com/demorepo",
    "createdAt": "2022-12-02T01:27:00+05:30",
    "imageTagMutability": "MUTABLE",
    "imageScanningConfiguration": {
      "scanOnPush": false
    },
    "encryptionConfiguration": {
      "encryptionType": "AES256"
    }
  }
}
```

---

### [`get-login-password`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/get-login-password.html)

**To log in to an Amazon ECR registry**

Retrieves and displays an authentication token using the **`GetAuthorizationToken`** API that you can use to authenticate to an Amazon ECR public registry. You can pass the authorization token to the login command of the container client of your preference, such as the Docker CLI. After you have authenticated to an Amazon ECR public registry with this command, you can use the client to push and pull images from that registry as long as your IAM principal has access to do so until the token expires. The authorization token is valid for 12 hours.

**Syntax:**

```s
# Returns a Password
aws ecr get-login-password

# Pipe Password into a docker login command to the ECR registry
aws ecr get-login-password \
  --region [region] \
  | docker login \
        --username AWS \
        --password-stdin [aws_account_id].dkr.ecr.[region].amazonaws.com
```

**Example:**

```s
aws ecr get-login-password \
  --region "ap-south-1" \
  | docker login \
        --username AWS \
        --password-stdin "336463900088.dkr.ecr.ap-south-1.amazonaws.com"
```

**Response:**

```s
WARNING! Your password will be stored unencrypted in /home/username/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store
```

---

### [`describe-repositories`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/describe-repositories.html)

Describes image repositories in a registry.

`describe-repositories` is a paginated operation. Multiple API calls may be issued in order to retrieve the entire data set of results. You can disable pagination by providing the `--no-paginate` argument. When using `--output` text and the` --query` argument on a paginated response, the `--query` argument must extract data from the results of the following query expressions: `repositories`

**Syntax:**

```s
aws ecr describe-repositories \
  --registry-id [RegistryAccountID] \
  --repository-names ["Repo1" "Repo2" ...] \
  --output ["json"|"text"|"yaml"|"yaml-stream"|"table"] \
  --query [JMESPathQuery]
```

**Example:**

```s
aws ecr describe-repositories
```

**Response:**

```json
{
  "repositories": [
    {
      "repositoryArn": "arn:aws:ecr:ap-south-1:336463900088:repository/demorepo",
      "registryId": "336463900088",
      "repositoryName": "demorepo",
      "repositoryUri": "336463900088.dkr.ecr.ap-south-1.amazonaws.com/demorepo",
      "createdAt": "2022-12-02T02:00:43+05:30",
      "imageTagMutability": "MUTABLE",
      "imageScanningConfiguration": {
        "scanOnPush": false
      },
      "encryptionConfiguration": {
        "encryptionType": "AES256"
      }
    },
    {
      "repositoryArn": "arn:aws:ecr:ap-south-1:336463900088:repository/demorepo2",
      "registryId": "336463900088",
      "repositoryName": "demorepo2",
      "repositoryUri": "336463900088.dkr.ecr.ap-south-1.amazonaws.com/demorepo2",
      "createdAt": "2022-12-02T02:01:52+05:30",
      "imageTagMutability": "IMMUTABLE",
      "imageScanningConfiguration": {
        "scanOnPush": false
      },
      "encryptionConfiguration": {
        "encryptionType": "AES256"
      }
    }
  ]
}
```

---

### [`delete-repository`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/delete-repository.html)

Deletes a repository. If the repository contains images, you must either delete all images in the repository or use the `--force` option to delete the repository.

**Syntax:**

```s
aws ecr delete-repository --repository-name [RepositoryName] --registry-id [RegistryAccountID] --force
```

**Example:**

```s
aws ecr delete-repository --repository-name "demorepo"
```

**Response:**

```json
{
  "repository": {
    "repositoryArn": "arn:aws:ecr:ap-south-1:336463900088:repository/demorepo",
    "registryId": "336463900088",
    "repositoryName": "demorepo",
    "repositoryUri": "336463900088.dkr.ecr.ap-south-1.amazonaws.com/demorepo",
    "createdAt": "2022-12-02T01:27:00+05:30",
    "imageTagMutability": "MUTABLE"
  }
}
```

---

## `ecr-public`

### [`create-repository`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr-public/create-repository.html)

Creates a repository in a public registry.

**Syntax:**

```s
aws ecr-public \
 --repository-name [RepositoryName] \
 --catalog-data description=[Description],architectures=["Linux"|"Windows"|"OtherTags",string],operatingSystems=["ARM"|"ARM64"|"x86"|"x86-64"|"Others",string],logoImageBlob=[Base64EncodedLogo],aboutText=[MarkdownDetailedDescription],usageText=[MarkdownSupportText] \
 --tags [Key=string,Value=string ...]
```

**Example:**

```s
aws ecr-public --repository-name "demorepo"
```

---

### [`get-login-password`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr-public/get-login-password.html)

**To log in to an Amazon ECR public registry**

Retrieves and displays an authentication token using the **`GetAuthorizationToken`** API that you can use to authenticate to an Amazon ECR public registry. You can pass the authorization token to the login command of the container client of your preference, such as the Docker CLI. After you have authenticated to an Amazon ECR public registry with this command, you can use the client to push and pull images from that registry as long as your IAM principal has access to do so until the token expires. The authorization token is valid for 12 hours.

This command requires the `ecr-public:GetAuthorizationToken` and `sts:GetServiceBearerToken` permissions.

---

## Docker `push`

```s
docker push [aws_account_id].dkr.ecr.[region].amazonaws.com/[container]:[tag]
```

---
