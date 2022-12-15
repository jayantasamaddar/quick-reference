# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amplify: Overview](#amplify-overview)
- [Amplify: Important Features](#amplify-important-features)

---

# Amplify: Overview

AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.

- **Tools**

  - **Amplify Studio**: Visually build a full-stack app both front-end UI and a backend
  - **Amplify CLI**: Configure an Amplify backend with a guided CLI workflow
  - **Amplify Libraries**: Connect your app to existing AWS Services (Cognito, S3 and more)
  - **Amplify Hosting**: Host, secure, reliable, fast web apps or websites via the AWS content delivery network

- **Elastic Beanstalk** for mobile and web applications
- Must-have features such as data-storage, authentication, machine-learning all powered by AWS services
- Front-end libraries with ready-to-use components for React.js, Vue, JavaScript, iOS, Android, Flutter, etc.
- Incorporates AWS best practices for reliability, security and scalability
- Build and deploy with the Amplify CLI or Amplify Studio
- Amplify deployments are powered by CloudFormation

---

# Amplify: Important Features

- **Authentication**: `amplify add auth`

  - Leverages Amazon Cognito
  - User registration, authentication, account recovery and other operations
  - Support MFA, Social Sign-In etc.
  - Pre-built UI components
  - Fine-grained authorization

- **Data Store**: `amplify add api`

  - Leverages Amazon AppSync (for the API) and Amazon DynamoDB (for the storage)
  - Work with local data and have automatic synchronization to the cloud without complex code
  - Powered by GraphQL
  - Offline and real-time capabilities
  - You can model your data with Amplify Studio

- **Amplify Hosting**: `amplify add hosting`

  - Build and Host Modern Web Apps
  - CICD (Build, Test, Deploy)
  - Pull Request Previews
  - Custom Domains
  - Monitoring
  - Redirect and Custom Headers
  - Password Protection
  - Similar to Netlify or Vercel Hosting
    - Source code is hosted at a repository like GitHub, GitLab, BitBucket or CodeCommit
    - When a push happens to the main branch in the repo, CICD is going to pull the repository and build the app
    - Finally it will deploy the Front-end to CloudFront and optionally the backend to Amplify

- **Storage**: File Storage backed by Amazon S3

- **Functions**: Create Lambda functions directly from within Amplify

- **API**:

  - GraphQL API: GraphQL build backed by AWS AppSync
  - REST API: Each path is a Lambda Function on a DynamoDB Table

- **Analytics**: Backed by Amazon Kinesis and Amazon Pinpoint

- **Predictions**: Using Machine Learning

- **Interactions**: Using chatbot service from AWS

- **Notifications**: Using Amazon Pinpoint and Amazon SNS

---
