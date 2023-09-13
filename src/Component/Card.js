import React from 'react';
import { useCart } from './CartContext';
import Heading from './Heading';
import CardDetail from './CardDetail';
import { Link } from '../../node_modules/react-router-dom/dist/index';

const Card = () => {

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    let emailid = 'test1gmailcom';
fetch(`https://crudcrud.com/api/e415a7cfb2774ac2aab845aaf3068416/cart${emailid}`, {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify({
    productId:product.productId,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
  })
})
.then(response => response.json())
.then(data => console.log(data))
  //  addToCart(product)

  };
  

  const productsArr = [
    {
      productId:1,
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      productId:2,
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      productId:3,
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      productId:4,
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    }
  ];


  return (
    <>
    <Heading/>
    <div className="container py-4">
      <div className="row">
        {productsArr.map((product, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card">
              <div className="position-relative" >
              <Link to={`/${product.productId}`} state={{ product }}>
                <img src={product.imageUrl} className="card-img-top" alt={product.title}/>
                <h5 className="card-title position-absolute top-0 start-0 bg-white px-2 py-1 m-2">{product.title}</h5>
              </Link>
              </div>
              <div className="card-footer">
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary btn-sm float-end" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="text-center mt-4 py-4">
        <button className="btn btn-primary">See Cart</button>
      </div>
    </>
  );
};

export default Card;
