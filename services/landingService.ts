// Solicita un código de invitación a la beta (mismo endpoint que usa la app para
// "solicitar otro código"): guarda el email como InviteRequest pendiente, y el admin
// lo ve en /app/admin/invitaciones para invitar con un clic.
const INVITE_REQUEST_URL = "https://api.padelfilmroom.com/api/invite-requests";

export const submitLandingEmail = async (email: string) => {
  const response = await fetch(INVITE_REQUEST_URL, {
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

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
};

