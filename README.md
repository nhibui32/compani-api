```md
# Company API

A Node.js + Express REST API for managing departments, employees, salaries, products, sales, and stock using a MySQL database.

## 📁 Project Structure

```

company-api/
│
├── routes/              # All API route files (departments, employees, etc.)
│   └── departments.js
├── db.js                # MySQL connection pool
├── server.js            # Main server entry point
├── .env                 # Environment variables
└── README.md

````

## 🚀 Features

- Full CRUD API for `departments`
- Easy to expand with other tables (`employees`, `products`, etc.)
- RESTful route structure
- Connects to a MySQL database via `mysql2`
- Supports Postman testing

## 🛠 Tech Stack

- Node.js
- Express
- MySQL / MySQL Workbench
- mysql2
- dotenv
- Postman (for API testing)

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/company-api.git
   cd company-api
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your `.env` file**
   Create a `.env` file in the root:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=companyAPI
   PORT=3000
   ```

4. **Start the server**

   ```bash
   node server.js
   ```

## 🧪 API Endpoints (Departments)

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/departments`     | Get all departments       |
| GET    | `/api/departments/:id` | Get a department by ID    |
| POST   | `/api/departments`     | Create a new department   |
| PUT    | `/api/departments/:id` | Update a department by ID |
| DELETE | `/api/departments/:id` | Delete a department by ID |

> Use Postman or any HTTP client to test these routes.

## ✅ Sample Request (POST)

```
POST /api/departments
Content-Type: application/json

{
  "id": 1,
  "name": "Finance",
  "location": "New York"
}
```

## 🧠 Notes

* Make sure your MySQL server is running and the `companyAPI` database is created with the correct tables.
* You can expand this API by adding routes for `employees`, `products`, `salaries`, etc.

## 📄 License

MIT License

## ✨ Author

* [Ngoc Anh Nhi Bui](https://github.com/nhibui32)

```
```
