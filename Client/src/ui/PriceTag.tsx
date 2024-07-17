import { twMerge } from "tailwind-merge";
import FormatCurranct from "./FormatCurranct";

interface Props {
  regularPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const PriceTag = ({ regularPrice, discountedPrice, className }: Props) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <p className="line-through 
      
     
      
      font-medium">
        <FormatCurranct  amount={regularPrice as number} />
      </p>
      <p className="font-bold  ">
        <FormatCurranct amount={discountedPrice as number} />
      </p>
    </div>
  );
};

export default PriceTag;