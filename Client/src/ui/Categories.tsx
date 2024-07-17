import { useState, useEffect } from "react";
import Container from "./Container";
import Titel from "./Titel";
import { Link } from "react-router-dom";
import { getData } from "../lib";
import { CategoryProps } from "../types/type";
import { config } from "../../config";

const Categories = () => {
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
    <Container>
      <div className=" flex justify-between items-center ">
        <Titel titel="Popular categories" />
        <Link
          to="/category/tvAndAudio"
          className=" relative group  overflow-hidden font-medium"
        >
          View All Categories
          <span
            className=" w-full h-[1px] bg-gray-600
             absolute bottom-0  left-0 -translate-x-[100%]
              group-hover:translate-x-0 duration-300"
          />
        </Link>
      </div>
      <div className=" w-full h-[1px] bg-gray-600 mt-5" />

      <div className=" my-10  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5  ">
        {categories.map((item: CategoryProps) => (
          <Link
            to={`/category/${item._base}`}
            key={item._id}
            className="
                      w-full h-auto relative group overflow-hidden
                      
                      "
          >
            <img
              src={item.image}
              alt="catgoires"
              className=" w-full h-auto rounded-md 
                          group-hover:scale-110 duration-300"
            />
            <div className=" absolute bottom-3 w-full text-center">
              <p className=" text-sm md:text-base font-bold">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
