import dotenv from "dotenv";
dotenv.config();

export const generateAIProject = async (prompt) => {
  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    // DEBUG (important)
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    // SAFE ACCESS
    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      data.candidates[0].content.parts.length === 0
    ) {
      throw new Error("Invalid Gemini response");
    }

    const text = data.candidates[0].content.parts[0].text;

    return text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};