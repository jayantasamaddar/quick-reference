# Table of Contents

- [Table of Contents](#table-of-contents)
- [OpenSearch Service: Overview](#opensearch-service-overview)

---

# OpenSearch Service: Overview

![OpenSearch Service](https://d1.awsstatic.com/product-marketing/Elasticsearch/product-page-diagram_Amazon-OpenSearch-Service_HIW%402x.f20d73b8aa110b5fb6ca1d9ebb439066a5e31ef5.png)

- Amazon OpenSearch Service is a successor to Amazon Elasticsearch.
- The name change is due to licensing issues with Elasticsearch.
- In DynamoDB, queries only exist by primary key or indexes, with OpenSearch you can search any field, and perform Full Text Search (partially matching text)
- It's common to use Opensearch complementary to another database
- OpenSearch requires a cluster of instances (not serverless)
- Does not support SQL (has its own query language)
- Ingestion from Kinesis Data Firehose, AWS IoT and CloudWatch Logs
- Security through Cognito & IAM, KMS encryption, TLS
- Comes with OpenSearch Dashboards (visualization)

---
