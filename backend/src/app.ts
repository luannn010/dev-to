import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
