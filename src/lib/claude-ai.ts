import Anthropic from "@anthropic-ai/sdk";
import type { ScenarioContent } from "@content/schema";

// ============================================================
// Claude AI — Personalised emergency scenario generator
// Uses the Anthropic SDK to create adaptive quiz scenarios
// based on lesson category and user profile.
// ============================================================

interface UserProfile {
  householdSize: number;
  children: number;
  pets: boolean;
  location: string; // e.g. "Copenhagen", "Aarhus", "Odense"
  ageGroup: "under-18" | "18-39" | "40-64" | "65+";
}

const SYSTEM_PROMPT = `You are an emergency preparedness trainer for Denmark. Generate realistic scenarios using Danish systems (112, S!RENEN, DR, DMI). Return ONLY valid JSON matching ScenarioContent schema.

RULES:
- All scenarios must be set in Denmark and reference real Danish systems, institutions, and geography.
- Use real emergency protocols: DMI warning levels (Risikomelding, Kategori 1/2/3), S!RENEN alerts, DEMA guidelines.
- Reference real Danish places, streets, and neighbourhoods.
- Include Danish terms with English translations, e.g. "stormflod (storm surge)".
- Emergency contacts: 112 (emergency), 114 (police non-emergency), 1813 (medical helpline, Capital Region).
- Each scenario must have exactly 2-3 choices.
- Scores range from 0 (dangerous) to 100 (optimal).
- Each choice needs a consequence rating: "optimal", "acceptable", "risky", or "dangerous".
- Outcomes must explain WHY using Danish emergency procedures.
- Tailor to the user's household (children, pets, elderly affect optimal choices).
- Include both situation and situationDa (Danish translation).
- Include both text/textDa and outcome/outcomeDa for each choice.

RESPONSE FORMAT (strict JSON, no markdown):
{
  "type": "scenario",
  "situation": "English situation text",
  "situationDa": "Danish situation text",
  "urgencyLevel": "low|medium|high|critical",
  "choices": [
    {
      "id": "a",
      "text": "English choice",
      "textDa": "Danish choice",
      "outcome": "English outcome",
      "outcomeDa": "Danish outcome",
      "score": 0-100,
      "consequence": "optimal|acceptable|risky|dangerous"
    }
  ]
}`;

function buildUserPrompt(
  category: string,
  profile: UserProfile
): string {
  const householdDesc = [
    `${profile.householdSize} person(s)`,
    profile.children > 0 ? `${profile.children} child(ren)` : null,
    profile.pets ? "with pets" : null,
    `age group: ${profile.ageGroup}`,
    `location: ${profile.location}`,
  ]
    .filter(Boolean)
    .join(", ");

  return `Generate a personalised emergency scenario for the "${category}" category.

User household: ${householdDesc}

Make it feel personal and immediate to their situation.`;
}

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local to use AI scenario generation."
    );
  }
  return new Anthropic({ apiKey });
}

/**
 * Generate a personalised emergency scenario using Claude.
 * Returns a ScenarioContent object ready to be used in a LessonStep.
 */
export async function generateScenario(
  category: "floods" | "kit-72h" | "sirens" | "blackout" | "nuclear",
  profile: UserProfile
): Promise<ScenarioContent> {
  const client = getClient();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(category, profile),
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude API");
  }

  const parsed = JSON.parse(textBlock.text) as ScenarioContent;

  // Validate structure
  if (
    !parsed.situation ||
    !Array.isArray(parsed.choices) ||
    parsed.choices.length < 2 ||
    parsed.choices.length > 3
  ) {
    throw new Error(
      "Invalid scenario structure returned from Claude API: expected 2-3 choices with situation"
    );
  }

  return {
    ...parsed,
    aiGenerated: true,
  } as ScenarioContent;
}
