export interface CreateUserRequest {
  name: string
  gender: 'L' | 'P'
  birthdate: string
  card_id: string
}

export interface User {
  id: string
  name: string
  gender: 'L' | 'P'
  birthdate: string
  card_id: string
}
