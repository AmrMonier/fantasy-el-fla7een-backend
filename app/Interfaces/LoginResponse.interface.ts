import User from 'App/Models/User'
export default interface LoginResponse {
  user: User
  type: Array<string>
  token: string
}
