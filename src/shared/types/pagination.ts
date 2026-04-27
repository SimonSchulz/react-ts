export type PaginationProps = {
  page: number
  hasNext: boolean
  hasPrev: boolean
  onChange: (page: number) => void
}
