import { MdOutlineStarOutline } from "react-icons/md";
import { ProductsProps } from "../types/type";
import AddToCart from "./AddToCartBtn/AddToCart";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import FormatCurranct from "./FormatCurranct";
import ProductCardNav from "./ProductCardNav";
import { useNavigate } from "react-router-dom";

interface ItemsProps {
  item: ProductsProps;
  setSearchText?:(nt:string)=>string
}

const ProductCard = ({ item,setSearchText  }: ItemsProps) => {

 
  const [isOpen, setIsOpen] = useState(false);
const navigation=useNavigate()
 

  const HandlOpen = () => {
    setIsOpen(true);
  };
  const Percentage = (
    ((item.regularPrice - item.discountedPrice) / item.regularPrice) *
    100
  ).toFixed(0);


  const handleProduct=()=>{
    navigation(`/product/${item?._id}`)
    setSearchText && setSearchText("");
  }

  return (
    <div
      className=" border border-gray-200
    rounded-lg p-1  overflow-hidden hover:border-black duration-200
    cursor-pointer
    "
    >
      <div className="w-full h-60  relative p-2  group">

        {/*productCardside nav */}
        






        <span
          className=" absolute z-10 bg-black text-skyText rounded-md p-1 text-sm"
          onClick={HandlOpen}
        >
    
          save {Percentage}%
        </span>

        <img 
          onClick={handleProduct}
          src={item.images[0]}
          alt="product"
          className=" w-full h-full rounded-md object-cover
             group-hover:scale-110 duration-300
            "
        />

<ProductCardNav product={item}   />


      </div>

      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3
          className=" text-xs uppercase font-semibold
               text-lightText
              "
        >
          {item.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2 ">{item.name}</h2>

        <div
          className=" text-base font-bold text-lightText
              flex items-center 
              "
        >
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>

        <AddToCart  product={item}  />
 
        <Transition   appear show={isOpen} >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center ">
            <DialogPanel className="max-w-lg space-y-4 border text-whiteText  shadow-md  rounded-md  bg-black p-6 m-3">
              <DialogTitle className="font-bold">Hurry up!</DialogTitle>

              <p className="mt-2 text-sm/6 text-white/50">

              
              You are going to save  <FormatCurranct  amount={item.regularPrice - item.discountedPrice}/> from this product.
              </p>
              <p className="text-sm/6 text-white/50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                consequatur?
              </p>
              <div className="flex gap-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => setIsOpen(false)}
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        </Transition>
        
       
      </div>
    </div>
  );
};

export default ProductCard;
