import OpenAI from "openai";

export default async function handler(req, res) {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://johnnafuh.github.io"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
            error: "OPENAI_API_KEY is not available"
        });
    }

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "No message provided"
            });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await openai.responses.create({
            model: "gpt-5.6",
            input: message
        });

        return res.status(200).json({
            reply: response.output_text
        });

    } catch (error) {

        console.error("NAF AI ERROR:", error);

        return res.status(500).json({
            error: error.message || "AI request failed"
        });
    }
}
