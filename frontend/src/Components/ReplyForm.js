import { React, useState } from 'react'
import axios from 'axios'

const ReplyForm = ({ id, updateState }) => {
  const [textArea, setAnswer] = useState('')

  return (
    <form
      className="flex flex-row items-center"
      onSubmit={async e => {
        e.preventDefault()
        setAnswer('')
        await axios.post('/api/tweets/reply', { parent: id, tweetText: textArea })
        updateState()
      }}
    >
      <textarea className="border-2 border-black rounded-full w-3/4 mr-10" value={textArea} placeholder="Reply..." onChange={e => setAnswer(e.target.value)} />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
    </form>
  )
}

export default ReplyForm
