import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import propTypes from "prop-types";

export default function SimpleTable({
  content = [],
  columns = [],
  onRowDoubleClick = null,
}) {
  return (
    <Row xs={8} md={8} lg={12}>
      <Table striped>
        <thead>
          <tr>
            {columns.map((element, index) => (
              <th key={index}>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, index) => (
            <tr
              key={index}
              onDoubleClick={
                onRowDoubleClick ? () => onRowDoubleClick(row[0]) : null
              }
              className={row[3] ? "text-decoration-line-through" : ""}
            >
              {row.map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}

SimpleTable.propTypes = {
  content: propTypes.arrayOf(propTypes.array).isRequired,
  columns: propTypes.arrayOf(propTypes.string).isRequired,
  onRowDoubleClick: propTypes.func,
};
