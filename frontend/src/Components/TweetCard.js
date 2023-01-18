import React from 'react'
import { useNavigate } from 'react-router-dom'

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate()

  // console.log(tweet)
  return (
    <div className="mb-2 border-2 border-black bg-cyan-200 rounded-md hover:bg-cyan-400 hover:cursor-pointer" onClick={() => navigate(`/post/${tweet._id}`)}>
      <div className="flex justify-between">
        <div className="flex-col">
          {' '}
          <h1>
            { tweet.author }
          </h1>
          <h1>
            { tweet.tweetText }
          </h1>

        </div>
        <h3>{tweet.likes}</h3>
      </div>
    </div>
  )
}

export default TweetCard
