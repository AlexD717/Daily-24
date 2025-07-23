import React, { useState, useEffect } from "react"
import "./Game.css"
import confetti from "canvas-confetti"

const Game: React.FC = () => {
  const initialNumbers = [4, 7, 1, 2]

  const [numbers, setNumbers] = useState<number[]>(initialNumbers)
  const [history, setHistory] = useState<number[][]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [selectedOperator, setSelectedOperator] = useState<string>("")
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [timerActive, setTimerActive] = useState<boolean>(true)
  
  const [passed, setPassed] = useState<boolean>(false)

  const handleNumberClick = (index: number) => {
    if (passed) return

    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index))
    } else if (selectedIndices.length >= 2) {
      setSelectedIndices([selectedIndices[1], index])
      return
    } else {
      setSelectedIndices([...selectedIndices, index])
    }
  }

  const handleOperatorClick = (op: string) => {
    if (passed) return
    setSelectedOperator(op)
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const previous = history[history.length - 1]
    setNumbers(previous)
    setHistory(history.slice(0, -1))
    setSelectedIndices([])
    setSelectedOperator("")
  }

  const handleRestart = () => {
    setNumbers(initialNumbers)
    setHistory([])
    setSelectedIndices([])
    setSelectedOperator("")
    setPassed(false)
    setTimerActive(true)
  }

  const handleShare = () => {
    console.log("Sharing Results")
    const message = `I just played Daily 24 and got to 24 in ${timeElapsed} seconds! Can you beat my time?`
    const url = window.location.href

    if (navigator.share) {
      navigator.share({
        title: "Daily 24 Game",
        text: message,
        url: url
      }).catch((error) => {
        console.error("Error sharing:", error)
        alert("Failed to share. Please try copying the link manually.")
      })
    } else {
      navigator.clipboard.writeText(message + " " + url)
        .then(() => {
          alert("Results copied to clipboard! Share it with your friends.")
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error)
          alert("Failed to copy results. Please try again.")
        })
    }
  }

  useEffect(() => {
    if (selectedIndices.length === 2 && selectedOperator !== "") {
      const [i1, i2] = selectedIndices
      const n1 = numbers[i1]
      const n2 = numbers[i2]

      let result: number
      switch (selectedOperator) {
        case "+": result = n1 + n2; break
        case "-": result = n1 - n2; break
        case "×": result = n1 * n2; break
        case "÷":
          if (n2 === 0) return
          result = n1 / n2
          break
        default: return
      }

      setHistory(prev => [...prev, numbers])

      const [minIndex, maxIndex] = [i1, i2].sort((a, b) => a - b)
      const newNumbers = [...numbers]
      newNumbers[minIndex] = result
      newNumbers.splice(maxIndex, 1)

      setNumbers(newNumbers)
      setSelectedIndices([])
      setSelectedOperator("")

      if (newNumbers.length === 1) {
        confetti({
          particleCount: 600,
          spread: 160,
          origin: { y: 0.6 },
        })
        setPassed(true)
        setTimerActive(false)
      }
    }
  }, [selectedIndices, selectedOperator, numbers])

  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timerActive])

  const getDateString = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    return `${month}/${day}/${year}`
  }

  return (
    <div className="game-container">
      {passed ? (
        <>
          <h1>Congratulations!</h1>
        </>
      ) : (
        <>
          <h1>Get to 24!</h1>
        </>
      )}
      <p>📅 Puzzle for: {getDateString()}</p>
      <p>⏱️ Time: {timeElapsed}</p>

      <div className="number-row">
        {numbers.map((num, idx) => (
          <button
            key={idx}
            onClick={() => handleNumberClick(idx)}
            className={selectedIndices.includes(idx) ? "selected" : ""}
          >
            {new Intl.NumberFormat(undefined, {
              maximumFractionDigits: 2
            }).format(num)}
          </button>
        ))}
      </div>

      <div className="operator-row">
        {["+", "-", "×", "÷"].map((op) => (
          <button
            key={op}
            onClick={() => handleOperatorClick(op)}
            className={selectedOperator === op ? "selected" : ""}
          >
            {op}
          </button>
        ))}
      </div>

      <div className="control-row">
          {passed ? (
            <>
              <button onClick={handleShare}>Share</button>
            </>
          ) : (
            <>
              <button onClick={handleUndo}>Undo</button>
              <button onClick={handleRestart}>Restart</button>
            </>
          )}
      </div>
    </div>
  )
}

export default Game
