# Table of Contents

- [Table of Contents](#table-of-contents)
- [Disaster Recovery: Overview](#disaster-recovery-overview)
- [Disaster Recovery Strategies](#disaster-recovery-strategies)
- [Backup and Restore](#backup-and-restore)
- [Disaster Recovery: Pilot Light](#disaster-recovery-pilot-light)
- [Warm Standby](#warm-standby)
- [Hot Site / Multi-Site Approach](#hot-site--multi-site-approach)
- [Disaster Recovery Options](#disaster-recovery-options)
- [AWS Elastic Disaster Recovery (AWS DRS)](#aws-elastic-disaster-recovery-aws-drs)
- [AWS Backup](#aws-backup)
  - [AWS Backup: Overview](#aws-backup-overview)
  - [AWS Backup: Backup Vault Lock](#aws-backup-backup-vault-lock)
- [References](#references)

---

# Disaster Recovery: Overview

- In the context of a company's IT environment, any event that partially or completely disrupts the operations of one or more applications of a company that has a negative impact on the company's business continuity or finances is a disaster.

- **Disaster Recovery (DR)** is about preparing for and recovering from a disaster.

- **Consideration factors for Disaster Recovery**:

  - **Expected duration of the disaster**: How soon will the application recover and how likely is the disaster to resolve on its own?
  - **Size of impact (also known as blast radius)** – Which applications are affected and to what extent is their functionality impaired?
  - **Geographic impact**: May be regional, national, continental, or global.
  - **Tolerance of downtime**: How significant is the impact of the application not functioning?

- **Kinds of Disaster Recovery**:

  - **`On-premise => On-premise`**: Traditional DR and very expensive
  - **`On-premise => AWS Cloud`**: hybrid recovery
  - **`AWS Cloud Region A => AWS Cloud Region B`**

- **RPO (Recovery Point Objective)**: The acceptable amount of data loss measured in time.

  - **Example**: If a disaster occurs at 12:00 PM (noon) and the RPO is one hour, the system should recover all data that was in the system before 11:00 AM. Data loss will span only one hour, between 11:00 AM and 12:00 PM (noon).

- **RTO (Recovery Time Objective)**: The time it takes after a disruption to restore a business process to its service level, as defined by the operational level agreement (OLA) aka Downtime.

  - **Example**: If a disaster occurs at 12:00 PM (noon) and the RTO is 8 hours, the DR process should restore the business process to the acceptable service level by 8:00 PM.

- Optimizing the RPO and RTO, drives solutions architecture decisions, and the smaller you want the margins to be, usually the higher the cost.

---

# Disaster Recovery Strategies

In order of slowest to fastest RTO

1. Backup and Restore: High RPO
2. Pilot Light
3. Warm Standby
4. Hot Site / Multi Site Approach

---

# Backup and Restore

- High RTO

---

# Disaster Recovery: Pilot Light

- A small version of the app, the critical core (pilot light) is always running in the Cloud
- Very similar to Backup and Restore
- Faster than Backup and Restore as critical systems are already up
- The instances are idle and unable to run and scale to full capacity within a few minutes but still faster than Backup and Restore.

---

# Warm Standby

- Full system up and running but at minimum size (5-10% of traffic is directed to it)
- Upon disaster, we can scale to production load
- The instances run at a low capacity and can scale within minutes.
- Faster than Pilot Light.

---

# Hot Site / Multi-Site Approach

- Very low RTO (minutes or seconds) - very expensive
- Full Production Scale is running AWS and On-Premise
- Fastest

---

# Disaster Recovery Options

- **Backup**

  - EBS Snapshots, RDS Automated Backups / Snapshots, etc.
  - Regularly pushes to S3 / S3 IA / Glacier
  - Uses Lifecycle Policy to change S3 Storage Class to Glacier
  - Cross Region Replication
  - From On-Premise to Cloud: Snowball or Storage Gateway

- **High Availability**

  - Use Route53 to migrate DNS over from Region to Region with Active-Passive Routing Policy to provide failover.
  - RDS Multi-AZ, ElastiCache Multi-AZ, EFS, S3
  - Site-to-Site VPN as a recovery failover from Direct Connect

- **Replication**

  - RDS Replication (Cross Region), AWS Aurora + Global Databases
  - Data Replication from on-premises to RDS
  - Storage Gateway to provide continuous replication

- **Automation**

  - CloudFormation / Elastic Beanstalk to re-create a whole new environment
  - Recover / Reboot EC2 instances with CloudWatch if alarms fail
  - AWS Lambda functions for customized automations

- **Chaos**

  - Netflix has a "simian army" that randomly terminate EC2 instances to test if the infrastructure is rock solid and can survive any types of failures

---

# AWS Elastic Disaster Recovery (AWS DRS)

- AWS Elastic Disaster Recovery (AWS DRS) is designed for cloud-based disaster recovery of virtual and
  physical servers.
- Primary recommended service for disaster recovery from On-Premise to AWS. You can recover your applications on AWS from cloud infrastructure or physical infrastructure like:

  - VMware vSphere
  - Microsoft Hyper-V

- Recover all your applications and databases from supported OS: **Windows** and **Linux**

- Public internet access not required. Supports AWS PrivateLink and AWS Direct Connect for replication and failback which is a significant security benefit.

- **Seamless Integrations with AWS Services**:

  - AWS Identity and Access Management (IAM)
  - AWS CloudTrail
  - Amazon CloudWatch and EventBridge.

- **Consumption Model**: Hourly metering via standard AWS billing and EULA

- **Non-disruptive failback testing**: While failing back to a test machine (not the original source server), replication of the source server continues. This allows failback drills without impacting recovery point objective (RPO).

- Supports AWS Region-to-Region failback, replication and recovery

- **Compliance**: GDPR, HIPAA, and ISO compliant

---

# AWS Backup

## AWS Backup: Overview

- Fully managed service
- Centrally manage and automate backups across all AWS services
- No need to create custom scripts and manual processes
- Supported services:

  - Amazon EC2
  - Amazon EBS
  - Amazon EFS
  - Amazon FSx (Lustre and Windows File Server)
  - Amazon S3
  - Amazon RDS (all DB engines)
  - Amazon Aurora
  - Amazon DynamoDB
  - Amazon DocumentDB
  - Amazon Neptune
  - AWS Storage Gateway (Volume Gateway)

- Supports Cross-Region Backups
- Supports Cross-Account Backups
- Supports Point-in-time Recovery for supported services
- On-Demand and Scheduled Backups
- Tag-based Backup Policies
- You build backup-policies known as **Backup Plans**
  - Backup frequency (every 12 hours, daily, weekly, monthly, cron expression)
  - Backup window
  - Transition to Cold storage (Never, Days, Weeks, Months, Years)
  - Retention period (Always, Days, Weeks, Months, Years)

---

## AWS Backup: Backup Vault Lock

- Enforce a WORM (Write-once-read-many) state for all the backups that you store in your AWS Backup Vault (cannot be deleted)
- Provides additional layer of defense to protect your backups against:

  - Inadvertent or malicious delete operations
  - Updates that shorten or alter retention periods

- Even the root user cannot delete backups when enabled

---

# References

- [Disaster Recovery of On-Premise Applications](https://docs.aws.amazon.com/pdfs/whitepapers/latest/disaster-recovery-of-on-premises-applications-to-aws/disaster-recovery-of-on-premises-applications-to-aws.pdf)
- [When to Choose AWS Elastic Disaster Recovery](https://aws.amazon.com/disaster-recovery/when-to-choose-aws-drs/?cloud-endure-blogs.sort-by=item.additionalFields.createdDate&cloud-endure-blogs.sort-order=desc)
