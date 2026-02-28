import Anthropic from "@anthropic-ai/sdk";
import type { ScenarioContent } from "@content/schema";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface UserProfile {
  householdSize: number;
  location: string;
  ageGroup: "under40" | "40plus";
  hasPets: boolean;
  hasChildren: boolean;
}

export async function generateScenario(
  category: "floods" | "kit-72h" | "sirens" | "blackout",
  profile: UserProfile
): Promise<ScenarioContent> {
  const categoryContext: Record<string, string> = {
    floods:
      "flooding scenarios in Denmark — cloudbursts (skybrud), storm surges (stormflod), basement flooding, and climate-related water events",
    "kit-72h":
      "72-hour emergency preparedness kit scenarios — power outages, supply shortages, and self-sufficiency during the first 72 hours of a crisis",
    sirens:
      "emergency siren (S!RENEN) and warning system scenarios — what to do when you hear the siren, DMI weather warnings, and DK-Alert",
    blackout:
      "power outage (strømafbrud) scenarios — extended blackouts, heating loss in winter, communication breakdowns, and managing without electricity",
  };

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are an emergency preparedness expert for Denmark. Generate realistic emergency scenarios based on official Danish emergency protocols from Beredskabsstyrelsen (DEMA), DMI, and local kommune guidelines.

Rules:
- Scenarios must be realistic and set in Denmark
- Use Danish place names and institutions
- Reference real emergency numbers (112) and systems (S!RENEN, DR P1)
- Include Danish terms with English context
- Each choice must have a clear outcome and score (0-10)
- Best choices should align with official DEMA guidelines
- Scenarios should feel urgent but educational, not traumatic
- Respond ONLY with valid JSON matching the schema below`,
    messages: [
      {
        role: "user",
        content: `Generate a personalized emergency scenario for this user:
- Category: ${categoryContext[category]}
- Household: ${profile.householdSize} people
- Location: ${profile.location}
- Age group: ${profile.ageGroup}
- Has pets: ${profile.hasPets}
- Has children: ${profile.hasChildren}

Return JSON matching this TypeScript interface:
{
  situation: string, // 2-3 sentences, vivid and specific
  choices: [
    { text: string, outcome: string, score: number },
    { text: string, outcome: string, score: number },
    { text: string, outcome: string, score: number },
    { text: string, outcome: string, score: number }
  ],
  aiGenerated: true
}

Return ONLY the JSON object, no markdown or explanation.`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  const parsed = JSON.parse(text) as ScenarioContent;
  parsed.aiGenerated = true;
  return parsed;
}
