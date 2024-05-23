// src/app/models/Video.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now, index: true },
  slug: { type: String, unique: true, required: true, index: true },
  tags: { type: [String], index: true },
  category: { type: String, required: true, index: true },
  comments: [commentSchema],
});

export default mongoose.models.Video || mongoose.model('Video', videoSchema);
