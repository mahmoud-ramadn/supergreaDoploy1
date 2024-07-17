import { twMerge } from "tailwind-merge";


interface Props{
    amount:undefined | number ,
    className?: string;
}

const FormatCurranct = ({ amount, className }: Props) => {
    const newClass=twMerge("text-skyText  " ,className)

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