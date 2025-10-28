export interface UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
  }

export interface signupPayload{
  username: string; 
  email: string; 
  password: string
}