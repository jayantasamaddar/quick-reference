# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon FSx: Overview](#amazon-fsx-overview)
- [Amazon FSx for Windows File Server](#amazon-fsx-for-windows-file-server)
- [Amazon FSx for Lustre](#amazon-fsx-for-lustre)
  - [Amazon Fsx for Lustre: Overview](#amazon-fsx-for-lustre-overview)
  - [Amazon FSx for Lustre: Deployment Options](#amazon-fsx-for-lustre-deployment-options)
- [Amazon FSx for NetApp ONTAP](#amazon-fsx-for-netapp-ontap)
- [Amazon FSx for OpenZFS](#amazon-fsx-for-openzfs)
- [References](#references)

---

# Amazon FSx: Overview

- Amazon FSx is a fully managed service that makes it easy and cost effective to launch, run, and scale feature-rich, high-performance file systems in the cloud.
- It supports a wide range of workloads with its reliability, security, scalability, and broad set of capabilities.
- Amazon FSx is built on the latest AWS compute, networking, and disk technologies to provide high performance and lower TCO.
- And as a fully managed service, it handles hardware provisioning, patching, and backups -- freeing you up to focus on your applications, your end users, and your business.

- You can choose between four widely-used file systems:

  - NetApp ONTAP
  - OpenZFS
  - Windows File Server
  - Lustre.

---

# Amazon FSx for Windows File Server

- FSx for Windows File Server is a fully managed Windows file system share drive
- Supports SMB protocol and Windows NTFS
- Microsoft Active Directory integration, ACLs, User Quotas
- **Can also be mounted on Linux EC2 Instances**
- If you have an existing Windows File Server somewhere, you can use Microsoft's Distributed File System (DFS) Namespaces to group files across multiple File Systems (E.g. join your own premises Windows File Server to the Amazon FSx for Windows File Server)

- **Throughput**: Scale up to 10s of GB/s, millions of IOPS, 100s of PBs of data

- Storage Options:

  - **SSD**: Latency sensitive workloads (databases, media processing, data analytics)
  - **HDD**: Broad spectrum of workloads (home directory, CMS)

- Can be accessed from your on-premises infrastructure (VPN or Direct Connect)
- Can be configured to be Multi-AZ (high availability)
- Data is backed-up daily to S3

---

# Amazon FSx for Lustre

## Amazon Fsx for Lustre: Overview

- Lustre is a type of parallel distributed file system, for large scale computing
- The name Lustre is derived from `Linux` and `Cluster`
- Used for Machine Learning, High Performance Computing (HPC)
- Video processing, Financial Modelling, Electronic Design Automation

- **Throughput**: Scales up to 100s of GB/s, millions of IOPS, sub-ms latencies

- **Storage Options**:

  - **SSD**: Low-latency, IOPS intensive workloads, small and random file operations
  - **HDD**: throughput-intensive workloads, large and sequential file operations

- **Seamless integration with S3**

  - Can "read S3" as a file system (through FSx)
  - Can write the output of the computations back to S3 (through FSx)

- **On-Premise Support**

  - Can be used from on-premises servers (VPN or Direct Connect)

---

## [Amazon FSx for Lustre: Deployment Options](https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-fsx-lustre.html)

1. **Scratch File System**

   - Temporary Storage
   - Data is not replicated (doesn't persist if file server fails)
   - High burst (6x faster, 200 MBps per second per TB of throughput)
   - Use Case: Short-term processing, cost optimization

2. **Persistent File System**

   - Long-term Storage
   - Data is replicated within the same AZ
   - Replace failed files within minutes
   - Use Case: Long-term processing, storing sensitive data

---

# Amazon FSx for NetApp ONTAP

- Managed NetApp ONTAP on AWS
- File System compatible with: **NFS**, **SMB**, **iSCSI** protocol
- Move workloads running on ONTAP or Network-Attached Drive (NAS) to AWS

- Works with:

  - Linux
  - Windows
  - MacOS
  - VMware Cloud on AWS
  - Amazon Workspaces & AppStream 2.0
  - Amazon EC2, ECS and EKS

- Storage automatically shrinks or grows (auto-scaling)
- Snapshots, replication, low-cost, compression and data de-duplication
- **Point-in-time instantaneous cloning (helping for testing new workloads)**

---

# Amazon FSx for OpenZFS

- Managed OpenZFS on AWS
- File System compatible with: **NFS** protocol
- Move workloads running on ZFS to AWS

- Works with:

  - Linux
  - Windows
  - MacOS
  - VMware Cloud on AWS
  - Amazon Workspaces & AppStream 2.0
  - Amazon EC2, ECS and EKS

- **Throughput**: Upto 1 million IOPS with < 0.5 ms latency

- Snapshots, compression and low-cost
- **Point-in-time instantaneous cloning (helping for testing new workloads)**

---

# References

- [Choosing an Amazon FSx File System](https://aws.amazon.com/fsx/when-to-choose-fsx/)
