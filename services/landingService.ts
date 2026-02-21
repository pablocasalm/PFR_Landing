const WEBHOOK_URL = "https://hook.eu2.make.com/qrqujauo2b558c2p71irua9u92ikly2i";

export const submitLandingEmail = async (email: string) => {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const text = await response.text();

  if (!response.ok) {
    let errorMessage = "API Error";
    try {
      if (text) {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || text;
      }
    } catch {
      errorMessage = text || "Unknown error occurred";
    }
    throw new Error(errorMessage);
  }

  return text ? JSON.parse(text) : {};
};

