# Company Insights API

A RESTful backend API built with **Node.js, Express.js, and MySQL** for managing company data including departments, employees, salaries, products, sales, and inventory.

The API is deployed on **Railway** and connected to a cloud-hosted MySQL database on **Aiven**.

## 🚀 Live API

**Base URL:**

https://compani-api-production-b2e6.up.railway.app

Example:

```text
GET https://compani-api-production-b2e6.up.railway.app/api/employees
```

## ✨ Features

- RESTful API architecture
- Full CRUD operations
- Employee management
- Department management
- Salary management
- Product management
- Sales management
- Inventory/stock management
- Employee filtering by department
- MySQL connection pooling
- Environment variable configuration
- JWT authentication support
- Cloud database integration with Aiven
- Production deployment with Railway
- Postman/API client testing support

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2**
- **JWT**
- **dotenv**
- **Railway**
- **Aiven**
- **Postman**

## 📁 Project Structure

```text
company-api/
│
├── middleware/
│   └── ...
│
├── routes/
│   ├── departments.js
│   ├── employees.js
│   ├── salaries.js
│   ├── products.js
│   ├── sales.js
│   └── stock.js
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 📊 Database

The API uses a MySQL database with the following tables:

- `department`
- `employees`
- `salaries`
- `product`
- `sales`
- `stock`

The production database is hosted on **Aiven**.

## 🔗 API Endpoints

### Departments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/:id` | Get a department by ID |
| POST | `/api/departments` | Create a new department |
| PUT | `/api/departments/:id` | Update a department |
| DELETE | `/api/departments/:id` | Delete a department |

### Employees

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:idEmployees` | Get an employee by ID |
| GET | `/api/employees?idDepartment=:id` | Filter employees by department |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:idEmployees` | Update an employee |
| DELETE | `/api/employees/:idEmployees` | Delete an employee |

### Salaries

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/salaries` | Get salaries |
| GET | `/api/salaries/:idSalaries` | Get a salary record by ID |
| POST | `/api/salaries` | Create a salary record |
| PUT | `/api/salaries/:idSalaries` | Update a salary record |
| DELETE | `/api/salaries/:idSalaries` | Delete a salary record |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:idProduct` | Get a product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:idProduct` | Update a product |
| DELETE | `/api/products/:idProduct` | Delete a product |

### Sales

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/sales` | Get all sales |
| GET | `/api/sales/:idSales` | Get a sale by ID |
| POST | `/api/sales` | Create a new sale |
| PUT | `/api/sales/:idSales` | Update a sale |
| DELETE | `/api/sales/:idSales` | Delete a sale |

### Stock

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stock` | Get all stock records |
| GET | `/api/stock/:idProduct` | Get stock by product ID |
| POST | `/api/stock` | Create a stock record |
| PUT | `/api/stock/:idProduct` | Update a stock record |
| DELETE | `/api/stock/:idProduct` | Delete a stock record |

## 🧪 Example Requests

### Get All Employees

```http
GET /api/employees
```

Example response:

```json
[
  {
    "idEmployees": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "idDepartment": 1,
    "hireDate": "2026-08-19T00:00:00.000Z"
  }
]
```

### Filter Employees by Department

```http
GET /api/employees?idDepartment=1
```

### Get Employee by ID

```http
GET /api/employees/1
```

### Create an Employee

```http
POST /api/employees
Content-Type: application/json
```

Request body:

```json
{
  "idEmployees": 999,
  "name": "Test Employee",
  "email": "test.employee@example.com",
  "idDepartment": 1,
  "hireDate": "2026-08-26"
}
```

### Update an Employee

```http
PUT /api/employees/999
Content-Type: application/json
```

Request body:

```json
{
  "name": "Updated Employee",
  "email": "updated.employee@example.com",
  "idDepartment": 1,
  "hireDate": "2026-08-26"
}
```

### Delete an Employee

```http
DELETE /api/employees/999
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=companyAPI
PORT=3000
JWT_SECRET=your_secret_key
```

> Never commit your `.env` file or database credentials to GitHub.

For production, environment variables are configured through Railway.

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/nhibui32/company-api.git
cd company-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your local MySQL credentials.

### 4. Start the server

```bash
npm start
```

The API will run locally at:

```text
http://localhost:3000
```

## ☁️ Deployment

The production API is deployed using **Railway**.

Architecture:

```text
Client / Postman
       │
       ▼
   Railway
       │
       ▼
 Node.js + Express API
       │
       ▼
    Aiven
    MySQL
       │
       ├── department
       ├── employees
       ├── salaries
       ├── product
       ├── sales
       └── stock
```

## 🧪 Testing

API endpoints can be tested using:

- Postman
- PowerShell
- cURL
- Browser (GET requests)

Example:

```powershell
Invoke-WebRequest `
  "https://compani-api-production-b2e6.up.railway.app/api/employees" `
  -UseBasicParsing
```

A successful request returns:

```text
StatusCode: 200
```

## 🔒 Security

- Database credentials are stored using environment variables.
- `.env` is excluded from Git using `.gitignore`.
- JWT is used for authentication-related functionality.
- Production database credentials are not stored in the source code.

## 📄 License

MIT License

## 👩‍💻 Author

**Ngoc Anh Nhi Bui**

GitHub: https://github.com/nhibui32