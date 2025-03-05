import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", async (req, res) => {
  const prompt = req.query.prompt;
  const result = await model.generateContent(prompt);

  res.json({
    response: result.response.text(),
  });
});

app.listen(5050, () => console.log("App running on port 5050"));
