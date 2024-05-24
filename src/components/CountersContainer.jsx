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
    const lastCounter = copyOfCounters.length ? copyOfCounters[copyOfCounters.length - 1] : null;
    const newCounter = lastCounter ? {
      id: lastCounter.id + 1,
      name: `Counter ${newQuantity}`,
      count: 0
    } :
    {
      id: newQuantity,
      name: `Counter ${newQuantity}`,
      count: 0
    };
    console.log(newCounter)
    copyOfCounters.push(newCounter)
    setCounterQuantity(newQuantity)
    setCounters(copyOfCounters)
  }

  const incrementCount = (increaseCount, counterId) => {
    const newCounters = counters.slice()
    const counterIndex = newCounters.findIndex((counter) => counter.id === counterId)
    const newCounter = newCounters[counterIndex]
    if (increaseCount) {
      newCounter.count += 1
    } else {
      newCounter.count -= 1
    }
    newCounters[counterIndex] = newCounter
    setCounters(newCounters)
}

  const changeName = (counterId, textRef) => {
    const newCounters = counters.slice()
    const counterIndex = newCounters.findIndex((counter) => counter.id === counterId)
    const newCounter = counters[counterIndex]
    if(textRef.current.innerText) {
        newCounter.name = textRef.current.innerText
    } else {
        newCounter.name = `Counter ${counterId}`
    }
    newCounters[counterIndex] = newCounter
    setCounters(newCounters)
  }; 

  const handleDeleteCounter = (counterId) => {
    const newQuantity = counterQuantity - 1;
    const indexOfCounter = counters.findIndex((counter) => counter.id === counterId)
    const newCounters = [...counters.slice(0, indexOfCounter), ...counters.slice(indexOfCounter + 1)]
    setCounters(newCounters)
    setCounterQuantity(newQuantity)
  }

  return (
    <div className="flex items-start justify-center">
        <div className="flex flex-wrap flex-col md:flex-row max-w-3xl justify-start">
          {counters.map((counter) => (
            <Counter key={counter.id} ID={counter.id} name={counter.name} count={counter.count} handleBlur={changeName} incrementCount={incrementCount} deleteCounter={handleDeleteCounter} />
          ))}
          <AddButton addCounter={addCounter} />
        </div>
    </div>
  )
}

export default CountersContainer