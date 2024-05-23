import { useState } from "react"
import Counter from "./Counter"
import AddButton from "./AddButton"

const CountersContainer = () => {
  const [counterQuantity, setCounterQuantity] = useState(1);
  const [counters, setCounters] = useState([
    {
      id: counterQuantity,
      name: `Counter ${counterQuantity}`,
      count: 0
    },
  ]);

  const addCounter = () => {
    const newQuantity = counterQuantity + 1
    const copyOfCounters = counters.slice()
    const newCounter = {
      id: newQuantity,
      name: `Counter ${newQuantity}`,
      count: 0
    }
    copyOfCounters.push(newCounter)
    setCounterQuantity(newQuantity)
    setCounters(copyOfCounters)
  }

  const incrementCount = (increaseCount, counterId) => {
    const newCounters = counters.slice()
    const newCounter = counters[counterId - 1]
    if (increaseCount) {
      newCounter.count += 1
    } else {
      newCounter.count -= 1
    }
    newCounters[counterId - 1] = newCounter
    setCounters(newCounters)
}

  const changeName = (counterId, textRef) => {
    const newCounters = counters.slice()
    const newCounter = counters[counterId - 1]
    if(textRef.current.innerText) {
        newCounter.name = textRef.current.innerText
    } else {
        newCounter.name = `Counter ${counterId}`
    }
    newCounters[counterId - 1] = newCounter
    setCounters(newCounters)
  }; 

  const handleDeleteCounter = (counterId) => {
    const indexOfCounter = counters.findIndex((counter) => counter.id === counterId)
    console.log(indexOfCounter)
    const newCounters = [...counters.slice(0, indexOfCounter), ...counters.slice(indexOfCounter + 1)]
    console.log(newCounters)
    setCounters(newCounters)
  }

  return (
    <div className="flex items-start justify-center">
        <div className="flex">
            {counters.map((counter) => (
              <Counter key={counter.id} ID={counter.id} name={counter.name} count={counter.count} handleBlur={changeName} incrementCount={incrementCount} deleteCounter={handleDeleteCounter} />
            ))}
            <AddButton addCounter={addCounter} />
        </div>
    </div>
  )
}

export default CountersContainer