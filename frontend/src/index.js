import { createRoot } from 'react-dom/client'
import React from 'react'
import {
  BrowserRouter,
  Routes, Route, Outlet, Link,
} from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import App from './App'
import SignUpPage from './Components/SignUpPage'
import QuestionPage from './Components/QuestionPage'

const app = document.getElementById('app')
const root = createRoot(app)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionPage />}>
          <Route path="/post/:id" />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginForm logged />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)
