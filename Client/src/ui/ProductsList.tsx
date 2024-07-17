import Container from "./Container"
import Titel from "./Titel"
import Pagnation from "./pagnation"
import { Link } from "react-router-dom"

const ProductsList = () => {
  return (
      <Container>
          
          <div className=" flex justify-between items-center ">
        <Titel titel="Top Sells Products" />
        <Link
          to="/product"
          className=" relative group  overflow-hidden font-medium"
        >
View All Products          <span
            className=" w-full h-[1px] bg-gray-600
             absolute bottom-0  left-0 -translate-x-[100%]
              group-hover:translate-x-0 duration-300"
          />
        </Link>
          </div>
          <div className=" w-full h-[1px] bg-gray-600 mt-5" />

        <Pagnation    />

          
    </Container>
  )
}

export default ProductsList