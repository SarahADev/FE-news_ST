// totalCount
// Bases amount of buttons rendered on limit <-if button is disabled or not
// page no.
// when changed, reinvoked useEffect
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Pagination = ({ page, setPage }) => {
  const limit = 10;
  const totalCount = 36;
  const maxPage = Math.ceil(totalCount/limit)


  const handleBackClick = () => {
    setPage((currPage) => {
      return currPage - 1;
    });
  };

  const handleForwardClick = () => {
    setPage((currPage) => {
      return currPage + 1;
    });
  };

  return (
    <section className="pagination">
      <button
        onClick={() => {
          handleBackClick();
        }}
        disabled={page===1}
      >
        <ChevronLeftIcon className='chevron'/>
      </button>
      <p>{page}</p>
      <button
        onClick={() => {
          handleForwardClick();
        }}
        disabled={page===maxPage}
      >
        <ChevronRightIcon className='chevron'/>
      </button>
    </section>
  );
};

export default Pagination;
