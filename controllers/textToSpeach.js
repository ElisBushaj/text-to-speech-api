import tts from "google-tts-api";

const textToSpeach = async (req, res) => {
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
};

export default textToSpeach;
