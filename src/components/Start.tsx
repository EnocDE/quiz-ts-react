import { Button } from "@mui/material";
import { useQuestionStore } from "../store/questions";

const LIMIT_QUESTIONS = 5

export default function Start() {
  const fetchQuestions = useQuestionStore(state => state.fetchQuestion)
  const handleClick = () => fetchQuestions(LIMIT_QUESTIONS)
  return (
    <Button onClick={handleClick} variant="contained" style={{marginTop: "20px"}}>Empezar</Button>
  )
}
