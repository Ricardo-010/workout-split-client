# Workout Tracker - React + Vite App

A workout tracker app that allows you to create your workout split and store it all in one place. The app enables users to register, log in, create, delete, and manage workouts and their corresponding exercises.

The app is also built to communicate with a backend server via a REST API. The server repo can be found here: https://github.com/UniSunshineCoast/csc301-24-assignment-3-secondary-Ricardo-USC


## Table of Contents

- [App Setup](#app-setup)
- [Project Structure](#project-structure)
- [Core Functionality](#core-functionality)
- [App Testing](#app-testing)
- [Github Actions](#github-actions)
- [Approaches and Reasoning](#approaches-and-reasoning)

## App Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/UniSunshineCoast/csc301-24-assignment-3-primary-Ricardo-USC.git
   cd csc301-24-assignment-3-primary-Ricardo-USC
   ```

2. **Install the project dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev enviroment:**
   ```bash
   # note: ensure the server is running first
   npm run dev
   ```
### Demo Account
I have also setup a demo account. It is created when the database is setup on the server. This can give you a sense of how the app is intended to work and look with actual data.

* E-mail: demo@user.com

* Password: 123

## Project Structure

```plaintext
csc301-24-assignment-3-primary-Ricardo-USC/
├── .github/
│   └── workflows/          # Github action workflows
├── cypress/
│   └── e2e/                # The end-to-end tests for the app
├── src
│   ├── assets              # Images
│   ├── modules             # Reusable components, hooks, services and state
│   ├── pages               # The page components
│   ├── index.css           # Global styles
│   ├── main.jsx            # The apps entry point and routing
│   └── privateRoutes.jsx   # Private route component
├── cypress.config.js       # Cypress config
├── index.html              # Primary HTML template
├── package.json            # The projects dependencies
├── README.md               # The project documentation
└── vite.config.js          # Vite config
```


## Core Functionality

* Authentication (Registration, Login/Logout).

* Tracking a users current workout split:
   * Creating, editing and deleting workouts.
   * Creating, editing and deleting exercises within workouts.


## App Testing

The app features end-to-end testing using Cypress, focusing on the core functionality of the app.

1. **Authentication Tests:** These tests cover registering a user, logging in, logging out, and deleting a user. These tests are to ensure users can access and use the app without issues.

2. **Functionality Tests:** These tests cover the primary purpose of the app - creating a workout split. They test the ability to create, edit, and delete workouts, and then create, edit, and delete exercises corresponding to a workout.

### Running Tests Locally

**Run Cypress tests (end-end):**
1. This will open the Cypress Test Runner, where you can run the tests via the Cypress Launchpad.
    ```bash
    npx cypress open
    ```
2. This will run the tests in the terminal.
    ```bash
    npx cypress run
    ```

> Note: These tests also run as part of the CI.

## Github Actions

1. Build Static files

   The app features a GitHub workflow that triggers when there is a commit to the main branch of the GitHub repository. This workflow builds the project and stores the build in the dist folder. This helps ensure that every change is automatically built. The workflow includes the following steps:

   1. Checkout: The code is checked out from the repository.
   2. Install Dependencies: All necessary dependencies are installed using npm install.
   3. Build: The project is built using npm run build, and the output is stored in the dist folder.

2. End-to-End Testing with Cypress

   The app also features a GitHub workflow that runs the cypress end-to-end tests to ensure the app work as expect with code changes. This job is triggered on commits to the main branch and pull requests to the main branch. The workflow includes the following steps:

   1. Start Services: Creates a PostgreSQL service container. The workflow waits for the PostgreSQL service to be ready.
   2. Checkout Frontend and Backend Code: The code for both frontend and backend is checked out from their respective repositories.
   3. Set Up Node.js: Node.js is set up for the server.
   4. Install Dependencies: The frontend and backend dependencies are installed using npm install.
   5. Start Server: The server is started. The workflow waits until the server is running.
   6. Start Frontend: The frontend is started. The workflow waits until the frontend is running.
   7. Run Cypress Tests: Cypress end-to-end tests are executed to verify that the app runs as expected.


## Approaches and Reasoning

### React + Vite
I decided to go with React because it's a framework I have not used before, and I wanted to gain more experience with different frameworks, plus react is one of the most used frameworks in the industry which means it would be great to learn. 

It was also relatively easy to get started with and develop the web app. I also used Vite for bootstrapping the project because of it offers a fast development server and a optimized build process.

### Material-UI
I chose to use Material-UI, it's an open-source react component library that uses Google's Material Design. MUI offers a wide range of pretty intuitive prebuilt components that look great out of the box. I can also customise the components to meet the project's needs using the `sx` prop which definitlye made it an easier choise of using.

Finally, the main reason for using a component library is so that I could focus on the core functionality of the app while still providing a clean and sleek UI for users.

### axios
I used Axios for making HTTP requests to the back-end API. Axios provides a straightforward way of making HTTP requests, which made it an easy choice to use.

### jwt-decode
This library is used to decode the authentication tokens (JSON Web Tokens) sent from the API when a user registers or logs in. The tokens store the user's details and validates/authenticates. All the API end-points need valid auth tokens to be used.

### react-router-dom
React router is the go to for handling routing within the app.

### Authentication 
The main reason I wanted to incorporate authentication into the app was to allow multiple users to use the app and to learn how to handle user authentication. Most of the authentication logic is handled by the API, so more details can be found in its repository.

When a user registers or logs in, they receive an authentication token if the response is successful. The token is then stored in local storage, and the state is updated with the token. The authentication is managed using `Context`, ensuring that the entire application is aware of the authentication state. When the token expires and the server responds with a 401 HTTP status code indicating the user is unauthenticated, the context is updated, and the user is subsequently logged out.


### Creating, Editing, Deleting Workouts
When a user registers for the first time, the app will look pretty barebones because they have no workouts or exercises.

A user can create a workout by clicking the `PLUS` icon next to the "Current Workout Split" heading. This will prompt the user to enter a workout name. Once they add a workout, a PLUS icon will appear next to the "Exercises" heading. Clicking this icon will prompt the user to create an exercise by supplying an exercise name and the number of sets per workout.

After creating a workout or exercise, a `PENCIL` icon can be seen at the end of the workout or exercise. This allows the user to edit the workouts and exercises.

Finally, if the user wants to get rid of exercises for a workout to add new ones, they can edit the workout and then click delete. The same can be done for a workout.

This gives the user the basics of keeping track of their current workout split and the ability to change and even create a new workout split by editing or deleting their old exercises and workouts.

If I develop the app further, I would love to add individual sets with the number of reps per set and give the user the ability to log a workout so they can view how many times they have completed a workout.


### Settings

The app has a settings page, which can be accessed by clicking the `PERSON` icon on the top right of the Home page. This will display a menu list with options for Logout and Settings. The settings page allows the user to update their password, log out, or delete their account if they feel the app doesn't meet their needs. This page provides essential account management options to ensure users have control over their personal information and account status.


### Managing state
Probably the most important part of the app is the app's state management. React has a variety of ways to manage state, each with its own pros and cons, and some are better suited for certain situations than others. Figuring out the best way to manage the state in different scenarios was one of the trickiest parts of making the app. I would be lying if I said this didn’t take trial and error and multiple cycles of refactoring to get right and there is probably still much better ways of managing state in certain situations in the app.

At first, I started out using the basic useState to store basic variables. However, this got quite complex when I was trying to manage the state of workouts and exercises, as these had CRUD operations. This is where I discovered useReducer, which is great for managing complex state. With useReducer, you can pass the data that needs updating and the action that needs to be applied to the state, which then handles updating the state in the reducer.

The next challenge I faced was the authentication state. The auth state essentially just handled the user's token, so it wasn’t that complicated. However, I was managing it on every page that needed to ensure the token was valid which I could tell was just counter productive because there was a lot of repeated code. This is when I discovered Context, which allowed me to pass the context of the auth state to all the child components that need to be aware of the authentication status. This cleaned the code up quite a bit because it was all in one place now.

Overall, state management required careful consideration and multiple iterations to get right. Each part of the app, from handling basic state with useState, to managing complex CRUD operations with useReducer, to providing global state with Context, played a crucial role in making the app functional and efficient.