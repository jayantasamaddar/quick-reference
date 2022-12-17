# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon QLDB: Overview](#amazon-qldb-overview)
- [References](#references)

# Amazon QLDB: Overview

**Amazon Quantum Ledger Database (QLDB)** is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log owned by a central trusted authority. Amazon QLDB tracks each and every application data change and maintains a complete and verifiable history of changes over time.

- Amazon QLDB is a ledger database (a book recording financial transactions)
- Fully managed, serverless
- PartiQL Support: PartiQL supports SQL-compatible access to QLDB's document-oriented data model
- QLDB differs from Amazon Managed Blockchain as there is **no decentralization component**, only a central database, in accordance with financial regulation rules.

- **Highly Available**:

  - Replication across 3 AZ

- **Immutable and Transparent**:

  - Stores an accurate and sequenced entry of every data change
  - Append-only journal, i.e. Data can only be added to a journal and it cannot be overwritten or deleted from the change history even if the data is deleted from the ledger.
  - The change history of that data can still be accessed by reading from the immutable journal.
  - You can query a summary of historical changes (e.g. list of all previous owners of a vehicle), and also specific details related to transaction history (e.g. the time of a vehicle sale and name of the new owner).

- **Cryptographically Verifiable**: Amazon QLDB uses cryptography to create a concise summary of your change history. This secure summary, commonly known as a **digest**, is generated using a cryptographic hash function (`SHA-256`).

  - The digest acts as a proof of your data’s change history, allowing you to look back and verify the integrity of your data changes.
  - You can use this digest with QLDB’s API to prove the integrity of any transaction (e.g. whether a transaction occurred or not).
  - Verifiability is useful for business scenarios where you need a proof related to a specific transaction. For example, an e-commerce business may need to show proof of a winning bid.

- **Monitoring**:

  - Amazon QLDB provides Amazon CloudWatch metrics for your ledgers. With QLDB, you can view key operational metrics for your read and write IOs.

- **Pricing Model**:

  - No provisioning necessary. You pay only for what you use and there is no minimum fees or mandatory service usage.
  - You are billed separately for the following:

    - Write IO Requests
    - Read IO Requests
    - Journal torage
    - Indexed Storage
    - Data Transfer

  - There is no additional charge for data transferred between QLDB and other AWS services within the same AWS Region (in other words, `$0.00 per GB`).
  - Data transferred across AWS Regions is charged on both sides of the transfer.
  - As part of the AWS Free Tier, AWS customers receive `100 GB of free data transfer out` to the internet free each month, aggregated across all AWS Services and Regions

---

# References

- [Amazon QLDB: Documentation](https://docs.aws.amazon.com/qldb/latest/developerguide/what-is.html)
