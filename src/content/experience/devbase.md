---
title: "Back-end Lead & DevOps at DevBase"
date: "Oct 2019 - Sep 2021"
order: 4
---

In this dual role, you focused on automating infrastructure, designing robust systems, and integrating various AWS services, laying a strong groundwork for managing AI/ML workloads and data pipelines.

* **Automated & Scalable Infrastructure for AI (IaC & Serverless):**
    * Automated infrastructure provisioning with Terraform on AWS, standardizing multi-environment deployments and boosting team productivity. This is foundational for creating reproducible and scalable AI environments.
    * Delivered serverless solutions utilizing AWS Lambda that reduced internal process costs by 35%, showcasing experience relevant for cost-effective AI model serving and data processing tasks.
    * Developed reusable Lambda layers to centralize common dependencies, accelerating deployment speed by 3X, improving efficiency in developing serverless AI components.
    * Created Terraform modules for AWS ECS Fargate deployments, streamlining the delivery of components (REST API, SQS consumer, and backfiller app), applicable for deploying containerized AI applications.
    * Architected database deployment modules using AWS RDS (Postgres for production and serverless Postgres for lower environments), reducing costs by 55%, essential for cost-efficiently managing data for AI.

* **Data Processing & CI/CD for AI Pipelines:**
    * Engineered an AWS SQS processor integrated into an ETL workflow, transforming and loading over 500K daily transactions into an AWS RDS Postgres database, demonstrating robust data ingestion and processing for AI.
    * Implemented batch processing using AWS SQS combined with database aggregators to consolidate bills and invoices, reducing report generation times by 60%, transferable to efficient large-scale data processing for AI.
    * Developed a CI/CD migration pipeline using an AWS ECS Task (the “Migrator"), cutting database inconsistency errors by 70%, critical for maintaining data integrity in AI systems.
    * Configured an ELK stack (Elasticsearch, Logstash, Kibana) to streamline error debugging and centralize logs, important for monitoring and troubleshooting AI applications.

* **Secure & Resilient AI Systems:**
    * Designed and deployed a robust authentication system with AWS Cognito for role-based access and granular permissions.
    * Pioneered a canary deployment process via AWS API Gateway to direct traffic between releases, significantly lowering deployment error rates, a best practice for safe AI model updates.
    * Developed an AWS SQS-powered ETL processor that standardized and loaded more than 500K daily medical records into AWS RDS Postgres, ensuring consistent and secure processing of sensitive data.

* **Documentation & Collaboration:**
    * Authored Architectural Decision Records (ADR) to document feature changes and established ADR guidelines for classifying data formats, enhancing team alignment and knowledge transfer crucial for AI projects.