import axios from './axios'
import { useAuthStore, User as LoginUser} from '@/store/auth' 

/*
// Types based on backend schema
export interface User {
  id: number
  username: string
  email?: string
  role_: 'SuperAdmin' | 'AravtLeader' | 'User'
  city?: string
  date_of_birth?: string
  full_name?: string
  is_active: boolean
  is_deleted: boolean
  refered_by_id?: number
  able_to_create_aravt: boolean
  able_to_create_tasks: boolean
  is_leader_of_aravt: boolean
  rating?: number
  aravt_id?: number
}
*/

export interface RegistrationData {
  username: string
  email: string
  password: string
  city: string
  date_of_birth: string
  full_name: string
}

export const api = {
  async login(username: string, password: string): Promise<{ access_token: string, user: LoginUser }> {
    const response = await axios.post('/login/', {username, password})
    return response.data
  },

  async register(data: RegistrationData): Promise<{ message: string }> {
    const response = await axios.post('/registration/', data)
    return response.data
  },

  async complete_registration(token: string): Promise<{ access_token: string }> {
    const response = await axios.get('/complete_registration/'+`${token}`)
    return response.data
  },

  async who_am_i(): Promise<{ message: string }> {
    const { token } = useAuthStore()
    const response = await axios.get('/who_am_i', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },

  async logout(): Promise<void> {
    await axios.post('/auth/logout/')
  }
}