# Contact Management

A modern, responsive full-stack application for managing contacts effectively. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## Live Demo

You can try out the application at [Contact Management](https://contact-management-two-dusky.vercel.app).

## Features

- **Add Contacts**: Create new contact entries with name, email, phone, and optional messages.
- **View Contacts**: View a list of all stored contacts in a responsive table.
- **Delete Contacts**: Remove contacts that are no longer needed.
- **Responsive Design**: Fully responsive interface that works on desktop and mobile.
- **Real-time Feedback**: Instant notifications for actions using `react-hot-toast`.
- **Dark Mode**: (If implemented in the future, currently prepped with Tailwind classes).

## Tech Stack

### Frontend

- **React** (v19+): UI Library
- **Vite**: Build tool and development server
- **TypeScript**: Static typing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL Database (using Mongoose ODM)
- **tsx**: TypeScript execution for Node.js (handles ESM and TypeScript)

Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/JeetDas5/contact-management.git
    cd collEdge-connect
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory with the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    VITE_BACKEND_PORT=5000
    VITE_FRONTEND_PORT=5173
    VITE_BACKEND_URL=http://localhost:5000
    ```

## Running the Application

### Development Mode

To run both the frontend and backend in development mode (you may need two terminals):

1.  **Start the Backend:**

    ```bash
    npm run server
    # Runs the server with tsx watch for auto-reload
    ```

    The server will start on `http://localhost:5000`.

2.  **Start the Frontend:**
    ```bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

### Production Mode

To run the application in a production-like environment (specifically the backend):

```bash
npm start
# Runs the server using tsx
```

## Deployment (Render and Vercel)

This application is configured to run on Render (or similar PaaS providers).

1.  **Build Command**: `npm install && npm run build` (if deploying frontend separately) or just `npm install` for the backend.
2.  **Start Command**: `npm start`
    - _Note_: Ensure your Render "Start Command" is set to `npm start` to avoid file extension errors.

## Contributing

Contributions, issues, and feature requests are welcome!

Built with ❤️ by Jeet Das
