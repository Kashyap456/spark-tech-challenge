import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import TweetCard from './TweetCard'

const ReplyScroller = ({ tweets, logged, setModal }) => {
  const navigate = useNavigate()

  return (
    <div className="max-h-screen overflow-y-scroll">
      {tweets && tweets.map(q => <TweetCard tweet={q} />)}
    </div>
  )
}

export default ReplyScroller
