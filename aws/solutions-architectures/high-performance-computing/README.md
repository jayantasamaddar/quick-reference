# Table of Contents

- [Table of Contents](#table-of-contents)
- [High Performance Computing (HPC): Overview](#high-performance-computing-hpc-overview)
- [HPC: Data Management and Transfer](#hpc-data-management-and-transfer)
- [HPC: Compute and Networking](#hpc-compute-and-networking)
- [HPC: Storage](#hpc-storage)
- [HPC: Automation and Orchestration](#hpc-automation-and-orchestration)

---

# High Performance Computing (HPC): Overview

- The cloud is the perfect place to perform HPC because:

  - You can create a very high number of resources in no time.
  - You can speed up time to results by adding more resources.
  - You can pay only for the systems you have used.
  - **Use Cases**:

    - Genomics
    - Computational chemistry
    - Financial risk modelling
    - Weather prediction
    - Machine Learning
    - Deep Learning
    - Autonomous Driving

---

# HPC: Data Management and Transfer

- **AWS Direct Connect**

  - Move GB/s of data to the Cloud, over a private secure network

- **Snowball and Snowmobile**

  - Move PB of data to the Cloud

- **AWS DataSync**

  - Move large amount of data between on-premise and S3, EFS and FSx for Windows
  - Requires installing the DataSync agent on the on-premise server.

---

# HPC: Compute and Networking

- **EC2 Instances**:
  - CPU Optimized / GPU Optimized
  - Spot instances / Spot fleets for cost savings + Auto Scaling Groups
- **[EC2 Placement Groups](../../ec2/README.md#ec2-placement-groups)**: Cluster Mode for good network performance (Same AZ, Same rack)

- **EC2 Enhanced Networking (SR-IOV)**

  - Higher bandwidth, higher PPS (Packets-per-second), lower latency
  - Option 1: **Elastic Network Adapter (ENA)** - upto 100 Gbps
  - Option 2: Intel 82599 VF - upto 10 Gbps (Legacy)

- **Elastic Fabric Adapter (EFA)**

  - Improved ENA for **HPC**, only for **Linux**
  - Great for inter-node communications, tightly coupled workloads
  - Leverages **Message Passing Interface (MPI)** Standard that bypasses the underlying Linux OS to provide low-latency, reliable transport

---

# HPC: Storage

- **Instance-attached Storage**

  - **EBS**: Scales upto 256,000 IOPS with io2 Block Express
  - **Instance Store**: Scale to Millions of IOPS, linked to EC2 Instance, low latency

- **Network Storage**

  - **Amazon S3**: Large Blob, not a file system, object storage
  - **Amazon EFS**: Scale IOPS based on Total Size, or use Provisioned IOPS
  - **Amazon FSx for Lustre**:
    - HPC optimized distributed file system, millions of IOPS
    - Backed by Amazon S3

---

# HPC: Automation and Orchestration

- **[AWS Batch](../../batch)**:

  - Supports multi-node parallel jobs, which enables you to run single jobs that span multiple EC2 Instances.
  - Easily schedule jobs and launch EC2 Instances accordingly.

- **AWS ParallelCluster**:

  - Open-source cluster management tool to deploy HPC to AWS.
  - Configure with text-files
  - Automate creation of VPC, Subnet, Cluster type and instance types
  - Ability to enable EFA on the cluster (improves Network performance)

---
