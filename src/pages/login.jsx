import React, { useState } from "react"
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    sendPasswordResetEmail,
} from "firebase/auth"
import { app, auth } from "../firebaseConfig" // Assuming you have a firebaseConfig.js file

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null);

    const googleProvider = new GoogleAuthProvider() // Create a GoogleAuthProvider instance

    const handleLogin = async (e) => {
        console.log(email, password)

        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await setPersistence(auth, browserLocalPersistence) // Ensures session persists
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login successful!")
            // Example: navigate('/dashboard');
        } catch (error) {
            console.error("Login failed:", error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            setLoading(false)
            return
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log("Signup successful!")
            setIsSignUp(false) // Switch back to login form after successful signup
        } catch (error) {
            console.error("Signup failed:", error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setLoading(true)

        try {
            await signInWithPopup(auth, googleProvider)
            console.log("Google sign-in successful!")
            // Example: navigate('/dashboard');
        } catch (error) {
            console.error("Google sign-in failed:", error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp)
        setError("") // Clear any previous errors when toggling
    }

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email to reset password")
            return
        }
        try {
            await sendPasswordResetEmail(auth, email)
            setMessage("Password reset email sent!")
            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    {isSignUp ? "Sign Up" : "Login"}
                </h2>
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            required
                        />
                    </div>

                    {isSignUp && (
                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? isSignUp
                                    ? "Signing up..."
                                    : "Logging in..."
                                : isSignUp
                                ? "Sign Up"
                                : "Log In"}
                        </button>
                        {!isSignUp && (
                            <button
                                onClick={() => handleForgotPassword()}
                                className="tertiary inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
                                href="#" // Replace with your "forgot password" link
                            >
                                Forgot Password?
                            </button>
                        )}
                    </div>
                    {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className={`mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        Sign in with Google
                    </button>
                </div>

                <p className="text-center text-gray-600 text-xs mt-4">
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleSignUp}
                                className="font-semibold text-blue-500 hover:text-blue-800 focus:outline-none"
                            >
                                Log In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleSignUp}
                                className="font-semibold text-blue-500 hover:text-blue-800 focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default LoginScreen
