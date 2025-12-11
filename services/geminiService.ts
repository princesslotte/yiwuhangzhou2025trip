import { GoogleGenAI, Type } from "@google/genai";
import { TravelEvent } from "../types";

export const generateItinerarySuggestions = async (city: string, language: 'zh' | 'ko'): Promise<TravelEvent[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const promptText = `Create a 1-day travel itinerary for ${city}, China. 
  Language: ${language === 'zh' ? 'Traditional Chinese (Taiwan/Hong Kong usage)' : 'Korean'}.
  Include 4-5 items mixing sightseeing, food, and shopping (especially for Yiwu markets or Hangzhou West Lake).
  Return JSON only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING, description: "Time in HH:MM format (24h)" },
              location: { type: Type.STRING, description: "Name of the place" },
              notes: { type: Type.STRING, description: "Short description of activity" },
              category: { 
                type: Type.STRING, 
                enum: ["sightseeing", "food", "shopping", "transport", "hotel"] 
              }
            },
            required: ["time", "location", "category"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const rawEvents = JSON.parse(text);
    return rawEvents.map((evt: any) => ({
      id: crypto.randomUUID(),
      time: evt.time,
      location: evt.location,
      notes: evt.notes || '',
      category: evt.category
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    alert("Error calling AI service. Check your API key or connection.");
    return [];
  }
};