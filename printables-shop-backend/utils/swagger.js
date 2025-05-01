const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Printables Shop API',
      version: '1.0.0',
      description: 'API for selling digital printables online',
    },
  },
  apis: ['./routes/*.js'], // Swagger from route comments
};

module.exports = swaggerJsdoc(options);
