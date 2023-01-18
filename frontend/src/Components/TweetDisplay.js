import { useParams, useNavigate } from 'react-router-dom'
import {
  React, useState, useEffect, useCallback,
} from 'react'
import axios from 'axios'
import ReplyScroller from './ReplyScroller'
import ReplyForm from './ReplyForm'
import LikeHeart from './LikeHeart'
import SearchForm from './SearchForm'

const TweetDisplay = ({ tweets, logged }) => {
  const { id } = useParams()
  const [likemap, setLikeMap] = useState('')
  const [replies, setReplies] = useState([])
  const [tweet, setQuestion] = useState({})
  const navigate = useNavigate()

  const updateState = useCallback(async () => {
    try {
      const rs = await axios.post('/api/tweets/replies', { id })
      const qs = await axios.post('/api/tweets/tweet', { id })
      setReplies(rs.data)
      // console.log(qs)
      setQuestion(qs.data)
    } catch (e) {
      // console.log(e)
    }
  }, [id])

  useEffect(() => {
    updateState()
    const intervalID = setInterval(() => {
      updateState()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [updateState])

  return (
    <div className="w-3/4">
      {tweet
      && (
      <div>
        {tweet.parent && <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate(`/post/${tweet.parent}`)}>{'<-- Back'}</button>}
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex-col">
              <h1 className="text-2xl">{tweet.author}</h1>
              <h1 className="text-xl font-bold">{tweet.tweetText}</h1>
            </div>
            {logged && id && <LikeHeart logged={logged} tweet={tweet} likemap={likemap} setLikeMap={setLikeMap} />}
          </div>
        </div>
      </div>
      )}
      {logged && id
        && (
        <ReplyForm id={id} updateState={updateState} />
        )}
      <div className="mb-8" />
      {logged && id && <ReplyScroller tweets={replies} logged={logged} setModal={false} />}
    </div>
  )
}

export default TweetDisplay
