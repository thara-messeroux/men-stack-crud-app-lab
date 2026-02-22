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

## Step Log – EJS + Movie Model

**What we did:** Enabled EJS and imported the Movie model into `server.js`.  
**Why:** So our routes can render pages and interact with the database.

## Index Route – Show All Movies

We created our first real CRUD route:

GET /movies

### What it does:
- Finds all movies in the database
- Sends them to an EJS page
- Displays them in a list

### How it works:
1. `Movie.find({})` gets all movies from MongoDB.
2. `res.render("movies/index", { movies })` sends them to the view.
3. The EJS page loops through the movies and prints each title.

This is the "Index" part of REST (Read All).