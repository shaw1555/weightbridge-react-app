# Weightbridge React App

## Overview

This project is a **Weightbridge management application** built using **React, TypeScript, and Vite**.
The system supports weightbridge operations such as **truck weigh-in, weigh-out, and transaction management**.

It also provides configuration for **customers, products, and tariffs**, allowing the system to **automatically calculate transaction costs** based on the configured tariff rules.

The application communicates with backend APIs to manage weighbridge transactions and operational data.

---

## Technologies

* React
* TypeScript
* Vite
* REST API Integration
* CSS

---

## Project Structure

```
src
 ├── assets        # Images and static resources
 ├── components    # Reusable UI components
 ├── config        # Application configuration
 ├── constants     # Constant values 
 ├── pages         # Application pages
 ├── services      # API service calls
 ├── utils         # Helper functions
 ├── App.tsx       # Main application component
 └── main.tsx      # Application entry point
```

---

## Features

* Truck **weigh-in / weigh-out** transaction management
* **Gate in / gate out** operations
* **Customer setup and management**
* **Product setup and configuration**
* **Tariff setup** for weight-based charges
* **Automatic cost calculation** during weight transactions based on configured tariffs
* **Weight transaction recording**
* **Report generation and download**
* Integration with backend APIs

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/weightbridge-react-app.git
```

### 2. Install dependencies

```
npm install
```

### 3. Run the application

```
npm run dev
```

The application will start using the **Vite development server**.

---

## Purpose

This project was developed as part of a **logistics / warehouse operational system** to support weightbridge operations and automate tariff-based cost calculations.

---

## Author

Aung Soe Moe
Senior Backend Engineer | .NET | React | SQL Server
