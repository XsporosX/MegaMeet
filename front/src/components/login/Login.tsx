"use client";

import Link from "next/link";
import "./Login.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { ILoginErrors, ILoginProps } from "@/interfaces/TypesLogin";
import { validationLogin } from "@/helpers/ValidateLogin";
import LoginApi from "@/api/LoginApi";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const initialState: ILoginProps = { email: "", password: "" };

  const [userData, setUserData] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validationLogin(userData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await LoginApi(userData);
        if (response.success) {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/");
        } else {
          setErrors({ password: "Email or Password incorrect" });
        }
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        setErrors({ password: "Error al comunicarse con el servidor" });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const resData = { ...userData, [name]: value };
    setUserData(resData);
    setErrors(validationLogin(resData));
  };

  return (
      <div className="login_container">
        <section className="welcome_content">
          <h2 className="welcome_title">WELCOME BACK</h2>
          <p className="welcome_description">
            ¡Welcome to MegaMeet, the all-in-one platform that transforms your
            life! <br /> Connect your conversations, meetings, tasks, events,
            and thoughts in one place. <br /> Join us and discover how we can
            simplify your everyday life. <br /> Easily log in or sign up now to
            enjoy a more organized and connected life. <br /> ¡Make every moment
            count with MegaMeet!
          </p>
          <p className="welcome_register">
            Dont have an account? <Link href="/register">Sign up</Link>
          </p>
        </section>
        <section className="login_content">
          <h2 className="login_title">LOGIN</h2>
          <div className="login_social">
            <Link href="#">
              <FaFacebookF />
            </Link>
            <Link href="">
              <FaGoogle />
            </Link>
          </div>
          <p className="login_description">
            ¡Quick and easy access to your account!
          </p>
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="input_container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                required
                value={userData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            {errors.email && <p className="error_message">{errors.email}</p>}

            <div className="input_container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                value={userData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            {errors.password && <p className="error_message">{errors.password}</p>}
          <button className="login_button btn" type="submit">
            Login
          </button>
          </form>
          <p className="login_forgot">
            Forgot your password? <Link href="#">Reset it</Link>
          </p>
        </section>
      </div>
  );
}

export default Login;
