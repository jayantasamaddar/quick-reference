# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon MSK: Overview](#amazon-msk-overview)
- [Kinesis Data Streams vs Amazon MSK](#kinesis-data-streams-vs-amazon-msk)
- [Amazon MSK Consumers](#amazon-msk-consumers)

---

# Amazon MSK: Overview

- Alternative to Amazon Kinesis

- Fully Managed Apache Kafka on AWS

  - Allows you to create, update, delete clusters
  - MSK creates and manages Kafka broker nodes and Zookeeper nodes for you
  - Deploy the MSK cluster in your VPC
  - Multi-AZ (up to 3 AZs) for high availability
  - Automatic recovery from common Apache Kafka failures
  - Data is stored on EBS volumes for as long as you want

- **MSK Serverless**:
  - Run Apache Kafka on MSK without managing capacity or servers
  - MSK automatically provisions resources and scales compute and storage for you

---

# Kinesis Data Streams vs Amazon MSK

| Kinesis Data Streams        | Amazon MSK                                                   |
| --------------------------- | ------------------------------------------------------------ |
| 1 MB message limit          | 1 MB default, configurable for higher (ex: 10 MB)            |
| Data Streams with Shards    | Kafka Topics with Partitions                                 |
| Shard Splitting and Merging | Can only add Partitions to a topic (cannot remove)           |
| TLS in-flight encryption    | PLAINTEXT or TLS in-flight encryption                        |
| KMS at-rest encryption      | KMS at-rest encryption                                       |
| Data retention up to 1 year | Data retention as long as you want (charged for EBS storage) |

---

# Amazon MSK Consumers

- **Kinesis Data Analytics for Apache Flink**
- **AWS Glue**: Streaming ETL jobs, powered by Apache Spark Streaming
- **AWS Lambda**

---
