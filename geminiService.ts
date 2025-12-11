import { GoogleGenAI, Type } from "@google/genai";
import { TravelEvent } from "../types";

// Function to generate itinerary using Gemini
export const generateItinerarySuggestions = async (
  city: 'Yiwu' | 'Hangzhou', 
  language: 'zh' | 'ko'
): Promise<TravelEvent[]> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("No API Key found");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Create a 1-day travel itinerary for ${city}, China. 
  Language: ${language === 'zh' ? 'Traditional Chinese (Taiwan/Hong Kong usage)' : 'Korean'}.
  Include 4-5 items mixing sightseeing, food, and shopping (especially for Yiwu markets or Hangzhou West Lake).
  Return JSON only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
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
    
    // Map to internal format with IDs
    return rawEvents.map((evt: any) => ({
      id: crypto.randomUUID(),
      time: evt.time,
      location: evt.location,
      notes: evt.notes || '',
      category: evt.category
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};