import { languages } from "../utils/index.js";

const getSupportedLanguages = async (req, res) => {
  res.status(200).json(languages);
};

export default getSupportedLanguages;
