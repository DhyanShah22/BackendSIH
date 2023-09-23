const express = require('express')
const User = require('./schema')


const postUser = async (req, res) => {
    try {
      const { userId, convoId, userMessage } = req.body;
  
      // Find the user
      const user = await User.findOne({ userId });
  
      if (!user) {
        //const user = await User.create({userId, convoId, userMessage})
        const user = new User({userId, convoId, userMessage})
        user.save()
        // res.status(200).json(user)
        //return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the conversation
      const conversation = user.conversations[0]?.messages;
  
      if (!conversation) {
        const user = await User.findOne({ userId })

        const tempMsg = {
            user : userMessage, 
            computer : "This is test"
        }
        const tempCon = {
            convoId: convoId,
            messages: [tempMsg]
        }
        const result = await User.updateOne(
            { userId: userId },
            { $push: { conversations: tempCon } }
          );

          const test = await User.updateOne(userId,tempCon)
        
          if (result.modifiedCount === 1) {
            console.log('Conversation added successfully');
          } else {
            console.error('Failed to add conversation');
          }
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      // Assuming a simple rule for computer responses
      // You can implement your logic here
      const computerMessage = `Computer: You said '${userMessage}', I heard you!`;
  
      // Add the user's message and computer's response to the conversation
      conversation.messages.push({ user: userMessage, computer: computerMessage });
  
      // Save the updated user document
      await user.save();
  
      return res.status(200).json({ computerMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    postUser
}