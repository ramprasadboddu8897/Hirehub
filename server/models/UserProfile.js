import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  profileImageUrl: { type: String, required: true },
  shortBio: { type: String, default: 'Hello! I am new here.' },
  preferredDomain: { type: String, default: '' }, // Optional
});

const UserProfile = mongoose.model('UsersProfileDetails', userProfileSchema);
export default UserProfile;