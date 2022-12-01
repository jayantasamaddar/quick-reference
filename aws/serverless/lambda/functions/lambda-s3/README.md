# Run Lambda function when you make write operations on a S3 bucket and send an email on success

- Integrates S3 Bucket Event Notifications to trigger an AWS Lambda Function for processing (Asynchronous Invocation) and Send an Email via SNS Destination

## The Workflow

1. Create the IAM execution role that gives your function permission to access AWS resources
2. Create a custom policy to allow the Role to be able to Publish to SNS
3. Add the `AWSLambdaBasicExecutionRole` and `AWSLambdaAllDestinations` permission policies to the role
4. Create the Function to process the S3 Event and save it into a file
5. Create a deployment package from the file
6. Create Lambda Function
7. Allow Permission to S3 to Invoke the Lambda Function
8. Create an Event Notification in S3 to Trigger the Lambda Function
9. Update Destination configuration of the Function to a SNS Topic that is subscribed to an email to receive notifications

You can skip Steps **1**, **2**, **3** if you already have a Role that has write permissions to CloudWatch Logs and Publish permissions to SNS Queue. We will be using this Role to create the Function in Step 4.

---

## Step 1: Create the IAM execution role that gives your function permission to access AWS resources

- We need to create an execution role with a trust policy that allows our Lambda function permission to call AWS Secure Token Service (AWS STS) to issue temporary credentials. Lambda uses the **[`AssumeRole`](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html)** API.
- This will temporarily allow Lambda to access almost all AWS Resources for a default of 3600 seconds (1 hour) for each invocation, which is enough time for the function to complete all operations. Lambda handles this automatically.

```s
aws iam create-role \
 --role-name "AWSLambdaBasicRole" \
 --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
```

---

## Step 2: Create a custom policy to allow the Role to be able to Publish to SNS

- The [`AWSLambdaAllDestinations`](../../policies/all-destinations-policy.json) is a custom policy that has all the permissions that the function needs to write to all destinations - `SQS`, `SNS`, `Eventbridge`, `Lambda` for asynchronous invocations of the function.

```s
aws iam create-policy \
 --policy-name "AWSLambdaAllDestinations" \
 --description "Allows Publish access to all AWS Lambda Destinations" \
 --policy-document file:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/policies/all-destination-policy.json
```

**Response:**

```json
{
  "Policy": {
    "PolicyName": "AWSLambdaAllDestinations",
    "PolicyId": "ANPAU4VWPVW4MQ4FPPCOK",
    "Arn": "arn:aws:iam::336463900088:policy/AWSLambdaAllDestinations",
    "Path": "/",
    "DefaultVersionId": "v1",
    "AttachmentCount": 0,
    "PermissionsBoundaryUsageCount": 0,
    "IsAttachable": true,
    "Description": "Gives Publish access to all AWS Lambda Destinations",
    "CreateDate": "2022-11-30T12:57:46+00:00",
    "UpdateDate": "2022-11-30T12:57:46+00:00"
  }
}
```

---

## Step 3: Attach the `AWSLambdaBasicExecutionRole` and `AWSLambdaAllDestinations` policies to the role

**Run:**

1. Attach **`AWSLambdaBasicExecutionRole`**

   ```s
   aws iam attach-role-policy \
    --role-name AWSLambdaBasicRole \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
   ```

2. Attach **`AWSLambdaAllDestinations`**

   ```s
   aws iam attach-role-policy \
    --role-name AWSLambdaBasicRole \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaAllDestinations"
   ```

---

## Step 4: Create the Function to process the S3 Event and save it into a file

Create a deployment package from the file

```json
{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "aws:s3",
      "awsRegion": "ap-south-1",
      "eventTime": "2022-11-30T19:23:44.663Z",
      "eventName": "ObjectRemoved:DeleteMarkerCreated",
      "userIdentity": {
        "principalId": "AWS:AIDAU4VWPVW4LMV44R2CE"
      },
      "requestParameters": {
        "sourceIPAddress": "49.37.45.159"
      },
      "responseElements": {
        "x-amz-request-id": "6WC822364RVQM0AD",
        "x-amz-id-2": "kPQ6K+GS9lo+3uKSAupGkp0zQlxqgospe67QuIry62+AliIox3mtr6Fk/yus5UBPjNRKQxGBejInB3/zyUZ1s5NcuU6PJ42u"
      },
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "YmJmMjIxYTUtYWZlMS00NTFkLWIwZmQtYjFhNWZiMzE4ZjAx",
        "bucket": {
          "name": "jayanta-s3-bucket",
          "ownerIdentity": {
            "principalId": "A1XII8CWWG37R1"
          },
          "arn": "arn:aws:s3:::jayanta-s3-bucket"
        },
        "object": {
          "key": "policy.json",
          "eTag": "d41d8cd98f00b204e9800998ecf8427e",
          "versionId": "WPO37QN8FlwPAi8eR5yGXtm30lrEMAwL",
          "sequencer": "006387ADC0A437286D"
        }
      }
    }
  ]
}
```

In **`index.js`**,

```js
exports.handler = async => {
  console.log(JSON.stringify(event, null, 2));
  return `Successfully processed S3 event.`;
};
```

---

## Step 5: Create a deployment package from the file

**Run:**

```s
zip lambda-s3.zip index.js -j
```

---

## Step 6: Create Lambda Function

**Run:**

```s
aws lambda create-function \
 --function-name lambda-s3 \
 --description "An Amazon S3 Events Logger" \
 --runtime "nodejs18.x" \
 --role "arn:aws:iam::336463900088:role/AWSLambdaBasicRole" \
 --zip-file "fileb:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/functions/lambda-s3/lambda-s3.zip" \
 --handler index.handler
```

---

## Step 7: Allow Permission to S3 to Invoke the Lambda Function

**Run:**

```s
aws lambda add-permission \
 --function-name lambda-s3 \
 --statement-id S3EventLogger \
 --action "lambda:InvokeFunction" \
 --principal "s3.amazonaws.com" \
 --source-arn "arn:aws:s3:::jayanta-s3-bucket"
```

---

## Step 8: Create an Event Notification in S3 to Trigger the Lambda Function

**Run:**

```s
aws s3api put-bucket-notification-configuration \
 --bucket jayanta-s3-bucket \
 --notification-configuration "file:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/functions/lambda-s3/s3-lambda-notifications.json"
```

---

## Step 9: Update Destination configuration of the Function to a SNS Topic that is subscribed to an email to receive notifications

- Create a Topic: **[CreateTopic](../../../../messaging/sns/README.md#create-topic)** API
- Subscribe to a Topic: **[Subscribe](../../../../messaging/sns/README.md#subscribe)**

**Run:**

```s
aws lambda put-function-event-invoke-config \
 --function-name "lambda-s3" \
 --destination-config OnSuccess={"Destination"="arn:aws:sns:ap-south-1:336463900088:S3EventsTopic"}
```

**Response:**

```json
{
  "LastModified": "2022-12-01T00:52:00.560000+05:30",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:lambda-s3:$LATEST",
  "DestinationConfig": {
    "OnSuccess": {
      "Destination": "arn:aws:sns:ap-south-1:336463900088:S3EventsTopic"
    },
    "OnFailure": {}
  }
}
```

---
