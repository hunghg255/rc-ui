import { useState } from 'react'

import './styles.css'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count => count + 1)}>
        count is:
        {count}
      </button>
    </div>
  )
}
