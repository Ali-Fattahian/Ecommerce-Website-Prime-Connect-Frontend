import React from "react";
import Pagination from "react-bootstrap/Pagination";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {
  if (keyword) {
    keyword = keyword.split("?query=")[1].split('&')[0]; // Before &page=?
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`/?query=${keyword}&page=${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
