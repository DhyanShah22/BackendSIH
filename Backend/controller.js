const express = require('express')
const UserModel = require('./schema')

const postUser = async (req, res) => {
  try {
    const { userId, convoId, userMessage } = req.body;

    // Find the user by userId
    let usermodel = await UserModel.findOne({ userId });

    if (!usermodel) {
      // If user not found, create a new user
      usermodel = new UserModel({
        userId,
        conversations: [],
      });
    }

    // Find the conversation by convoId or create a new one
    let conversation = usermodel.conversations.find((c) => c.convoId === convoId);

    if (!conversation) {
      conversation = {
        convoId,
        messages: [],
      };
      usermodel.conversations.push(conversation);
    }

    // Create a new message
    const newMessage = {
      user: userMessage,
      computer: `Computer: You said '${userMessage}', I heard you!`, // Computer's response based on user's message
    };

    // Add the new message to the conversation
    conversation.messages.push(newMessage);

    // Save the updated user document
    await usermodel.save();

    return res.status(200).json({ computerMessage: newMessage.computer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
    postUser
}