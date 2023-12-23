# Mini Trello/Kanban Interface

## Overview

This repository contains the implementation of a Mini Trello/Kanban interface with drag and drop functionality for cards between columns. The project is built with React, Tailwind CSS, Apollo Client GraphQL on the frontend, and Python with Graphene on the backend. The database used is DynamoDB Local.

## Features

- Drag & Drop: Easily move cards between columns.
- Add / Remove / Update Card: Perform CRUD operations on cards.
- Custom Ordering: Choose to order cards by date of creation or custom criteria.
- Docker and AWS: Bonus feature - the application can be packaged and run in a Docker container and/or on AWS.

## Implementation Details

- **Frontend:**
  - React / Hooks
  - Tailwind CSS (or equivalent)
  - Apollo Client GraphQL (no Redux)
- **Backend:**
  - Node
- **Database:**
  - Json Object

## How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/mini-trello-kanban.git
