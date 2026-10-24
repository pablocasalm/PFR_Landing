// Del 24 al 26/10/2026 (alta abierta) el backend envía la invitación al momento (ver
// src/i18n/openSignup.ts). El resto del tiempo: solicita un código de invitación a la beta (mismo endpoint que usa la app para
// "solicitar otro código"): guarda el email como InviteRequest pendiente, y el admin
// lo ve en /app/admin/invitaciones para invitar con un clic. Se envía también el idioma en el
// que el visitante está viendo la landing, para invitarle después en ese idioma.
import { getAttribution } from "../src/lib/attribution";

const INVITE_REQUEST_URL = "https://azureapi.padelfilmroom.com/api/invite-requests";

export const submitLandingEmail = async (email: string, language: "es" | "en") => {
  const response = await fetch(INVITE_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Con el origen del visitante (utm_source, ref…), si llegó por un enlace que lo traía.
    body: JSON.stringify({ email, language, ...getAttribution() }),
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


// Botón del email de acceso anticipado ("Cuenta conmigo" / "Count me in"): guarda que la persona
// confirma su plaza y en qué idioma. Devuelve false si el enlace no se reconoce.
export const confirmEarlyAccess = async (token: string, language: "es" | "en"): Promise<boolean> => {
  const response = await fetch(`${INVITE_REQUEST_URL}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, language }),
  });
  return response.ok;
};
