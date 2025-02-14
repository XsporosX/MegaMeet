export default async function LoginApi() {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${APIURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "saul@saulemail.com",
      password: "123456",
    }),
  });
  const data = await response.json();
  return data;
}
