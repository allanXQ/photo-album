# Photo Album Viewer

## Overview

Photo Album Viewer is a React-based web application designed to provide users with a seamless experience in managing and viewing their photo albums. It utilizes Google OAuth for secure user authentication, interacts with JSONPlaceholder for fetching placeholder data, and leverages the power of React Router for smooth navigation between different components of the application.

## Features

- **Google OAuth Integration**: Secure authentication allowing users to sign in with their Google accounts.
- **Dynamic Album and Photo Management**: Users can view albums and the photos within them, fetched dynamically from JSONPlaceholder.
- **Responsive UI**: Built with Material-UI to ensure a responsive and accessible user interface across various devices and screen sizes.
- **Client-Side Routing**: Utilizes React Router for efficient client-side routing.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern frontend build tool that significantly improves the development experience.
- **Material-UI**: A popular React UI framework offering ready-to-use components.
- **React Router**: A standard library for routing in React.
- **Axios**: A promise-based HTTP client for making requests to external APIs.
- **Vercel**: Deployment platform used for hosting the application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following tools installed on your system:

- Node.js
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/allanXQ/photo-album.git
   cd photo-album
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Access the application at [http://localhost:5173](http://localhost:5173).

### Testing

1. **Run the tests:**
   ```bash
   npm run test
   ```

## Deployment

This application is deployed on Vercel. Follow these steps to deploy your own instance:

1. **Set up your project on Vercel:**

   - Fork or clone this repository.
   - Create a new project on Vercel and link it to your repository.
   - Set configuration as per the `vercel.json` in your project to handle SPA routing:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/" }]
     }
     ```

2. **Deploy through Vercel's dashboard:**
   - Push changes to your repository.
   - Vercel automatically deploys the changes.

## License

Distributed under the MIT License.
