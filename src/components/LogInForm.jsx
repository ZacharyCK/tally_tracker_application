import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../utils/supabase';

const LogInForm = ({isDarkTheme}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChangeText = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const {email, password} = formData;
        console.log(email, password)
        const {data, error} = await supabase.auth.signInWithPassword({email, password});
        if(error) {
            console.error('Error signing in: ', error);
        } else {
            console.log('User signed in: ', data.user);
            navigate('/')
        }
    }

    // const signInWithGoogle = async () => {
    //     const { error } = await supabase.auth.signIn({
    //       provider: 'google',
    //     });
    //     if (error) console.error('Error signing in with Google:', error);
    // };

    // useEffect(() => {
    //     supabase.auth.onAuthStateChange((event, session) => {
    //         if (event === 'SIGNED_IN') {
    //             console.log('SIGNED_IN', session)
    //             navigate("/")
    //         } 
    //     })
    // }, [])

    return (
        <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 h-3/5 mx-auto">
            <h1 className='text-2xl text-center'>Log In</h1>
            <form onSubmit={handleSignIn} style={{width: '100%'}}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email:</span>
                    </div>
                    <input type="email" placeholder="Type here" name="email" value={formData.email} onChange={handleChangeText} className="input input-bordered w-full" />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password:</span>
                    </div>
                    <input type="password" placeholder="Type here" name="password" value={formData.password} onChange={handleChangeText} className="input input-bordered w-full" />
                </label>
                <button className="btn btn-success mt-3" type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogInForm