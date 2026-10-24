// Precios de la suscripción, ya resueltos por país (IP) en el backend. Endpoint público,
// pensado explícitamente para poder mostrarse desde la landing sin sesión.
const BILLING_PLANS_URL = "https://azureapi.padelfilmroom.com/api/billing/plans";

export type BillingInterval = "Monthly" | "Yearly";

export type PriceOption = {
  interval: BillingInterval;
  displayAmount: number;
  currency: string;
};

export type PlanTier = "Starter" | "Club" | "Coach";

export type TierPlan = {
  tier: PlanTier;
  prices: PriceOption[];
};

/** Lo mismo que lee la pantalla de Precios de la app (src/lib/api/billing.ts en PFR): el precio
 * de cada plan para quien mira (fundador o normal, España o resto del mundo) y las plazas. */
export type BillingPlans = {
  prices: PriceOption[];
  plans?: TierPlan[];
  isFounder?: boolean;
  founderSlotsLeft?: number;
  coachFull?: boolean;
};

export const getBillingPlans = async (): Promise<BillingPlans> => {
  const response = await fetch(BILLING_PLANS_URL);
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
    return text ? JSON.parse(text) : { prices: [] };
  } catch {
    return { prices: [] };
  }
};
