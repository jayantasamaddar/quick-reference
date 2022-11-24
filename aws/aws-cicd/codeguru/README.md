# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)

---

# Overview

- **AWS CodeGuru** is a Machine Learning powered service for:

  - Automated Code Reviews
  - Application Performance Recommendations

- Provides two functionalities:

  - **CodeGuru Reviewer**: Automated code reviews for static code analysis (development).

    - We need to upload the code into a repository like AWS CodeCommit or GitHub, then CodeGuru can have a look at all the lines of code and can then give actionable recommendations in case it detects a bug or a memory leak or something it has seen before.
    - CodeGuru Reviewer looks at the commits and whenever you push your code, tells you the lines of code that are probably wrong - identifies critical issues, security vulnerabilities, and hard-to-find bugs.
    - Example: You can implement coding best practices, resource leaks, security detection, input validation
    - Uses machine learning and automated reasoning. Hard-learned lessons across millions of code reviews on 1000s of open-source and Amazon.com repositories.
    - Supports `Java` and `Python`
    - Integrates with `GitHub`, `BitBucket` and `AWS CodeCommit`.

  - **CodeGuru Profiler**: Visibility / Recommendations about application performance during runtime (production)

    - When you build and test your application, **CodeGuru Profiler** is already going to detect and optimize the expensive lines of code, pre-production.

    - When you deploy your application, you're going to measure your application in Real-time and CodeGuru Profiler is going to identify performance and cost improvements in prodction and give you these recommendations directly in your code.

    - Helps understand the runtime behaviour of the application.

    - Example: Identify if your application is consuming excessive CPU capacity on a logging routine.

    - Features:

      - Identify and remove code inefficiencies
      - Improve application performance (e.g. reduce CPU utilization)
      - Decrease compute costs
      - Provide heap summary (identify which objects are using up space and memory)
      - Anamoly detection

    - Supports applications running on AWS or on-pemise

    - Minimal overhead on the application

---
