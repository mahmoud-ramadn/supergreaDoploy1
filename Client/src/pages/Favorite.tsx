import { store } from "../lib/store"
import { ProductsProps } from "../types/type"
import Container from "../ui/Container"
import FavoriteProduct from "../ui/FavoriteProduct"
import Titel from "../ui/Titel"
import {Link } from "react-router-dom"

const Favorite = () => {


  const { favoriteProduct}=store()


  
  
  return (
    <div>
      <Container className="" >
        <Titel titel="Favorite Products" />
        <p className=" text-sm text-gray-500 w-1/2 leading-5 font-semibold ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias laboriosam sapiente eaque nisi doloribus aliquid perspiciatis error rerum adipisci veritatis, quae cupiditate deserunt ex explicabo quis velit rem asperiores minus. </p>
        <div className=" w-full h-[1px] bg-gray-600 mt-5  " />
        {
          favoriteProduct.length > 0 ? 
            
            <div className=" flex flex-col gap-10" >

              {
                favoriteProduct.map((item: ProductsProps) => (
                  <FavoriteProduct product={item} key={item?._id}/>
                ))
              }


            </div>
            
            
            
            
            : 
            (
              <div className=" flex max-w-3xl flex-col gap-3  my-5 items-center mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Nothing added to Favorite
                </h2>
                <p className="text-lg tracking-wide leading-6 text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
                  harum ducimus, quod amet pariatur omnis ex dolorem, distinctio
                  molestiae aspernatur iste aperiam nostrum tempore accusamus modi
                  quos culpa corrupti ea.
                </p>
                <Link
                  to={"/product"}
                  className="w-full mt-2 rounded-md border border-transparent px-8 py-3 text-base font-medium text-amber-900 bg-gray-100 sm:w-auto hover:bg-black hover:text-white duration-200"
                >
                  Add Products
                </Link>
              </div>
            
            )

        
          
           
}        
      </Container>
   </div>
  )
}

export default Favorite