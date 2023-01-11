# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS DataSync: Overview](#aws-datasync-overview)

---

# AWS DataSync: Overview

- **Move large amount of data to and from**:

  - **On-premises** / other cloud to AWS (NFS, SMB, HDFS, S3API) - needs a client to run on-premises
  - **AWS to AWS** (different storage services) - no agent required

- Can **synchronize data** to:

  - `Amazon S3` (any storage classes - including Glacier)
  - `Amazon EFS`
  - `Amazon FSx` (Windows, Lustre, NetApp ONTAP, OpenZFS)

- Replication tasks are not continuous. They must be scheduled **hourly**, **daily** or **weekly**.

- DataSync connects to existing storage systems and data sources with standard storage protocols (**NFS**, **SMB**), or using the Amazon S3 API.

- **File permissions and metadata are preserved**. Compliant with the **NFS POSIX file system** and the **SMB permissions**

- DataSync uses a purpose-built network protocol and scale-out architecture to transfer data.

- One DataSync agent is capable of saturating a `10 Gbps` network link. If you don't want to max out your bandwidth you can also setup a bandwidth limit.

- DataSync fully automates the data transfer. It comes with :

  - Retry and network resiliency mechanisms
  - Network optimizations
  - Built-in task scheduling
  - Monitoring via the DataSync API and Console
  - CloudWatch metrics, events, and logs that provide granular visibility into the transfer process.

- **Workflow**:

  - Uses an agent which is a virtual machine (VM) that is owned by the user and is used to read or write data from your storage systems.
  - You can activate the agent from the Management Console.
  - The agent will then read from a source location, and sync your data to Amazon S3, Amazon EFS, or Amazon Fsx for Windows File Server.

- DataSync performs data integrity verification both during the transfer and at the end of the transfer.

---
