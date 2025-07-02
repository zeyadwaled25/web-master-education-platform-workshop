import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { motion } from "motion/react"
import Layout from './components/Layout/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <motion.div animate={{ x: 50 }} class="text-3xl font-bold underline">
    <Layout/>
  </motion.div>

    </>
  )
}

export default App
