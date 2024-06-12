import React from "react";

function Pagination() {
  return (
    <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
      <ul className="dm-pagination d-flex">
        <li className="dm-pagination__item">
          <a href="#" className="dm-pagination__link pagination-control">
            <span className="la la-angle-left" />
          </a>
          <a href="#" className="dm-pagination__link">
            <span className="page-number">1</span>
          </a>
          <a href="#" className="dm-pagination__link active">
            <span className="page-number">2</span>
          </a>
          <a href="#" className="dm-pagination__link">
            <span className="page-number">3</span>
          </a>
          <a href="#" className="dm-pagination__link pagination-control">
            <span className="page-number">...</span>
          </a>
          <a href="#" className="dm-pagination__link">
            <span className="page-number">12</span>
          </a>
          <a href="#" className="dm-pagination__link pagination-control">
            <span className="la la-angle-right" />
          </a>
          <a href="#" className="dm-pagination__option"></a>
        </li>
        <li className="dm-pagination__item">
          <div className="paging-option">
            <select name="page-number" className="page-selection">
              <option value={20}>20/page</option>
              <option value={40}>40/page</option>
              <option value={60}>60/page</option>
            </select>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
