const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    userID: { type: String, require },
    userName: { type: String, require },
    title: { type: String, require },
    body: { type: String, require },
    tags: { type: Array, require },
    isSolved: { type: Boolean, default: false },
    answers: [
      {
        answeredUserID: { type: String, require },
        answeredUserName: { type: String, require },
        answer: { type: String, require },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

QuestionSchema.methods.addanswers = async function (
  answeredUserID,
  answeredUserName,
  answer
) {
  try {
    this.answers = this.answers.concat({
      answeredUserID,
      answeredUserName,
      answer,
    });
    await this.save();
    return this.answers;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("question", QuestionSchema);
