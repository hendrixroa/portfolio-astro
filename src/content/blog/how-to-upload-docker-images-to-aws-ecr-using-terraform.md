---
title: "How to upload docker images to AWS ECR using Terraform"
description: "Learn how to automate Docker image deployment to AWS ECR using Terraform. This guide covers creating ECR repositories, setting up lifecycle policies, and using null_resource to build and push Docker images with a complete Spring Boot example."
pubDate: "Jun 09 2023"
bannerImage: "/containers.jpg"
tags: ["aws", "ecr", "terraform"]
---

The containers and particularly docker containers have supposed an advance in the software industry allowing portability between different environments in the software development cycle in a faster way. There are multiple cloud providers that allow to creation, hosting, and running of containers, at this time I will focus on AWS ECR service. 

## The process to create a docker image has 4 steps: 
Create the docker file definition which contains all information about the docker image, operative system, and the steps to run the application. 

Create the artifact locally: The Dockerfile is executed and create the artifact in local memory.

Establish a connection with an external registry where the artifact will be uploaded.

Upload the artifact (docker image)

## Terraform resources

![Diagram ECR](/blog/how-to-upload-docker-images-to-aws-ecr-using-terraform/diagram-ecr.png)


First of all, we need to create the AWS ECR resource to push docker images, ECR is similar to the docker hub registry. 

```terraform
resource "aws_ecr_repository" "noiselesstech" {
	  name = "noiselesstech"
	

	  image_scanning_configuration {
	    scan_on_push = true
	  }
}
```
name: identifier of the docker registry

image_scanning_configuration: useful to detect any vulnerability in your docker image.

The AWS ECR is private, if you want to use a public one, check the public resource.

Additionally for AWS ECR resources is a good practice to delete untagged images, doing this manually is a little bit boring and repetitive, that’s why AWS ECR has a feature that allows you when a deployment or upload occurs a lot of times a docker image is removed automatically. Having the AWS ECR policy saves time and money in removing unused docker images. 

```terraform
resource "aws_ecr_lifecycle_policy" "default_policy" {
  repository = aws_ecr_repository.noiselesstech.name
	

	  policy = <<EOF
	{
	    "rules": [
	        {
	            "rulePriority": 1,
	            "description": "Keep only the last ${var.untagged_images} untagged images.",
	            "selection": {
	                "tagStatus": "untagged",
	                "countType": "imageCountMoreThan",
	                "countNumber": ${var.untagged_images}
	            },
	            "action": {
	                "type": "expire"
	            }
	        }
	    ]
	}
	EOF
	

}
```

repository: require a link to the ECR repository

 policy: allow us to put the policies according to our needs.

Then after running terraform apply we can see the ECR repository created:

![Checking ECR Resource](/blog/how-to-upload-docker-images-to-aws-ecr-using-terraform/check-ecr.png)

## Docker image packaging
I will use a simple spring boot standalone application to create the docker image, you can use the stack of your preference, just be aware of the steps we need to follow to package the artifact and create the docker image to subsequently push on the ECR registry. 

To prepare the project to create the docker image we should follow at least the steps: 

1. Authenticate into ECR registry using the CLI, more info (https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html)
1. Command build to create the software artifact.
1. Command to build the docker image locally 
1. Command to push the docker image. 

For all those steps we are going to use the null_resource:

```terraform
resource "null_resource" "docker_packaging" {
	
	  provisioner "local-exec" {
	    command = <<EOF
	    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com
	    gradle build -p noiselesstech
	    docker build -t "${aws_ecr_repository.noiselesstech.repository_url}:latest" -f noiselesstech/Dockerfile .
	    docker push "${aws_ecr_repository.noiselesstech.repository_url}:latest"
	    EOF
	  }
	

	  triggers = {
	    "run_at" = timestamp()
	  }
	

	  depends_on = [
	    aws_ecr_repository.noiselesstech,
	  ]
}
```

As you can see the second command would be the only command change you need to do depending on the stack project used and the Dockerfile definition of course. Triggers with timestamps to make sure every deployment the command is executed.

After running Terraform apply you can see your docker image pushed and ready to use in any container runner that offers aws. 

![Confirm ECR Resource](/blog/how-to-upload-docker-images-to-aws-ecr-using-terraform/confirm-ecr.png)

[Code example repository](https://github.com/hendrixroa/terraform-template/tree/post-how-to-create-ecr-image)


Thanks for reading!

