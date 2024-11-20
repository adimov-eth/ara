import axios from './axios'

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

export interface RegistrationData {
  username: string
  email: string
  password: string
  city: string
  date_of_birth: string
  full_name: string
}

export const api = {
  async register(data: RegistrationData): Promise<{ message: string }> {
    const response = await axios.post('/registration/', data)
    return response.data
  },

  async complete_registration(token: string): Promise<{ message: string }> {
    const response = await axios.get('/complete_registration/'+`${token}`)
    return response.data
  },

  async logout(): Promise<void> {
    await axios.post('/auth/logout/')
  }
}