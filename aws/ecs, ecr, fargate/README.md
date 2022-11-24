# Table of Contents

- [Table of Contents](#table-of-contents)
- [Docker Containers Management on AWS](#docker-containers-management-on-aws)
- [Amazon ECS](#amazon-ecs)
  - [ECS: EC2 Launch Type](#ecs-ec2-launch-type)
  - [ECS: Fargate Launch Type](#ecs-fargate-launch-type)
  - [ECS: IAM Roles for ECS Tasks](#ecs-iam-roles-for-ecs-tasks)
  - [ECS: Load Balancer Integrations](#ecs-load-balancer-integrations)
  - [ECS: Data Persistence](#ecs-data-persistence)
    - [ECS: Data Volumes (EFS)](#ecs-data-volumes-efs)
  - [ECS: Create an ECS Cluster](#ecs-create-an-ecs-cluster)
  - [ECS: Create an ECS Service](#ecs-create-an-ecs-service)
    - [ECS: Steps to Create an ECS Service](#ecs-steps-to-create-an-ecs-service)
    - [ECS: Task Definition](#ecs-task-definition)
      - [ECS Task Definition: Overview](#ecs-task-definition-overview)
      - [ECS Task Definition: Task Roles](#ecs-task-definition-task-roles)
      - [ECS Task Definition: Environment Variables](#ecs-task-definition-environment-variables)
      - [ECS Task Definition: Data Volumes (Bind Mounts)](#ecs-task-definition-data-volumes-bind-mounts)
      - [ECS Task Definition: Create a Task Definition](#ecs-task-definition-create-a-task-definition)
    - [Deploy a Service](#deploy-a-service)
  - [ECS: Service Auto Scaling](#ecs-service-auto-scaling)
    - [ECS Service Auto Scaling: Overview](#ecs-service-auto-scaling-overview)
    - [ECS Service Auto Scaling: EC2 Launch Type](#ecs-service-auto-scaling-ec2-launch-type)
  - [ECS: Rolling Updates](#ecs-rolling-updates)
  - [ECS: Solutions Architecture](#ecs-solutions-architecture)
    - [ECS Tasks Invoked by EventBridge](#ecs-tasks-invoked-by-eventbridge)
  - [ECS: Task Placements](#ecs-task-placements)
    - [ECS Task Placements: Overview](#ecs-task-placements-overview)
    - [ECS Task Placements: Task Placement Strategies](#ecs-task-placements-task-placement-strategies)
    - [ECS Task Placements: Task Placement Constraints](#ecs-task-placements-task-placement-constraints)
- [Amazon ECR](#amazon-ecr)
  - [ECR: Overview](#ecr-overview)
  - [ECR: Using AWS CLI](#ecr-using-aws-cli)
  - [ECR: Create a Repository from the Console](#ecr-create-a-repository-from-the-console)
  - [Amazon EKS](#amazon-eks)
- [References](#references)

---

# Docker Containers Management on AWS

- **Amazon Elastic Container Service (Amazon ECS)**

  - Amazon's own container platform

- **Amazon Elastic Kubernetes Service (Amazon EKS)**

  - Amazon's managed Kubernetes (open source)

- **AWS Fargate**

  - Amazon's own Serverless container platform
  - Works with ECS and EKS

- **Amazon Elastic Container Registry (Amazon ECR)**
  - Amazon's own container image registry used to store container images

---

# Amazon ECS

## ECS: EC2 Launch Type

Amazon ECS refers to Elastic Container Service which is Amazon's own container platform.

- When we launch Docker containers on AWS, we launch ECS Tasks on ECS Clusters.

  - **ECS Cluster**: An Amazon ECS cluster groups together tasks, and services, and allows for shared capacity and common configurations. All of your tasks, services, and capacity must belong to a cluster.

- EC2 Launch Type: You must provision and maintain the infrastructure (the EC2 instances)
- These EC2 Instances are special: they must run the ECS Agent to register in the ECS Cluster
- AWS takes care of starting / stopping containers
- **Note**: Security Groups do not matter when an EC2 instance registers with the ECS service. By default, Security Groups allow all outbound traffic.

---

## ECS: Fargate Launch Type

- Launch containers on AWS
- You do not provision the infrastructure (no EC2 Instances to manage)
- It's serverless!
- You just create task definitions to define our ECS Tasks
- AWS just runs ECS Tasks for you based on the CPU / RAM you need
- To scale, just increase the number of tasks. Simple - no more EC2 instances

---

## ECS: IAM Roles for ECS Tasks

Let's take an example of an EC2 Instance running the ECS Agent on Docker

- Create an EC2 Instance Profile (only valid if you use EC2 Launch Type)

  - Used by the ECS Agent only to:
    - Make API calls to the ECS service
    - Make API calls to CloudWatch logs to send container logs
    - Pull Docker images from ECR
    - Reference sensitive data in Secrets Manager or the SSM Parameter Store

- ECS Task Role (valid for EC2 Launch Type and Fargate Launch Type):
  - Allow each task to have a specific role
  - Why have different roles? Use different roles for the different ECS Services you run, for e.g.
    - ECS Task A => Role A => S3
    - ECS Task B => Role B => DynamoDB
  - Task Role is defined in the task definition of your ECS Service

---

## ECS: Load Balancer Integrations

- **Application Load Balancer** is supported and works for most use cases
- **Network Load Balancer** is recommended only for very high throughput / high performance use cases, or to pair it with AWS Private Link
- **Classic Load Balancer** supported but not recommended (no advanced features - no Fargate)

---

## ECS: Data Persistence

### ECS: Data Volumes (EFS)

We need Data Volumes to persist data. There are different kinds, but one of them is EFS (Elastic File System).

- Mount EFS File Systems onto ECS Tasks
- It is a Network File System, and thus it can be mounted to both EC2 and Fargate launch types
- Tasks running in any AZ linked to this Amazon EFS will share the same data and therefore can communicate with one another via the file system, if they wanted to
- The ultimate serverless combo is to use Fargate to launch ECS Tasks + EFS for file system persistence
- Use Case:
  - Persistent Multi-AZ shared storage for your containers
- **Note**: Amazon S3 cannot be mounted as a File System on your ECS Tasks

---

## ECS: Create an ECS Cluster

- Go to the **[Clusters page on the ECS Console](https://ap-south-1.console.aws.amazon.com/ecs/v2/clusters?region=ap-south-1)**
- Click the **`Create cluster`** button
- Enter the following configuration:

  1. **Cluster configuration**:

  - **Cluster name**: There can be a maximum of 255 characters. The valid characters are letters (uppercase and lowercase), numbers, hyphens, and underscores.

  2. **Networking**: By default tasks and services run in the default subnets for your default VPC. To use the non-default VPC, specify the VPC and subnets.

  - **VPC**: Use a VPC with public and private subnets. By default, VPCs are created for your AWS account. To create a new VPC, go to the **[VPC Console](https://console.aws.amazon.com/vpc/home?region=ap-south-1)**

  3. **Infrastructure**: Your cluster is automatically configured for AWS Fargate (serverless) with two capacity providers. Add Amazon EC2 instances, or external instances using ECS Anywhere.

     - **AWS Fargate (serverless)**: Pay as you go. Use if you have tiny, batch, or burst workloads or for zero maintenance overhead. The cluster has Fargate and Fargate Spot capacity providers by default. (DEFAULT)

     - **Amazon EC2 instances**: Manual configurations. Use for large workloads with consistent resource demands. If selected, shows the following configuration options:

       - **Auto Scaling Group (ASG)**: Use Auto Scaling groups to scale the Amazon EC2 instances in the cluster. We would need to `Create a new ASG`.
       - **Operating system/Architecture**: Choose the Windows operating system or Linux architecture for your instance.
       - **EC2 instance type**: Choose based on the workloads you plan to run on this cluster.
       - **Desired capacity**: Specify the number of instances to launch in your cluster.
         - **Minimum**: 0 to < = Maximum
         - **Maximum**: Maximum number of instances
       - SSH Key pair: Create a key pair in the EC2 console, consisting of a private key and a public key, that you use to prove your identity when connecting to an instance.

       When using the Amazon EC2 Instances and ASG, whenever an EC2 Instance is created via the ASG, it will register itself into the Cluster and will be found under `Container instances`

     - **External instances using ECS Anywhere**: Manual configurations. Use to add data center compute.

  4. **Monitoring (optional)**: Container Insights is off by default. When you use Container Insights, there is a cost associated with it.

     - **Use Container Insights**: CloudWatch automatically collects metrics for many resources, such as CPU, memory, disk, and network. Container Insights also provides diagnostic information, such as container restart failures, that you use to isolate issues and resolve them quickly. You can also set CloudWatch alarms on metrics that Container Insights collects. (DEFAULT: `OFF`)

  5. **Tags (optional)**: Tags help you to identify and organize your clusters.

- Click **`Create`** to create a Cluster

---

## ECS: Create an ECS Service

### ECS: Steps to Create an ECS Service

Steps to Create an ECS Service:

1. Create a Task Definition
2. Run the Task Definition in a Service behind a Load Balancer
   - Thus we need to create two security groups:
     - Security Group for the Application Load Balancer accepting traffic on Port 80
     - Security Group for the EC2 Instances allowing the ALB's Security Group to only accept All TCP traffic from the ALB
3. Deploy a Service on the ECS Cluster

---

### ECS: Task Definition

#### ECS Task Definition: Overview

- Task Definitions are metadata in JSON form to tell ECS how to run a Docker container
- It contains crucial information, such as:
  - Image Name
  - Port binding for the container and Host (if on EC2)
  - Memory and CPU required
  - Environment variables
  - IAM Role attached to the task definition
  - Logging configurations (e.g. CloudWatch)
- Can define upto 10 containers in a Task Definition

- On EC2 Launch Type:

  - We get a `Dynamic Host Port Mapping` if you define only the Container Port in the Task definition.
  - The **ALB** (does not work on other ELB) finds the right port on the EC2 Instance thanks to the `Dynamic Host Port Mapping` feature even if the host port maybe dynamic and different on multiple Tasks
  - You must allow on the EC2 Instance's Security Group any port from the ALB Security Group

- On Fargate Launch Type:

  - Each type has an unique private IP through an ENI
  - Only have to define the container port (serverless)
  - ECS ANI Security Group: Allow port 80/443 from the ALB
  - ALB Security Group: Allow port 80/443 from the web

---

#### ECS Task Definition: Task Roles

ECS Task Role is the IAM Role used by the ECS task itself. Use when your container wants to call other AWS services like S3, SQS, etc.

- IAM Roles are assigned per Task Definition (one role per task definition)
- This will allow you for example: ECS Tasks out of your Task definition to access an Amazon Service
- When an ECS task is created from this Task definition, the ECS Task will automatically assume and inherit this ECS Task role
- **Note**: The Role is defined at the Task definition level and not the service level

---

#### ECS Task Definition: Environment Variables

- Environment Variables can be referenced from within the ECS Task Definition:
  - **Hardcoded**: e.g. fixed non-secret URLs
  - **SSM Parameter Store**: Sensitive variables (e.g. API keys, shared configs)
  - **Secrets Manager**: Sensitive variables (e.g. DB passwords)
- Will be fetched and resolved at runtime and injected as environment variables by any tasks launched out of the Task definition
- Environment Files - For bulk environment variables, an environment file can also be uploaded to an Amazon S3 bucket and referenced

---

#### ECS Task Definition: Data Volumes (Bind Mounts)

An ECS Task can contain one container but you can also define multiple containers in the same task definition. Sometimes, your side containers (often called `sidecar`) can help you with logging, tracing, metrics and so on. But sometimes, for e.g. for logging or metrics these containers need to share some files together. Therefore we must mount a data volume onto both containers and then they will be able to share data.

- Share data between multiple containers in the same Task definition
- Works for both ECS and Fargate Tasks

  - **EC2 Tasks**: The bind mount is the EC2 root volume. Data is tied to the lifecycle of the EC2 instance
  - **Fargate Tasks**: Using ephemeral storage. Data is tied to the container(s) using them.
    - 20 GiB - 200 GiB (default 20 GiB) of shared storage

- Use Cases:
  - Share ephemeral data between multiple containers
  - **`Sidecar`** container pattern, where the `sidecar` container used to send metrics/logs to other destinations (separation of concerns) and it needs to read from a shared storage.

---

#### ECS Task Definition: Create a Task Definition

- Go to **[Task definitions on the ECS Console](https://ap-south-1.console.aws.amazon.com/ecs/v2/task-definitions?region=ap-south-1)**
- Click the **`Create new task definition`** button
- Enter the following configuration:

  1. **Task definition configuration**:

     - **Task definition family**: Specify a unique task definition family name. Up to 255 letters (uppercase and lowercase), numbers, hyphens, and underscores are allowed.

  2. **Container - 1 (Essential Container)**

     - **Container details**: Specify a name, container image, and whether the container should be marked as essential. Each task definition must have at least one essential container.
       - **Name**: E.g. `nginxdemos-hello`
       - **Image URI**: E.g. `nginxdemos/hello` (Image name from Docker Hub)
       - **Essential container**: `Yes` / `No` (If there is only one container, this is mandatory set to `Yes`)
     - **Port mappings**: Add port mappings to allow the container to access ports on the host to send or receive traffic. Any changes to port mappings configuration impacts the associated service connect settings.
       - **Container Port**: `80` (Default)
       - **Protocol**: `TCP` (Default) / `UDP`

- You can optionally, **`Add more Port Mappings`**
- You can optionally add **Environment variables** either by:

  - **Add environment variable**: Add a key-value pair to specify an environment variable.
  - **Add envrionment file**: Add environment variables in bulk by providing an environment file hosted on Amazon S3.

- You can optionally, **`Add more containers`**
- Click **`Next`** to Configure environment, storage, monitoring, and tags
- Enter the following configuration:

  3. **Environment**: Specify the infrastructure requirements for the task definition.

     - **App environment**: Specify the infrastructure for the task definition.

       - **`AWS Fargate (serverless)`**
       - **`Amazon EC2 Instances`**

     - **Operating system/Architecture**: e.g. **`Linux/x86_64`**

     - **Task size**: Specify the amount of CPU and memory to reserve for your task.

       - **CPU**: e.g. `.5 vCPU`
       - **Memory**: e.g. `1 GB` (upto 30 GB)

     - **Container size (optional)**: For each container associated with the task, specify the container-level CPU and memory.

       - **Container**:
       - **CPU (in vCPU)**:
       - **Memory (in GB)**:

     - **Task roles, network mode (optional)**:

       - **Task role**: A task IAM role allows containers in the task to make API requests to AWS services. You can create a task IAM role from the IAM console
       - **Task execution role**: A task execution IAM role is used by the container agent to make AWS API requests on your behalf. If you don't already have a task execution IAM role created, we can create one for you.
       - **Network mode**: The network mode that's used for your tasks. By default, when the AWS Fargate (serverless) app environment is selected, the awsvpc network mode is used. If you select Amazon EC2 instances app environment, you can use the awsvpc or bridge network mode.

  4. **Storage (optional)**:

     - **Ephemeral storage**: The amount of ephemeral storage, in GiB, to allocate for the task. By default, **your tasks hosted on AWS Fargate receive a minimum of 20 GiB of ephemeral storage**. To specify a custom amount of ephemeral storage, specify a value between 21 GiB up to a maximum of 200 GiB.
     - **Container mount points**: For each data volume associated with the task, add a container mount point to determine where the data volume is mounted. To configure storage at a container level, first add storage.

  5. **Monitoring and logging (optional)**: Configure your container logging options and your application trace and metric collection settings using the AWS Distro for OpenTelemetry integration.

     - **Use log collection**: Configure your task to send container logs to a logging destination using a default configuration. Options:

       - `Amazon CloudWatch`
       - `Export logs to Firehose via AWS FireLens`
       - `Export logs to Kinesis Stream via AWS FireLens`
       - `Export logs to OpenSearch via AWS FireLens`
       - `Export logs to S3 via AWS FireLens`

     - **Use trace collection**: Amazon ECS creates an AWS Distro for OpenTelemetry sidecar to route traces from your application to AWS X-Ray.

     - **Use metric collection**: Amazon ECS creates an AWS Distro for OpenTelemetry sidecar to route custom container and application metrics to Amazon CloudWatch or Amazon Managed Service for Prometheus

  6. **Tags (optional)**: Tags help you to identify and organize your task definitions.

- Click **`Next`** to Review and create

---

### Deploy a Service

- Go to the ECS Cluster and click the **`Services`** Tab
- Click on the **`Deploy`** button
- Enter the following configuration:

  1. **Deployment configuration**:

     - **Application type**: Specify what type of application you want to run.

       - **Service**: Launch a group of tasks handling a long-running computing work that can be stopped and restarted. For example: A Web application
       - **Task**: Launch a standalone task that runs and terminates. For example: A Batch job

     - **Task definition**: Select an existing task definition. To create a task definition, go to [Task definitions](https://ap-south-1.console.aws.amazon.com/ecs/v2/task-definitions?region=ap-south-1)

       - **Specify revision manually**: `Off` (Default) / `On`. Manually input revision instead of choosing from the 100 most recent revisions for the selected task definition family
       - **Family**: Select from a list of task definitions
       - **Revision**: `1` (Default)
       - **Service name**: Assign an unique name for the service
       - **Desired tasks**: `1` (Default)

     - **Deployment options**:

       - **Deployment type**: Select a deployment type for the service

         - `Rolling update`

       - **Min running tasks**: Specify the minimum percent of running tasks allowed during a service deployment. `100` (Default)
       - **Max running tasks**: Specify the maximum percent of running tasks allowed during a service deployment. `200` (Default)

  2. **Load Balancing (optional)**:

     - **Load balancer type**: Configure a load balancer to distribute incoming traffic across the tasks running in your service. Options are:

       - `None`
       - `Application Load Balancer`: Specify whether you want to create a new load balancer or choose an existing one. If we select this option, we need to configure additional options:

         - **Listener**: Specify the port and protocol that the load balancer will listen for connection requests on
           - **Port**: `80`
           - **Protocol**: `HTTP`
         - **Target group**: Create a target group that the load balancer will use the route requests to the tasks in your service
           - **Target group name**: `nginx-ecs`
           - **Protocol**: `HTTP`
           - **Health check path**: `/`
           - **Health check grace period** (in seconds): `20`

  3. **Networking**:

     - **VPC**:
     - **Subnets**: Choose the subnets within the VPC that the task scheduler should consider for placement
     - **Security group**: We choose the Security Group for the EC2 Instances allowing the ALB's Security Group to only accept All TCP traffic from the ALB
     - **Public IP**: Choose whether to auto-assign a public IP to the task's elastic network interface (ENI)

  4. **Tags (optional)**: Tags help you identify and organize your clusters

- Click **`Deploy`** to Deploy the service
- Go to the [Load balancers on the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:)
- Select the Load Balancer and check the Security Groups. We need to change the Security Group for the Application Load Balancer accepting traffic on Port 80.
- Confirm that the Listeners of the ALB include incoming traffic from Port 80 matching the Security Group.
- We can scale services by:
  - Going to the Cluster and clicking on the `Edit` button.
  - Increase the `Desired tasks` from `1` to a desired number

---

## ECS: Service Auto Scaling

### ECS Service Auto Scaling: Overview

- Automatically increase / decrease the desired number of ECS Tasks
- Amazon ECS Auto Scaling uses **AWS Application Auto Scaling**

  - ECS Service Average CPU Utilization
  - ECS Service Average Memory Utilization - Scale on RAM
  - ALB Request Count per Target - metric coming from ALB

- Types of Auto-Scaling:
  - **Target Tracking**: Scale based on target value for a specific CloudWatch metric
  - **Step Scaling**: Scale based on a specified CloudWatch alarm
  - **Scheduled Scaling**: Scale based on a specified date/time (predictable changes)

> **Note**:
>
> - ECS Service Auto Scaling (Task level) **`IS NOT EQUAL TO`** EC2 Auto Scaling (EC2 Instance Level)
> - Fargate Auto Scaling is much easier to setup (Serverless)

---

### ECS Service Auto Scaling: EC2 Launch Type

- Accomodate ECS Service Scaling by adding underlying EC2 Instances
- Ways to accomplish this:

  - **Auto Scaling Group Scaling**:

    - Scale ASG for example based on CPU Utilization
    - Add EC2 Instances over time

  - **ECS Cluster Capacity Provider** (newer, more advanced):
    - Used to automatically provision and scale the infrastructure for your ECS Tasks
    - Capacity Provider paired with an Auto Scaling Group
    - Add EC2 instances when you are missing capacity (CPU, RAM)

---

## ECS: Rolling Updates

- When updating an ECS service from v1 to v2, we can control how many tasks can be started and stopped and in which order
  - The **Min running tasks** control the minimum number of tasks that must be present (This would mean all v1 tasks)
  - The **Max running tasks** control the maximum number of tasks that can be created (This would mean, `max running tasks - v1 tasks = new v2 tasks`)
  - These two settings help roll updates. The v1 tasks are eliminated and replaced by the v2 tasks based on the min and max running tasks percentage values. They are found under `Deployment options`

---

## ECS: Solutions Architecture

### ECS Tasks Invoked by EventBridge

---

## ECS: Task Placements

### ECS Task Placements: Overview

- When a task of type EC2 is launched (not Fargate), ECS must decide where to place it, with the constraints of CPU, memory and available Port
- Similarly, when a service scales in, ECS needs to determine which task to terminate
- To assist with this, we can define a **Task Placement Strategy** and **Task Placement Constraints**

- Task Placement Process:
  - Task Placement strategies are a best effort
  - When Amazon ECS places tasks, it uses the following process to select container instances:
    1. Identify the instances that will satisfy the CPU, memory and Port requirements in the task definition
    2. Identify the instances that satisfy the task placement constraints
    3. Identify the instances that satisfy the task placement strategies
    4. Select the instances for task placement and place the task there

---

### ECS Task Placements: Task Placement Strategies

1. **Binpack**

   - Place tasks based on the least available amount of CPU or memory
   - This minimizes the number of instances (cost savings)

   ```json
   "placementStrategy": [
       {
           "field": "memory",
           "type": "binpack"
       }
   ]
   ```

   - Place as many containers as possible on one EC2 instance before moving on to a new EC2 Instance

2. **Random**

   - Place the task randomly

   ```json
   "placementStrategy": [
       {
           "type": "random"
       }
   ]
   ```

3. **Spread**

   - Place the task evenly based on specified value
   - Example fields: `instanceId`, `attribute:ecs.availability-zone`

   ```json
   "placementStrategy": [
       {
           "field": "attribute:ecs.availability-zone",
           "type": "spread"
       }
   ]
   ```

   - Maximize the High availability of our ECS service, by spreading the task on the EC2 Instances

They can be mixed together:

```json
   "placementStrategy": [
       {
           "field": "attribute:ecs.availability-zone",
           "type": "spread"
       },
       {
           "field": "instanceId",
           "type": "spread"
       }
   ]
```

OR

```json
   "placementStrategy": [
       {
           "field": "attribute:ecs.availability-zone",
           "type": "spread"
       },
       {
           "field": "memory",
           "type": "binpack"
       }
   ]
```

---

### ECS Task Placements: Task Placement Constraints

- **`distinctInstance`**: Place each task on a different container instance

  ```json
  "placementConstraints": [
      {
          "type": "distinctInstance"
      }
  ]
  ```

- **`memberOf`**: Places task on instances that satisfy an expression

  - Uses the Cluster Query Language (advanced)

    **All tasks should be placed on ec2 instances of type t2**

    ```json
    "placementConstraints": [
        {
            "expression": "attribute:ecs.instance-type =~ t2.*",
            "type": "memberOf"
        }
    ]
    ```

---

# Amazon ECR

## ECR: Overview

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

## ECR: Using AWS CLI

Login Command:

- Using AWS CLI v2:

  ```s
  aws ecr get-login-password --region [region] | docker login --username AWS --password-stdin [aws_account_id].dkr.ecr.[region].amazonaws.com
  ```

- Docker commands:

  - Push:

    ```s
    docker push aws_account_id.dkr.ecr.[region].amazonaws.com/[container]:[tag]
    ```

---

## ECR: Create a Repository from the Console

A repository is where you store your Docker or Open Container Initiative (OCI) images in Amazon ECR. Each time you push or pull an image from Amazon ECR, you specify the repository and the registry location which informs where to push the image to or where to pull it from.

- Go to [Repositories](https://ap-south-1.console.aws.amazon.com/ecr/repositories?region=ap-south-1) from the Amazon ECR Console.
- Click the `Create repository` button.
- Enter the following configurations:

  1. **General Settings**:

     - **Visibility settings**: Choose the visibility setting for the repository. Once a repository is created, the visibility setting of the repository can't be changed.

       - **Private**: Access is managed by IAM and repository policy permissions.
       - **Public**: Publicly visible and accessible for image pulls.

     - **Repository name**: Provide a concise name. A developer should be able to identify the repository contents by the name. 2 characters minimum. The name must start with a letter and can only contain lowercase letters, numbers, hyphens, underscores, periods and forward slashes.

     - **Tag immutability**: Enable tag immutability to prevent image tags from being overwritten by subsequent image pushes using the same tag. Disable tag immutability to allow image tags to be overwritten. Default: `Disabled`

  2. **Image scan settings**: Deprecation warning: ScanOnPush configuration at the repository level is deprecated in favor of registry level scan filters. For more information, see [Image scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html).

     - **Scan on push**: Enable scan on push to have each image automatically scanned after being pushed to a repository. If disabled, each image scan must be manually started to get scan results. Default: `Disabled`

  3. **Encryption settings**: The KMS encryption settings cannot be changed or disabled after the repository is created.

     - **KMS encryption**: You can use AWS Key Management Service (KMS) to encrypt images stored in this repository, instead of using the default encryption settings. Default: `Disabled`

- Click `Create repository` to create a repository.

> **Note**: Images need to be pushed into the repository using the **[Push commands](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)**

---

## Amazon EKS

- Amazon EKS stands for Amazon Elastic Kubernetes Service
- It is a way to launch and manage Kubernetes clusters on AWS
- Kubernetes is an open-source system for automatic deployment, scaling and management (container orchestration) of containerized (usually Docker) applications
- It's an alternative to ECS, similar goal but different API. ECS is not open source while Kubernetes is Open-Source

- EKS supports two launch modes:

  - **EC2**: To deploy worker nodes
  - **Fargate**: To deploy serverless containers

- **Use Case**:

  - Your company is already using Kubernetes on-premises or in another Cloud, and wants to migrate to AWS using Kubernetes
  - Kubernetes is Cloud-agnostic (can be used in any cloud - Azure, GCP)

- **Node types**:

  - **Managed Node Groups**:

    - Creates and manages Nodes (EC2 instances) for you
    - Nodes are part of an Auto-Scaling Group managed by EKS
    - Supports On-demand or Spot Instances

  - **Self-Managed Nodes**:

    - Nodes created by you and registered to the EKS cluster and managed by an ASG
    - You can use prebuilt AMI - Amazon EKS Optimized AMI or build your own AMI
    - Supports On-demand or Spot Instances

  - **AWS Fargate**:
    - No maintenance required; no nodes managed

- **Data Volumes**:
  - Can attach data volume to Amazon EKS cluster
  - Need to specify a **StorageClass** manifest on your EKS cluster
  - Leverages a **Container Storage Interface** (CSI) compliant driver
  - Support for Amazon EBS (Elastic Block Storage)
  - Support for Amazon EFS (Works with Fargate because it is a network storage type)
  - Support for [Amazon FSx for Lustre](https://aws.amazon.com/fsx/lustre/)
  - Support for [Amazon FSx for NetApp ONTAP](https://aws.amazon.com/fsx/netapp-ontap/)

---

# References

- [ECS Container Agent Configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)
- [Image Scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html)
- [Pushing a Docker Image to ECR repository](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)
- [Amazon FSx](https://aws.amazon.com/fsx/)
