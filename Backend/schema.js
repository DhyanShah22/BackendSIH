const mongoose = require('mongoose');

// Define the Message schema
const messageSchema = new mongoose.Schema({
  user: {
    type: String, // Assuming the user is a string, you can adjust this based on your needs
    required: true,
  },
  computer: {
    type: String, // Assuming the computer's message is a string
    required: true,
  },
});

// Define the Conversation schema
const conversationSchema = new mongoose.Schema({
  convoId: {
    type: String, // You can use ObjectId if you want to generate unique IDs automatically
    required: true,
  },
  messages: [messageSchema], // Array of message objects
});

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String, // You can use ObjectId if you want to generate unique IDs automatically
    required: true,
    unique: true, // Ensures userId is unique for each user
  },
  conversations: [conversationSchema], // Array of conversation objects
});

// Create and export the User model
const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;