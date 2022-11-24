# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)

---

# Overview

- Software packages depend on each other to be built (also called code dependencies) and new ones are created
- Storing and retrieving these dependencies is called **artifact management**.
- Traditionally you need to setup your own artifact management system.
- **AWS CodeArtifact** is a secure, scalable and cost-effective artifact management system for software development.
  - All artifacts live within your VPC within AWS.
  - Works with common dependency management tools such as Maven, Gradle, npm, yarn, twine, pip and NuGet.
  - CodeArtifact proxies other public artifact repositories, so your application can stay within your VPC.
- Developers and **AWS CodeBuild** can then retrieve these dependencies straight from **AWS CodeArtifact**.

---
