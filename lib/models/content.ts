import mongoose from "mongoose"

const ContentSchema = new mongoose.Schema(
  {
    hero: {
      title: String,
      subtitle: String,
      image: String,
    },
    about: {
      heading: String,
      text: String,
    },
    testimonials: [
      {
        name: String,
        role: String,
        text: String,
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema)