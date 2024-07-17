import "react-multi-carousel/lib/styles.css";
import BannerCatgories from "./ui/BannerCatgories"
import HomeBannder from "./ui/HomeBannder";
import Highlights from "./ui/Highlights";
import Categories from "./ui/Categories";
import ProductsList from "./ui/ProductsList";
import DiscountBannder from "./ui/DiscountBannder";
import Blog from "./ui/Blog"

const App = () => {



  return (<main>

    <BannerCatgories />
    
    <HomeBannder />
    <Highlights/>
    
    <Categories /> 
    
    <ProductsList/>
  
    <DiscountBannder />
    <Blog/>
    
  </main>
    
  )
}

export default App