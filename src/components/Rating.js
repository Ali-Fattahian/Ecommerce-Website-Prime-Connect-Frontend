import React from "react";
import FilledStarIcon from "../icons/FilledStarIcon";
import HalfStarIcon from "../icons/HalfStarIcon";
import EmptyStarIcon from "../icons/EmptyStarIcon";

const Rating = ({ ratingNum, reviewCount, noText }) => {
  ratingNum = Number(ratingNum);
  const intPart = Math.floor(ratingNum); // Number of filled stars
  const decimalPart = ratingNum - intPart; // Number of half stars
  const remaning = Math.floor(5 - ratingNum); // Number of empty stars

  const filledStars = [];
  for (let i = 0; i < intPart; i++) {
    filledStars.push(
      <span className="star" key={i}>
        <FilledStarIcon />
      </span>
    );
  }

  const emptyStars = [];
  for (let i = 0; i < remaning; i++) {
    emptyStars.push(
      <span className="star" key={i}>
        <EmptyStarIcon />
      </span>
    );
  }

  return (
    <div className="rating-component">
      {filledStars}
      {decimalPart > 0 && (
        <span className="star" key={decimalPart}>
          <HalfStarIcon />
        </span>
      )}
      {emptyStars}
      {!noText
        ? reviewCount && (
            <p className="mx-2 d-inline-block">
              {ratingNum} ({reviewCount})
            </p>
          )
        : ""}
    </div>
  );
};

export default Rating;
