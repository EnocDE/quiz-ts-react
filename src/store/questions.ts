import confetti from "canvas-confetti";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, aswerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0, // posición del array de questions

      fetchQuestion: async (limit: number) => {
        const response = await fetch(`http://localhost:5173/data.json`);
        const result = await response.json();
        const questions = result
          .sort(() => Math.random() - 0.5)
          .slice(0, limit);
        set({
          questions,
        });
      },
      selectAnswer: (questionId, answerIndex) => {
        const { questions } = get();
        const newQuestions = structuredClone(questions);

        const questionIndex = newQuestions.findIndex(
          (question) => question.id === questionId
        );
        const questionInfo = newQuestions[questionIndex];
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

        if (questionInfo?.userSelectedAnswer !== undefined) return;
        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        set({
          questions: newQuestions,
        });
      },
      goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
          set({
            currentQuestion: nextQuestion,
          });
        }
      },
      goPrevQuestion: () => {
        const { currentQuestion } = get();
        const prevQuestion = currentQuestion - 1;

        if (prevQuestion >= 0) {
          set({
            currentQuestion: prevQuestion,
          });
        }
      },
      reset: () => {
        set({
          currentQuestion: 0,
          questions: [],
        });
      },
    }),
    {
      name: "questions",
    }
  )
);
