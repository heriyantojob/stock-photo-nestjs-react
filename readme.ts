## Stock Photo Website with Next.js Frontend, React Admin Panel, and Nest.js API

This repository contains a full-stack stock photo website project, featuring a frontend built with Next.js, an admin panel using React, and a backend API developed with Nest.js. This project allows users to browse and search for stock photos, while administrators can manage the photo collection through the admin panel.

### Project Structure

The project is structured into three main parts: frontend, admin panel, and backend API.

- **Frontend (Next.js)**: The user-facing stock photo website.
- **Admin Panel (React)**: An interface for administrators to manage the photo collection.
- **Backend API (Nest.js)**: Provides endpoints for fetching and managing photos.

### Frontend (Next.js)

The frontend is built using Next.js, a popular React framework for server-rendered applications.

#### Features

- Browse and search for stock photos.
- View photo details and download options.

#### Setup

1. Navigate to the `frontend` directory: `cd next-js-front-end`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### Admin Panel (React Vite)

The admin panel allows administrators to manage the stock photo collection.

#### Features

- Log in to the admin panel.
- Upload new photos.
- Edit photo details.
- Delete photos from the collection.

#### Setup

1. Navigate to the `admin-panel` directory: `cd admin-panel-reactvite`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### Backend API (Nest.js)

The backend API is built using Nest.js, a powerful Node.js framework.

#### Features

- Retrieve a list of photos.
- Get details of a specific photo.
- Add new photos to the collection.
- Update photo information.
- Delete photos from the collection.

#### Setup

1. Navigate to the `backend-api` directory: `cd admin-panel-reactvite`.
2. Install dependencies: `npm install`.
3. Configure the database connection in `src/config/database.config.ts`.
4. Start the server: `npm run start:dev`.

### Database

The project uses a database to store photo information. Make sure to configure the database connection in the backend API's configuration file.

### Deployment

For deployment, you can follow the general guidelines for deploying Next.js and React applications. Additionally, deploy the Nest.js API following its deployment documentation.

### Contribute

Contributions to the project are welcome! Feel free to open issues and submit pull requests for any improvements or bug fixes.

### License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README according to your project's specific details and requirements. Make sure to provide proper instructions for setting up and running each part of the project, as well as any additional information that might be useful for users and contributors.