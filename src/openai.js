export async function sendMsgToAi(message) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("API key is missing.");
    return "API key is missing. Please check your .env file.";
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();
    console.log("API response:", data); // Log the raw response

    // If there's an error key or no choices
    if (!data.choices || !data.choices[0]) {
      return `API Error: ${data.error?.message || "Invalid response."}`;
    }

    return data.choices[0].message.content.trim();

  } catch (err) {
    console.error("Fetch error:", err);
    return "An error occurred while communicating with the AI.";
  }
}
