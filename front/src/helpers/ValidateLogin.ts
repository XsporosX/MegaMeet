import { ILoginErrors, ILoginProps } from "@/interfaces/TypesLogin";

export const validationLogin = (values: ILoginProps): ILoginErrors => {
    const errors: ILoginErrors = {};

    //validar email
    if (!values.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'El email no es válido';
    }

    //validar password
    if (!values.password) {
        errors.password = 'El password es requerido';
    } else if (values.password.length < 8) {
        errors.password = 'El password debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'El password debe tener al menos una letra mayúscula';
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = 'El password debe tener al menos una letra minúscula';
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'El password debe tener al menos un número';
    } else if (!/[!@#$%^&*+-]/.test(values.password)) {
        errors.password = 'El password debe tener al menos un caracter especial';
    }

    return errors;
}