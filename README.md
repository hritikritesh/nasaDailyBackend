# Serverless backend for user management

## Introduction 

Supports two types of request:
1. Login: It validate user information from backend database.
2. Register: It creates new user information in backend database.

## Tools Used

1. Express is used to handle api requests.
2. Cors for frontend requests.
3. Mongoose for connecting with MongoDB and performing operations in database.
4. MongoDB Atlas is used for backend database.

## How to deploy on vercel

1. Push your code to github.
2. Go to vercel homepage and click on add new project.
3. Import the repository you want to deploy.
4. If repository is not in list give vercel access to the particular repository.
5. During deployment select framework preset as "Other"
6. Leave root directory as it is.
7. Supply the environment variable MONGO_URI as your MongoDB URI
8. Deploy !!
9. Create integration with MongoDB: https://vercel.com/integrations/mongodbatlas
10. Redeploy