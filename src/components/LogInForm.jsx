import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../utils/supabase';

const LogInForm = ({isDarkTheme, url}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isSignUpForm, setIsSignUpForm] = useState(false)

    const navigate = useNavigate();

    const handleChangeText = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const getUrl = (needSignedUp) => {
        let redirectURL = ''
        if (needSignedUp) {
            redirectURL += `http://localhost:5173/profilesetup`
        } else {
            redirectURL += `http://localhost:5173`
        }
        return redirectURL
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        console.log(e.target.id)
        if (e.target.id === 'emailLogIn') {
            const {email, password} = formData;
            const {data, error} = await supabase.auth.signInWithPassword({email, password});
            if(error) {
                console.error('Error signing in: ', error);
            } else {
                console.log('User signed in: ', data.user);
                navigate('/')
            }
        } else if (e.target.id === 'googleLogIn') {
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: getUrl(false)
                }
            })  
            if(error) {
                console.error('Error signing in: ', error);
            } else { 
                console.log('User signed in: ', data);
            }           
        }
        
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        console.log(e.target.id)
        if (e.target.id === 'emailLogIn') {
            const {email, password} = formData;
            const {error} = await supabase.auth.signUp({email, password});
            if(error) {
                console.error('Error signing in: ', error);
            } else {
                alert('An email was sent to you to authenticate your account')
            }
        } else if (e.target.id === 'googleLogIn') {
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: getUrl(true)
                }
            })  
            if(error) {
                console.error('Error signing in: ', error);
            } else { 
                console.log('User signed in: ', data);
            }           
        }
        
    }

    const changeToSignUp = (e) => {
        e.preventDefault()
        setIsSignUpForm(!isSignUpForm)
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
            <h1 className='text-2xl text-center'>{isSignUpForm ? 'Sign Up' : 'Log In'}</h1>
            <form style={{width: '100%'}}>
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
                <div>
                    <button id='emailLogIn' name='emailLogIn' onClick={isSignUpForm ? handleSignUp : handleSignIn} className="btn btn-success btn-block mt-3">{isSignUpForm ? 'Sign Up' : 'Log In'}</button>
                </div>
                <div>
                    <button id='googleLogIn' name='googleLogIn' onClick={isSignUpForm ? handleSignUp : handleSignIn} className="btn btn-block mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" className='w-6'>
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        {isSignUpForm ? 'Sign Up With Google' : 'Log In With Google'}
                    </button>
                </div>
                <div>
                    <button id='signUp' name='signUp' className="btn btn-block mt-3" onClick={changeToSignUp}>
                        {isSignUpForm ? `Have An Account? Log In` : `Don't Have An Account? Click Here to Sign Up`}
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default LogInForm