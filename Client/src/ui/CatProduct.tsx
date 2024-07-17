import { ProductsProps } from "../types/type";
import { Link } from "react-router-dom";
import FormatCurranct from "./FormatCurranct";
import AddToCartBtn from "./AddToCartBtn/AddToCart";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { store } from "../lib/store";
import toast from "react-hot-toast";

interface cartProps {
  product?: ProductsProps;
}

const CatProduct = ({ product }: cartProps) => {
  const { removeFromCart } = store();

  const handleRemoveProduc = () => {
    if (product) {
      removeFromCart(product?._id as number);

      toast.success(`${product?.name.substring(0, 20)} deleted successfully!`);
    }
  };

  return (
    <div
      className=" flex items-center   w-full   my-5  gap-5 justify-start  p-5
      "
    >
      <Link to={`/product/${product?._id}`}>
        <div className=" w-[140px]  flex justify-center items-center ">
          <img
            src={product?.images[0]}
            alt="cartimg"
            className="  w-[200px]  object-cover 
                   duration-300
                  rounded-md  border border-skyText
                  hover:border-sky-800

                  "
          />
        </div>
      </Link>
      <div className=" w-full  relative">
        <h1 className=" w-1/2">{product?.name.substring(0, 80)}</h1>
        <p className=" text-sm">Brand:{product?.brand}</p>
        <p className=" text-sm">Brand:{product?.category}</p>
        <div className="flex  items-center gap-4">
          <p className="text-base font-semibold">
            <FormatCurranct
              className="  text-black"
              amount ={(product?.regularPrice ) as number}
            /> 
          </p>

          <AddToCartBtn showPrice={false} product={product} />
        </div>

        <p className=" flex items-center gap-3">
          <FaCheck className=" text-green-600" />
          <span className=" text-gray-700"> In Stock </span>
        </p>

        <p>
          You are saving{" "}
          <span>
            {" "}
            {
              <FormatCurranct
                className="text-green-600"
                amount={(product?.regularPrice as number) - (product?.discountedPrice  as number)}
              />
            }
          </span>{" "}
          upon purchase
        </p>

        <div className="mt-4 sm:mt-0 sm:pr-9">
          <div className="absolute right-0 top-0">
            <button
              onClick={handleRemoveProduc}
              className="-m2 inline-flex p-2 text-gray-600 hover:text-red-600"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatProduct;
