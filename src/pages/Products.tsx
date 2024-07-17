import { useState, useEffect } from "react";
import { getData } from "../lib";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../types/type";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import _ from "lodash";
import PriceTag from "../ui/PriceTag";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import FormatCurranct from "../ui/FormatCurranct";
import { IoClose } from "react-icons/io5";
import ProductCard from "../ui/ProductCard";
import AddToCart from "../ui/AddToCartBtn/AddToCart";
import { productPayment } from "../assets";
import CategoryFilters from "../ui/CategoryFilters";
import { config } from "../../config";

const Products = () => {
  const [product, setProducts] = useState<ProductsProps | null>(null);
  const [AllProduct, setAllProducts] = useState<ProductsProps[]>([]);
  const [loding, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();

  const endpoint = id
    ? `${config.baseUrl}/products/${id}`
    : `${config.baseUrl}/products`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);

        if (id) {
          setProducts(data);
          setAllProducts([]);
        } else {
          setProducts(null);
          setAllProducts(data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, endpoint]);

  useEffect(() => {
    if (product) {
      setImgUrl(product.images[0]);
      setColor(product.colors[0]);
    }
  }, [product]);

  return (
    <div>
      {loding ? (
        <Loading />
      ) : (
        <Container>
          {id && product && _.isEmpty(AllProduct) ? (
            <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
              <div className="flex flex-start">
                <div>
                  {product.images.map((item, index) => (
                    <img
                      src={item}
                      alt="imges"
                      key={index}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100  duration-300  
                        
                        
                        ${
                          imgUrl === item
                            ? "border-gray-600  border-2 rounded-md "
                            : ""
                        }  `}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>

                <div>
                  <img src={imgUrl} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className="flex justify-between items-center">
                  <PriceTag
                    regularPrice={product.regularPrice}
                    discountedPrice={product.discountedPrice}
                    className=" text-xl "
                  />
                  <div className=" flex items-center gap-1">
                    <div
                      className="text-base text-lightText
                      flex items-center
                      "
                    >
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                      <MdOutlineStarOutline />
                    </div>
                    <p className=" text-base font-semibold ">
                      ({product.reviews}) reviews
                    </p>
                  </div>
                </div>
                <p className=" flex  items-center gap-1 text-base">
                  {" "}
                  <FaRegEye />{" "}
                  <span className=" tex-[20px] font-bold mr-1 ">
                    {product.reviews}
                  </span>{" "}
                  people are viewing this right now{" "}
                </p>

                <p>
                  You are saving{" "}
                  <FormatCurranct
                    amount={product.regularPrice - product.discountedPrice}
                  />{" "}
                  upon purchase
                </p>

                <div>
                  {color && (
                    <p className="text-base font-semibold">
                      Color :{" "}
                      <span className=" capitalize" style={{ color: color }}>
                        {color}
                      </span>
                    </p>
                  )}

                  <div className="flex justify-start items-center gap-3 my-3">
                    {product.colors.map((item) => (
                      <div
                        key={item}
                        className={` w-9  cursor-pointer rounded-full  h-9
                            
                            
                            ${
                              color === item
                                ? "border-2 border-white   outline outline-gray-700   "
                                : ""
                            } `}
                        style={{
                          backgroundColor: item,
                        }}
                        onClick={() => setColor(item)}
                      />
                    ))}
                  </div>

                  {color && (
                    <button
                      className=" flex  gap-1  hover:text-red-700 
                    duration-200 text-base font-semibold
                    items-center"
                      onClick={() => setColor("")}
                    >
                      {" "}
                      <IoClose /> clear
                    </button>
                  )}
                </div>

                <div>
                  <h3 className=" text-base">
                    Brand:{product.brand}
                    <span className=" font-semibold">{product.isNew}</span>
                  </h3>
                  <h3 className=" text-base">
                    Category:{" "}
                    <span className="text-base font-semibold">
                      {product.category}
                    </span>
                  </h3>
                </div>
                <AddToCart
                  product={product}
                  title="Buy Now"
                  className=" bg-black/80  py-3 text-base text-gray-200 hover:scale-100 hover:text-whiteText  duration-300"
                />
                <div
                  className=" bg-[#f7f7f7] 
                  p-5  rounded-md flex flex-col items-center justify-center gap-2 
                  "
                >
                  <img
                    src={productPayment}
                    alt="productPayment"
                    className=" w-auto object-cover"
                  />
                  <p className=" font-semibold ">
                    Guaranted safe & secure checkout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-10">
              <CategoryFilters id={id} />

              <div>
                <p
                  className="text-4xl font-semibold mb-5 text-center
              "
                >
                  {" "}
                  Products Collection
                </p>

                <div className=" grid gird-cols-2 lg:grid-cols-4 gap-5 md:grid-cols-3 ">
                  {AllProduct.map((e) => {
                    return <ProductCard item={e} key={e._id} />;
                  })}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Products;
