export interface CreateUserRequest {
    name: string | null,
    gender: 'L' | 'P' | null,
    birthdate: Date | null,
    card_id: String,
} 