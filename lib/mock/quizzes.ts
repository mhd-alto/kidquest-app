export type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type QuizChoice = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
  correctChoiceId: string;
};

export type Quiz = {
  id: string;
  courseId: string;
  quizNumber: number;
  title: string;
  description: string;
  questionCount: number;
  estimatedDurationMinutes: number;
  questions: QuizQuestion[];
  passingScorePercent: number; // e.g. 70
};

const QUIZZES: Quiz[] = [
  {
    id: "quiz-1",
    courseId: "course-1",
    quizNumber: 1,
    title: "Alphabet Explorer Quiz",
    description:
      "Test your knowledge of letters and sounds with fun multiple-choice questions.",
    questionCount: 5,
    estimatedDurationMinutes: 7,
    passingScorePercent: 60,
    questions: [
      {
        id: "q1",
        prompt: "Which letter comes after A?",
        choices: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
          { id: "c", text: "C" },
          { id: "d", text: "D" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "q2",
        prompt: "What sound does B make?",
        choices: [
          { id: "a", text: "a-a-a" },
          { id: "b", text: "b-b-b" },
          { id: "c", text: "s-s-s" },
          { id: "d", text: "m-m-m" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "q3",
        prompt: "Pick the vowel letter.",
        choices: [
          { id: "a", text: "B" },
          { id: "b", text: "E" },
          { id: "c", text: "T" },
          { id: "d", text: "G" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "q4",
        prompt: "How many letters are in the word 'CAT'?",
        choices: [
          { id: "a", text: "2" },
          { id: "b", text: "3" },
          { id: "c", text: "4" },
          { id: "d", text: "5" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "q5",
        prompt: "Which one starts with the letter A?",
        choices: [
          { id: "a", text: "Apple" },
          { id: "b", text: "Ball" },
          { id: "c", text: "Car" },
          { id: "d", text: "Dog" },
        ],
        correctChoiceId: "a",
      },
    ],
  },
  {
    id: "quiz-2",
    courseId: "course-1",
    quizNumber: 2,
    title: "Sounds & Words Quiz",
    description: "Match sounds to letters and read simple words correctly.",
    questionCount: 4,
    estimatedDurationMinutes: 6,
    passingScorePercent: 60,
    questions: [
      {
        id: "q1",
        prompt: "Which letter makes the /m/ sound?",
        choices: [
          { id: "a", text: "M" },
          { id: "b", text: "N" },
          { id: "c", text: "P" },
          { id: "d", text: "R" },
        ],
        correctChoiceId: "a",
      },
      {
        id: "q2",
        prompt: "Choose the word that starts with 'C'.",
        choices: [
          { id: "a", text: "Cat" },
          { id: "b", text: "Bat" },
          { id: "c", text: "Hat" },
          { id: "d", text: "Map" },
        ],
        correctChoiceId: "a",
      },
      {
        id: "q3",
        prompt: "What sound does /s/ start with?",
        choices: [
          { id: "a", text: "S" },
          { id: "b", text: "T" },
          { id: "c", text: "L" },
          { id: "d", text: "H" },
        ],
        correctChoiceId: "a",
      },
      {
        id: "q4",
        prompt: "Which one is a vowel?",
        choices: [
          { id: "a", text: "A" },
          { id: "b", text: "B" },
          { id: "c", text: "D" },
          { id: "d", text: "G" },
        ],
        correctChoiceId: "a",
      },
    ],
  },
];

export function getQuizzesForCourse(courseId: string): Quiz[] {
  // UI-only mock mapping. If courseId doesn't match mock IDs,
  // fall back to returning all quizzes (so the UI still renders).
  const direct = QUIZZES.filter((q) => String(q.courseId) === String(courseId));
  return direct.length ? direct : QUIZZES;
}
