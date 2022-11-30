# Logs the Messages sent to a Cross-Account Amazon SQS Queue

- Integrates Amazon SQS with AWS Lambda (Asynchronous Invocation with Event Source Mapping) and CloudWatch Logs

## The Workflow

1. Create the execution role that gives your function permission to access AWS resources
2. Add the `AWSLambdaSQSQueueExecutionRole` policy to the role
3. Create the Function to process the SQS Queue and save it into a file
4. Create a deployment package from the file
5. Create Lambda Function
6. Map Lambda Function's event source to SQS Queue

You can skip Steps 1 & 2, if already done and use the `AWSLambdaSQSQueueExecutionRole` in Step 5.

---

## Task 1: Create the Execution Role that gives Lambda permission to access AWS resources

- We need to create an execution role with a trust policy that allows our Lambda function permission to call AWS Secure Token Service (AWS STS) to issue temporary credentials. Lambda uses the **[`AssumeRole`](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html)** API.
- This will temporarily allow Lambda to access almost all AWS Resources for a default of 3600 seconds (1 hour) for each invocation, which is enough time for the function to complete all operations. Lambda handles this automatically.

```s
aws iam create-role \
 --role-name AWSLambdaBasicRole \
 --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
```

---

## Task 2: Add the `AWSLambdaSQSQueueExecutionRole` policy to the role

The `AWSLambdaSQSQueueExecutionRole` is a Amazon maanged policy that has the permissions that the function needs to read items from Amazon SQS and to write logs to Amazon CloudWatch Logs. At the same time, it allows Cross-Account access by specifying `*` for Resource.

The `AWSLambdaSQSQueueExecutionRole` policy,

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

**Run:**

```s
aws iam attach-role-policy \
 --role-name AWSLambdaBasicRole \
 --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
```

---

## Task 3: Create the Function to process the SQS Queue and save it into a file

In `index.js`,

```js
console.log('Loading function');

exports.handler = async event => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  for (const { messageId, body } of event.Records) {
    console.log('SQS message %s: %j', messageId, body);
  }
  return `Successfully processed ${event.Records.length} messages.`;
};
```

---

## Task 4: Create a deployment package from the file

```s
zip sqsprocessor.zip index.js -j
```

---

## Task 5: Create the Lambda function

**Run:**

```s
aws lambda create-function \
 --function-name SQSProcessor \
 --description "An Amazon SQS trigger that logs messages in a queue." \
 --runtime "nodejs18.x" \
 --role "arn:aws:iam::336463900088:role/AWSLambdaSQSRole" \
 --zip-file fileb:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/functions/sqsprocessor/sqsprocessor.zip \
 --handler index.handler
```

**Response:**

```json
{
  "FunctionName": "SQSProcessor",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:SQSProcessor",
  "Runtime": "nodejs18.x",
  "Role": "arn:aws:iam::336463900088:role/AWSLambdaSQSRole",
  "Handler": "index.handler",
  "CodeSize": 378,
  "Description": "An Amazon SQS trigger that logs messages in a queue.",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2022-11-28T21:37:22.412+0000",
  "CodeSha256": "RwITFYScZouV715vITc9N0quNgOoHORWG/8Zw7z9bxQ=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "bb092563-13df-4b78-a9ff-8ee9e1805b9d",
  "State": "Pending",
  "StateReason": "The function is being created.",
  "StateReasonCode": "Creating",
  "PackageType": "Zip",
  "Architectures": ["x86_64"],
  "EphemeralStorage": {
    "Size": 512
  }
}
```

---

## Task 6: Map Lambda Function's event source to SQS Queue

SQS Records need to be polled from the source. For such events, we can use the `aws lambda create-event-source-mapping` API.

**Run:**

```s
aws lambda create-event-source-mapping \
 --function-name SQSProcessor \
 --batch-size 3 \
 --event-source-arn "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue"
```

**Response:**

```json
{
  "UUID": "138808e4-2eb4-4342-82c4-97681ffdb16c",
  "BatchSize": 3,
  "MaximumBatchingWindowInSeconds": 0,
  "EventSourceArn": "arn:aws:sqs:ap-south-1:336463900088:S3EventsQueue",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:SQSProcessor",
  "LastModified": "2022-11-29T03:08:48.174000+05:30",
  "State": "Creating",
  "StateTransitionReason": "USER_INITIATED",
  "FunctionResponseTypes": []
}
```

---

# References

- [Using a cross-account Amazon SQS queue as an event source](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs-cross-account-example.html)
