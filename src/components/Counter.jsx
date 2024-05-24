import { useState, useRef } from "react"

const Counter = ({ID, name, count, handleBlur, incrementCount, deleteCounter}) => {
    const [isEditable, setIsEditable] = useState(false)
    const textRef = useRef(null)

    const handleDoubleClick = () => {
        setIsEditable(true);
        setTimeout(() => {
          textRef.current.focus();
        }, 0);
    };

    

    return (
        <div className="card w-96 bg-base-300 shadow-xl mb-3">
            <button className="btn btn-square btn-outline w-5 min-h-0 h-5 ml-auto" onClick={() => deleteCounter(ID)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="card-body items-center text-center py-5 px-0">
                <p  className="mb-3 text-xl" 
                    contentEditable={isEditable}    
                    onBlur={() => {
                        handleBlur(ID, textRef)
                        setIsEditable(false)
                    }} 
                    ref={textRef} 
                    onDoubleClick={handleDoubleClick}
                >{name}</p>
                <h2 className="card-title text-6xl mb-5">{count}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-error px-2 text-5xl items-baseline w-16 h-16" onClick={() => incrementCount(false, ID)}>-</button>
                    <button className="btn btn-success px-2 text-5xl items-baseline w-16 h-16" onClick={() => incrementCount(true, ID)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default Counter