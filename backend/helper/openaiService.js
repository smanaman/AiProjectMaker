import dotenv from "dotenv";

dotenv.config();

export const generateAIProject = async (prompt) => {
  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY ||'AIzaSyDbtED7bDQvNMjGk6CY5K7VLH6UX0zh45k'}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text = data.candidates[0].content.parts[0].text;

    return text;

  } catch (error) {

    console.error("Gemini Error:", error);
    throw error;

  }
};