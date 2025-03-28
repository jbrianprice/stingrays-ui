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
import logo from "../assets/logo2.svg"
import logoDark from "../assets/logo-on-dark.svg"
import googleLogo from "../assets/Google__G__logo.svg"

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const googleProvider = new GoogleAuthProvider() // Create a GoogleAuthProvider instance

    const handleLogin = async (e) => {
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
        <div className=" min-h-screen flex flex-col items-center relative">
            <div className=" player-bg mx-auto py-8 w-full dark:bg-cyan-950 bg-cyan-50">
                <img className="mx-auto max-w-2/3 max-h-12 hidden dark:block" src={logoDark} />
                <img className="mx-auto max-w-2/3 max-h-12 block dark:hidden" src={logo} />
                <p className="text-center pt-8 text-cyan-800 dark:text-cyan-400">A simple app for collecting player metrics</p>
            </div>
            <div className="p-8 w-full h-max max-w-md">
                <div className="flex flex-col gap-4 items-center">
                    <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                        <div className="w-full">
                            {/* <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label> */}
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="w-full">
                            {/* <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label> */}
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                required
                            />
                        </div>

                        {isSignUp && (
                            <div className="w-full">
                                {/* <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Confirm Password
                            </label> */}
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        )}

                        <button
                            className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
                                className="tertiary self-center text-sm"
                                href="#" // Replace with your "forgot password" link
                            >
                                Forgot Password?
                            </button>
                        )}
                        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
                    </form>
                </div>

                <div className="flex items-center gap-2 w-full my-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <div className="h-px w-full bg-light" />
                    <span> Or </span>
                    <div className="h-px w-full bg-light" />
                </div>
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className={`secondary flex items-center gap-2 mx-auto ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    <img src={googleLogo} className="h-4" />
                    Sign in with Google
                </button>

                <p className="text-center text-xs mt-4 text-slate-600 dark:text-slate-400">
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleSignUp}
                                className="tertiary text-sm"
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
                                className="tertiary text-sm"
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
