import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: String,
  name: String,
  messages: [
    {
      name: String,
      message: String,
      timestamp: String,
      received: Boolean,
    },
  ],
  lastMessage: String,
});

export default mongoose.model("roomdata", roomSchema);
