# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Athena: Overview](#aws-athena-overview)
- [AWS Athena: Federated Query](#aws-athena-federated-query)

---

# AWS Athena: Overview

![AWS Athena](https://d1.awsstatic.com/products/athena/product-page-diagram_Amazon-Athena-Connectors%402x.867e3023b0e6b33862d65aa8e786cce46b88cb61.png)

- **Serverless** query service to analyze data stored in Amazon S3

- **Querying**: Uses standard SQL language to query the files (Athena is built on the [Presto](https://prestodb.io) engine)

- **File formats supported**:

  - `CSV`
  - `JSON`
  - `ORC`
  - `Avro`
  - `Parquet`

- **Pricing**: `$5.00` per TB of data scanned charged at a minimum of 10 MB per query, rounded to the nearest megabyte.

- **Reporting and Dashboards**: Commonly used with Amazon Quicksight for reporting / dashboards

- **Use Cases**:

  - Business intelligence
  - Reporting and analytics
  - Analyze and query VPC Flow logs, ELB Logs, CloudTrail trails, etc.

- **Performance Optimizations**:

  - **Use columnar data**: For cost-savings (less scan)

    - Recommended file formats: `Apache Parquet` or `ORC`
    - Huge performance improvement
    - Use **[Amazon Glue](../glue/README.md#aws-glue-convert-data-into-parquet-format)** to convert your data into `Parquet` or `ORC`

  - **Compress data**: For smaller retrievals (`bzip2`, `gzip`, `Iz4`, `snappy`, `zlip`, `zstd` etc)

  - **Partitioning**: Partition datasets in S3 for easy querying on virtual columns

    - Original bucket path: `s3://yourBucket/pathToTable`
    - Column: `s3://yourBucket/pathToTable/<partition-column-name-1>=<value>/<partition-column-name-2>=<value>`
    - Example: `s3://athena-example/pathToTableflight/parquet/year=1991/month=1/day=1`

- Use larger files (> **`128 MB`**) to minimize overhead

---

# AWS Athena: Federated Query

- Allows you to run SQL queries across data stored in relational, non-relational, object and custom data sources (AWS or on-premises)
- Uses Data Source Connectors that run on AWS Lambda to run Federated Queries in other services (e.g. CloudWatch Logs, DyanmoDB, RDS, DocumentDB, ElastiCache, Aurora, SQLServer, HBase in EMR, On-premise Database).
- One Lambda function per Data Source Connector
- Run Joins, computations
- Store the results back in Amazon S3

---
