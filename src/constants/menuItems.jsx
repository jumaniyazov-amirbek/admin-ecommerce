import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import home from '../icons/home.svg'
import Products from '../icons/products.png'
import Categories from '../icons/icons8-categories-25.png'
import Brands from '../icons/icons8-louis-vuitton-a-french-fashion-house-and-luxury-retail-company-24.png'
import Banners from '../icons/width 64.png'
export const menuItems = [
    {
      key: '1',
      icon: <img src={home} alt="" />,
      label: <Link to='/'>Home</Link>,
    },
    {
      key: '2',
      icon: <img src={Products} alt="" />,
      label: <Link to='/products'>Products</Link>,
    },
    {
      key: '3',
      icon:  <img src={Categories} alt="" />,
      label: <Link to='/categories'>Categories</Link>,
    },
    {
      key: '4',
      icon: <img src={Brands} alt="" />,
      label: <Link to='/brand'>Brands</Link>,
    },
    {
      key: '5',
      icon: <img src={Banners} alt="" />,
      label: <Link to='/banners'>Banners</Link>,
    },
    
  ]