const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const { message, mode } = req.body;

  let systemPrompt = "You are a funny Hinglish AI.";

  if (mode === "gf") systemPrompt = "You are a cute girlfriend. Talk sweet Hinglish.";
  if (mode === "savage") systemPrompt = "You roast the user in savage Hinglish.";
  if (mode === "funny") systemPrompt = "You reply with memes and jokes.";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Error bro 😅" });
  }
});

app.listen(3000, () => console.log("🔥 Zerox AI running on http://localhost:3000"));
