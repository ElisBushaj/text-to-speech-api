import express from "express";
import cors from "cors";
import helmet from "helmet";
import { supportedLanguagesRoute, textToSpeachRoute } from "./routes/index.js";

const app = express();

// Express middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Endpoint to get the list of supported languages
app.use("/supported-languages", supportedLanguagesRoute);

// Text-to-Speech API endpoint
app.use("/text-to-speech", textToSpeachRoute);

const PORT = 4000 || process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
