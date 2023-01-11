# Table of Contents

- [Table of Contents](#table-of-contents)
- [RDS](#rds)
  - [RDS: Overview](#rds-overview)
  - [RDS: Advantages over deploying Database on EC2](#rds-advantages-over-deploying-database-on-ec2)
  - [RDS: Storage Auto Scaling](#rds-storage-auto-scaling)
  - [RDS: Read Replicas](#rds-read-replicas)
    - [RDS Read Replicas: Overview](#rds-read-replicas-overview)
    - [RDS Read Replicas: Network Cost](#rds-read-replicas-network-cost)
  - [RDS Multi AZ: Disaster Recovery (DR)](#rds-multi-az-disaster-recovery-dr)
  - [RDS: Creating a Postgres Database](#rds-creating-a-postgres-database)
  - [RDS: RDS Custom](#rds-rds-custom)
- [Aurora](#aurora)
  - [Aurora: Overview](#aurora-overview)
  - [Aurora: DB Cluster Infrastructure](#aurora-db-cluster-infrastructure)
  - [Aurora: Features](#aurora-features)
  - [Aurora: Endpoints](#aurora-endpoints)
    - [Cluster Endpoint](#cluster-endpoint)
    - [Reader Endpoints](#reader-endpoints)
    - [Custom Endpoints](#custom-endpoints)
    - [Instance Endpoint](#instance-endpoint)
  - [Aurora: Aurora Serverless](#aurora-aurora-serverless)
  - [Aurora: Aurora Multi-Master](#aurora-aurora-multi-master)
  - [Aurora: Aurora Global](#aurora-aurora-global)
  - [Aurora: Machine Learning](#aurora-machine-learning)
  - [Aurora: Aurora Database Cloning](#aurora-aurora-database-cloning)
  - [Aurora: Backtracking](#aurora-backtracking)
- [RDS and Aurora: Backup and Monitoring](#rds-and-aurora-backup-and-monitoring)
  - [RDS Backups](#rds-backups)
  - [Aurora Backups](#aurora-backups)
- [RDS and Aurora: Security](#rds-and-aurora-security)
- [RDS and Aurora: RDS Proxy](#rds-and-aurora-rds-proxy)
- [ElastiCache](#elasticache)
  - [ELastiCache: Overview](#elasticache-overview)
  - [ElastiCache: Architecture](#elasticache-architecture)
  - [ElastiCache: Use Case - User Session Store](#elasticache-use-case---user-session-store)
  - [ElastiCache: Redis vs Memcached](#elasticache-redis-vs-memcached)
  - [ElastiCache: Creating a Redis Cluster](#elasticache-creating-a-redis-cluster)
  - [ElastiCache: Strategies](#elasticache-strategies)
    - [Caching: Considerations](#caching-considerations)
    - [Caching: Design Patterns](#caching-design-patterns)
      - [Lazy Caching](#lazy-caching)
      - [Write-through](#write-through)
      - [Time-to-live](#time-to-live)
      - [Evictions](#evictions)
      - [The Thundering Herd / Dogpiling](#the-thundering-herd--dogpiling)
    - [Caching: In Production](#caching-in-production)
  - [ElastiCache: Cluster Modes](#elasticache-cluster-modes)
- [FAQs](#faqs)
- [References](#references)

---

# RDS

## RDS: Overview

Amazon RDS is a managed Relational Database Service that uses SQL as a query language.

- RDS stands for Relational Database Service
- Uses SQL as a query language

- It allows you to create SQL based Cloud Databases managed by AWS:

  - Postgres
  - MySQL
  - MariaDB
  - Oracle
  - Microsoft SQL Server
  - Aurora (AWS Proprietary Software)

- **Ports**:

  - PostgreSQL: `5432`
  - MySQL: `3306`
  - Oracle RDS: `1521`
  - Microsoft SQL Server: `1433`
  - MariaDB: `3306` (same as MySQL)
  - Aurora: `5432` (if PostgreSQL compatible) or `3306` (if MySQL compatible)

---

## RDS: Advantages over deploying Database on EC2

- **Managed Service**

  - Automatic provisioning (Auto-scaling capability for Storage volume, Instance size), OS patching
  - Storage is backed by EBS (`gp2` / `gp3` or `io1` / `io2`)
  - Since it's a managed service, we cannot SSH into the underlying EC2 Instance. This is not necessarily bad as we can do all the other things due to its managed nature.

- **Backup & Recovery**:

  - Continuous backups and restore to specific timestamp (Point-in-time Restore up to 35 days)
  - Multi-AZ setup for Disaster Recovery
  - Manual DB snapshot for longer-term recovery

- **Maintenance & Monitoring**:

  - Monitoring dashboards
  - Managed and scheduled maintenance (with downtime)

- **Security**:

  - **Authentication through AWS IAM Database Authentication**.

    - IAM database authentication works with **MySQL** and **PostgreSQL**.
    - With this authentication method, you don't need to use a password when you connect to a DB instance. Instead, you use an authentication token.
    - An authentication token is a unique string of characters that Amazon RDS generates on request.
    - Authentication tokens are generated using AWS Signature Version 4.
    - Each token has a lifetime of 15 minutes.
    - You don't need to store user credentials in the database, because authentication is managed externally using IAM.
    - You can also still use standard database authentication.

    - **Benefits of Authentication through IAM Database Authentication**:

      - Network traffic to and from the database is encrypted in-transit using SSL.
      - You can use IAM to centrally manage access to your database resources, instead of managing access individually on each DB instance.
      - For applications running on Amazon EC2, you can use profile credentials specific to your EC2 instance to access your database instead of a password, for greater security.

  - **Integration with Secrets Manager to manage database credentials**
  - **Security Groups**
  - **KMS**
  - **Encryption in transit (SSL)**

- **Customization**:

  - Manual Scaling capability (vertical by increasing instance type and horizontal scaling of reads by adding Read Replicas)
  - RDS Custom for access to and customization of the underlying instance (Only available to Oracle & SQL Server)

---

## RDS: Storage Auto Scaling

- Helps you dynamically increase storage on your RDS DB instance dynamically
- When RDS detects you are running out of free database storage, it scales automatically. Scales upto 64 TiB for most databases.
- Avoid manually scaling your database storage.
- You have to set a **Maximum Storage Threshold** (maximum limit for DB storage)
- Automatically modify storage if:
  - Free storage is less than 10% of allocated storage
  - Low-storage lasts at least 5 minutes
  - 6 hours have passed since last modification
- Useful for applications with unpredictable workloads
- Supports all RDS database engines (Postgres, MySQL, MariaDB, SQL Server, Oracle)

---

## RDS: Read Replicas

### RDS Read Replicas: Overview

Read Replicas as the name indicates, help you scale your Reads.

**Use Case 1:** You have a production database that is taking on normal load. You want to run a reporting application to run some analytics.

**Solution:** Create a read replica to run the new workload there instead of reading from the primary master database and flooding it with read requests.

Read Replicas are only for SELECT (=read) only kind of statements (not INSERT, UPDATE and DELETE).

Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.

Since Read Replicas have asynchronous replication, it is possible sometimes that some of the replicas when read have Eventual consistency and is still not updated to the latest data.

---

### RDS Read Replicas: Network Cost

In AWS there's a network cost when data goes from one AZ to another but there are exceptions usually for managed services. For RDS Read Replicas within the same Region (but maybe different AZ), do not have that fee.

---

## RDS Multi AZ: Disaster Recovery (DR)

- Multi AZ is mainly used for Disaster Recovery.

- **Increased Availability**:

  - Amazon RDS automatically provisions and maintains a synchronous standby replica in a different Availability Zone.
  - Each AZ runs on its own physically distinct, independent infrastructure, and is engineered to be highly reliable.

- **Synchronous replication** to a standby instance in another AZ. So that means, when the application writes to the Master, that change needs to also be replicated in the standby to be accepted.

- **Not used for scaling**: The standby database is just for standby, you cannot write to it, you cannot read from it, it's just here as a failover.

- Failover in case of loss of AZ, loss of network, instance or storage failure - the standby database will become the new Master. Failover times are typically `60-120 seconds`.

- **Single DNS Name (URL)** - Automatic app failover to standby if Master fails. The CNAME record will be updated to point to the standby DB, which is in turn promoted to become the new primary.

- No manual intervention in apps necessary.

- The Read Replicas CAN be set-up as Multi AZ for Disaster Recovery (DR)

- Going from Single AZ to Multi AZ is a zero-downtime operation (no need to stop the DB)

- **Workflow using Console**: Simply click **`Modify`** for the Database and **`Enable Multi AZ`**

- **Maintenance**:

  - **Maintenance in RDS (OS updates) with Multi-AZ occurs in the following flow**:

    - Perform maintenance on the standby.
    - Promote the standby to primary.
    - Perform maintenance on the old primary, which becomes the new standby.
    - For OS updates, the database engine for the entire Multi-AZ deployment is shut down during the upgrade.

  - **Database Engine update with Multi-AZ occurs in the following flow**:

    - Amazon RDS upgrades both the primary and secondary DB instances at the same time.

- **Internal workflow for Failover**:

  - A snapshot is taken quickly of the Master database.
  - The new standby database is restored from this snapshot in a new AZ.
  - Synchronization is established between the two databases.

  - Amazon RDS uses several different technologies to provide failover support:

    - Multi-AZ deployments for MariaDB, MySQL, Oracle, and PostgreSQL DB instances use Amazon's failover technology.
    - SQL Server DB instances use SQL Server Database Mirroring (DBM) or Always On Availability Groups (AGs).

---

## RDS: Creating a Postgres Database

---

## RDS: RDS Custom

Amazon RDS Custom is a managed database service for applications that require customization of the underlying operating system and database environment. Benefits of RDS automation with the access needed for legacy, packaged, and custom applications.

- Managed Oracle and Microsoft SQL Server Database with OS and database customization
- All benefits of RDS like automatic setup, operation and scaling of database in AWS with added benefit of access to underlying OS and database, so we can:

  - Configure settings
  - Install patches
  - Enable native features
  - Access the underlying EC2 Instance using SSH or SSM Session Manager

- **Recommendations**:
  - To perform a customization, it is recommended to **Deactivate Automation Mode** so that RDS does not perform any automation, maintenance or scaling while you perform the customization.
  - Take a Snapshot to enable recovery from it later, in case of unintentional breaking changes.

---

# Aurora

## Aurora: Overview

- **Value Propostion**:

  - Aurora is a proprietary technology from AWS (not open source).
  - Postgres and MySQL are both supported as Aurora DB (that means your drivers will work as if Aurora was a Postgres or MySQL database).
  - Aurora is **AWS Cloud Optimized** and claims 5x performance improvement over MySQL on RDS, over 3x the performance of Postgres on RDS.
  - It's High Availability (HA) since it's cloud native.
  - **[Aurora Serverless](#aurora-aurora-serverless)**: For unpredictable / intermittent workloads, no capacity planning needed
  - **[Aurora Multi-Master](#aurora-aurora-multi-master)**: For continuous write failover (High-write availability)
  - **[Aurora Global](#aurora-aurora-global)**: Master + upto `15` Read Replicas to serve Reads (any of these replicas can also become Master), sub 10 ms replication
  - **[Aurora Machine Learning](#aurora-machine-learning)**: Perform Machine Learning using **AWS SageMaker** (Build, train, deploy Machine Learning models) and **AWS Comprehend** (for Natural Language Processing)
  - **[Aurora Database Cloning](#aurora-aurora-database-cloning)**: New cluster from existing one, faster than restoring a snapshot

- **Storage**:

  - Aurora storage auto-scales **in increments of `10 GB`, upto `128 TB`.**

- **Data Protection**:

  - Aurora can have **`15`** Replicas while MySQL can have 5, and the replication process is faster (sub `10 ms` replica lag).
  - Auto-Scaling of Read Replicas
  - Failover in Aurora is instantaneous, which makes it much faster than Multi-AZ on MySQL on RDS.

- **High Availability**: `6` copies of your data across `3 AZ`

  - Master is the only instance that takes writes. It also accepts Reads.
  - `4` copies out of `6` needed for writes (including Master)
  - `3` copies out of `6` needed for reads (including Master)
  - Self-healing with peer-to-peer replication (i.e. if some data is corrupted then it does self-healing)
  - Storage is stripped across 100s of volumes (managed by AWS), which reduces risk of data loss
  - Automated failover for Master in less than `30 seconds`
  - **Aurora Global**: Master + upto `15` Read Replicas to serve Reads (any of these replicas can also become Master)
  - Custom endpoints: one endpoint each for all Reader(s) and the Writer instance
  - **Aurora Multi-Master** for continuous write failover (High-write availability)

- **Fault Tolerance**: If the primary instance in a DB cluster using single-master replication fails, Aurora automatically fails over to a new primary instance in one of two ways:

  - **By promoting an existing Aurora Replica to the new primary instance** (if there is one or more Aurora Replicas in the Cluster) - faster than creating a new primary instance
  - **By creating a new primary instance** (if there are no Aurora Replicas) - slower than promotion

- **Priorities for Promoting**:

  - You can customize the order in which your Aurora Replicas are promoted to the primary instance after a failure by assigning each replica a priority.
  - Priorities range from `0` for the first priority to `15` for the last priority.

  - **Promotion Tiers**: More than one Aurora Replica can share the same priority, resulting in promotion tiers.

    - **Two or more Aurora Replicas share the same priority**: Amazon RDS promotes the replica that is largest in size.
    - **Two or more Aurora Replicas share the same priority and size**: Amazon RDS promotes an arbitrary replica in the same promotion tier.

- **Security / Monitoring / Maintenance**: Same as RDS

- **Cost**: Aurora costs more than RDS (about +20%) but is more efficient.

---

## Aurora: DB Cluster Infrastructure

## Aurora: Features

- Automatic Failover
- Backup and Recovery
- Isolation and Security
- Industry Compliance
- Push-button Scaling
- Automatic Patching with Zero Downtime
- Advanced Monitoring
- Routine Maintenance
- Backtrack: Restore data at any point of time without using backups

---

## [Aurora: Endpoints](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html)

An endpoint is represented as an Aurora-specific URL that contains a **host address** and a **port**. The following types of endpoints are available from an Aurora DB cluster:

### Cluster Endpoint

- A **cluster / writer endpoint** for an Aurora DB cluster connects to the current primary DB instance for that DB cluster.
- This endpoint is the only one that can perform write operations such as DDL statements.
- Because of this, the cluster endpoint is the one that you connect to when you first set up a cluster or when your cluster only contains a single DB instance.
- Each Aurora DB cluster has one cluster endpoint and one primary DB instance.
- You use the cluster endpoint for all write operations on the DB cluster, including inserts, updates, deletes, and DDL changes.
- You can also use the cluster endpoint for read operations, such as queries.

- **Example**: `mydbcluster.cluster-123456789012.us-east-1.rds.amazonaws.com:3306`

---

### Reader Endpoints

- A **reader endpoint** for an Aurora DB cluster provides load-balancing support for read-only connections to the DB cluster.
- Use the reader endpoint for read operations, such as queries.
- By processing those statements on the read-only Aurora Replicas, this endpoint reduces the overhead on the primary instance.
- It also helps the cluster to scale the capacity to handle simultaneous SELECT queries, proportional to the number of Aurora Replicas in the cluster.
- Each Aurora DB cluster has one reader endpoint.
- If the cluster contains one or more Aurora Replicas, the reader endpoint load-balances each connection request among the Aurora Replicas.
- If the cluster only contains a primary instance and no Aurora Replicas, the reader endpoint connects to the primary instance. In that case, you can perform write operations through the endpoint.

- **Example**: `mydbcluster.cluster-ro-123456789012.us-east-1.rds.amazonaws.com:3306`

---

### Custom Endpoints

- Define a Subset of Aurora Instances as **Custom Endpoints**.
- When you connect to the endpoint, Aurora performs load balancing and chooses one of the instances in the group to handle the connection.
- You can create up to `5` custom endpoints for each provisioned Aurora cluster or Aurora Serverless v2 cluster.
- You can't use custom endpoints for Aurora Serverless v1 clusters.
- The connection can go to any DB instance (randomly) that is associated with the custom endpoint.

  - **Recommendation**: Make sure that all the DB instances within that group share some similar characteristic. Doing so ensures that the performance, memory capacity, and so on, are consistent for everyone who connects to that endpoint.

- **Use Case**: Run analytical queries on specific replicas that may use more powerful hardware

- **Example**: `myendpoint.cluster-custom-123456789012.us-east-1.rds.amazonaws.com:3306`

---

### Instance Endpoint

- An instance endpoint connects to a specific DB instance within an Aurora cluster.

- Each DB instance in a DB cluster has its own unique instance endpoint.

  - There is one instance endpoint for the current primary DB instance of the DB cluster, and
  - There is one instance endpoint for each of the Aurora Replicas in the DB cluster.

- The instance endpoint provides direct control over connections to the DB cluster, for scenarios where using the cluster endpoint or reader endpoint might not be appropriate.

- **Use Case**: Your client application might require more fine-grained load balancing based on workload type. In this case, you can configure multiple clients to connect to different Aurora Replicas in a DB cluster to distribute read workloads.

- **Example**: `mydbinstance.123456789012.us-east-1.rds.amazonaws.com:3306 `

---

## Aurora: Aurora Serverless

- Automated database instantiation and auto-scaling based on actual usage
- Good for infrequent or unpredictable workloads
- No capacity planning needed
- Pay per second, can be more cost effective
- The clients talk to a **Proxy Fleet** managed by Aurora and in the backend Aurora instances will be created based on the workload, so you don't have to provision capacity. (Similar workflow as an Auto-Scaling Group with an Application Load Balancer in front)

---

## Aurora: Aurora Multi-Master

- Every node does Read-write.
- Useful when we want to scale writes or immediate failover for the writer node for high availability. This is different than promoting a Read Replica as a new master

---

## Aurora: Aurora Global

- **Aurora Cross Region Read Replicas**

  - Useful for disaster recovery
  - Simple to put in place
  - Independent endpoints in an Aurora DB Cluster, used for scaling Read Operations
  - Up to `15` Aurora Replicas can be distributed across the Availability Zones that a DB cluster spans within an AWS Region

- **Aurora Global Database (recommended)**

  - 1 x Primary Region (Read-write)
  - Up to 5 secondary (read-only) regions, replication lag is less than 1 second
  - Up to 16 Read replicas per secondary region
  - Helps for decreasing latency
  - Promoting another region (for disaster recovery) has an RTO of < 1 minute
  - Typical cross-region replication takes less than 1 second

---

## Aurora: Machine Learning

- Enables you to add ML-based predictions to your applications via SQL
- Simple, optimized and secure integration between Aurora and AWS ML services

- Supported services:

  - **Amazon SageMaker** (for use with any ML models)
  - **Amazon Comprehend** (for sentiment analysis with Natural Language Processing)

- You don't need Machine Learning experience
- Use cases: Fraud detection, ad targeting, sentiment analysis, product recommendations

---

## Aurora: Aurora Database Cloning

- Create a new Aurora DB Cluster from an existing one
- Faster than snapshot & restore
- The new DB cluster uses the same cluster volume and data as the original but will change when the data updates are made to the newly cloned database.
- Very fast and cost effective
- Does not affect the source database

---

## [Aurora: Backtracking](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Managing.Backtrack.html)

You can backtrack a **Aurora MySQL DB Cluster** to a specific time, without restoring data from a backup. Backtrack is not available for **Aurora PostgreSQL**.

- Helps easily undo mistakes. If you mistakenly perform a destructive action, such as a DELETE without a WHERE clause, you can backtrack the DB cluster to a time before the destructive action with minimal interruption of service.

- **Minimal downtime**:

  - Restoring a DB cluster to a point in time launches a new DB cluster and restores it from backup data or a DB cluster snapshot, which can take **_hours_**.
  - Backtracking a DB cluster doesn't require a new DB cluster and rewinds the DB cluster in **_minutes_**.

- You can explore earlier data changes. You can repeatedly backtrack a DB cluster back and forth in time to help determine when a particular data change occurred.

  - **Example**: You can backtrack a DB cluster three hours and then backtrack forward in time one hour. In this case, the backtrack time is two hours before the original time.

- **Backtrack window**: With backtracking, there is a target backtrack window and an actual backtrack window:

  - **Target backtrack window**: The amount of time you want to be able to backtrack your DB cluster. E.g. You might specify a target backtrack window of 24 hours if you want to be able to backtrack the DB cluster one day.
  - **Actual backtrack window**: The actual amount of time you can backtrack your DB cluster, which can be smaller than the target backtrack window. The actual backtrack window is based on your workload and the storage available for storing information about database changes, called **_change records_**.

- **Limitations**:

  - Backtracking is only available for DB clusters that were created with the Backtrack feature enabled during creation or when restored from a snapshot of a MySQL DB Cluster.
  - The limit for a backtrack window is `72 hours`.
  - Backtracking isn't supported with binary log (binlog) replication. Cross-Region replication must be disabled before you can configure or use backtracking.
  - Backtracking affects the entire DB cluster. For example, you can't selectively backtrack a single table or a single data update.
  - You can't restore a cross-Region snapshot of a backtrack-enabled cluster in an AWS Region that doesn't support backtracking.
  - You can't use the Backtrack feature with Aurora Multi-Master clusters.
  -

---

# RDS and Aurora: Backup and Monitoring

## RDS Backups

- **Automated Backups**:

  - Daily full backup of the database (during the backup window)
  - Transaction logs are backed-up by RDS every 5 minutes
  - Ability to restore to any point in time (from oldest backup to 5 minutes ago)
  - **Retention**: `1 - 35 days`. Set `0` to disable automated backups

- **Manual DB Snapshots**:

  - Manually triggered by the user
  - **Retention**: As long as you want
  - **Use Case**:
    - You want to stop a database for a long time and save costs. Stopping a database means we still pay for database storage costs. Hence we should take a snapshot and restore it later when we require it. Snapshot storage costs way less.

- **Restore Options**:

  - Restoring a snapshot creates a new database.
  - Restore a MySQL RDS Database from S3:
    - Create a backup of your on-premises database.
    - Store the backup file on Amazon S3.
    - Use the option on Amazon RDS to restore the backup file onto a new RDS Instance running MySQL.

---

## Aurora Backups

- **Automated Backups**:

  - **Retention**: `1 - 35 days`. Cannot be disabled.
  - Point-in-time Recovery (PITR) to any time within the Retention period

- **Manual DB Snapshots**:

  - Manually triggered by the user
  - **Retention**: As long as you want
  - **Use Case**:
    - You want to stop a database for a long time and save costs. Stopping a database means we still pay for database storage costs. Hence we should take a snapshot and restore it later when we require it. Snapshot storage costs way less.

- **Restore Options:**

  - Restoring a snapshot creates a new database.
  - Restore a MySQL Aurora cluster from S3:
    - Create a backup of your on-premises database using Percona XtraBackup (it only works with this for now).
    - Store the backup file on Amazon S3.
    - Restore the backup file onto a new Aurora cluster running MySQL.

---

# RDS and Aurora: Security

- **At-rest Encryption**: The data is encrypted on the volumes

  - Database and replicas encryption using AWS KMS - must be defined at launch time
  - If the master is not encrypted, the read replicas cannot be encrypted either
  - To encrypt an un-encrypted database, go through a DB snapshot and restore as encrypted

- **In-flight Encryption**: TLS-ready by default, use the AWS TLS root certificates client-side

- **IAM Authentication**: IAM Roles to connect to your database (instead of username/password)

- **Security Groups**: Control network access to your RDS / Aurora DB by allowing or blocking specific Ports, IPs, specific security groups

- **No SSH available** (except on **RDS Custom**)

- **Audit Logs can be enabled**: If we want to know what queries are being made on RDS and Aurora, we can enable audit logs and send to CloudWatch Logs for longer retention

---

# [RDS and Aurora: RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html)

- Fully managed database proxy for Amazon RDS.
- Allows apps to pool and share DB connections established with the database.

  - E.g. Lambda functions that were connecting to the same database instance. Multiple invocations would leave many open connections therefore instead of connecting to the database directly we can use RDS Proxy which would pool these connections into less connections to the underlying database instances.

- Improve database efficiency by reducing the stress on database resources (e.g. CPU, RAM) and minimize open connections and timeouts.
- Serverless, auto-scaling (no need to manage capacity), highly available (multi-AZ).
- Bypasses Domain Name System (DNS) caches to reduce failover times by up to 66% for RDS and Aurora Multi-AZ databases.
- Supports RDS (MySQL,PostgreSQL, MariaDB) and Aurora (MySQL, PostgreSQL)
- No code change required for most apps, just instead of connecting to the database instance, we connect to the RDS Proxy
- Enforces IAM authentication for Databases and securely store credentials in AWS Secrets Manager
- The RDS Proxy is never publicly accessible (must be accessed from VPC)

- **Use Case**:

  - Build applications that can transparently tolerate database failures without needing to write complex failure handling code.

- **Limitations**:

  - You can have `20` proxies for each AWS Account ID. (Additional proxies can be requested by opening a ticket with AWS Support)
  - Each proxy can have up to 200 associated Secrets Manager secrets.
  - Each proxy can connect up to 200 different user accounts at the same time.
  - You can create, view, modify and delete up to 20 endpoints for each proxy. These endpoints are in addition to the default endpoint that's automatically created for each proxy.
  - In an Aurora cluster, all the connections using the default proxy endpoint are handled by the Aurora Writer instance.
  - You can use RDS Proxy with Aurora Serverless v2 Clusters, but not with Aurora Serverless v1 Clusters.
  - Your RDS Proxy must be in the same VPC as the database.
  - The RDS Proxy is not publicly accessible (but the database can be)
  - You cannot use the RDS Proxy with a VPC that has its tenancy set to `dedicated`
  - If you use RDS Proxy with an RDS DB instance or Aurora DB Cluster that has IAM authentication enabled, check user authentication. Make sure that all users who connect through a proxy authenticate through user names and passwords.
  - You cannot use RDS Proxy with custom DNS.
  - Each proxy can be associated with a single target DB instance or cluster. However, you can associate multiple proxies with the same DB instance or cluster.
  - Any statement with a text size greater than 16 KB causes the proxy to pin the session to the current connection.

---

# ElastiCache

## ELastiCache: Overview

**Amazon ElastiCache** is a fully managed, in-memory caching service supporting flexible, real-time use cases. You can use ElastiCache for caching, which accelerates application and database performance, or as a primary data store for use cases that don't require durability like session stores, gaming leaderboards, streaming, and analytics. ElastiCache is compatible with **`Redis`** and **`Memcached`**.

- **Characteristics:**

  - **Managed**, **in-memory caching service** (Caches are in-memory databases with really high performance, low latency)
  - The latency for ElastiCache requests is around `300 - 500 microseconds`. Identifying the correct node size and the instance type can further improve the performance of the ElastiCache node.
  - Compatible with **`Redis`** and **`Memcached`**
  - Helps reduce load off of databases for read intensive workloads. The idea is that the common queries are going to be cached and the database will not be queried every time, just your cache can be used everytime to retrieve the result of these queries.
  - Helps make your application stateless by putting the state of your application into ElastiCache
  - AWS takes care of OS maintenance / patching, optimizations, setup, configuration, monitoring, failure recovery and backups
  - Both ElastiCache for Redis and Memcached are **HIPAA Compliant**

- **Security**:

  - **Authentication through IAM**:

    - IAM policies on ElastiCache are only used for AWS API-level security, i.e. Creating the Cache, Deleting the Cache
    - Any operation within the cache do not use IAM authentication

  - **Security Groups**

  - **KMS for encryption**

  - **Redis Auth (for Redis) for authentication in Redis nodes**

    - You can set a password/token when you create a Redis cluster. This is an extra layer of security for your cache (on top of security groups)
    - You can Login using the `AUTH [username] password` command. The default user is `default`, so one can skip the username and simply use `AUTH password`
    - Redis has an ACL which can be used to Set a different user and password than the default user:

      ```s
      # Create new user
      ACL SETUSER [username] password

      # Login with default user
      AUTH password

      # Login with custom user
      AUTH [username] password
      ```

    - Supports SSL in-flight encryption

  - **Memcached Authentication**

    - Supports SASL-based authentication (advanced)

- **Backup & Restore**: Backup / Snapshot / Point-in-time restore feature

- **Pricing Model**:

  - **On-demand Nodes**: Hourly billing without any long-term commitments. More expensive.
  - **Reserved nodes**: Commitment of `1` or `3` years. Get a significant discount. Based on whether payment is upfront or not, further discount possible.

- **Use Cases**

  - **Read-heavy application workloads** (such as social networking, gaming, media sharing, leaderboard, and Q&A portals)
  - **Compute-intensive workloads** (such as a recommendation engine) by allowing you to store the objects that are often read in the cache.
  - Redis Sorted Sets guarantee cardinality (uniqueness) and element ordering

> **Note**: Using Amazon ElastiCache involves heavy application code changes

---

## ElastiCache: Architecture

- Application Instance queries ElastiCache for matching queries. If there is a **cache hit**, i.e. if the data is stored in ElastiCache, the data is retrieved from ElastiCache and we are saved a trip to the Database.

- If there is no cache hit, i.e. there is a **cache miss**, the database is queried instead and the data is read from the database. The idea is to relieve data READ load from the database.
- For other Application Instances where the same query will be made, we can write this data back into the cache, so that the same query next time will result in a cache hit.

- Since data is stored in a cache, there must be a cache invalidation strategy to make sure the most current data is stored in the cache (E.g. [TTL](#time-to-live) with [Lazy Loading](#lazy-caching) + [Write Through](#write-through))

---

## ElastiCache: Use Case - User Session Store

1. User Logs into the Application
2. The Application writes the session data (session cookie) into ElastiCache with an expiry
3. The user hits another instance of the Application
4. The instance retrieves the data and the user is confirmed to already be logged in and doesn't have to login again

--

## ElastiCache: Redis vs Memcached

| Redis                                      | Memcached                                      |
| ------------------------------------------ | ---------------------------------------------- |
| Clustering and Multi-AZ with Auto Failover | Multi-node for partitioning of data (sharding) |
| Read Replicas to scale Reads and have HA   | No HA (replication)                            |
| Data durability using AOF persistence      | Non-persistent cache                           |
| Backup and restore features                | No backup and restore                          |
|                                            | Multi-threaded architecture                    |

---

## ElastiCache: Creating a Redis Cluster

- Go to **[ElastiCache](https://ap-south-1.console.aws.amazon.com/elasticache/home?region=ap-south-1#/dashboard?getStarted=expand)** and click **`Create cluster`** ---> **`Create Redis cluster`**
- Enter the following Cluster Settings

- **Choose a Cluster creation method**:

  - **Configure and create a new cluster**: Set all of the configuration options for your new cluster.
  - **Restore from Backups**: Use an existing backup or .rdb file to restore a cluster.

- **Cluster mode:** Scale your cluster dynamically with no downtime.

  - **Enabled**: Cluster mode enables replication across multiple shards for enhanced scalability and availability. Enabling cluster mode supports partitioning your data across up to 500 node groups and improves performance of Redis clusters. Some commands are unavailable in this mode.
  - **Disabled**: The Redis cluster will have a single shard (node group) with one primary node and up to 5 read replica. If you choose cluster mode disabled you cannot change the number of shards. The configuration supports all Redis commands and functionality but limits maximum cache size and performance.

- **Cluster info**:

  - **Name**: The name is required, can have up to 40 characters and must not contain spaces.
  - **Description**: Optional description

- **Location**: Choose whether to host the cluster in the AWS Cloud or on premises.

  - **Location**:

    - **AWS Cloud**: Use the AWS Cloud for your ElastiCache instances
    - **On premises**: Create your ElastiCache instances on an Outpost (through AWS Outposts). You need to create a subnet ID on an Outpost first.

  - **Multi AZ**:

    - **Enable**: Multi-AZ provides enhanced high availability through automatic failover to a read replica, cross AZs, in case of a primary node failover.

  - **[Auto-failover](http://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/AutoFailover.html)**:
    - **Enable**: ElastiCache Auto Failover provides enhanced high availability through automatic failover to a read replica in case of a primary node failover. Disabling ElastiCache Multi-AZ on your Redis cluster reduces your fault tolerance. In the unlikely event of an Availability Zone failure or loss of network connectivity, your Redis cluster will become unavailable.

- **Cluster settings**:

  - **Engine version**: `7.0`
  - **Port**: `6379`
  - **Parameter groups**: Parameter groups control the runtime properties of your nodes and clusters.
  - **Node type**: The type of node to be deployed and its associated memory size. - **`cache.t3.micro`**
  - **Number of replicas**: Enter the number of replicas between 0 and 5. Zero replicas will not enable an enhanced cluster with primary/replica roles. Multi-AZ can not be enabled when the number of replicas is set to 0. Select one or more replicas to enable Multi-AZ. - `0`

- **Connectivity**: Choose the IP version(s) this cluster will support. Then select an existing subnet group or create a new one.

  - **Network type**: Choose between `IPv4`, `Dual stack` and `IPv6`
  - **Subnet groups**:

    - **Create a new subnet group**:
      - **Name**: The name of the subnet group is required, can have up to 255 characters and must not contain spaces.
      - **Description**: Optional description
      - **VPC ID**: The identifier for the VPC environment where your cluster is to run.

- **Selected Subnets**: For Multi-AZ high availability mode, choose IDs for at least two subnets from two Availability Zones in the table below.

- **Availability Zone Placements**: Use the following fields to configure placements for Availability Zones.

  - HA mode - Globally, distribute AZs to maximize AZ spread across shard masters.
  - At the second level, spread nodes within a shard across AZs for within-shard HA.
  - Low latency mode - For fast writes, put all shard masters in the same AZ.

- Click **`Next`** to select **`Advanced settings`**

- **Security**: Use the following section to configure network security and data security for your cluster.

  - **Encryption at rest**

    - **Enable**: Enables encryption of data stored on disk. Enabling will require an -
      - **`Encryption key`**: The master key that will be used to protect the key used to encrypt data at rest for this cluster. We have two options:
        - **Default key**: AWS-owned KMS Key will be used for encryption
        - **Customer managed CMK**: Select a customer managed key

  - **Encryption at transit**

    - **Enable**: Enables encryption of data that moves between the service and client. Enabling will make Access control options available:
      - **Access control**: Provides the ability to configure authenticating and authorizing access.
        - **No access control**
        - **Redis AUTH default user access**: Enter a Redis Auth token which will be used to authenticate the default Redis user (In the Redis CLI we can login using the command: `AUTH [token]`)

- **Selected Security Groups**: A security group acts like a firewall that controls network access to your clusters.

- **Backup**: You can use backups to restore a cluster or seed a new cluster. The backup consists of the cluster's metadata, along with all of the data in the cluster.

  - **Enable automatic backups**: Allows ElastiCache to automatically create a daily backup of a set of replicas.
  - **Backup retention period**: The number of days for which automated backups are retained before they are automatically deleted.
  - **Backup window**: The daily time range during which automatic backups start if they're enabled.

- **Maintenance**: Configure maintenance settings for the cluster.

  - **Maintenance window**: Specify the time range (UTC) for updates such as patching an operating system, updating drivers, and installing software or patches.

    - No preference
    - Specific maintenance window

  - **Auto update minor versions**: Automatically schedule cluster upgrade to the latest minor version, once it becomes available. Cluster upgrade will only be scheduled during the maintenance window.

  - **Topic for Amazon SNS notification**: Choose an SNS topic from the list, or enter the Amazon Resource Name (ARN) for an existing topic. If no topic is chosen, no notifications are sent. Default: `Disable notifications`

- **Logs**: Specify whether to provide the Redis slow logs or engine logs.

  - **Slow Logs**: Provide the Redis slow log for queries that exceed a specified runtime.
  - **Engine Logs**: Provide the engine log for queries that exceed a specified runtime.

- Click **`Next`** and Review the settings

- Click **`Create`** to create the ElastiCache Database

---

## ElastiCache: Strategies

### Caching: Considerations

Caching is applicable to a wide variety of use cases, but fully exploiting caching requires some planning. When deciding whether to cache a piece of data, consider the following questions:

- **Is it safe to use a cached value?**
  The same piece of data can have different consistency requirements in different contexts. For example, during online checkout, you need the authoritative price of an item, so caching might not be appropriate. On other pages, however, the price might be a few minutes out of date without a negative impact on users.

- **Is caching effective for that data?**
  Some applications generate access patterns that are not suitable for caching—for example, sweeping through the key space of a large dataset that is changing frequently. In this case, keeping the cache up to date could offset any advantage caching could offer.

- **Is the data structured well for caching?**
  Simply caching a database record can often be enough to offer significant performance advantages. However, other times, data is best cached in a format that combines multiple records together. Because caches are simple key-value stores, you might also need to cache a data record in multiple different formats, so you can access it by different attributes in the record.

You don’t need to make all of these decisions up front. As you expand your usage of caching, keep these guidelines in mind when deciding whether to cache a given piece of data.

---

### Caching: Design Patterns

#### Lazy Caching

**Lazy caching**, also called **lazy population** or **cache-aside**, is the most prevalent form of caching. Laziness should serve as the foundation of any good caching strategy. The basic idea is to populate the cache only when an object is actually requested by the application. The overall application flow goes like this:

1. Your app receives a query for data, for example the top 10 most recent news stories.
2. Your app checks the cache to see if the object is in cache.
3. If so (a cache hit), the cached object is returned, and the call flow ends.
4. If not (a cache miss), then the database is queried for the object. The cache is populated, and the object is returned.

This approach has several advantages over other methods:

- The cache only contains objects that the application actually requests, which helps keep the cache size manageable. New objects are only added to the cache as needed. You can then manage your cache memory passively, by simply letting the engine you are using evict the least-accessed keys as your cache fills up, which it does by default.

- As new cache nodes come online, for example as your application scales up, the lazy population method will automatically add objects to the new cache nodes when the application first requests them.

- Cache expiration is easily handled by simply deleting the cached object. A new object will be fetched from the database the next time it is requested.

- Lazy caching is widely understood, and many web and app frameworks include support out of the box.

Example pseudocode in **`Node.js`**

```js
/** Node.js */

const getUser = user_id => {
  let record;
  // Check cache
  record = cache.get(user_id);

  if (!record) {
    // Run DB Query
    record = db.query('select * from users where id = ?', user_id);

    // Populate the cache
    cache.set(user_id, JSON.stringify(record));
  }
  return record;
};

/** App Code */
const user = getUser('abc123');
```

You should apply a lazy caching strategy anywhere in your app where you have data that is going to be read often, but written infrequently.

In a typical web or mobile app, for example, a user's profile rarely changes, but is accessed throughout the app. A person might only update his or her profile a few times a year, but the profile might be accessed dozens or hundreds of times a day, depending on the user. Popular technologies that are used for caching like Memcached and Redis will automatically evict the less frequently used cache keys to free up memory if you set an eviction policy. Thus you can apply lazy caching liberally with little downside.

---

#### Write-through

In a write-through cache, the cache is updated in real time when the database is updated. So, if a user updates his or her profile, the updated profile is also pushed into the cache. You can think of this as being proactive to avoid unnecessary cache misses, in the case that **you have data that you absolutely know is going to be accessed**.

Use Cases:

- Any type of aggregate, such as:
  - A top 100 game leaderboard
  - The top 10 most popular news stories
  - Recommendations.

Because this data is typically updated by a specific piece of application or background job code, it's straightforward to update the cache as well.

The write-through pattern is also easy to demonstrate in pseudocode:

```js
/** Node.js */

const save_user = (user_id, values) => {
  // Save to database
  record = db.query('update users ... where id = ?', user_id, values);

  // Push into cache
  cache.set(user_id, record);

  return record;
};

/** App Code */

const user = save_user(17, { name: 'Nate Dogg' });
```

This approach has certain advantages over lazy population:

- It avoids cache misses, which can help the application perform better and feel snappier.
- It shifts any application delay to the user updating data, which maps better to user expectations. By contrast, a series of cache misses can give a user the impression that your app is just slow.
- It simplifies cache expiration. The cache is always up-to-date.

However, write-through caching also has some disadvantages:

- The cache can be filled with unnecessary objects that aren't actually being accessed. Not only could this consume extra memory, but unused items can evict more useful items out of the cache.
- It can result in lots of cache churn if certain records are updated repeatedly.
- When (not if) cache nodes fail, those objects will no longer be in the cache. You need some way to repopulate the cache of missing objects, for example by lazy population.

As might be obvious, you can combine lazy caching with write-through caching to help address these issues, because they are associated with opposite sides of the data flow. Lazy caching catches cache misses on reads, and write-through caching populates data on writes, so the two approaches complement each other. For this reason, it's often best to think of **lazy caching as a foundation that you can use throughout your app, and write-through caching as a targeted optimization that you apply to specific situations**.

---

#### Time-to-live

Cache expiration can get really complex really quickly. In our previous examples, we were only operating on a single user record. In a real app, a given page or screen often caches a whole bunch of different stuff at once—profile data, top news stories, recommendations, comments, and so forth, all of which are being updated by different methods.

Unfortunately, there is no silver bullet for this problem, and cache expiration is a whole arm of computer science. But there are a few simple strategies that you can use:

- Always apply a time to live (TTL) to all of your cache keys, except those you are updating by write-through caching. You can use a long time, say hours or even days. This approach catches application bugs, where you forget to update or delete a given cache key when updating the underlying record. Eventually, the cache key will auto-expire and get refreshed.
- For rapidly changing data such as comments, leaderboards, or activity streams, rather than adding write-through caching or complex expiration logic, just set a short TTL of a few seconds. If you have a database query that is getting hammered in production, it's just a few lines of code to add a cache key with a 5 second TTL around the query. This code can be a wonderful Band-Aid to keep your application up and running while you evaluate more elegant solutions.
- A newer pattern, **Russian doll caching**, has come out of work done by the Ruby on Rails team. In this pattern, nested records are managed with their own cache keys, and then the top-level resource is a collection of those cache keys. Say you have a news webpage that contains users, stories, and comments. In this approach, each of those is its own cache key, and the page queries each of those keys respectively.
- When in doubt, just delete a cache key if you're not sure whether it's affected by a given database update or not. Your lazy caching foundation will refresh the key when needed. In the meantime, your database will be no worse off than it was without caching.

For a good overview of cache expiration and Russian doll caching, refer to [The performance impact of "Russian doll" caching](https://signalvnoise.com/posts/3690-the-performance-impact-of-russian-doll-caching), a post in the Basecamp Signal vs Noise blog.

---

#### Evictions

Evictions occur when memory is over filled or greater than maxmemory setting in the cache, resulting into the engine to select keys to evict in order to manage its memory. The keys that are chosen are based on the eviction policy that is selected.

By default, Amazon ElastiCache for Redis sets the volatile-lru eviction policy to your Redis cluster. This policy selects the least recently used keys that have an expiration (TTL) value set. Other eviction policies are available can be applied as configurable maxmemory-policy parameter. Eviction policies can be summarized as the following:

- `allkeys-lfu`: The cache evicts the least frequently used (LFU) keys regardless of TTL set
- `allkeys-lru`: The cache evicts the least recently used (LRU) regardless of TTL set
- `volatile-lfu`: The cache evicts the least frequently used (LFU) keys from those that have a TTL set
- `volatile-lru`: The cache evicts the least recently used (LRU) from those that have a TTL set
- `volatile-ttl`: The cache evicts the keys with shortest TTL set
- `volatile-random`: The cache randomly evicts keys with a TTL set
- `allkeys-random`: The cache randomly evicts keys regardless of TTL set
- `no-eviction`: The cache doesn’t evict keys at all. This blocks future writes until memory frees up.

A good strategy in selecting an appropriate eviction policy is to consider the data stored in your cluster and the outcome of keys being evicted.
Generally, LRU based policies are more common for basic caching use-cases, but depending on your objectives, you may want to leverage a TTL or Random based eviction policy if that better suits your requirements.

Also, if you are experiencing evictions with your cluster, it is usually a sign that you need to scale up (use a node that has a larger memory footprint) or scale out (add additional nodes to the cluster) in order to accommodate the additional data. An exception to this rule is if you are purposefully relying on the cache engine to manage your keys by means of eviction, also referred to an LRU cache.

---

#### The Thundering Herd / Dogpiling

Also known as dog piling, the thundering herd effect is what happens when many different application processes simultaneously request a cache key, get a cache miss, and then each hits the same database query in parallel. The more expensive this query is, the bigger impact it has on the database. If the query involved is a top 10 query that requires ranking a large dataset, the impact can be a significant hit.

One problem with adding TTLs to all of your cache keys is that it can exacerbate this problem.

**For example:**
Let's say millions of people are following a popular user on your site. That user hasn't updated his profile or published any new messages, yet his profile cache still expires due to a TTL. Your database might suddenly be swamped with a series of identical queries.

TTLs aside, this effect is also common when adding a new cache node, because the new cache node's memory is empty. In both cases, **the solution is to prewarm the cache** by following these steps:

1. Write a script that performs the same requests that your application will. If it's a web app, this script can be a shell script that hits a set of URLs.
2. If your app is set up for lazy caching, cache misses will result in cache keys being populated, and the new cache node will fill up.
3. When you add new cache nodes, run your script before you attach the new node to your application. Because your application needs to be reconfigured to add a new node to the consistent hashing ring, insert this script as a step before triggering the app reconfiguration.
4. If you anticipate adding and removing cache nodes on a regular basis, prewarming can be automated by triggering the script to run whenever your app receives a cluster reconfiguration event through Amazon Simple Notification Service (Amazon SNS).

Finally, there is one last subtle side effect of using TTLs everywhere. If you use the same TTL length (say 60 minutes) consistently, then many of your cache keys might expire within the same time window, even after prewarming your cache. One strategy that's easy to implement is to add some randomness to your TTL:

```js
const ttl = 3600 + Math.floor(Math.random() * 120); /* +/- 2 minutes */
```

The good news is that only sites at large scale typically have to worry about this level of scaling problem. It's good to be aware of, but it's also a good problem to have.

---

### Caching: In Production

Finally, it might seem as if you should only cache your heavily hit database queries and expensive calculations, but that other parts of your app might not benefit from caching. In practice, in-memory caching is widely useful, because it is much faster to retrieve a flat cache key from memory than to perform even the most highly optimized database query or remote API call. **Just keep in mind that cached data is stale data by definition, meaning there may be cases where it’s not appropriate, such as accessing an item’s price during online checkout**. You can monitor statistics like cache misses to see whether your cache is effective.

---

## ElastiCache: Cluster Modes

1. **Cluster Mode Disabled**:

   - One primary node, upto 5 read-only replicas. The idea is that in the failure of the Primary node, one of the replicas can be promoted to become the primary node (read-write)
   - Asynchronous Replication
   - The primary node is used for read/write
   - Replicas are read-only
   - One shard - all the nodes have all the data
   - Guard against data loss if node failure
   - Multi-AZ enabled by default for failover

2. **Cluster Mode Enabled**:

   - Data is partitioned across many shards (helpful to scale writes). The idea is that data is going to be partially on each of the shards
   - Each shard has a primary and upto 5 replica nodes (same as Cluster Mode Disabled)
   - Multi-AZ capability (enabled by default)
   - Upto 500 nodes per cluster
     - 500 shards with single master, 0 replicas
     - 250 shards with 1 master, 1 replica,
     - 100 shards with 1 master, 4 replicas, and so on

---

# FAQs

<details open>
    <summary style="font-weight: bold; color: orange">
        You have set up read replicas on your RDS database, but users are complaining that upon updating their social media posts, they do not see their updated posts right away. What is a possible cause for this?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Read Replicas have Asynchronous Replication, therefore it's likely your users will only read Eventual Consistency
    </p>
     <p style="padding-left: 15px">
        Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.
    </p>
</details>

<details>
    <summary style="font-weight: bold; color: orange">
        You would like to create a disaster recovery strategy for your RDS PostgreSQL database so that in case of a regional outage the database can be quickly made available for both read and write workloads in another AWS Region. The DR database must be highly available. What do you recommend?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Create a Read Replica in a different region and enable Multi-AZ on the Read Replica
    </p>
     <p style="padding-left: 15px">
        A Read Replica in a different AWS Region than the source database can be used as a standby database and promoted to become the new production database in case of a regional disruption. So, we'll have a highly available (because of Multi-AZ) RDS DB Instance in the destination AWS Region with both read and write available.
    </p>
</details>

<details>
    <summary style="font-weight: bold; color: orange">
        Which RDS database technology does NOT support IAM Database Authentication?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Oracle
    </p>
</details>

<details>
    <summary style="font-weight: bold; color: orange">
        You have a MySQL RDS database instance on which you want to enforce SSL connections. What should you do?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Execute a REQUIRE SSL statement to all your DB users
    </p>
</details>

<details>
    <summary style="font-weight: bold; color: orange">
        You have an ElastiCache cluster with small cache size, so you want to ensure that only the data that's requested will be loaded into the cluster. Which caching strategy should you use?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Lazy Loading
    </p>
    <p style="padding-left: 15px">
        Lazy Loading would load data into the cache only when necessary (actively requested data from the database).
    </p>
</details>

<details>
    <summary style="font-weight: bold; color: orange">
        You're hosting a dynamic website fronted by an ElastiCache Cluster. You have been instructed to keep latency to a minimum for all read requests for every user. Also, writes can take longer to happen. Which caching strategy do you recommend?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Write-through
    </p>
    <p style="padding-left: 15px">
        Writes maybe longer but reads are faster as data is always updated in the cache and there is no chance of cache miss.
    </p>
</details>

---

# References

- [Caching - Best Practices](https://aws.amazon.com/caching/best-practices/)
- [RDS now supports gp3 storage volumes](https://aws.amazon.com/about-aws/whats-new/2022/11/amazon-rds-general-purpose-gp3-storage-volumes/)
