import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import groupRoutes from './routes/group.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import settlementRoutes from './routes/settlement.routes.js'
import mcmfRoutes from './routes/mcmf.routes.js'
import exportRoutes from './routes/export.routes.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/settlement', settlementRoutes);
app.use('/api/mcmf', mcmfRoutes);
app.use('/api/export', exportRoutes);

export default app;