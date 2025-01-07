import { login } from '../../src/controllers/authController';
import { findUserByUsername } from '../../src/database/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// Mock external dependencies
jest.mock('../../src/database/models/userModel', () => ({
  findUserByUsername: jest.fn(),
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('login', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Reset mock functions before each test
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis(); // Chainable mock for res.status
    req = { body: {} };
    res = {
      status: statusMock,
      json: jsonMock,
    };
    jest.clearAllMocks(); // Clear mocks to prevent test interference
  });

  it('should return 400 if username or password is missing', async () => {
    req.body = { username: '', password: '' };

    await login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Username and password are required',
    });
  });

  it('should return 401 if user does not exist', async () => {
    (findUserByUsername as jest.Mock).mockResolvedValue(null);

    req.body = { username: 'nonexistentuser', password: 'password123' };

    await login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Invalid credentials',
    });
  });

  it('should return 401 if password does not match', async () => {
    const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
    (findUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    req.body = { username: 'testuser', password: 'wrongpassword' };

    await login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Invalid credentials',
    });
  });

  it('should return access and refresh tokens if login is successful', async () => {
    const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
    const mockAccessToken = 'mockAccessToken';
    const mockRefreshToken = 'mockRefreshToken';

    (findUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock)
      .mockReturnValueOnce(mockAccessToken) // First call: access token
      .mockReturnValueOnce(mockRefreshToken); // Second call: refresh token

    req.body = { username: 'testuser', password: 'password123' };

    await login(req as Request, res as Response);

    expect(statusMock).not.toHaveBeenCalled(); // No status set for success
    expect(jsonMock).toHaveBeenCalledWith({
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });
  });

  it('should return 500 if an error occurs', async () => {
    (findUserByUsername as jest.Mock).mockRejectedValue(new Error('Database error'));

    req.body = { username: 'testuser', password: 'password123' };

    await login(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Server error',
    });
  });
});
