import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../types/type";
import { getData } from "../lib";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import CategoryFilters from "../ui/CategoryFilters";
import ProductCard from "../ui/ProductCard";
import { config } from "../../config";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config.baseUrl}/categories/${id}`;
      try {
        setLoading(true)
        const data = await getData(endpoint);

          setProducts(data);
          
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
      setLoading(false)
        
      }
    };
    fetchData();
  }, [id]);
  const formatId = (id: string) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  return (
    <div>{
    
      loading ? <Loading /> : <Container> 
        

        <h2 className=" text-4xl text-center font-semibold mb-5">
          {formatId(id!)}
        </h2>
        <div className=" flex  gap-10 items-start ">
          <CategoryFilters id={id} />
          

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            {
              products.map((item: ProductsProps) => (
                <ProductCard item={item} key={ item._id} />

              ))

  }

            

          </div>
        </div>

</Container>


    }
    
    </div>
  )
}

export default Category