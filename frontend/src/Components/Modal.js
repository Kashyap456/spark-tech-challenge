// using headless.ui modal
import { useState, React } from 'react'
import { Dialog } from '@headlessui/react'
import axios from 'axios'

const Modal = ({
  state, setModal, title, updateState,
}) => {
  const [text, setText] = useState()
  return (
    <Dialog
      open={state}
      onClose={() => setModal(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-sm mx-auto">
          <Dialog.Title>{title}</Dialog.Title>
          <form onSubmit={async e => {
            e.preventDefault()
            await axios.post('/api/questions/add', { questionText: text })
            setText('')
            updateState()
            setModal(false)
          }}
          >
            <textarea value={text} placeholder="Enter new answer here!" onChange={e => setText(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
