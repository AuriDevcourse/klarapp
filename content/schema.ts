export interface Lesson {
  id: string;
  title: string;
  titleDa: string;
  description: string;
  icon: string; // Lucide icon name
  estimatedMinutes: number;
  category: "floods" | "kit-72h" | "sirens" | "blackout";
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: LessonStep[];
}

export interface LessonStep {
  id: string;
  type: "info" | "quiz" | "interactive" | "scenario";
  content: InfoContent | QuizContent | InteractiveContent | ScenarioContent;
}

export interface InfoContent {
  title: string;
  body: string; // markdown
  image?: string;
  source?: string; // URL to Danish gov source
  funFact?: string;
}

export interface QuizContent {
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  hint?: string;
}

export interface InteractiveContent {
  type: "checklist" | "slider" | "drag-and-drop" | "personalize";
  config: Record<string, unknown>;
}

export interface ScenarioContent {
  situation: string;
  choices: { text: string; outcome: string; score: number }[];
  aiGenerated?: boolean;
}
