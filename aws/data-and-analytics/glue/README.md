# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Glue: Overview](#aws-glue-overview)
- [AWS Glue: Convert Data into Parquet format](#aws-glue-convert-data-into-parquet-format)
- [AWS Glue: Glue Data Catalog](#aws-glue-glue-data-catalog)
- [Other features of Glue](#other-features-of-glue)
- [AWS Glue vs Kinesis Data Firehose](#aws-glue-vs-kinesis-data-firehose)
- [AWS Glue: Pricing](#aws-glue-pricing)

---

# AWS Glue: Overview

![AWS Glue: Overview](https://d1.awsstatic.com/reInvent/reinvent-2022/glue/Product-Page-Diagram_AWS-Glue_for-Ray%402x.f34b47cf0280c7d843ea457b704ea512bebd91d5.png)

- Managed extract, transform and load (ETL) service
- Useful to prepare and transform data for analytics
- Fully serverless

---

# AWS Glue: Convert Data into Parquet format

The Parquet format is a columnar data format and has a huge performance improvement over other row-based formats for analysis services like Athena.

**Workflow**:

- **Extract**: Anytime a file is inserted in S3, trigger a Lambda function (or EventBridge) that would trigger a Glue ETL job.
- **Transform**: The Glue job converts the `.csv` from the S3 bucket into `Parquet` format
- **Load**: Loads the data back into a destination S3 bucket

---

# AWS Glue: Glue Data Catalog

- The Glue Data Catalog runs a Glue Data Crawler that is connected to data sources like:

  - **Amazon S3**
  - **Data stores in a VPC (RDS, Aurora, DynamoDB)**
  - **On-premises JDBC data stores**

  - Use of AWS Glue crawlers is optional, and you can populate the AWS Glue Data Catalog directly through the API.
  - AWS Glue Crawler is billed per DPU-Hour, per second, with a 10-minute minimum per crawler run. Check [Pricing](#aws-glue-pricing) for more details.

- Glue Jobs leverage these database tables inside Glue created from the metadata in the Glue Data Catalog to perform ETL.
- Central to many AWS Services: When you use Amazon Athena, Amazon EMR or Amazon Redshift Spectrum, behind the scenes, to do the data discovery and schema discovery, Amazon Athena leverages the AWS Glue Data Catalog.

---

# Other features of Glue

- **Glue Job Bookmarks**: Prevent re-processing old data

- **Glue Elastic Views**:

  - Combine and replicate data across multiple data stores using SQL
  - No custom code, Glue monitors for changes in the source data.
  - Serverless
  - Leverages a **virtual table** (Materialized view)

- **Glue DataBrew**: Clean and normalize data using pre-built transformation

- **Glue Data Studio**: New GUI to create, run and monitor ETL jobs in Glue

- **Glue Streaming ETL**:

  - Built on Apache Spark Structured Streaming
  - Instead of running ETL jobs as batch jobs you can run them as streaming jobs - read data from streaming sources
  - Streaming Sources: **`Kinesis Data Streams`**, **`Kafka`**, **`Amazon MSK (Managed Kafka)`**

---

# AWS Glue vs Kinesis Data Firehose

Both AWS Glue and Amazon Kinesis Data Firehose can be used for streaming ETL. AWS Glue is recommended for complex ETL, including joining streams, and partitioning the output in Amazon S3 based on the data content. Amazon Kinesis Data Firehose is recommended when your use cases focus on data delivery and preparing data to be processed after it is delivered.

Streaming ETL in AWS Glue enables advanced ETL on streaming data using the same serverless, pay-as-you-go platform that you currently use for your batch jobs. AWS Glue generates customizable ETL code to prepare your data while in flight and has built-in functionality to process streaming data that is semi-structured or has an evolving schema. Use Glue to apply complex transforms to data streams, enrich records with information from other streams and persistent data stores, and then load records into your data lake or data warehouse.

Streaming ETL in Amazon Kinesis Data Firehose enables you to easily capture, transform, and deliver streaming data. Amazon Kinesis Data Firehose provides ETL capabilities including serverless data transformation through AWS Lambda and format conversion from JSON to Parquet. It includes ETL capabilities that are designed to make data easier to process after delivery, but does not include the advanced ETL capabilities that AWS Glue supports.

---

# AWS Glue: Pricing

1. **AWS Glue Data Catalog**:

- **Storage**:

  - Free for the first million objects stored
  - `$1.00` per 100,000 objects stored above 1M, per month

- **Requests**:s

  - Free for the first million requests per month
  - `$1.00` per million requests stored above 1M in a month

2. **AWS Glue Crawler**: There is an hourly rate for AWS Glue crawler runtime to discover data and populate the AWS Glue Data Catalog. You are charged an hourly rate based on the number of Data Processing Units (or DPUs) used to run your crawler. A single Data Processing Unit (DPU) provides 4 vCPU and 16 GB of memory. You are billed in increments of 1 second, rounded up to the nearest second, with a 10-minute minimum duration for each crawl.

- `$0.44` per DPU-Hour, billed per second, with a 10-minute minimum per crawler run

---
