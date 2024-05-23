const AddButton = ({addCounter}) => {
  return (
    <div className="card w-72 bg-base-300 shadow-xl">
        <div className="flex flex-col justify-around items-center text-center py-5 px-0 h-full">
            <p  className="mb-3 text-xl">Add Counter</p>
            <button className="btn btn-outline -mt-8 px-2 text-5xl items-baseline w-16 h-16" onClick={addCounter}>+</button>
        </div>
    </div>
  )
}

export default AddButton