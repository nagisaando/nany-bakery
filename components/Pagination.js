import React, {useState} from 'react'

function middlePage(activePage) {
  const arr = []
  let page = activePage
  let i
  for (i = 0; i < 1; i++) {
    arr.push(page++)
  }
  return arr
}
function lastPage(totalPage) {
  const arr = []
  let page = totalPage
  let i
  for (i = 0; i < 2; i++) {
    arr.unshift(page--)
  }
  return arr
}

const Pagination = ({totalPage, page, listReset, displayNewPageItem}) => {
  const [activePage, setActivePage] = useState(1)
  function changePage(e) {
    let btnValue = e.currentTarget.getAttribute('data-value')
    if (btnValue === 'next' && totalPage > activePage) {
      setActivePage(activePage + 1)
    } else if (btnValue === 'previous' && activePage > 0) {
      setActivePage(activePage - 1)
    } else {
      setActivePage(btnValue)
    }
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
    // displayNewPageItem()
  }
  return (
    <div className="flex justify-center | md:w-7/12 | mx-auto mt-28">
      {activePage > 1 ? (
        <button
          data-value="previous"
          className="cursor-pointer | flex items-center |  px-2.5  | mr-3 | transition-all ease-in duration-100 |"
          onClick={changePage}
        >
          previous
        </button>
      ) : (
        ''
      )}

      {
        /* when there is no more than 5 pages  */
        totalPage < 6 && totalPage > 1 ? (
          <ul className="flex justify-between">
            {totalPage.map((pageNum) => (
              <li
                key={pageNum}
                data-value={pageNum}
                className={`mx-3 | px-2 pt-1 | cursor-pointer | font-bold text-3xs |  ${
                  pageNum !== 1 && activePage > 3 && activePage < totalPage - 2 && 'hidden'
                } ${pageNum === activePage && 'bg-pink'}}`}
                onClick={changePage}
              >
                {pageNum}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )
      }

      {
        /* when there is more than 5 pages  */
        totalPage > 5 ? (
          <ul className="flex justify-between">
            {/* first 2 pages  */}
            {Array.from({length: 2}, (_, i) => (
              <li
                key={i + 'a'}
                data-value={i + 1}
                className={`mx-3 | px-2 pt-1 | cursor-pointer font-bold text-3xs |  ${
                  i !== 1 && activePage > 2 && activePage < totalPage - 1 && 'hidden'
                } ${i + 1 === activePage && 'bg-pink'}`}
                onClick={changePage}
              >
                {i + 1}
              </li>
            ))}
            {
              /* fist "..." when middle page number is selected */
              activePage > 2 && activePage < totalPage - 1 ? (
                <li className="mx-3 1md:mx-4 flex-shrink-0 | pt-1 px-1.5 | flex items-end">
                  <span className="h-5">•••</span>
                </li>
              ) : (
                ''
              )
            }

            {
              /* middle "..." when first 2 or last 2 page is selected or middle number and last '...' */
              activePage < 3 || activePage > totalPage - 2 ? (
                <li className="mx-3 1md:mx-4 flex-shrink-0 | pt-1 px-1.5 |  flex items-end">
                  <span className="h-5">•••</span>
                </li>
              ) : (
                <div className="flex">
                  {middlePage(activePage).map((pageNum, i) => (
                    <li
                      key={i + 'b'}
                      data-value={pageNum}
                      className={`  mx-3 | px-2 pt-1 | cursor-pointer | font-bold text-3xs ${
                        pageNum === activePage && 'bg-pink'
                      }`}
                      onClick={changePage}
                    >
                      {pageNum}
                    </li>
                  ))}

                  <li className="mx-3 1md:mx-4 flex-shrink-0 | px-1.5 flex items-end">
                    <span className="h-5">•••</span>
                  </li>
                </div>
              )
            }

            {
              /* last page  */
              lastPage(totalPage).map((pageNum, i) => (
                <li
                  key={i + 'c'}
                  data-value={pageNum}
                  className={`mx-3 | px-2 pt-1 |  | cursor-pointer | font-bold text-3xs ${
                    i !== 1 && activePage > 2 && activePage < totalPage - 1 && 'hidden'
                  } ${pageNum === activePage && 'bg-pink'}`}
                  onClick={changePage}
                >
                  {pageNum}
                </li>
              ))
            }
          </ul>
        ) : (
          ''
        )
      }

      {totalPage > activePage ? (
        <button
          data-value="next"
          className="cursor-pointer | flex items-center justify-end | py-1.7 px-2.5 | ml-3 | transition-all ease-in duration-100 |"
          onClick={changePage}
        >
          next
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Pagination
