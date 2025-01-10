import React from 'react'

const Pagination = ({className, totalPost,postPerPage, setCurrentPage,currentPage}: {className: string,totalPost: number, postPerPage: any, setCurrentPage: any, currentPage: number}) => {
    let pages = [];
    
    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
       pages.push(i);
    }

  return (
    <div className={className}>
        {pages.map((page, index) => (
            <button
            className={` px-2 border border-[#dad8d8] ${index === 0 && 'rounded-l-[3px]'} ${pages.length - 1 === index && 'rounded-r-[3px]'} ${page === currentPage && 'bg-black text-white'} `}
             key={index}
             onClick={() => setCurrentPage(page)
             }
            >
             {page}
            </button>
        ))}
    </div>
  )
}

export default Pagination