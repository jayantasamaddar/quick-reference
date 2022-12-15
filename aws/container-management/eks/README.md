# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon EKS: Overview](#amazon-eks-overview)

---

# Amazon EKS: Overview

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
