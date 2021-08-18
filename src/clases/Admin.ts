import { User } from './User.js'

class Admin extends User {
  constructor(
    user_name: string,
    name: string,
    last_name: string,
    email: string,
    role: string
  ) {
    super(user_name, name, last_name, email, role)
  }
}
