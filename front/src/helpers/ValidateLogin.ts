import { ILoginErrors, ILoginProps } from "@/interfaces/TypesLogin";

export const validationLogin = (values: ILoginProps): ILoginErrors => {
    const errors: ILoginErrors = {};

    //validar email
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Email is not valid';
    }

    //validar password
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*+-]/.test(values.password)) {
        errors.password = 'Password must contain at least one special character';
    }

    return errors;
}