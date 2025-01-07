// Import the function to test
import { findUserByUsername } from '../../src/database/models/userModel';
import db from '../../src/database/dbConfig'; // Mock the database
// Mock the database
jest.mock('../../src/database/dbConfig', () => ({
    get: jest.fn(),
  }));
  
  describe('findUserByUsername', () => {
    it('should return the user when the user exists', async () => {
      // Arrange
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      (db.get as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, mockUser);
      });
  
      // Act
      const user = await findUserByUsername('testuser');
  
      // Assert
      expect(user).toEqual(mockUser);
      expect(db.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['testuser'],
        expect.any(Function)
      );
    });
  
    it('should return null when the user does not exist', async () => {
      // Arrange
      (db.get as jest.Mock).mockImplementation((query, params, callback) => {
        callback(null, undefined);
      });
  
      // Act
      const user = await findUserByUsername('nonexistentuser');
  
      // Assert
      expect(user).toBeNull();
      expect(db.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['nonexistentuser'],
        expect.any(Function)
      );
    });
  
    it('should reject with an error when the database query fails', async () => {
      // Arrange
      const mockError = new Error('Database error');
      (db.get as jest.Mock).mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });
  
      // Act & Assert
      await expect(findUserByUsername('testuser')).rejects.toThrow('Database error');
      expect(db.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['testuser'],
        expect.any(Function)
      );
    });
  });