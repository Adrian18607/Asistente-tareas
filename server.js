const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("."));

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/preguntar", async (req, res) => {
  const { nivel, tipo, pregunta } = req.body;
  const prompt = `Eres un asistente académico para estudiantes de ${nivel}. Responde con una ${tipo === 'completa' ? 'explicación detallada' : 'respuesta breve'} a la pregunta:\n\n"${pregunta}"`;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const json = await completion.json();
    res.json({ respuesta: json.choices[0].message.content });
  } catch (e) {
    res.json({ respuesta: "Error con la IA: " + e.message });
  }
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
