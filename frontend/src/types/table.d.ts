import "@tanstack/react-table"

declare module "@tanstack/react-table" {

  interface TableMeta<TData> {
    refreshData?: () => void
  }

  interface ColumnMeta<
    TData,
    TValue,
  > {
    sortable?: boolean
  }

}