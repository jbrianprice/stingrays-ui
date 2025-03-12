import { useRef } from "react"
import { firestoreDB as db } from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

const Home = () => {
    const messageRef = useRef()
    const ref = collection(db, "test-collection")

    const handleSave = async (e) => {
        e.preventDefault()

        const data = {
            name: messageRef.current.value,
        }

        try {
            addDoc(ref, data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className=" bg-stone-50 flex flex-col items-center justify-center">
        <h1>Home page</h1>
            <form onSubmit={(e) => handleSave(e)}>
                <label>Player name</label>
                <input type="text" ref={messageRef} />
                <button className=" mt-3" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Home
