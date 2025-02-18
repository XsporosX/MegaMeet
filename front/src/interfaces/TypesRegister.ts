export interface IRegisterProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterErrors  {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}