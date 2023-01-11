# Table of Contents

- [Table of Contents](#table-of-contents)
- [AWS Control Tower: Overview](#aws-control-tower-overview)
- [AWS Control Tower: Guardrails](#aws-control-tower-guardrails)
- [AWS Control Tower vs AWS Organizations](#aws-control-tower-vs-aws-organizations)

---

# AWS Control Tower: Overview

- AWS Control Tower, built on AWS services such as [AWS Organizations](../organizations), offers the easiest way to set up and govern a new, secure, multi-account AWS environment.
- It establishes a landing zone, which is a well-architected, multi-account environment based on best-practice blueprints, and enables governance using guardrails you can choose.
- **Guardrails** are [Service Control Policies (SCPs)](../organizations/README.md#aws-organizations-service-control-policies-scp) and AWS Config rules that implement governance for security, compliance, and operations.

---

# AWS Control Tower: Guardrails

- Guardrails are pre-packaged SCP and AWS Config governance rules for security, operations, and compliance that customers can select and apply enterprise-wide or to specific groups of accounts.
- A guardrail is expressed in plain English, and enforces a specific governance policy for your AWS environment that can be enabled within an organizational unit (OU).

---

# AWS Control Tower vs AWS Organizations

- AWS Control Tower offers an abstracted, automated, and prescriptive experience on top of AWS Organizations.
- It automatically sets up AWS Organizations as the underlying AWS service to organize accounts and implements preventive guardrails using SCPs.

- Control Tower and Organizations work well together.

  - You can use Control Tower to set up your environment and set guardrails.
  - Then using AWS Organizations, you can further create custom policies (such as tag, backup or SCPs) that centrally control the use of AWS services and resources across multiple AWS accounts.

---
