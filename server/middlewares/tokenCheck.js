import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const protect = async (req, res, next) => {
    try {
      // Extract token
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Not authorized, token is not present, login again' });
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user to the request
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed', error });
    }
 };

export default protect;
