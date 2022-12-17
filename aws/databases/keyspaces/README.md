# Table of Contents

- [Table of Contents](#table-of-contents)
- [Keyspaces: Overview](#keyspaces-overview)
- [References](#references)

# Keyspaces: Overview

- Apache Cassandra-compatible database on AWS. With Amazon Keyspaces, you can run your Cassandra workloads on AWS using the same Cassandra application code and developer tools that you use today.
- Apache Cassandra is an open-source NoSQL distributed database
- Fully managed, serverless, highly available

- **Serverless**:

  - You can optimize the cost of reads and writes based on your application’s traffic patterns by choosing either of the capacity modes:

    - **On-Demand Capacity Mode**: Capacity is managed automatically, and you pay for only the resources you use. Good for unexpected workloads.
    - **Provisioned Capacity Mode**: Specify the number of reads and writes per second in advance you expect your application to perform. Can use auto-scaling based on application traffic to avoid overprovisioning capacity.

  - **Fully managed Time to Live (TTL)**: Set expiration times on rows and attributes in your Keyspaces tables, and automatically delete the records after they expire.

- **High Availability**:

  - Amazon Keyspaces offers a 99.99% availability SLA within an AWS Region.
  - Tables are replicated 3 times across multiple AZ

- Use the Cassandra Query Language (CQL) to query across Keyspaces

- **Performance**:

  - Single-digit millisecond latency at any scale, 1000s of requests per second
  - **Elastic scaling with virtually unlimited throughput**: Amazon Keyspaces tables scale in response to actual application traffic, with virtually unlimited throughput and storage. There is no limit on the size of tables or number of rows per table.
  - Amazon Keyspaces is integrated with Amazon CloudWatch for performance monitoring.

- **Backup & Recovery**:

  - You can create continuous table backups with 100s of TBs of data with no performance impact to your application
  - Point-in-time Recovery (PITR) up to `35` days

- **Monitoring**:

  - You can monitor performance by using Amazon CloudWatch to help keep your applications running smoothly.

- **Security**:

  - Encryption at rest and in transit
  - IAM access control
  - Secure networking using TLS. Can use AWS PrivateLink to provide connectivity between resources in Amazon Keyspaces and VPC.

- **Pricing model**: With Amazon Keyspaces (for Apache Cassandra), you pay for only the read and write throughput, storage, and networking resources that you use.

---

# References

- [Amazon Keyspaces Documentation](https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html)
