import { useState, useEffect } from "react"
import CountersContainer from "../components/CountersContainer"
import HeaderText from "../components/HeaderText"
import ProfileForm from "../components/ProfileForm"
import supabase from "../utils/supabase"

const HomePage = ({currentUser, counterQuantity, changeCounterQuantity}) => {
  const [profileExists, setProfileExists] = useState(false)
  
  const checkProfile = async () => {
    if (currentUser) {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', currentUser.id)
      if(error) {
        console.log(error)
      } else {
        if (profiles.length) {
          setProfileExists(true)
        }
      }
    }
  }

  checkProfile()

  return (
    <div>
      {profileExists ? 
        <div>
          <HeaderText currentUser={currentUser} />
          <CountersContainer currentUser={currentUser} counterQuantity={counterQuantity} changeCounterQuantity={changeCounterQuantity} />
        </div>
        :
        <ProfileForm currentUser={currentUser} />
      }
      
    </div>
  )
}

export default HomePage