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

export interface CreateAravt {
  name: string
  description: string
  init_user_id: number
}

export interface Task {
  title: string,
  description: string,
  link: string,
  reward: number,
  defenition_of_done: {},
  responsible_users_ids: [],
  is_global: boolean
}

export enum ProjectStatus {
  "Posted",
  "Not Posted",
}

export interface Project {
  name: string,
  description: string,
  link: string,
  fundings: {},
  logo: string,
  Status: ProjectStatus,
  location: string
}

export interface Offer {
  name: string,
  business_id: number,
  description: string,
  is_limited: boolean,
  count_left: number,
  duration: number,
  price: number,
  assets: {}
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
    const response = await axios.get('/who_am_i')
    return response.data
  },

  async reset_password(data: {email: string}): Promise<{ message: string }> {
    const response = await axios.post('/reset_password/', data)
    return response.data
  },

  async reset_password_complete(token: string, data: {new_password: string, repeat_password: string}): Promise<{ message: string }> {
    const response = await axios.put('/reset_password/'+`${token}`, data)
    return response.data
  },

  async users(): Promise<{ message: string }> {
    const response = await axios.get('/users/')
    return response.data
  },

  async users_user(user_id: string): Promise<{ message: string }> {
    const response = await axios.get('/users/user/'+`${user_id}`)
    return response.data
  },

  async users_user_subscribe(user_id: string): Promise<{ message: string }> {
    const response = await axios.post('/users/user/'+`${user_id}` + '/subscribe')
    return response.data
  },

  async users_user_unsubscribe(user_id: string): Promise<{ message: string }> {
    const response = await axios.delete('/users/user/'+`${user_id}` + '/unsubscribe')
    return response.data
  },

  async users_user_let_create_aravt(user_id: string): Promise<{ message: string }> {
    const response = await axios.put('/users/user/'+`${user_id}` + '/let_create_aravt')
    return response.data
  },

  async users_subscriptions(): Promise<{ message: string }> {
    const response = await axios.get('/users/subscriptions/')
    return response.data
  },


  async aravt(): Promise<{ message: string }> {
    const response = await axios.get('/aravt/')
    return response.data
  },

  async aravt_aravt(aravt_id: string): Promise<{ message: string }> {
    const response = await axios.get('/aravt/' + `${aravt_id}`)
    return response.data
  },

  async aravt_create_aravt(data: CreateAravt): Promise<{ message: string }> {
    const response = await axios.post('/aravt/create_aravt/', data)
    return response.data
  },

  async aravt_join(aravt_id: string, data: {aravt_id: number, text: string}): Promise<{ message: string }> {
    const response = await axios.post('/aravt/'+ `${aravt_id}` + '/join', data)
    return response.data
  },

  async aravt_applications(): Promise<{ message: string }> {
    const response = await axios.get('/aravt/applications/')
    return response.data
  },

  async aravt_applications_approve(application_id: string): Promise<{ message: string }> {
    const response = await axios.post('/aravt/applications/' + `${application_id}` + '/approve')
    return response.data
  },

  async aravt_applications_reject(application_id: string): Promise<{ message: string }> {
    const response = await axios.delete('/aravt/applications/' + `${application_id}` + '/reject')
    return response.data
  },

  async aravt_set_description(data: {"description": string, "aravt_id": number}): Promise<{ message: string }> {
    const response = await axios.put('/aravt/set_description', data)
    return response.data
  },

  async aravt_set_task(data: Task): Promise<{ message: string }> {
    const response = await axios.post('/aravt/set_task/', data)
    return response.data
  },

  async aravt_get_tasks(): Promise<{ message: string }> {
    const response = await axios.get('/aravt/get_tasks/')
    return response.data
  },

  async aravt_set_business(data: Project): Promise<{ message: string }> {
    const response = await axios.post('/aravt/set_business/', data)
    return response.data
  },

  async aravt_set_offer(data: Offer): Promise<{ message: string }> {
    const response = await axios.post('/aravt/set_offer/', data)
    return response.data
  },

  async offers(): Promise<{ message: string }> {
    const response = await axios.get('/offers')
    return response.data
  },

  async total_drop(): Promise<{ message: string }> {
    const response = await axios.post('/total_drop/')
    return response.data
  },

  async logout(): Promise<void> {
    await axios.post('/auth/logout/')
  }
}