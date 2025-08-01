export async function sendMsgToAi(message) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    headers: {
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content.trim();
}
