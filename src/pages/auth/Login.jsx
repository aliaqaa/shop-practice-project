import React from "react";  
import { useForm } from "react-hook-form";  
import api from "../../constant/axios.interceptor";  
import { toast } from 'react-hot-toast';  
import { Link, useNavigate } from "react-router"; // Corrected import  
import Cookies from "js-cookie";  

function Login() {  
    const navigate = useNavigate();  
    const {  
        register,  
        handleSubmit,  
        formState: { errors, isValid }, // Destructure isValid  
    } = useForm({  
        mode: "onChange", // Trigger validation on change  
    });  

    const onSubmit = async (data) => {  
        try {  
            const response = await api.post("/v1/auth/login", { // Changed endpoint to login  
                email: data.email,  
                password: data.password,  
            });  

            // Assuming the API returns a token upon successful login  
            const token = response.data.access_token;  

            // Store the token in localStorage or a cookie  
            Cookies.set("token", token);  

            navigate("/landing"); // Redirect to home page or dashboard  
            toast.success('Login successful!');  
        } catch (error) {  
            toast.error(`Login failed: ${error.response ? error.response.data.message : error.message}`);  
        }  
    };  

    return (  
        <form  
            onSubmit={handleSubmit(onSubmit)}  
            className="m-auto my-10 gap-y-2 p-10 bg-slate-300 flex flex-col  w-[600px]"  
        >  
            <h1 className="text-3xl">Login</h1>  

            <div>  
                <input  
                    type="email"  
                    id="email"  
                    className="bg-slate-200 rounded m-2 p-2 w-full"  
                    placeholder="Example@email.com"  
                    {...register("email", {  
                        required: "Email is required",  
                        pattern: {  
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
                            message: "Invalid email format",  
                        },  
                    })}  
                />  
                {errors.email && <p>{errors.email.message}</p>}  
            </div>  

            <div>  
                <input  
                    type="password"  
                    id="password"  
                    className="bg-slate-200 rounded m-2 p-2 w-full"  
                    placeholder="Enter your password"  
                    {...register("password", {  
                        required: "Password is required",  
                    })}  
                />  
                {errors.password && <p>{errors.password.message}</p>}  
            </div>  

            <button type="submit" className={`bg-slate-500 m-auto px-3 py-2  ${!isValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} disabled={!isValid}>  
                Login  
            </button>  
            Not registered yet?  
            <Link to="/" className="text-sky-500">Click Here TO Signup</Link>  
        </form>  
    );  
}  

export default Login;  