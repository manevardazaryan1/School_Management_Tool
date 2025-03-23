<h1><a id='top'>School Management Tool</a></h1>

![mava(Trello clone) collage](src/images/README/collage.webp "School Management Tool")

This project is a React-based School Management System built using Redux for state management, Material-UI for UI components, and Apollo Client for GraphQL data fetching. It provides functionalities for managing pupils, teachers, subjects, and user authentication.

**Backend Note:** This project utilizes a Node.js backend with GraphQL for its API layer. Prisma ORM is employed for efficient database interactions, providing a type-safe and developer-friendly approach to data management.

## Features

* **User Authentication:**
    * Login and registration functionalities with role-based access control (Pupil, Teacher, Admin).
    * Secure password handling and validation.
* **Pupil Management:**
    * View, filter, update, and delete pupil records.
    * Manage pupil grades and preferences.
    * Pagination for large pupil lists.
* **Teacher Management:**
    * View, update, and delete teacher records.
    * Assign teachers to subjects.
* **Subject Management:**
    * View, add, update, and delete subject records.
    * Assign teachers to subjects.
* **Admin Dashboard:**
    * Access to all management functionalities.
    * Protected routes for admin-only access.
* **GraphQL Data Fetching:**
    * Efficient data fetching using Apollo Client.
* **State Management:**
    * Redux for centralized state management.
* **UI Components:**
    * Material-UI for a consistent and responsive user interface.
* **Filtering:**
    * Modal based filtering for pupils.

* server/ : Contains the Node.js/GraphQL server.
    * src/ : Server source code.
        * index.js : Entry point of the server.
        * schema/ : GraphQL schema and resolvers.
            * schema.js : GraphQL schema definition (SDL or code-first).
            * resolvers.js : GraphQL resolvers implementing schema logic.
        * prisma/ : Prisma ORM related files.
            * schema.prisma : Prisma schema defining data models and database connection.
            * migrations/ : Database migration files.
        * models/ : Database models (if not using Prisma, can be Mongoose models, etc.).
        * config/ : Server configuration files.
    * package.json : Server dependencies and scripts.
    * package-lock.json : Server dependency lockfile.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **Redux:** State management library.
* **Redux Toolkit:** For simplified Redux development.
* **Material-UI (@mui/material):** React UI framework.
* **Apollo Client:** GraphQL client for React.
* **React Router:** For routing and navigation.
* **Yup:** For form validation.
* **Web-vitals:** For performance measurement.
* **Node.js/GraphQL Server:** Backend server for data management and API.
* **Express.js (or similar):** Web framework for Node.js.
* **Apollo Server:** GraphQL server library.
* **Prisma:** ORM (Object-Relational Mapper) for database interaction.
* **GraphQL:** Query language for APIs.

## Project Structure

* `public/`: Contains static assets.
* `src/`: Contains the application's source code.
    * `apollo/`: Apollo Client configuration.
    * `components/`: Reusable React components.
    * `layouts/`: Layout components (e.g., Navbar).
    * `middlewares/`: Middleware components (e.g., AdminRoute).
    * `pages/`: Application pages.
    * `redux/`: Redux store and slices.
    * `schema/`: Material UI theme files.
    * `utils/`: Utility functions and validation schemas.
    * `App.js`: Main application component.
    * `index.js`: Entry point of the application.
    * `index.css`: Global styles.
    * `reportWebVitals.js`: Web vitals reporting.
    * `setupTests.js`: Jest setup.
* `package.json`: Project dependencies and scripts.
* `README.md`: Project documentation.

## Getting Started (Frontend)

These steps will guide you through running the frontend part of the School Management System:

1.  **Clone the Repository:**

    First, you'll need to download the project files onto your computer. If you have Git installed, you can do this using the following command in your terminal or command prompt.
    ```bash
    git clone [https://github.com/manevardazaryan1/School_Management_Tool]
    ```


2.  **Navigate to the Project Directory:**

    Use the `cd` command to change your current directory to the project folder.

    ```bash
    cd School_Management_Tool
    ```

3.  **Install Dependencies:**

    The project uses Node.js and npm (Node Package Manager) or yarn to manage its dependencies. You'll need to install these dependencies before running the application. Use the following command:

    **Using npm:**

    ```bash
    npm install
    ```

    **Using yarn (if you have yarn installed):**

    ```bash
    yarn install
    ```

    This command will read the `package.json` file in your project and download all the necessary libraries and tools into a `node_modules` folder.

4.  **Start the Development Server:**

    Once the dependencies are installed, you can start the development server. This will run the React application in your browser and automatically reload the page when you make changes to the code. Use the following command:

    **Using npm:**

    ```bash
    npm start
    ```

    **Using yarn:**

    ```bash
    yarn start
    ```

    This will typically open a new tab in your default web browser and load the application. If it doesn't open automatically, you can manually open your browser and navigate to `http://localhost:3000`.

[Tap to Top ⬆](#top)