
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import fs from 'node:fs';
import router from './src/router.js';

const app = express();

// Read the generated Swagger documentation
const swaggerDocument = JSON.parse(
  fs.readFileSync('./swagger.json', 'utf8')
);

app.use(express.json());
app.use(router);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'CSE 341 Books API is running!'
  });
});

export default app;
