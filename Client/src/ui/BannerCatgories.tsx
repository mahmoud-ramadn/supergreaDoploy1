import { useState, useEffect } from "react";
import { getData } from "../lib";
import Carousel from "react-multi-carousel";
import { CategoryProps } from "../types/type";
import { Link } from "react-router-dom";
import ArrowLef from "./Arrows/ArrowLef";
import ArrowRight from "./Arrows/ArrowRight";
import { config } from "../../config";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const BannerCatgories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Carousel 
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      transitionDuration={1000}
          className=" flex flex-row p-4 max-w-screen-xl mx-auto lg:p-0 relative"
          
          customLeftArrow={<ArrowLef />}
          customRightArrow={<ArrowRight />}
    >
      {categories.map((item: CategoryProps) => {
        return (
          <Link
            key={item._id}
            to={`category/${item?._base}`}
            
            className="flex items-center gap-2 p-1 border border-gray-100 my-3  
               mr-1
                hover:shadow-lg flex-1
            
                rounded-md hover:border-blue-300 "
          >
            <img
              src={item.image}
              alt="categoryImge"
              className="w-10 h-10 rounded-full object-cover"
            />

                <p className="text-sm  font-semibold" >{ item.name}</p>
          </Link>
        );
      })}
    </Carousel>
  );
};

export default BannerCatgories;
