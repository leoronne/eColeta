require("dotenv/config");
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: `${process.env.APP_NAME} - API Documentation`,
    description: 'This is a sample documentation of the standard APIs of our platform!',
    contact: {
      name: `${process.env.APP_NAME}`,
      email: `${process.env.APP_MAIL}`,
    },
    version: '2.0.0',
  },
  servers: [{
    url: `${process.env.APP_TEST_URL}`,
  },{
    url: `http://localhost:8080/`,
  }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/*/*.js', './src/*/*/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerConfig = {
  explorer: true,
  customCss: '.swagger-ui .topbar {display :none} ',
  customCssUrl:
    'https://firebasestorage.googleapis.com/v0/b/datatongji-cd447.appspot.com/o/swagger.css?alt=media&token=c880112b-4957-45bf-b7e5-6af3a8d67cb9',
  customfavIcon: 'https://firebasestorage.googleapis.com/v0/b/datatongji-cd447.appspot.com/o/favicon.ico?alt=media&token=e51e0f6a-71e4-41ff-b5ae-0d2045a87fed',
  customSiteTitle: `${process.env.APP_NAME} - API Documentation`,
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
  },
};

module.exports = { swaggerSpec, swaggerConfig };
