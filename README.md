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

## REST Patterns Used

We are following two important backend patterns.

---

### 1️⃣ CRUD – Data Operations Model

CRUD describes what we do to data.

C = Create (add new data)  
R = Read (view data)  
U = Update (edit data)  
D = Delete (remove data)

Best used when:
- Thinking about database operations
- Talking about backend logic
- Explaining what your app can do with data

CRUD focuses on data behavior.

---

### 2️⃣ I.N.D.U.C.E.S – RESTful Route Pattern

I.N.D.U.C.E.S describes how routes are structured in Express.

I = Index (GET /movies)  
N = New (GET /movies/new)  
D = Delete (DELETE /movies/:id)  
U = Update (PUT /movies/:id)  
C = Create (POST /movies)  
E = Edit (GET /movies/:id/edit)  
S = Show (GET /movies/:id)

Best used when:
- Designing Express routes
- Structuring URLs
- Following RESTful architecture
- Organizing controllers

I.N.D.U.C.E.S focuses on route structure.

---

### When to Use Which?

Use CRUD when thinking about:
→ What action happens to the database.

Use I.N.D.U.C.E.S when thinking about:
→ What URL and HTTP method should be used.

They describe the same actions,
but from two different perspectives:
Data view (CRUD)
Route view (I.N.D.U.C.E.S)



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

## Step Log – New Route

**What we did:** Added `GET /movies/new` and created `new.ejs`.  
**Why:** This shows the form page so users can type a new movie.

## Step Log – Create Route

**What we did:** Added `POST /movies` to save a movie from the form.  
**Why:** This completes the “Create” part of CRUD.


