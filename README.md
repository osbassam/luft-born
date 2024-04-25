# Full-Stack Vue-Laravel Application

This repository contains a full-stack application featuring a Vue 3 front-end with Vite and a Laravel 11 back-end. It is structured into two main directories: `front-end` for the Vue application and `back-end` for the Laravel API.

## Technologies Used

- **Front-End**: Vue 3, Vite
- **Back-End**: Laravel 11
- **Database**: MySQL (Adjust based on your actual database choice)

## Features

- Modern SPA (Single Page Application) interface using Vue 3
- Robust back-end API with Laravel 11
- Responsive design and user-friendly interface

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- PHP 8.1 or higher
- Composer: Dependency Manager for PHP
- Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine
- Yarn or npm: Package managers for JavaScript

### Installation

#### Setting Up the Back-End

1. **Navigate to the Back-End Directory**:
    ```bash
    cd back-end
    ```
2. **Install PHP Dependencies**:
    ```bash
    composer install
    ```
3. **Set Up Environment Variables**:
    Copy the example environment file and make necessary adjustments as per your development environment:
    ```bash
    cp .env.example .env
    ```
4. **Generate App Key**:
    ```bash
    php artisan key:generate
    ```
5. **Run Migrations** (ensure your database connection settings are correct in `.env`):
    ```bash
    php artisan migrate
    ```
6. **Start the Development Server**:
    ```bash
    php artisan serve
    ```
    The server will start on `http://localhost:8000`.

#### Setting Up the Front-End

1. **Navigate to the Front-End Directory**:
    ```bash
    cd ../front-end
    ```
2. **Install JavaScript Dependencies**:
    ```bash
    yarn install
    ```
    or
    ```bash
    npm install
    ```
3. **Start the Vite Server**:
    ```bash
    yarn dev
    ```
    or
    ```bash
    npm run dev
    ```
