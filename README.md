# Parcel order management

A responsive e-commerce order dashboard built with React and Vite. Browse current orders, delivered order history, and cancelled orders from the Orders navigation.

## Getting started

```sh
npm install
npm run dev
```

## Order routes

- `/orders/current` — processing and shipped orders
- `/orders/history` — delivered orders
- `/orders/cancelled` — cancelled orders

The dashboard includes order search, CSV export, and a small create-order form. Data is held in memory and resets when the page is refreshed.

## Checks

```sh
npm run lint
npm run build
```
