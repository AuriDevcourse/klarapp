"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Lightbulb,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Clock,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";
import { useConfetti } from "@/hooks/use-confetti";
import { useCorrectSound, useIncorrectSound } from "@/hooks/use-sound";
import { getLessonById } from "@/lib/content-loader";
import cloudMeditateAnim from "@/animations/cloud-meditate.json";
import floodAlertAnim from "@/animations/flood-alert.json";
import thumbsUpAnim from "@/animations/thumbs-up.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const categoryAnimations: Record<string, unknown> = {
  floods: floodAlertAnim,
  "kit-72h": cloudMeditateAnim,
  sirens: cloudMeditateAnim,
  blackout: cloudMeditateAnim,
};
import type {
  Lesson,
  LessonStep,
  InfoContent,
  QuizContent,
  ScenarioContent,
  InteractiveContent,
} from "@content/schema";

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const lesson = getLessonById(id);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  if (!lesson) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  const step = lesson.steps[currentStep];
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  const handleNext = (pointsEarned?: number) => {
    const stepType = lesson.steps[currentStep]?.type;
    const isQuestion = stepType === "quiz" || stepType === "scenario";
    if (isQuestion) {
      setTotalQuestions((q) => q + 1);
      if (pointsEarned && pointsEarned > 0) setCorrectAnswers((c) => c + 1);
    }
    if (pointsEarned) setScore((s) => s + pointsEarned);
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    if (showLeaderboard) {
      return <LeaderboardScreen onContinue={() => router.push("/lessons")} />;
    }
    return (
      <CompletionScreen
        score={score}
        totalSteps={lesson.steps.length}
        lessonTitle={lesson.title}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        onContinue={() => setShowLeaderboard(true)}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-klar-bg flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-klar-bg/90 backdrop-blur-md px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-1 -ml-1"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <div className="flex-1">
            <Progress value={progress} className="h-2 bg-border" />
          </div>
          <span className="text-xs font-medium text-muted-foreground min-w-[3rem] text-right">
            {currentStep + 1}/{lesson.steps.length}
          </span>
          <button
            onClick={() => setIsComplete(true)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors ml-1"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {step.type === "info" && (
              <InfoStep
                content={step.content as InfoContent}
                onNext={() => handleNext()}
              />
            )}
            {step.type === "quiz" && (
              <QuizStep
                content={step.content as QuizContent}
                onNext={(points) => handleNext(points)}
              />
            )}
            {step.type === "scenario" && (
              <ScenarioStep
                content={step.content as ScenarioContent}
                onNext={(points) => handleNext(points)}
              />
            )}
            {step.type === "interactive" && (
              <InteractiveStep
                content={step.content as InteractiveContent}
                onNext={(points) => handleNext(points)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Lesson Intro ───────────────────────────────────────────────── */

function LessonIntro({
  lesson,
  onStart,
  onBack,
}: {
  lesson: Lesson;
  onStart: () => void;
  onBack: () => void;
}) {
  const animData = categoryAnimations[lesson.category] ?? cloudMeditateAnim;

  return (
    <div className="min-h-dvh bg-klar-bg flex flex-col">
      {/* Back button */}
      <div className="px-5 pt-14 pb-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-border/50 shadow-sm hover:bg-muted active:scale-[0.97] transition-all cursor-pointer"
        >
          <ChevronLeft size={18} className="text-foreground" />
          <span className="text-sm font-medium text-foreground">Back</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-8">
        {/* Lottie animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
          className="w-56 h-56 mb-6"
        >
          <Lottie
            animationData={animData}
            loop
            className="w-full h-full"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-foreground text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {lesson.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm text-muted-foreground text-center leading-relaxed max-w-xs mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {lesson.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{lesson.estimatedMinutes} min</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="text-sm text-muted-foreground">
            {lesson.steps.length} steps
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="text-sm text-muted-foreground capitalize">
            {lesson.difficulty}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          className="w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onStart}
            className="w-full h-13 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white shadow-md active:scale-[0.97] transition-transform"
          >
            Start lesson
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Info Step ───────────────────────────────────────────────────── */

function InfoStep({
  content,
  onNext,
}: {
  content: InfoContent;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      <h2 className="text-xl font-bold text-foreground">{content.title}</h2>
      <div className="prose prose-sm prose-slate max-w-none">
        <MarkdownBody text={content.body} />
      </div>

      {content.funFact && (
        <motion.div
          className="bg-klar-accent/15 border border-klar-accent/30 rounded-xl p-4 flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Lightbulb
            size={20}
            className="text-klar-warning shrink-0 mt-0.5"
          />
          <div>
            <p className="text-xs font-semibold text-klar-primary mb-1">
              Did you know?
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {content.funFact}
            </p>
          </div>
        </motion.div>
      )}

      {content.source && (
        <a
          href={content.source}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-klar-primary transition-colors"
        >
          <ExternalLink size={12} />
          Source
        </a>
      )}

      <Button
        onClick={onNext}
        className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white mt-2 active:scale-[0.97] transition-transform"
      >
        Continue
      </Button>
    </div>
  );
}

/* ─── Quiz Step ──────────────────────────────────────────────────── */

function QuizStep({
  content,
  onNext,
}: {
  content: QuizContent;
  onNext: (points: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const { fire: fireConfetti } = useConfetti();
  const { play: playCorrect } = useCorrectSound();
  const { play: playIncorrect } = useIncorrectSound();
  const isAnswered = selected !== null;
  const isCorrect = selected !== null && content.options[selected].correct;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    if (content.options[idx].correct) {
      playCorrect();
      fireConfetti();
    } else {
      playIncorrect();
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-4">
      <h2 className="text-lg font-bold text-foreground leading-snug">
        {content.question}
      </h2>

      {content.hint && !isAnswered && (
        <div>
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-1.5 text-sm text-klar-warning font-medium"
            >
              <Lightbulb size={16} />
              Show hint
            </button>
          ) : (
            <motion.p
              className="text-sm text-klar-warning/80 bg-klar-warning/10 rounded-lg px-3 py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {content.hint}
            </motion.p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {content.options.map((option, idx) => {
          let borderColor = "border-border";
          let bg = "bg-white";
          let textColor = "text-foreground";

          if (isAnswered) {
            if (option.correct) {
              borderColor = "border-klar-success";
              bg = "bg-klar-success/10";
              textColor = "text-klar-success";
            } else if (idx === selected && !option.correct) {
              borderColor = "border-klar-danger";
              bg = "bg-klar-danger/5";
              textColor = "text-klar-danger";
            } else {
              bg = "bg-muted/50";
              textColor = "text-muted-foreground";
            }
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 ${borderColor} ${bg} transition-all ${
                !isAnswered ? "active:scale-[0.97]" : ""
              }`}
              animate={
                isAnswered && idx === selected && !option.correct
                  ? { x: [0, -8, 8, -4, 4, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 ${borderColor} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  {isAnswered && option.correct && (
                    <Check size={14} className="text-klar-success" />
                  )}
                  {isAnswered && idx === selected && !option.correct && (
                    <X size={14} className="text-klar-danger" />
                  )}
                </div>
                <span className={`text-sm font-medium ${textColor}`}>
                  {option.text}
                </span>
              </div>

              {/* Explanation */}
              {isAnswered && (idx === selected || option.correct) && (
                <motion.p
                  className="text-xs text-muted-foreground mt-2 ml-9 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.2 }}
                >
                  {option.explanation}
                </motion.p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Result banner */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            className={`rounded-xl p-4 flex items-center gap-3 ${
              isCorrect
                ? "bg-klar-success/10 border border-klar-success/30"
                : "bg-klar-danger/10 border border-klar-danger/30"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isCorrect ? (
              <>
                <div className="w-10 h-10 rounded-full bg-klar-success/20 flex items-center justify-center">
                  <Check size={20} className="text-klar-success" />
                </div>
                <div>
                  <p className="font-bold text-klar-success">Correct!</p>
                  <p className="text-xs text-muted-foreground">+10 points</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-klar-danger/20 flex items-center justify-center">
                  <X size={20} className="text-klar-danger" />
                </div>
                <div>
                  <p className="font-bold text-klar-danger">Not quite</p>
                  <p className="text-xs text-muted-foreground">
                    See the correct answer above
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && (
        <Button
          onClick={() => onNext(isCorrect ? 10 : 0)}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white active:scale-[0.97] transition-transform"
        >
          Next
        </Button>
      )}
    </div>
  );
}

/* ─── Scenario Step ──────────────────────────────────────────────── */

function ScenarioStep({
  content,
  onNext,
}: {
  content: ScenarioContent;
  onNext: (points: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const isAnswered = selected !== null;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Situation card */}
      <motion.div
        className="bg-klar-primary rounded-2xl p-5 border-2 border-klar-warning/40 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-klar-warning" />
          <span className="text-sm font-bold text-klar-warning uppercase tracking-wide">
            Scenario
          </span>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {content.situation}
        </p>
      </motion.div>

      {/* Choices */}
      <p className="text-sm font-semibold text-foreground">
        What do you do?
      </p>
      <div className="flex flex-col gap-3">
        {content.choices.map((choice, idx) => {
          let style = "bg-white border-border";
          if (isAnswered && idx === selected) {
            if (choice.score >= 8) style = "bg-klar-success/10 border-klar-success";
            else if (choice.score >= 4) style = "bg-klar-warning/10 border-klar-warning";
            else style = "bg-klar-danger/10 border-klar-danger";
          } else if (isAnswered) {
            style = "bg-muted/50 border-border opacity-60";
          }

          return (
            <motion.button
              key={idx}
              onClick={() => !isAnswered && setSelected(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 ${style} transition-all ${
                !isAnswered ? "active:scale-[0.97]" : ""
              }`}
              whileTap={!isAnswered ? { scale: 0.97 } : undefined}
            >
              <p className="text-sm font-medium text-foreground">
                {choice.text}
              </p>
              {isAnswered && idx === selected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 mt-3 mb-1">
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${
                        choice.score >= 8
                          ? "bg-klar-success"
                          : choice.score >= 4
                          ? "bg-klar-warning"
                          : "bg-klar-danger"
                      }`}
                    >
                      {choice.score}/10
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {choice.outcome}
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {isAnswered && (
        <Button
          onClick={() => onNext(content.choices[selected!].score)}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white mt-2 active:scale-[0.97] transition-transform"
        >
          Next
        </Button>
      )}
    </div>
  );
}

/* ─── Interactive Step ───────────────────────────────────────────── */

function InteractiveStep({
  content,
  onNext,
}: {
  content: InteractiveContent;
  onNext: (points: number) => void;
}) {
  if (content.type === "checklist") return <ChecklistInteractive config={content.config} onNext={onNext} />;
  if (content.type === "drag-and-drop") return <DragDropInteractive config={content.config} onNext={onNext} />;
  if (content.type === "personalize") return <PersonalizeInteractive config={content.config} onNext={onNext} />;

  // Fallback
  return (
    <div className="flex flex-col gap-4 pb-4">
      <p className="text-muted-foreground">Interactive task</p>
      <Button
        onClick={() => onNext(5)}
        className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary text-white"
      >
        Continue
      </Button>
    </div>
  );
}

function ChecklistInteractive({
  config,
  onNext,
}: {
  config: Record<string, unknown>;
  onNext: (points: number) => void;
}) {
  const categories = (config.categories as Array<{
    name: string;
    icon: string;
    items: Array<{ id: string; label: string; essential: boolean }>;
  }>) ?? [];
  const allItems = categories.flatMap((c) => c.items);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const progress = allItems.length > 0 ? (checked.size / allItems.length) * 100 : 0;

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h2 className="text-lg font-bold text-foreground">
        {(config.title as string) ?? "Checklist"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {(config.subtitle as string) ?? ""}
      </p>

      <div className="w-full bg-border rounded-full h-2 mb-2">
        <motion.div
          className="bg-klar-success h-2 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {categories.map((cat) => (
        <div key={cat.name} className="bg-white rounded-xl p-4 border border-border/50">
          <h3 className="font-semibold text-sm text-foreground mb-3">
            {cat.name}
          </h3>
          <div className="flex flex-col gap-2.5">
            {cat.items.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={checked.has(item.id)}
                  onCheckedChange={() => toggle(item.id)}
                />
                <span
                  className={`text-sm ${
                    checked.has(item.id)
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {item.essential && (
                  <span className="ml-auto text-[10px] font-bold text-klar-danger uppercase">
                    Required
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={() => onNext(Math.round(progress / 10))}
        className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white mt-2 active:scale-[0.97] transition-transform"
      >
        Continue
      </Button>
    </div>
  );
}

function DragDropInteractive({
  config,
  onNext,
}: {
  config: Record<string, unknown>;
  onNext: (points: number) => void;
}) {
  const items = (config.items as Array<{
    id: string;
    label: string;
    priority: number;
    points: number;
  }>) ?? [];
  const maxSelections = (config.maxSelections as number) ?? 5;
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { fire: fireConfetti } = useConfetti();
  const { play: playCorrect } = useCorrectSound();

  const toggle = (id: string) => {
    if (showResults) return;
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= maxSelections) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
    const totalPoints = selected.reduce((sum, id) => {
      const item = items.find((i) => i.id === id);
      return sum + (item?.points ?? 0);
    }, 0);
    if (totalPoints >= 35) {
      playCorrect();
      fireConfetti();
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h2 className="text-lg font-bold text-foreground">
        Prioritize your items!
      </h2>
      <p className="text-sm text-muted-foreground">
        {config.instruction as string}
      </p>
      <p className="text-xs font-medium text-klar-primary">
        Selected: {selected.length}/{maxSelections}
      </p>

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          let border = isSelected ? "border-klar-primary bg-klar-primary/5" : "border-border bg-white";
          if (showResults && isSelected) {
            border = item.priority <= 2
              ? "border-klar-success bg-klar-success/10"
              : item.priority <= 4
              ? "border-klar-warning bg-klar-warning/10"
              : "border-klar-danger bg-klar-danger/10";
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 ${border} text-left transition-all active:scale-[0.97]`}
              whileTap={{ scale: 0.97 }}
            >
              <GripVertical size={16} className="text-muted-foreground shrink-0" />
              <span className="text-sm font-medium text-foreground flex-1">
                {item.label}
              </span>
              {isSelected && !showResults && (
                <Check size={16} className="text-klar-primary shrink-0" />
              )}
              {showResults && isSelected && (
                <span
                  className={`text-xs font-bold ${
                    item.priority <= 2
                      ? "text-klar-success"
                      : item.priority <= 4
                      ? "text-klar-warning"
                      : "text-klar-danger"
                  }`}
                >
                  +{item.points}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {!showResults && selected.length === maxSelections && (
        <Button
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-success hover:bg-klar-success/90 text-white active:scale-[0.97] transition-transform"
        >
          Confirm selection
        </Button>
      )}

      {showResults && (
        <Button
          onClick={() => {
            const total = selected.reduce((s, id) => {
              const item = items.find((i) => i.id === id);
              return s + (item?.points ?? 0);
            }, 0);
            onNext(Math.min(10, Math.round(total / 5)));
          }}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white active:scale-[0.97] transition-transform"
        >
          Next
        </Button>
      )}
    </div>
  );
}

function PersonalizeInteractive({
  config,
  onNext,
}: {
  config: Record<string, unknown>;
  onNext: (points: number) => void;
}) {
  const fields = (config.fields as Array<{
    id: string;
    label: string;
    type: string;
    min?: number;
    max?: number;
    default: number | boolean;
    helpText?: string;
  }>) ?? [];
  const [values, setValues] = useState<Record<string, number | boolean>>(() => {
    const defaults: Record<string, number | boolean> = {};
    for (const f of fields) defaults[f.id] = f.default;
    return defaults;
  });

  const update = (id: string, val: number | boolean) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h2 className="text-lg font-bold text-foreground">
        {(config.title as string) ?? "Personalize"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {(config.subtitle as string) ?? ""}
      </p>

      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-white rounded-xl p-4 border border-border/50 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                {field.label}
              </p>
              {field.helpText && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {field.helpText}
                </p>
              )}
            </div>

            {field.type === "stepper" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    update(
                      field.id,
                      Math.max(field.min ?? 0, (values[field.id] as number) - 1)
                    )
                  }
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-bold"
                >
                  -
                </button>
                <span className="text-lg font-bold text-klar-primary w-6 text-center">
                  {values[field.id] as number}
                </span>
                <button
                  onClick={() =>
                    update(
                      field.id,
                      Math.min(field.max ?? 99, (values[field.id] as number) + 1)
                    )
                  }
                  className="w-8 h-8 rounded-full bg-klar-primary flex items-center justify-center text-white font-bold"
                >
                  +
                </button>
              </div>
            )}

            {field.type === "toggle" && (
              <button
                onClick={() => update(field.id, !values[field.id])}
                className={`w-12 h-7 rounded-full relative transition-colors ${
                  values[field.id] ? "bg-klar-success" : "bg-border"
                }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white shadow absolute top-1"
                  animate={{ left: values[field.id] ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={() => onNext(5)}
        className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white mt-2 active:scale-[0.97] transition-transform"
      >
        Save & continue
      </Button>
    </div>
  );
}

/* ─── Completion Screen ──────────────────────────────────────────── */

function CompletionScreen({
  score,
  totalSteps,
  lessonTitle,
  correctAnswers,
  totalQuestions,
  onContinue,
}: {
  score: number;
  totalSteps: number;
  lessonTitle: string;
  correctAnswers: number;
  totalQuestions: number;
  onContinue: () => void;
}) {
  const { fire: fireConfetti } = useConfetti();
  const { play: playCorrect } = useCorrectSound();
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    playCorrect();
    fireConfetti();
    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev >= score) {
          clearInterval(interval);
          return score;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-dvh bg-klar-bg flex flex-col items-center justify-center px-6">
      {/* Animated thumbs up */}
      <motion.div
        className="w-48 h-48 mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <Lottie animationData={thumbsUpAnim} loop autoplay />
      </motion.div>

      <motion.h1
        className="text-2xl font-bold text-foreground mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Amazing!
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {lessonTitle} completed
      </motion.p>

      {/* Stats card */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 w-full max-w-xs mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-center flex-1">
            <p className="text-3xl font-bold text-klar-primary">{displayScore}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Points</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center flex-1">
            <p className="text-3xl font-bold text-foreground">{totalQuestions}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Answered</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center flex-1">
            <p className="text-3xl font-bold text-klar-success">{correctAnswers}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Correct</p>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-klar-accent text-lg font-semibold">+50 XP</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onContinue}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white active:scale-[0.97] transition-transform"
        >
          Next lesson
        </Button>
      </motion.div>
    </div>
  );
}

/* ─── Leaderboard Screen ─────────────────────────────────────────── */

const leaderboardData = [
  { rank: 1, name: "Sofie M.", score: 2450, avatar: "SM" },
  { rank: 2, name: "Jonas K.", score: 2120, avatar: "JK" },
  { rank: 3, name: "Arun P.", score: 1890, avatar: "AP", isYou: true },
  { rank: 4, name: "Emma L.", score: 1650, avatar: "EL" },
];

function LeaderboardScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-dvh bg-klar-bg flex flex-col items-center px-6 pt-16">
      <motion.div
        className="flex items-center gap-2 mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-3xl">🥉</span>
        <h1 className="text-2xl font-bold text-foreground">Bronze League</h1>
      </motion.div>

      <motion.p
        className="text-sm text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Keep learning to climb the ranks!
      </motion.p>

      <motion.div
        className="w-full max-w-xs flex flex-col gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {leaderboardData.map((player, i) => (
          <motion.div
            key={player.rank}
            className={`flex items-center gap-3 p-4 rounded-2xl border ${
              player.isYou
                ? "bg-klar-primary/5 border-klar-primary/30"
                : "bg-white border-border/50"
            } shadow-sm`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <span className="text-lg font-bold text-muted-foreground w-6 text-center">
              {player.rank}
            </span>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                player.isYou
                  ? "bg-klar-primary text-white"
                  : "bg-border text-foreground"
              }`}
            >
              {player.avatar}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${player.isYou ? "text-klar-primary" : "text-foreground"}`}>
                {player.name} {player.isYou && "(You)"}
              </p>
            </div>
            <span className="text-sm font-bold text-muted-foreground">
              {player.score.toLocaleString()} pts
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onContinue}
          className="w-full h-12 rounded-xl text-base font-semibold bg-klar-primary hover:bg-klar-primary-light text-white active:scale-[0.97] transition-transform"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}

/* ─── Markdown Body (simple) ─────────────────────────────────────── */

function MarkdownBody({ text }: { text: string }) {
  // Simple markdown-to-JSX for bold, links, lists, and paragraphs
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-3" />);
      continue;
    }
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(
        <p key={key++} className="font-bold text-foreground text-sm mt-2 mb-1">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <p key={key++} className="text-sm text-foreground/80 leading-relaxed pl-4">
          <span className="text-klar-primary mr-1.5">•</span>
          <InlineMarkdown text={trimmed.slice(2)} />
        </p>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\.\s/)?.[1];
      const rest = trimmed.replace(/^\d+\.\s/, "");
      elements.push(
        <p key={key++} className="text-sm text-foreground/80 leading-relaxed pl-4">
          <span className="text-klar-primary font-semibold mr-1.5">{num}.</span>
          <InlineMarkdown text={rest} />
        </p>
      );
    } else {
      elements.push(
        <p key={key++} className="text-sm text-foreground/80 leading-relaxed">
          <InlineMarkdown text={trimmed} />
        </p>
      );
    }
  }

  return <>{elements}</>;
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle **bold**, [links](url)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Link
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    let firstMatch: { index: number; length: number; node: React.ReactNode } | null = null;

    if (boldMatch?.index !== undefined) {
      firstMatch = {
        index: boldMatch.index,
        length: boldMatch[0].length,
        node: (
          <strong key={i++} className="font-semibold text-foreground">
            {boldMatch[1]}
          </strong>
        ),
      };
    }

    if (linkMatch?.index !== undefined) {
      if (!firstMatch || linkMatch.index < firstMatch.index) {
        firstMatch = {
          index: linkMatch.index,
          length: linkMatch[0].length,
          node: (
            <a
              key={i++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-klar-primary underline"
            >
              {linkMatch[1]}
            </a>
          ),
        };
      }
    }

    if (firstMatch) {
      if (firstMatch.index > 0) {
        parts.push(remaining.slice(0, firstMatch.index));
      }
      parts.push(firstMatch.node);
      remaining = remaining.slice(firstMatch.index + firstMatch.length);
    } else {
      parts.push(remaining);
      remaining = "";
    }
  }

  return <>{parts}</>;
}
