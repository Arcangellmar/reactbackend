import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend React',
      version: '1.0.0',
      description: 'Backend',
    },
  },
  apis: ['./routes/routes.js'], // Especifica la ruta a tus archivos de ruta
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
