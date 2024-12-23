import bcrypt from 'bcrypt';
import generateToken from '../util/token.js';
import User from '../models/userSchema.js';

// Register a new User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }

        // 10 is the salt round for hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        if (user) {
          res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user)res.status(404).json({ message: 'User does not exist' });
  
        if (await bcrypt.compare(password, user.password)) {
          res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
  };

  
  
