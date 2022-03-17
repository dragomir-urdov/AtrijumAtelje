export interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface Login {
  email: string;
  password: string;
}
