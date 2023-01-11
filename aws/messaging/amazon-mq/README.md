# Table of Contents

- [Table of Contents](#table-of-contents)
- [Amazon MQ: Overview](#amazon-mq-overview)

---

# Amazon MQ: Overview

- Fully managed service for open-source message brokers that use open-source protocols like `MQTT`, `AMQP`, `STOMP`, `Openwire`, `WebSockets`

- Amazon MQ is managed message broker servive for:

  - `RabbitMQ`
  - `ActiveMQ`

- Amazon MQ doesn't auto-scale like SQS / SNS
- Amazon MQ runs on servers you have to manage.

- **High availability**:

  - Can run in Multi-AZ with failover
  - One active and one standby broker in two AZs
  - Need to define Amazon EFS as backend storage
  - When failover happens the Network drive is mounted onto the Standby broker and will have the same data as the previously-active-now-failed Broker

- Amazon MQ has both queue feature (like-SQS) and topic feature (like-SNS)

---
