import { twMerge } from "tailwind-merge";




const FormatCurranct = ({ amount, className }: {amount:number ,className?:string}) => {
    const newClass=twMerge("text-skyText" ,className)

    const formattedAmount = new Number(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 2,
      });

    
  return (
      <span className={newClass}>{formattedAmount }</span>
  )
}

export default FormatCurranct