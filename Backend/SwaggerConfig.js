// swaggerConfig.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de administracion de Parqueadero',
      version: '3.0.0',
      description: 'Documentación de la API de ParkEase',
    },
    servers:[
        {
            url: "http://localhost:4466"
        }
    ]
  },
  apis: ['./routes/routes.js', './routes/routes.js'], // Rutas de tus controladores
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;