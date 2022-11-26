# Table of Contents

- [Table of Contents](#table-of-contents)
- [Why is Monitoring important?](#why-is-monitoring-important)
- [Monitoring in AWS](#monitoring-in-aws)
- [CloudWatch](#cloudwatch)
  - [CloudWatch Metrics](#cloudwatch-metrics)
  - [EC2 Detailed Monitoring](#ec2-detailed-monitoring)
  - [CloudWatch Custom Metrics](#cloudwatch-custom-metrics)
  - [CloudWatch Logs](#cloudwatch-logs)
    - [CloudWatch Logs: Overview](#cloudwatch-logs-overview)
    - [CloudWatch Logs: Sources](#cloudwatch-logs-sources)
    - [CloudWatch Logs: Metric Filter \& Insights](#cloudwatch-logs-metric-filter--insights)
    - [CloudWatch Logs: EC2 Instance Recovery](#cloudwatch-logs-ec2-instance-recovery)
    - [CloudWatch Logs: Exports](#cloudwatch-logs-exports)
    - [CloudWatch Logs: Aggregation](#cloudwatch-logs-aggregation)
  - [CloudWatch Logs Agent](#cloudwatch-logs-agent)
  - [CloudWatch Unified Agent](#cloudwatch-unified-agent)
  - [CloudWatch Alarms](#cloudwatch-alarms)
    - [CloudWatch Alarms: Overview](#cloudwatch-alarms-overview)
    - [CloudWatch Alarms: Composite Alarms](#cloudwatch-alarms-composite-alarms)
  - [CloudWatch Events](#cloudwatch-events)
    - [CloudWatch Events: Overview](#cloudwatch-events-overview)
    - [CloudWatch Events: Concepts](#cloudwatch-events-concepts)
- [Amazon EventBridge](#amazon-eventbridge)
  - [EventBridge: Overview](#eventbridge-overview)
  - [EventBridge: Schema Registry](#eventbridge-schema-registry)
  - [EventBridge: Resource-Based Policy](#eventbridge-resource-based-policy)
  - [Amazon EventBridge vs CloudWatch Events](#amazon-eventbridge-vs-cloudwatch-events)
- [Using the AWS CLI](#using-the-aws-cli)
  - [CloudWatch](#cloudwatch-1)
    - [`put-metric-data`](#put-metric-data)
  - [Logs](#logs)
    - [`put-metric-filter`](#put-metric-filter)
    - [`put-subscription-filter`](#put-subscription-filter)
  - [Events](#events)
    - [`create-event-bus`](#create-event-bus)
    - [`describe-event-bus`](#describe-event-bus)
    - [`create-archive`](#create-archive)
    - [`delete-archive`](#delete-archive)
    - [`put-permission`](#put-permission)
    - [`remove-permission`](#remove-permission)
    - [`put-rule`](#put-rule)
    - [`put-targets`](#put-targets)
    - [`remove-targets`](#remove-targets)
    - [`delete-rule`](#delete-rule)
    - [`delete-event-bus`](#delete-event-bus)

---

# Why is Monitoring important?

We know how to deploy applications. What we may not know is

---

# Monitoring in AWS

- **AWS CloudWatch**:

  - Metrics: Collect and track key metrics
  - Logs: Collect, monitor, analyze and store logs
  - Events: Send notifications when certain events happen in your AWS
  - Alarms: React in real-time to metrics/events

- **AWS X-Ray**:

  - Troubleshooting application performance (e.g. latency) and errors
  - Distributed tracing of microservices

- **AWS CloudTrail**:

  - Internal monitoring of API calls made
  - Audit changes to AWS Resources by your users

---

# CloudWatch

## CloudWatch Metrics

- CloudWatch provides metrics for every Service in AWS
- **Metric** is a variable to monitor (CPU Utilization, NetworkIn etc)
- Metrics belong to **namespaces**
- **Dimension** is an attribute of a metric (instance id, environment etc)
- Upto **`10`** dimensions per metric
- Metrics have **timestamps**
- Can create CloudWatch dashboards of metrics

---

## EC2 Detailed Monitoring

- EC2 Metrics by default have metrics "every 5 minutes"
- With detailed monitoring (for a cost), you get data "every 1 minute"
- Use detailed monitoring if you want to react and scale your ASG faster
- The AWS Free Tier allows us to have 10 detailed monitoring metrics
- **Note**: The EC2 Memory usage metric is by default not pushed (must be pushed from inside the instance as a custom metric)

---

## CloudWatch Custom Metrics

- Possible to define and send your own Custom Metric to CloudWatch
- Examples: memory (RAM) usage, disk space, number of logged in users, etc.
- This can be done using an API call: **`PutMetricData`** or via the AWS CLI (`aws cloudwatch put-metric-data`)
- The unified agent for CloudWatch uses the **`PutMetricData`** API call to push metrics into CloudWatch regularly
- Ability to add dimensions (attributes) to segment metrics
  - Instance.id
  - Environment.name
- Metric resolution (StorageResolution API parameter - two possible values):
  - Standard: **`1`** minute (60 seconds)
  - High Resolution: **`1`**/**`5`**/**`10`**/**`30`** second(s) - Higher cost

> **Important**: Accepts metric data points two weeks in the past and two hours in the future (make sure to configure your EC2 instance time correctly for accurate metric synchronization)

---

## CloudWatch Logs

### CloudWatch Logs: Overview

- You can use Amazon CloudWatch Logs to monitor, store, and access your log files from Amazon Elastic Compute Cloud (Amazon EC2) instances, AWS CloudTrail, Route 53, and other sources.
- **Log groups**: arbitrary name, usually representing an application
- **Log stream**: instances within application, log files, containers
- Can define log expiration policies (never expire, 30 days, etc)
- CloudWatch Logs cans end logs to:
  - Amazon S3 (exports)
  - Kinesis Data Streams
  - Kinesis Data Firehose
  - AWS Lambda
  - ElasticSearch

---

### CloudWatch Logs: Sources

- **SDK**, **CloudWatch Logs Agent** (deprecated), **CloudWatch Unified Agent**
- **Elastic Beanstalk**: collection of logs from application
- **ECS**: collection from containers
- **AWS Lambda**: collection from function logs
- **VPC Flow Logs**: VPC specific logs
- **API Gateway**: All requests made to the API gateway
- **CloudTrail**: Send logs based on filter
- **Route53**: Log DNS queries

---

### CloudWatch Logs: Metric Filter & Insights

- The idea is that you have CloudWatch Logs and you can filter expressions, for e.g.
  - Find a specific IP within a log (log lines where the IP appears)
  - Count appearances of **`"ERROR"`** in your logs as a metric
- Metric filters can be used to trigger CloudWatch Alarms
- Filters do not retroactively filter data. Filters only publish the metric data points for events that happen after the filter was created.

- CloudWatch Logs Insights can be used to query logs and add queries to CloudWatch Dashboards.

- **To create a Metric Filter using the Console**:

  - Go to **[CloudWatch Log groups](https://ap-south-1.console.aws.amazon.com/cloudwatch/home?region=ap-south-1#logsV2:log-groups)** and Select a Log group.
  - Click on the **`Metric filters`** tab and click the **`Create metric filter`** button.
  - Enter the following configuration:

    1. **Create filter pattern**: You can use filters to monitor events in a log group as they are sent to CloudWatch logs. You can monitor and count specific terms or extract values from log events and associate the results with a metric. [Learn more about pattern syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html)

       - **Filter pattern**: Specify the terms or pattern to match in your log events to create metrics. Example: `Installing`, will look for the word Installing in each log as its sent in

    2. **Test pattern**:

       - **Select log data to test**: Custom log data

         Click the **`Test pattern`** button after selecting log data to test and find matches

  - Click **`Next`** to **Assign Metric**

  - Enter the following configuration for Assign Metric

    3. **Create filter name**: Log events that match the pattern you define are recorded to the metric you specify. You can graph the metric and set alarms to notify you.

       - **Filter name**: Enter filter name
       - **Filter pattern**: Auto-fetched from the filter pattern from previous page

    4. **Metric details**:

       - **Metric namespace**: Namespaces let you group similar metrics. (Create new or choose existing)
       - **Metric name**: Metric name identifies this metric, and must be unique within the namespace. Metric name can be upto 255 characters long; all characters are valid except for colon (`:`), asterix (`*`), dollar (`$`) and space (` `)
       - **Metric value**: Metric value is the value published to the metric name when a Filter Pattern match occurs. Valid metric values are: floating point number (1.99), numeric field identifiers (`$1`, `$2`, etc), or named field identifiers (e.g. `$requestSize` for delimited filter pattern or `$.status` for JSON-based filter pattern - dollar (`$`) or dollar dot (`$.`) followed by alphanumeric and/or underscore (`_`) characters )
       - **Default value (_optional_)**: The default value is published to the metric when the pattern does not match. If you leave this blank, no value is published when there is no match.
       - **Unit (_optional_)**: Select a Unit

  - Click **`Next`** to Review

  - Click **`Create metric filter`** to create the Metric Filter

---

### CloudWatch Logs: EC2 Instance Recovery

- Status Check:

  - Instance status: Check the EC2 VM
  - System status: Check the underlying hardware

- Recovery: If Alarm is breached we can trigger an EC2 Instance Recovery with the Same Private, Public, Elastic IP, metadata, Placement Group and after successful recovery send an alert to a SNS Topic was recovered.

---

### CloudWatch Logs: Exports

**S3**

- Log data can take **upto 12 hours** to become available for export
- The API call is **`CreateExportTask`**
- Not near-real time or real-time
- For real-time streams from CloudWatch Logs, use Logs Subscriptions instead

**Others**

- CloudWatch Logs Subscriptions are filters that you can apply on top of your CloudWatch Logs and then we can send it to a destination like AWS Lambda, Kinesis Data Firehose (near Real-Time), Kinesis Streams (send data to Kinesis Data Firehose, Kinesis Data Analytics, Amazon EC2 or AWS Lambda)

  ![CloudWatch Logs: Subscriptions](assets/cloudwatch-logs-subscriptions.png)

---

### CloudWatch Logs: Aggregation

We can do Log Aggregations across Multi-Accounts or Multi-Region

![CloudWatch Logs: Aggregation](assets/cloudwatch-logs-aggregation.png)

---

## CloudWatch Logs Agent

By default, no logs from your EC2 Instance will go to CloudWatch. To push logs from your EC2 Instance to CloudWatch:

- You need to run a CloudWatch agent on EC2 to push the log files you want.
- Make sure the IAM permissions allow it to send logs to CloudWatch.
- The CloudWatch Log agent can also be used on-premises servers.
- Older version, superceded by CloudWatch Unified Agent

---

## CloudWatch Unified Agent

The unified (both logs and metrics, hence unified) CloudWatch agent enables you to do the following:

- Collect internal system-level metrics from Amazon EC2 instances across operating systems. The metrics can include in-guest metrics, in addition to the metrics for EC2 instances. The additional metrics that can be collected are listed in Metrics collected by the CloudWatch agent.

  - **CPU** (active, guest, idle, system, steal)
  - **Disk metrics** (free, used, total), Disk IO (writes, reads, bytes, IOPS)
  - **Memory** (free, inactive, used, total, cached)
  - **Netstat** (number of TCP and UDP connections, net packets, bytes)
  - **Processes** (total, dead, blocked, idle, running, sleep)
  - **Swap Space** (free, used, used %)

  > Reminder: Out-of-the-box metrics from EC2 include `Disk`, CPU, `Network` (high level)

- Collect system-level metrics from on-premises servers. These can include servers in a hybrid environment as well as servers not managed by AWS.

- Retrieve custom metrics from your applications or services using the StatsD and collectd protocols. StatsD is supported on both Linux servers and servers running Windows Server. collectd is supported only on Linux servers.

- Collect logs from Amazon EC2 instances and on-premises servers, running either Linux or Windows Server.

- Centralized configuration using SSM Parameter Store

---

## CloudWatch Alarms

### CloudWatch Alarms: Overview

- Alarms are used to trigger notifications for any metric
- Various options (sampling, %, max, min, etc.)
- Alarms have three states:

  - **`OK`**: Alarm is not triggered
  - **`INSUFFICIENT_DATA`**: There's not enough data
  - **`ALARM`**: Alarm threshold has been breached

- **Period**: How long you want your alarm to be evaluated for

  - Length in time in seconds to evaluate the metric
  - High resolution custom metrics: `10` / `30` or multiples of `60` seconds

- **Alarm Targets**:

  - **Actions on EC2 Instances**: **`Stop`**, **`Terminate`**, **`Reboot`** or **`Recover`** an EC2 Instance
  - **Trigger Auto Scaling Action**: Scale-Out or Scale-In
  - **Send Notification to SNS**: Send message to Message Broker from where we can do anything
  - **Systems Manager Action**:

- Can be created based on **CloudWatch Log Metric Filters**
- To test alarms and notifications, set the alarm state to alarm using CLI

  ```s
  aws cloudwatch set-alarm-state --alarm-name MyAlarm --state-value ALARM --state-reason Testing
  ```

---

### CloudWatch Alarms: Composite Alarms

- CloudWatch Alarms are on a single metric
- Composite Alarms are monitoring the states of multiple other alarms thereby creating a combination of multiple alarms each monitoring one different metric
- **`AND`** / **`OR`** conditions
- Helpful to reduce "alarm noise" by creating complex composite alarms. For example:
  - If the CPU usage is above 80% and the Network usage is below 50%, then don't alert. We only want notifications when CPU is above 80% AND Network usage is above 80%.

---

## CloudWatch Events

### CloudWatch Events: Overview

Amazon EventBridge is the preferred way to manage your events. CloudWatch Events and EventBridge are the same underlying service and API, but EventBridge provides more features. Changes you make in either CloudWatch or EventBridge will appear in each console.

### CloudWatch Events: Concepts

Before you begin using CloudWatch Events, you should understand the following concepts:

1. **Events**: An event indicates a change in your AWS environment.

   - AWS resources can generate events when their state changes. For example, Amazon EC2 generates an event when the state of an EC2 instance changes from pending to running, and Amazon EC2 Auto Scaling generates events when it launches or terminates instances.
   - AWS CloudTrail publishes events when you make API calls. You can generate custom application-level events and publish them to CloudWatch Events. You can also set up scheduled events that are generated on a periodic basis.
   - For a list of services that generate events, and sample events from each service, see **[CloudWatch Events Event Examples From Supported Services](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html)**.

2. **Rules**: A rule matches incoming events and routes them to targets for processing. A single rule can route to multiple targets, all of which are processed in parallel. Rules are not processed in a particular order. This enables different parts of an organization to look for and process the events that are of interest to them. A rule can customize the JSON sent to the target, by passing only certain parts or by overwriting it with a constant. See **[Schedule Expression for Rules](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)**. Can create Scheduled events or Cron jobs.

3. **Targets**: A target processes events. Targets can include Amazon EC2 instances, AWS Lambda functions, Kinesis streams, Amazon ECS tasks, Step Functions state machines, Amazon SNS topics, Amazon SQS queues, and built-in targets. A target receives events in JSON format.

   A rule's targets must be in the same Region as the rule.

   You can configure the following AWS services as targets for CloudWatch Events:

   - Amazon EC2 instances
   - AWS Lambda functions
   - Streams in Amazon Kinesis Data Streams
   - Delivery streams in Amazon Kinesis Data Firehose
   - Log groups in Amazon CloudWatch Logs
   - Amazon ECS tasks
   - Systems Manager Run Command
   - Systems Manager Automation
   - AWS Batch jobs
   - Step Functions state machines
   - Pipelines in CodePipeline
   - CodeBuild projects
   - Amazon Inspector assessment templates
   - Amazon SNS topics
   - Amazon SQS queues
   - Built-in targets: EC2 CreateSnapshot API call, EC2 RebootInstances API call, EC2 StopInstances API call, and EC2 TerminateInstances API call.
   - The default event bus of another AWS account

---

# Amazon EventBridge

## EventBridge: Overview

- EventBridge is the next evolution of CloudWatch Events
- **Default Event Bus**: Generated by AWS services (CloudWatch Events)
- **Partner Event Bus**: Receive events from a SaaS service or applications (Zendesk, DataDog, Segment, Auth0, etc)
- **Custom Event Bus**: For your own applications
- Event buses can be accessed by other AWS accounts through Resource Policies
- You can archive events (all / filter) sent to an event bus indefinitely or for a set period.
- Ability to replay archived events
- **Rules**: How to process events (like CloudWatch Events)

---

## EventBridge: Schema Registry

- EventBridge can analyze the events in your bus and infer the schema
- The Schema Registry allows you to genrate code for your application, that will know in advance how data is structured in the event bus
- Add your own custom schemas and registries.
- Schema can be versioned
- Schemas are searchable and accessible by developers across your organization.
- Generate code-bindings, such as Java, Python or TypeScript in your IDE for any event schemas.

---

## EventBridge: Resource-Based Policy

Just like we have S3 Bucket Policy for S3 or SQS resource policy for SQSQs, we can get resource-based policy for Amazon EventBridge

- Manage permissions for a specific Event Bus
- `Allow` / `Deny` events from another AWS Account or AWS Region
- **Use Case**:
  - Aggregate all events from your AWS Organization into a single AWS account or AWS Region
- **Example**:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": "events:PutEvents",
        "Principal": { "AWS": "11111122222233333" },
        "Resource": "arn:aws:events:ap-south-1:123456789012:event-bus/central-event-bus"
      }
    ]
  }
  ```

- If not defined, then only the event bus owner can send events to the event bus

---

## Amazon EventBridge vs CloudWatch Events

- Amazon EventBridge builds upon and extends CloudWatch Events.
- It uses the same service API and endpoint and the same underlying infrastructure.
- EventBridge allows extension to add event buses for your custom applications and your third-party SaaS apps.
- EventBridge has the Schema-Registry capability as well as Replaying, Archiving and Resource-Based Policy

---

# Using the AWS CLI

## CloudWatch

### [`put-metric-data`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudwatch/put-metric-data.html)

Publishes metric data points to Amazon CloudWatch. CloudWatch associates the data points with the specified metric. If the specified metric does not exist, CloudWatch creates the metric. When CloudWatch creates a metric, it can take up to fifteen minutes for the metric to appear in calls to ListMetrics.

**Syntax:**

```s
aws cloudwatch put-metric-data \
 --namespace [Namespace] \
 --metric-name [MetricName] \
 --value [MetricValue] \
 --unit [MetricUnit] \
 --dimensions [KeyName1=val1,KeyName2=val2,...]
```

**Example:**

```s
aws cloudwatch put-metric-data \
 --namespace MyNameSpace \
 --metric-name Buffers \
 --value 231434333 \
 --unit Bytes \
 --dimensions InstanceID=1-23456789,InstanceType=m1.small
```

---

## Logs

### [`put-metric-filter`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/logs/put-metric-filter.html)

**Syntax:**

```s
aws logs put-metric-filter
  --log-group-name [LogGroupName] \
  --filter-name [FilterName] \
  --filter-pattern [FilterPatternString] \
  --metric-transformations []
```

Where,

- **`--log-group-name`**: The name of the log group.
- **`--filter-name`**: A name for the metric filter.
- **`--filter-pattern`**: A filter pattern for extracting metric data out of ingested log events.
- **`--metric-transformations`**: A collection of information that defines how metric data gets emitted.

  ```s
  metricName=string,metricNamespace=string,metricValue=string,defaultValue=double,dimensions={KeyName1=string,KeyName2=string,Keyname3=string},unit=string
  ```

  Where,

  - **`metricName`**: The name of the CloudWatch metric.
  - **`metricNamespace`**: A custom namespace to contain your metric in CloudWatch. Use namespaces to group together metrics that are similar.
  - **`metricValue`**: The value to publish to the CloudWatch metric when a filter pattern matches a log event.
  - **`defaultValue`**: (Optional) The value to emit when a filter pattern does not match a log event. This value can be null.
  - **`dimensions`**: The fields to use as dimensions for the metric. One metric filter can include as many as **`3`** dimensions.
  - **`unit`:** The unit to assign to the metric. If you omit this, the unit is set as `None`
    ```s
    "Seconds"|"Microseconds"|"Milliseconds"|"Bytes"|"Kilobytes"|"Megabytes"|"Gigabytes"|"Terabytes"|"Bits"|"Kilobits"|"Megabits"|"Gigabits"|"Terabits"|"Percent"|"Count"|"Bytes/Second"|"Kilobytes/Second"|"Megabytes/Second"|"Gigabytes/Second"|"Terabytes/Second"|"Bits/Second"|"Kilobits/Second"|"Megabits/Second"|"Gigabits/Second"|"Terabits/Second"|"Count/Second"|"None"
    ```

**Example:**

```s
aws logs put-metric-filter \
  --log-group-name MyApp/message.log \
  --filter-name MyAppErrorCount \
  --filter-pattern "Error" \
  --metric-transformations \
      metricName=ErrorCount,metricNamespace=MyNamespace,metricValue=1,defaultValue=0
```

---

### [`put-subscription-filter`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/logs/put-subscription-filter.html)

**Syntax:**

```s
aws logs put-subscription-filter \
  --log-group-name [LogGroupName] \
  --filter-name [FilterName] \
  --filter-pattern [FilterPatternString] \
  --destination-arn [DestinationARN]
```

**Example:**

```s
aws logs put-subscription-filter \
  --log-group-name "DemoLogGroup" \
  --filter-name "Installs" \
  --filter-pattern "Installing" \
  --destination-arn "LAMBDA_FUNCTION_ARN"
```

---

## Events

### [`create-event-bus`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/create-event-bus.html)

Creates a new event bus within your account. This can be a custom event bus which you can use to receive events from your custom applications and services, or it can be a partner event bus which can be matched to a partner event source.

**Syntax:**

```s
aws events create-event-bus \
 --name [EventBusName] \
 --event-source-name [PartnerEventSource]
```

**Example:**

```s
aws events create-event-bus \
 --name DemoEventBus \
 --event-source-name [PartnerEventSource]
```

**Response:**

```json
{
  "EventBusArn": "arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus"
}
```

---

### `describe-event-bus`

Displays details about an event bus in your account. This can include the external Amazon Web Services accounts that are permitted to write events to your default event bus, and the associated policy. For custom event buses and partner event buses, it displays the name, ARN, policy, state, and creation time.

To enable your account to receive events from other accounts on its default event bus, use **[`PutPermission`](#put-permission)**.

**Syntax:**

```s
aws events describe-event-bus --name [EventBusName]
```

**Example:**

```s
aws events describe-event-bus --name DemoEventBus
```

**Response**

```json
{
  "Name": "DemoEventBus",
  "Arn": "arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus"
}
```

---

### [`create-archive`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/create-archive.html)

Creates an archive of events with the specified settings. When you create an archive, incoming events might not immediately start being sent to the archive. Allow a short period of time for changes to take effect. If you do not specify a pattern to filter events sent to the archive, all events are sent to the archive except replayed events. Replayed events are not sent to an archive.

**Syntax:**

```s
aws events create-archive \
 --archive-name [ArchiveName] \
 --event-source-arn [EventBusARN]
 --event-pattern [EventPatternString]
 --retention-days [NumberOfDaysInteger | 0]
```

**Example: Create an archive with a retention of 7 days**

```s
aws events create-archive \
 --archive-name DemoEventArchive \
 --event-source-arn "arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus"
 --retention-days 7
```

**Response:**

```json
{
  "ArchiveArn": "arn:aws:events:ap-south-1:336463900088:archive/DemoEventArchive",
  "State": "ENABLED",
  "CreationTime": "2022-11-26T14:58:42+05:30"
}
```

---

### [`delete-archive`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/delete-archive.html)

Deletes the specified archive.

**Syntax:**

```s
aws events delete-archive --archive-name [ArchiveName]
```

**Example:**

```s
aws events delete-archive --archive-name DemoEventArchive
```

**Response:**

None

---

### [`put-permission`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/put-permission.html)

- Running **`PutPermission`** permits the specified Amazon Web Services account or Amazon Web Services organization to put events to the specified _event bus_.
- Amazon EventBridge (CloudWatch Events) rules in your account are triggered by these events arriving to an event bus in your account.
- To enable multiple Amazon Web Services accounts to put events to your event bus, run **`PutPermission`** once for each of these accounts.
- Or, if all the accounts are members of the same Amazon Web Services organization, you can run PutPermission once specifying Principal as `"*"` and specifying the Amazon Web Services organization ID in **`Condition`**, to grant permissions to all accounts in that organization.
- If you grant permissions using an organization, then accounts in that organization must specify a RoleArn with proper permissions when they use **`PutTarget`** to add your account’s event bus as a target.
- For more information, see **[Sending and Receiving Events Between Amazon Web Services Accounts](https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-cross-account-event-delivery.html)** in the Amazon EventBridge User Guide.
- The permission policy on the event bus cannot exceed 10 KB in size.

**Syntax:**

```s
aws events put-permission \
 --event-bus-name [EventBusName | "default"] \
 --action [PolicyAction] \
 --principal [PolicyPrincipal] \
 --statement-id [UniqueStatementID] \
 --condition [Type=string,Key=string,Value=string] \
 --policy [PolicyJSONString | JSONFilePathURL] # Use instead of `StatementId` , `Action` , `Principal` , or `Condition` parameters.
```

1. **Example 1: Add a Permission to a custom event bus**

   ```s
   aws events put-permission \
   --event-bus-name "DemoEventBus" \
   --action "events:PutEvents" \
   --principal "336463900088" \
   --statement-id "EventBridgeReadAccess"
   ```

2. **Example 2: Add a Permission to a custom event bus with a Policy from a `policy.json` file**

   The `policy.json` file

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "EventBridgeReadAccess",
         "Effect": "Allow",
         "Principal": { "AWS": "arn:aws:iam::336463900088:root" },
         "Action": "events:PutEvents",
         "Resource": "arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus"
       }
     ]
   }
   ```

   **Method 1: Get the JSON String, copy it and use it with the `put-permission` command**

   ```s
   echo $(cat policy.json | jq -c | jq -R)
   ```

   **Use it here:**

   ```s
   aws events put-permission \
   --event-bus-name "DemoEventBus" \
   --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"EventBridgeReadAccess\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"arn:aws:iam::336463900088:root\"},\"Action\":\"events:PutEvents\",\"Resource\":\"arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus\"}]}"
   ```

   **Method 2: Specify the JSON `filePathURL`**

   ```s
   aws events put-permission \
    --event-bus-name DemoEventBus
    --policy file:///home/jayantasamaddar/policy.json
   ```

**Response:**

None

**Check with `describe-event-bus`**

```s
aws events describe-event-bus --name DemoEventBus
```

**Response:**

```json
{
  "Name": "DemoEventBus",
  "Arn": "arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus",
  "Policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"EventBridgeReadAccess\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"arn:aws:iam::336463900088:root\"},\"Action\":\"events:PutEvents\",\"Resource\":\"arn:aws:events:ap-south-1:336463900088:event-bus/DemoEventBus\"}]}"
}
```

---

### [`remove-permission`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/remove-permission.html)

Revokes the permission of another Amazon Web Services account to be able to put events to the specified event bus. Specify the account to revoke by the `StatementId` value that you associated with the account when you granted it permission with PutPermission . You can find the `StatementId` by using **`DescribeEventBus`**.

```s
aws events remove-permission \
 --statement-id [PolicySid] \
 --event-bus-name [EventBusName] \
 --remove-all-permissions
```

**Example 1: Remove a permission from a custom Event Bus**

```s
aws events remove-permission --event-bus-name DemoEventBus --statement-id EventBridgeReadAccess
```

**Example 2: Remove all permissions from a custom Event Bus**

```s
aws events remove-permission --event-bus-name DemoEventBus --remove-all-permissions
```

---

### [`put-rule`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/put-rule.html)

Creates or updates the specified rule. Rules are enabled by default, or based on value of the state.

**Syntax:**

```s
aws events put-rule \
 --name EC2InstanceStateChangeStopOrTerminate \
 --event-pattern [EventPatternJSONString | JSONFilePathURL] \
 --event-bus-name [EventBusName | "default"] \
 --role-arn [IAMRoleARN]
```

**Example: Creates a rule that triggers when any EC2 instance in the region is stopped or terminated**

```s
aws events put-rule \
 --name EC2InstanceStateChangeStopOrTerminate \
 --event-pattern "{\"source\":[\"aws.ec2\"],\"detail-type\":[\"EC2 Instance State-change Notification\"],\"detail\":{\"state\":[\"stopped\",\"terminated\"]}}" \
 --event-bus-name DemoEventBus \
 --role-arn "arn:aws:iam::123456789012:role/MyRoleForThisRule"
```

OR

```s
aws events put-rule \
 --name EC2InstanceStateChangeStopOrTerminate \
 --event-pattern file:///home/jayantasamaddar/EC2InstanceStateChangeStopOrTerminate.json \
 --event-bus-name DemoEventBus \
 --role-arn "arn:aws:iam::123456789012:role/MyRoleForThisRule"
```

---

### [`put-targets`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/put-targets.html)

Adds the specified targets to the specified rule, or updates the targets if they are already associated with the rule.

Targets are the resources that are invoked when a rule is triggered.

> **Note**: Each rule can have up to five (`5`) targets associated with it at one time.

**Syntax:**

```s
aws events put targets \
 --event-bus-name [EventBusName | 'default'] \
 --rule [RuleName] \
 --targets [ListOfTargets]
```

**Example: Adds a Lambda function as the target of a rule**

```s
aws events put-targets \
 --event-bus-name DemoEventBus \
 --rule DailyLambdaFunction \
 --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:123456789012:function:MyFunctionName"
```

**Example: Sets an Amazon Kinesis stream as the target, so that events caught by this rule are relayed to the stream:**

```s
aws events put-targets \
 --event-bus-name DemoEventBus \
 --rule EC2InstanceStateChanges \
 --targets "Id"="1","Arn"="arn:aws:kinesis:us-east-1:123456789012:stream/MyStream","RoleArn"="arn:aws:iam::123456789012:role/MyRoleForThisRule"
```

**Example: Sets two Amazon Kinesis streams as targets for one rule**

```s
aws events put-targets \
 --event-bus-name DemoEventBus \
 --rule DailyLambdaFunction \
 --targets "Id"="Target1","Arn"="arn:aws:kinesis:us-east-1:379642911888:stream/MyStream1","RoleArn"="arn:aws:iam::379642911888:role/ MyRoleToAccessLambda"  "Id"="Target2"," Arn"="arn:aws:kinesis:us-east-1:379642911888:stream/MyStream2","RoleArn"="arn:aws:iam::379642911888:role/MyRoleToAccessLambda"
```

---

### [`remove-targets`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/remove-targets.html)

Removes the specified targets from the specified rule. When the rule is triggered, those targets are no longer be invoked.

> **Note**: A successful execution of RemoveTargets doesn’t guarantee all targets are removed from the rule, it means that the target(s) listed in the request are removed.

When you remove a target, when the associated rule triggers, removed targets might continue to be invoked. Allow a short period of time for changes to take effect.

This action can partially fail if too many requests are made at the same time. If that happens, `FailedEntryCount` is non-zero in the response and each entry in `FailedEntries` provides the ID of the failed target and the error code.

**Syntax:**

```s
aws events remove-targets \
 --event-bus-name [EventBusName | "default"] \
 --rule [RuleName] \
 --ids [TargetID1 TargetID2 ...]
```

**Example:**

```s
aws events remove-targets \
 --event-bus-name DemoEventBus \
 --rule DailyLambdaFunction \
 --ids "Target1" "Target2"
```

---

### [`delete-rule`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/delete-rule.html)

Deletes the specified rule.

Before you can delete the rule, you must remove all targets, using **`RemoveTargets`** .

When you delete a rule, incoming events might continue to match to the deleted rule. Allow a short period of time for changes to take effect.

If you call delete rule multiple times for the same rule, all calls will succeed. When you call delete rule for a non-existent custom eventbus, `ResourceNotFoundException` is returned.

Managed rules are rules created and managed by another Amazon Web Services service on your behalf. These rules are created by those other Amazon Web Services services to support functionality in those services. You can delete these rules using the `Force` option, but you should do so only if you are sure the other service is not still using that rule.

**Syntax:**

```s
aws events delete-rule \
 --event-bus-name [EventBusName | "default"] \
 --name [RuleName]
```

**Example:**

```s
aws events delete-rule --event-bus-name DemoEventBus --name EC2InstanceStateChangeStopOrTerminate
```

---

### [`delete-event-bus`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/events/delete-event-bus.html)

Deletes the specified custom event bus or partner event bus. All rules associated with this event bus need to be deleted. You can’t delete your account’s default event bus.

**Syntax:**

```s
aws events delete-event-bus --name [EventBusName]
```

**Example:**

```s
aws events delete-event-bus --event-bus-name DemoEventBus
```

**Response:**

None

---
