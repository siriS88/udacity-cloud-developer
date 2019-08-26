# Public docker images
The following docker images are published to dockerhub: 
https://hub.docker.com/r/ssingamneni/udagram-frontend
https://hub.docker.com/r/ssingamneni/udagram-reverseproxy
https://hub.docker.com/r/ssingamneni/udagram-restapi-user
https://hub.docker.com/r/ssingamneni/udagram-restapi-feed

# Starting the app as a container on a local system
Step 1: Pull the images above from dockerhub

Step 2: Setup the following local environment variables. 

```
export POSTGRESS_USERNAME

export POSTGRESS_PASSWORD

export POSTGRESS_DB

export POSTGRESS_HOST

export AWS_BUCKET

export AWS_PROFILE

export AWS_REGION

export JWT_SECRET

export URL
```

Step 3: clone this repo and checkout branch siri-microservices-project branch

Step 4: cd cloud-developer/course-03/exercises/udacity-c3-deployment/docker

Step 5: docker-compose up

Step 6: You will have a front-end server running at http://localhost:8100 which is accessing the feed as well as the user services which are also running in their own containers

