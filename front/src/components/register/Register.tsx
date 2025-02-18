"use client"

import Link from "next/link";
import './Register.css';
import { useState } from "react";
import { IRegisterProps, IRegisterErrors } from "@/interfaces/TypesRegister";
import { validationRegister } from "@/helpers/ValidateRegister";
import RegisterApi from "@/api/RegisterApi";
import { useRouter } from "next/navigation";

function Register() {
    const router = useRouter();
    const initialState: IRegisterProps = { username: "", email: "", password: "", confirmPassword: ""};

    const [userData, setUserData] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterErrors>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationErrors = validationRegister(userData)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
          try {
            const response = await RegisterApi(userData);
            if(response.success) {
                router.push("/login")
            } else {
                setErrors({general: response.errorData?.message || "Registration failed"});
            }
          } catch (error) {
            console.error ("Error in registration:", error);
            setErrors({general: "Error communicating with server"})
          }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const resData = { ...userData, [name]: value};
        setUserData(resData);
        setErrors(validationRegister(resData));
    };

    return (
        <div className="register_container">
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
        </section>
        <section className="register_content">
            <h2 className="register_title">Register</h2>
            <p className="login_description">
            ¡Quick and easy create your account!
          </p>
            <form className="register_form" onSubmit={handleSubmit}>
          <div className="input_container">
            <input 
                type="username"
                id="username"
                name="username"
                placeholder="username"
                required
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && <p className="error_message">{errors.username}</p>}

          <div className="input_container">
            <input 
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error_message">{errors.email}</p>}

          <div className="input_container">
           <input
               type="password"
               id="password"
               name="password"
               placeholder="Password"
               required
               value={userData.password}
               onChange={handleChange}
             />
           </div>
           {errors.password && <p className="error_message">{errors.password}</p>}

          <div className="input_container">
            <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               placeholder="Confirm Password"
               required
               value={userData.confirmPassword}
               onChange={handleChange}
             />
           </div>
           {errors.confirmPassword && <p className="error_message">{errors.confirmPassword}</p>}

           <button className="register_button btn" type="submit">Register</button>
           {errors.general && <p className="error_message">{errors.general}</p>}
        </form>
        </section>
    </div>
    );
}

export default Register;