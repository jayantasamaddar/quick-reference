# Table of Contents

- [Table of Contents](#table-of-contents)
- [AppSync: Overview](#appsync-overview)
- [AppSync: Security](#appsync-security)
- [AppSync: Features](#appsync-features)
  - [Caching](#caching)
  - [Settings](#settings)

---

# AppSync: Overview

AWS AppSync provides a robust, scalable GraphQL interface for application developers to combine data from multiple sources, including Amazon DynamoDB, AWS Lambda, and HTTP APIs. AppSync is a managed service that uses GraphQL to make it easy for applications to get exactly the data they need.

- AppSync is a managed service that uses **GraphQL** and lets you build a GraphQL API.
- This includes combining data from one or more sources:
  - NoSQL data stores, Relational databases, HTTP APIs etc.
  - Integrates with DynamoDB, Aurora, Opensearch and others
  - Custom sources with AWS Lambda
- Retrieve data in real-time with WebSocket or MQTT on WebSocket
- For Mobile Apps: Local data access and Data synchronization with customizable conflict resolution when they are back online

- **Basic Workflow**:

  - Upload a GraphQL schema
  - GraphQL requests execute as "resolvers" and need to be converted into the appropriate message format for the different AWS Services that AWS AppSync integrates. For example, a GraphQL query on a field will need to be converted into a unique format for Amazon DynamoDB, AWS Lambda, and Amazon OpenSearch Service respectively. AWS AppSync allows you to write the custom logic for your resolvers using JavaScript, and to execute your code on a custom AppSync JavaScript runtime. This allows you to define how an incoming request should be transformed to interact with your data sources, and how responses from your data sources should be mapped back into a GraphQL response.

- **Language Support**:

  - AWS AppSync SDKs support iOS, Android, and JavaScript.
  - The JavaScript support spans web frameworks such as React and Angular as well as technologies such as React Native and Ionic.
  - You can also use open source clients to connect to the AppSync GraphQL endpoint for using other platform such as generic HTTP libraries or even a simple CURL command.

---

# AppSync: Security

There are four ways you can authorize applications to interact with your AWS AppSync GraphQL API:

1. **`API_KEY`**
2. **`AWS_IAM`**: IAM Users / Roles / Cross-account access
3. **`OPENID_CONNECT`**: OpenID Connect Provider / JSON Web Token
4. **`AMAZON_COGNITO_USER_POOLS`**

- For custom domains and HTTPS, use CloudFront in front of AppSync

---

# AppSync: Features

## Caching

- Caching improves the performance of GraphQL queries.

- There is an hourly charge for caching based on instance

- Caching behaviour available:

  - **None**: No server-side caching. Resolvers will call their respective data sources directly.
  - **Full request caching**: All requests from the same user will be cached. All API calls will return responses from the cache.
  - **Per-resolver caching**: Only API calls requesting data from a specific operation or field defined in a resolver will return responses from the cache.

---

## Settings

You can configure your API and change authorization strategies.

- **API Details**

  - API URL
  - API ID
  - API KEY

- **Edit API name**

- **Default Authorization Mode**: Allows you to change how you authorize GraphQL Requests

  - API Key
  - AWS IAM
  - OpenID Connect
  - Amazon Cognito User Pool

- **Enable Logging to CloudWatch Logs**

- **Enable X-Ray to have tracing**

---
