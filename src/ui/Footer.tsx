import Container from "./Container"
import Payment from  "../assets/payment.webp"
import FooterTop from "./FooterrTop"
const Footer = () => {
  return (
    <div className="mt-10 ">

<FooterTop/>

      <Container className="flex  justify-between  items-center  flex-col md:flex-row gap-4">
        <p>@2024 E-commerce solutions. All rights reserved.
        </p>
        <img className="object-cover" src={Payment} alt="imge" />
      </Container>
    </div>
  )
}

export default Footer