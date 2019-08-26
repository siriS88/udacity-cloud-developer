# Public docker images
The following docker images are published to dockerhub: 
https://hub.docker.com/r/ssingamneni/udagram-frontend
https://hub.docker.com/r/ssingamneni/udagram-reverseproxy
https://hub.docker.com/r/ssingamneni/udagram-restapi-user
https://hub.docker.com/r/ssingamneni/udagram-restapi-feed

# Starting the app as a container on a local system
Step 1: Pull the images above from dockerhub

Step 2: Setup the following local environment variables. 
I am using a AWS RDS postgres database and an AWS S3 bucket in the us-west-2 region.
`
export POSTGRESS_USERNAME=udagramssingamnenidev
export POSTGRESS_PASSWORD=udagramssingamnenidev
export POSTGRESS_DB=udagramssingamnenidev
export POSTGRESS_HOST=udagramssingamnenidev.cuf4lvy9x9ds.us-west-2.rds.amazonaws.com
export AWS_BUCKET=udagram-ssingamneni-dev2
export AWS_PROFILE=default
export AWS_REGION=us-west-2
export JWT_SECRET=helloworld
export URL=http://localhost:8080
`

Step 3: clone this repo and checkout branch siri-microservices-project branch

Step 4: cd cloud-developer/course-03/exercises/udacity-c3-deployment/docker

Step 5: docker-compose up

Step 6: You will have a front-end server running at http://localhost:8100 which is accessing the feed as well as the user services which are also running in their own containers

