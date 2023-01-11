# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Snow Family: Overview](#aws-snow-family-overview)
- [AWS Snow Family: Data Migration](#aws-snow-family-data-migration)
  - [AWS Snow: The Business Case - Why use AWS Snow for Data Migration?](#aws-snow-the-business-case---why-use-aws-snow-for-data-migration)
  - [AWS Snow Family: Devices for Data Migration](#aws-snow-family-devices-for-data-migration)
    - [AWS Snowball Edge](#aws-snowball-edge)
    - [AWS Snowcone](#aws-snowcone)
    - [AWS Snowmobile](#aws-snowmobile)
  - [AWS Snow Family: Edge Computing](#aws-snow-family-edge-computing)
    - [Edge Computing: Overview](#edge-computing-overview)
    - [Edge Computing: Devices](#edge-computing-devices)
- [AWS Snow Family: Workflow](#aws-snow-family-workflow)
  - [Workflow: Snowball](#workflow-snowball)
  - [Workflow: Snowcone](#workflow-snowcone)
  - [Workflow: Snowmobile](#workflow-snowmobile)
- [AWS OpsHub](#aws-opshub)
- [AWS Snow Family: Solutions Architectures](#aws-snow-family-solutions-architectures)
  - [Snowball into Glacier](#snowball-into-glacier)
- [References](#references)

---

# AWS Snow Family: Overview

The AWS Snow Family is a collection of highly-secure, portable devices that allow you to move petabytes of data to and from AWS, or collect and process data at the edge.

- **For Data Migration: We have three different types of devices**

  - AWS Snowcone
  - AWS Snowball Edge
  - AWS Snowmobile

- **Edge Computing**

  - AWS Snowcone
  - AWS Snowball Edge

---

# AWS Snow Family: Data Migration

## AWS Snow: The Business Case - Why use AWS Snow for Data Migration?

**Problem Statement:**

The following table shows a brief estimation of data to transfer against data transfer rates and the time taken to complete the job:

| Data to Transfer | 100 Mbps | 1 Gbps   | 10 Gbps  |
| ---------------- | -------- | -------- | -------- |
| 10 TB            | 12 days  | 30 hours | 3 hours  |
| 100 TB           | 124 days | 12 days  | 30 hours |
| 1 PB             | 3 years  | 124 days | 12 days  |

As we can see, there are some Challenges:

- Limited connectivity or unstable connection
- Limited (limited by ISP) / shared (with office) bandwidth
- High network cost
- Transferring data over bandwidth costs money

All these above cases, make a case for the AWS Snow Family's use for Data Migrations.

**Solution:** Use the appropriate AWS Snow Family device for the use case

- The AWS Snow Family are offline devices that allow you to perform data migrations.
- AWS will send you an actual physical device by .
- You load your data onto it and ship it back to AWS (to an AWS facility).
- AWS plugs the data back into their infrastructure.
- The data will then be imported into or exported to something, for e.g. a S3 bucket.
- **_Rule of Thumb_**: If it takes more than a week to transfer data over the network, use Snowball devices!

---

## AWS Snow Family: Devices for Data Migration

### AWS Snowball Edge

- Physical data transport solution: Move TBs or PBs of data in or out of AWS
- Alternative to moving data over the network (and paying network fees)
- Pay per data transfer job
- Interface provides block storage and Amazon S3-compatible object storage

- Comes in two flavours:

  - **Snowball Edge Storage Optimized**: **`80 TB of HDD Capacity`** for Block Volume and S3 compatible object storage

  - **Snowball Edge Compute Optimized**: **`42 TB of HDD Capacity`** for block volume and S3 compatible object storage

- **Storage Clustering**: Put upto `15` Snowball Edge devices together to increase storage size.

- Use Cases:

  - Large data Cloud migrations
  - Data Center decommission
  - Disaster recovery

---

### AWS Snowcone

- Small, portable computing, anywhere, rugger and secure, withstands harsh environments
- Light (4.5 pounds, 2.1 kg)
- Device used for edge computing, storage and data transfer
- 8 TBs of usable storage
- Must provide your own battery / cables
- Can be sent back to AWS offline, OR connect it to internet and use **[AWS DataSync](../datasync)** to send data (DataSync agent is pre-installed)

- Use Cases:

  - Use Snowcone where Snowball does not fit (space-constrained environment)
  - Can be used for mobile operations: e.g. mounted on a drone, on a movie set

---

### AWS Snowmobile

- Migrate or transport exabyte-scale datasets into and out of AWS. (1 EB = 1000 PB = 1,000,000 TB)
- Transfer up to `100 PB` per Snowmobile, a 45-foot-long ruggedized shipping container pulled by a semi-trailer truck.
- High Security: Temperature controlled, GPS, 24/7 video surveillance
- Better than AWS Snowball if you transfer more than 10 PB

- Use Cases: Data transfer for huge, PB scale ...

  - Video libraries
  - Genomic sequences
  - Seismic data
  - Satellite images

---

## AWS Snow Family: Edge Computing

### Edge Computing: Overview

- Edge computing is processing data while it's being created on **an edge location**.
- An edge location is a place which does NOT have or has LIMITED:

  - Internet
  - Computing Power

- Examples: A truck on the road, a ship in the sea, a mining station underground etc.
- We setup a **Snowball Edge** / **Snowcone** device to do edge computing

- Use cases of Edge computing:

  - Preprocess data
  - Machine learning at the edge
  - Transcoding media streams

- Eventually (if need be) we can ship back the device to AWS (for transferring data for example)

---

### Edge Computing: Devices

1. **Snowcone** (smaller)

   - `2 CPUs`, `4 GB RAM`, wired or wireless access
   - USB-C power using a cord or the optional battery

2. **Snowball Edge - Compute Optimized**

   - `52 vCPUs`, `208 GB RAM`
   - Optional GPU (useful for video processing or machine learning)
   - 42 TB usable storage with storage clustering available

3. **Snowball Edge - Storage Optimized**

   - `Up to 40 vCPUs`, `80 GB RAM`
   - `80 TB` of usable Block Storage or Amazon S3-compatible Object storage clustering available

- All of these devices can run EC2 Instances and AWS Lambda functions (using **AWS IoT Greengrass**)

- Long-term deployment options: `1` and `3` years discounted pricing

---

# AWS Snow Family: Workflow

## Workflow: Snowball

1. Request Snowball devices from the AWS console for delivery
2. Install the Snowball Client / AWS OpsHub on your servers
3. Connect the Snowball device to your servers and copy files using the client
4. Ship back the device when you're done (goes to the right AWS facility thanks to an **E Ink** shipping label on the device)
5. Data will be loaded into an S3 bucket
6. Snowball is completely wiped

---

## Workflow: Snowcone

1. Order one or more AWS Snowcone devices in the **[AWS Snow Family console](https://console.aws.amazon.com/importexport/home)** based on how much data you need to transfer along with the compute performance required. The buckets, data, and Amazon EC2 AMIs you select are automatically configured, encrypted, and pre-installed on your devices.
2. Once a device arrives, you connect it to your on-premises network and set the IP address either manually or automatically with DHCP.
3. You need to download and install **AWS OpsHub**, a GUI-based application for managing the Snowcone device, on any Windows, Linux, or MacOS client machine, such as a laptop. Then open AWS OpsHub and unlock the device. You will then be presented with a dashboard showing your device and its system metrics.
4. You can then launch instances to deploy your edge applications or migrate your data to the device with just a few clicks in **AWS OpsHub**.
5. You can transfer data online from and to your device using **AWS DataSync**.
6. Ship back the device when you're done (goes to the right AWS facility thanks to an **E Ink** shipping label on the device)
7. Data will be loaded onto the configured S3 bucket in case you did not do the data transfer
8. Snowcone will be completely wiped

---

## Workflow: Snowmobile

1. Place an inquiry for a Snowmobile
2. AWS personnel will contact you to determine requirements for deploying a Snowmobile and schedule the job, and will drive the required Snowmobile equipment to your site.
3. Once on site, they will connect it to your local network so that you can use your high-speed local connection to quickly transfer data from your local storage appliances or servers to the Snowmobile.
4. After the data transfer is complete, the Snowmobile will be returned to your designated AWS region where your data will be uploaded into the AWS storage services you have selected, such as S3 or Glacier.
5. AWS will work with you to validate that your data has been successfully uploaded in case of Snowmobile

---

# AWS OpsHub

AWS OpsHub is an application for managing the AWS Snow Family devices, including AWS Snowcone and Snowcone SSD.

- Historically, to use Snow Family devices you needed a CLI (Command Line Interface) tool which was a pain point
- Today, you can use AWS OpsHub which is an application you can install on your computer to manage your Snow Family Device
  - Unlocking and configuring single or clustered devices
  - Transferring files
  - Launching and managing instances running on Snow Family devices
  - Monitor device metrics (storage capacity, active instances on your device)
  - Launch compatible AWS services on your devices (e.g. EC2 Instances, DataSync, Network File System)

---

# AWS Snow Family: Solutions Architectures

## Snowball into Glacier

- Snowball cannot import to Glacier directly
- You must use Amazon S3 first, in combination with a S3 Lifecycle policy that transitions these objects into Amazon Glacier

---

# References

- [Snowball Edge Devices](https://docs.aws.amazon.com/snowball/latest/developer-guide/device-differences.html)
