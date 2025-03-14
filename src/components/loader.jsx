import { LoaderCircle } from "lucide-react";


const Loader = ({message = '...loading'}) => {

    return (
        <div className="flex flex-col items-center gap-3 text-slate-500 my-5" >
            <LoaderCircle size='36px' className="animate-spin" />
            {message}
        </div>
    )
}

export default Loader