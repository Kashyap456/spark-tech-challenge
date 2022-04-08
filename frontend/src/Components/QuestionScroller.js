import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import QuestionCard from './QuestionCard'

const QuestionScroller = ({ questions, logged, setModal }) => {
  const navigate = useNavigate()

  return (
    <div className="w-3/12 max-h-3/4">
      {(!logged) && (
      <button
        className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        type="button"
        onClick={() => {
          navigate('../login', { replace: true })
        }}
      >
        Log in to add answers!
      </button>
      )}
      {(logged) && (
      <button
        className="mb-2 w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4"
        type="button"
        onClick={() => {
          setModal(true)
        }}
      >
        Add a Question
      </button>
      )}
      {questions.map(q => <Link className="block mb-2 border-2 border-black rounded-md" to={`/post/${q._id}`}>{q.questionText}</Link>)}
    </div>
  )
}

export default QuestionScroller
