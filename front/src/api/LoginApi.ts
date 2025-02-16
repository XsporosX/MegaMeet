import { ILoginProps } from "@/interfaces/TypesLogin";

export default async function LoginApi(userData: ILoginProps) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${APIURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, errorData };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error communicating with server",
      error,
    };
  }
}
