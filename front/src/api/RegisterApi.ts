import { IRegisterProps } from "@/interfaces/TypesRegister";

export default async function RegisterApi(userData: IRegisterProps) {
    const APIURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${APIURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
          } else {
            const errorData = await response.json();
            return { success: false, errorData };
          }
    } catch (error) {
        console.error("Error in registration API:", error);
        return { success:false }
    }
}