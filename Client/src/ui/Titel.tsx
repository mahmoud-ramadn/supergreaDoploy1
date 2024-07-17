
import { twMerge } from "tailwind-merge";
interface Props{
    titel?:string
    className?:string
}



const Titel = ({className ,titel}:Props) => {
    const newClassName = twMerge(
        "font-bold   text-4xl   ", className)
    return <h1 className={newClassName}>

        {titel}
    </h1>  
}

export default Titel