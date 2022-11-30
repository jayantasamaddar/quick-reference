# Invoke Lambda Function from a HTTP(S) endpoint (using ALB)

- Integrates AWS ELB pointing to AWS Lambda (Synchronous Invocation) and CloudWatch Logs. This is a basic case of serverless website hosting of a website.

## The Workflow

1. Create the execution role that gives your function permission to access AWS resources
2. Add the `AWSLambdaBasicExecutionRole` policy to the role
3. Create the Function to process the SQS Queue and save it into a file
4. Create a deployment package from the file
5. Create Lambda Function
6. Create a Target Group that will register the Lambda function
7. Allow Target Group permission to Invoke the Lambda function
8. Register the Lambda Function with the Target Group
9. Create an Application Load Balancer that accepts incoming HTTP(S) requests
10. Create Listener(s) for the ALB and attach the Target Group

You can skip Steps 1 & 2, if already done and use the `AWSLambdaBasicExecutionRole` in Step 5.

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

## Task 2: Add the `AWSLambdaBasicExecutionRole` policy to the role

The `AWSLambdaBasicExecutionRole` is a Amazon maanged policy that has the permissions that the function needs to write logs to Amazon CloudWatch Logs. At the same time, it allows Cross-Account access by specifying `*` for Resource.

The `AWSLambdaBasicExecutionRole` policy,

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
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

exports.handler = (event, context, callback) => {
  console.log(event);
  const body = `<h1>Hello from Lambda!</h1>
  <h3>IPv4Address: ${event.headers['x-forwarded-for']} </h3>`;
  const result = {
    statusCode: 200,
    statusDescription: '200 OK',
    isBase64Encoded: false,
    headers: {
      'Content-Type': 'text/html',
    },
    body,
  };
  context.callbackWaitsForEmptyEventLoop = false;
  callback(null, result);
};
```

---

## Task 4: Create a deployment package from the file

```s
zip helloworld-alb.zip index.js -j
```

---

## Task 5: Create the Lambda function

**Run:**

```s
aws lambda create-function \
 --function-name HelloWorld \
 --description "A demo Hello World function that returns HTML to the ALB." \
 --runtime "nodejs18.x" \
 --role "arn:aws:iam::336463900088:role/AWSLambdaBasicRole" \
 --zip-file fileb:///home/jayantasamaddar/Work/quick-reference/aws/serverless/lambda/assets/functions/helloworld/helloworld-alb.zip \
 --handler index.handler
```

**Response:**

```json
{
  "FunctionName": "HelloWorld",
  "FunctionArn": "arn:aws:lambda:ap-south-1:336463900088:function:HelloWorld",
  "Runtime": "nodejs18.x",
  "Role": "arn:aws:iam::336463900088:role/AWSLambdaBasicRole",
  "Handler": "index.handler",
  "CodeSize": 391,
  "Description": "A demo Hello World function that returns HTML to the ALB.",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2022-11-29T09:02:40.229+0000",
  "CodeSha256": "Zh3rvdb0Znx2rrR7JSGsXmKnw43AOwKGIDH+sO+88a4=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "90ed1f7f-9ae2-4691-973b-7f0546c33f56",
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

## Task 6: Create a Target Group that will register the Lambda function

We can use the `aws lambda create-event-source-mapping` API.

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

## Task 7: Create a Target Group that will register the Lambda function

**Run:**

```s
aws lambda add-permission \
 --function-name HelloWorld \
 --statement-id elb-invokefunction-helloworld \
 --principal elasticloadbalancing.amazonaws.com \
 --action lambda:InvokeFunction \
 --source-arn "arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c" \
 --source-account 336463900088
```

**Response:**

```json
{
  "Statement": "{\"Sid\":\"elb-invokefunction-helloworld\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"elasticloadbalancing.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:ap-south-1:336463900088:function:HelloWorld\",\"Condition\":{\"StringEquals\":{\"AWS:SourceAccount\":\"336463900088\"},\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c\"}}}"
}
```

---

## Task 8: Register the Lambda Function with the Target Group

**Run:**

```s
aws elbv2 register-targets \
 --target-group-arn "arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c" \
 --targets Id="arn:aws:lambda:ap-south-1:336463900088:function:HelloWorld"
```

**Response:**

None

---

## Task 9: Create an Application Load Balancer that accepts incoming HTTP(S) requests

- The assumption is to already have Security Groups setup that allow incoming traffic on Port 80/443.

**Run:**

```s
aws elbv2 create-load-balancer \
 --name HelloWorld-Lambda-ALB \
 --scheme internet-facing \
 --type application \
 --ip-address-type ipv4 \
 --subnets "subnet-09a2a6eec68d67bdb" "subnet-0d4d144fef99b7917" "subnet-0b0f3038e2c973ffd" \
 --security-groups "sg-0f6d8f14fb92f34b2" "sg-08898963c33d367e6"
```

**Response:**

```json
{
  "LoadBalancers": [
    {
      "LoadBalancerArn": "arn:aws:elasticloadbalancing:ap-south-1:336463900088:loadbalancer/app/HelloWorld-Lambda-ALB/04cfb586fb76a5fe",
      "DNSName": "HelloWorld-Lambda-ALB-1843611492.ap-south-1.elb.amazonaws.com",
      "CanonicalHostedZoneId": "ZP97RAFLXTNZK",
      "CreatedTime": "2022-11-29T07:42:29.130000+00:00",
      "LoadBalancerName": "HelloWorld-Lambda-ALB",
      "Scheme": "internet-facing",
      "VpcId": "vpc-0accd6ee829f856ff",
      "State": {
        "Code": "provisioning"
      },
      "Type": "application",
      "AvailabilityZones": [
        {
          "ZoneName": "ap-south-1a",
          "SubnetId": "subnet-09a2a6eec68d67bdb",
          "LoadBalancerAddresses": []
        },
        {
          "ZoneName": "ap-south-1c",
          "SubnetId": "subnet-0b0f3038e2c973ffd",
          "LoadBalancerAddresses": []
        },
        {
          "ZoneName": "ap-south-1b",
          "SubnetId": "subnet-0d4d144fef99b7917",
          "LoadBalancerAddresses": []
        }
      ],
      "SecurityGroups": ["sg-0f6d8f14fb92f34b2", "sg-08898963c33d367e6"],
      "IpAddressType": "ipv4"
    }
  ]
}
```

---

## Task 10: Create Listener(s) for the ALB and attach the Target Group

**Run:**

```s
   aws elbv2 create-listener \
    --load-balancer-arn "arn:aws:elasticloadbalancing:ap-south-1:336463900088:loadbalancer/app/HelloWorld-Lambda-ALB/04cfb586fb76a5fe" \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn="arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c"
```

**Response:**

```json
{
  "Listeners": [
    {
      "ListenerArn": "arn:aws:elasticloadbalancing:ap-south-1:336463900088:listener/app/HelloWorld-Lambda-ALB/04cfb586fb76a5fe/0763ea2fc1e77ecc",
      "LoadBalancerArn": "arn:aws:elasticloadbalancing:ap-south-1:336463900088:loadbalancer/app/HelloWorld-Lambda-ALB/04cfb586fb76a5fe",
      "Port": 80,
      "Protocol": "HTTP",
      "DefaultActions": [
        {
          "Type": "forward",
          "TargetGroupArn": "arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c",
          "ForwardConfig": {
            "TargetGroups": [
              {
                "TargetGroupArn": "arn:aws:elasticloadbalancing:ap-south-1:336463900088:targetgroup/HelloWorld-LambdaFunction-TG/701c7f3fcdbd4d9c",
                "Weight": 1
              }
            ],
            "TargetGroupStickinessConfig": {
              "Enabled": false
            }
          }
        }
      ]
    }
  ]
}
```

---

# References

- [Using a cross-account Amazon SQS queue as an event source](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs-cross-account-example.html)
