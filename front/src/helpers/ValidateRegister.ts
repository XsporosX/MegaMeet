import { IRegisterErrors, IRegisterProps } from "@/interfaces/TypesRegister";

export const validationRegister = (data: IRegisterProps) => {
    const errors: IRegisterErrors = {};

    if (!data.username) {
        errors.username = 'Username is required';
    } else if (data.username.length < 3) {
        errors.username = 'Username must be at least 3 characters'; 
    } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores'; 
    }

    if(!data.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if(!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match";
      }
      
      return errors;
};