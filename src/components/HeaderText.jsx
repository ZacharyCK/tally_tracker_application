import { useState } from "react"
import supabase from "../utils/supabase"

const HeaderText = ({currentUser}) => {
    const [userName, setUserName] = useState("")

    const getUserName = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('user_name')
            .eq('id', currentUser.id)
        if(error) {
            console.log(error)
        } else {
            setUserName(profiles[0].user_name)
        }
    }

    getUserName()

    return (
        <div className="text-center mb-5">
            { (currentUser) ? 
                <div>
                    <h1 className="text-3xl">Welcome {userName}!</h1>
                </div> :
                <div>
                    <h1 className="text-3xl mb-2">Welcome to Simple Tally!</h1>
                    <p className="text-xl">If you would like to save your counters click log in to log in or sign up!</p>
                </div>
            }
        </div>
        
    )
}

export default HeaderText