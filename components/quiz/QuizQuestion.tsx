"use client";

import { QuizQuestion } from "@/lib/mock/quizzes";

export default function QuizQuestionView({
  question,
  selectedChoiceId,
  onSelectChoice,
}: {
  question: QuizQuestion;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
}) {
  return (
    <div className="rounded-xl2 bg-white border border-creamdeep p-6">
      <p className="font-display font-700 text-ink text-lg mb-4">
        {question.prompt}
      </p>

      <div className="flex flex-col gap-3">
        {question.choices.map((c) => {
          const selected = selectedChoiceId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectChoice(c.id)}
              className={`text-left rounded-2xl px-4 py-3 border transition-colors ${
                selected
                  ? "bg-sky/15 border-sky/30"
                  : "bg-white border-creamdeep hover:border-coral/50"
              }`}>
              <span className="font-display font-700 text-ink">{c.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
