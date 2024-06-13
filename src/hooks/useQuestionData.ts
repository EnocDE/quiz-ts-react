import { useQuestionStore } from "../store/questions"

export default function useQuestionData() {
  const questions = useQuestionStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unaswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, isCorrectUserAnswer } = question
    if (userSelectedAnswer == null) unaswered++
    if (isCorrectUserAnswer) correct++
    if (userSelectedAnswer !== isCorrectUserAnswer) incorrect++
  })
  return {
    correct,
    incorrect,
    unaswered
  }
}