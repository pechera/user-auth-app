# Auth service using NestJS, Drizzle ORM, PostgreSQL and Redis

### How to start the app

### How to scale the app

Accordind to the concept of vertical and horizontal scaling, you should first pay attention to the server hardware and bandwidth. In scaling an application like that, I would recommend the following steps:

- add more caching where it will have an impact on performance.
- use db indexes. To do this, you should to investigate the most loaded endpoints and make indexes in the db depending on the type of the query. For example, make a B-tree index to the login query.

After implementing these recommendations, you can start implementing clustering. At this stage, the goal is to horizontally scale the application by using a load balancer and running multiple applications.

### How to integrate a Social Login

Here is an example of Google OAuth integration without using third-party libraries:

- Create a project and get сredentials in Google Developer Console
- Create a callback enpoint to which a webhook will be sent after successful user authorization
- Get an access token and user data through Google API via two GET requests to the authorization API
- Provide the user with the access token and check its validity in subsequent requests
