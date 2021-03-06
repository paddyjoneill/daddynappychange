# Daddy Nappy Change

## Description

This is a work in progress and I will add more detail as I go along. The app is now hosted at https://daddynappychange.co.uk on an AWS EC2 instance. The app has all the microservices running in their own docker containers with a Caddy docker container acting as a reverse proxy and providing SSL.

This app is to help with the problem that when Dad's are out with their babies at quite a few venues they only have baby change facilities in the women's toilets. The idea is to have a map upon which there are colour coded markers to represent different situations (only in the womens, in the disabled, seperate baby change room, no baby change...). The user would then be able to click on the marker and get more information about the venue, user reviews, baby change location etc. There will also be the option for users to sign up and then submit new venues as well as add reviews or update information for existing ones.

### Tech Stack
#### Front-end: React 
#### Back-end: Python (Flask, Celery), MySQL, Redis

The main purpose of this app is for me to consilidate my programming skills and learn some new ones. I will be using React for the front-end which I have used before and I'm familiar with. This should also allow me later on to use the code and create a mobile app using React Native.

Since graduating CodeClan I have been learning Python and intend to use this to power the back-end of the site utilising the Flask framework. I also plan to deploy the backend to AWS and learn about cloud platforms as well as learning AWS RDS and using it for persistence of data.

Other things I have planned are to learn Docker and Jenkins to set up a CI/CD pipeline,  saving user uploaded images to an s3 bucket and looking into using GraphQL for my queries.

### Blogs

I have been writing blogs to document my progress and thought process:

[Planning](https://medium.com/@paddyjoneill_76057/planning-d7d9f8071f8b)

[Back to Front or Front to Back](https://medium.com/@paddyjoneill_76057/back-to-front-or-front-to-back-d16772804fd6)

[Persistence](https://medium.com/@paddyjoneill_76057/persistence-4d83d0debc5b)

[Object Relational Mapping](https://medium.com/@patrickjamesoneill/object-relational-mapping-89702764f5e2)

[Asynchronous Task Management with Celery](https://medium.com/@patrickjamesoneill/asynchronous-task-management-with-celery-c328d7bc99cb)

[Dockerising and deploying a Flask app](https://medium.com/@patrickjamesoneill/dockerising-and-deploying-a-flask-app-fd075ddd26e8)

[Dockerising Everything](https://medium.com/@patrickjamesoneill/dockerising-everything-a1da40d51bf1)

