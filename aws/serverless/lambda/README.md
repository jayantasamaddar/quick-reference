# Table of Contents

- [Table of Contents](#table-of-contents)
- [Serverless: A Primer](#serverless-a-primer)
- [AWS Lambda: Overview](#aws-lambda-overview)
- [AWS Lambda: Pre-requisite Workflow before a Function can be created](#aws-lambda-pre-requisite-workflow-before-a-function-can-be-created)
- [AWS Lambda: Workflow](#aws-lambda-workflow)
- [AWS Lambda: Synchronous Invocations](#aws-lambda-synchronous-invocations)
  - [Synchronous Invocation: Services](#synchronous-invocation-services)
  - [AWS Lambda: Function Handler in Node.js](#aws-lambda-function-handler-in-nodejs)
- [AWS Lambda: Asynchronous Invocations](#aws-lambda-asynchronous-invocations)
- [AWS Lambda: Event Source Mapping](#aws-lambda-event-source-mapping)
  - [Event Source Mapping: Overview](#event-source-mapping-overview)
  - [Event Source Mapping: Queues and Lambda](#event-source-mapping-queues-and-lambda)
  - [Event Source Mapping: Streams and Lambda](#event-source-mapping-streams-and-lambda)
  - [Event Source Mapping: Batching behaviour](#event-source-mapping-batching-behaviour)
  - [Event Source Mapping: Event Mapper Scaling](#event-source-mapping-event-mapper-scaling)
- [AWS Lambda: Destinations](#aws-lambda-destinations)
- [Using the CLI](#using-the-cli)
  - [`create-function`](#create-function)
  - [`get-function`](#get-function)
  - [`list-functions`](#list-functions)
  - [`add-permission`](#add-permission)
  - [`create-event-source-mapping`](#create-event-source-mapping)
  - [`get-event-source-mapping`](#get-event-source-mapping)
  - [`invoke`](#invoke)
  - [`put-function-event-invoke-config`](#put-function-event-invoke-config)
  - [`update-function-code`](#update-function-code)
  - [`delete-event-source-mapping`](#delete-event-source-mapping)
  - [`delete-function`](#delete-function)
- [References](#references)

---

# Serverless: A Primer

Serverless is a new paradigm in which the developers don't have to manage servers anymore. Serverless doesn't mean there are actually no servers, it just means that the developer doesn't have to manage / provision them.

**Serverless in AWS**:

- **AWS Lambda**
- **DynamoDB**
- **AWS Cognito**
- **AWS API Gateway**
- **Amazon S3**
- **SQS**
- **SNS**
- **AWS Kinesis Data Firehose**
- **Aurora Serverless**
- **Step Functions**
- **Fargate**

**Comparison between Server Architecture vs Serverless Architecture**

| Server Architecture (EC2)                          | Serverless Architecture (AWS Lambda)     |
| -------------------------------------------------- | ---------------------------------------- |
| Virtual Servers in the Cloud                       | Virtual functions - no servers to manage |
| Limited by RAM and CPU                             | Limited by time - short executions       |
| Continuously running                               | Run On-demand                            |
| Scaling means intervention to add / remove servers | Scaling is automated                     |

---

# AWS Lambda: Overview

Lambda is a compute service that lets you run code without provisioning or managing servers. Lambda runs your code on a high-availability compute infrastructure and performs all of the administration of the compute resources, including server and operating system maintenance, capacity provisioning and automatic scaling, code monitoring and logging.

With Lambda, you can run code for virtually any type of application or backend service.

- **Easy Pricing**: Pay per request and compute time
- **Free Tier**: 1,000,000 AWS Lambda requests and 400,000 GBs of compute time per month
- Easy to get more resources per function: Upto 10 GB of RAM per function
- Increasing RAM would also improve the CPU and network

- **Language Support**:

  - Node.js (JavaScript)
  - Python
  - Java (Java 8 Compatible)
  - C# (.NET core)
  - Golang
  - C# / Powershell
  - Ruby
  - Custom Runtime API (community supported, example: Rust)

- **Lambda Container Image**

  - The container image must implement the Lambda Runtime API
  - ECS / Fargate is preferred for running arbitrary Docker images

- **Lambda Integrations**:

  - **API Gateway**: Used to create a REST API and it will invoke our Lambda functions
  - **Kinesis**: To do data transformations on the fly
  - **DynamoDB**: Used to create triggers based on Database events
  - **S3**: Used to trigger functions on events that happen in S3. E.g. `ObjectCreated`
  - **CloudFront**: Lambda at the Edge
  - **CloudWatch events** / **EventBridge**: Automations based on events on AWS architecture
  - **SNS**: Automations based on notifications sent to SNS topics
  - **SQS**: Process messages from SQS Queues
  - **Cognito**: Automations based on when an user logs into your database

---

# AWS Lambda: Pre-requisite Workflow before a Function can be created

When creating a Lambda Function from the Lambda Console, we may not know what happens under the hood because everything happens on a single screen.

Behind the scenes, even before a Lambda Function is created it has the following workflow:

1.  **Create the execution role with a trust policy that allows your Lambda permission to call AWS Secure Token Service (AWS STS) to issue temporary credentials (`sts:AssumeRole`)**

    ```s
    aws iam create-role \
    --role-name AWSLambdaBasicRole \
    --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
    ```

2.  **Add the relevant permissions policy (E.g. `AWSLambdaBasicExecutionRole`) to the role.**

    ```s
    aws iam attach-role-policy \
    --role-name AWSLambdaBasicRole \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    ```

3.  **Create the Function and save it into a file.**

    Function can either be a synchronous or an asynchronous invocation.

    Refer to the sections:

    - [Synchronous Invocation](#aws-lambda-synchronous-invocations)
    - Asynchronous Invocation

4.  **Create a deployment package (`.zip`) from the file**

    ```s
    # On Ubuntu
    zip [path/to/save/file.zip] [path/to/function.js] -j
    ```

So when we are using the CLI or the SDK to create a Lambda function, this must be kept in mind. Unless the Roles are already created, we may have to create them.

---

# AWS Lambda: Workflow

1. Create the execution role that gives your function permission to access AWS resources
2. Add the Service Role policy / Custom policy to the role
3. Create the Function and save it into a file
4. Create a deployment package (`.zip`) from the file
5. Create Lambda Function with the Role using the syntax below.
6. For asynchronous and synchronous invocations: Add Permissions to the trigger to invoke the function (if any)
7. For events that need to be polled from the source: Map event sources using **[Event Source Mapping](#aws-lambda-event-source-mapping)**

---

# AWS Lambda: Synchronous Invocations

## Synchronous Invocation: Services

1. **User Invoked**

- Elastic Load Balancing (Application Load Balancer)
- Amazon API Gateway
- Amazon Cloudfront
- Amazon S3 Batch

2. **Service Invoked**

- Amazon Cognito
- AWS Step Functions

3. **Other Services**

- Amazon Lex
- Amazon Alexa
- Amazon Kinesis Data Firehose

---

## AWS Lambda: Function Handler in Node.js

- The `index.js` or `index.mjs` file exports a function named `handler` that takes an `event` object and a `context` object.

  > **Note:** Beware of file name requirements. For `Node.js` this file has to be named `index.js` or `index.cjs` or `index.mjs` before it is zipped or Lambda will not read from it.

- This is the handler function that Lambda calls when the function is invoked. The Node.js function runtime gets invocation events from Lambda and passes them to the handler.
- In the function configuration, the handler value is `index.handler`.
- A Callback function: `callback(error, result)` can be passed and run within the handler. Useful when you want the function to remain synchronous but be able to handle requests from a client.

In `index.js`,

```js
console.log('Loading function');

exports.handler = (event, context, callback) => {
  console.log(event);
  const result = {
    statusCode: 200,
    statusDescription: '200 OK',
    isBase64Encoded: false,
    headers: {
      'Content-Type': 'text/html',
    },
    body: '<h1>Hello from Lambda!</h1>',
  };
  callback(null, result);
};
```

Where,

- `event`: The request sent by the event for e.g. a HTTP Request
- `context`: When Lambda runs your function, it passes a context object to the handler. This object provides methods and properties that provide information about the invocation, function, and execution environment. For more details Read the Documentation - **[AWS Lambda context object in Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html)**
- `callback`: Callback function that runs after the code above is executed.
  - `error`: If there's an error, pass the error to be returned
  - `result`: The result that must be returned from the handler function.

---

# [AWS Lambda: Asynchronous Invocations](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html)

Several AWS services, such **Amazon S3** and **Amazon SNS**, invoke functions asynchronously to process events. When you invoke a function asynchronously, you don't wait for a response from the function code. You hand off the event to Lambda and Lambda handles the rest. You can configure how Lambda handles errors, and can send invocation records to a downstream resource to chain together components of your application.

---

# [AWS Lambda: Event Source Mapping](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html)

## Event Source Mapping: Overview

An event source mapping is a Lambda resource that reads from an event source and invokes a Lambda function synchronously. You can use event source mappings to process items from either:

- A stream
- A queue

i.e. in services that don't invoke Lambda functions directly and have to be polled by AWS Lambda.

Lambda provides event source mappings for the following services:

- **Kinesis Data Streams**
- **DynamoDB Streams**
- **Amazon Managed Streaming for Apache Kafka (Amazon MSK)**
- **Self-managed Apache Kafka**
- **Amazon MQ and RabbitMQ**
- **Amazon Simple Queue Service (Amazon SQS)**

An event source mapping uses permissions in the function's execution role to read and manage items in the event source. Permissions, event structure, settings, and polling behavior vary by event source.

We can create an Event Source Mapping using the **[CreateEventSourceMapping API](#create-event-source-mapping)**

---

## Event Source Mapping: Queues and Lambda

- Event Source Mapping will poll SQS (Long Polling)

- Specify batch size (1 - 10 messages for FIFO, 1 - 10,000 for Standard)

- **Recommended**: Set the Queue visibility timeout to 6x the timeout of your Lambda function

- **In-order processing**: Lambda supports in-order processing only for FIFO queues.

- **Scale**:

  - FIFO Queue: Lambda scales up to the number of active message groups.
  - Standard Queue: Lambda scales up as fast as possible.

- **On successful process:** Processed items are removed from the queue

- **On failed process**:

  - Batches are returned to the queue as individual items and might be processed in a different grouping than the original batch.
  - Occasionally, the event source mapping might receive the same item from the queue twice, even if no function error occurred. So make sure to have an idempotent processing for the Lambda function in case that happens.
  - You can configure the source SQS queue to send items to a Dead Letter Queue (DLQ) if they cannot be processed.
  - Setup DLQ on the SQS queue not on Lambda (**DLQ for Lambda works only for Asynchronous Invocations**)

---

## Event Source Mapping: Streams and Lambda

- An event source mapping creates an iterator for each shard, invoking one Lambda per stream per shard

- Processes items in order at the shard level.

- We can configure where to read from the stream:

  - Start with new items
  - From the beginning
  - Specific timestamp

- **On successful process:** Processed items are not removed from the stream (other consumers can read them)

- **Use Case:**

  - Low Traffic: Use batch window to accumulate records, before processing (batching)
  - High Traffic: Process multiple batches in parallel at the shard level
    - Upto 10 batches per shard
    - In-order processing is still guaranteed for each partition key

- **Errors:**

  - By default, if your function returns an error, the entire batch is reprocessed:
    - Until the function succeeds, or
    - The items in the batch expire
  - To ensure in-order processing, processing for the affected shard is paused until the error is resolved
  - You can configure the event source mapping to:
    - Discard old events
    - Restrict the number of retries
    - Split the batch on error (to work around Lambda timeout issues)

---

## [Event Source Mapping: Batching behaviour](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping-batching)

Event source mappings read items from a target event source. By default, an event source mapping batches records together into a single payload that Lambda sends to your function. To fine-tune batching behavior, you can configure:

- `MaximumBatchingWindowInSeconds`: A batching window is the maximum amount of time to gather records into a single payload.

  - **For Kinesis, DynamoDB, SQS**:

    - Default: `0 sec`

  - **For Amazon MSK, Self-managed Apache Kafka, Amazon MQ**:

    - Default: `500 ms`
    - Minimum: `0 sec`
    - Maximum: `300 sec`
    - Once this is set, you cannot revert back to the `500 ms` batching window, as you can only make changes in seconds.

- `BatchSize`: The maximum number of records in each batch that Lambda pulls from your stream or queue and sends to your function. Lambda passes all of the records in the batch to the function in a single call, up to the payload limit for synchronous invocation (`6 MB`). Minimum: `1`.

  - **Amazon SQS**:

    - Default: `10`
    - Maximum:
      - FIFO Queues: `10`
      - Standard Queeus: `10,000`

  - **Amazon Kinesis**, **DynamoDB Streams**, **Amazon MSK**, **Self-managed Apache Kafka**, **Amazon MQ**:
    - Default: `100`
    - Max `10,000`

**Lambda invokes the function when one of the following criteria are met:**

- The batching window reaches its maximum value.
- The batch size is met.
- The payload size reaches `6 MB`. You cannot modify this limit.

---

## Event Source Mapping: Event Mapper Scaling

- **Kinesis Data Streams & DynamoDB Streams**

  - One Lambda invocation per stream per shard
  - If you use parallelization, upto 10 batches processed per shard simultaneously

- **SQS Standard**

  - Lambda adds 60 more instances per minute to scale up
  - Up to 1000 batches of messages processed simultaneously

- **SQS FIFO**

  - Messages with the same **`MessageGroupID`** will be processed in order
  - The Lambda function scales to the number of active message groups

---

# AWS Lambda: Destinations

- Send the result of an asynchronous invocation or the failure of an event mapper into somewhere.

- For Asynchronous invocations: Can define destinations for both successful and failed events.

  - Amazon SQS
  - Amazon SNS
  - AWS Lambda
  - Amazon Eventbridge Bus

  ![Asynchronous Invocation: Destinations](assets/lambda-asynchronous-destinations.png)

  > **Recommendation:** AWS recommends that you use Destinations instead of DLQ now. (But both can be used at the same time)

- For Event Source Mapping: Can define destinations for discarded event batches

  - Amazon SQS
  - Amazon SNS

  ![Lambda: Event Source Mapping](assets/lambda-eventsourcemapping.png)

---

# Using the CLI

## [`create-function`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/create-function.html)

The Basic Workflow of creating a Lambda function is like this:

1. Create the execution role that gives your function permission to access AWS resources (Lambda)
2. Add the Service Role / Custom policy to the role
3. Create the Function and save it into a file
4. Create a deployment package (`.zip`) from the file
5. Create Lambda Function with the Role using the syntax below.

**Syntax:**

```s
aws lambda create-function \
 --function-name [FunctionName]
 --description "An Amazon SQS trigger that logs messages in a queue." \
 --runtime [Runtime] \
 --role [IAMRole] \
 --zip-file [DeploymentPackageZipFilePathURL] \
 --handler [FunctionHandler] \
 --dead-letter-config TargetArn=[SQSQueueARN | SNSTopicARN]
```

**Examples:**

1. [Invoke Lambda Function from a HTTP(S) endpoint (using ALB)](assets/functions/helloworld)
2. [Create a Lambda Function that Logs the Messages sent to a cross-account Amazon SQS Queue](assets/functions/sqsprocessor)
3. [Run a Lambda Function that runs every hour (Integrating EventBridge)](assets/functions/cronevent)
4. Invoke a Lambda Function on CodePipeline Pipeline state changes

---

## [`get-function`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-function.html)

Returns information about the function or function version, with a link to download the deployment package that’s valid for 10 minutes. If you specify a function version, only details that are specific to that version are returned.

**Syntax:**

```s
aws lambda get-function --function-name [FunctionName]
```

**Example:**

```s
aws lambda get-function --function-name demo-lambda-sqs
```

**Response:**

```json
{
  "Configuration": {
    "FunctionName": "demo-lambda-sqs",
    "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:demo-lambda-sqs",
    "Runtime": "nodejs14.x",
    "Role": "arn:aws:iam::336463900088:role/service-role/sqs-poller",
    "Handler": "index.handler",
    "CodeSize": 331,
    "Description": "An Amazon SQS trigger that logs messages in a queue.",
    "Timeout": 3,
    "MemorySize": 128,
    "LastModified": "2022-11-28T13:12:35.907+0000",
    "CodeSha256": "XETCgvnD7jEegY3cSsUY1Wz6hRpLbV3fpA8/crqfhiU=",
    "Version": "$LATEST",
    "TracingConfig": {
      "Mode": "PassThrough"
    },
    "RevisionId": "3a02216e-8090-4844-bb9a-4dce232dfd24",
    "State": "Active",
    "LastUpdateStatus": "Successful",
    "PackageType": "Zip",
    "Architectures": ["x86_64"],
    "EphemeralStorage": {
      "Size": 512
    }
  },
  "Code": {
    "RepositoryType": "S3",
    "Location": "https://awslambda-ap-s-1-tasks.s3.ap-south-1.amazonaws.com/snapshots/336463900088/demo-lambda-sqs-4d72313d-f6cd-4f93-bfeb-724125cd167f?versionId=0QOAkK58P2dxwn7YRpqWnmbf1FKB4syH&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCmFwLXNvdXRoLTEiRjBEAiBvj3zLX0Qsrj0lcWmxVoYZdgJ71EvMGB954B1VrsOtUwIgQo2aPN05Vx%2ByDdrZkP9BXA5dnO9NAmzRxZrK1K7hiC4q0AQITBADGgw1NDUyNTUyMDEzMDciDC2mq2o%2F1M2cTdcM0iqtBF7K19LAojUk4GQZsBGFoa0%2FF9ZpvxZy5yN8MkqMOlRfmeyO8eN%2BlEv1qEuEETXDtuE%2F3JOYsnw3lqeb5Fr%2FWx1%2BKdGugdQilvxOL4KXyvjZKIm3iAlxsc5oLvHzRh8Hz%2FzhN4C7TVM3%2FAaN37biXhQp7ArriTO2ZXExFOItQYTRiWBCiBwSbUIT4yTaiwHukKeZyXIFxPXfT8%2F2xQE7z96TvukLGhnq%2BEITiZYoUzCmBDYkEDdQU6T4v%2FPCZi2droPYknVIdqiQ80pl69Ik8q8%2FR9VoPG8mMAE5hmwmA0OikEPFbu4uXW%2FfKxQjxohK9iKIztQD7mRMjfVMiJx0BtRoLgkGJg%2FfK6HZ%2B9pHjgYXbhITleoe3iBcjJ4E25bNTb6vw%2FkeuMl4d3sSUh%2BvDLNS9KWdigN9G2LmIh3J5FqoKG9g6jlC45qpFs5VGMpb5%2Be1oYt%2FkA9sMnUqWvahBQkoRAo5CeAmznFh37VT2OhDR2oWAVYccgWweW%2FoBdIWKu%2BsQEg%2BMnlKNYblY6wTykyL8REX848XJRSNiPT9IDL%2B3kWpdn671xnEwZ0RSax8I5D63ENnWpsga95hWTYTI6cu9blp1vzfvKymjSSp0KdPhIeGXRGDiOf3turc0kkF7pvOgkZnHmXxfszYK1gQVK8K1EJptX1PWrC%2Fj1t4vEK4ZZem2AFj%2BI0JOaFXwL4vHlEdHHwkw406QzA7jotnGJGMnhI4tTSakNSACF4hMPSBlJwGOqoBoVzsf75jYSgjyJX6R7McyBcMPTzA0ouIqvwtiddHcWR%2BrVfaaQouokOkpPzd%2BMFYy%2BFasDI6pIn%2BjnL1%2BBsR3kvnQDHHrpqkB7RMBQgypbwBcYxaz4mBlKGPUcuIxXUggX76W8yvp3fAt83eWfWePxBZJqqc87HM8q0zkqk0nvab%2BOWqVNmgvHgvtABAHn1XQU92h4mvFbt3Vs1NBeUmFi5oVuuZs7XQnPY%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221128T193940Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=ASIAX5456DIN4AWGTLDR%2F20221128%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e72a5212a3730367552e1e48e6f87d23e5471d8c7e9497c143ab11733ac3f6a2"
  },
  "Tags": {
    "lambda-console:blueprint": "sqs-poller"
  }
}
```

---

## [`list-functions`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/list-functions.html)

**Syntax:**

```s
aws lambda list-functions \
 --max-items [Number]
```

**Example: Retrieve a list of max 10 functions**

```s
aws lambda list-functions --max-items 10
```

**Response:**

```json
{
  "Functions": [
    {
      "FunctionName": "demo-lambda-sqs",
      "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:demo-lambda-sqs",
      "Runtime": "nodejs14.x",
      "Role": "arn:aws:iam::336463900088:role/service-role/sqs-poller",
      "Handler": "index.handler",
      "CodeSize": 331,
      "Description": "An Amazon SQS trigger that logs messages in a queue.",
      "Timeout": 3,
      "MemorySize": 128,
      "LastModified": "2022-11-28T13:12:35.907+0000",
      "CodeSha256": "XETCgvnD7jEegY3cSsUY1Wz6hRpLbV3fpA8/crqfhiU=",
      "Version": "$LATEST",
      "TracingConfig": {
        "Mode": "PassThrough"
      },
      "RevisionId": "3a02216e-8090-4844-bb9a-4dce232dfd24",
      "PackageType": "Zip",
      "Architectures": ["x86_64"],
      "EphemeralStorage": {
        "Size": 512
      }
    }
  ]
}
```

---

## [`add-permission`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/create-event-source-mapping.html)

Grants an Amazon Web Service, Amazon Web Services account, or Amazon Web Services organization permission to use a function. You can apply the policy at the function level, or specify a qualifier to restrict access to a single version or alias. If you use a qualifier, the invoker must use the full Amazon Resource Name (ARN) of that version or alias to invoke the function.

> Note: Lambda does not support adding policies to version $LATEST.

- To grant permission to another account, specify the account ID as the `Principal`.
- To grant permission to an organization defined in Organizations, specify the organization ID as the `PrincipalOrgID`.
- For Amazon Web Services, the principal is a domain-style identifier that the service defines, such as `s3.amazonaws.com` or `sns.amazonaws.com`.
- For Amazon Web Services, you can also specify the ARN of the associated resource as the `SourceArn`.
- If you grant permission to a service principal without specifying the source, other accounts could potentially configure resources in their account to invoke your Lambda function.

This operation adds a statement to a resource-based permissions policy for the function.

For more information about function policies, see [Using resource-based policies for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html).

**Syntax:**

```s
aws lambda add-permission \
 --function-name [FunctionName] \
 --statement-id [Statement-Sid] \
 --action 'lambda:InvokeFunction' \
 --principal [ [SERVICE].amazonaws.com ] \
 --principal-org-id [PrincipalOrgId] \
 --revision-id [OldPolicySid] \
 --source-arn [EventSourceARN] \
 --cli-binary-format "raw-in-base64-out"
```

**Example:**

```s
aws lambda add-permission \
 --function-name LogScheduledEvent \
 --statement-id PerMinuteScheduledEvent \
 --action 'lambda:InvokeFunction' \
 --principal "events.amazonaws.com" \
 --source-arn "arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule" \
 --cli-binary-format "raw-in-base64-out"
```

**Response:**

```json
{
  "Statement": "{\"Sid\":\"PerMinuteScheduledEvent\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"events.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:ap-south-1:336463900088:function:LogScheduledEvent\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule\"}}}"
}
```

---

## [`create-event-source-mapping`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/create-event-source-mapping.html)

Creates a mapping between an event source and an Lambda function. Lambda reads items from the event source and invokes the function.

For details about how to configure different event sources, see the following topics.

- Amazon DynamoDB Streams
- Amazon Kinesis
- Amazon SQS
- Amazon MQ and RabbitMQ
- Amazon MSK
- Apache Kafka

**Syntax:**

```s
aws lambda create-event-source-mapping \
 --function-name [FunctionName] \
 --event-source-arn "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue" \
 --batch-size [BatchSizeInteger] \
 --maximum-batching-window-in-seconds [MaximumBatchingWindow | 0] \
 --no-enabled \
```

Where,

- **`--function-name`**: Name of the function.
- **`--event-source-arn`**: ARN belonging to the resource that is the event source.

**Example: Map a Lambda Function to an Amazon SQS queue**

```s
aws lambda create-event-source-mapping \
 --function-name demo-lambda-function --batch-size 3 \
 --event-source-arn "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue"
```

**Response:**

```json
{
  "UUID": "ab1afb5c-d1b0-4e6d-ad42-7ec846bd3580",
  "BatchSize": 3,
  "MaximumBatchingWindowInSeconds": 0,
  "EventSourceArn": "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:demo-lambda-sqs",
  "LastModified": "2022-11-28T18:42:36.715000+05:30",
  "State": "Enabled",
  "StateTransitionReason": "USER_INITIATED",
  "FunctionResponseTypes": []
}
```

---

## [`get-event-source-mapping`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-event-source-mapping.html)

Returns details about an event source mapping. You can get the identifier of a mapping from the output of **`ListEventSourceMappings`**.

**Syntax:**

```s
aws lambda get-event-source-mapping --uuid [EventSourceMappingUUID]
```

**Example:**

```s
aws lambda get-event-source-mapping --uuid "ab1afb5c-d1b0-4e6d-ad42-7ec846bd3580"
```

**Response:**

```json
{
  "UUID": "ab1afb5c-d1b0-4e6d-ad42-7ec846bd3580",
  "BatchSize": 3,
  "MaximumBatchingWindowInSeconds": 0,
  "EventSourceArn": "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:demo-lambda-sqs",
  "LastModified": "2022-11-28T18:42:36.715000+05:30",
  "State": "Enabled",
  "StateTransitionReason": "USER_INITIATED",
  "FunctionResponseTypes": []
}
```

---

## [`invoke`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/invoke.html)

Invokes a Lambda function. You can invoke a function synchronously (and wait for the response), or asynchronously. To invoke a function asynchronously, set **`InvocationType`** to `Event` .

**Syntax:**

```s
aws lambda invoke \
 --function-name [FunctionName] \
 --invocation-type ["RequestResponse" | "Event" | "DryRun"] \
 --client-context [Base64-EncodedData]
 --payload [JSON | JSONFilePathURL] \
 --log-type ["None" | "Tail"] \
 --qualifier [Version | Alias] \
 --cli-binary-format ["base64" | "raw-in-base64-out"] \
 --region [Region] \
 <outfile>
```

**Example: Invoke an Asynchronous Function - Triggered on Amazon SQS Queue Event**

```s
aws lambda invoke \
 --function-name demo-lambda-sqs \
 --invocation-type "Event" \
 --payload 'payload'
 --cli-binary-format "raw-in-base64-out" \
 response.json
```

---

## [`put-function-event-invoke-config`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/put-function-event-invoke-config.html)

Configures options for asynchronous invocation on a function, version, or alias. If a configuration already exists for a function, version, or alias, this operation overwrites it. If you exclude any settings, they are removed. To set one option without affecting existing settings for other options, use UpdateFunctionEventInvokeConfig .

By default, Lambda retries an asynchronous invocation twice if the function returns an error. It retains events in a queue for up to six hours. When an event fails all processing attempts or stays in the asynchronous invocation queue for too long, Lambda discards it. To retain discarded events, configure a dead-letter queue with UpdateFunctionConfiguration .

To send an invocation record to a queue, topic, function, or event bus, specify a destination . You can configure separate destinations for successful invocations (on-success) and events that fail all processing attempts (on-failure). You can configure destinations in addition to or instead of a dead-letter queue.

**Syntax:**

```s
aws lambda put-function-event-invoke-config \
 --function-name [FunctionName | FunctionName:Alias] \
 --maximum-retry-attempts [Number] \
 --maximum-event-age-in-seconds [Seconds] \
 --destination-config [OnSuccess=[Destination],OnFailure=[Destination]]
```

Where,

- **`--destination-config`**: A destination for events after they have been sent to a function for processing.

  - **Possible Destinations**:

    - **Function**: The Amazon Resource Name (ARN) of a Lambda function.
    - **Queue**: The ARN of an SQS queue.
    - **Topic**: The ARN of an SNS topic.
    - **Event Bus**: The ARN of an Amazon EventBridge event bus.

**Example 1: Publish to a SNS Topic Destination**

**Workflow:**

- Create a SNS Topic
- Provide the Lambda function write permissions to the SNS Topic
  - Create a IAM Policy
  - Attach policy to IAM Role
- Update the Destination using `PutFunctionEventInvokeConfig` and using the SNS Topic ARN

1. **Create a SNS Topic**

   **Run:**

   ```s
   aws sns create-topic \
    --name S3EventsTopic \
    --attributes DisplayName="S3Events"
   ```

   **Response:**

   ```json
   {
     "TopicArn": "arn:aws:sns:ap-south-1:336463900088:S3EventsTopic"
   }
   ```

2. Provide the Lambda function write permissions to the SNS Topic

   In this case to avoid constantly issuing permissions among core members who shouldn't have any problem, for e.g. the Admin group you can add,

   - Principal: The Admin Group ARN (can just keep appending it with more groups, users for permission sharing)
   - Resource: `arn:aws:sns:*` to include all resources, across all regions (all SNS topics) possible for the action `sns:Publish`. To make this region specific, you can pass `arn:aws:sns:ap-south-1:*`.

   In `sns-destination-policy.json`,

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["sns:Publish"],
         "Resource": "arn:aws:sns:*"
       }
     ]
   }
   ```

   **Create an IAM Policy**

   ```s
   aws iam create-policy \
    --policy-name AWSLambdaSNSPublishExecutionRole \
    --description "Allows Lambda functions to publish to SNS Topics for select IAM users" \
    --policy-document file:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/functions/sqsprocessor/sns-destination-policy.json

   ```

   **Response:**

   ```json
   {
     "Policy": {
       "PolicyName": "AmazonSNSPublishAccess",
       "PolicyId": "ANPAU4VWPVW4KADDFB2GM",
       "Arn": "arn:aws:iam::336463900088:policy/AmazonSNSPublishAccess",
       "Path": "/",
       "DefaultVersionId": "v1",
       "AttachmentCount": 0,
       "PermissionsBoundaryUsageCount": 0,
       "IsAttachable": true,
       "CreateDate": "2022-11-30T12:31:44+00:00",
       "UpdateDate": "2022-11-30T12:31:44+00:00"
     }
   }
   ```

3. Update the Destination using `PutFunctionEventInvokeConfig` and using the SNS Topic ARN

   **Run:**

   ```s
    aws lambda put-function-event-invoke-config \
    --function-name "SQSProcessor" \
    --destination-config OnSuccess={"Destination"="arn:aws:sns:ap-south-1:336463900088:S3EventsTopic.fifo"}
   ```

   **Response:**

   ```json
   {
     "LastModified": "2022-11-30T18:33:40.574000+05:30",
     "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:SQSProcessor:$LATEST",
     "DestinationConfig": {
       "OnSuccess": {
         "Destination": "arn:aws:sns:ap-south-1:336463900088:S3EventsTopic"
       },
       "OnFailure": {}
     }
   }
   ```

---

## [`update-function-code`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-code.html)

Updates a Lambda function’s code. If code signing is enabled for the function, the code package must be signed by a trusted publisher. For more information, see Configuring code signing.

If the function’s package type is Image , you must specify the code package in ImageUri as the URI of a container image in the Amazon ECR registry.

If the function’s package type is `Zip`, you must specify the deployment package as a `.zip` file archive. Enter the Amazon S3 bucket and key of the code `.zip` file location. You can also provide the function code inline using the **`ZipFile`** field.

The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64 ).

The function’s code is locked when you publish a version. You can’t modify the code of a published version, only the unpublished version.

**Syntax:**

```s
aws lambda update-function-code \
 --function-name HelloWorld \
 --zip-file [DeploymentPackageZipFilePathURL] \
 --handler [FunctionHandler]
```

**Example:**

```s
aws lambda update-function-code \
 --function-name HelloWorld \
 --zip-file fileb:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/deployments/hello-world-alb.zip

```

**Response:**

```json
{
  "FunctionName": "HelloWorld",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:HelloWorld",
  "Runtime": "nodejs18.x",
  "Role": "arn:aws:iam::336463900088:role/AWSLambdaBasicRole",
  "Handler": "helloworld.handler",
  "CodeSize": 400,
  "Description": "A demo Hello World function that returns HTML to the ALB.",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2022-11-29T08:19:33.000+0000",
  "CodeSha256": "Z7xSp/m7zZjSlg6Y4iBJ3BeS2QHcTIOyYy9vQg/mVLI=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "268884de-5314-42ac-8d00-2f69ea7f85df",
  "State": "Active",
  "LastUpdateStatus": "InProgress",
  "LastUpdateStatusReason": "The function is being created.",
  "LastUpdateStatusReasonCode": "Creating",
  "PackageType": "Zip",
  "Architectures": ["x86_64"],
  "EphemeralStorage": {
    "Size": 512
  }
}
```

---

## [`delete-event-source-mapping`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/delete-event-source-mapping.html)

Deletes an event source mapping. You can get the identifier of a mapping from the output of **`ListEventSourceMappings`**.

When you delete an event source mapping, it enters a **`Deleting`** state and might not be completely deleted for several seconds.

**Syntax:**

```s
aws lambda delete-event-source-mapping --uuid [EventSourceMappingUUID]
```

**Example:**

```s
aws lambda delete-event-source-mapping --uuid "ab1afb5c-d1b0-4e6d-ad42-7ec846bd3580"
```

---

## [`delete-function`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/delete-function.html)

Deletes a Lambda function. To delete a specific function version, use the **`Qualifier`** parameter. Otherwise, all versions and aliases are deleted.

To delete Lambda event source mappings that invoke a function, use **`DeleteEventSourceMapping`** . For Amazon Web Services services and resources that invoke your function directly, delete the trigger in the service where you originally configured it.

**Syntax:**

```s
aws lambda delete-function \
 --function-name [FunctionName] \
 --qualifier [Version | Alias]
```

**Example:**

```s
aws lambda delete-function --function-name demo-lambda-sqs
```

**Response:**

None

---

# References

- [AWS Lambda: Event Source Mapping](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html)
- [AWS Blog: AWS Lambda Scaling controls for Kinesis and DynamoDB event sources](https://aws.amazon.com/blogs/compute/new-aws-lambda-scaling-controls-for-kinesis-and-dynamodb-event-sources/)
- [Using Resource-based policies for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html)
