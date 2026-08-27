const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company Insights API',
      version: '1.0.0',
      description: 'REST API for managing company data'
    },
    servers: [
      {
        url: 'https://compani-api-production-b2e6.up.railway.app'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/departments', require('./routes/departments'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/salaries', require('./routes/salaries'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/stock', require('./routes/stock'));
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});