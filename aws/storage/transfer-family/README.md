# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Transfer Family: Overview](#aws-transfer-family-overview)

---

# AWS Transfer Family: Overview

- A fully-managed service for file transfers into and out of Amazon S3 or Amazon EFS using the File Transfer Protocols

- **Supported Protocols**:

  - **AWS Transfer for FTP (File Transfer Protocol)**: Unencrypted
  - **AWS Transfer for FTPS (File Transfer Protocol over SSL)**: Adds an encryption layer using SSL
  - **AWS Transfer for SFTP (Secure File Transfer Protocol)**: Inherently secure and fully encrypted

- Fully managed infrastructure
- Scalable, reliable and highly available (Multi-AZ)

- **Pricing**: Pay per provisioned endpoint per hour + data transfers in GB

- **Authentication**:
  - Store and manage users' credentials within the service
  - Integrate with existing authentication systems
    - Microsoft Active Directory
    - LDAP
    - Okta
    - Amazon Cognito
    - Custom

---
