import React from "react";
import { useLocation } from "../../node_modules/react-router-dom/dist/index";

const CardDetail = () => {

    const location = useLocation();
    const product = location.state.product;

  return (
    <>
      <div className="container py-4 centered" style={{marginTop:'50px'}}>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card">
            <div className="position-relative">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.title}
              />
              <h5 className="card-title position-absolute top-0 start-0 bg-white px-2 py-1 m-2">
                {product.title}
              </h5>
            </div>
            <div className="card-footer">
              <p className="card-text">Price: ${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
