type Puzzle = {
  numbers: number[]
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
}

const dailyPuzzles: Puzzle[] = [
  { numbers: [1, 2, 3, 4], difficulty: "Easy" },
  { numbers: [1, 2, 4, 7], difficulty: "Medium" },
  { numbers: [3, 7, 7, 8], difficulty: "Hard" },
  { numbers: [1, 1, 5, 6], difficulty: "Easy" },
  { numbers: [5, 6, 6, 8], difficulty: "Medium" },
  { numbers: [1, 3, 8, 8], difficulty: "Hard" },
  { numbers: [4, 6, 6, 8], difficulty: "Easy" },
  { numbers: [2, 2, 7, 8], difficulty: "Medium" },
  { numbers: [2, 3, 5, 7], difficulty: "Hard" },
  { numbers: [3, 4, 5, 5], difficulty: "Easy" },
  { numbers: [4, 5, 8, 9], difficulty: "Medium" },
  { numbers: [2, 4, 6, 7], difficulty: "Hard" },
  { numbers: [3, 6, 6, 9], difficulty: "Easy" },
  { numbers: [2, 4, 6, 7], difficulty: "Medium" },
  { numbers: [7, 8, 8, 9], difficulty: "Hard" },
  { numbers: [3, 3, 7, 7], difficulty: "Expert" },
]

function getLocalDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getTodaysPuzzle(): Puzzle {
  const launchDate = getLocalDate(new Date("2025-07-23"))
  const today = new Date(getLocalDate(new Date()))
  const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))

  const index = daysSinceLaunch % dailyPuzzles.length
  return dailyPuzzles[index]
}
