import { useState, React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import QuestionScroller from './QuestionScroller'
import QuestionDisplay from './QuestionDisplay'
import Modal from './Modal'

const QuestionPage = () => {
  const [logged, setLogged] = useState(false)
  const [modalState, setModal] = useState(false)
  const [questions, setQuestions] = useState([])
  const navigate = useNavigate()

  const updateState = async () => {
    try {
      const qs = await axios.get('/api/questions')
      const loggedin = await axios.get('/api/questions/logged')
      setQuestions(qs.data)
      setLogged(loggedin.data)
    } catch (e) {
      // console.log(e)
    }
  }

  const logOut = async () => {
    try {
      const logout = await axios.post('/account/logout', {})
      // console.log(logout)
    } catch (e) {
      // console.log(e)
    }
  }

  useEffect(() => {
    updateState()
    const intervalID = setInterval(() => {
      updateState()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="container mx-auto">
      <Modal state={modalState} setModal={setModal} title="Add a question!" />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between bg-slate-300">
          <h1 className="text-2xl">CAMPUSWIRE LITE</h1>
          <div>
            {logged && (
              <button
                className=""
                type="button"
                onClick={() => {
                  logOut()
                  updateState()
                }}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-12">
          <QuestionScroller logged={logged} questions={questions} setModal={setModal} />
          <QuestionDisplay logged={logged} questions={questions} updateState={updateState} />
        </div>
      </div>
    </div>
  )
}

export default QuestionPage
