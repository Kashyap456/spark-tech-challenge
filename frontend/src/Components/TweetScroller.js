import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TweetCard from './TweetCard'

const TweetScroller = ({ tweets, logged, setModal }) => {
  const navigate = useNavigate()

  return (
    <div className="max-h-screen w-3/12 overflow-y-scroll">
      {(!logged) && (
      <button
        className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
        type="button"
        onClick={() => {
          navigate('../login', { replace: true })
        }}
      >
        Log in to tweet!
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
        Tweet!
      </button>
      )}
      {tweets.map(q => <TweetCard tweet={q} />)}
    </div>
  )
}

export default TweetScroller
