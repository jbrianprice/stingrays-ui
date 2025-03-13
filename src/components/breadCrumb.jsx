import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BreadCrumb = ({ label, path }) => {
    const navigate = useNavigate()
    return (
        <button onClick={()=> navigate(path)} className="tertiary flex items-center gap-1 mb-4">
            <ArrowLeft size="1rem" /> {label}
        </button>
    )
}

export default BreadCrumb
