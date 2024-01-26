import OpenAI from "openai";
import config from "../config/config";

const openai = new OpenAI({
    apiKey: config.openAiApiKey,
    dangerouslyAllowBrowser: true,
});

export default openai;