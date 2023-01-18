import { React, useState } from 'react'
import axios from 'axios'

const SearchForm = ({ setSearchActive, setQuery }) => {
  const [textArea, setSearch] = useState('')
  const [searchCrit, setSearchCrit] = useState('users')

  return (
    <div>
      <form
        className="flex flex-row items-center"
        onSubmit={async e => {
          e.preventDefault()
          setSearch('')
          setSearchActive(true)
          setQuery({ query: textArea, crit: searchCrit })
          await axios.post('/api/tweets/search', { query: textArea, crit: searchCrit })
        }}
      >
        <button onClick={() => setSearchActive(false)} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4">Clear Search</button>
        <input type="text" className="border-2 border-black rounded-full w-3/4 mr-8" value={textArea} placeholder="Search users or hashtags" onChange={e => setSearch(e.target.value)} />
        <div>
          <input onClick={() => setSearchCrit('users')} type="radio" id="users" name="drone" value="users" />
          <label htmlFor="users">Users</label>
        </div>

        <div className="mr-4">
          <input onClick={() => setSearchCrit('hashtags')} type="radio" id="hashtags" name="drone" value="hashtags" />
          <label htmlFor="hashtags">Hashtags</label>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Search</button>
      </form>

    </div>

  )
}

export default SearchForm
