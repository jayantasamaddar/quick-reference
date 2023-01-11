# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Organizations: Overview](#aws-organizations-overview)
- [AWS Organizations: Core Concepts](#aws-organizations-core-concepts)
- [AWS Organizations: Service Control Policies (SCP)](#aws-organizations-service-control-policies-scp)
- [AWS Organizations: Migrate Accounts across Organizations](#aws-organizations-migrate-accounts-across-organizations)
- [AWS Resource Access Manager (RAM)](#aws-resource-access-manager-ram)
- [References](#references)

---

# AWS Organizations: Overview

- AWS Organizations helps you centrally govern your environment as you scale your workloads on AWS. Whether you are a growing startup or a large enterprise, Organizations helps you to:

  - Programmatically create new accounts and allocate resources
  - Simplify billing by setting up a single payment method for all of your accounts
  - Create groups of accounts to organize your workflows
  - Apply policies to these groups for governance.

- **Central governance and Management capabilities**:

  - Automate AWS account creation and management, and provision resources with AWS CloudFormation Stacksets
  - Maintain a secure environment with policies and management of AWS security services
  - Govern access to AWS services, resources, and regions
  - Centrally manage policies across multiple AWS accounts
  - Audit your environment for compliance
  - View and manage costs with consolidated billing
  - Configure AWS services across multiple accounts

- There are no charges to using AWS Organizations

- The owner of the **Management Account** is responsible for paying for all usage, data, and resources used by the accounts in the organization.

---

# AWS Organizations: Core Concepts

1. **Organization**: An **organization** is a collection of AWS accounts that you can organize into a hierarchy and manage centrally.

2. **AWS Account**:

- An AWS account is a container for your AWS resources. You create and manage your AWS resources in an AWS account, and the AWS account provides administrative capabilities for access and billing.
- Using multiple AWS accounts is a best practice for scaling your environment, as it provides a natural billing boundary for costs, isolates resources for security, gives flexibility or individuals and teams, in addition to being adaptable for new business processes.

3. **Management Account (formerly known as Master Account)**:

- A management account is the AWS account you use to create your organization.
- From the management account, you can,

  - Create other accounts in your organization
  - Invite and manage invitations for other accounts to join your organization
  - Remove accounts from your organization.

- You can also attach policies to entities such as **Administrative Roots**, **Organizational Units (OUs)**, or **Accounts** within your organization.

- The management account is the ultimate owner of the organization, having final control over security, infrastructure, and finance policies.

- This account has the role of a payer account and is responsible for paying all charges accrued by the accounts in its organization.

- Once selected, you **CANNOT** change which account in your organization is the management account.

4. **Member Account**:

   - A member account is an AWS account, other than the management account, that is part of an organization.
   - If you are an administrator of an organization, you can create member accounts in the organization and invite existing accounts to join the organization.
   - You also can apply policies to member accounts.
   - A member account can belong to only one organization at a time.

5. **Administrative Root**:

   - An administrative root is contained in the management account and is the starting point for organizing your AWS accounts
   - The administrative root is the top-most container in your organization’s hierarchy.
   - Under this root, you can create **Organizational Units (OUs)** to logically group your accounts and organize these OUs into a hierarchy that best matches your business needs.

6. **Organizational Unit (OU)**:

   - An **Organizational Unit (OU)** is a group of AWS accounts within an organization.
   - An OU can also contain other OUs enabling you to create a hierarchy.
   - Example:

     - You can group all accounts that belong to the same department into a departmental OU.
     - Similarly, you can group all accounts running security services into a security OU.

   - OUs are useful when you need to apply the same controls to a subset of accounts in your organization.

   - **Nesting** OUs enables smaller units of management.

     - Example: You can create OUs for each workload, then create two nested OUs in each workload OU to divide production workloads from pre-production.
     - These OUs inherit the policies from the parent OU in addition to any controls assigned directly to the team-level OU.

7. **Policy**:

   - A policy is a “document” with one or more statements that define the controls that you want to apply to a group of AWS accounts.

   - AWS Organizations supports the following policies:

     - **Backup policies**: Requires [AWS Backups](../../diasaster-recovery/README.md#aws-backup) on a specified cadence
     - **Tag policies**: Defines tag keys and allowed values
     - **AI services opt-out policies**: Controls how AI services store or use content
     - **Service Control Policies (SCPs)**: An SCP defines the AWS service actions, such as Amazon EC2 `RunInstances`, that are available for use in different accounts within an organization.

   - Policies can be applied to:

     - **The root of the organization** (applies to all accounts)
     - **Individual Organizational Units (OUs)** - which applies to all accounts in the OU, including nested OUs
     - **To Individual Accounts**

   - **Policies are inherited through hierarchical connections in the organization**: Let’s assume that you have arranged your AWS accounts into OUs according to your application development stages: DEV, TEST, and PROD.

     - Policy P1 is attached to the organization’s root
     - Policy P2 is attached to the DEV OU
     - Policy P3 is attached to AWS account A1 in the DEV OU.
     - With this setup, P1+P2+P3 all apply to account A1.

---

# AWS Organizations: Service Control Policies (SCP)

- **Service control policies (SCPs)** are a type of organization policy that you can use to manage permissions in your organization.

- **SCPs** allow you to control which AWS service actions are accessible to principals (account root, IAM users, and IAM roles) in the accounts of your organization.

- A **SCP** never grants permissions. Instead, SCPs are JSON policies that specify the maximum permissions for the affected accounts. Thus, IAM Users and Roles must still be granted permissions with appropriate IAM permission policies.

- Thus, the effective permission on a principal in an account that has an SCP attached is the intersection of what is allowed explicitly in the SCP and what is allowed explicitly in the permissions attached to the principal.

  - **Example**:

    - If an IAM user has:

      - SCP: `"Allow": "ec2:*"` and `"Allow": "s3:*"` (Grants maximum permissions)
      - IAM policy: `"Allow": "ec2:*"` and `"Allow": "sqs:*"` (Attempts to grant permissions within the scope of the SCP)
      - The resultant permission for the IAM user is `"Allow": "ec2:*"`.
      - The principal cannot perform any Amazon SQS (not allowed by the SCP) or S3 actions (not granted by the IAM policy).

- **Scope of SCPs**:

  - SCPs affect only **_member_** accounts in the organization and their IAM users (including the **_root user_**) and roles. The only exceptions are **[Tasks and entities not restricted by SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#not-restricted-by-scp)**.
  - SCPs **DO NOT** affect users or roles in the **_management_** account.
  - SCPs **DO NOT** affect users or roles from accounts outside the organization.
  - SCPs **DO NOT** affect resource-based policies directly.
  - SCPs **DO NOT** affect any **service-linked role**. Service-linked roles enable other AWS services to integrate with AWS Organizations and can't be restricted by SCPs.

- If both a permissions boundary (an advanced IAM feature) AND an SCP are present, then **the boundary, the SCP, and the identity-based policy must all allow the action**.

- **Both Permission boundaries and SCPs DO NOT grant permissions but defines the maximum permissions**. However, the difference betwen a Permissions Boundary and SCPs is that:

  - A Permissions Boundary can be attached to IAM Users and Roles within an Account.
  - SCPs can be attached to:

    - **The root of the organization** - applies to all member accounts and their IAM users and Roles
    - **Individual Organizational Units (OUs)** - which applies to all member accounts in the OU, including nested OUs (and their IAM Users and Roles)
    - **To Individual Accounts** - applies to the account and IAM users and Roles under the account

- SCPs follow the same rules and grammar as IAM policies.

- SCPs behave the same way as IAM policies: an empty IAM policy is equivalent to a default `DENY`. Attaching an empty SCP to an account is equivalent to attaching a policy that explicitly denies all actions.

- You can simulate the effect of an SCP on an AWS account using the IAM Policy Simulator

- AWS strongly recommends that you don't attach SCPs to the root of your organization without thoroughly testing the impact that the policy has on accounts.

  - Instead, create an OU that you can move your accounts into one at a time, or at least in small numbers, to ensure that you don't inadvertently lock users out of key services
  - One way to determine whether a service is used by an account is to examine the [service last accessed data in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html). Another way is to [use AWS CloudTrail to log service usage at the API level](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/how-cloudtrail-works.html).

---

# [AWS Organizations: Migrate Accounts across Organizations](https://aws.amazon.com/premiumsupport/knowledge-center/organizations-move-accounts/)

- **Pre-requisities**:

  - You have the permissions that you need to move both the management and member accounts in the organization.
  - You backed up any reports from the member accounts that you need to keep. The member accounts can't access these reports after leaving the Organization.
  - You have a valid payment method on the member account to address any charges that are incurred while the accounts are migrating.
  - You have reviewed and updated the tax information for any accounts that are changing from one organization to another.
  - You have changed the AWS Support plan for migrating Developer or Business accounts.
  - You understand the technical process of migrating accounts.

- **Resolution**:

  > **Note**: If you have a pricing agreement with AWS and want to move your management account to a different organization, contact your Account Manager.

  - You must have AWS root user account access or AWS Identity and Access Management (IAM) access to both the member and management accounts. For more information on adding these permissions, see Managing access permissions for your organization.

  - To share resources with a migrating account, you must enable resource sharing with AWS Organizations before migrating the account. For more information, see Sharing your AWS resources.

- **The Migration Process**:

  - Do the following for each member account:

    1. Remove the member account from the old organization.
    2. Send an invite to the member account from the new organization.
    3. Accept the invite to the new organization from the member account.

  - If you want the management account of the old organization to also join the new organization, do the following:

    1. Remove the member accounts from the organization using the preceding process.
    2. Delete the old organization.
    3. Repeat the preceding process to invite the old management account to the new organization as a member account.

---

# AWS Resource Access Manager (RAM)

- **AWS Resource Access Manager (RAM)** helps you securely share your resources across AWS accounts, within your organization or organizational units (OUs) in AWS Organizations, and with IAM roles and IAM users for supported resource types.

- **You can use AWS RAM to share resources with other AWS accounts**.

  - If you are part of an organization in AWS Organizations and sharing within your organization is enabled, you can also share resources with OUs or your entire organization.
  - If you share resources with accounts that are outside of your organization, those accounts receive an invitation to join the resource share. After they accept the invitation, they can start using the shared resources.

- This eliminates the need to provision and manage resources in every account.
- When you share a resource with another account, that account is granted access to the resource and any policies and permissions in that account apply to the shared resource.

---

# References

- [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
