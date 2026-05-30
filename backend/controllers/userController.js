import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.json({ success: false, message: "Please fill all fields" });

    const existing = await UserModel.findOne({ email });
    if (existing) return res.json({ success: false, message: "User already exists" });

    if (password.length < 6) return res.json({ success: false, message: "Password too short" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, message: 'Registered', token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ success: false, message: 'Please provide credentials' });

    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, message: 'Login successful', token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers['utoken'] || req.headers['uToken'] || req.headers.authorization;
    if (!token) return res.json({ success: false, message: 'Not authenticated' });
    let raw = token;
    if (raw.startsWith('Bearer ')) raw = raw.split(' ')[1];
    const payload = jwt.verify(raw, process.env.JWT_SECRET);
    if (!payload?.userId) return res.json({ success: false, message: 'Invalid token' });
    const user = await UserModel.findById(payload.userId).select('-password');
    if (!user) return res.json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

const updateMe = async (req, res) => {
  try {
    const token = req.headers['utoken'] || req.headers['uToken'] || req.headers.authorization;
    if (!token) return res.json({ success: false, message: 'Not authenticated' });
    let raw = token;
    if (raw.startsWith('Bearer ')) raw = raw.split(' ')[1];
    const payload = jwt.verify(raw, process.env.JWT_SECRET);
    if (!payload?.userId) return res.json({ success: false, message: 'Invalid token' });

    const updates = {};
    const allowed = ['name', 'phone', 'image', 'dob', 'address'];
    for (const key of allowed) if (req.body[key] !== undefined) updates[key] = req.body[key];

    const user = await UserModel.findByIdAndUpdate(payload.userId, updates, { new: true }).select('-password');
    if (!user) return res.json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: 'Something went wrong' });
  }
};

export { registerUser, loginUser, getMe, updateMe };
