import { SalePage } from "types/sale";

type PaginationProps = {
  page: SalePage;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination = ({ page, handleNextPage, handlePreviousPage }: PaginationProps) => {

  return (
    <div className="row d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page.previous_page ? '' : 'disabled'}`}>
            <button className="page-link" onClick={handlePreviousPage}>Anterior</button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">{page.current_page}</span>
          </li>
          <li className={`page-item ${page.next_page ? '' : 'disabled'}`}>
            <button className="page-link" onClick={handleNextPage}>Próxima</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination;