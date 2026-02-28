// ============================================================
// Klar App — Content Schema
// All lesson content must conform to these types.
// The frontend team depends on this contract — do not modify
// without coordinating with the UI team.
// ============================================================

export interface Lesson {
  id: string;
  title: string;
  titleDa: string;
  description: string;
  descriptionDa: string;
  icon: string; // Lucide icon name
  estimatedMinutes: number;
  category: "floods" | "kit-72h" | "sirens" | "blackout" | "nuclear";
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: LessonStep[];
  sources: { title: string; url: string }[];
}

export interface LessonStep {
  id: string;
  stepNumber: number;
  type: "info" | "quiz" | "interactive" | "scenario";
  content: InfoContent | QuizContent | InteractiveContent | ScenarioContent;
}

export interface InfoContent {
  type: "info";
  title: string;
  titleDa: string;
  body: string; // markdown
  bodyDa: string; // markdown
  sourceUrl: string; // REQUIRED — real .dk gov, Red Cross, EU, or major Danish news
  keyTakeaway: string;
  keyTakeawayDa: string;
  image?: string;
  funFact?: string;
  funFactDa?: string;
}

export interface QuizContent {
  type: "quiz";
  question: string;
  questionDa: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption]; // exactly 4
  points: 10 | 20; // 10 easy, 20 hard
  difficulty: "easy" | "medium" | "hard";
  hint?: string;
  hintDa?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  textDa: string;
  correct: boolean; // exactly 1 must be true
  explanation: string;
  explanationDa: string;
}

export interface InteractiveContent {
  type: "interactive";
  interactiveType:
    | "checklist"
    | "slider"
    | "drag-and-drop"
    | "personalize"
    | "priority-sort";
  title: string;
  titleDa: string;
  instructions: string;
  instructionsDa: string;
  config: {
    items?: Record<string, unknown>[];
    questions?: Record<string, unknown>[];
  };
}

export interface ScenarioContent {
  type: "scenario";
  situation: string;
  situationDa: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  choices: ScenarioChoice[]; // 2–3 items
  timedSeconds?: number;
  aiGenerated?: boolean;
}

export interface ScenarioChoice {
  id: string;
  text: string;
  textDa: string;
  outcome: string;
  outcomeDa: string;
  score: number; // 0–100
  consequence: "optimal" | "acceptable" | "risky" | "dangerous";
  nextStepId?: string;
}
