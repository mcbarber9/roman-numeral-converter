# Roman Numeral Converter

A web service and UI application that converts integers into Roman numerals. Supports numbers from 1 to 3999 with error handling and responsive design.

## Features

- Converts integers (1–3999) into Roman numerals.
- Backend service built with Node.js.
- Frontend UI built with React and React Spectrum.

---

### Set up

Use required version of Node:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

Run locally (http://localhost:3000)

```sh
npm start
```

### Backend

The backend API is built with Node.js and Express. It processes an integer input, validates it, and returns the corresponding Roman numeral.

### Frontend

The frontend is built with React and uses Adobe Spectrum for styling. It communicates with Roman Numeral Converter API to fetch conversions and displays the result

### Error Handling

Ensures input is a valid integer within ranger. Error is clear on the front end when criteria is not met.

### Testing

Unit tests validate the Roman numeral conversion and API routes.

### How to Run Tests

1. Run backend tests:

```sh
npm test -- --backend
```

2. Run frontend tests:

```sh
npm test -- --frontend
```

### Reference
This project references the Roman numeral system as described on [Wikipedia](https://en.wikipedia.org/wiki/Roman_numerals).

### Developer
mckell barber (mckell.barber@gmail.com)

