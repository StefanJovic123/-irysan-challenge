import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'components/ui'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'
import { useTable, useSortBy } from 'react-table'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const DataTable = (props) => {
  const {
    columns,
    data,
    loading,
    onSort,
  } = props

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        manualSortBy: true,
      },
      useSortBy,
    )

  const handleSort = (column) => {
    if (!loading) {
      const { id, isSortedDesc, toggleSortBy, clearSortBy } = column
      const sortOrder = isSortedDesc ? 'desc' : 'asc'
      toggleSortBy(!isSortedDesc)
      onSort?.({ order: sortOrder, key: id }, { id, clearSortBy })
    }
  }

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  {column.render('header') &&
                    (column.sortable ? (
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          handleSort(column)
                        }
                      >
                        {column.render('header')}
                        <span>
                          <Sorter
                            sort={
                              column.isSortedDesc
                            }
                          />
                        </span>
                      </div>
                    ) : (
                      <div>{column.render('header')}</div>
                    ))}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        {loading && data.length === 0 ? (
          <TableRowSkeleton
            columns={columns.length}
          />
        ) : (
          <TBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>
                        {cell.render('cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </TBody>
        )}
      </Table>
    </Loading>
  )
}

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onSort: PropTypes.func,
}

DataTable.defaultProps = {
  data: [],
  columns: [],
  loading: false,
}

export default DataTable
