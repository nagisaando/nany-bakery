import React, {useState, useEffect, useRef} from 'react'

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

const Pagination = ({totalPage, listReset, displayNewPageItem}) => {
  const [activePage, setActivePage] = useState(1)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (!isFirstRender.current) {
      displayNewPageItem(activePage)
    }
  }, [activePage])
  useEffect(() => {
    isFirstRender.current = false // toggle flag after first render/mounting
  }, [])
  function changePage(e) {
    let btnValue = e.currentTarget.getAttribute('data-value')
    if (btnValue === 'next' && totalPage > activePage) {
      setActivePage(+activePage + 1)
    } else if (btnValue === 'previous' && activePage > 0) {
      setActivePage(+activePage - 1)
    } else {
      setActivePage(+btnValue)
    }
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
    // displayNewPageItem(activePage)
    //
  }
  return (
    <div className="flex justify-center | md:w-7/12 | mx-auto mt-28">
      {activePage > 1 ? (
        <button
          data-value="previous"
          className="cursor-pointer | flex items-center |  px-2.5  | mr-3 | transition-all ease-in duration-100 |"
          onClick={changePage}
        >
          Previous
        </button>
      ) : (
        ''
      )}

      {
        /* when there is no more than 5 pages  */
        totalPage < 6 && totalPage > 1 ? (
          <ul className="flex justify-between">
            {Array.from({length: totalPage}, (_, i) => (
              <li
                key={i}
                className={`mx-3 | px-2 pt-1 | cursor-pointer | font-medium text-3xs |  ${
                  i + 1 !== 1 && activePage > 3 && activePage < totalPage - 2 && 'hidden'
                } ${i + 1 === activePage && 'text-darkPink'}`}
              >
                <button data-value={i + 1} onClick={changePage}>
                  {i + 1}
                </button>
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
                className={`mx-3 | px-2 pt-1 | cursor-pointer font-medium text-3xs |  ${
                  i !== 1 && activePage > 2 && activePage < totalPage - 1 && 'hidden'
                } ${i + 1 === activePage && 'text-darkPink'}`}
              >
                <button data-value={i + 1} onClick={changePage}>
                  {i + 1}
                </button>
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
                      className={`  mx-3 | px-2 pt-1 | cursor-pointer | font-medium text-3xs ${
                        pageNum === activePage && 'text-darkPink'
                      }`}
                    >
                      <button data-value={pageNum} onClick={changePage}>
                        {pageNum}
                      </button>
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
                  className={`mx-3 | px-2 pt-1 |  | cursor-pointer | font-medium text-3xs ${
                    i !== 1 && activePage > 2 && activePage < totalPage - 1 && 'hidden'
                  } ${pageNum === activePage && 'text-darkPink'}`}
                >
                  <button data-value={pageNum} onClick={changePage}>
                    {pageNum}
                  </button>
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
          Next
        </button>
      ) : (
        ''
      )}
      <style jsx>
        {`
          button {
            transition: all 100ms ease-in;
          }
          button:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </div>
  )
}

export default Pagination
