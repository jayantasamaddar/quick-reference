import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSource from 'aws-cdk-lib/aws-lambda-event-sources';

const imageBucket = 'cdk-imagebucket';

export class SrcStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    /******************************************************************/
    /** Create S3 Bucket for storing images */
    /******************************************************************/
    const bucket = new s3.Bucket(this, imageBucket, {
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /** Generate a CloudFormation Output Bucket: bucketname */
    new CfnOutput(this, 'Bucket', {
      value: bucket.bucketName,
    });

    /******************************************************************/
    /** Create an Execution Role for the Lambda Function */
    /******************************************************************/
    const role = new iam.Role(this, 'CDKLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    // Attach Policy permissions to Role
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'AWSRekognitionLambdaPolicy',
        effect: iam.Effect.ALLOW,
        actions: [
          'rekognition:*',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        resources: ['*'],
      })
    );

    /******************************************************************/
    /** Create a DynamoDB Table for storing image labels */
    /******************************************************************/
    const table = new dynamodb.Table(this, 'cdk-rekn-imagetable', {
      partitionKey: {
        name: 'Image',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /** Generate a CloudFormation Output Table: tableName */
    new CfnOutput(this, 'Table', {
      value: table.tableName,
    });

    /******************************************************************/
    /** Create a Lambda function */
    /******************************************************************/
    const lambdaFn = new lambda.Function(this, 'cdk-rekn-function', {
      code: lambda.AssetCode.fromAsset('lambda'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      role,
      environment: {
        TABLE: table.tableName,
        BUCKET: bucket.bucketName,
      },
    });

    /** Map S3 Event to Source */
    lambdaFn.addEventSource(
      new lambdaEventSource.S3EventSource(bucket, {
        events: [
          s3.EventType.OBJECT_CREATED,
          s3.EventType.OBJECT_REMOVED_DELETE,
          s3.EventType.OBJECT_REMOVED_DELETE_MARKER_CREATED,
        ],
      })
    );

    /** Add Access Policy to allow LambdaFn in S3 and DynamoDB */
    bucket.grantReadWrite(lambdaFn);
    table.grantFullAccess(lambdaFn);
  }
}
