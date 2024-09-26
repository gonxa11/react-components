import PropTypes from 'prop-types';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Table({ headers, data, rowsPerPage }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedRows, setSelectedRows] = useState({});

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const changePage = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const start = currentPage * rowsPerPage;
    const currentData = data.slice(start, start + rowsPerPage);

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const newSelectedRows = {};
        currentData.forEach((row) => {
            newSelectedRows[row.id] = isChecked;
        });
        setSelectedRows(newSelectedRows);
    };

    const handleSelectRow = (event, rowId) => {
        setSelectedRows({
            ...selectedRows,
            [rowId]: event.target.checked,
        });
    };

    const selectedCount = Object.values(selectedRows).filter(Boolean).length;

    const downloadExcel = () => {
        const filteredData = data.filter(row => selectedRows[row.id]);
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    const downloadPDF = () => {
        const filteredData = data.filter(row => selectedRows[row.id]);
        const pdf = new jsPDF();

        const rows = filteredData.map(row => headers.map(header => row[header.toLowerCase()]));
        pdf.autoTable({
            head: [headers],
            body: rows,
        });

        pdf.save('data.pdf');
    };

    return (
        <div className='container-table'>
            <div className="download-buttons">
                <button onClick={downloadExcel} disabled={selectedCount === 0}>Descargar Excel</button>
                <button onClick={downloadPDF} disabled={selectedCount === 0}>Descargar PDF</button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={currentData.every(row => selectedRows[row.id])}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row) => (
                        <tr key={row.id}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex}>{row[header.toLowerCase()]}</td>
                            ))}
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!selectedRows[row.id]}
                                    onChange={(event) => handleSelectRow(event, row.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <strong>{selectedCount} rows selected</strong>
                <div className="paginas-btn">
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
                        Anterior
                    </button>
                    <span>Página {currentPage + 1} de {totalPages}</span>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default Table;
