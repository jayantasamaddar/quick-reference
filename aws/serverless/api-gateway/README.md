# Table of Contents

- [Table of Contents](#table-of-contents)
- [API Gateway: Introduction](#api-gateway-introduction)
- [API Gateway: Features Summary](#api-gateway-features-summary)
- [API Gateway: Integrations](#api-gateway-integrations)
- [API Gateway: Endpoint Types](#api-gateway-endpoint-types)
- [API Gateway: Security](#api-gateway-security)
  - [API Gateway Security: Overview](#api-gateway-security-overview)
  - [API Gateway Security: IAM Permissions](#api-gateway-security-iam-permissions)
  - [API Gateway Security: Cognito User](#api-gateway-security-cognito-user)
  - [API Gateway Security: Lambda Authorizer](#api-gateway-security-lambda-authorizer)
- [API Gateway: Caching](#api-gateway-caching)
- [API Gateway: Usage Plans and API Keys](#api-gateway-usage-plans-and-api-keys)
  - [Usage Plans and API Keys: Overview](#usage-plans-and-api-keys-overview)
  - [Usage Plans and API Keys: Correct Order for API Keys](#usage-plans-and-api-keys-correct-order-for-api-keys)
- [API Gateway: Logging and Tracing](#api-gateway-logging-and-tracing)
- [API Gateway: Throttling](#api-gateway-throttling)
- [API Gateway: Errors](#api-gateway-errors)
- [API Gateway: CORS](#api-gateway-cors)
- [API Gateway: websocket API](#api-gateway-websocket-api)

---

# API Gateway: Introduction

![API Gateway: Architecture](assets/api-gateway-architecture.png)

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the "front door" for applications to access data, business logic, or functionality from your backend services. Using API Gateway, you can create RESTful APIs and WebSocket APIs that enable real-time two-way communication applications. API Gateway supports containerized and serverless workloads, as well as web applications.

API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management. API Gateway has no minimum fees or startup costs. You pay for the API calls you receive and the amount of data transferred out and, with the API Gateway tiered pricing model, you can reduce your cost as your API usage scales.

---

# API Gateway: Features Summary

- AWS Lambda + API Gateway: No infrastructure to manage
- Support for the WebSocket Protocol
- Handle API Versioning (v1, v2)
- Handle different environments (dev, test, prod)
- Handle security (Authentication and authorization)
- Create API keys, handle request throttling
- Swagger / Open API to quickly define APIs
- Transform and validate requests and responses
- Generate SDK and API specifications
- Cache API responses

---

# API Gateway: Integrations

- Lambda Function
  - Invoke Lambda function
  - Easy way to expose REST API backed by AWS Lambda
- HTTP
  - Expose HTTP endpoints in the backend
  - Example: Internal HTTP API on premise, Application Load Balancer
  - Why? Add rate limiting, caching, user authentication, API keys, etc.
- AWS Service
  - Expose any AWS API through the API Gateway
    - E.g. Start a AWS Step Function workflow, post a message to SQS
  - Why? Add authentication, deploy publicly, rate control

---

# API Gateway: Endpoint Types

There are three ways to deploy your API Gateway:

1. **Edge-Optimized (default): For Global clients**

   - Requests are routed to the nearest CloudFront Edge locations which improves latency
   - The API Gateway still lives in only one AWS Region (but it's accessible from every CloudFront Edge location)
   - Best for geographically distributed clients

2. **Regional**

   - For clients within the same location
   - Could manually combine with CloudFront (more control over the caching strategies and the distribution)

3. **Private**

   - Can only be accessed from your VPC using an interface VPC endpoint (ENI)
   - Use a resource policy to define access

---

# API Gateway: Security

## API Gateway Security: Overview

- **User Authentication through**:

  - IAM Roles (useful for internal applications)
  - Amazon Cognito (identify for external users - example mobile users)
  - Custom Authorizer (your own logic, Lambda function)

- **Custom Domain Name HTTPS**: Security through integration with AWS Certificate Manager (ACM)

  - If using Edge-Optimized endpoint, then the certificate must be in `us-east-1`
  - If using Regional endpoint, the certificate must be in the API Gateway region
  - Must setup CNAME or A-Alias record in Route 53

---

## API Gateway Security: IAM Permissions

- Create an IAM policy authorization and attach to User / Role
- Authentication = IAM Execution Role | Authorization = IAM policy
- Good to provide access within AWS (EC2, Lambda, IAM Users)
- Leverages Sig v4 capability where IAM credentials are in headers

- **Resource Policies**
  - Similar to Lambda resource policies
  - Allow for Cross Account Access (combined with IAM Security)
  - Allow for specific source IP Address
  - Allow for a VPC Endpoint

---

## API Gateway Security: Cognito User

- Cognito fully manages user lifecycle, tokens expire automatically
- API gateway verifies identity automatically from AWS Cognito
- No custom code required
- Authentication = Cognito User Pools | Authorization = API Gateway Methods
- Must implement authorization ourselves in the backend Lambda function

---

## API Gateway Security: Lambda Authorizer

- Formerly Customer Authorizers
- Token-based authorizer (bearer token) - ex. JWT or Oauth
- The idea is that we can pass a request-based parameter with headers or query string into a Lambda authorizer
- The Lambda function must evaluate what we passed to it and if it approves, passes an IAM Policy for the user that made the request and the result policy is cached.
- Authentication = External | Authorization = Lambda function
- Used when there is a third-party authentication system like Auth0
- Pay per Lambda invocation

---

# API Gateway: Caching

- You can enable API caching in Amazon API Gateway to cache your endpoint's responses **reducing the number of calls to the endpoint** and also **improve the latency of requests to your API**.

- **TTL**:

  - **Default**: `300 secs`
  - **Minimum**: `0 sec` (Caching is disabled)
  - **Maximum**: `3600 secs`

- **Caches are defined per stage**
- Possible to override cache settings per method
- Cache encryption option
- Cache capacity between 0.5GB and 237GB
- Cache is expensive, makes sense in production, may not make sense in dev / test

- **Cache Invalidation**:

  - Able to flush the entire cache (invalidate it) immediately. (`FlushStageAuthorizersCache` API)
  - Clients can invalidate the cache with header on a request: `Cache-Control:max-age=0` (with proper IAM authorization: `execute-api:InvalidateCache`).
  - If you don't impose an InvalidateCache policy (or choose the Require authorization checkbox in the console), any client can invalidate the API cache

- Each method can have the cache enabled or disabled, which overrides the stage setting for the cache.

---

# API Gateway: Usage Plans and API Keys

## Usage Plans and API Keys: Overview

- If you want to make an API available as an offering ($) to your customers.

- **Usage Plan**:

  - Who can access one or more deployed API stages and methods
  - How much and how fast they can access them
  - Uses API Keys to identify API clients and meter access
  - Configure throttling limits and quota limits that are enforced on individual client
  - An usage plan is associated with a stage

- **API Keys**:

  - Alphanumeric string values to distribute to your customers
  - Can use with usage plans to control access
  - Throttling limits are applied to the API Keys
  - Quotas limits is the overall number of maximum requests

---

## Usage Plans and API Keys: Correct Order for API Keys

- To configure an usage plan

  1. Create one or more APIs, configure the methods to require an API Key and deploy the APIs to stages
  2. Generate or import API keys to distribute to application developers (your customers) who will be using your API.
  3. Create the usage plan with the desired throttle and quota limits
  4. Associate API stages and API keys with the usage plan

- Callers of the API must supply an assigned API key in the `x-api-key` header in requests to the API

---

# API Gateway: Logging and Tracing

- **CloudWatch Logs**:

  - Enable CloudWatch logging at the Stage level (with Log Level)
  - Can override settings on a per API basis (ex: ERROR, DEBUG, INFO)
  - Log contains information about request / response body

- **X-Ray**:

  - Enable tracing to get extra information about requests in API Gateway
  - X-Ray API Gateway + AWS Lambda gives you the full picture

- **CloudWatch Metrics**:

  - Metrics are by stage; Possibility to enable detailed metrics
  - `CacheHitCount` & `CacheMissCount`: Information of the Efficiency of the cache
  - `Count`: The total number of API requests in a given period.
  - `IntegrationLatency`: The time between when API Gateway relays a request to the backend and when it receives a response from the backend.
  - `Latency`: The time between when the API Gateway receives a request from the client and when it returns a response back to the client. The latency includes the `IntegrationLatency` and other API Gateway overhead. Timeout happens after 29 seconds.
  - `4XXError` (client-side error) and `5xxError` (server-side error)

---

# API Gateway: Throttling

- **Account Limit**

  - API Gateway throttles requests at `10000 requests/second` across all API. Just like Lambda Concurrency, one API that is overloaded, if not limited, can cause the other APIs to be throttled.
  - Soft limit that can be increased upon request

- In case of throttling => `429 Too Many Rquests` (retriable error)

- **Solution**:

  - Use exponential backoff
  - Can set **Stage Limit** and **Method Limits** to improve performance
  - You can define **[Usage Plans](#usage-plans-and-api-keys-overview)** to throttle per customer

---

# API Gateway: Errors

- **4xx means Client Errors**

  - **`400`**: Bad Request
  - **`403`**: Access Denied, WAF filtered
  - **`429`**: Quota exceeded, Throttle

- **5xx means Server Errors**

  - **`502`**: Bad Gateway Exception, usually for an incompatible output returned from a Lambda proxy integration backend and occasionally for out-of-order invocations due to heavy loads
  - **`503`**: Service Unavailable Exception
  - **`504`**: Integration Failure - e.g. Endpoint Request Timed-out Exception
    **API Gateway requests time out after 29 second maximum**

---

# API Gateway: CORS

- CORS must be enabled when you receive API calls from another domain
- The OPTIONS pre-flight request must contain the following headers:

  - `Access-Control-Allow-Methods`
  - `Access-Control-Allow-Headers`
  - `Access-Control-Allow-Origin`

- CORS can be enabled through the console for each Method

---

# API Gateway: websocket API

---
