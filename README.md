# MEN Stack CRUD App Lab

## Setup Complete

### What we did
- Created GitHub repo
- Cloned it locally
- Ran `npm init`
- Set entry point to `server.js`
- Created first commit

### Why
We prepared a clean Node project connected to GitHub.

### Key Words

**Remote** – Online version of our project (GitHub)  
**Clone** – Download + connect to GitHub  
**package.json** – Project settings file  

### Engineering Rule
Commit at clean checkpoints.

## MongoDB Connected

### What we did
Connected our Express app to MongoDB Atlas using Mongoose and environment variables.

### Why
Our app can now communicate with a real cloud database.

### Key Words
**Mongoose** – Tool that connects JavaScript to MongoDB  
**Environment Variables** – Secure way to store sensitive values  

### Engineering Rule
Never hardcode database credentials. Use environment variables.

## Movie Model (Schema)

We created a Movie schema using Mongoose.

A **schema** is a blueprint that defines:
- What fields exist
- What type they are
- What rules they follow

Our Movie includes:
- title (required)
- director
- year
- rating (1–10)
- watched (default: false)

We then created a Model from the schema and exported it so the server can use it.

This ensures our database follows structure and rules.

## Middleware

We added two small tools to help our app handle forms correctly.

### express.urlencoded()
This lets our server read information from forms.
Without it, the server cannot understand form data.

### method-override
Forms can only send GET and POST.
But a CRUD app also needs PUT and DELETE.
This tool allows us to simulate those actions.

### Why this matters
These tools help our app support full CRUD:
Create, Read, Update, Delete.