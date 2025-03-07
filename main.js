import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import "dotenv/config";
const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const prompt = req.query.prompt;
  const result = await model.generateContent(prompt);

  res.json({
    response: result.response.text(),
  });
});

app.post("/prompt", async (req, res) => {
  const prompt = req.body.message;
  const result = await model.generateContent(prompt);

  res.json({
    response: result.response.text(),
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
