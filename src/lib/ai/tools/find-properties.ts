import { tool } from 'ai';
import { z } from 'zod';

export const findProperties = tool({
  description: 'Find matching properties based on the preference of the user.',
  parameters: z.object({
    district: z.string().describe('The district user wants to find'),
    wifi_payment: z
      .enum(['yes', 'no'])
      .describe('Whether the user wants to pay for wifi'),
    maximum_wifi_rate: z
      .number()
      .describe('The maximum wifi cost per month user wants to pay'),
    maximum_electricity_rate: z
      .number()
      .describe('The maximum electricity rate per kwh user wants to pay'),
    maximum_distance: z
      .number()
      .describe("Maximum distance from the user's preference location"),
  }),
  execute: async ({
    district,
    maximum_distance = 3,
    wifi_payment,
    maximum_electricity_rate,
    maximum_wifi_rate,
  }) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    );
    return await response.json();
  },
});
