import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const data = await req.json();

        const promptText = `Generate a humorous horoscope for someone born on ${data.date}.  add new line here. 
        1. Emoji Horoscope: Create a string of 5-7 random emojis. These emojis should be diverse and not necessarily related to each other. add new line here.
        2. Horoscope Translation: Provide a funny, absurd interpretation of the emoji string as a horoscope prediction. The interpretation should be 2-3 sentences long and incorporate elements from the emojis in unexpected ways. add new line here. 
        3. Lucky Charm: Suggest a "lucky charm" composed of 2-3 emojis from the horoscope, with a brief explanation of its supposed magical properties.
        4. Cosmic Advice: Offer one piece of ridiculous advice based on the emoji horoscope. add new line here. 
        Format your response exactly as follows: Emoji Horoscope: [emoji string] Translation: [funny horoscope text] Lucky Charm: [2-3 emojis] - [brief explanation] Cosmic Advice: [one line of absurd advice] Remember, the goal is to be entertaining and nonsensical rather than accurate or meaningful. add a new line for each topic and write almost 40 words`;

        const result = await model.generateContent(promptText);
        const response = await result.response.text();

        return NextResponse.json({ geminiResponse: response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while generating the horoscope." }, { status: 500 });
    }
}
