import express from 'express';
import { login, signup, refreshAccessToken, logout } from '../controllers/authController';

const router = express.Router();

// Define routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logout);

export default router;
