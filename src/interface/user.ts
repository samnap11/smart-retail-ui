export interface CreateUserRequest {
  name: string
  gender: 'L' | 'P'
  birthdate: string
  card_id: string
}
