# Table of Contents

- [Table of Contents](#table-of-contents)
- [ECS: EC2 Launch Type](#ecs-ec2-launch-type)
- [ECS: Fargate Launch Type](#ecs-fargate-launch-type)
- [ECS: IAM Roles for ECS Tasks](#ecs-iam-roles-for-ecs-tasks)
- [ECS: Load Balancer Integrations](#ecs-load-balancer-integrations)
- [ECS: Data Persistence](#ecs-data-persistence)
  - [ECS: Data Volumes (EFS)](#ecs-data-volumes-efs)
- [ECS: Workflow](#ecs-workflow)
  - [ECS: Workflow for EC2 Launch Type](#ecs-workflow-for-ec2-launch-type)
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
- [ECS: Troubleshooting](#ecs-troubleshooting)
  - [ASG is in an infinite loop shutting unhealthy instances and starting new instances](#asg-is-in-an-infinite-loop-shutting-unhealthy-instances-and-starting-new-instances)
  - [Check if ECS Agent is running on the Instance](#check-if-ecs-agent-is-running-on-the-instance)
- [ECS: Solutions Architecture](#ecs-solutions-architecture)
  - [ECS Tasks Invoked by EventBridge](#ecs-tasks-invoked-by-eventbridge)
- [ECS: Task Placements](#ecs-task-placements)
  - [ECS Task Placements: Overview](#ecs-task-placements-overview)
  - [ECS Task Placements: Task Placement Strategies](#ecs-task-placements-task-placement-strategies)
  - [ECS Task Placements: Task Placement Constraints](#ecs-task-placements-task-placement-constraints)
- [Deploy Using CloudFormation](#deploy-using-cloudformation)
  - [Deploy ECS Cluster running NGINX](#deploy-ecs-cluster-running-nginx)
- [Using the CLI](#using-the-cli)
  - [`create-cluster`](#create-cluster)
  - [`create-service`](#create-service)
  - [`stop-task`](#stop-task)
- [References](#references)

---

# ECS: EC2 Launch Type

Amazon ECS refers to Elastic Container Service which is Amazon's own container platform.

- When we launch Docker containers on AWS, we launch ECS Tasks on ECS Clusters.

  - **ECS Cluster**: An Amazon ECS cluster groups together tasks, and services, and allows for shared capacity and common configurations. All of your tasks, services, and capacity must belong to a cluster.

- EC2 Launch Type: You must provision and maintain the infrastructure (the EC2 instances)
- These EC2 Instances are special: they must run the ECS Agent to register in the ECS Cluster
- AWS takes care of starting / stopping containers
- **Note**: Security Groups do not matter when an EC2 instance registers with the ECS service. By default, Security Groups allow all outbound traffic.

---

# ECS: Fargate Launch Type

- Launch containers on AWS
- You do not provision the infrastructure (no EC2 Instances to manage)
- It's serverless!
- You just create task definitions to define our ECS Tasks
- AWS just runs ECS Tasks for you based on the CPU / RAM you need
- To scale, just increase the number of tasks. Simple - no more EC2 instances
- When Amazon ECS uses Fargate for compute, it incurs no costs when the application is idle.

---

# ECS: IAM Roles for ECS Tasks

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

# ECS: Load Balancer Integrations

- **Application Load Balancer** is supported and works for most use cases
- **Network Load Balancer** is recommended only for very high throughput / high performance use cases, or to pair it with AWS Private Link
- **Classic Load Balancer** supported but not recommended (no advanced features - no Fargate)

---

# ECS: Data Persistence

## ECS: Data Volumes (EFS)

We need Data Volumes to persist data. There are different kinds, but one of them is EFS (Elastic File System).

- Mount EFS File Systems onto ECS Tasks
- It is a Network File System, and thus it can be mounted to both EC2 and Fargate launch types
- Tasks running in any AZ linked to this Amazon EFS will share the same data and therefore can communicate with one another via the file system, if they wanted to
- The ultimate serverless combo is to use Fargate to launch ECS Tasks + EFS for file system persistence
- Use Case:
  - Persistent Multi-AZ shared storage for your containers
- **Note**: Amazon S3 cannot be mounted as a File System on your ECS Tasks

---

# ECS: Workflow

## ECS: Workflow for EC2 Launch Type

1. Create a ECS Cluster
   - Launch Type = FARGATE
   - Launch Type = EC2 with Auto Scaling Group
2. Create a ECS Task Definition
3. Create a ECS Service

---

# ECS: Create an ECS Cluster

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

# ECS: Create an ECS Service

## ECS: Steps to Create an ECS Service

Steps to Create an ECS Service:

1. Create a Cluster
2. Create a Task Definition
3. Run the Task Definition in a Service behind a Load Balancer
   - Thus we need to create two security groups:
     - Security Group for the Application Load Balancer accepting traffic on Port 80
     - Security Group for the EC2 Instances allowing the ALB's Security Group to only accept All TCP traffic from the ALB
4. Deploy a Service on the ECS Cluster

---

## ECS: Task Definition

## ECS Task Definition: Overview

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

## ECS Task Definition: Task Roles

ECS Task Role is the IAM Role used by the ECS task itself. Use when your container wants to call other AWS services like S3, SQS, etc.

- IAM Roles are assigned per Task Definition (one role per task definition)
- This will allow you for example: ECS Tasks out of your Task definition to access an Amazon Service
- When an ECS task is created from this Task definition, the ECS Task will automatically assume and inherit this ECS Task role
- **Note**: The Role is defined at the Task definition level and not the service level

---

## ECS Task Definition: Environment Variables

- Environment Variables can be referenced from within the ECS Task Definition:
  - **Hardcoded**: e.g. fixed non-secret URLs
  - **SSM Parameter Store**: Sensitive variables (e.g. API keys, shared configs)
  - **Secrets Manager**: Sensitive variables (e.g. DB passwords)
- Will be fetched and resolved at runtime and injected as environment variables by any tasks launched out of the Task definition
- Environment Files - For bulk environment variables, an environment file can also be uploaded to an Amazon S3 bucket and referenced

---

## ECS Task Definition: Data Volumes (Bind Mounts)

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

## ECS Task Definition: Create a Task Definition

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

## Deploy a Service

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

# ECS: Service Auto Scaling

## ECS Service Auto Scaling: Overview

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

## ECS Service Auto Scaling: EC2 Launch Type

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

# ECS: Rolling Updates

- When updating an ECS service from v1 to v2, we can control how many tasks can be started and stopped and in which order
  - The **Min running tasks** control the minimum number of tasks that must be present (This would mean all v1 tasks)
  - The **Max running tasks** control the maximum number of tasks that can be created (This would mean, `max running tasks - v1 tasks = new v2 tasks`)
  - These two settings help roll updates. The v1 tasks are eliminated and replaced by the v2 tasks based on the min and max running tasks percentage values. They are found under `Deployment options`

---

# ECS: Troubleshooting

## ASG is in an infinite loop shutting unhealthy instances and starting new instances

**Debug**:

1. [Ensure ECS Agent is running](#check-if-ecs-agent-is-running-on-the-instance)
2. SSH into any running Instance and check the `docker images`. Troubleshoot if ECS Service is not downloading Docker images from DockerHub.
3. If the above checks pass, then:

**Reason**: It takes some time for an ECS Service to start a task, especially for the first time, when there is no Image cache available. It has to download the image from an image repository like DockerHub or Elastic Container Registry (ECR) and then run the container. By default, the `HealthCheckGracePeriodSeconds` parameter is set to `0`, i.e. the Health checks begin immediately. This is the reason why Health Checks maybe failing and the Auto-Scaling Group works in such a way that unhealthy instances are automatically removed and replaced by new instances on which health checks are run again. There is a chance for this to be infinitely looping because of the aforesaid reasons.

**Solution:** Set the `HealthCheckGracePeriodSeconds` to `30` or above to allow some time for the ECS Service to download the image and run the container.

---

## Check if ECS Agent is running on the Instance

1. **Login to any of the EC2 Instances started by the ASG**

   ```s
   ssh -i ec2-public-key.pem ec2-user@[EC2-PublicIPv4Address]
   ```

2. **Check if the Agent is running using the Agent Introspection API**

   **Run:**

   ```s
   curl -s http://localhost:51678/v1/metadata | python -mjson.tool
   ```

   **Expected Response (if Agent is running):**

   ```json
   {
     "Cluster": "nginx-cluster",
     "ContainerInstanceArn": "arn:aws:ecs:ap-south-1:336463900088:container-instance/nginx-cluster/48109651b39645fea3ce8c976b8df0f8",
     "Version": "Amazon ECS Agent - v1.67.1 (*989593e9)"
   }
   ```

   **Error Response:**

   ```s
   No JSON object could be decoded
   ```

3. **View all running containers using `docker ps`**

   **Run:**

   ```s
   docker ps
   ```

   **Expected Response:**

    <!--prettier-ignore-->

   | CONTAINER ID | IMAGE                          | COMMAND  | CREATED       | STATUS                 | PORTS | NAMES     |
   | ------------ | ------------------------------ | -------- | ------------- | ---------------------- | ----- | --------- |
   | 79a3a1fd166d | amazon/amazon-ecs-agent:latest | "/agent" | 3 minutes ago | Up 3 minutes (healthy) |       | ecs-agent |

---

# ECS: Solutions Architecture

## ECS Tasks Invoked by EventBridge

---

# ECS: Task Placements

## ECS Task Placements: Overview

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

## ECS Task Placements: Task Placement Strategies

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

## ECS Task Placements: Task Placement Constraints

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

# Deploy Using CloudFormation

## Deploy ECS Cluster running NGINX

- **Create CloudFormation Stack**

  ```s
  aws cloudformation create-stack \
    --stack-name ECS-with-ASG \
    --template-body file:///home/jayantasamaddar/Work/quick-reference/aws/cloudformation/templates/ECS-with-ASG.yml \
    --capabilities CAPABILITY_IAM
  ```

---

# Using the CLI

## [`create-cluster`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecs/create-cluster.html)

Creates a new Amazon ECS cluster. By default, your account receives a `default` cluster when you launch your first container instance. However, you can create your own cluster with a unique name with the `CreateCluster` action.

> **Note:** When you call the CreateCluster API operation, Amazon ECS attempts to create the Amazon ECS service-linked role for your account. This is so that it can manage required resources in other Amazon Web Services services on your behalf. However, if the IAM user that makes the call doesn’t have permissions to create the service-linked role, it isn’t created.

**Syntax:**

```s
aws ecs create-cluster \
  --cluster-name [ClusterName] \
  --capacity-providers [ListOfCapacityProviders] \
  --cli-input-json
```

**Example:**

```s

```

**Response:**

```json

```

---

## `create-service`

---

## [`stop-task`](https://docs.aws.amazon.com/cli/latest/reference/ecs/stop-task.html)

Stops a running task. Any tags associated with the task will be deleted.

When StopTask is called on a task, the equivalent of `docker stop` is issued to the containers running in the task. This results in a `SIGTERM` value and a default 30-second timeout, after which the `SIGKILL` value is sent and the containers are forcibly stopped. If the container handles the `SIGTERM` value gracefully and exits within 30 seconds from receiving it, no `SIGKILL` value is sent.

> **Note:** The default 30-second timeout can be configured on the Amazon ECS container agent with the `ECS_CONTAINER_STOP_TIMEOUT` variable. For more information, see [Amazon ECS Container Agent Configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)

**Syntax:**

```s
aws ecs stop-task \
  --cluster [ClusterName] \
  --task [TaskARN]
```

**Example:**

```s
aws ecs stop-task \
  --cluster "nginx-cluster" \
  --task "arn:aws:ecs:ap-south-1:336463900088:task/nginx-cluster/527441dcb06a44258cf39e90e9a95b57"
```

**Response:**

```json
{
  "task": {
    "attachments": [],
    "capacityProviderName": "nginx-asg",
    "clusterArn": "arn:aws:ecs:ap-south-1:336463900088:cluster/nginx-cluster",
    "containers": [],
    "cpu": "512",
    "createdAt": "2022-12-12T23:10:49.420000+05:30",
    "desiredStatus": "STOPPED",
    "enableExecuteCommand": false,
    "group": "service:nginx-service",
    "lastStatus": "PROVISIONING",
    "launchType": "EC2",
    "memory": "1024",
    "overrides": {
      "containerOverrides": [],
      "inferenceAcceleratorOverrides": []
    },
    "startedBy": "ecs-svc/9946039128629145639",
    "stopCode": "UserInitiated",
    "stoppedReason": "Task stopped by user",
    "stoppingAt": "2022-12-12T23:37:59.546000+05:30",
    "tags": [],
    "taskArn": "arn:aws:ecs:ap-south-1:336463900088:task/nginx-cluster/527441dcb06a44258cf39e90e9a95b57",
    "taskDefinitionArn": "arn:aws:ecs:ap-south-1:336463900088:task-definition/ECS-with-ASG-ELB-ecs-nginx-app:2",
    "version": 2
  }
}
```

---

# References

- [ECS Container Agent Configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)
- [Image Scanning](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html)
- [Amazon ECS-optimized AMI](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html)
- [Updating the ECS Agent](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/agent-update-ecs-ami.html)
- [Pushing a Docker Image to ECR repository](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)
- [Amazon FSx](https://aws.amazon.com/fsx/)
