# HLS Transcoder Project Setup Guide

This document outlines the steps required to set up and run the HLS Transcoder project locally.

## Project Architecture

The HLS Transcoder is responsible for converting video files into HLS streams.

## Prerequisites

* **Git:** Ensure Git is installed on your system.
* **Bun:** Bun is required for dependency management and running scripts.
* **FFmpeg:** FFmpeg must be installed and accessible in your system's PATH.
* **PostgreSQL:** A running instance of PostgreSQL is required.
* **Docker (Optional):** Docker is required if you intend to build the Docker image.

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/sidharthtripathi/hls-yt
    ```

2.  **Navigate to the Project Directory:**

    ```bash
    cd hls-yt
    ```

3.  **Install Dependencies:**

    ```bash
    bun install
    ```

4.  **Configure Environment Variables:**

    * Copy the `.env.example` file to `.env`.
    * Modify the `.env` file with the appropriate values for your environment, including database connection details.

5.  **Initialize the PostgreSQL Database:**

    * Ensure your PostgreSQL database is running.
    * Run the database initialization script:

        ```bash
        bun run init:db
        ```

6.  **Start the Development Server:**

    ```bash
    bun run dev
    ```

    This command starts the HLS Transcoder in development mode.

7.  **Build Docker Image (Optional):**

    * If you intend to use Docker Compose or deploy the transcoder in a Docker container, you can build the Docker image using Bun:

        ```bash
        bun run build:docker
        ```