import React from "react";

const Price = ({ hasDiscount, discount, price, noIcon }) => {
  return (
    <div>
      {hasDiscount ? (
        <div className="price-container">
          {!noIcon && (
            <div>
              <h3 className="d-inline-block">
                <i
                  className="fa fa-gift txt--darker-white"
                  style={{ width: "2rem", height: "2rem" }}
                ></i>
              </h3>
              <p
                className="d-inline-block"
                style={{ fontSize: "1.2rem", transform: "translateY(-2px)" }}
              >
                {discount}%
              </p>
            </div>
          )}
          <p className="text-decoration-line-through">${price}</p>
          <p>
            ${(price - price * discount * 0.01).toFixed(2)}
          </p>
        </div>
      ) : (
        <div>
          <p>${price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Price;
