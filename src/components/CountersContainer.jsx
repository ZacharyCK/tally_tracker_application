import { useState, useEffect } from "react"
import Counter from "./Counter"
import AddButton from "./AddButton"

import supabase from "../utils/supabase"

const CountersContainer = ({currentUser}) => {
  const [counterQuantity, setCounterQuantity] = useState(1);
  const [counters, setCounters] = useState([
    {
      id: counterQuantity,
      counter_name: `Counter ${counterQuantity}`,
      counter_quantity: 0
    },
  ]);

  useEffect(() => {
    // Verify whether a user is signed in or not (with user variable prop)
    if(currentUser) {
      const getUserCounters = async () => {
        const {data, error} = await supabase
          .from('counters')
          .select()
          .eq('profile_id', currentUser.id)
        setCounters(data)
      }
      getUserCounters()
    } else {
      setCounters([
        {
          id: counterQuantity,
          counter_name: `Counter ${counterQuantity}`,
          counter_quantity: 0
        }
      ])
      console.log("No User Logged In!")
    }
    // user session confirmed: fetch counters from user counters table in supabase database
    // user session null: don't do anything
  }, [currentUser])

  const addCounter = () => {
    const newQuantity = counterQuantity + 1
    const copyOfCounters = counters.slice()
    const lastCounter = copyOfCounters.length ? copyOfCounters[copyOfCounters.length - 1] : null;
    const newCounter = lastCounter ? {
      id: lastCounter.id + 1,
      counter_name: `Counter ${newQuantity}`,
      counter_quantity: 0
    } :
    {
      id: newQuantity,
      counter_name: `Counter ${newQuantity}`,
      counter_quantity: 0
    };
    console.log(newCounter)
    copyOfCounters.push(newCounter)
    setCounterQuantity(newQuantity)
    setCounters(copyOfCounters)
  }

  const updateUserCount = async (newQuantity, counterId) => {
    // conditional to check and see if there is a current user
    if (currentUser) {
      // update counter entry in supabase database using the id and the new quantity of the counter
      const { error } = await supabase
        .from('counters')
        .update({ counter_quantity: newQuantity })
        .eq('id', counterId)
      if (error) console.log("Error updating counter quantity")
    }
  }

  const incrementCount = (increaseCount, counterId) => {
    const newCounters = counters.slice()
    const counterIndex = newCounters.findIndex((counter) => counter.id === counterId)
    const newCounter = newCounters[counterIndex]
    if (increaseCount) {
      newCounter.counter_quantity += 1
    } else {
      newCounter.counter_quantity -= 1
    }
    updateUserCount(newCounter.counter_quantity, counterId)
    newCounters[counterIndex] = newCounter
    setCounters(newCounters)
}

  const changeName = (counterId, textRef) => {
    const newCounters = counters.slice()
    const counterIndex = newCounters.findIndex((counter) => counter.id === counterId)
    const newCounter = counters[counterIndex]
    const originalCounterName = newCounter.counter_name
    if(textRef.current.innerText) {
        newCounter.counter_name = textRef.current.innerText
    } else {
        console.log(originalCounterName)
        console.log(newCounter)
        newCounter.counter_name = originalCounterName
        console.log(newCounter.counter_name)
        console.log(originalCounterName)
        console.log(newCounter)
    }
    newCounters[counterIndex] = newCounter
    console.log(newCounters)
    setCounters(newCounters)
    console.log(counters)
  }; 

  const handleDeleteCounter = (counterId) => {
    const newQuantity = counterQuantity - 1;
    const indexOfCounter = counters.findIndex((counter) => counter.id === counterId)
    const newCounters = [...counters.slice(0, indexOfCounter), ...counters.slice(indexOfCounter + 1)]
    setCounters(newCounters)
    setCounterQuantity(newQuantity)
  }

  return (
    <div className="flex items-start justify-center z-0">
        <div className="flex flex-wrap flex-col md:flex-row max-w-3xl justify-start">
          {counters.map((counter) => (
            <Counter key={counter.id} ID={counter.id} name={counter.counter_name} count={counter.counter_quantity} handleBlur={changeName} incrementCount={incrementCount} deleteCounter={handleDeleteCounter} />
          ))}
          <AddButton addCounter={addCounter} />
        </div>
    </div>
  )
}

export default CountersContainer