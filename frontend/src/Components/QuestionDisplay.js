import { useParams } from 'react-router-dom'
import { React, useState } from 'react'
import axios from 'axios'

const QuestionDisplay = ({ questions, logged, updateState }) => {
  const [textArea, setAnswer] = useState('')

  const { id } = useParams()
  const question = id ? questions.find(q => q._id === id) : questions[0]

  console.log(question)
  return (
    <div className="w-1/2">
      {question
      && (
      <div className="flex flex-col">
        <h1 className="text-2xl">{question.questionText}</h1>
        <h1 className="text-md font-bold">Author:</h1>
        <h1 className="text-md">{question.author}</h1>
        {question.answer && <h1 className="text-md">{'Answer: '}</h1>}
        <h1 className="text-md">{question.answer}</h1>
      </div>
      )}
      {logged
        && (
        <form
          className="flex flex-col items-center"
          onSubmit={async e => {
            e.preventDefault()
            await axios.post('/api/questions/answer', { id: question._id, answer: textArea })
            setAnswer('')
            updateState()
          }}
        >
          <textarea value={textArea} placeholder="Enter new answer here!" onChange={e => setAnswer(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        )}
    </div>
  )
}

export default QuestionDisplay
