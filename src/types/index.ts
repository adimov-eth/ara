export interface User {
  id: number
  username: string
  email?: string
  role: 'SuperAdmin' | 'AravtLeader' | 'User'
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
  skills?: string[]
  tasksCompleted?: number
  completionRate?: number
  tokenBalance?: number
}

export interface Aravt {
  id: number;
  name: string;
  description: string;
  user_father_id: number;
  responsible_user_id: number;
  is_draft: boolean;
  telegram_chat_link: string;
  //aravt_father_id: number;
  leader: User;
  team: User[];
  aravt_father: Aravt | null;
  business: Project[];
  offers: Offer[];
  skills: string[];
  //logo?: string;
}

export interface Feature {
  id: number;
  type: 'community' | 'tasks' | 'rewards';
  title: string;
  description: string;
  badge: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive';
}

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
  id: number,
  title: string,
  description: string,
  link: string,
  reward: number,
  // rewardType: 'AT' | 'USDT';
  defenition_of_done: {},
  responsible_users_ids: [],
  is_done: boolean,
  is_global: boolean
  date_time: string
  priority: 'low' | 'medium' | 'high';
}

export type ProjectStatus = "Posted" | "Not Posted"

export interface Project {
  id: number,
  name: string,
  description: string,
  link: string,
  fundings: string,
  logo: string,
  status: ProjectStatus,
  location: string,
  members: number;
  tasks: Task[],
}

export interface Offer {
  id: number,
  name: string,
  business_id: number,
  description: string,
  is_limited: boolean,
  count_left: number,
  duration: number,
  price: number,
  assets: {}
}

export interface JoinRequest {
  id: number,
  aravt_id: number,
  user: User,
  text: string,
  date_time: string
}