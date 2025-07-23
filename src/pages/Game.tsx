import React, { useState, useEffect } from "react"
import "./Game.css"

const Game: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([4, 7, 1, 2])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [selectedOperator, setSelectedOperator] = useState<string>("")

  const handleNumberClick = (index: number) => {
    if (selectedIndices.includes(index)){
        setSelectedIndices(selectedIndices.filter(i => i !== index))
    }
    else if (selectedIndices.length >= 2) {
        setSelectedIndices([selectedIndices[1], index])
        return
    }
    else {
        setSelectedIndices([...selectedIndices, index])
    }
  }

  const handleOperatorClick = (op: string) => {
    setSelectedOperator(op)
  }

  useEffect(() => {
    if (selectedIndices.length === 2 && selectedOperator !== "") {
        const [i1, i2] = selectedIndices
        const n1 = numbers[i1]
        const n2 = numbers[i2]
        console.log(`Calculating: ${n1} ${selectedOperator} ${n2}`)

        let result: number
        switch (selectedOperator) {
        case "+": result = n1 + n2; break
        case "-": result = n1 - n2; break
        case "×": result = n1 * n2; break
        case "÷":
            if (n2 === 0) return // INFO cannot divide by zero or non-integer result
            result = n1 / n2
            break
        default: return
        }
        console.log(`Result: ${result}`)

        const [minIndex, maxIndex] = [i1, i2].sort((a, b) => a - b)

        const newNumbers = [...numbers]
        newNumbers[minIndex] = result
        newNumbers.splice(maxIndex, 1)

        setNumbers(newNumbers)
        setSelectedIndices([])
        setSelectedOperator("")

        if (newNumbers.length == 1) {
            if (newNumbers[0] === 24) {
                alert("Congratulations! You reached 24!")
            }
        }
    }
  }, [selectedIndices, selectedOperator, numbers])

  return (
    <div className="game-container">
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
          <button key={op} 
            onClick={() => handleOperatorClick(op)}
            className={selectedOperator === op ? "selected" : ""}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Game
