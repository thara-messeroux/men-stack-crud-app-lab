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

# REST Patterns Used in This App

We use two important patterns:

1) CRUD → what happens to the data  
2) I.N.D.U.C.E.S → how our routes (URLs) are structured  

They describe the same actions, but from two different angles.

----------------------------------------------------

## 1️⃣ CRUD – Data Perspective

CRUD describes what we do to the database.

C = Create → Add new data  
R = Read → Look at data  
U = Update → Change existing data  
D = Delete → Remove data  

### Child Version

Create = Add something  
Read = Look at it
Update = Change it  
Delete = Remove it  

Example:
- Add a movie
- Look at movies
- Edit a movie
- Delete a movie

CRUD focuses on the DATA.

----------------------------------------------------

## 2️⃣ I.N.D.U.C.E.S – Route Structure Perspective

This is a memory trick for all the pages and actions our app needs.

I = Index (GET /movies)  
N = New (GET /movies/new)  
D = Delete (DELETE /movies/:id)  
U = Update (PUT /movies/:id)  
C = Create (POST /movies)  
E = Edit (GET /movies/:id/edit)  
S = Show (GET /movies/:id)

----------------------------------------------------

### Simple Version

Index = Show all movies  
Show = Show one movie  

New = Show form to add  
Create = Save new movie  

Edit = Show form to edit  
Update = Save the edits  

Delete = Remove it  

----------------------------------------------------

### Technical Version (Real World Meaning)

GET /movies  
→ Someone types this in the browser.  
→ The server responds with a page listing all movies.  

GET /movies/new  
→ The browser requests the page with the form.  
→ The server sends back the form page.  

POST /movies  
→ The form sends data to the server.  
→ The server saves it to MongoDB.  

DELETE /movies/:id  
→ The server removes one movie using its unique id.  

PUT /movies/:id  
→ The server updates one movie using its id.  

----------------------------------------------------

### What is ":id" ?

:id is a placeholder for a specific movie.

Example:

/movies/65f9a3bc1234

That long string is MongoDB’s unique ID for that movie.

It lets us target one exact item.

----------------------------------------------------

## Difference Between CRUD and I.N.D.U.C.E.S

CRUD = What action happens to the database.

I.N.D.U.C.E.S = What URL + HTTP method we use to perform that action.

CRUD is about data behavior.
I.N.D.U.C.E.S is about route design.

They are connected like this:

Create → POST  
Read → GET  
Update → PUT  
Delete → DELETE

Same actions. Different perspective.

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

## Step Log – Edit Route

**What we did:** Added GET /movies/:id/edit to show edit form.  
**Why:** This allows users to modify existing movie data.

## Update Route – Save Edited Movie

### Route
PUT  
http://localhost:3000/movies/:id

### What It Does
Updates an existing movie in MongoDB using its ID.

### How to Test
1. Open `/movies`
2. Open a movie
3. Go to `/movies/:id/edit`
4. Change title
5. Click Save
6. Confirm title updated

## Delete Route – Remove a Movie

### Route
DELETE  
http://localhost:3000/movies/:id

### What It Does
Deletes one movie from MongoDB using its ID.

### How to Test
1. Go to http://localhost:3000/movies
2. Click a movie title
3. Click "Delete Movie"
4. Confirm you return to /movies and the movie is gone

## Error Handling (Production-Safe Backend)

All async routes in this application are wrapped in try/catch blocks:

- INDEX – GET http://localhost:3000/movies  
- CREATE – POST http://localhost:3000/movies  
- SHOW – GET http://localhost:3000/movies/<movieId>  
- EDIT – GET http://localhost:3000/movies/<movieId>/edit  
- UPDATE – PUT http://localhost:3000/movies/<movieId>  
- DELETE – DELETE http://localhost:3000/movies/<movieId>  

If a MongoDB operation fails:
- The error is logged using console.error(error)
- The server responds safely with status 500 and displays "Server Error"

This ensures the application fails safely instead of crashing or hanging.

---

### How to Test (Normal Functionality)

1. Start the server:
   npm start

2. Visit:
   Home: http://localhost:3000/
   Movies Index: http://localhost:3000/movies
   New Movie Form: http://localhost:3000/movies/new

3. Click a movie to test:
   Show: http://localhost:3000/movies/<movieId>

4. Edit a movie:
   Edit: http://localhost:3000/movies/<movieId>/edit

5. Confirm:
   - Pages load correctly
   - No crashes
   - Data updates properly

---

### How to Force Test Error Handling (Optional)

1. Temporarily break a query in any async route.
   Example inside INDEX route:

   const movies = await Movie.find({ invalidField: { $badOperator: true } });

2. Restart server:
   npm start

3. Visit:
   http://localhost:3000/movies

4. Confirm:
   - Page displays "Server Error"
   - Server does NOT crash
   - Terminal logs the error

5. Restore original query:
   const movies = await Movie.find({});


## Authentication Structure Started

We began refactoring toward MVC by creating an auth controller.

Auth routes are now separated from server.js:

- controllers/auth.js handles:
  - GET /auth/sign-up
  - GET /auth/sign-in

This keeps server.js cleaner and prepares for scaling.

## Authentication (Sessions + Password Hashing)

### Password Security
- Uses bcrypt to hash passwords before storing in MongoDB
- Plain text passwords are never saved
- Salt rounds: 10

### Session Setup
- Installed express-session
- Added SESSION_SECRET in .env
- Enabled session middleware in server.js

### Sign Up Flow
1. Validate password match
2. Check username uniqueness
3. Hash password
4. Create user in database
5. Store user._id in req.session.user
6. Redirect to home page

### Session Verification
- Temporary debug route used to confirm session storage
- Confirmed req.session.user stores MongoDB ObjectId


