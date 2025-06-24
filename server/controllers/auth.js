import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({ error: 'All fields including gender are required' });
  }

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // ✅ Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await User.create({ name, email, password: hashed });

    // ✅ Assign gender-based avatar
    const avatarUrl =
      gender === 'male'
        ? 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
        : 'https://static.vecteezy.com/system/resources/previews/024/183/520/original/female-avatar-portrait-of-a-cute-brunette-woman-illustration-of-a-female-character-in-a-modern-color-style-vector.jpg';

    // ✅ Create default profile
    await UserProfile.create({
      name,
      email,
      gender,
      profileImageUrl: avatarUrl,
      shortBio: 'Hi, thank you for joining Hire Hub!',
    });

    // ✅ Generate JWT token for immediate login
    const jwt_token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Return token to frontend
    res.status(201).json({ message: 'User registered successfully', jwt_token });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email,password)
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error_msg: 'Invalid email/email not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error_msg: "Invalid credentials/password doesn't match with email" });
  const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.json({ jwt_token });
};

export const getProfile = async (req, res) => {
  try {
    // Step 1: Get user by ID to extract email
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Step 2: Use the email to get profile from UserProfile
    const userProfile = await UserProfile.findOne({ email: user.email });
    if (!userProfile) return res.status(404).json({ error: 'Profile not found' });

    // Step 3: Send profile data
    res.json({
      profile_details: {
        name: userProfile.name,
        profile_image_url: userProfile.profileImageUrl,
        short_bio: userProfile.shortBio,
      },
    });
  } catch (err) {
    console.error('Error in getProfile:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};