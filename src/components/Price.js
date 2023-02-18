import React from "react";

const Price = ({ hasDiscount, discount, price, noIcon }) => {
  return (
    <div>
      {hasDiscount ? (
        <div className="price-container">
          {!noIcon && <h3><i className="fa fa-gift txt--red" style={{width: "2rem", height: "2rem"}}></i></h3>}  
          <p className="txt--gray text-decoration-line-through">${price}</p>
          <p className="txt--black">${(price - price * discount * 0.01).toFixed(2)}</p>
        </div>
      ) : (
        <div>
          <p className="txt--black">${price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Price;
