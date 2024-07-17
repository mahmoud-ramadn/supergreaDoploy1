import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props{
    showButton?:boolean;
    link?: string;
    className?:string

}



const LinkButton = ({ showButton, link, className }: Props) => {
    const newClassName = twMerge(" flex justify-center items-center gap-2 mt-5 bg-slate-500/90 rounded-md p-4 text-whiteText  duration-200 hover:bg-black",className)


  return (
    <Link to={link?link :"/product"} className={newClassName} >
    
          {showButton&& <FaArrowLeft />} Start Shopping
    </Link>
  );
};

export default LinkButton;
