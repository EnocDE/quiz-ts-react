import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import JavaScriptLogo from './components/JavaScriptLogo'
import Start from './components/Start'
import { useQuestionStore } from './store/questions'
import Game from './components/Game'

function App() {
  const questions = useQuestionStore(state => state.questions)
  
  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1' >
            JavaScript quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  )
}

export default App
