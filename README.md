# AI Integrated Itinerary System

## Setup and Session Start:
Install PostgreSQL, Ruby, Rails, Fast API: 

Install PostgreSQL 16.

Install Ruby version 3.3.0.

Install Rails version 7.1.3.2.

Install FastAPI.

Run Database Server (PostgreSQL):

Start the PostgreSQL service using Brew: brew service start postgresql@16.

### Create Database:

Create a new database named Itinerary_database.

### Install Backend Dependencies:

Install the dependencies mentioned in the Gemfile of the backend application.

### Database Migration:

Open the backend terminal.

Run the database migration using the command: rails db:migrate.

### Run Rails Server:

Start the Rails server by running the command: rails server

## Run Frontend:

Navigate to the frontend directory.

Open the index.html file in a web browser to start the frontend application.

These steps outline the setup process and starting the session for your application. Ensure that each step is executed successfully to run both the backend and frontend components of your application.

## Frontend start with VSCode
For the Implementation and execution of the web application we have used ‘Live Server’ that launches a local development server with a live reload feature for static and dynamic pages.

The Live Server serves the current working directory and any subdirectories within it. It also monitors the files for any modifications.

After successfully starting the Live Server the Trip Planner Web app will open where user will go through the following steps:

An initial popup will prompt the user to select the city and dates of travel
Click on the “Start exploring” button to load the map and list of places in the destination city and initiate the search.

![alt text](https://github.com/DhyaanNayak/Itinerary_system/blob/main/images/1.png?raw=true)

The app will load the map of the destination city and display the popular attractions, museums, hotels, shops, restaurants, cafes and bars.
The page contains buckets corresponding to the dates chosen to add the places and plan the itinerary.

![alt text](https://github.com/DhyaanNayak/Itinerary_system/blob/main/images/2.png?raw=true)

There are filter buttons (i.e. Attractions, Museum, Hotels, Shop, food, Cafe and Drinks) on the top of the screen that can be clicked to filter the recommendations to the selected categories. 
The search input field can be used to type the name of a specific place the user is looking for. The list will update to show matching results.

The user can also ask the AI assistant to filter out locations based on categories. It uses Speech-to-Text to detect the category keywords to apply the relevant filters.

![alt text](https://github.com/DhyaanNayak/Itinerary_system/blob/main/images/5.png?raw=true)

The chatbot can also display a tutorial or a list of suggestions based on a user’s prompt

To add a place in the “Place Bucket”, the user can click on the place and click on the heart button below it to add the place in the Bucket. On selecting a place, the system will show details such as address, contact and reviews.

Once all the places of interest have been added to the bucket, further organisation can be done by dragging the places to the buckets of particular dates. This will help make a detailed itinerary of each day.
When a particular bucket is clicked, A map route will be displayed, connecting all the places in the bucket optimised by distance.

![alt text](https://github.com/DhyaanNayak/Itinerary_system/blob/main/images/4.png?raw=true)

The save icon below the place buckets can be clicked once the itinerary is finalised to save the itineraries for future reference.

The user can click on “Existing Itinerary” to view the previous saved itineraries. These itineraries can be viewed along with the planned route for each day of a particular itinerary 

If the system detects user inactivity,  a popup will be displayed to offer assistance. It offers the options to either view a tutorial or speak with an AI assistant for further help.

