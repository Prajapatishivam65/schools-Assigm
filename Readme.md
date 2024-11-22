# School Management API 🏫

A Node.js-based RESTful API service for managing school information and finding nearby schools based on geographical location.

## 🚀 Features

- Add new schools with location data
- Find schools sorted by proximity to a given location
- Data validation and error handling
- MySQL database integration
- Geographic distance calculation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
PORT=3306
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management

```

## 🌐 API Endpoints

### Add School

- **URL**: `/routes/addSchool`
- **Method**: `POST`
- **Request Body**:

```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

- **Success Response**:

```json
{
  "status": "success",
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

### List Schools

- **URL**: `/routes/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude (required)
  - `longitude`: User's longitude (required)
- **Success Response**:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "distance": 1.2
    }
  ]
}
```

## 🧪 Testing

1. Import the Postman collection from `postman/School_Management_API.postman_collection.json`
2. Update the environment variables in Postman if needed
3. Run the requests to test the APIs

## 🔑 Environment Variables

| Variable    | Description       | Default                   |
| ----------- | ----------------- | ------------------------- |
| PORT        | Server port       | 3000                      |
| DB_HOST     | Database host     | sql12.freesqldatabase.com |
| DB_USER     | Database username | -                         |
| DB_PASSWORD | Database password | -                         |
| DB_NAME     | Database name     | schools                   |

## 🛡️ Data Validation

The API implements the following validations:

- ID Must be a primary key
- School name must be between 3 and 255 characters
- Address must not be empty
- Latitude must be between -90 and 90
- Longitude must be between -180 and 180

## 📝 Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error

## 🚀 Deployment

1. Ensure all environment variables are properly set
2. Build the application:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```
