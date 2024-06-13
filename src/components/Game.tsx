import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from "../store/questions"
import { type Question as QuestionType } from "../types.d"
import Footer from "./Footer"

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  const commonStyles = { color: "white" }
  if (userSelectedAnswer == null) return { background: "transparent" }
  if (index !== correctAnswer && index !== userSelectedAnswer) return { background: "transparent" }
  if (index === correctAnswer) return { background: "seagreen", ...commonStyles }
  if (index === userSelectedAnswer) return { background: "crimson", ...commonStyles }
}

const Question = ({ info }: { info: QuestionType }) => {

  const selectAnswer = useQuestionStore(state => state.selectAnswer)
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined" sx={{ textAlign: 'left', p: 2 }}>

      <Typography variant="h5">
        {info.question}
      </Typography>

      <SyntaxHighlighter customStyle={{ paddingBlock: '30px' }} language="javascript" style={monokai} >
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ border: '1px solid #f2f2f2', borderBottom: 'none', fontWeight: 'bold' }} disablePadding>
        {
          info.answers.map((answer, index) =>
            <ListItem key={index} disablePadding divider onClick={createHandleClick(index)} sx={getBackgroundColor(info, index)}>
              <ListItemButton >
                <ListItemText primary={answer} />
              </ListItemButton>
            </ListItem>
          )
        }
      </List>

    </Card>
  )
}

export default function Game() {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  const nextQuestion = useQuestionStore(state => state.goNextQuestion)
  const prevQuestion = useQuestionStore(state => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  const disablePrevQuestion = currentQuestion === 0
  const disableNextQuestion = currentQuestion === questions.length - 1
  return (
    <>
      <Stack direction='row' gap={2} justifyContent='center' alignItems='center' sx={{ marginBlock: '20px' }}>

        <IconButton disabled={disablePrevQuestion} onClick={prevQuestion}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton disabled={disableNextQuestion} onClick={nextQuestion}>
          <ArrowForwardIos />
        </IconButton>

      </Stack>
      
      <Question info={questionInfo} />

      <Footer />
    </>
  )
}
