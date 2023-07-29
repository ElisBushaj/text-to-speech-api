import express from "express";
import tts from "google-tts-api";
import cors from "cors";

const app = express();
const PORT = 4000;

// Express middleware to parse JSON body
app.use(express.json());
app.use(cors());

// Endpoint to get the list of supported languages
app.get("/supported-languages", async (req, res) => {
  const languages = {
    af: "Afrikaans",
    sq: "Albanian",
    ar: "Arabic",
    hy: "Armenian",
    ca: "Catalan",
    zh: "Chinese",
    "zh-cn": "Chinese (Mandarin/China)",
    "zh-tw": "Chinese (Mandarin/Taiwan)",
    "zh-yue": "Chinese (Cantonese)",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    "en-au": "English (Australia)",
    "en-uk": "English (United Kingdom)",
    "en-us": "English (United States)",
    eo: "Esperanto",
    fi: "Finnish",
    fr: "French",
    de: "German",
    el: "Greek",
    ht: "Haitian Creole",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    la: "Latin",
    lv: "Latvian",
    mk: "Macedonian",
    no: "Norwegian",
    pl: "Polish",
    pt: "Portuguese",
    "pt-br": "Portuguese (Brazil)",
    ro: "Romanian",
    ru: "Russian",
    sr: "Serbian",
    sk: "Slovak",
    es: "Spanish",
    "es-es": "Spanish (Spain)",
    "es-us": "Spanish (United States)",
    sw: "Swahili",
    sv: "Swedish",
    ta: "Tamil",
    th: "Thai",
    tr: "Turkish",
    vi: "Vietnamese",
    cy: "Welsh",
  };
  res.status(200).json(languages);
});

// Text-to-Speech API endpoint
app.post("/text-to-speech", async (req, res) => {
  const { text, lang, speed } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required." });
  }

  // Check if the text length is greater than 200 characters
  if (text.length > 200) {
    return res
      .status(400)
      .json({ error: "Text must not exceed 200 characters." });
  }

  const options = {
    lang: lang || "en",
    slow: speed === "slow",
    host: "https://translate.google.com",
  };

  const audio = await tts.getAudioBase64(text, options);

  // Set the Content-Disposition header to prompt download
  res.set("Content-Disposition", 'attachment; filename="audio.mp3"');
  res.set("Content-Type", "audio/mpeg");

  // Send the Base64 audio data as the response
  res.send(Buffer.from(audio, "base64"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
