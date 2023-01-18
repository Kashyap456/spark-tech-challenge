import {
  useState, React, useEffect, useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TweetScroller from './TweetScroller'
import TweetDisplay from './TweetDisplay'
import Modal from './Modal'
import SearchForm from './SearchForm'

const HomePage = () => {
  const [logged, setLogged] = useState(false)
  const [modalState, setModal] = useState(false)
  const [tweets, setTweets] = useState([])
  const [search, setSearchActive] = useState(false)
  const [query, setQuery] = useState({})
  const navigate = useNavigate()

  const updateState = useCallback(async () => {
    try {
      console.log(search)
      if (search) {
        const qs = await axios.post('/api/tweets/search', query)
        console.log(qs)
        setTweets(qs.data)
      } else {
        const qs = await axios.get('/api/tweets')
        setTweets(qs.data)
      }
      const loggedin = await axios.get('/api/tweets/logged')
      setLogged(loggedin.data)
    } catch (e) {
      // console.log(e)
    }
  }, [query, search])

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
  }, [updateState])

  return (
    <div className="container mx-auto">
      <Modal state={modalState} setModal={setModal} title="Tweet!" />
      <div className="flex flex-col">
        <div className="flex flex-row justify-between bg-slate-300">
          <h1 className="text-2xl">FAKE TWITTER</h1>
          <SearchForm setSearchActive={setSearchActive} setQuery={setQuery} />
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
          <TweetScroller logged={logged} tweets={tweets} setModal={setModal} />
          <TweetDisplay logged={logged} tweets={tweets} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
