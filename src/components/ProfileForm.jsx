import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../utils/supabase"

const ProfileForm = ({currentUser}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        user_name: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCreateProfile = async (event) => {
        event.preventDefault();
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('Profiles')
            .insert({ 
                id: user.id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                user_name: formData.user_name,
                email: user.email 
            })
        
        if(!error) {
            navigate('/')
        }
    }

   
    return (
            <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 h-3/5 mx-auto">
                <form onSubmit={handleCreateProfile} style={{width: '100%'}}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">First Name:</span>
                    </div>
                    <input type="text" placeholder="Type here" name="first_name" value={formData.first_name} onChange={handleChange} className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Last Name:</span>
                    </div>
                    <input type="text" placeholder="Type here" name="last_name" value={formData.last_name} onChange={handleChange} className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Tally Tag:</span>
                    </div>
                    <input type="text" placeholder="Type here" name="user_name" value={formData.user_name} onChange={handleChange} className="input input-bordered w-full" />
                </label>
                <button className="btn btn-success mt-3" type="submit">Complete Profile</button>
                </form>
            </div>
    )
}

export default ProfileForm