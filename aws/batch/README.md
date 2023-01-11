# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Batch](#aws-batch)
- [Batch vs Lambda](#batch-vs-lambda)

---

# AWS Batch

- Fully managed batch processing at any scale
- Efficiently run 100,000s of computing batch jobs on AWS
- A batch job is a job with a start and end time (opposed to continuous)
- Batch will dynamically launch EC2 On-Demand or Spot Instances
- AWS Batch provisions the right amount of compute / memory
- You submit or schedule Batch jobs and AWS Batch does the rest
- Batch jobs are defined as Docker Images and run on ECS
- Helpful for cost optimizations and focussing less on the infrastructure

---

# Batch vs Lambda

| Batch                                                  | Lambda                               |
| ------------------------------------------------------ | ------------------------------------ |
| No time limit                                          | Time Limit: 15 mins                  |
| Any runtime as long as it's packaged as a Docker image | Limited runtimes                     |
| Rely on EBS / Instance store for disk space            | Limited temporary disk space (10 GB) |
| Relies on EC2 instances (managed by AWS)               | Serverless                           |

---
