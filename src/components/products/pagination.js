import React from 'react';
import ReactPaginate from 'react-paginate';

export class Pagination extends React.Component {
  render() {
    const { pages, page, onChange } = this.props;

    return (
      <ReactPaginate
        containerClassName="pagination"
        pageClassName="page"
        previousClassName="page"
        previousLinkClassName="page-link"
        nextClassName="page"
        nextLinkClassName="page-link"
        breakClassName="page"
        breakLinkClassName="page-link"
        pageLinkClassName="page-link"
        activeClassName="page-active"
        activeLinkClassName="page-link-active"
        pageCount={pages}
        previousLabel="<"
        nextLabel=">"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        initialPage={page - 1}
        forcePage={page - 1}
        onPageChange={({ selected }) => {
          const selectedPage = selected + 1;
          if (selectedPage !== page && onChange) {
            onChange(selectedPage);
          }
        }}
      />
    );
  }
}

export default Pagination;
