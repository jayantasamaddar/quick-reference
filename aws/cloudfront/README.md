# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Amazon CloudFront?](#what-is-amazon-cloudfront)
- [CloudFront: Origins](#cloudfront-origins)
- [CloudFront: Caching](#cloudfront-caching)
  - [CloudFront Caching: Overview](#cloudfront-caching-overview)
  - [Cloudfront Caching: Creating an Invalidation](#cloudfront-caching-creating-an-invalidation)
- [CloudFront: Custom HTTP backend as an Origin](#cloudfront-custom-http-backend-as-an-origin)
  - [CloudFront: EC2 Instances as Origin](#cloudfront-ec2-instances-as-origin)
  - [CloudFront: ALB as Origin](#cloudfront-alb-as-origin)
- [CloudFront: Geo Restriction](#cloudfront-geo-restriction)
- [CloudFront: Signed URL / Signed Cookies](#cloudfront-signed-url--signed-cookies)
  - [Signed URL / Signed Cookies: Overview](#signed-url--signed-cookies-overview)
  - [CloudFront Signed URL vs S3 Pre-Signed URL](#cloudfront-signed-url-vs-s3-pre-signed-url)
  - [CloudFront Signed URL: Process](#cloudfront-signed-url-process)
- [CloudFront: Multiple Origin](#cloudfront-multiple-origin)
- [CloudFront: Origin Groups](#cloudfront-origin-groups)
- [CloudFront: Field Level Encryption](#cloudfront-field-level-encryption)
- [CloudFront: Using an SSL/TLS Certificate](#cloudfront-using-an-ssltls-certificate)
- [CloudFront: Lambda@Edge and CloudFront Functions](#cloudfront-lambdaedge-and-cloudfront-functions)
- [CloudFront vs S3 Cross Region Replication](#cloudfront-vs-s3-cross-region-replication)
- [CloudFront: Content Uploads via POST, PUT and other HTTP Methods](#cloudfront-content-uploads-via-post-put-and-other-http-methods)
- [CloudFront vs S3 Transfer Acceleration for PUT/POST](#cloudfront-vs-s3-transfer-acceleration-for-putpost)
- [CloudFront: Pricing](#cloudfront-pricing)
- [References](#references)

---

# What is Amazon CloudFront?

Amazon CloudFront is a Content Delivery Network (CDN) service built for high performance, security, and developer convenience.

- Improves read performance by caching content at the edge locations
- Reduces latency and improves user experience
- 216+ Points of Presence globally (edge locations)
- DDoS protection worldwide, integration with Shield, AWS Web Application Firewall

---

# CloudFront: Origins

- **S3 Bucket**

  - For distributing files and caching them at the edge
  - **[Restrict Access to an S3 Origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)**: To guarantee that only CloudFront can access your S3 buckets, you can get enhanced security with CloudFront **`Origin Access Control (OAC)`** (replaces the **`Origin Access Identity (OAI)`**). Create an OAC and then update the S3 Bucket Policy.
  - CloudFront can also be used as an ingress (upload files to S3)

- **Custom Origin (HTTP)**:

  - **Application Load Balancer**
  - **EC2 Instance**
  - **S3 Website** (must enable the bucket as a static S3 website)
  - **Any HTTP Backend you want**: HTTP server running on EC2 or on any server you manage, including On-Premise HTTP Servers

---

# CloudFront: Caching

## CloudFront Caching: Overview

- Cache based on:

  - **Headers**
  - **Session cookies**
  - **Query string parameters**

- The cache lives at each CloudFront Edge Location
- Cache has a **TTL** expiry timer that will **invalidate the cache**
- If there is a cache miss, the request will be forwarded to the origin
- If there is a cache hit, it is served from the cache at the edge location
- You want to thus maximize the cache hit rate to minimize requests to the origin

  - CloudFront is smart enough to separate static and dynamic content
  - Static requests are going to go through CloudFront into your static content holder (usually a S3 bucket). That means when we have these requests, no headers and no session caching rules may apply and so all the static content is going to be cached in CloudFront and we are going to be maximizing cache hits
  - Any dynamic content is going to go through CloudFront through a different distribution. This time it is going to be forwarded to an HTTP server, e.g. an Application Load Balancer or a certain EC2 Instance and we need to exercise care on how we would like to cache based on the values of your headers and cookies.

- Control the TTL (0 seconds to 1 year), can be set by the origin using the Cache-Control header or the Expires header
- You can invalidate part of the cache using the **`CreateInvalidation`** API

---

## Cloudfront Caching: Creating an Invalidation

**Situation**: You updated a file in your S3 bucket by reuploading it. The S3 bucket is set as a static website and has a CloudFront distribution. When opened via S3, the new file shows as intended, however it shows the old version on CloudFront. This is because of the TTL which is has not invalidated the cache. Thus, we need to create a Cache Invalidation rule.

- Select your CloudFront Distribution
- Click on the **`Invalidations`** Tab and click **`Create invalidation`**
- Add the path for each object that you want to remove from the CloudFront cache. You can use wildcards (`*`). E.g. `/*` would invalidate all files from the S3 bucket from the cache.

---

# CloudFront: Custom HTTP backend as an Origin

## CloudFront: EC2 Instances as Origin

It is possible for CloudFront to access any custom HTTP backend. This includes an EC2 instance or an Application Load Balancer (ALB).

For the CloudFront Edge Locations to access the EC2 Instance:

- The EC2 Instances must be Public because there is no private VPC connectivity in CloudFront
- Must have a security group for the EC2 Instance that allows the **[List of Public IP of Edge Locations of CloudFront](https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips)**.

---

## CloudFront: ALB as Origin

For the CloudFront Edge Locations to access the ALB and the EC2 Instances underneath:

- The ALB must be Public. The EC2 Instances can be Private because there is a Private VPC connection between the ALB and the EC2 Instances.
- Ensure the Security Group of the EC2 Instances allows the Security Group of the Load Balancer
- The Public IPs of the Edge Locations of CloudFront must be allowed in the Security Group of the Application Load Balancer

---

# CloudFront: Geo Restriction

- You can restrict your CloudFront Distribution:

  - **AllowList**: Allow your users to access your content only if they are in one of the countries on an approved list of countries
  - **BlockList**: Prevent your users from accessing your content if they're in one of the countries on a list of banned countries

- The `country` are determined using a 3rd party Geo-IP Database
- **Use Case:**

  - Copyright Laws to control access to content

- **Setup**:
  - Go to your CloudFront Distribution.
  - Click the **`Geographic restrictions`** Tab and click **`Edit`**.
  - Setup an Allow or Block List and select the countries from a multiple choice list.
  - Click **`Save changes`** to confirm the geographic restrictions.

---

# CloudFront: Signed URL / Signed Cookies

## Signed URL / Signed Cookies: Overview

**Situation**: You have a CloudFront distribution and you want to make it Private. You want to only give access to people to premium paid shared content all over the world, but you want to be able to see and know who has access to what on your CloudFront distribution.

To make this possible, you can use a **`Signed URL`** or a **`Signed Cookie`**

To use a Signed URL or Signed Cookie:

- Attach a policy with:

  - Includes URL expiration
  - Includes IP ranges to access the data from
  - Trusted signers (which AWS accounts can create the signed URLs)

- How long should the URL be valid for?

  - Shared content (music, movies): make it short (a few minutes)
  - Private content (private to the user): you can make it last years

- Signed URL: Gives access to individual files (one signed URL per file)
- Signed Cookie: Gives access to multiple files (one signed cookie for multiple files)

---

## CloudFront Signed URL vs S3 Pre-Signed URL

<!-- prettier-ignore -->
| CloudFront Signed URL                           | S3 Pre-Signed URL                                |
| ----------------------------------------------- | ------------------------------------------------ |
| Allows access to a path, no matter the origin   | Issues a request as the person who pre-signed the URL                  |
| Account-wide key-pair, only the root can manage | Uses the IAM key of the signing IAM principal                   |
| Can filter by IP, path, date and expiration     | Limited lifetime                  |
| Can leverage caching features                   |                   |

---

## CloudFront Signed URL: Process

- Two types of signers:

  1. Use a Trusted Key Group (Recommended)

  - Can leverage APIs to create and rotate keys (leverage IAM for API security)

  2. An AWS Account that contains a CloudFront Key Pair

  - Need to manage keys using the root account AND the AWS Console
  - Not recommended: Root account usage should be avoided. Automations not possible as no API access

- In your CloudFront distribution, you can create one or more trusted key groups
- You can generate your own public / private key: `ssh-keygen -b 2048 -f ~/.ssh/keyname -t rsa`. The public key will be named with a `.pub` extension.

  - The public key (uploaded) is used by CloudFront to verify URLs.

    - Go to **[Public Keys](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=ap-south-1#/publickey)** and create a Public Key and enter the generated Public Key.
    - Create a Key Group. This key group is what will be referenced by CloudFront to allow our EC2 Instances to create Signed URLs. Go to **[Key groups](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=ap-south-1#/keygrouplist)** and select the public keys (upto 5).

  - The private key is used by your applications (e.g. EC2) to sign URLs

---

# CloudFront: Multiple Origin

- To route different kinds of origins based on the content type
- Based on path pattern:
  - `/images/*`
  - `/api/*`
  - `/*`

---

# CloudFront: Origin Groups

- Goal: To increase High Availability and do Failover in case one origin has failed
- Origin Group: One primary and one secondary origin
- If the primary origin fails, the second is used
- Region Level High Availability possible by setting S3 buckets in different regions having replication as an Origin Group

---

# CloudFront: Field Level Encryption

- Goal: Protect user-sensitive information through application stack
- Adds an additional level of security along with in-flight encryption (HTTPS)
- The idea is that anytime sensitive information is sent by the user, the edge location is going to encrypt it and they will only be able to decrypt it, if they have access to a private key
- Uses asymmetric encryption
- Usage:
  - Specify set of fields in POST requests that you want to be encrypted (upto 10 fields). E.g. credit card
  - Specify the public key to encrypt them (done at the Edge Location). Hence data passing from the Edge Location to Amazon CloudFront will have the specified field(s) encrypted all along until it reaches the web server
  - The web server (destination) should have the private key to be able to decrypt the fields and use the information

---

# [CloudFront: Using an SSL/TLS Certificate](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html)

- If you're using the domain name that CloudFront assigned to your distribution, such as `d111111abcdef8.cloudfront.net`, you change the **Viewer Protocol Policy** setting for one or more cache behaviors to require HTTPS communication. In that configuration, CloudFront provides the SSL/TLS certificate.

  - The CloudFront API to change the value of the `ViewerProtocolPolicy` element, is **`UpdateDistribution`**.

- If you use a different domain name for your distribution, such as `example.com` then it's a best practice to do one of the following to avoid domain-name-related certificate warnings:

  - **Request a public certificate from AWS Certificate Manager.**
  - **Import certificates into AWS Certificate Manager.**

- **If you use an Amazon issued certificate**:

  - You must request the certificate in the `us-east-1` Region.
  - You must have permission to use and request the ACM certificate.

- **If you use an imported certificate with CloudFront**:

  - Your key length must be `1024` or `2048` bits and cannot exceed `2048` bits.
  - You must import the certificate in the `us-east-1` Region.
  - You must have permission to use and import the SSL/TLS certificate.

- **Workflow**:

  1. Open the [CloudFront console](https://console.aws.amazon.com/cloudfront/v3/home).
  2. In the top pane of the CloudFront console, choose the ID for the distribution that you want to update.
  3. On the Behaviors tab, choose the cache behavior that you want to update, and then choose Edit.
  4. Specify one of the following values for **Viewer Protocol Policy**:

     - **Redirect HTTP to HTTPS**:

       - Viewers can use both protocols. HTTP `GET` and `HEAD` requests are automatically redirected to HTTPS requests.
       - CloudFront returns HTTP status code 301 (Moved Permanently) along with the new HTTPS URL.
       - The viewer then resubmits the request to CloudFront using the HTTPS URL.

       - When a viewer makes an HTTP request that is redirected to an HTTPS request, **CloudFront charges for both requests**:

         - For the HTTP request, the charge is only for the request and for the headers that CloudFront returns to the viewer.
         - For the HTTPS request, the charge is for the request, and for the headers and the object that are returned by your origin.

     - **HTTPS Only**:

       - Viewers can access your content only if they're using HTTPS.
       - If a viewer sends an HTTP request instead of an HTTPS request, CloudFront returns HTTP status code `403 Forbidden` and does not return the object.

  5. Choose **Yes, Edit**.
  6. Repeat steps 3 through 5 for each additional cache behavior that you want to require HTTPS for between viewers and CloudFront.
  7. Confirm the following before you use the updated configuration in a production environment:
     - The path pattern in each cache behavior applies only to the requests that you want viewers to use HTTPS for.
     - The cache behaviors are listed in the order that you want CloudFront to evaluate them in. For more information, see Path pattern.
     - The cache behaviors are routing requests to the correct origins.

- **Errors**:

  - If you are missing permissions, the CloudFront console displays **Missing permission `acm:ListCertificates`** in the **Custom SSL Certificate** settings.
  - If you don't have a certificate in the US East (N. Virginia) Region, or if your key size exceeds 2048 bits, the setting for **Custom SSL Certificate** is grayed out.

- If you want to ensure that the objects that viewers get from CloudFront were encrypted when CloudFront got them from your origin, always use HTTPS between CloudFront and your origin.

- If you recently changed from HTTP to HTTPS between CloudFront and your origin, we recommend that you invalidate objects in CloudFront edge locations.

- CloudFront will return an object to a viewer regardless of whether the protocol used by the viewer (HTTP or HTTPS) matches the protocol that CloudFront used to get the object.

---

# CloudFront: Lambda@Edge and CloudFront Functions

Lambda@Edge is a feature of Amazon CloudFront that lets you run code closer to users of your application, which improves performance and reduces latency.

- **Edge Function**: Many modern applications want to execute some sort form of logic at the edge. An Edge Function is executable code that you write and attach to CloudFront distributions. The idea is to run these functions as close as possible to the users' locations to minimize latency.

  CloudFront provides two types of functions at the Edge:

  1. **CloudFront Functions**: CloudFront Native feature (manage entirely from within CloudFront)

     - **Runtime Support**: `JavaScript`
     - **Total package size**: `10 KB` (Lightweight)
     - **Max. Memory**: `2 MB`
     - **Number of Requests**: Scales to `millions of requests/second`
     - **Max. Execution Time**: `< 1 ms`
     - Used for high-scale, latency-sensitive CDN customizations
     - Sub-ms startup times

     - **Triggers**:

       - **Viewer Request**: After CloudFront receives a request from a viewer
       - **Viewer Response**: Before CloudFront forwards the response to the viewer

     - **Network Access, File System Access**: Yes
     - **Access to the Request Body**: No
     - **Pricing**: Free tier available, 1/6th price of Lambda@Edge

     - **Use Case**: < 1 ms execution functions

       - **Cache Key Normalization**: Transform non-body request attributes (headers, cookies, query strings, URL) to create an optimal Cache Key
       - **Header manipulation**: Insert / Modify / Delete HTTP Headers in the Request or Response
       - **URL rewrites and redirects**
       - **Request authentication & authorization**: Create and validate user-generated tokens (e.g. JWT) to allow/deny requests

  2. **Lambda@Edge**: AWS Lambda Functions

     - **Runtime Support**: `Node.js` or `Python`
     - **Total package size**: `1 - 50 MB`
     - **Max. Memory**: `128 MB - 10 GB`
     - **Number of Requests**: Scales to `thousands of requests/second`
     - **Triggers**:

       ![Lambda@Edge triggers](assets/cloudfront-events-that-trigger-lambda-functions.png)

       - **Viewer Request**: After CloudFront receives a request from a viewer
       - **Origin Request**: Before CloudFront forwards the request to the origin
       - **Origin Response**: After CloudFront receives the response from the origin
       - **Viewer Response**: Before CloudFront forwards the response to the viewer

     - **Network Access, File System Access**: Yes
     - **Access to the Request Body**: Yes
     - **Pricing**: No Free tier, charged per request and duration
     - Author your functions in one AWS Region (`us-east-1`), then CloudFront replicates to all of its locations

- **Performance**: Able to serve cached Lambda function responses on subsequent responses for the same user, from the closest edge location to the user. Get CloudFront benefits when it comes to latency.

- **Serverless**: With Lambda@Edge, you don't have to provision or manage infrastructure in multiple locations around the world.

- **Pricing**: You pay only for the compute time you consume - there is no charge when your code is not running.

- **Event-Driven**: Lambda@Edge runs your code in response to events generated by the Amazon CloudFront content delivery network (CDN).

- **Workflow**:

  - Just upload your code to AWS Lambda, which takes care of everything required to run and scale your code with high availability at an AWS location closest to your end user.
  - Set up your Lambda function to trigger from Amazon CloudFront

- **Use Case**:
  - Customize the CDN Content
  - Website Security and Privacy
  - Dynamic Web Application at the Edge
  - Search Engine Optimization (SEO)
  - Intelligently Route Across Origins and Data Centers
  - Bot Mitigation at the Edge
  - Real-Time Image Transformation
  - A/B Testing
  - User Authentication and Authorization
  - User Prioritization
  - User Tracking and Analytics

---

# CloudFront vs S3 Cross Region Replication

| CloudFront                      | S3 Cross Region Replication                           |
| ------------------------------- | ----------------------------------------------------- |
| Global Edge Network             | Must be setup for each region you want replication in |
| Files are cached for a TTL      | Files are updated in near real-time                   |
| Great for global static content | Read-Only. Great for dynamic content in few regions   |

---

# CloudFront: Content Uploads via POST, PUT and other HTTP Methods

- Support for additional HTTP Methods (like POST, PUT, PATCH) can be added to an existing distribution or enabled during the creation of a distribution by setting the **Allowed HTTP Methods** option.

- Place a single CloudFront distribution in front of your site, including the dynamic or interactive portions that make use of HTML forms or accept user data in some other way.

- Users can benefit from accelerated content uploads.

- After you enable the additional HTTP methods for your application’s distribution, PUT and POST operations will be sent to the origin (e.g. Amazon S3) via the CloudFront edge location, with the following benefits:

  - Improved efficiency
  - Reduced latency
  - Allow the application to benefit from the monitored, persistent connections that CloudFront maintains from the edge locations to the origin servers.

- CloudFront can be used for web sites that support a resource-oriented REST-style web service API, where the GET, PUT, DELETE, and PATCH operations act on stored information.

- You shouldn’t need to make any changes to your application: CloudFront simply proxies the requests for the new HTTP methods via the edge. `HEAD` and `GET` requests are cached; all others are passed along to the origin.

---

# CloudFront vs S3 Transfer Acceleration for PUT/POST

**CloudFront** is a very powerful way of distributing static content to geographically dispersed users with low latency speeds. If you have objects that are smaller than `1GB` or if the data set is less than `1GB` in size, you should consider using Amazon CloudFront's PUT/POST commands for optimal performance.

**S3 Transfer Acceleration** optimizes the TCP Protocol and adds additional intelligence between the client and the S3 bucket, making S3 Transfer Acceleration a better choice when high throughput is desired.

The similarity between the two is that S3 Transfer Acceleration routes traffic through Amazon CloudFront’s globally distributed Edge Locations and over AWS backbone networks.

---

# CloudFront: Pricing

- CloudFront Edge Locations are all around the world, hence cost of data out per edge location varies
- You can reduce the number of edge locations for cost-reduction
- Three price classes:
  - Price Class All: All regions - best performance
  - Price Class 200: Most regions but excludes most expensive regions (except South America, Australia and New Zealand)
  - Price Class 100: Only the least expensive regions (Region 1: United States, Mexico, and Canada; Region 2: Europe and Israel)

---

# References

- [List of Public IP of Edge Locations of CloudFront](https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips)
- [Reducing Latency and Shifting Compute to the Edge with Lambda@Edge](https://aws.amazon.com/blogs/networking-and-content-delivery/reducing-latency-and-shifting-compute-to-the-edge-with-lambdaedge/)
