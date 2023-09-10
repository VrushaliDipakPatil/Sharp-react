import React from 'react';

const Card = () => {
  const productsArr = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    }
  ];

  return (
    <>
    <div className="container py-4">
      <div className="row">
        {productsArr.map((product, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card">
              <div className="position-relative">
                <img src={product.imageUrl} className="card-img-top" alt={product.title} />
                <h5 className="card-title position-absolute top-0 start-0 bg-white px-2 py-1 m-2">{product.title}</h5>
              </div>
              <div className="card-footer">
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary btn-sm float-end">Add to Cart</button>
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
