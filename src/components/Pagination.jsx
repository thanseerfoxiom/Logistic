// import React from "react";

// function Pagination(table, ) {
//   return (
//     <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
//       <ul className="dm-pagination d-flex">
//         <li className="dm-pagination__item">
//           <button onClick={()=>console.log(table.previousPage())} disabled={table.getCanPreviousPage()} className="dm-pagination__link pagination-control">
//             <span className="la la-angle-left" />
//           </button>
//           <a href="#" className="dm-pagination__link">
//             <span className="page-number">1</span>
//           </a>
//           <a href="#" className="dm-pagination__link active">
//             <span className="page-number">2</span>
//           </a>
//           <a href="#" className="dm-pagination__link">
//             <span className="page-number">3</span>
//           </a>
//           <a href="#" className="dm-pagination__link pagination-control">
//             <span className="page-number">...</span>
//           </a>
//           <a href="#" className="dm-pagination__link">
//             <span className="page-number">12</span>
//           </a>
//           <a href="#" className="dm-pagination__link pagination-control">
//             <span className="la la-angle-right" />
//           </a>
//           <a href="#" className="dm-pagination__option"></a>
//         </li>
//         <li className="dm-pagination__item">
//           <div className="paging-option">
//             <select name="page-number" className="page-selection">
//               <option value={20}>20/page</option>
//               <option value={40}>40/page</option>
//               <option value={60}>60/page</option>
//             </select>
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;


import React from "react";

function Pagination({ table }) {
  return (
    <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
      <ul className="dm-pagination d-flex">
        <li className="dm-pagination__item">
          <button 
            onClick={() => table.setPageIndex(0)} 
            disabled={!table.getCanPreviousPage()} 
            className="dm-pagination__link pagination-control"
          >
            <span className="la la-angle-left" />
          </button>
          {table.getPageOptions().map((page, index) => (
            <a 
              key={index} 
              href="#" 
              className={`dm-pagination__link  ${table.getState().pagination.pageIndex === index ?  'active' : ''}`}
              hidden={Math.abs(table.getState().pagination.pageIndex - index) > 1 }
              onClick={(e) => {
                e.preventDefault();
                table.setPageIndex(index);
              }}
            >
              <span className="page-number">{page + 1} </span>
            </a>
          ))}
          <button 
  onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
  disabled={!table.getCanNextPage()} 
  className="dm-pagination__link pagination-control"
>
  <span className="la la-angle-right" />
</button>
        </li>
        <li className="dm-pagination__item">
          <div className="paging-option">
            <select 
              name="page-number" 
              className="page-selection"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[2, 40, 60].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}/page
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
