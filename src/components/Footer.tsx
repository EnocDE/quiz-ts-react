import useQuestionData from "../hooks/useQuestionData"

export default function Footer() {
  const { correct, incorrect, unaswered } = useQuestionData()

  return (
    <footer style={{ marginTop: '20px', display: "flex", flexDirection: "column", gap: "10px" }}>
      <strong>Respuestas correctas: {correct}</strong>
      <strong>Respuestas incorrectas: {incorrect}</strong>
      <strong>No contestadas: {unaswered}</strong>
    </footer>
  )
}
