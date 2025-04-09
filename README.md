🚀 Cloud Inventory System (Full-Stack Project)
A secure, role-based inventory management platform allowing owners to manage products and customers to browse, add to cart, and place orders — all backed by AWS serverless architecture.

🛠️ Tech Stack
Frontend:

React.js + Tailwind CSS

react-router-dom for routing

react-oidc-context for authentication with AWS Cognito

Backend (Serverless):

AWS Lambda (Node.js/Python) for processing API requests

Amazon API Gateway to expose RESTful endpoints

Amazon DynamoDB for data storage (products & orders)

Authentication & Authorization:

AWS Cognito User Pool for user management

Role-based access (Owner vs Customer) via email parsing

Secure login/logout flow using Cognito-hosted UI and OIDC

✅ Key Features
🔐 Authentication & Access Control
Secure login via AWS Cognito

Role-based redirection after login

Protected routes for /owner/dashboard and /customer/dashboard

📦 Owner Dashboard
Add, edit, and delete inventory items

See all products in a structured layout

Built using dynamic React forms + Tailwind UI

🛒 Customer Dashboard
View all available inventory

Add items with custom quantity to cart

Real-time cart management with total calculation

Place orders (saved to DynamoDB via Lambda)

View previous orders with order ID, items, quantity, and total

☁️ AWS Services Used
AWS Cognito: Authentication & User Pool

API Gateway: REST APIs for inventory and order handling

AWS Lambda: Serverless logic for create/update/query DynamoDB

DynamoDB:

InventoryItems table for storing product data

CustomerOrders table for tracking orders with partition key id and GSI on email

IAM Roles for Lambda access to DynamoDB

📊 Outcome
Role-specific workflows (Owner vs Customer)

End-to-end serverless data flow (React ⇨ API Gateway ⇨ Lambda ⇨ DynamoDB)

Fully secured access and scoped data handling per user

Clean, responsive UI using Tailwind CSS

💼 Perfect For:
IAM developers exploring AWS Cognito & secure routing

Full-stack cloud engineers building with React + AWS

Serverless enthusiasts looking to implement DynamoDB-based microflows
