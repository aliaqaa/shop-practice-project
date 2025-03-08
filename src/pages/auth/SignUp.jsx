import React from 'react';  
import { useForm } from 'react-hook-form';  
import api from '../../constant/axios.interceptor';  

function SignupForm() {  
  const { register, handleSubmit, formState: { errors } } = useForm();  

  const onSubmit = async (data) => {  
    try {  
      const response = await api.post('v1/users/', { 
        email: data.email,  
        password: data.password  
      });  

      console.log('Signup successful:', response.data);  
      // Handle success (e.g., redirect, show success message)  
    } catch (error) {  
      console.error('Signup failed:', error.response ? error.response.data : error.message);  
      // Handle error (e.g., display error message to the user)  
    }  
  };  

  return (  
    <form onSubmit={handleSubmit(onSubmit)}>  
      <div>  
        <label htmlFor="email">Email:</label>  
        <input  
          type="email"  
          id="email"  
          {...register("email", {  
            required: "Email is required",  
            pattern: {  
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
              message: "Invalid email format"  
            }  
          })}  
        />  
        {errors.email && <p>{errors.email.message}</p>}  
      </div>  

      <div>  
        <label htmlFor="password">Password:</label>  
        <input  
          type="password"  
          id="password"  
          {...register("password", { required: "Password is required", minLength: {value: 6, message: "Password must be at least 6 characters"} })}  
        />  
        {errors.password && <p>{errors.password.message}</p>}  
      </div>  

      <button type="submit">Sign Up</button>  
    </form>  
  );  
}  

export default SignupForm;  