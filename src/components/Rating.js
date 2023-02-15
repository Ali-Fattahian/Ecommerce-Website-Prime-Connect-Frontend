import React from "react";

const Rating = ({ ratingNum, reviewCount }) => {
  ratingNum = Number(ratingNum);
  const intPart = Math.floor(ratingNum); // Number of full stars
  const decimalPart = ratingNum - intPart; // Number of half stars
  const remaning = Math.floor(5 - ratingNum); // Number of empty stars

  const filledStars = [];
  for (let i = 0; i < intPart; i++) {
    filledStars.push(
      <span className="star">
        <i className="fa fa-star txt--orange" key={i}></i>
      </span>
    );
  }

  const emptyStars = [];
  for (let i = 0; i < remaning; i++) {
    emptyStars.push(
      <span className="star">
        <i className="fa fa-star-o txt--orange" key={i}></i>
      </span>
    );
  }

  return (
    <div>
      {filledStars}
      {decimalPart > 0 && (
        <span className="star">
          <i className="fa fa-star-half-full txt--orange"></i>
        </span>
      )}
      {emptyStars}
      <p className="txt--gray">{ratingNum} out of {reviewCount} reviews</p>
    </div>
  );
};

export default Rating;
