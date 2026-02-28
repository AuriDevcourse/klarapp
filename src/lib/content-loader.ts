import type { Lesson } from "@/content/schema";
import { floodLesson } from "@/content/floods/lesson";
import { kit72hLesson } from "@/content/kit-72h/lesson";

// ============================================================
// Lesson registry — add new lessons here as they're created
// ============================================================

const lessons: Lesson[] = [floodLesson, kit72hLesson];

// ============================================================
// Lesson accessors
// ============================================================

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter((l) => l.category === category);
}
