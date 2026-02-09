import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const prompt = `
User symptoms: ${question}
Return ONLY the most relevant medical specialist.
ONE word only.
`;

 const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  }
);

   

const specialist =
      response.data.candidates[0].content.parts[0].text.trim();

    res.json({ specialist });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
