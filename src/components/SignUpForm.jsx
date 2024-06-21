import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import supabase from '../utils/supabase';

const SignUpForm = ({isDarkTheme}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        const { user, error } = await supabase.auth.signUp({ email, password,
            options: {
                emailRedirectTo: 'https://tally-tracker-application.onrender.com/profilesetup'
            }
         });
        if (error) console.error('Error signing up:', error);
        else console.log('User signed up:', user);
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signIn({
          provider: 'google',
        });
        if (error) console.error('Error signing in with Google:', error);
    };

    return (
        <div className="w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 h-3/5 mx-auto">
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div> 
    )
}
export default SignUpForm