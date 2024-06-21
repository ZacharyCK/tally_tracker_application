import { useState, useEffect } from "react"
import Counter from "./Counter"
import AddButton from "./AddButton"

import supabase from "../utils/supabase"

const CountersContainer = ({currentUser, counterQuantity, changeCounterQuantity}) => {
  
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
      const getAllCounters = async () => {
        let numberOfUserCounters = 0;
        const {data, error} = await supabase
          .from('counters')
          .select()
        setCounters(data)
        numberOfUserCounters = data.filter((data) => data.profile_id === currentUser.id).length
        changeCounterQuantity(numberOfUserCounters)
      }
      getAllCounters()
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

  const insertCounter = async (newCounter) => {
    const { data, error } = await supabase
      .from('counters')
      .insert([
        { counter_name: newCounter.counter_name, counter_quantity: newCounter.counter_quantity, profile_id: newCounter.profile_id },
      ])
      .select()
    console.log(data)
  }

  const addCounter = () => {
    const newQuantity = counterQuantity + 1 // number of counters increases by 1
    const copyOfCounters = counters.slice() // create a copy of the counters array
    const lastCounter = copyOfCounters.length ? copyOfCounters[copyOfCounters.length - 1] : null; // get last counter in array
    const newCounter = !currentUser ?  // if there are other counters in the array
      lastCounter ?  {
        id: lastCounter.id + 1,
        counter_name: `Counter ${newQuantity}`,
        counter_quantity: 0
      } : {
        id: newQuantity,
        counter_name: `Counter ${newQuantity}`,
        counter_quantity: 0
      }
    : { // if there are NOT other counters in the array
      id: lastCounter.id + 1,
      counter_name: `Counter ${newQuantity}`,
      counter_quantity: 0,
      profile_id: currentUser.id
    };
    if (currentUser) insertCounter(newCounter) // insert new counter into supabase database if a user is signed in
    console.log(newCounter)
    copyOfCounters.push(newCounter)
    changeCounterQuantity(newQuantity)
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

  const updateNameInDB = async (counterName, counterId) => {
    const { data, error } = await supabase
      .from('counters')
      .update({ counter_name: counterName })
      .eq('id', counterId)
      .select()
    if (!error) {
      console.log(data)
    } else {
      console.log(error)
    }
  }

  const changeName = (counterId, textRef) => {
    const newCounters = counters.slice()
    const counterIndex = newCounters.findIndex((counter) => counter.id === counterId)
    const newCounter = newCounters[counterIndex]
    if(textRef.current.innerText) {
        newCounter.counter_name = textRef.current.innerText
    } else {
        newCounter.counter_name = `Counter ${counterQuantity}`
    }
    newCounters[counterIndex] = newCounter
    updateNameInDB(newCounter.counter_name, counterId)
    setCounters(newCounters)
  }; 

  const deleteCounterInDB = async (counterId) => {
    const { error } = await supabase
      .from('counters')
      .delete()
      .eq('id', counterId)
    if(error) {
      console.log(error)
    }
  }

  const handleDeleteCounter = (counterId) => {
    const newQuantity = counterQuantity - 1;
    const indexOfCounter = counters.findIndex((counter) => counter.id === counterId)
    const newCounters = [...counters.slice(0, indexOfCounter), ...counters.slice(indexOfCounter + 1)]
    deleteCounterInDB(counterId)
    setCounters(newCounters)
    changeCounterQuantity(newQuantity)
  }

  return (
    <div className="flex items-start justify-center z-0">
        <div className="flex flex-wrap flex-col md:flex-row max-w-3xl justify-start">
          {currentUser ? counters.filter((counter) => counter.profile_id === currentUser.id).map((userCounter) => (
            <Counter key={userCounter.id} ID={userCounter.id} name={userCounter.counter_name} count={userCounter.counter_quantity} handleBlur={changeName} incrementCount={incrementCount} deleteCounter={handleDeleteCounter} />
          )) : counters.map((counter) => (
            <Counter key={counter.id} ID={counter.id} name={counter.counter_name} count={counter.counter_quantity} handleBlur={changeName} incrementCount={incrementCount} deleteCounter={handleDeleteCounter} />
          ))}
          <AddButton addCounter={addCounter} />
        </div>
    </div>
  )
}

export default CountersContainer