# 1 Crore Properties

A modern real estate web platform built to provide a professional and user-friendly property browsing experience.

## Overview

**1 Crore Properties** is a real estate web application developed using React.js and Vite. The project focuses on a clean user interface, responsive layouts, and an organized frontend architecture.

## Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Routing:** React Router
- **Styling:** CSS / project styling libraries
- **Package Manager:** npm
- **Version Control:** Git & GitHub

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shalvi1111/1-crore-properties.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 1-crore-properties
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build |

## Production Build

To generate an optimized production build:

```bash
npm run build
```

The production-ready files are generated inside the `dist` directory.

## Deployment

The project can be deployed as a static site using platforms such as **Render**.

Recommended Render configuration:

- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

For React Router applications, configure a rewrite rule:

- Source: `/*`
- Destination: `/index.html`
- Action: Rewrite

## Repository

GitHub: https://github.com/shalvi1111/1-crore-properties

---

Developed with React.js and Vite.