# Logs out a scheduled event

- Integrates Amazon EventBridge with AWS Lambda (Asynchronous Invocation) and CloudWatch Logs

## The Workflow

1. Create the Cron job Function, save it into a file
2. Create a deployment package from the file
3. Create Lambda Function
4. Create a scheduled Event Rule
5. Allow EventBridge service permission to run the function.
6. Add the Lambda function as target of the rule

---

## Task 1: Create the Cron Job Function and save it into a file

In `index.js`,

```js
'use strict';

exports.handler = (event, context, callback) => {
  console.log('LogScheduledEvent');
  console.log('Received event:', JSON.stringify(event, null, 2));
  callback(null, 'Finished');
};
```

---

## Task 2: Create a deployment package from the file

```s
zip cronevent.zip index.js -j
```

---

## Task 3: Create the Lambda function

**Run:**

```s
aws lambda create-function \
 --function-name LogScheduledEvent \
 --description "A job that runs every 1 minute" \
 --runtime "nodejs18.x" \
 --role "arn:aws:iam::336463900088:role/AWSLambdaBasicRole" \
 --zip-file fileb:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/functions/cronevent/cronevent.zip \
 --handler index.handler
```

**Response:**

```json
{
  "FunctionName": "LogScheduledEvent",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:LogScheduledEvent",
  "Runtime": "nodejs18.x",
  "Role": "arn:aws:iam::336463900088:role/AWSLambdaBasicRole",
  "Handler": "index.handler",
  "CodeSize": 315,
  "Description": "A job that runs every 1 minute",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2022-11-30T04:40:53.986+0000",
  "CodeSha256": "nUtYVfdKd7h9OEZG7oIk0/iAXImLEOXgoLJzUyv6lzk=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "999fb466-10c5-446c-8483-dc98ea195de5",
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

## Task 4: Create scheduled Event rule

**Run:**

```s
aws events put-rule \
 --name PerMinuteRule \
 --schedule-expression "rate(1 minute)"
```

**Response:**

```json
{
  "RuleArn": "arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule"
}
```

---

## Task 5: Allow EventBridge permission to Invoke the function

We need the following policy statement:

```json
{
  "Statement": [
    {
      "Sid": "PerMinuteScheduledEvent",
      "Effect": "Allow",
      "Principal": {
        "Service": "events.amazonaws.com"
      },
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:ap-south-1:336463900088:function:LogScheduledEvent",
      "Condition": {
        "ArnLike": {
          "AWS:SourceArn": "arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule"
        }
      }
    }
  ]
}
```

We can use the `aws lambda add-permission` API.

**Run:**

```s
aws lambda add-permission \
 --function-name LogScheduledEvent \
 --statement-id PerMinuteScheduledEvent \
 --action 'lambda:InvokeFunction' \
 --principal "events.amazonaws.com" \
 --source-arn "arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule" \
```

**Response:**

```json
{
  "Statement": "{\"Sid\":\"PerMinuteScheduledEvent\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"events.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:ap-south-1:336463900088:function:LogScheduledEvent\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:events:ap-south-1:336463900088:rule/PerMinuteRule\"}}}"
}
```

---

## Task 6: Add the Lambda function as the target of the Event rule

**Run:**

```s
aws events put-targets \
 --rule PerMinuteRule \
 --targets "Id"="1","Arn"="arn:aws:lambda:ap-south-1:336463900088:function:LogScheduledEvent"
```

**Response:**

```json
{
  "FailedEntryCount": 0,
  "FailedEntries": []
}
```

---

# References

- [Scheduled Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)
