# Table of Contents

- [Table of Contents](#table-of-contents)
- [Fundamental Concepts:](#fundamental-concepts)
  - [Scalability](#scalability)
  - [High Availability](#high-availability)
  - [Load Balancing](#load-balancing)
- [ELB: Overview](#elb-overview)
- [ELB: Health Check](#elb-health-check)
- [ELB: Types of Load Balancers](#elb-types-of-load-balancers)
- [ELB: Security Groups](#elb-security-groups)
- [ELB Types: Deep Dive](#elb-types-deep-dive)
  - [Classic Load Balancers (CLB)](#classic-load-balancers-clb)
    - [CLB: Overview](#clb-overview)
    - [CLB: Create a CLB](#clb-create-a-clb)
    - [CLB: Troubleshooting](#clb-troubleshooting)
    - [CLB: Tightening Security](#clb-tightening-security)
    - [CLB: Adding Multiple EC2 Instances](#clb-adding-multiple-ec2-instances)
  - [Application Load Balancer (ALB)](#application-load-balancer-alb)
    - [ALB: Overview](#alb-overview)
    - [ALB: Target Groups](#alb-target-groups)
      - [Target Groups: Overview](#target-groups-overview)
      - [Target Groups: Create a Target Group](#target-groups-create-a-target-group)
    - [ALB: Create an Application Load Balancer](#alb-create-an-application-load-balancer)
    - [ALB: Adding Target Groups to an existing Listener](#alb-adding-target-groups-to-an-existing-listener)
    - [ALB: Adding a new Listener](#alb-adding-a-new-listener)
  - [Network Load Balancer (NLB)](#network-load-balancer-nlb)
    - [NLB: Overview](#nlb-overview)
    - [NLB: Target Groups](#nlb-target-groups)
      - [Target Groups: Overview](#target-groups-overview-1)
    - [NLB: Create a Network Load Balancer](#nlb-create-a-network-load-balancer)
    - [NLB: Troubleshooting](#nlb-troubleshooting)
  - [Gateway Load Balancer (GWLB)](#gateway-load-balancer-gwlb)
    - [GWLB: Overview](#gwlb-overview)
    - [GWLB: Target Groups](#gwlb-target-groups)
      - [GWLB Target Groups: Overview](#gwlb-target-groups-overview)
- [ELB: Sticky Sessions](#elb-sticky-sessions)
  - [Sticky Sessions: Overview](#sticky-sessions-overview)
  - [Sticky Sessions: Cookie Types](#sticky-sessions-cookie-types)
  - [Sticky Sessions: Applying Sticky Sessions to Existing Load Balancer](#sticky-sessions-applying-sticky-sessions-to-existing-load-balancer)
- [ELB: Cross Zone Load Balancing](#elb-cross-zone-load-balancing)
  - [Cross Zone Load Balancing: Overview](#cross-zone-load-balancing-overview)
  - [Cross Zone Load Balancing: Characteristics](#cross-zone-load-balancing-characteristics)
- [ELB: SSL Certificates](#elb-ssl-certificates)
  - [SSL/TLS Basics](#ssltls-basics)
  - [Load Balancer and SSL Certificates](#load-balancer-and-ssl-certificates)
  - [Server Name Indication](#server-name-indication)
  - [Support on ELB](#support-on-elb)
- [ELB: Connection Draining / Deregistration Delay](#elb-connection-draining--deregistration-delay)
- [ELB: Auto-Scaling Groups](#elb-auto-scaling-groups)
  - [Auto-Scaling Group: Overview](#auto-scaling-group-overview)
  - [Auto-Scaling Group: Create an Auto-Scaling Group](#auto-scaling-group-create-an-auto-scaling-group)
  - [Auto-Scaling Group: Scaling Policies](#auto-scaling-group-scaling-policies)
    - [Dynamic Scaling](#dynamic-scaling)
    - [Predictive Scaling](#predictive-scaling)
    - [Notable Scaling Metrics](#notable-scaling-metrics)
  - [Auto-Scaling Group - Scaling Cooldowns](#auto-scaling-group---scaling-cooldowns)

---

# Fundamental Concepts:

## Scalability

Scalability means that an application / system can handle greater loads by adapting.
There are two kinds of scalability:

- **Vertical Scalability**

  - Increase the size of your instance by improving hardware. For example: Your application runs on a `t2.micro`. Vertical scaling would mean, running the application on a `t2.large`.
  - Vertical scalability is very common for non-distributed systems, such as a database.
  - RDS, ElastiCache are services that can scale vertically by upgrading the underlying instance type.
  - There's usually a hardware limit till which you can vertically scale.

- **Horizontal Scalability / Elasticity**

  - Horizontal scalability means increasing the number of instances / systems for your application. It implies distributed systems. For example: Sharding a database, Auto Scaling Group, Load Balancers.
  - Common for modern, web applications.
  - Nowadays, it's easy to horizontally scale, thanks to cloud offerings like, Amazon EC2.

Scalability is linked but different from [High Availability](#high-availability).

---

## High Availability

High Availability means running your application in at least two data centers (or Availability Zones). It often goes hand-in-hand with Horizontal Scaling.

The goal of High Availability is to survive a data center loss. So if a data center goes down, we are still running.

High Availability can also be passive, e.g. RDS Multi AZ, or active, when we have horizontal scaling.

Examples of High Availability:

- Auto Scaling Group multi AZ
- Load Balancer multi AZ

---

## Load Balancing

**Overview**

A Load Balancer is a server or set of servers that forwards traffic that it receives to multiple servers (e.g. EC2 Instances) downstream.

The idea is that, the more users you have, the more your load is going to need to be balanced across the Instances (containers or VMs, or in this case EC2 Instances), but your users do not know, nor need to know which backend instances they are connected to, they just know they have to connect to the Load Balancer (in this case, Elastic Load Balancer), giving users only one endpoint of connectivity.

**Why use a Load Balancer?**

- Spread load across multiple downstream instances.
- Expose a single point of access (DNS) to your application.
- Seamlessly handle failures of downstream instances because the load balancer will have some health check mechanisms and can understand which instances it cannot send traffic to.
- Do regular health checks on your instances.
- Provide SSL Termination (HTTPS) for your websites.
- Enforce stickiness with cookies.
- High Availability across Zones.
- Separate external traffic from internal traffic.

---

# ELB: Overview

Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets and virtual appliances in one or more Availability Zones (AZs). An Elastic Load Balancer (ELB) is a managed Load Balancer.

- AWS guarantees it will be working.
- AWS takes care of upgrades, maintenance, high availability.
- AWS provides only a few configuration knobs.
- Integrations with many AWS services (EC2, EC2 Auto Scaling Groups, Amazon ECS, AWS Certificate Manager (ACM), CloudWatch, Route 53, AWS WAF, AWS Global Accelerator)

It costs less to setup your own Load Balancer but it will be a lot more effort on your end.

---

# ELB: Health Check

We don't want to send any traffic to an EC2 Instance which is not working properly. Health checks are a way for your ELB to verify whether an EC2 Instance is properly working. This is done by sending a HTTP request on a Port to a Route. For e.g. http://IPAddress:4567/health. A 200 response means that the status is healthy. Anything else may suggest, something is wrong and is unhealthy and the Elastic Load Balancer will not send traffic to that instance.

---

# ELB: Types of Load Balancers

AWS has 4 kinds of Load Balancers:

1. **Classic Load Balancer (CLB)**: (v1 - Old Generation, 2009) - Compatible with HTTP, HTTPS, TCP, SSL or Security CP. This has fallen out of favour with AWS and will be shown as deprecated within the console but still available for use.
2. **Application Load Balancer (ALB)**: (v2 - New Generation - 2016) - Supports HTTP, HTTPS and WebSocket
3. **Network Load Balancer (NLB)**: (v2 - New Generation - 2017) - Supports TCP, TLS (secure TCP), UDP Protocols
4. **Gateway Load Balancer (GWLB)**: (2020) - Operates at the Layer 3 - Network Layer and the Internet Protocol

It is recommended to use the newer generation of Load Balancers as they provide more features. Some Load Balancers can be setup as internal (private) or external (public) ELBs.

---

# ELB: Security Groups

The users can access the Load Balancer from anywhere using HTTP/HTTPS. However, we need to configure the Security Group for the EC2 Instance need to only allow traffic from the Load Balancer.

Therefore the Security Groups' rules may look something like this:

**Load Balancer Security Group:**

| Type  | Protocol | Port Range | Source    | Description          |
| ----- | -------- | ---------- | --------- | -------------------- |
| HTTP  | TCP      | 80         | 0.0.0.0/0 | Allow HTTP from ...  |
| HTTPS | TCP      | 443        | 0.0.0.0/0 | Allow HTTPS from ... |

**Application Security Group: Allow Traffic only from Load Balancer**

| Type | Protocol | Port Range | Source               | Description                           |
| ---- | -------- | ---------- | -------------------- | ------------------------------------- |
| HTTP | TCP      | 80         | sg-0f5e3c453c06830a4 | Allow Traffic only from Load Balancer |

---

# ELB Types: Deep Dive

## Classic Load Balancers (CLB)

### CLB: Overview

- Classic Load Balancers support two things:
  - TCP (Layer 4 - Transport Layer Protocol),
  - HTTP and HTTPS (Layer 7 - Application Layer Protocol)
  - Health Checks are either TCP or HTTP based
  - Fixed hostname (xxx.region.elb.aws.amazon.com)
  - 1 x Classic Load Balancer per application

---

### CLB: Create a CLB

- Go to [Load Balancers from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:) and click **`Create Load Balancer`**.
- Click **`Classic Load Balancer`** ---> **`Create`**
- Enter Load Balancer settings:

  - **Load Balancer name**: Enter a Load Balancer name (`classic-load-balancer-test`)
  - **Create LB Inside**: Select a VPC (`My Default VPC (172.31.0.0/16)`)
  - **Create an internal load balancer**: Checked or unchecked (Leave it unchecked)
  - **Enable advanced VPC configuration**: Checked or unchecked (Leave it unchecked)
  - **Listener configuration**: Map Load Balancer Ports to Instance Ports

    | Load Balancer Protocol | Load Balancer Port | Instance Protocol | Instance Port |
    | ---------------------- | ------------------ | ----------------- | ------------- |
    | HTTP                   | 80                 | HTTP              | 80            |

- Click **`Next: Assign Security Groups`** and **`Create a new Security Group`**

  - **Enter Security Group rule**:

    | Type | Protocol | Port | Source             |
    | ---- | -------- | ---- | ------------------ |
    | HTTP | TCP      | 80   | Anywhere 0.0.0.0/0 |

- Click **`Next: Configure Security Settings`**. We will get a warning message that looks like -

  ```s
  Improve your load balancer’s security. Your load balancer is not using any secure listener.
  If your traffic to the load balancer needs to be secure, use either the HTTPS or the SSL protocol for your front-end connection. You can go back to the first step to add/configure secure listeners under Basic Configuration section. You can also continue with current settings.
  ```

- We will continue with the current settings. Click **`Next: Configure Health Check`**.

- Select the Health Check Settings:

  - **Ping Protocol**: **`HTTP`**
  - **Ping Port**: **`80`**
  - **Ping Path**: **`/`** (Default: `/index.html`)
  - **Advanced Details**:
    - **Response Timeout**: Time to wait when receiving a response from the health check (2 sec - 60 sec). **`5`** (Default: `5`)
    - **Interval**: Amount of time between health checks (5 sec - 300 sec). Interval must be greater than Response Timeout. **`6`** (Default: `30`)
    - **Unhealthy threshold**: Number of consecutive health check failures before declaring an EC2 instance unhealthy. **`2`** (Default: `2`)
    - **Healthy threshold**: Number of consecutive health check successes before declaring an EC2 instance healthy. **`3`** (Default: `10`)

- Click **`Next: Add EC2 Instances`** and Select the EC2 Instance(s)
- Click **`Next: Add Tags`** and create Tags if any
- Click **`Review and Create`** and review the summary.
- Click **`Create`** to finally Create the CLB.

- A success message confirms the creation of the Classic Load Balancer.

  ```s
  Successfully created load balancer
  Load balancer classic-load-balancer-test was successfully created.

  Note: It may take a few minutes for your instances to become active in the new load balancer.
  ```

  We may have to wait a little before the Load Balancer is available. This will reflect in the Instances Panel of the Load Balancer with the **Status**: `OutOfService`. Wait for it to become `InService` that means the Load Balancer is now Live.

- To test whether the Load Balancer is working, we need to access the DNS name of the Classic Load Balancer instead. Select the Load Balancer and go to the `Description` Panel and find the DNS name. Copy-Paste it in the Browser Address Bar and Go. If it opens the same home page as expected from the EC2 Instance, that means this Load Balancer is now successfully working.

---

### CLB: Troubleshooting

What if the Load Balancer didn't work? What could be the reasons:

1. Security Group of the EC2 Instance doesn't have the Inbound rules for HTTP. This will fail the Health Check and show the Instance as `OutOfService`.
2. The Bootstrap script on the webserver didn't work properly.

---

### CLB: Tightening Security

The problem right now is the EC2 Instance can be accessed by external traffic, both via the Public IPv4 Address as well as the Load Balancer DNS Name. We would like to tighten that security by allowing external users to only access the instance via the Load Balancer and not directly through the IP.

To do that we need to:

- Go to the [Security Groups](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#SecurityGroups:) and select the Security Group for the instance
- Delete the existing HTTP rule.
- Create a new rule with the `source` being the Classic Load Balancer's security group
- Click **`Save`** to confirm changes and save.

Now, we will have tightened the security as the EC2 Instance's Public IPv4 Address will no longer work, and only the Load Balancer's DNS name will work instead.

---

### CLB: Adding Multiple EC2 Instances

- Create two more EC2 Instances with the same User Data script as the current one, following the method described [HERE](./../ec2/README.md#launching-an-ec2-instance-running-linux)
- Go to [Load Balancers from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:) and select the Load Balancer.
- Select the Load Balancer and click **`Edit Instances`** either from the `Actions` menu, the Instances panel or the right click menu. They will all do the same thing and allow us to select more instances.
- Select these two additional Instances we would like the Load Balancer to serve and click **`Save`**.
- Now the Classic Load Balancer will serve serve the three instances on a Round Robin basis showing that we have successfully setup the Load Balancer to work correctly.

---

## Application Load Balancer (ALB)

### ALB: Overview

**Working mechanism:**

1. Your client makes a request to your application.
2. The listeners in your load balancer receive requests matching the protocol and port that you configure.
3. The receiving listener evaluates the incoming request against the rules you specify, and if applicable, routes the request to the appropriate target group. You can use an HTTPS listener to offload the work of TLS encryption and decryption to your load balancer.
4. Healthy targets in one or more target groups receive traffic based on the load balancing algorithm, and the routing rules you specify in the listener.

**Characteristics:**

- The Application Load Balancer is a Layer 7 - Application Layer, Load Balancer (HTTP).
- Load Balancing to multiple HTTP applications across machines (target groups).
- Load Balancing to multiple applications on the same machines (ex: containers).
- Support for HTTP2 and WebSockets.
- Support redirects (from HTTP to HTTPs for example).
- Supports Routing using routing tables to different target groups:
  - Routing based on target path of the URL (`example.com/users` and `example.com/posts`)
  - Routing based on hostname in URL (`one.example.com` and `two.example.com`)
  - Routing based on Query strings and Headers (`example.com/users?id=123&active=false`)
- ALB are great when you have Microservices and Container-based applications (Docker containers and Amazon ECS)
- Has a port mapping feature to redirect to a dynamic port in ECS.
- In comparison, we'd need multiple Classic Load Balancers per application.
- Fixed hostname (`xxx.region.elb.aws.amazon.com`)
- The applications servers do not see the IP of the client directly.
  - The true IP of the client is inserted in the header **`X-Forwarded-For`**
  - We can also get the Port (**`X-Forwarded-Port`**) and protocol (**`X-Forwarded-Proto`**)
- Does SSL Termination before forwarding traffic internally to Target Groups

---

### ALB: Target Groups

#### Target Groups: Overview

Target Groups are groups of Instances, ECS Tasks, Lambda Functions, IP Addresses that a Load Balancer can route to. An Application Load Balancer can route to multiple Target Groups.

Target Groups can be the following:

- **EC2 Instances** (can be managed by Auto Scaling Group) - HTTP
- **ECS Tasks** (managed by ECS itself) - HTTP
- **Lambda Functions** - HTTP request is translated into a JSON event
- **IP Addresses** - must be private IPs

Health checks are done at the Target Group level.

---

#### Target Groups: Create a Target Group

- Go to the [Target Groups page from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#TargetGroups:) and Click **[Create Target Group](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#CreateTargetGroup:)**
- Enter the Basic Configuration:

  - **Choose a target type**:

    - **Instances**
      Supports load balancing to instances within a specific VPC.
      Facilitates the use of Amazon EC2 Auto Scaling to manage and scale your EC2 capacity.

    - **IP addresses**
      Supports load balancing to VPC and on-premises resources.
      Facilitates routing to multiple IP addresses and network interfaces on the same instance.
      Offers flexibility with microservice based architectures, simplifying inter-application communication.
      Supports IPv6 targets, enabling end-to-end IPv6 communication, and IPv4-to-IPv6 NAT.

    - **Lambda function**
      Facilitates routing to a single Lambda function.
      Accessible to Application Load Balancers only.

    - **Application Load Balancer**
      Offers the flexibility for a Network Load Balancer to accept and route TCP requests within a specific VPC.
      Facilitates using static IP addresses and PrivateLink with an Application Load Balancer.

  - **Target group name**: `ec2-test-instances`
  - `Protocol`: HTTP
  - `Port`: 80
  - `VPC`: Select the VPC with the instances that you want to include in the target group.
  - `Protocol version`: HTTP1

- **Health checks**: The associated load balancer periodically sends requests, per the settings below, to the registered targets to test their status.

  - **Health check protocol**: `HTTP`
  - **Health check path**: `/`
  - **Advanced health check settings**:
    - **Port**:
      - `Traffic Port`: Default port where each target receives traffic from the load balancer
      - `Override`: Override to a different port. (1-65535)
    - **Healthy threshold**: Number of consecutive health check successes before declaring an EC2 instance healthy. **`3`** (Default: `10`)
    - **Unhealthy threshold**: Number of consecutive health check failures before declaring an EC2 instance unhealthy. **`2`** (Default: `2`)
    - **Timeout**: Time to wait when receiving a response from the health check (2 sec - 60 sec). **`5`** (Default: `5`)
    - **Interval**: Amount of time between health checks (5 sec - 300 sec). Interval must be greater than Response Timeout. **`6`** (Default: `30`)
    - Success codes: HTTP status code on success - **`200`**

- Once the above settings are selected, click **`Next`**. We have to now **`Register targets`**
- Select the intended targets from Available Targets and click **`Include as pending below`**.
- Click **`Create target group`** to complete the creation of the Target Group.

---

### ALB: Create an Application Load Balancer

- Go to [Load Balancers from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:) and click **`Create Load Balancer`**.
- Click **`Create`** on the Application Load Balancer section
- Enter Load Balancer settings:

  **Basic Configuration**:

  - **Load balancer name**: `alb-test`
  - **Scheme**: When you create a load balancer, you must choose whether to make it an internal load balancer or an internet-facing load balancer. The nodes of an internet-facing load balancer have public IP addresses. The nodes of an internal load balancer have only private IP addresses. Cannot be changed once it is created.
    - `Internet facing`: An internet-facing load balancer routes requests from clients over the internet to targets. Requires a public subnet.
    - `Internal`: An internal load balancer routes requests from clients to targets using private IP addresses.
  - **IP address type**: Select the type of IP addresses that your subnets use.

    - **IPv4**: Recommended for internal load balancers.
    - **Dualstack**: Includes IPv4 and IPv6 addresses.

  **Network Mapping**:

  - **VPC**: Select the virtual private cloud (VPC) for your targets. Only VPCs with an internet gateway are enabled for selection. The selected VPC cannot be changed after the load balancer is created. To confirm the VPC for your targets, view your target groups
  - **Mappings**: Select at least two Availability Zones and one subnet per zone. The load balancer routes traffic to targets in these Availability Zones only. Availability Zones that are not supported by the load balancer or the VPC are not available for selection.
  - **Security Groups**: Select a Security Group. (We can use the one from the Classic Load Balancer, but we will have to delete the inbound rule and reassign it to this Load Balancer, once created)
  - **Listeners and Routing**: A listener is a process that checks for connection requests using the port and protocol you configure. The rules that you define for a listener determine how the load balancer routes requests to its registered targets.
    - **Protocol**: HTTP
    - **Port**: 80
    - **Default action**: This action forwards requests to the target group that you select from the default actions dropdown list. Note that IPv6 target groups appear on this list only if you selected Dualstack as the IP address type for your load balancer. We will need to [Create a Target Group](#target-groups-create-a-target-group) based on Instances. Then refresh the Target Groups and select the target group.

- Click **`Create load balancer`**. The load balancer `State` will now show up as `Provisioning`. Wait for it to turn `Active`.

---

### ALB: Adding Target Groups to an existing Listener

- Go to [Load Balancers from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:) and select the intended Application Load Balancer.
- Go to the Listeners Tab and select the Listener where a new Instance has to be added to. Click **`Edit`** on the Application Load Balancer section.
- Select the new Target Group or [Create a Target group](#target-groups-create-a-target-group) and **`Save changes`**.

---

### ALB: Adding a new Listener

- Go to [Load Balancers from the EC2 Console](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:) and select the intended Application Load Balancer.
- Go to the Listeners Tab and select the Listener where a new Instance has to be added to. Click **`Add listener`** on the Application Load Balancer section.
- Select a Port that isn't currently being listened to.
- Add an Action:
  - **Forward**: A Forward action routes requests to one or more target groups. With forward actions, you can assign a weight that controls the prioritization and selection of each target group. Weights must be set as an integer between 0 and 999.
  - **Redirect**: Redirect actions are used to redirect client requests from one URL to another.
  - **Return fixed response**: You can use **fixed-response** actions to drop client requests and return a custom HTTP response. You can use this action to return a `2XX`, `4XX`, or `5XX` response code and add an optional message.
  - **Authenticate** (only for HTTPS): For HTTPS listeners, you can include Authenticate as a default action with Amazon Cognito or OpenID Connect (OIDC).

---

## Network Load Balancer (NLB)

### NLB: Overview

**Working mechanism:**

1. Your client makes a request to your application.
2. The load balancer receives the request either directly or through an endpoint for private connectivity (via AWS PrivateLink).
3. The listeners in your load balancer receive requests of matching protocol and port, and route these requests based on the default action that you specify. You can use a TLS listener to offload the work of encryption and decryption to your load balancer.
4. Healthy targets in one or more target groups receive traffic according to the flow hash algorithm.

**Characteristics:**

- Network Load Balancer (Layer 4 - Transport Layer) allows to:

  - Forward UDP or TCP traffic to your instances
  - Handle millions of requests per second
  - Less latency ~100 ms (vs 400 ms for ALB)

- Unlike ALB, which provides only static DNS name, NLB provides both static DNS name and static IP. NLB has **one static IP per AZ** and supports assigning Elastic IP (helpful for whitelisting specific IP). The reason being that AWS wants your Elastic Load Balancer to be accessible using a static endpoint, even if the underlying infrastructure that AWS manages changes.
- NLBs are used for extreme performance, TCP or UDP traffic.
- Not included in the AWS Free Tier

---

### NLB: Target Groups

#### Target Groups: Overview

Target Groups can be the following:

- **EC2 Instances** (can be managed by Auto Scaling Group) - HTTP
- **IP Addresses** - must be private IPs
- **Application Load Balancer** - Thanks to the Network Load Balancer, you would get Fixed IP Addresses and thanks to the Application Load Balancer, you can get all the rules around handling HTTP type of traffic. So it's a valid combination.

Health checks are done at the Target Group level and support three different kinds of protocol: **`TCP`**, **`HTTP`** and **`HTTPS`**.

---

### NLB: Create a Network Load Balancer

The steps are similar to ALB. We just have to create a new Target Group specifically for the NLB.

---

### NLB: Troubleshooting

As we can see, the reason we could not connect is because the targets showed up as unhealthy.

And that's because, when we do a TCP based Target group and a Network Load Balancer, the Security Group that is taken into account is the Security Group of the EC2 Instances. There was no inbound rules we created when we created the NLB, or when we created a Target Group that was on TCP.

So we have to Edit the Inbound rules of the Security Group of our target EC2 Instances and add back traffic from anywhere.

| Type | Protocol | Port | Source             | Description (optional)    |
| ---- | -------- | ---- | ------------------ | ------------------------- |
| HTTP | TCP      | 80   | Anywhere 0.0.0.0/0 | Necessary for NLB to work |

The reason is: Unlike the ALB, the NLB forwards over the traffic from the clients to the EC2 Instance. So from an EC2 Instance perspective, the traffic doesn't look like it's coming from the NLB, it looks like it's coming from an external client. In case of the ALB, the traffic looks like it's coming from the ALB.

We wait for a bit (Target Group: `(Interval * Health check) seconds`) and we can see that the Target Group returns to Healthy status.

Let's go to the NLB, get the DNS name and run `curl http://NLB_DNS_Name` and we'll get the response.

---

## Gateway Load Balancer (GWLB)

### GWLB: Overview

**Working mechanism:**

1. Your client makes a request to your application.
2. The load balancer receives the request based on the route table configurations that are set within your VPC, Internet Gateway, or Transit Gateway.
3. The load balancer routes requests to a target group consisting of a scalable fleet of appliances (for example, firewalls, deep packet inspection systems, URL filtering systems etc.) to process traffic flows.
4. The virtual appliance processes the traffic, and forwards it back to the load balancer, or drops the traffic based on its configuration. This type of load balancer acts as a bump-in-the-wire between the source and destination.
5. The load balancer forwards the traffic to its destination.

**Characteristics:**

- Deploy, scale and manage a fleet of 3rd party network virtual appliances in AWS
- You want to have all traffic of your network to go through a firewall that you have, or an intrusion detection and prevention system (IDPS), or a deep packet inspection system, modify some payloads at the network level
- Operates at Level 3 - Network Layer - IP Packets
- Combines the following functions:
  - **Transparent Network Gateway**: single entry/exit for all traffic
  - **Load Balancer**: Distributes traffic to your virtual appliances
- Uses the **GENEVE Protocol** on Port 6081

---

### GWLB: Target Groups

#### GWLB Target Groups: Overview

Target Groups can be the following:

- **EC2 Instances** (can be managed by Auto Scaling Group) - HTTP
- **IP Addresses** - must be private IPs

---

# ELB: Sticky Sessions

## Sticky Sessions: Overview

Sticky Sessions or Session Affinity is the idea that the same client is always redirected to the same instance behind a load balancer.

**Characteristics:**

- Works for Classic Load Balancers (CLBs) and Application Load Balancers (ALBs)
- A **cookie** that has an expiry date is used for stickiness
- Use case: Make sure the user doesn't lose the session data
- Enabling stickiness may bring imbalance to the load over the backend EC2 Instances

---

## Sticky Sessions: Cookie Types

There are two types of cookies you can have:

1. **Application-based Cookies**

   - **Custom Cookie**

     - Custom cookie generated by the target (e.g. HTTP cookie)
     - Can include any custom attributes required by the application
     - Cookie name must be specified individually for each target group
     - The following reserved names shouldn't be used: `AWSALB`, `AWSALBAPP`, `AWSALBTG`

   - **Application Cookie**
     - Cookie is generated by the Load Balancer
     - Can include any custom attributes required by the application
     - Cookie name must be specified individually for each target group
     - The following reserved names shouldn't be used: `AWSALB`, `AWSALBAPP`, `AWSALBTG`

2. **Duration-based Cookie**

   - Cookie is generated by the Load Balancer
   - Cookie name is `AWSALB` for ALB and `AWSELB` for CLB
   - Duration set by the Load Balancer itself

---

## Sticky Sessions: Applying Sticky Sessions to Existing Load Balancer

- Go to Target Groups and select the Target Group of the Load Balancer
- Click **`Actions`** ---> **`Edit attributes`**
- Toggle the **`Stickiness`** option on
- Select **Stickiness type**:
  - Load balancer generated cookie - Cookie name generated by Load Balancer
  - Application-based cookie - Cookie name generated by application which must be entered below
- Select **Stickiness duration**: between 1 second to 7 days

---

# ELB: Cross Zone Load Balancing

## Cross Zone Load Balancing: Overview

We have two availability zones and the first AZ has a load balancer with 2 x EC2 instances and the second AZ also has a load balancer with 8 x EC2 Instances.

The client is accessing these load balancers.

With Cross-Zone Load Balancing, **each load balancer instance will distribute evenly across all registered instances in all availability zones.**

So even if the client itself is sending 50% of the traffic to the first ALB and 50% of traffic to the other ALB.

But each ALB is going to redirect that traffic across all 10 EC2 instances, regardless of which availability zones they're in.

This is why it's called **`Cross-Zone Load Balancing`**.

> **Note**: Without Cross-Zone Load Balancing, the traffic would be distributed **`25%`** each among the 2 x EC2 Instances in the first AZ and **`6.25%`** each among the 8 x EC2 Instances in the second AZ.

---

## Cross Zone Load Balancing: Characteristics

- **Application Load Balancer**

  - Always on (cannot be disabled)
  - No charges for inter-AZ data

- **Network Load Balancer**

  - Disabled by default
  - You pay charges for inter-AZ data if enabled

- **Classic Load Balancer**

  - Disabled by default
  - No charges for inter-AZ data if enabled

---

# ELB: SSL Certificates

## SSL/TLS Basics

- An SSL certificate allows traffic between your clients and your load balancer to be encrypted in transit (in-flight encryption).

- SSL refers to **Secure Sockets Layer**; used to encrypt connections.
- TLS refers to **Transport Layer Security**, which is a newer version.
- Nowadays, TLS certificates are mainly used, but people still refer to it as SSL.

- Public SSL certificates are issued by Certificate Authorities (CA). Examples are: Comodo, Symantec, GoDaddy, GlobalSign, Digicert, LetsEncrypt etc. Using this certificate attached to the Load Balancer, we are able to encrypt the data sent between the client and the Load Balancer.

- SSL/TLS certificates have an expiry date that you must set and they must be renewed to make sure they are authentic.

---

## Load Balancer and SSL Certificates

```s
       HTTPS (encrypted over www)                  HTTP (over private VPC)
      ---------------------------->               ------------------------->
USERS                               LOAD BALANCER                            EC2 INSTANCE
      <----------------------------               <-------------------------
```

- The Load Balancer uses an `X.509 Certificate` (SSL/TLS server certificate)
- You can manage certificates in AWS using AWS Certificate Manager (ACM)
- You can upload your own certificates to ACM alternatively
- When you set an HTTPS Listener:
  - You must specify a default certificate
  - You can add an optional list of certificates to support multiple domains
  - Clients can use SNI (Server Name Indication) to specify the hostname they reach
  - Ability to set a specific security policy to support older versions of SSL / TLS (legacy clients)

---

## Server Name Indication

- SNI solves the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
- It's a newer protocol that requires the client to indicate the hostname of the target server in the initial SSL handshake
- The server will then find the correct certificate, or return the default one if it can't find

> **Note:**
>
> - Works only for ALB & NLB (newer generation), CloudFront
> - Does not work for the CLB (older generation)

---

## Support on ELB

- **Classic Load Balancer (v1)**
  - Supports only one SSL certificate
  - Must use multiple CLB for multiple hostname with multiple SSL certificates
- **Application Load Balancer (v2)**

  - Supports multiple listeners with multiple SSL certificates
  - Users Server Name Indication (SNI) to make it work

- **Network Load Balancer (v2)**
  - Supports multiple listeners with multiple SSL certificates
  - Users Server Name Indication (SNI) to make it work

---

# ELB: Connection Draining / Deregistration Delay

This feature is has two names:

- **Connection Draining**: For Classic Load Balancer
- **Deregistration Delay**: For Application Load Balancer & Network Load Balancer

The idea behind the concept is that, it will give some time for your Instances to complete the inflight request or the active request while the instance is being de-registered or marked unhealthy.

Once the connection is being drained, the ELB will stop sending the request to the EC2 Instance that is being drained while being de-registered.

The default is 300 seconds. We can set this between 1-3600 seconds

Can be disabled altogether by setting the value to 0.

---

# ELB: Auto-Scaling Groups

## Auto-Scaling Group: Overview

So when we deploy an application, the load can change over time because we may have more users visiting our website or application. So far we have used the EC2 Instance creation API to quickly create EC2 Instances and learned how to terminate EC2 Instances.

**Goal of an Auto-Scaling Group:**

- Automate this manual process of creating EC2 Instances (scale-out) to match an increased load or terminating EC2 Instances (scale-in) to match a decreased load.
- Define parameters to ensure there is a minimum and maximum number of instances running at any time in our ASG.
- Automatically register new instances that are part of the ASG to the Load Balancer
- Re-create an EC2 Instance in case a previous one is terminated (ex: if unhealthy)
- Auto-Scaling Groups are free, we only pay for EC2 Instances

---

## Auto-Scaling Group: Create an Auto-Scaling Group

---

## Auto-Scaling Group: Scaling Policies

### Dynamic Scaling

1. **Target Tracking Scaling:**

   - Most simple and easy to set up
   - Example: I want the average ASG CPU to stay at around 40%

2. **Simple / Step Scaling**

   - When a CloudWatch alarm is triggered (Example: CPU > 70%), then add 2 units
   - When a CloudWatch alarm is triggered (Example: CPU < 30%), then remove 1 unit

3. **Scheduled Actions**

   - Anticipate a scaling based on known usage patterns
   - Example: Increase the minimum capacity to 10 at 5 pm on Fridays

---

### Predictive Scaling

- Continuously forecast load and schedule scaling ahead. The historical load will be analyzed over time and then a forecast is going to be created, and then based on that forecast we will be scaling actions ahead of time.
- This is the future as this is machine learning powered and is a hands-off approach

---

### Notable Scaling Metrics

- **CPU Utilization**: Average CPU utilization across instances
- **Request Count Per Target**: To make sure requests per EC2 Instance is stable and doesn't exceed IOPS
- **Average Network In / Out**: If your application is network bound we need to make sure it stays within a certain threshold.
- **Custom Metrics using CloudWatch**

---

## Auto-Scaling Group - Scaling Cooldowns

After a scaling activity happens, you enter a cooldown period.

Default: 300 seconds

During the cooldown period the ASG will not launch of terminate additional instances (to allow for metrics to stabilize)

> **Tip**: Use a ready-to-use AMI to reduce configuration time in order to be serving requests faster and reduce the cooldown period.

---
