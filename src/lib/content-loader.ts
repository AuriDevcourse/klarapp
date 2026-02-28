import type { Lesson } from "@content/schema";
import floodsLesson from "@content/floods/lesson";
import kit72hLesson from "@content/kit-72h/lesson";

const lessons: Lesson[] = [floodsLesson, kit72hLesson];

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonByCategory(
  category: Lesson["category"]
): Lesson | undefined {
  return lessons.find((l) => l.category === category);
}

export async function fetchGoogleDoc(docId: string): Promise<string> {
  const apiKey = process.env.GOOGLE_DOCS_API_KEY;
  if (!apiKey) {
    console.warn("GOOGLE_DOCS_API_KEY not set, skipping Google Docs fetch");
    return "";
  }
  const res = await fetch(
    `https://docs.googleapis.com/v1/documents/${docId}?key=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch Google Doc: ${res.statusText}`);
  const doc = await res.json();

  // Simple extraction: concatenate paragraph text
  let markdown = "";
  for (const element of doc.body?.content ?? []) {
    if (element.paragraph) {
      for (const el of element.paragraph.elements ?? []) {
        markdown += el.textRun?.content ?? "";
      }
    }
  }
  return markdown;
}
