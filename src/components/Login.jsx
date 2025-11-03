import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Login({ setIsLoggedIn, getpasswd }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleAuth = async (event) => {
        event.preventDefault();
        const endpoint = isSignup ? 'signup' : 'login';
        try {
            const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                if (!isSignup) {
                    const data = await res.json();
                    localStorage.setItem('token', data.token);
                    setIsLoggedIn(true);
                    getpasswd(data.token);
                    toast.success('Login successful!');
                } else {
                    toast.success('Signup successful! You can now log in.');
                    setIsSignup(false);
                }
            } else {
                const errorData = await res.json();
                toast.error(errorData.msg || 'Authentication failed.');
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">{isSignup ? 'Sign Up' : 'Log In'}</h2>
                <form onSubmit={handleAuth}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
                        <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline ml-1">
                            {isSignup ? 'Log In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;