export default interface HttpResponse {
  message: string
  data?: object | null
  meta?: object | null
  filters?: Object | null
  show?: boolean
  statusCode?: number
}
