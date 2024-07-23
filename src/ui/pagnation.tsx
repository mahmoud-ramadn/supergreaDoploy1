import { useState,useEffect } from "react"
import { getData } from "../lib"
import ReactPaginate from "react-paginate";

import { ProductsProps } from "../types/type";
import ProductCard from "./ProductCard";
import { config } from "../../config";




interface ItemsProps {
    currentItems:ProductsProps[];
  }
  
 


const Items = ({currentItems}:ItemsProps)=> {
    

    return <div    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {
            currentItems && currentItems.map((item) => (

<ProductCard  key={item._id}  item={item}   />

            ))
        }

    </div>

  }


const Pagnation = () => {




    const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
        const endpoint = `${config.baseUrl}/products`;
        try {
          const data = await getData(endpoint);

            setProducts(data);
            
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }, []);
  



    const itemsPerPage = 15;

  const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);
    
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    setItemStart(newStart);
  };



    return (
        <>
              <Items currentItems={currentItems} />

     <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
      <ReactPaginate
        nextLabel=" "
        onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
        pageCount={pageCount}
                    previousLabel=""
                    pageClassName="mr-6 "
pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    containerClassName=" flex text-base font-semibold py-10"
                    activeClassName=" bg-black text-white"
      />
        <p>
          Products from {itemStart} to {Math.min(endOffset, products?.length)}{" "}
          of {products?.length}
        </p>
      </div>
        
        </>
  )
}

export default Pagnation