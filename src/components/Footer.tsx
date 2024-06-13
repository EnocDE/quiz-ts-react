import { Button } from "@mui/material"
import useQuestionData from "../hooks/useQuestionData"
import { useQuestionStore } from "../store/questions"

export default function Footer() {
  const { correct, incorrect, unaswered } = useQuestionData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ marginTop: '20px', display: "flex", flexDirection: "column", gap: "10px" }}>
      <Button variant="text" onClick={() => reset()}>Reiniciar</Button>
      <strong>Respuestas correctas: {correct}</strong>
      <strong>Respuestas incorrectas: {incorrect}</strong>
      <strong>No contestadas: {unaswered}</strong>
    </footer>
  )
}
