const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId, //This will contain id to that particular user
                ref: "User"
            }
        ],

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },

        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true
    }
);

// General syntax of 'mongoose.model()'
/* const Model = mongoose.model(name, schema); */

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;


// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin --> if it's a group chat