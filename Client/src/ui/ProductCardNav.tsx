import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa"
import { LuArrowLeftRight } from "react-icons/lu"
import { store } from "../lib/store"
import { ProductsProps } from "../types/type"
import toast from "react-hot-toast"
import { useEffect,useState } from "react" 


const ProductCardNav = ({ product }: { product?:ProductsProps }) => {

    const {addToFavorite,favoriteProduct }=store()
    const [existingProduct, setExistingProduct] = useState< ProductsProps | null>(
        null
      );
    

    useEffect(() => {
        const availableItem = favoriteProduct.find(
          (item) => item?._id === product?._id
        );
    
        setExistingProduct(availableItem || null);
      }, [product, favoriteProduct]);
    
        
  const handleFavorit = () => {
        if (product) {
          addToFavorite(product).then(() => {
            toast.success(
              existingProduct ? `${product?.name.substring(0, 10)} removed successfully!` :
                `${product?.name.substring(0, 10)} added successfully!`
              );
            })
          
          console.log(favoriteProduct);
          
            
            
         
        }

}


  return (
      <div className=" absolute right-1 top-1
      flex flex-col gap-5  transition translate-x-12
         group-hover:translate-x-0 duration-300
      ">
      
      
       <span  onClick={ handleFavorit}  className=" w-11 h-11 inline-flex text-black text-lg
        items-center justify-center rounded-full hover:text-white duration-300 hover:bg-black
        ">

{existingProduct ? <FaStar /> : <FaRegStar />}

</span>
       
      

          <span className=" w-11 h-11 inline-flex text-black text-lg
          items-center justify-center rounded-full hover:text-white duration-300 hover:bg-black
          ">
              <LuArrowLeftRight/>
          </span>

          <span className=" w-11 h-11 inline-flex text-black text-lg
          items-center justify-center rounded-full hover:text-white duration-300 hover:bg-black
          ">
              <FaRegEye/>
          </span>



    </div>
  )
}
 

export default ProductCardNav