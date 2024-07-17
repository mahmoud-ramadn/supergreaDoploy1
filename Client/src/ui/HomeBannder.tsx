import Container from "./Container";
import { homeBanner } from "../assets";
import LinkButton from "./LinkButton";
const HomeBannder = () => {
  return (
    <Container className=" relative  py-5 overflow-hidden  ">
      <div className=" relative ">
        <img
          src={homeBanner}
          alt="Banner home"
          className="w-full object-cover h-full rounded-md "
        />
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" />
          </div>
          <div className=" absolute inset-0 flex flex-col justify-center px-10" >
              <h2 className="text-xl md:text-4xl lg:text-6xl text-whiteText">Mi Air Purifier</h2>
              <p className="text-base md:text-lg  font-semibold
              leading-4  text-whiteText/90 max-w-[250px]  mt-4
              ">The new tech gift you are wishing for right here.</p>

              <LinkButton  className=" w-44 flex items-center justify-center bg-whiteText text-darkText
              hover:bg-darkText hover:text-whiteText duration-200
              
              "/>

          </div>


    </Container>
  );
};

export default HomeBannder;
