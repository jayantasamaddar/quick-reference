# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon Comprehend: Overview](#amazon-comprehend-overview)
- [Amazon Comprehend Medical: Overview](#amazon-comprehend-medical-overview)

---

# Amazon Comprehend: Overview

- For **Natural Language Processing - NLP**
- Fully managed and serverless service
- Uses machine learning to find insights and relationships in text

  - **Language Detection**
  - **Key Phrase Extraction**: Extracts key phrases, places, people, brands or events
  - **Sentiment Analysis**: Understands how positive or negative the text is
  - Analyzes text using tokenization and parts of speech
  - Automatically organizes a collection of text files by topic

- **Use Cases**:
  - Analyze customer interactions (emails) to find what leads to a positive or negative experience
  - Create and group articles by topics that Comprehend will uncover

---

# Amazon Comprehend Medical: Overview

- Amazon Comprehend Medical detects and returns useful information in unstructured clinical text:

  - Physician's notes
  - Discharge summaries
  - Test results
  - Case notes

- Uses NLP to detect Protected Health Information (PHI) - **`DetectPHI`** API

- **Workflow**:

  - Store documents in Amazon S3
  - Analyze real-time data with Kinesis Data Firehose, or use Amazon Transcribe to transcribe patient narratives into text that can be analyzed by Amazon Comprehend Medical

---
