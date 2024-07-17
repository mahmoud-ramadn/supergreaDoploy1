import { useState, useEffect } from "react";
import { getData } from "../lib";
import { Link } from "react-router-dom";
import { CategoryProps } from "../types/type";
import Loading from "./Loading";
import { config } from "../../config";

const CategoryFilters = ({ id }: { id: string | undefined }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config.baseUrl}/categories`;
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" hidden md:inline-flex flex-col gap-6">
      <p className=" text-3xl font-bold">Filters</p>

      <div>
        <p
          className="
              text-sm font-semibold underline underline-offset-2 decoration-[1px] mb-2
              "
        >
          SELECT CATEGORIES
        </p>

        <div className=" flex flex-col  gap-y-2 min-w-40">
          {loading ? (
            <Loading />
          ) : (
            categories.map((item: CategoryProps) => (
              <Link
                to={`/category/${item._base}`}
                key={item._id}
                className={`text-base font-medium text-start  underline 
                                     decoration-[1px] decoration-transparent hover:decoration-gray-950
                                     hover:text-black duration-200
                                    underline-offset-2
                                     ${
                                       item._base === id
                                         ? " text-greenText decoration-greenText"
                                         : "  text-lightText       "
                                     }`}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
