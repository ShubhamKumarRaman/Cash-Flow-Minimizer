import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import groupRoutes from './routes/group.routes'
import expenseRoutes from './routes/expense.routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);

export default app;