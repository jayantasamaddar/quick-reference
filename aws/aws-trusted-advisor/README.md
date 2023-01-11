# Table of Contents

- [Table of Contents](#table-of-contents)
- [Trusted Advisor: Overview](#trusted-advisor-overview)

---

# Trusted Advisor: Overview

- No need to install anything - high level AWS Account Assessment
- Analyze your AWS Accounts and provides recommendations on:

  - **Cost Optimization**

    - Low utilized EC2 Instances
    - Idle Load Balancers
    - Under-utilized EBS Volumes
    - Reserved instances and savings plans optimizations

  - **Performance**

    - High utilization EC2 Instances
    - CloudFront CDN Optimizations
    - EC2 to EBS throughput optimizations, Alias records recommendations on Route53

  - **Security**

    - MFA enabled / disabled on Root account
    - IAM Key rotation
    - Exposed Access Keys
    - S3 Bucket permissions for public access
    - Security Groups with unrestricted ports especially on SSH

  - **Fault Tolerance**

    - EBS Snapshots age
    - Balance between different Availability Zones
    - ASG Multi-AZ, RDS Multi-AZ, ELB Configuration

  - **Service Limits**

    - Warning before reaching service limits

- Core checks and recommendations - All customers
- Can enable weekly email notification from the console

- Full Trusted Advisor: Available for **Business** and **Enterprise** support plans

  - Ability to set CloudWatch alarms when reaching limits
  - Programmatic access to Trusted Advisor using the **AWS Support API**

---
