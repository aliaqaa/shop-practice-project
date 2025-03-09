import React from "react";  
import { useForm } from "react-hook-form";  
import api from "../../constant/axios.interceptor";  
import { toast } from 'react-hot-toast';  
import { Link, useNavigate } from "react-router"; // Correct import for React Router v6  

function SignupForm() {  
    const navigate = useNavigate();  
    const {  
        register,  
        handleSubmit,  
        formState: { errors, isValid }, // Ensure isValid is destructured from formState  
    } = useForm({  
        mode: "onChange" // This is important to trigger validation on change  
    });  

    const onSubmit = async (data) => {  
        try {  
            const response = await api.post("/v1/users/", {  
                name: data.text,  
                email: data.email,  
                password: data.password,  
                avatar: "https://avatar.iran.liara.run/public"  
            });  
            navigate("/login");  
            toast.success('Signup successful!');  
        } catch (error) {  
            toast.error(`Signup failed: ${error.response ? error.response.data.message : error.message}`);  
        }  
    };  

    return (  
        <form  
            onSubmit={handleSubmit(onSubmit)}  
            className="m-auto my-10 gap-y-2 p-10 bg-slate-400 flex flex-col w-[600px] "  
        >  
            <h1 className="text-3xl">Sign Up</h1>  

            <div>  
                <input  
                    type="text"  
                    id="text"  
                    className="bg-slate-200 rounded m-2 p-2 w-full"  
                    placeholder="enter your name"  
                    {...register("text", {  
                        required: "name is required",  
                    })}  
                />  
                {errors.text && <p>{errors.text.message}</p>}  
            </div>  
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
                    placeholder="6 characters required"  
                    {...register("password", {  
                        required: "Password is required",  
                        minLength: {  
                            value: 6,  
                            message: "Password must be at least 6 characters",  
                        },  
                    })}  
                />  
                {errors.password && <p>{errors.password.message}</p>}  
            </div>  

            <button type="submit" className={`bg-slate-500 m-auto px-3 py-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isValid}>  
                Sign Up  
            </button>  
            You Already Signed up?  
            <Link to="/login" className="text-sky-500">Click Here TO Login</Link>  
        </form>  
    );  
}  

export default SignupForm;  