import { useState, useEffect } from "react";
import { store } from "../lib/store";
import { config } from "../../config";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CategoryProps, ProductsProps } from "../types/type";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import Container from "./Container";
import { FaChevronDown } from "react-icons/fa";
import { getData } from "../lib";
import ProductCard from "./ProductCard";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shope", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

const Hearder = () => {
  const { cartProduct, favoriteProduct, currentUser } = store();

  const [searchText, setSearText] = useState("");
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    const filtered = products.filter((item: ProductsProps) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchText]);

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
    <div className="w-full bg-whiteText   md:sticky md:left-0 md:top-0 z-50 ">
      <div
        className=" max-w-screen-2xl mx-auto h-20  items-center
      flex   justify-between px-4 md:gap-4
      xl:px-0
      "
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-44 " />
        </Link>
        <div
          className=" hidden md:hidden lg:inline-flex 
              max-w-3xl w-full relative 
            "
        >
          <input
            value={searchText}
            onChange={(e) => setSearText(e.target.value)}
            type="text"
            placeholder="Search Product..."
            className="
                    w-full flex-1  rounded-full text-gray-900
                    text-lg placeholder:text-base
                  placeholder:tracking-wide
                   shadow-sm ring-1 ring-gray-300 
                    placeholder:text-gray-400
                 placeholder:font-normal fouc:ring-1  focus:ring-darkText sm:text-sm px-4
                 py-2 
                      "
          />
          {searchText ? (
            <IoClose
              onClick={() => setSearText("")}
              className=" text-xl absolute  right-4  top-[50%] translate-y-[-50%]"
            />
          ) : (
            <IoSearchOutline className=" text-xl absolute  right-4  top-[50%] translate-y-[-50%]" />
          )}
        </div>
        {/* Menubar */}

        {searchText && (
          <div className="absolute left-0 top-20 w-full mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-skyText scrollbar-hide">
            {FilteredProducts.length > 0 ? (
              <div
                className=" grid grid-cols-1 md:grid-cols-3  gap-10 p-3
            lg:grid-cols-5 "
              >
                {FilteredProducts.map((item: ProductsProps) => (
                  <ProductCard
                    item={item}
                    key={item._id}
                    setSearchText={setSearText as (nt: string) => string}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md">
                <p className="text-xl font-normal">
                  Nothing matches with your search keywords{" "}
                  <span className="underline underline-offset-2 decoration-[1px] text-red-500 font-semibold">{`(${searchText})`}</span>
                </p>
                . Please try again
              </div>
            )}
          </div>
        )}
        <div className=" flex items-center gap-x-6 text-2xl ">
          <Link to="profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="w-10 h-10 rounded-full object-cover"
                alt="profieimg"
              />
            ) : (
              <FiUser
                className="hover:text-skyText duration-200 cursor-pointer
                    "
              />
            )}
          </Link>

          <Link to={"favorite"}>
            <div className=" relative block">
              <FiStar
                className="hover:text-skyText duration-200 cursor-pointer
                  "
              />

              <span
                className=" inline-flex items-center justify-center
                  bg-redText text-whiteText absolute -top-1  -right-2 text-[10px]
                   rounded-full w-4 h-4 
                  
                  "
              >
                {favoriteProduct.length > 0 ? favoriteProduct.length : 0}
              </span>
            </div>
          </Link>

          <Link to="cart">
            <div className=" relative block">
              <FiShoppingBag
                className="hover:text-skyText duration-200 cursor-pointer
                  "
              />

              <span
                className=" inline-flex items-center justify-center
                  bg-redText text-whiteText absolute -top-1  -right-2 text-[10px]
                   rounded-full w-4 h-4 
                  
                  "
              >
                {cartProduct.length > 0 ? cartProduct.length : 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full bg-darkText text-whiteText">
        <Container
          className="py-2 max-w-4xl flex
          items-center justify-between gap-1
          "
        >
          <Menu>
            <MenuButton className="  rounded-md  border-2 border-solid border-gray-400-400 p-3  flex justify-center items-center gap-3 ">
              Select Category <FaChevronDown className="text-base mt-1" />{" "}
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50"
              >
                {categories.map((item: CategoryProps) => {
                  return (
                    <MenuItem key={item._id}>
                      <Link
                        to={`/category/${item?._base}`}
                        className="flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide"
                      >
                        <img
                          src={item.image}
                          alt="image"
                          className="w-6 h-6 rounded-md"
                        />

                        {item.name}
                      </Link>
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </Transition>
          </Menu>

          {bottomNavigation.map(({ title, link }) => (
            <Link
              key={title}
              to={link}
              className=" uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText cursor-pointer
            duration-200 relative overflow-hidden group
              "
            >
              {title}
              <span
                className="inline-flex w-full h-[1px] bg-whiteText
             absolute bottom-0  left-0   transform -translate-x-[105%]
              group-hover:translate-x-0 duration-300 
            
            "
              />
            </Link>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Hearder;
