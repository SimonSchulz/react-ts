export type PaginationProps = {
  page: number
  total: number
  limit: number
  onChange: (page: number) => void
}
