export interface IUserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IChangePassword {
  newPassword: string;
  oldPassword: string;
}
