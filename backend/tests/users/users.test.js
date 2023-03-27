const { registerUser, loginUser, getUser } = require('../../controllers/userController');
const generateToken = require('../../utils/generateToken');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const connectDB = require('../../config/db');
const {testSetup} = require('../test-utils');


testSetup()

describe('/users', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 'user123' },
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  describe('GET', () => {
    test('should return 404 if user is not found', async () => {
      req.user.id = 'user123';
      jest.spyOn(User, 'findById').mockResolvedValue(null);
  
      await getUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: 'user could not be found',
      });
    });
  
    test('should return user data if user is found', async () => {
      req.user.id = 'user123';

      const user = {
        _id: 'user123',
        username: 'testuser',
      };

      jest.spyOn(User, 'findById').mockResolvedValue(user);
  
      await getUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'success',
        data: {
            id: user._id,
            username: user.username,
        }
      });
    });
  });
    
  describe('/register', () => {
    describe('POST', () => {
      test('should return 400 if username is missing', async () => {
        req.body = { password: 'testpassword' };
  
        await registerUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          success: false,
          message: 'please fill all fields',
        });
      });
  
      test('should return 400 if password is missing', async () => {
        req.body = { username: 'testuser' };
  
        await registerUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          success: false,
          message: 'please fill all fields',
        });
      });
  
      test('should return 400 if user already exists', async () => {
        const user = { username: 'testuser' };
        req.body = { username: 'testuser', password: 'testpassword' };
        jest.spyOn(User, 'findOne').mockResolvedValue(user);
  
        await registerUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          success: false,
          message: 'username taken',
        });
      });
  
      test('should return 201 and user data if user is successfully created', async () => {
        const user = { _id: 'user123', username: 'testuser' };
        req.body = { username: 'testuser', password: 'testpassword' };
        jest.spyOn(User, 'findOne').mockResolvedValue(null);
        jest.spyOn(User, 'create').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
  
        await registerUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          success: true,
          message: 'success',
          data: {
            id: user._id,
            username: user.username,
            token: generateToken(user._id),
          },
        });
      });
  
      test('should return 400 if user data is invalid', async () => {
        req.body = { username: '', password: '' };
  
        await registerUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          success: false,
          message: 'please fill all fields',
        });
      });
    });
  
    })
    
  describe('/login', () => {

    describe('POST', () => {
      test('should return 400 if username is missing', async () => {
        req.body = { password: 'testpassword' };
  
        await loginUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          success: false,
          message: 'please fill all fields',
        });
      });
  
    test('should return 400 if password is missing', async () => {
      req.body = { username: 'testuser' };
  
      await loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: 'please fill all fields',
      });
    });
  
    test('should return 401 if user is not found', async () => {
      req.body = { username: 'testuser', password: 'testpassword' };
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
  
      await loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: 'invalid credentials',
      });
    });
  
    test('should return user data and token if login is successful', async () => {
      req.body = { username: 'testuser', password: 'testpassword' };
      const user = { _id: 'user123', username: 'testuser', password: 'hashedpassword' };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  
      await loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'success',
        data: {
          id: user._id,
          username: user.username,
          token: generateToken(user._id),
        },
      });
    });
    })
    })
})

     
