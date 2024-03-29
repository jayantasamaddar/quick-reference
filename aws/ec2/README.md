# Table of Contents

- [Table of Contents](#table-of-contents)
- [EC2: Overview](#ec2-overview)
- [EC2: Sizing and Configuration Options](#ec2-sizing-and-configuration-options)
- [EC2: User Data](#ec2-user-data)
- [EC2 Instance Types: Brief Overview](#ec2-instance-types-brief-overview)
- [EC2 Instance Types - Detailed Overview](#ec2-instance-types---detailed-overview)
  - [EC2 Instance Types: Naming Convention](#ec2-instance-types-naming-convention)
  - [EC2 Instance Types: General Purpose](#ec2-instance-types-general-purpose)
  - [EC2 Instance Types: Compute Optimized](#ec2-instance-types-compute-optimized)
  - [EC2 Instance Types: Memory Optimized](#ec2-instance-types-memory-optimized)
  - [EC2 Instance Types: Storage Optimized](#ec2-instance-types-storage-optimized)
- [EC2: Launching an EC2 Instance using the Console](#ec2-launching-an-ec2-instance-using-the-console)
- [EC2: Instance Information](#ec2-instance-information)
- [EC2: Security Groups](#ec2-security-groups)
  - [Overview](#overview)
  - [Referencing other Security Groups](#referencing-other-security-groups)
  - [Overview of Classic Ports](#overview-of-classic-ports)
  - [Security Groups: Rules](#security-groups-rules)
- [SSH](#ssh)
  - [SSH: Overview](#ssh-overview)
  - [SSH: Login using Linux or Mac](#ssh-login-using-linux-or-mac)
  - [SSH: Troubleshooting](#ssh-troubleshooting)
  - [SSH: Login via EC2 Instance Connect](#ssh-login-via-ec2-instance-connect)
    - [EC2 Instance Connect: Overview](#ec2-instance-connect-overview)
    - [EC2 Instance Connect: Login](#ec2-instance-connect-login)
    - [EC2 Instance Connect: Troubleshooting](#ec2-instance-connect-troubleshooting)
- [EC2: Instance Roles](#ec2-instance-roles)
- [EC2: Instance Tenancy](#ec2-instance-tenancy)
- [EC2: Instance Purchasing Options](#ec2-instance-purchasing-options)
  - [EC2 On-Demand](#ec2-on-demand)
  - [EC2 Reserved Instances](#ec2-reserved-instances)
  - [EC2 Savings Plan](#ec2-savings-plan)
  - [EC2 Spot Instances](#ec2-spot-instances)
    - [Spot Instances: Overview](#spot-instances-overview)
    - [Spot Instances: Launch a Spot Instance](#spot-instances-launch-a-spot-instance)
    - [Spot Instances: Stop a Spot Instance](#spot-instances-stop-a-spot-instance)
    - [Spot Instances: Start a Spot Instance](#spot-instances-start-a-spot-instance)
    - [Spot Instances: Terminate a Spot Instance](#spot-instances-terminate-a-spot-instance)
    - [Spot Instances: Cancel a Spot Instance Request](#spot-instances-cancel-a-spot-instance-request)
    - [Spot Fleets](#spot-fleets)
  - [EC2 Dedicated Hosts](#ec2-dedicated-hosts)
  - [EC2 Dedicated Instances](#ec2-dedicated-instances)
  - [EC2 Capacity Reservations](#ec2-capacity-reservations)
  - [Price Comparisons](#price-comparisons)
- [EC2 Instance: Storage](#ec2-instance-storage)
  - [Elastic Block Store (EBS) Volumes](#elastic-block-store-ebs-volumes)
    - [EBS: Overview](#ebs-overview)
    - [EBS: Creating and Assigning a Volume](#ebs-creating-and-assigning-a-volume)
      - [Root Volume](#root-volume)
      - [New Unassigned Volume](#new-unassigned-volume)
    - [EBS: Volume Types](#ebs-volume-types)
      - [General Purpose SSD](#general-purpose-ssd)
      - [Provisioned IOPS (PIOPS) SSDs](#provisioned-iops-piops-ssds)
      - [Hard Disk Drives (HDD)](#hard-disk-drives-hdd)
    - [EBS: Snapshots](#ebs-snapshots)
      - [EBS Snapshots: Overview](#ebs-snapshots-overview)
      - [EBS Snapshots: Features](#ebs-snapshots-features)
      - [EBS Snapshots: Creating a Snapshot](#ebs-snapshots-creating-a-snapshot)
      - [EBS Snapshots: Copying Snapshots to Another Region](#ebs-snapshots-copying-snapshots-to-another-region)
      - [EBS Snapshots: Create Volume from Snapshot](#ebs-snapshots-create-volume-from-snapshot)
      - [EBS Snapshots: Recycle Bin](#ebs-snapshots-recycle-bin)
      - [EBS Snapshots: Archiving](#ebs-snapshots-archiving)
    - [EBS: Multi-Attach - io1 / io2 family](#ebs-multi-attach---io1--io2-family)
    - [EBS: Encryption](#ebs-encryption)
    - [EBS: RAID Configuration Options](#ebs-raid-configuration-options)
  - [AMI](#ami)
    - [AMI: Overview](#ami-overview)
    - [AMI: Creating an AMI](#ami-creating-an-ami)
    - [AMI: Copying and Sharing AMIs](#ami-copying-and-sharing-amis)
    - [AMI: Golden AMI](#ami-golden-ami)
  - [EC2 Instance Store](#ec2-instance-store)
  - [Amazon Elastic File System (EFS)](#amazon-elastic-file-system-efs)
    - [EFS: Overview](#efs-overview)
    - [EFS: Create a File System](#efs-create-a-file-system)
    - [EFS: Mounting the File System to an EC2 Instance](#efs-mounting-the-file-system-to-an-ec2-instance)
  - [EBS vs EFS](#ebs-vs-efs)
- [EC2 Instance Lifecycle](#ec2-instance-lifecycle)
  - [EC2 Instance Lifecycle: Overview](#ec2-instance-lifecycle-overview)
  - [EC2 Instance Lifecycle: Stop](#ec2-instance-lifecycle-stop)
    - [Stopping an Instance: Overview](#stopping-an-instance-overview)
    - [Stopping an Instance: Stop Protection](#stopping-an-instance-stop-protection)
  - [EC2 Instance Lifecycle: Hibernate](#ec2-instance-lifecycle-hibernate)
- [EC2 Instance Metadata](#ec2-instance-metadata)
- [EC2: Instance Recovery](#ec2-instance-recovery)
- [EC2: Networking](#ec2-networking)
  - [Public vs Private vs Elastic IP](#public-vs-private-vs-elastic-ip)
  - [EC2: Placement Groups](#ec2-placement-groups)
  - [Elastic Network Interfaces (ENI)](#elastic-network-interfaces-eni)
  - [Networking Costs in AWS](#networking-costs-in-aws)
- [EC2 CLI Commands](#ec2-cli-commands)
- [FAQs](#faqs)
- [References](#references)

---

# EC2: Overview

**Elastic Compute Cloud** or simply **EC2** is one of the most popular AWS offerings. EC2 is an Infrastructure-as-a-Service where you can do the following:

- Rent virtual machines called EC2 Instances.
- Storing data on virtual drives called Elastic Block Stores (EBS)
- Distribute Load across machines using Elastic Load Balancers (ELB)
- Scale the services using an Auto-Scaling Group (ASG)

Knowing how EC2 works is fundamental to understand how the Cloud works.

---

# EC2: Sizing and Configuration Options

So what are the configuration options for the EC2 Instances that we can rent from AWS?

- **Operating System**: Linux, Windows or MacOS.
- **CPU**: Power and Cores
- **Memory**: RAM
- **Storage**: Disk Space that is Network-attached (**EBS** & **EFS**) or Hardware-attached (EC2 Instance Store)
- **Network Card**: Speed of the Card, Public IP Address
- **Firewall Rules**: Security group
- **Bootstrap Script** (Configure at first launch): EC2 User Data

There are more configuration options in EC2 Instances but at the core of it, all we need to know is we can choose how we want our Virtual Machine setup. That is the power of the Cloud.

---

# EC2: User Data

It is possible to boostrap our EC2 Instance using EC2 User Data script. Boostrapping means launching commands when a machine starts, i.e. the script is only run once, when the instance first starts and never be run again.

The EC2 User Data has a very specific purpose - It is to automate boot tasks, hence the name bootstrapping. The tasks we might want to automate are:

- Installing Updates
- Installing Software
- Download common files from the internet
- Anything you can think of that can be run on a virtual machine

> **Note:** The EC2 User Data script runs with the Root User. So any command you have, will have the `sudo` rights.

---

# EC2 Instance Types: Brief Overview

What type of instances do we get for EC2?

We have hundreds of types of instances for EC2, but here are some examples:

| Instance    | vCPU | Mem (GiB) | Storage          | Network Performance | EBS Bandwidth (Mbps) |
| ----------- | ---- | --------- | ---------------- | ------------------- | -------------------- |
| t2.micro    | 1    | 1         | EBS-Only         | Low to Moderate     |                      |
| t2-xlarge   | 4    | 16        | EBS-Only         | Moderate            |                      |
| c5d.4xlarge | 16   | 32        | 1 x 400 NVMe SSD | Upto 10 Gbps        | 4,750                |
| r5.16xlarge | 64   | 512       | EBS-Only         | 20 Gbps             | 13,600               |
| m5.8xlarge  | 32   | 128       | EBS-Only         | 10 Gbps             | 6,800                |

750 hours per month of t2.micro is available at the Free Tier.

---

# [EC2 Instance Types - Detailed Overview](https://aws.amazon.com/ec2/instance-types/)

You can use different types of EC2 Instances that are optimized for different use cases.

## EC2 Instance Types: Naming Convention

For an Instance Type of `m5.2xlarge`

- **`m`** - Instance Class. In this case, a General Purpose type of an instance.
- **`5`** - Generation of the Instance Class. So as AWS improves the hardware over time, AWS will update this value.
- `2xlarge` - Size within the Instance Class. Values can be `nano`, `micro`, `small`, `medium`, `4xlarge` so on. This refers to the storage, CPU and RAM available to the Instance.

---

## EC2 Instance Types: General Purpose

- Great for a diversity of workloads such as web servers or code repositories.
- Balance between resources: **Compute**, **Memory**, **Networking**
- The Free tier instance type available, `t2.micro` is a General Purpose EC2 Instance.

## EC2 Instance Types: Compute Optimized

- Great for a compute intensive workloads that require high performance processors:
  - Batch processing workloads
  - Media transcoding
  - High performance web servers
  - High performance computing (HPC)
  - Scientific modelling and Machine learning
  - Dedicating gaming servers

## EC2 Instance Types: Memory Optimized

- Fast performance for workloads that process large data sets in memory.
- Use cases:
  - High performance relational/non-relational databases
  - Distributed web scale cache stores
  - In-memory databases optimized for BI (Business Intelligence)
  - Applications performing real time processing of big unstructured data

## EC2 Instance Types: Storage Optimized

- Great for storage-intensive tasks that require high sequential read and write access to large data sets on local storage.
- Use cases:
  - High frequency online transaction processing (OLTP) systems
  - Relational & NoSQL Databases
  - Cache for in-memory databases (E.g. Redis)
  - Data warehousing applications
  - Distributed file systems

---

# EC2: Launching an EC2 Instance using the Console

Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below.

- [Open the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Home:)
- [Open the Instances page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:)
- Click on the [Launch Instances](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LaunchInstances:) Button
- Choose Configuration Options for the Virtual Machine

  - **Name**: Choose a Name for the EC2 Instance

  - **AMI (Amazon Machine Image)**: An AMI contains the software configuration (operating system, application server, and applications) required to launch your instance.

    - Options for Free Tier: `Amazon Linux`, `Ubuntu`, `Microsoft Windows Server`, `RHEL`, `SUSE Linux`, `Debian`
    - Others: `MacOS`
    - **Architecture**: An architecture for the AMI: `64-bit (x86)`, `64-bit (Arm)`

  - **Instance Type**: Choose `t2.micro` for Free tier or any other as required.

  - **Create a Key-pair (SSH public-private key)**. Choose the RSA algorithm for Key-pair encryption type and the `.pem` format for Mac, Linux or Windows 10 as the private key file format. For lower versions of Windows < 10, use the `.ppk`

  - **Network Settings**: Network settings allow an EC2 Instance to be connected to via SSH or RDP and add Security Group rules to allow HTTPS and HTTPS traffic from the internet.

    - Create a Security Group with the following Settings:
      - Allow SSH traffic from (Options: `Anywhere 0.0.0.0/0`, `Custom` and `My IP`)
      - Allow HTTPS traffic from the Internet
      - Allow HTTP traffic from the Internet

  - **Storage (Volumes)**: Specify the storage options for the instance.

    - **EBS Volumes**

      - **Size**: The size of the volume, in GiB. Default is `8` for `gp2` and `gp3`.
        - `io1` and `io2`: 4 GiB to 16,384 GiB
        - `gp2` and `gp3`: 1 GiB to 16,384 GiB
        - `st1` and `sc1`: 125 GiB to 16,384 GiB
        - Magnetic (`standard`): 1 GiB to 1024 GiB
      - **Volume type**:
        - General Purpose SSDs: `gp2` or `gp3`. Default is `gp2`.
        - Provisioned IOPS SSDs: `io1` or `io2`,
        - Cold HDD: `sc1`,
        - Throughput Optimized HDD: `st1`,
        - Magnetic: `standard`
      - **IOPS**: The requested number of I/O operations per second that the volume can support. Default is `3000`. Learn more at [I/O characteristics and monitoring](https://docs.aws.amazon.com/console/ec2/ebs/volumes/types).
      - **Delete on Termination**: Whether to delete EBS storage on termination of EC2 Instance. Default is `Yes`.
      - **Encrypted**: Whether Volume is encrypted or not. Default is: `Not encrypted`.
      - **KMS key**: KMS keys are only applicable when encryption is set on this volume. Amazon EBS encryption uses AWS KMS keys when creating encrypted volumes and snapshots. EBS encrypts your volume with a data key using the industry-standard AES-256 algorithm. Your data key is stored on disk with your encrypted data, but not before EBS encrypts it with your KMS key. Your data key never appears on disk in plaintext. The same data key is shared by snapshots of the volume and any subsequent volumes created from those snapshots.
      - **Throughput**: Throughput that the volume can support specified for Streaming Optimized volumes. Default is `100` for `gp2` and `125` for `gp3`.

    - **Advanced Details**:

      - **Purchasing option**: Request Spot Instances at the Spot price, capped at the On-Demand price. Spot Instances are unused EC2 instances that are available for less than the On-Demand price. Spot Instances can be interrupted, so use them for applications with flexible run times and for applications that can be interrupted.

        - **Maximum price** (Only for Spot Instances): The maximum price per instance hour that you’re willing to pay. If you do not specify a value, your maximum price is the value specified in the launch template. If the launch template does not specify a maximum price, you are charged the Spot price, capped at the On-Demand price.

        - **Request type** (Only for Spot Instances): Specify a persistent request so that interrupted Spot Instances are requested again. If you do not specify a request type, EC2 uses the type specified in the launch template. If the launch template does not specify a request type, EC2 defaults to a one-time request. Persistent requests are only supported when Interruption behavior is set to either hibernate or stop.

        - **Valid to** (Only for Spot Instances): The expiration date for a persistent Spot request. Valid only for persistent requests. If you do not specify a date, EC2 uses the date specified in the launch template. If the launch template does not specify an expiration date, a persistent request remains active until you cancel it.

        - **Interruption behaviour** (Only for Spot Instances): The behavior when a Spot Instance is interrupted. For persistent requests, valid values are `stop` and `hibernate`. For one-time requests, only `terminate` is valid. If you do not specify a value, EC2 terminates the instance on interruption. Charges for EBS volume storage apply when an instance is stopped. If no value is specified the value of the source template will still be used. If the template value is not specified then the default API value will be used.

        - **Block duration** (Only for Spot Instances): Specify a Spot block of up to `6 hours` to prevent Spot Instance interruptions. Valid only for one-time requests. The valid values are `60`, `120`, `180`, `240`, `300`, or `360` minutes. If you do not specify a value, EC2 uses the value in the launch template. If you do not specify a value in the launch template, your Spot Instance can be interrupted.

      - **Domain join directory**: Domain join enables you to join your instance to a directory you've defined in AWS Directory Service, giving you a single sign-on and centralized management experience across a network of Windows and Linux instances. To join a domain, you must have an IAM role with the required permissions. Only active or impaired directories appear in the list.

      - **IAM instance profile**: The IAM instance profile for the instance If no value is specified the value of the source template will still be used. If the template value is not specified then the default API value will be used.

      - **User data**: Specify user data to provide commands or a command script to run when you first launch your instance and only once in the whole lifecycle of the instance. Input is base64 encoded when you launch your instance unless you select the **`User data has already been base64 encoded`** check box.

      Example:

      ```s
      #!/bin/bash
      # Use this for your user data (script from top to bottom)
      # install httpd (Linux 2 version)
      yum update -y
      yum install -y httpd
      systemctl start httpd
      systemctl enable httpd
      echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
      ```

    - **Summary**:
      - **Number of Instances**: Select the number of instances to launch with the setting. Default: `1`

- Once we are happy with our configuration, we can click **Launch Instance**.
- Click [View All Instances](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:)
- It may take a while and the Instance status may show as `Pending` initially, but the Instance status should eventually be `Running` to indicate the EC2 Instance is up and running.

---

# EC2: Instance Information

The following information is shown for every instance:

- **Instance ID**: Unique Identifier for the Instance
- **Public IPv4 Address**: What we can use to access our EC2 Instance. If we selected `Allow HTTP traffic from the Internet` and provided the **`User data`** as above to launch a web server, we can run a `curl http://13.233.28.191` to view the webpage.

  > **Note:** If an Instance is Stopped and Started again, AWS may change the **Public IPv4 Address**.

- **Private IPv4 Address**: What other AWS services can use to access the Instance internally, i.e. within the AWS network.

  > **Note:** Even if an Instance is Stopped and Started again, the **Private IPv4 Address** remains unchanged.

---

# EC2: Security Groups

## Overview

Security Groups are fundamental to network security in AWS Cloud.

**Overview:**

- They control how traffic is allowed in and out of our EC2 Instances.
- Security Groups only contain **_allow_** rules.
- Security Group rules can reference by IP or by other Security Groups.
- Security Groups act as a Firewall on EC2 Instances.
- They regulate:
  - Access to Ports
  - Authorized IP Ranges - IPv4 and IPv6
  - Control the inbound network (ingress)
  - Control the outbound network (egress)
- A single Security Group can be attached to multiple EC2 Instances.
- Security Groups are locked down to a Region / VPC combination.
- Security Groups live "outside" the EC2. It is not installed on the EC2 Instance but is a Firewall that lives outside.
- If your application is not accessible (Time out), then it's a Security Group issue. However, if you receive a **"Connection Refused"** error, then it's an application error or it's not launched yet.
- All inbound traffic is blocked by default.
- All outbound traffic is authorized by default.

**Example:**

| Type            | Protocol | Port Range | Source            | Description    |
| --------------- | -------- | ---------- | ----------------- | -------------- |
| HTTP            | TCP      | 80         | 0.0.0.0/0         | test http page |
| SSH             | TCP      | 22         | 122.149.196.85/32 |                |
| Custom TCP Rule | TCP      | 4567       | 0.0.0.0           | java app       |

> **Note:** It is considered Best practice to maintain one separate security group for SSH access as it is a complex kind of connection and it will be easier to diagnose if something goes wrong.

---

## Referencing other Security Groups

![Referencing other Security Groups](assets/referencing-other-security-groups.png)

---

## Overview of Classic Ports

| Port     | Protcol                                      | Purpose                              |
| -------- | -------------------------------------------- | ------------------------------------ |
| **22**   | SSH (Secure Shell)                           | Log into a Linux Instance            |
| **21**   | FTP (File Transfer Protocol)                 | Upload files into a file share       |
| **22**   | SFTP (Secure File Transfer Protocol)         | Upload files using SSH               |
| **80**   | HTTP (Hyper Text Transfer Protocol)          | Connect over an unsecured connection |
| **443**  | HTTPS (Hyper Text Transfer Protocol Secured) | Connect over a secured connection    |
| **3389** | RDP (Remote Desktop Protocol)                | Log into a Windows Instance          |

---

## Security Groups: Rules

We can visit the [Security Groups](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#SecurityGroups:) from the EC2 Console's **Network & Security** section.

Here we can, Create new Security Groups, Edit or View existing Security Groups.

Each Security Group has an Inbound and an Outbound Rule

- **Inbound Rules**: These allow connectivity to the EC2 Instance
- **Outbound Rules**: These allow connectivity from the EC2 Instance

---

# SSH

## SSH: Overview

How would you connect inside of your servers to perform some maintenance or action? We can do so by using SSH. The Secure Shell Protocol (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network.

Based on the operating system you have on your computer, you have different ways of achieving it.

- **For Linux, Mac and Windows 10+ users** - SSH is available via a Command Line Interface utility tool available with the same name (`ssh`). SSH is the network protocol, while `ssh` a CLI tool with the same name exists on Linux, Mac and Windows 10+.
- **For Windows users before Windows 10** - You can use a tool called **PuTTY** which is an SSH client. **PuTTY** is also available for all versions of Windows including Windows 10+.

---

## SSH: Login using Linux or Mac

**Requirements:**

- The `.pem` or `.ppk` containing the private key that we downloaded during the setup of the EC2 Instance is what we will use to login via SSH.
- A running EC2 Instance.
- The Public IPv4 Address of the EC2 Instance. This can be found in the EC2 Console's Instance page.
- The Security settings of the EC2 Instance should have PORT 22 allowing ingress from 0.0.0.0/0

**Steps to Connect:**

1. If your instance name contains a space, the `.pem` or `.ppk` file that is downloaded will have those spaces in the filename. Remove the spaces in the filename.

2. Move the key to a folder of choice. A best practice is keeping them in the `.ssh` folder in Linux based distros. So you may want to run:

   ```s
   mv ~/Downloads/[ privatekey-file ] ~/.ssh
   ```

3. We can move into the `.ssh` folder using `cd .ssh` and then run the following syntax:

   ```s
   ssh -i [ privatekey-file ] [ AMI User ]@[ EC2 Public IPv4 Address ]
   ```

   By default, the `Amazon Linux 2 AMI` has already set up an user for us, called `ec2-user`. We can create more users once we log in, but for the first time we login, we have to use the `ec2-user`.

   So the first login via SSH might look like:

   ```s
   ssh -i ec2-playground.pem ec2-user@13.233.28.191
   ```

4. You might get the following error:

   ```s
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   Permissions 0666 for 'ec2-playground.pem' are too open.
   It is required that your private key files are NOT accessible by others.
   This private key will be ignored.
   Load key "ec2-playground.pem": bad permissions
   ec2-user@3.110.132.159: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
   ```

   This happens because the file mode has permissions that can make it accessible and may be changed by others because it may have write permissions.

   We can fix this by running:

   ```s
   chmod 400 ec2-playground.pem
   ```

   This makes it only readable by the current user.

   Now if we try to login using `ssh -i ec2-playground.pem ec2-user@13.233.28.191` we should be able to see the successful login message:

   ```s
   Last login: Wed Nov  9 06:36:09 2022 from 49.37.47.157

        __|  __|_  )
        _|  (     /   Amazon Linux 2 AMI
        ___|\___|___|

    https://aws.amazon.com/amazon-linux-2/
    [ec2-user@ip-13-233-28-191 ~]$
   ```

---

## SSH: Troubleshooting

1. **There's a connection timeout**

   This is a security group issue. Any timeout (not just for SSH) is related to security groups or a firewall. Ensure your security group looks like this and correctly assigned to your EC2 instance.

2. **There's still a connection timeout issue**

   If your security group is properly configured as above, and you still have connection timeout issues, then that means a corporate firewall or a personal firewall is blocking the connection. Please use [EC2 Instance Connect](#ssh-ec2-instance-connect) as described in the next section.

3. **SSH does not work on Windows**

   If it says: `ssh command not found`, that means you have to use **PuTTY**.

   Try using PuTTY. If things don't work, please use EC2 Instance Connect.

4. **There's a connection refused**

   This means the instance is reachable, but no SSH utility is running on the instance

   - Try to restart the instance

   - If it doesn't work, terminate the instance and create a new one. Make sure you're using **Amazon Linux 2**

5. **`Permission denied (publickey,gssapi-keyex,gssapi-with-mic)`**

   This means either two things:

   - You are using the wrong security key or not using a security key. Please look at your EC2 instance configuration to make sure you have assigned the correct key to it.

   - You are using the wrong user. Make sure you have started an **Amazon Linux 2 EC2 instance**, and make sure you're using the user **ec2-user**. This is something you specify when doing `ec2-user@<public-ip>` (ex: `ec2-user@35.180.242.162`) in your SSH command or your PuTTY configuration.

6. **Nothing is working - "aaaahhhhhh"**

   Don't panic. Use **[EC2 Instance Connect](#ssh-ec2-instance-connect)** from the next section.

7. **I was able to connect yesterday, but today I can't**

   This is probably because you have stopped your EC2 instance and then started it again today. When you do so, the public IP of your EC2 instance will change. Therefore, in your command, or PuTTY configuration, please make sure to edit and save the new public IP.

---

## SSH: Login via EC2 Instance Connect

### EC2 Instance Connect: Overview

**EC2 Instance Connect** is an OS agnostic way of connecting to EC2 Instances via SSH Protocol through the web browser instead of using the `ssh` CLI tool or `PuTTY`.

With EC2 Instance Connect, you can control SSH access to your instances using AWS Identity and Access Management (IAM) policies as well as audit connection requests with AWS CloudTrail events. In addition, you can leverage your existing SSH keys or further enhance your security posture by generating one-time use SSH keys each time an authorized user connects. Instance Connect works with any SSH client, or you can easily connect to your instances from a new browser-based SSH experience in the EC2 console.

With the EC2 Instance Connect, a temporary SSH key is created at every login and thus eliminates the necessity of managing SSH keys.

---

### EC2 Instance Connect: Login

- Go the [Instances Page in the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:).
- Select the EC2 Instance and click **Connect**.
- Click to Select the EC2 Instance Connect Tab (Default: Selected)
- By default the `ec2-user` is entered as the User name. So we can simply leave it as it is, at least during our initial login. We may also override this with an existing user.
- Click on **Connect** to connect to the EC2 Instance running the AMI. This opens a new tab.
- If the Login welcome message shows, that means you are now connected!

---

### EC2 Instance Connect: Troubleshooting

1. **There was a problem connecting to your instance**

   This happens because there was a problem establishing a connection because the Security Group Inbound Rule didn't include the PORT 22. If the problem persists, open both the PORT 22 for both IPv4 and IPv6 addresses.

---

# EC2: Instance Roles

As a rule of thumb, never ever enter your Personal Access Credentials into an EC2 Instance. This is because any others logging into the EC2 Instance could retrieve those credentials. Instead, we have to use IAM Roles.

Considering we have a IAM Role created, named **EC2User** that provides the `IAMReadOnlyAccess` permissions to EC2, we need to attach this role to our EC2 Instance to provide it with Credentials.

By default we can check for the Security section of our Instance and see that there is no IAM Role attached.

To fix this, we can select the EC2 Instance and click on **Actions** ---> **Security** ---> **Modify IAM Role**. We can then select the Role: **EC2User** and click **Update IAM Role**.

Now if we run:

```s
aws iam list-users
```

We will get a response with the list of IAM Users as the **`IAMReadOnlyAccess`** permission allows this. If we remove the role, we will not be able to run the IAM read commands anymore.

---

# EC2: Instance Tenancy

- Tenancy defines how EC2 instances are distributed across physical hardware and affects pricing. There are three tenancy options available:

  - **Shared (`default`)**: Multiple AWS accounts may share the same physical hardware.
  - **Dedicated Instance (`dedicated`)**: Your instance runs on single-tenant hardware.
  - **Dedicated Host (host)**: Your instance runs on a physical server with EC2 instance capacity fully dedicated to your use, an isolated server with configurations that you can control.

- When you create a VPC, by default its tenancy attribute is set to `default`.

- When using a Launch Configuration (not Launch Template), the `host` tenancy value cannot be used. Use the `default` or `dedicated` tenancy values only.

- To use a tenancy value of `host`, you must use a Launch Template.

- The following table summarizes the instance placement tenancy of the Auto Scaling instances launched in a VPC.

  | Launch configuration tenancy | VPC tenancy = `default`  | VPC tenancy = `dedicated` |
  | ---------------------------- | ------------------------ | ------------------------- |
  | not specified                | shared-tenancy instances | Dedicated Instances       |
  | `default`                    | shared-tenancy instances | Dedicated Instances       |
  | `dedicated`                  | Dedicated Instances      | Dedicated Instances       |

---

# EC2: Instance Purchasing Options

## EC2 On-Demand

- Pay for What you use
  - Linux or Windows - Billing per second, after the first minute
  - All other Operating Systems - Billing per hour
- Has the highest cost but no upfront payment
- No long-term commitment
- Recommended for short-term and un-interrupted workloads, where you cannot predict how the application will behave.

---

## EC2 Reserved Instances

- Upto 72% Discount compared to On-Demand (Subject to change)
- You reserve specific instance attributes (Instance Type, Region, Tenancy, OS)
- Reservation Period - 1 year (+ discount) or 3 years (+++ discount)
- Payment Options - No Upfront (+), Partially Upfront (++), All Upfront (+++)
- Reserved Instance's Scope - Regional or Zonal (reserve capacity in an Availability Zone)
- Recommended for stead-state usage applications (Databases)
- You can buy or sell in the Reserved Instances Marketplace if you don't need them anymore

There's a specific type of Reserved Instances, called Convertible Reserved Instances

- Can change the EC2 Instance Type, Instance family, OS, Scope and Tenancy
- Upto 66% Discount (Subject to change)

---

## EC2 Savings Plan

- Get a Discount based on Long-term usage (upto 72%, same as Reserved Instances)
- Commit to a certain type of usage ($10/hour for 1 or 3 years)
- Usage beyond the Savings Plan is going to be billed at the On-Demand price
- Locked to a specific Instance family and AWS Region (e.g. `m5` in `us-east-1`)
- Flexible across:
  - Instance Size (e.g. `m5.xlarge`, `m5.2xlarge`)
  - OS (e.g. Linux, Windows and so on)
  - Tenancy (Host, Dedicated, Default)

---

## EC2 Spot Instances

### Spot Instances: Overview

- The MOST cost-efficient instances in AWS.

- Most aggressive discounts: Can get a Discount upto 90% compared to On-demand.

- Define **Max Spot price** and get the instance while `Current spot price < Max Spot Price`

  - The hourly spot price varies based on offer and capacity
  - If the Current Spot price > Max Spot price, you can choose to **`hibernate`**, **`stop`** or **`terminate`** your instance with 2 minutes grace period to decide.

- Other strategy: **Spot Block**

  - Block spot instance for a specified time frame (1 to 6 hours) without interruptions
  - In rare situations, the instance may be reclaimed

  > **Note**: Spot Block is no longer available to new AWS Customers from July 1, 2021 and won't be supported after December 31, 2022.

- Useful for workloads that are resilient to failure

  - **Use Cases**:

    - Batch jobs
    - Data analysis
    - Image processing
    - Any distributed workloads
    - Workloads with a flexible start and end time

  - Not suited for critical jobs or databases

---

### Spot Instances: Launch a Spot Instance

![Spot Lifecycle](assets/spot-lifecycle.png)

To use Spot Instances, you create a **Spot Instance request** that includes some launch specifications.
If capacity is available, Amazon EC2 fulfills your request immediately. Otherwise, Amazon EC2 waits until your request can be fulfilled or until you cancel the request.

A **Spot Instance request** can be in one of the following states:

- `open`: The request is waiting to be fulfilled.
- `active`: The request is fulfilled and has an associated Spot Instance.
- `failed`: The request has one or more bad parameters.
- `closed`: The Spot Instance was interrupted or terminated.
- `disabled`: You stopped the Spot Instance.
- `cancelled`: You canceled the request, or the request expired.

The following illustration represents the transitions between the request states. Notice that the transitions depend on the request type (one-time or persistent).

![Transition between Spot Request States](assets/spot-request-states.png)

With a **Spot Instance request**, we are defining the following:

- **Maximum price**
- **Desired number of instances**
- **Availability Zone**: Select a particular availability zone to launch spot instances in.

  ```json
  {
    "ImageId": "ami-0abcdef1234567890",
    "KeyName": "my-key-pair",
    "SecurityGroupIds": ["sg-1a2b3c4d5e6f7g8h9"],
    "InstanceType": "m5.medium",
    "Placement": {
      "AvailabilityZone": "us-west-2a"
    },
    "IamInstanceProfile": {
      "Arn": "arn:aws:iam::123456789012:instance-profile/my-iam-role"
    }
  }
  ```

- **Subnet**: Launch across all AZs in a Subnet

  - When launching in a default VPC, you can select the Subnet you want to launch in and a default IPv4 Address will be attached.
  - If the VPC is a nondefault VPC, the instance does not receive a public IPv4 address by default.
  - `SubnetId` and `SecurityGroupIds` have to be mentioned as follows:

  ```json
  {
    "ImageId": "ami-0abcdef1234567890",
    "SecurityGroupIds": ["sg-1a2b3c4d5e6f7g8h9"],
    "InstanceType": "m5.medium",
    "SubnetId": "subnet-1a2b3c4d",
    "IamInstanceProfile": {
      "Arn": "arn:aws:iam::123456789012:instance-profile/my-iam-role"
    }
  }
  ```

- **NetworkInterfaces**: To assign a public IPv4 address to an instance in a nondefault VPC, specify the AssociatePublicIpAddress field as shown in the following example.

  - When you specify a network interface, you must include the `SubnetId` and security group IDs as `Groups` using the network interface, rather than using the `SubnetId` and `SecurityGroupIds` fields shown in the previous code block.

  ```json
  {
    "ImageId": "ami-0abcdef1234567890",
    "KeyName": "my-key-pair",
    "InstanceType": "m5.medium",
    "NetworkInterfaces": [
      {
        "DeviceIndex": 0,
        "SubnetId": "subnet-1a2b3c4d5e6f7g8h9",
        "Groups": ["sg-1a2b3c4d5e6f7g8h9"],
        "AssociatePublicIpAddress": true
      }
    ],
    "IamInstanceProfile": {
      "Arn": "arn:aws:iam::123456789012:instance-profile/my-iam-role"
    }
  }
  ```

- **Tenancy**: Launch a dedicated spot instance.

  - A Dedicated Spot Instance must be launched in a VPC.
  - All instance families support Dedicated Spot Instances except T instances.
  - For each supported instance family, only the largest instance size or metal size supports Dedicated Spot Instances.

  ```json
  {
    "ImageId": "ami-0abcdef1234567890",
    "KeyName": "my-key-pair",
    "SecurityGroupIds": ["sg-1a2b3c4d5e6f7g8h9"],
    "InstanceType": "c5.8xlarge",
    "SubnetId": "subnet-1a2b3c4d5e6f7g8h9",
    "Placement": {
      "Tenancy": "dedicated"
    }
  }
  ```

- **Request type**:

  - **One-time**:

    - A one-time Spot Instance request remains active until Amazon EC2 launches the Spot Instance, the request expires, or you cancel the request.
    - If capacity is not available, your Spot Instance is terminated and the Spot Instance request is closed.

  - **Persistent**:

    - A persistent Spot Instance request remains active until it expires or you cancel it, even if the request is fulfilled.
    - If capacity is not available, your Spot Instance is interrupted. After your instance is interrupted, the Spot Instance is automatically started if stopped or resumed if hibernated, as soon as capacity is available again.
    - You can stop a Spot Instance and start it again if capacity is available.
    - If the Spot Instance is terminated (irrespective of whether the Spot Instance is in a stopped or running state), the Spot Instance request is opened again and Amazon EC2 launches a new Spot Instance.
    - If the spot request is persistent and a Spot Instance is stopped, the spot request opens only when you start the Spot Instance.

- **Valid from**: Used to define the start of the Spot Block (to be deprecated on December 31, 2022)
- **Valid until**: Used to define the end of the Spot Block (to be deprecated on December 31, 2022)

---

### Spot Instances: Stop a Spot Instance

If you don’t need your Spot Instances now, but you want to restart them later without losing the data persisted in the Amazon EBS volume, you can stop them. The steps for stopping a Spot Instance are similar to the steps for stopping an On-Demand Instance.

**Limitations:**

- You can **ONLY** stop a Spot Instance if the Spot Instance was launched from a **persistent** Spot Instance request.

- You can **NOT** stop a Spot Instance if the associated Spot Instance request is `cancelled`. When the Spot Instance request is cancelled, you can only terminate the Spot Instance.

- You can **NOT** stop a Spot Instance if it is part of a fleet or launch group, or Availability Zone group.

---

### Spot Instances: Start a Spot Instance

If you don’t need your Spot Instances now, but you want to restart them later without losing the data persisted in the Amazon EBS volume, you can stop them. The steps for stopping a Spot Instance are similar to the steps for stopping an On-Demand Instance.

**Prerequisites:**

You can only start a Spot Instance if:

- You manually stopped the Spot Instance.
- The Spot Instance is an EBS-backed instance.
- Spot Instance capacity is available.
- The Spot price is lower than your maximum price.

**Limitations:**

- You can **NOT** start a Spot Instance if it is part of a fleet or launch group, or Availability Zone group.

---

### Spot Instances: Terminate a Spot Instance

- If you terminate a `running` or `stopped` Spot Instance that was launched by a persistent Spot Instance request, the Spot Instance request transitions to the `open` state so that a new Spot Instance can be launched. To ensure that no new Spot Instance is launched, you must first **[Cancel the Spot Instance request](#spot-instances-cancel-the-spot-instance-request)**.

- If you cancel an `active` Spot Instance request that has a `running` Spot Instance, the running Spot Instance is **NOT automatically** `terminated`. **You must manually terminate the Spot Instance**.

- If you cancel a `disabled` Spot Instance request that has a `stopped` Spot Instance, the stopped Spot Instance is automatically `terminated` by the Amazon EC2 Spot service. There might be a short lag between when you cancel the Spot Instance request and when the Spot service terminates the Spot Instance.

---

### Spot Instances: Cancel a Spot Instance Request

If you no longer want your Spot Instance request, you can cancel it. You can only cancel Spot Instance requests that are in the `open`, `active`, or `disabled` state.

- Your Spot Instance request is `open` when your request has not yet been fulfilled and no instances have been launched.

- Your Spot Instance request is `active` when your request has been fulfilled and Spot Instances have launched as a result.

- Your Spot Instance request is `disabled` when you stop your Spot Instance.

> **Note**: If your Spot Instance request is `active` and has an associated running Spot Instance, cancelling the request does not terminate the instance. **You must manually terminate the Spot Instance**.

---

### Spot Fleets

- Spot Fleets: Set of Spot Instances + (optional) On-Demand Instances

- The Spot Fleet will try to meet the target capacity with price constraints

  - Define possible launch pools: Instance Type (E.g. `m5.large`), OS, Availability Zone
  - Can have multiple launch pools, so that the fleet can choose
  - Spot Fleet stops launching instances when reaching capacity or max cost

- Strategies to allocate Spot Instances

  - `lowestPrice`: from among the pool with the lowest price (cost optimization, short workload)
  - `diversified`: distributed across pools (great for availability, long workloads)
  - `capacityOptimized`: pool with the optimal capacity for the number of instances

---

## EC2 Dedicated Hosts

- A physical server with EC2 Instance capacity, fully dedicated for your use. i.e. Access to the physical server itself and gives access to lower level hardware
- Allows you address compliance requirements and use your existing server-bound software licenses (per-socket, per-core, per-VM software licenses)
- Purchasing options:
  - On Demand: pay per second for active Dedicated Host
  - Reserved: 1 or 3 years (No Upfront, Partial Upfront, All Upfront)
- The most expensive option
- Useful for software that have a complicated licensing model (BYOL - Bring Your Own License)
- Useful for companies that have strong regulatory or compliance needs.

---

## EC2 Dedicated Instances

- Instances run on hardware that is dedicated to you (which is different from a physical server. i.e. Own instance on your own hardware)
- May share hardware with other instances in same account
- No control over instance placement (can move Hardware after Stop / Start)

---

## EC2 Capacity Reservations

- Reserve On-Demand instance capacity in a specific AZ for any duration
- You always have access to that EC2 capacity when you need it
- No time commitment (create/cancel anytime), no billing discounts - the only purpose is to reserve capacity.
- To get discounts, combine with Regional Reserved Instances and Savings Plans to benefit from billing discounts.
- You're charged at On-Demand rate whether you run instances or not.
- Suitable for short-term, uninterrupted workloads that need to be in a specific AZ.

---

## Price Comparisons

Price comparisons at a certain point in time for `m4.large` instance for `us-east-1`:

| Price Type                             | Price (per hour)                           |
| -------------------------------------- | ------------------------------------------ |
| On-Demand                              | $0.10                                      |
| Spot Instance (Spot Price)             | $0.038 - $0.039 (upto 61% off)             |
| Reserved Instance (1 Year)             | $0.058 (All Upfront) - $0.062 (No Upfront) |
| Reserved Instance (3 Years)            | $0.037 (All Upfront) - $0.043 (No Upfront) |
| EC2 Savings Plan (1 Year)              | $0.058 (All Upfront) - $0.062 (No Upfront) |
| Reserved Convertible Instance (1 Year) | $0.066 (All Upfront) - $0.071 (No Upfront) |
| Dedicated Host                         | On-Demand price                            |
| Dedicated Host Reservation             | Upto 70% Off                               |
| Capacity Reservations                  | On-Demand price                            |

The AWS Certification exams will want you to know which type of instance is the right one based on your workload.

---

# EC2 Instance: Storage

Let's look at the different storage options for EC2 Instances.

## Elastic Block Store (EBS) Volumes

### EBS: Overview

An EBS (Elasic Block Store) Volume is a network drive that you can attach to your instances while they run. So far, if we've run an EC2 Instance, we have been using them without knowing.

EBS Volumes allow us to persist data even after the Instance has been terminated. The purpose it serves is that, we can re-create a new EC2 Instance and mount the same EBS Volume to the new Instance.

**Characteristics:**

- It's a Network drive (i.e. not a physical drive).
  - It uses the network to communicate the instance, which means there might be a bit of latency.
- One EBS Volume can only be mounted to one EC2 Instance at a time. They can also be unattached, and attached only when there is a necessity.
- Multiple EBS Volumes can be attached to the same EC2 Instance.
- EBS Volumes can be detached from an EC2 Instance and attached to another one quickly. Think of them as a "Network USB stick" which can unmount from one instance and mount to another instance.
- Bound to a specific Availability Zone: An EBS Volume in `ap-south-1a` cannot be attached to an Instance in `ap-south-1b`.
- To move a volume across, you first need to snapshot it.
- Has a one-time provisioned capacity (size in GiBs and IOPS).
- Delete on Termination is possible, i.e. when the EC2 Instance is terminated, the EBS volume would be deleted. This option is also available during the creation of an EC2 Instance.
  - By default: The root EBS Volume is deleted (attribute enabled).
  - By default: Any other EBS Volume is not deleted (attribute disabled).
- Can be controlled by the AWS CLI. For e.g. If you want to preserve the Root Volume after an Instance has been created with the Delete on Termination enabled, this can be done via the AWS CLI.
- Free Tier: 30GB of Free EBS storage of General Purpose (SSD) or Magnetic per month.

---

### EBS: Creating and Assigning a Volume

#### Root Volume

The first volume is created via the Launching of a new Instance. Through the Launch Instance wizard we can create the EBS root volume, assign it to the instance with the following Volume settings:

- **Size**: The size of the volume, in GiB. Default is `8` for `gp2` and `gp3`.
  - `io1` and `io2`: 4 GiB to 16,384 GiB
  - `gp2` and `gp3`: 1 GiB to 16,384 GiB
  - `st1` and `sc1`: 125 GiB to 16,384 GiB
  - Magnetic (`standard`): 1 GiB to 1024 GiB
- **Volume type**:
  - General Purpose SSDs: `gp2` or `gp3`. Default is `gp2`.
  - Provisioned IOPS SSDs: `io1` or `io2`,
  - Cold HDD: `sc1`,
  - Throughput Optimized HDD: `st1`,
  - Magnetic: `standard`
- **IOPS**: The requested number of I/O operations per second that the volume can support. Default is `3000`. Learn more at [I/O characteristics and monitoring](https://docs.aws.amazon.com/console/ec2/ebs/volumes/types).
- **Delete on Termination**: Whether to delete EBS storage on termination of EC2 Instance. Default is `Yes`.
- **Encrypted**: Whether Volume is encrypted or not. Default is: `Not encrypted`.
- **KMS key**: KMS keys are only applicable when encryption is set on this volume. Amazon EBS encryption uses AWS KMS keys when creating encrypted volumes and snapshots. EBS encrypts your volume with a data key using the industry-standard AES-256 algorithm. Your data key is stored on disk with your encrypted data, but not before EBS encrypts it with your KMS key. Your data key never appears on disk in plaintext. The same data key is shared by snapshots of the volume and any subsequent volumes created from those snapshots.
- **Throughput**: Throughput that the volume can support specified for Streaming Optimized volumes. Default is `100` for `gp2` and `125` for `gp3`.

By default, the Root Volume is created in the same Availability Zone as the Instance.

---

#### New Unassigned Volume

These Volume settings above also show up if we attempt to create the EBS Volume standalone.

To create the Volume,

1. Go to the [Volumes page in the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Volumes:)
2. Click **Create Volume**
3. Assign the Volume Settings.
4. You may observe that two new setting shows up here which did not show up during the Launch Instance:
   - Availability Zone (must be in the same AZ as the EC2 Instance it will need to be assigned to)
   - Snapshot ID (to [create the Volume from a snapshot](#ebs-snapshots), which we will learn about in the next section)
5. Click **Create Volume**. The Volume will be created and can now be assigned to an already running Instance in the same Availability Zone as soon as the `Volume state` turns from `Creating` to `Available`.
6. To attach a Volume, select the Volume and then click `Actions` ---> `Attach Volume`. From the Attach Volume wizard, select a running Instance from the list and click `Attach Volume`. The Volume is now attached, indicated by its Volume state being `In use`. This is reflected back if we select the Instance in the [Instances page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Instances:) and check the Storage panel. We will find this volume appear there.

> **Note:** Attaching an EBS Volume is not enough to make it ready for use with the EC2 Instance. Check out [Make an EBS Volume available for use on Linux](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html) to make it available for use. (This article is written during the preparation for the [AWS Developer Associate Certification](./../aws-certifications/aws-developer-associate/README.md) and it is out of scope for this. I will try to add this section here, later.)

---

### [EBS: Volume Types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html)

#### General Purpose SSD

General Purpose SSD volume that balances price performance for a wide variety of transactional workloads.

- Cost-effective storage, low-latency
- **Use Cases:**
  - System boot volumes
  - Virtual desktops
  - Medium sized single instance databases such as Microsoft SQL Server and Oracle
  - Latency sensitive interactive applications
  - Development and test environments

1. `gp2`

   - **Durability**: `99.8% - 99.9%`
   - **Volume Size**: `1 GB - 16 TB`
   - **Min IOPS/Volume**: `100` burstable upto `3000`
   - **Max IOPS/Volume**: `16000`
   - **Throughput/Volume**: `125 MB/s - 250 MB/s`
   - **Max IOPS/Instance**: `260,000`
   - **Max Throughput/Instance**: `7,500 MB/s`
   - **Max IOPS:GiB Ratio**: `3:1`
   - Small gp2 volumes (below 1000 GiB) can burst IOPS to 3,000
   - Size of the volume and IOPS are linked, max IOPS is 16,000
   - `3 IOPS per GiB`, means at `5,334 GiB (5.3 TB) we are at the max IOPS`

2. `gp3`

   - **Durability**: `99.8% - 99.9%`
   - **Volume Size**: `1 GB - 16 TB`
   - **IOPS/Volume**: `3,000 - 16,000`
   - **Throughput/Volume**: `125 MB/s - 1,000 MB/s`
   - **Max IOPS/Instance**: `260,000`
   - **Max Throughput/Instance**: `10,000 MB/s`
   - **Max IOPS:GiB Ratio**: `3000:1 at 1 GB`, `500:1 at 32GB`
   - **Price:**
     - `$0.08/GB-month`
     - `3,000 IOPS free` and `$0.005/provisioned IOPS-month over 3,000`;
     - `125 MB/s free` and `$0.04/provisioned MB/s-month over 125`
   - Newer generation of General Purpose SSDs
   - Can increase IOPS up to 16,000 and throughput upto 1000 MiB/s independently
   - Can access max IOPS of 16,000 at 32 GiB of Volume (at `500:1` IOPS:GiB Ratio)

---

#### Provisioned IOPS (PIOPS) SSDs

- **Use Cases:**
  - Critical business applications with sustained IOPS performance
  - Applications that need more than 16,000 IOPS
  - Great for database workloads (sensitive to storage performance and consistency)
  - Supports EBS Multi-attach

1. **`io1`**

   - High performance SSD volume designed for latency-sensitive transactional workloads
   - **Durability**: `99.8% - 99.9%`
   - **Use Cases**: I/O-intensive NoSQL and relational databases
   - **Volume Size**: `4 GB - 16 TB`
   - **Max IOPS/Volume**: `64,000` for Nitro System EC2 Instances, `32,000` for others
   - **Max Throughput/Volume**: `1,000 MB/s`
   - **Max IOPS/Instance**: `350,000`
   - **Max Throughput/Instance**: `10,000 MB/s`
   - **Max IOPS:GiB Ratio**: `50:1`

2. **`io2`**

   - High performance and high durability SSD volume designed for latency-sensitive transactional workloads
   - **Durability**: `99.999%`
   - **Use Cases**: I/O-intensive NoSQL and relational databases
   - **Volume Size**: `4 GB - 16 TB`
   - **Max IOPS/Volume**: `64,000` for Nitro System EC2 Instances, `32,000` for others
   - **Max Throughput/Volume**: `1,000 MB/s`
   - **Max IOPS/Instance**: `160,000`
   - **Max Throughput/Instance**: `4,750 MB/s`
   - **Max IOPS:GiB Ratio**: `500:1`

3. **`io2 Block Express`**

   - Highest performance, high durability SSD volume designed for business-critical latency-sensitive transactional workloads
   - **Durability**: `99.999%`
   - **Use Cases**: Ideal for your largest, most I/O intensive, mission critical deployments of NoSQL and relational databases such as `Oracle`, `SAP HANA`, `Microsoft SQL Server`, and `SAS Analytics`
   - **Volume Size**: `4 GB - 64 TB`
   - **Max IOPS/Volume**: `256,000`
   - **Max Throughput/Volume**: `4,000 MB/s`
   - **Max IOPS/Instance**: `350,000`
   - **Max Throughput/Instance**: `10,000 MB/s`
   - **IOPS:GiB Ratio**: `1000:1`

> **Note**: To achieve the maximum IOPS and throughput limits, the volume must be attached to a Nitro System EC2 instance. Io2 Block Express is available with `C6in`, `C7g`, `M6in`, `M6idn`, `R5b`, `R6in`, `R6idn`, `Trn1`, `X2idn`, and `X2iedn` instances, with support for other instances coming soon.

---

#### Hard Disk Drives (HDD)

- Cannot be Boot volumes
- `125 GB to 16 TB`
- Does not support EBS Multi-attach

1. Throughput Optimized HDD (`st1`)

   - **Durability**: `99.8% - 99.9%` (0.1% - 0.2% annual failure rate)
   - **Use Cases**: Big data, Data warehouses, Log processing
   - **Volume Size**: `125 GB - 16 TB`
   - **Max IOPS/Volume**: `500`
   - **Max Throughput/Volume**: `500 MB/s`
   - **Max Throughput/Instance**: `10,000 MB/s`

2. Cold HDD (`sc1`)

   - **Durability**: `99.8% - 99.9%` (0.1% - 0.2% annual failure rate)
   - **Use Cases**: Throughput-oriented storage for data that is infrequently accessed, archive data, scenarios where lowest cost is important
   - **Volume Size**: `125 GB - 16 TB`
   - **Max IOPS/Volume**: `250`
   - **Max Throughput/Volume**: `250 MB/s`
   - **Max Throughput/Instance**: `7,500 MB/s`

---

### EBS: Snapshots

#### EBS Snapshots: Overview

You can back up the data on your Amazon EBS volumes to Amazon S3 by taking point-in-time snapshots. Snapshots are incremental backups, which means that only the blocks on the device that have changed after your most recent snapshot are saved. This minimizes the time required to create the snapshot and saves on storage costs by not duplicating data. Each snapshot contains all of the information that is needed to restore your data (from the moment when the snapshot was taken) to a new EBS volume. Snapshots across Availability Zones or Regions.

It is considered a Best Practice (although not mandatory) to detach volume before taking a snapshot.

---

#### EBS Snapshots: Features

- **EBS Snapshots Archive**
  - Move a Snapshot to an "archive tier" that is 75% cheaper.
  - Takes within 24 - 72 hours for restoring the archive.
- **Recycle Bin for EBS Snapshots**
  - Setup rules to retain deleted snapshots so you can recover them after an accidental deletion.
  - Specify retention period (1 day - 1 year)
- **Fast Snapshot Restore (FSR)**
  - Force full initialization of snapshot to have no latency on first use.
  - It is helpful when the snapshot is huge and there is a need to initialize an EBS volume or Instance out of it, very quickly.
  - This feature is expensive, so be careful with it.

---

#### EBS Snapshots: Creating a Snapshot

- Select the Volume and click `Actions` ---> `Create snapshot`
- Describe the Snapshot and create the snapshot by clicking `Create snapshot`

---

#### EBS Snapshots: Copying Snapshots to Another Region

- Go to the [Snapshots page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Snapshots:) from the EC2 Console
- Select the Snapshot and right click and `Copy snapshot` or click `Actions` ---> `Copy snapshot`
- Select any Destination Region from the options. This is very handy if you want to have a Disaster Recovery Strategy to make sure your data is backed up in another region of AWS.

---

#### EBS Snapshots: Create Volume from Snapshot

- Go to the [Snapshots page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Snapshots:) from the EC2 Console
- Select the Snapshot and right click and `Create volume from snapshot` or click `Actions` ---> `Create volume from snapshot`
- Select the volume settings. Note: The `Snapshot ID` setting doesn't show up because the snapshot ID is already assigned as we are creating a volume from a snapshot. We can select the rest of the settings just like how we did when we [created a new volume](#new-unassigned-volume)
- Click `Create volume` to create the volume

We can go back to [Volumes](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Volumes:) and we will find the new volume show up there. We can confirm this was created via the Snapshot by checking the `Snapshot` field. It should have the same `Snapshot ID` as the snapshot that was used to create it.

---

#### EBS Snapshots: Recycle Bin

The Recycle Bin is a feature to protect your Amazon EBS Snapshots and [Amazon Machine Images (AMIs)](#ami) from accidental deletion. We can set it up by creating a `Retention Rule`.

- Go to the [Snapshots page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Snapshots:) and click the `Recycle Bin`.
- Click **Create retention rule**.
- We can now modify the following settings:
  - Retention rule name
  - Retention rule description
  - Resource type - `EBS Snapshots` or `Amazon Machine Image (AMI)`
  - Apply to all resources
  - Retention period
- Click `Create retention rule` to finalize these retention rules.

The **Retention rule** panel shows any created Retention rules.
The **Resources** panel is supposed to show any corresponding resources (EBS Snapshots or Amazon Machine Images) that have been deleted. The first time it is deleted it is placed in the Recycle Bin. The Recycle Bin keeps it until the Retention period is over. However deleted Snapshots or AMIs can be **Recovered** from here.

---

#### EBS Snapshots: Archiving

By default the Storage tier for EBS Volumes is `Standard`. We can move the Storage tier to `Archive` by archiving snapshots. Archiving a snapshot stores a full copy of the snapshot in the archive tier. After you archive the snapshot, you will not be able to use it. To use the snapshot then, you must first restore it.

- Go to the [Snapshots page](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#Snapshots:) from the EC2 Console
- Select the Snapshot and right click and `Archive snapshot` or click `Actions` ---> `Archive snapshot`

---

### EBS: Multi-Attach - io1 / io2 family

- The Multi-Attach feature is available to only the `io1` and `io2` family (Provisioned IOPS SSDs) of EBS Volumes
- Attach the same EBS volume to multiple EC2 instances in the same Availability Zone
- Each instance will have full Read and Write permissions to the high-performance volume
- Use Cases:
  - Achieve higher availability in clustered Linux applications (ex: Teradata)
  - The application must manage concurrent write operations
- Upto **`16`** EC2 Instances at a time
- Must use a file system that is cluster-aware (not XFS, EX4 etc.)

---

### EBS: Encryption

- When you create an encrypted volume, you get the following:
  - Data at rest is encrypted inside the volume
  - All the data in-flight moving between the instance and the volume is encrypted
  - All snapshots are encrypted
  - All volumes created from the snapshot are encrypted
- Encryption and decryption is handled by EC2-EBS behind the scenes
- Encryption has a minimum impact on latency and is recommended
- EBS Encryption leverages keys from KMS (`AES256`)
- Copying an unencrypted snapshot allows encryption

**Workflows:**

1. **Encrypting an unencrypted EBS Volume**:

   - Create an EBS Snapshot of the volume
   - Encrypt the EBS Snapshot (using the `copy snapshot` function)
   - Create new EBS volume from the Snapshot (the volume will also be encrypted)
   - Attach the encrypted volume to the original instance

2. **Cross-Account, Cross-Region copying of encrypted EBS Snapshots**:

   - Ensure the Source and Target accounts have the following permissions:

     - **Source Account**:

       - The IAM user or role in the source account needs to be able to call the following EBS action:

         - `ModifySnapshotAttribute` function and to perform the operations on the key associated with the original snapshot.

       - The IAM user or role in the source account needs to be able perform the following actions on the key associated with the original snapshot:

         - `DescribeKey`
         - `ReEncypt`

     - **Target Account**:

       - The IAM user or role in the target account needs to be able perform the following actions on the key associated with the original snapshot:

         - `DescribeKey`
         - `CreateGrant`
         - `Decrypt`

       - The IAM user or role in the target account must also be able to perform the following operations on the key associated with the call to `CopySnapshot`.

         - `CreateGrant`
         - `Encrypt`
         - `Decrypt`
         - `DescribeKey` and
         - `GenerateDataKeyWithoutPlaintext`

   - **In the Source Account**:

     - Create an EBS Snapshot of an Encrypted EBS Volume (snapshot will be encrypted as well).
     - Share the Custom KMS Key associated with the snapshot with the target account.
     - Share the encrypted EBS snapshot with the target account.

   - **In the Target Account**:

     - In the context of the target account, locate the shared snapshot and make a copy of it.
     - During the copy, encrypt it with a new encryption key and select the Region you want to have the EBS Volume in. Using a new key for the copy provides an additional level of isolation between the two accounts. As part of the copy operation, the data will be re-encrypted using the new key.
     - Use the newly created snapshot copy to create a new volume.

---

### [EBS: RAID Configuration Options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/raid-config.html)

---

## AMI

### AMI: Overview

What powers our EC2 Instances is an AMI.

- AMI stands for Amazon Machine Image and they represent a customization of an EC2 Instance
  - You can add your own Software, configuration, operating system, monitoring tool
  - Creating our own AMI may give us a faster boot, configuration time because all your software is pre-packaged through the AMI
  - AMIs are built for a specific region (and can be copied across regions if we want to leverage the AWS Global Infrastructure)
  - You can launch EC2 Instances from:
    - A Public AMI: AWS provided (e.g. Amazon Linux 2)
    - Your own AMI: You make and maintain them yourself
    - An AWS Marketplace AMI: An AMI someone else made (and potentially sells)

---

### AMI: Creating an AMI

**Process:**

- Start an EC2 Instance and then Customize it (by running scripts via EC2 User Data)
- Stop the instance (for data integrity)
- Build an AMI from it - this will also create EBS snapshots
- Launch instances from this newly built AMI

---

### AMI: Copying and Sharing AMIs

- You can copy an AMI within or across AWS Regions.
- Copying a source AMI results in an identical but distinct target AMI with its own unique identifier.
- With an Amazon EBS-backed AMI, each of its backing snapshots is copied to an identical but distinct target snapshot.
- If you encrypt unencrypted backing snapshots or encrypt them to a new KMS key, the snapshots are complete (non-incremental) copies.
- Subsequent copy operations of an AMI result in incremental copies of the backing snapshots.

- **Copying an AMI Cross-Region**:

  - If you copy an AMI to a new Region, the snapshots are complete (non-incremental) copies.
  - When the new AMI is copied from Region A into Region B, it automatically creates a snapshot in Region B because AMIs are based on the underlying snapshots.

  - **Benefits of Cross-Region copying**:

    - **Consistent global deployment**: Copying an AMI from one Region to another enables you to launch consistent instances in different Regions based on the same AMI.

    - **Scalability**: You can more easily design and build global applications that meet the needs of your users, regardless of their location.

    - **Performance**: You can increase performance by distributing your application, as well as locating critical components of your application in closer proximity to your users. You can also take advantage of Region-specific features, such as instance types or other AWS services.

    - **High availability**: You can design and deploy applications across AWS Regions, to increase availability.

- **Costs**:

  - There are no charges for copying an AMI.
  - However, standard storage and data transfer rates apply.
  - If you copy an EBS-backed AMI, you will incur charges for the storage of any additional EBS snapshots.

- **Encryption and Copying**:

  | Scenario | Description                | Support |
  | -------- | -------------------------- | ------- |
  | 1        | Unencrypted-to-Unencrypted | Yes     |
  | 2        | Encrypted-to-Encrypted     | Yes     |
  | 3        | Unencrypted-to-Encrypted   | Yes     |
  | 4        | Encrypted-to-Unencrypted   | No      |

- **[Cross-Account Copying / Sharing AMIs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html)**:

  - You can share an AMI with another AWS account.
  - Sharing an AMI does not affect the ownership of the AMI.
  - The owning account is charged for the storage in the Region.

  - **Resource permissions**:

    - To copy an AMI that was shared with you from another account, the owner of the source AMI must grant you read permissions for the storage that backs the AMI.
    - The storage is either the associated EBS snapshot (for an Amazon EBS-backed AMI) or an associated S3 bucket (for an instance store-backed AMI).
    - If the shared AMI has encrypted snapshots, the owner must share the key or keys with you as well.

---

### AMI: Golden AMI

- A Golden AMI is an AMI that you standardize through configuration, consistent security patching, and hardening for reuse.
- It also contains agents you approve for logging, security, performance monitoring, etc.
- Helps reduce application start time by having these pre-installed static files and services.

---

## EC2 Instance Store

EBS Volumes are Network drives with good but "limited" performance. But sometimes you want higher performance and that can happen through the **EC2 Instance Store**, which is a high-performance hardware disk attached onto your EC2 Instance.

The EC2 Instance is a virtual machine but it is obviously attached to a real hardware server. Some of these servers do have disk space attached directly with a physical connection onto the server. And so a special type of EC2 Instance can leverage the **EC2 Instance Store**.

The EC2 Instance Store has the following characteristics:

- Provides temporary block-level storage for your instance. This storage is located on disks that are physically attached to the host computer.
- Better I/O performance, high throughput
- EC2 Instance Store lose their storage if they're stopped (ephemeral) - cannot be used as a durable, long term place to store your data.
- Good for buffer / cache / scratch data / temporary content, or for data that is replicated across a fleet of instances, such as a load-balanced pool of web servers.
- Risk of data loss if hardware fails
- Backups and Replication are your responsibility
- Instance Store volumes are included as part of the instance's usage cost.
- The instance store itself has no additional cost.

---

## Amazon Elastic File System (EFS)

### EFS: Overview

Amazon Elastic File System (Amazon EFS) is a Network File System that can be mounted on many EC2 Instances in different availability zones. it automatically grows and shrinks as you add and remove files with no need for management or provisioning.

**Characteristics of Amazon EFS:**

- Managed NFS (Network File System) that can be mounted on many EC2 Instances
- POSIX compliant
- EFS works with EC2 Instances in multi-AZ
- Highly available, scalable, expensive (3x `gp2`), pay-per-use
- Use cases:
  - Content management: Web serving, data sharing, Wordpress
- Uses NFSv4.1 Protocol
- Uses Security group to control access to NFS
- Compatible with Linux-based AMI (not Windows)
- Encryption at rest using KMS
- POSIX file system (~Linux) that has a standard file API
- File system scales automatically, pay-per-use, no capacity planning is required

**Performance Classes:**

- **EFS Scale**

  - 1000s of Concurrent NFS Clients, 10 GiB+ /s throughput
  - Grow to Petabyte-scale network file system, automatically without provisioning capacity in advance

- **Performance mode** (set at EFS creation time)

  - General purpose (default): Latency-sensitive use cases (web server, CMS, etc)
  - Max I/O: Higher latency, higher throughput, highly parallel (big data, media processing)

- **Throughput mode**

  - **Bursting Throughput**: With Bursting Throughput mode, throughput on Amazon EFS scales as the size of your file system in the standard storage class grows. (1 TiB = 50 MiB/s + burst of upto 100 MiB/s)
  - **Provisioned Throughput**: With Provisioned Throughput mode, you can instantly provision the throughput of your file system (in MiB/s) independent of the amount of data stored. (e.g. 1 GiB/s for 1 TiB Storage)

**Storage Classes**

- Storage Tiers (Lifecycle Mangement feature - move files after `n` days)
  - Standard: For frequently accessed files
  - Infrequent access (EFS-IA): Cost to retrieve files when we retrieve them, lower price to store. Enable EFS-IA with a Lifecycle Policy
- Availability & Durability
  - Standard: Multi-AZ, great for production
  - One Zone: One AZ, great for development, backup enabled by default, compatible with IA (EFS One Zone-IA, 90% in cost savings)

---

### EFS: Create a File System

- Go to the **[EFS File System Page](https://ap-south-1.console.aws.amazon.com/efs?region=ap-south-1#/file-systems)** and click **`Create file system`**.

- We have the following File System settings:

  **General Settings**

  - **Name**: Name your file system. (Optional)
  - **Storage class**:
    - **`Standard`**: Stores data redundantly across multiple AZs
    - **`One Zone`**: Stores data redundantly within a single AZ
  - **Automatic backups**:
    - **`Enable automatic backups`**: Automatically backup your file system data with AWS Backup using recommended settings. Additional pricing applies.
  - **Lifecycle management**: EFS Intelligent-Tiering uses Lifecycle Management to automatically achieve the right price and performance blend for your application by moving your files between the Standard and Standard-Infrequent Access storage classes.
    - **`Transition into IA`**: Transition files from Standard to Standard-Infrequent Access.
      - Options: 7, 14, 30, 60, 90 days since last access
    - **`Transition out of IA`**: Transition files from Standard-Infrequent Access to Standard.
      - Options: None and On first access
  - **Performance mode**: Set your file system's performance mode based on IOPS required.
    - **`General Purpose`**: Ideal for latency-sensitive use cases, like web serving environments and content management systems
    - **`Max I/O`**: Scale to higher levels of aggregate throughput and operations per second
  - **Throughput mode**: Set how your file system's throughput limits are determined.
    - **`Bursting`**: Throughput scales with file system size
    - **`Provisioned`**: Throughput fixed at specified amount
  - **Encryption**: Choose to enable encryption of your file system's data at rest. Uses the AWS KMS service key (aws/elasticfilesystem) by default.

- Select the General Settings and click **Next**

- We have the following Network Settings:

  - **Virtual Private Cloud (VPC)**: Choose the VPC where you want EC2 instances to connect to your file system.
  - **Mount targets**: A mount target provides an NFSv4 endpoint at which you can mount an Amazon EFS file system. We recommend creating one mount target per Availability Zone. We need to create a specific Security Group for the File system.

- Next, we have a File System policy which is optional. We will skip it for now. (This reference guide was created during the preparation for [AWS Developer Associate Certification](./../aws-certifications/aws-developer-associate) and the File System policy is out of scope, hence it is skipped for now. I will try to add this when possible)

- Review and click **Create**.

> **Note**: We do not have to select the volume capacity anywhere because EFS is on a Pay-as-you-go model as discussed earlier. The Free Tier offers 5 GB of EFS free for 12 months.

---

### EFS: Mounting the File System to an EC2 Instance

- **Launch** a new EC2 Instance
- In the **Configure storage** section, where it says **0 x File systems** click **Edit**. We will notice the following message: **You currently have no file systems on this instance. You must select a subnet before you can add an EFS file system.** This is because by default, we have no preference on subnet and we allow AWS to automatically assign a subnet from the AZs. Hence we need to do that first.
- Go to the **Network settings** section and click **Edit**
- Choose the `ap-south-1a` subnet.
- Now if we go back to the **Configure storage** section we will see the message: "**You currently have no file systems on this instance. To add a file system, choose Add shared file system."** Let's do that by clicking the **Add shared file system** button.
- We will notice the File system being added with a default mount point of `/mnt/efs/fs1`. This will **Automatically create and attach security groups** and **Automatically mount shared file system by attaching required user data script** which is great.
- Click **`Launch`** to launch the instance.
- To check if the EFS volume is correctly mounted, we can login to the EC2 Instance and write files to the mount point `/mnt/efs/fs1` by using:

  ```s
  echo "Hello world!" > /mnt/efs/fs1/helloworld.txt

  cat /mnt/efs/fs1/helloworld.txt
  # Prints: Hello world!
  ```

> **Note:** As we know, the same EFS file system can be mounted to multiple Instances, hence we can launch another instance and mount this same File system there as well. They will share files hence this `helloworld.txt` in the example above, will be available across Instances sharing this EFS File system across Availability Zones

---

## EBS vs EFS

**EBS Volumes:**

- Can be attached to only one instance at a time
- Are locked at the Availability Zone (AZ) level
- `gp2`: IO increases if the Disk space increases
- `gp3` and `io1`: can Increase IO independently
- Multi-Attach to upto 16 instances using `io1` and `io2` (Provisioned IOPS SSDs)
- To Migrate an EBS volume across AZ
  - Take a snapshot
  - Copy the snapshot to another AZ
  - EBS backups use IO and you shouldn't run them while your application is handling a lot of traffic.
- Root EBS volumes of instances get terminated by default if the EC2 instance gets terminated (can be disabled).

**EFS Volumes:**

- Mounting of 100s of instances across AZ
- EFS share website files (Wordpress)
- Only for Linux instances (POSIX)
- EFS has a higher price point than EBS
- Can leverage EFS-IA for cost savings

---

# EC2 Instance Lifecycle

## [EC2 Instance Lifecycle: Overview](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html)

An Amazon EC2 instance transitions through different states from the moment you launch it through to its termination.

The following illustration represents the transitions between instance states. Notice that you can't stop and start an instance store-backed instance.

![EC2: Instance Lifecycle](assets/ec2-instance-lifecycle.png)

The following table provides a brief description of each instance state and indicates whether it is billed or not.

<!--prettier-ignore-->
| Instance State  | Description                                           | Instance usage billing |
| --------------- | ----------------------------------------------------- | ---------------------- |
| `pending`       | The instance is preparing to enter the running state. | Not billed             |
| `running`       | The instance is running and ready for use.            | Billed                 |
| `stopping`      | The instance is preparing to be stopped or stop-hibernated. | Billed only if preparing to hibernate |
| `stopped`       | The instance is shut down and needs to be restarted for use. | Not billed            |
| `shutting-down` | The instance is preparing to be terminated.           | Not billed             |
| `terminated`    | The instance has been permanently deleted and cannot be started. | Not billed except for Reserved instances which continue to be billed until end of term |

> **Note**: Rebooting an instance doesn't start a new instance billing period because the instance stays in the running state.

---

## EC2 Instance Lifecycle: Stop

### Stopping an Instance: Overview

- You can stop and start your instance if it has an Amazon EBS volume as its root device.
- When a stop command is issued, The instance status changes to `stopping` and then `stopped`.
- While the instance is stopped, you can treat its root volume like any other volume, detach and reattach to a running instance and modify it (for example, repair file system problems or update software), detach from the running instance and reattach it to the stopped instance.
- When detaching and reattaching, make sure that you reattach it using the storage device name that's specified as the root device in the block device mapping for the instance.

- You can modify the following attributes of an instance only when it is stopped:

  - Instance type
  - User data
  - Kernel
  - RAM disk

  If you try to modify these attributes while the instance is running, Amazon EC2 returns the IncorrectInstanceState error.

- If your instance is in an Auto Scaling group, the Amazon EC2 Auto Scaling service marks the stopped instance as `unhealthy`, and might terminate it and launch a replacement instance.

- If the instance OS does not shut down cleanly within a few minutes, a hard shutdown is performed.

- **Persistence:**

  - When you stop an instance, the following is **_lost_**:

    - Data stored in the RAM.

    - Data stored in the EC2 Instance Store volumes.

    - **The Public IPv4 address** that Amazon EC2 automatically assigned to the instance on launch or start. (To retain a public IPv4 address that never changes, you can associate an Elastic IP address with your instance.)

    - (EC2-Classic) With EC2-Classic, Elastic IP addresses are dissociated from your instance. For more information, see EC2-Classic.

  - When you stop an instance, the following **_persists_**:

    - Data stored in the Amazon EBS volumes. The EBS volumes remain attached to the instance.
    - Private IPv4 addresses.
    - IPv6 addresses.
    - Elastic IP addresses associated with the instance. Note that when the instance is stopped, AWS starts charging you for the associated Elastic IP addresses.

### Stopping an Instance: Stop Protection

**Stop Protection** prevents your instance from being accidentally stopped or terminated.

- The **`DisableApiStop`** attribute controls whether the instance can be stopped using the Amazon EC2 console, AWS CLI, or API.

- The **`DisableApiStop`** attribute **DOES NOT** prevent you from stopping an instance by initiating shutdown from the instance (using an operating system command for system shutdown).

- Enabling stop protection does not prevent AWS from stopping the instance when the instance has a scheduled event that stops the instance.

- Enabling stop protection does not prevent Amazon EC2 Auto Scaling from terminating an instance when the instance is unhealthy or during scale-in events.

- You cannot enable stop protection for instance store-backed instances.

- You cannot enable stop protection for Spot Instances.

- The Amazon EC2 API follows an [eventual consistency model](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/query-api-troubleshooting.html#eventual-consistency) when you enable or disable stop protection. This means that the result of an API command you run that affects your Amazon EC2 resources might not be immediately visible to all subsequent commands you run.

---

## EC2 Instance Lifecycle: Hibernate

- When you hibernate an instance, Amazon EC2 signals the operating system to perform hibernation (suspend-to-disk).

- Hibernation saves the contents from the instance memory (RAM) to your Amazon Elastic Block Store (Amazon EBS) root volume (preserves in-memory state).

- The Instance memory size must be less than `150 GB`.

- Amazon EC2 persists the instance's EBS root volume and any attached EBS data volumes.

- The Root Volume **MUST** be an encrypted Amazon EBS volume. The Volume size must be large enough to store the RAM contents, OS, applications.

- You can hibernate an instance only if it's **enabled for hibernation** and it meets the **[hibernation prerequisites](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html)**.

- You can't enable or disable hibernation for an instance after you launch it.

- You can enable Hibernation by:

  - **[Enable Hibernation for an Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enabling-hibernation.html)**
  - **[Configure an AMI to support Hibernation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernation-enabled-AMI.html)**

- An instance can **NOT** be more than `60 days`.

- When you hibernate your instance, it enters the `stopping` state, and then the `stopped` state.

- Instance started from a `hibernate-stop` state boots up faster than when an instance is started from a `stopped` state with no hibernation enabled. This is because the contents of the instance memory that was saved to the EBS volume prior to hibernate-stop will be written back to memory and speed up boot.

- When you `start` your instance from a hibernated state:

  - The EBS root volume is restored to its previous state
  - The RAM contents are reloaded
  - The processes that were previously running on the instance are resumed
  - Previously attached data volumes are reattached and the instance retains its instance ID

- Not supported for bare metal instances

- **Billing**:

  - AWS doesn't charge usage for a hibernated instance when it is in the `stopped` state, but you are charged while it is in the `stopping` state, unlike when you stop an instance without hibernating it.
  - AWS doesn't charge usage for data transfer fees. You are charged for the storage for any Amazon EBS volumes, including storage for the RAM data.

- **Use Cases:**

  - Long-running processes that do not need to run 24/7 365 days a year
  - Necessary to save the RAM state
  - Services that take time to initialize

---

# EC2 Instance Metadata

- The EC2 Instance Metadata refers to the information about the EC2 Instance.
- Allows AWS EC2 Instances to learn about themselves.
- The URL is http://169.254.169.254/latest/meta-data. `169.254.169.254` is an Internal IP to AWS, it will not work from your local computer. It will only work when logged into the EC2 Instance.
- You can retrieve the IAM Role name from the metadata, but you CANNOT retrieve the IAM Policy.
- The only way to test the policy is to use the **[AWS Policy Simulator](https://policysim.aws.amazon.com/)** or the `--dry-run` flag with a command.

---

# [EC2: Instance Recovery](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html)

- To automatically recover an instance when a system status check failure occurs, you can either:

  - Use the default configuration of the instance, or
  - **Create an Amazon CloudWatch alarm**

- If an instance becomes unreachable because of of the following reasons, the instance is automatically recovered:

  - Hardware issues on the physical host that impact network reachability

  - A problem that requires AWS involvement to repair:

    - Loss of system power
    - Software issues on the physical host
    - Loss of network connectivity

- A recovered instance is identical to the original instance, including the instance ID, private IP addresses, Elastic IP addresses, and all instance metadata.

- If the impaired instance has a public IPv4 address, the instance retains the public IPv4 address after recovery.

- If the impaired instance is in a placement group, the recovered instance runs in the placement group.

- During instance recovery, the instance is migrated as part of an instance reboot, and any data that is in-memory is lost.

---

# EC2: Networking

## Public vs Private vs Elastic IP

- **Public IP**:

  - Must be unique globally
  - Public IP means the machine can be identified on the internet (www)
  - Must be unique across the whole web (not two machines can have the same public IP)
  - Can be geo-located easily

- **Private IP**:

  - Private IP means the machine can be identified only on a private network
  - The IP must be unique across the private network
  - Two different private networks (two companies) can have the same private IPs
  - Machines connect to www using an internet gateway (a proxy)
  - Only a specified range of IPs can be used as private IP

- **Elastic IP**:

  - When you stop and start an EC2 Instance, it can change it's Public IP
  - If you need to have a fixed public IP for your instance, you need an Elastic IP
  - An Elastic IP is a public IPv4 address you own as long as you don't delete it
  - You can attach it to only one Instance or one Network Interface at a time
  - With an Elastic IP Address, you can mask the failure of an instance or software by rapidly remapping the address to another instance in your account. (Uncommon pattern)
  - You can only have 5 Elastic IP in your account (you can ask AWS to increase that limit)
  - Overall, try to avoid using Elastic IP:
    - They often reflect poor architectural decisions
    - Instead, use a random public IP and register a DNS name for it
    - Or use a Load Balancer and not use a public IP (Best pattern)
  - An Elastic IP address doesn't incur charges as long as all the following conditions are true:

    - The Elastic IP address is associated with an EC2 instance.
    - The instance associated with the Elastic IP address is running.
    - The instance has only one Elastic IP address attached to it.

---

## EC2: Placement Groups

When you launch a new EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures. You can use placement groups to influence the placement of a group of interdependent instances to meet the needs of your workload.

- Depending on the type of workload, you can create a placement group using one of the following **Placement Strategies**:

  1. **Cluster**:

     - Packs instances close together on the same rack inside a single Availability Zone. A cluster placement group can't span multiple Availability Zones.
     - This strategy enables workloads to achieve the low-latency (`10 Gbps` bandwidth) network performance necessary for tightly-coupled node-to-node communication that is typical of high-performance computing (HPC) applications.
     - Network traffic to the internet and over an AWS Direct Connect connection to on-premises resources is limited to `5 Gbps`.
     - The maximum network throughput speed of traffic between two instances in a cluster placement group is limited by the slower of the two instances.
     - **Use Cases**:
       - Big data job that needs to be completed fast
       - Applications that needs extremely low latency and high network throughput.
     - The drawback is, if the rack fails, all instances fail at the same time.
     - You can launch multiple instance types into a cluster placement group. However, this reduces the likelihood that the required capacity will be available for your launch to succeed. AWS recommends using the same instance type for all instances in a cluster placement group.

  2. **Partition**:

     - Spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. Each partition can be thought of as a rack.
     - A partition placement group can have partitions in multiple Availability Zones in the same Region.
     - A partition placement group can have a maximum of `7 partitions / Availability Zone`. The number of instances that can be launched into a partition placement group is limited only by the limits of your account (so we can have 100s of instances).
     - A partition placement group with **[Dedicated Instances](#ec2-dedicated-instances)** can have a maximum of `2 partitions`.
     - You can't use **[Capacity Reservations](#ec2-capacity-reservations)** to reserve capacity in a partition placement group.
     - Partition failures can affect multiple Instances but won't affect other partitions.
     - A partition placement group offers visibility into the partitions - you can see which instances are in which partitions.
     - You can share this information with topology-aware applications, such as HDFS, HBase, and Cassandra. These applications use this information to make intelligent data replication decisions for increasing data availability and durability.
     - This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.
     - Partition information can be accessed from [EC2 Instance metadata](#ec2-instance-metadata).

  3. **Spread**:

     - Strictly places a small group of instances across distinct underlying hardware to reduce correlated failures.
     - Maximum: `7 EC2 Instances / placement group / Availability Zone`. Typically used for critical applications.
     - In a Single Availability Zone: The seven instances are placed on seven different racks, each rack has its own network and power source.
     - In a Multi-Availability Zone: The seven instances are placed on seven different racks, each rack has its own network and power source across the multiple Availability Zones available.
     - Spread placement groups are not supported for **[Dedicated Instances](#ec2-dedicated-instances)**.
     - You can't use **[Capacity Reservations](#ec2-capacity-reservations)** to reserve capacity in a partition placement group.
     - Host spread level placement groups are only available with **AWS Outposts**. For host spread level placement groups, there are no restrictions for running instances per Outposts. For more information, see **Placement groups on AWS Outposts**.
     - This strategy is perfect for applications that need high availability and reduced risk:
       - E.g. Critical applications where each instance must be isolated from failure from one another

- There is no charge for creating a Placement Group.
- The name that you specify for a placement group must be unique within your AWS account for the Region.
- You can create a maximum of `500` Placement Groups per account in each Region.
- An instance can be launched in one Placement Group at a time; it cannot span multiple Placement Groups.
- You can't merge Placement Groups.
- You cannot launch **[Dedicated Hosts](#ec2-dedicated-hosts)** in Placement Groups.

---

## [Elastic Network Interfaces (ENI)](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

- Logical component in a VPC that represents a **virtual network card**

- For EC2 Instances, an ENI gives them access to the internet. ENIs are also used outside of EC2.

- Each ENI lives within a particular subnet of the VPC and hence are bounded to a specific AZ. You can **NOT** attach an ENI to an EC2 instance in a different AZ.

- An ENI has the following attributes:

  - A Primary private IPv4 and one or more secondary IPv4
  - One Elastic IP (IPv4) per private IPv4
  - One Public IPv4
  - Security Group(s)
  - A MAC address
  - Source/Destination Check Flag
  - **Delete on Termination**: Ensures the ENI is deleted when EC2 Instance it is attached to is terminated. By default AWS creates an ENI for you at launch time if you don’t specify one, and sets the Delete on Terminate flag so you won’t have to manage.

- Similar to an EBS volume, ENIs have a lifetime that is independent of any particular EC2 instance.
- ENIs are also truly elastic. You can create them ahead of time, and then associate one or two of them with an instance at launch time.
- You can also attach an ENI to an instance while it is running (we sometimes call this a **"hot attach"**).

- ENIs give us control over our EC2 Networking:

  - A very important consequence of using ENIs is that the idea of launching an EC2 instance on a particular VPC subnet is effectively obsolete. A single EC2 instance can now be attached to two ENIs, each one on a distinct subnet. The ENI (not the instance) is now associated with a subnet.

- **Use Cases:**

  1. **Management Network / Backnet**: You can create a dual-homed environment for your web, application, and database servers.

  - The instance’s first ENI would be attached to a public subnet, routing 0.0.0.0/0 (all traffic) to the VPC’s Internet Gateway.
  - The instance’s second ENI would be attached to a private subnet, with 0.0.0.0 routed to the VPN Gateway connected to your corporate network.
  - You would use the private network for SSH access, management, logging, and so forth.
  - You can apply different security groups to each ENI so that traffic port 80 is allowed through the first ENI, and traffic from the private subnet on port 22 is allowed through the second ENI.

  2. **Multi-Interface Applications**: You can host load balancers, proxy servers, and NAT servers on an EC2 instance, carefully passing traffic from one subnet to the other. In this case you would clear the Source/Destination Check Flag to allow the instances to handle traffic that wasn’t addressed to them. AWS expects vendors of networking and security products to start building AMIs that make use of two ENIs.

  3. **MAC-Based Licensing**: If you are running commercial software that is tied to a particular MAC address, you can license it against the MAC address of the ENI. Later, if you need to change instances or instance types, you can launch a replacement instance with the same ENI and MAC address.

  4. **Low-Budget High Availability**: Attach an ENI to an instance; if the instance dies launch another one and attach the ENI to it. Traffic flow will resume within a few seconds.

  Here is a picture to show you how all of the parts — VPC, subnets, routing tables, and ENIs fit together:

      ![VPC, subnets, routing tables, and ENIs fitting together](assets/eni-vpc-multi-vif-arch.png)

---

## Networking Costs in AWS

- Incoming EC2 Traffic is free
- Traffic between EC2 Instances over Private IP within the availability zone is free
- Traffic between EC2 Instances over Public / Elastic IP between AZs is charged at `$0.02 / GB`.
- Traffic between EC2 Instances over Private IP between AZs is charged at half price (`$0.01 / GB`)
- Takeaway is to leverage the AWS Internal network and use Private IPs as much as possible. Better network performance and cost savings.
- Traffic between EC2 Instances over Public / Elastic IP between Regions is charged at `$0.02 / GB`.
- Use Same AZ for maximum savings, same region multi-AZ for High-Availability and Multi-region Multi-AZ for Maximum Availability

- Minimizing Egress traffic network cost:

  - Try to keep as much traffic within AWS to minimize costs

---

# EC2 CLI Commands

| Command                      | Function                                                    |
| ---------------------------- | ----------------------------------------------------------- |
| `aws ec2 run-instances`      | Launches EC2 Instances                                      |
| `aws ec2 describe-instances` | Lists running instances for the default EC2 Region          |
| `aws ec2 describe-subnets`   | Find a list of available subnets for the default EC2 Region |

---

# FAQs

<details open>
    <summary style="font-weight: bold; color: orange">
        You have launched an EC2 instance with two EBS volumes, the Root volume type and the other EBS volume type to store the data. A month later you are planning to terminate the EC2 Instance. What's the default behaviour that will happen to each EBS volume?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        The root volume type will be deleted and the EBS volume type will not be deleted
    </p>
    <p style="padding-left: 15px">
        The Root volume type will be deleted as its Delete on Termination attribute is checked by default. Any other EBS volume types will not be deleted as its Delete on Termination attribute is disabled by default.
    </p>
</details>

<br>

<details>
    <summary style="font-weight: bold; color: orange">
        What is EBS Multi-Attach?
    </summary>
    <br>
    <span style="margin-left: 15px; font-weight: bold">
        Attach the same EBS volume to multiple EC2 Instances in the same AZ
    </span>
</details>

<br>

<details>
    <summary style="font-weight: bold; color: orange">
        You have launched an EC2 instance with two EBS volumes, the Root volume type and the other EBS volume type to store the data. A month later you are planning to terminate the EC2 Instance. What's the default behaviour that will happen to each EBS volume?
    </summary>
    <br>
    <p style="margin-left: 15px; font-weight: bold">
        Use an EC2 Instance Store
    </p>
    <p style="padding-left: 15px">
        You can run a database on an EC2 instance that uses an Instance store, but you'll have a problem that the data will be lost if the EC2 instance is stopped (it can be restarted without problems). One solution is that you can set up a replication mechanism on another EC2 instance with an Instance Store to have a standby copy. Another solution is to set up backup mechanisms for your data. It's all up to you to how you want to set up your architecture to validate your requirements. In this use case, it's around IOPS, so we have to choose an EC2 Instance Store as the closest match, EBS `io2` Block Express drive caps out at 256,000 IOPS.
    </p>
</details>

---

# References

- [Compare EC2 Instance Types](https://instances.vantage.sh/)
- [Make an EBS Volume available for use on Linux](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html)
