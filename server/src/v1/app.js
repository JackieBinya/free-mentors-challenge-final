import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import routes from './routes';
import Admin from './middleware/admin';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send(`Welcome to Free Mentors!
Created by Jacqueline Binya, for Andela Bootcamp Cylcle 10;
Kigali, Rwanda`));

const port = process.env.PORT || 8001;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', Admin.createAdmin);
app.use('/api/v1/auth', routes.authRoutes);
app.use('/api/v1/user', routes.userRoutes);
app.use('/api/v1/mentors', routes.mentorsRoutes);
app.use('/api/v1/sessions', routes.sessionsRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
