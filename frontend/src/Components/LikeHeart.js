import {
  React, useState, useEffect, useCallback,
} from 'react'
import axios from 'axios'

const LikeHeart = ({
  logged, tweet, likemap, setLikeMap,
}) => {
  const id = tweet._id
  return (
    <div className="flex-col">
      {' '}
      <h1 className="text-2xl">{tweet.likes}</h1>
      <svg
        onClick={async () => {
          if (logged) {
            if (!likemap[id]) {
              setLikeMap({ ...likemap, [id]: 'none' })
            }
            if (likemap[id] === 'none') {
              setLikeMap({ ...likemap, [id]: 'red' })
              await axios.post('/api/twitter/like', { _id: id, like: 1 })
            } else {
              setLikeMap({ ...likemap, [id]: 'none' })
              await axios.post('/api/twitter/like', { _id: id, like: -1 })
            }
          }
        }}
        className="h-8 w-8 text-red-500"
        viewBox="0 0 24 24"
        fill={likemap[id] || 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
  )
}

export default LikeHeart
