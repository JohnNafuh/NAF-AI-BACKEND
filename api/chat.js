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

    return res.status(200).json({
        success: true,
        keyAvailable: Boolean(process.env.OPENAI_API_KEY)
    });
}
