# Dev.to Clone

This project is a clone of [Dev.to](https://dev.to/), an open-source platform for developers to share articles, discuss topics, and build a community. The project consists of two main parts:

- **Frontend**: The user-facing interface of the platform, built with [Next.js](https://nextjs.org/).
- **Backend**: The server-side logic, written in TypeScript, including APIs, database interactions, and business logic. Jest is used for testing the backend. The backend uses OAuth for authentication and SQLite as the database for storing data.

Deployment is handled using Docker, and the application is deployed to [Vercel](https://vercel.com/). Continuous Integration and Continuous Deployment (CI/CD) pipelines are implemented using GitHub Actions to automate the deployment process to Vercel.

Each part is a standalone application and runs independently. Below are the setup and usage instructions for both the frontend and backend.

---

## Table of Contents
1. [Frontend Setup](#frontend-setup)
2. [Backend Setup](#backend-setup)
3. [Running the Applications](#running-the-applications)
4. [Deployment](#deployment)
5. [Directory Structure](#directory-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## Frontend Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/dev-to-clone.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd dev-to-clone/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
5. Open your browser and go to `http://localhost:3000` to see the application in action.

### Build for Production
To build the frontend for production, run:
```bash
npm run build
```
or
```bash
yarn build
```
The production-ready files will be in the `.next` directory.

---

## Backend Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/)
- [SQLite](https://www.sqlite.org/)

### Steps
1. Navigate to the backend directory:
   ```bash
   cd dev-to-clone/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your database credentials, OAuth configurations, and other settings.

4. Initialize the database:
   ```bash
   npm run migrate
   ```
5. Run the tests:
   ```bash
   npm run test
   ```
6. Start the development server:
   ```bash
   npm run start
   ```
7. The backend server will run on `http://localhost:4000` by default.

---

## Running the Applications
To run the full application:
1. Start the backend server following the instructions above.
2. Start the frontend server following the instructions above.
3. Ensure the frontend is configured to communicate with the backend API (update the API base URL in the frontend `.env` or configuration file if necessary).
4. Postman testing in [Dev-to Clone](https://www.postman.com/material-participant-37821280/workspace/dev-to-clone)
---

## Deployment

### Prerequisites
- [Docker](https://www.docker.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (optional for local deployments)

### Steps
1. Build Docker images for the frontend and backend:
   ```bash
   docker build -t frontend ./frontend
   docker build -t backend ./backend
   ```
2. Push the Docker images to your container registry (e.g., Docker Hub or a private registry).
3. Configure Vercel to pull and deploy the Docker images.
4. CI/CD pipelines are set up using GitHub Actions. Every push to the main branch triggers automated tests and deploys the latest version to Vercel.

For more details on setting up the CI/CD workflow, check the `.github/workflows` directory in the repository.

---

## Directory Structure
```
/dev-to-clone
|-- frontend/         # Frontend application (Next.js)
|-- backend/          # Backend application (TypeScript with OAuth and SQLite)
|-- Dockerfile/       # Store Dockerfiles for backend/frontend deployment
|-- .github/          # GitHub Actions CI/CD workflows
|-- README.md         # Project documentation
```

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

