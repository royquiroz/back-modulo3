const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    addressee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    comment: String,
    isRead: {
      type: Boolean,
      default: false
    },
    answers: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    }
  }
);

module.exports = mongoose.model("Message", messageSchema);
