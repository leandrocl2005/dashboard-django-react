import Pagination from "components/Pagination";
import { useState, useEffect } from "react";
import api from "services/api";
import { Sale, SalePage } from "types/sale";
import { formatLocalDate, round } from "utils/format";

const DataTable = () => {

  const [page, setPage] = useState<SalePage>({
    content: [],
    count: 0,
    next_page: 2,
    current_page: 1,
    previous_page: null,
    total_pages: 0,
    limit: 10,
  });

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        `sales/?limit=${page.limit}&page=${page.current_page}`
      );
      setPage(response.data);
    }
    loadData();
  }, [page.limit, page.current_page]);

  const handleNextPage = () => {
    if (page.next_page) {
      setPage({
        ...page,
        current_page: page.next_page
      })
    }
  }

  const handlePreviousPage = () => {
    if (page.previous_page) {
      setPage({
        ...page,
        current_page: page.previous_page
      })
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {page.content?.map((sale: Sale) => <tr key={sale.id}>
            <td>{formatLocalDate(sale.date, 'dd/MM/yyyy')}</td>
            <td>{sale.seller}</td>
            <td>{sale.svisited}</td>
            <td>{sale.sdeals}</td>
            <td>{round(sale.samount, 2)}</td>
          </tr>)}
        </tbody>
      </table>

      <Pagination page={page} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
    </div>
  );
}

export default DataTable;