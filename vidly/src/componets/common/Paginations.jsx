import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

function Paginations({ pageLength, pageSize, currentPage, onPageChange }) {
  console.log(currentPage);
  const pageCount = Math.ceil(pageLength / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <Pagination aria-label="Page navigation example">
      {pages.map((page) => (
        <PaginationItem
          className={currentPage === page ? "active" : ""}
          key={page}
        >
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
}

Paginations.propTypes = {
  pageLength: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Paginations;
