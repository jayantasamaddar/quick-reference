# Glossary of Storage Services

- **S3**: Object Storage
- **S3 Glacier**: Object Archival
- **EBS Volumes**: Network storage for one EC2 Instance at a time. Multi-Attach support for `io1` and `io2` (Provisioned SSD Volumes)
- **EC2 Instance Storage**: Physical storage for your EC2 Instance. Very high IOPS but is deleted on instance termination
- **EFS**: Network File System for Linux Instances, POSIX filesystem
- **FSx for Windows**: Network File System for Windows servers
- **FSx for Lustre**: High Performance Computing Linux file system
- **FSx for NetApp ONTAP**: High OS Compatibility
- **FSx for OpenZFS**: Managed ZFS file system
- **Storage Gateway**: Access data on premises from AWS Storage services
- **Transfer Family**: Access files via FTP, FTPS, SFTP interface on top of Amazon S3 or Amazon EFS
- **DataSync**: Schedule data sync from on-premise to AWS or AWS to AWS
- **Snow Family**: To move large amount of data to the cloud, physically
- **Databases**: For specific workloads, usually that requires indexing and querying

---

# Costing Comparisons

## EBS vs EFS vs S3

**Problem**:
A technology blogger wants to write a review on the comparative pricing for various storage types available on AWS Cloud. The blogger has created a test file of size 1GB with some random data. Next he copies this test file into AWS S3 Standard storage class, provisions an EBS volume (General Purpose SSD (gp2)) with 100GB of provisioned storage and copies the test file into the EBS volume, and lastly copies the test file into an EFS Standard Storage filesystem. At the end of the month, he analyses the bill for costs incurred on the respective storage types for the test file.

What is the correct order of the storage charges incurred for the test file on these three storage types?

**Solution**:

Cost of test file storage on S3 Standard < Cost of test file storage on EFS < Cost of test file storage on EBS

**Explanation**:

With Amazon EFS, you pay only for the resources that you use.
The EFS Standard Storage pricing is `$0.30 per GB per month`.
Therefore the cost for storing the test file on EFS is `$0.30` for the month.

For EBS General Purpose SSD (gp2) volumes, the charges are `$0.10 per GB-month of provisioned storage`. Therefore, for a provisioned storage of 100GB for this use-case, the monthly cost on EBS is $0.10\*100 = `$10`. This cost is irrespective of how much storage is actually consumed by the test file.

For S3 Standard storage, the pricing is `$0.023 per GB per month`. Therefore, the monthly storage cost on S3 for the test file is `$0.023`.

Therefore this is the correct option.

---
