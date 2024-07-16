import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { SignupInput } from "@dednesto/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth=({type}:{type:"signin"|"signup"})=>{
    const navigate=useNavigate()
    const[postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
        
    })

    async function sendRequest(){
        try {
            const response=await axios.post(`${BACKEND_URL}/api/v1/user${type==="signin"?"/signin":"/signup"}`,postInputs)
            const jwt=response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
   
        } catch (error) {
            console.log("error in signup send request")
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>

            
            <div>
            <div className=" text-3xl font-extrabold ">
                Create an account
            </div>
            <div className="text-slate-400">
            {type==="signin"?"Dont have an account ":"Already have an acccout? "}
                <Link to={type==="signin"?"/signup":"/signin"} className="pl-2 underline">{type==="signin"?"signup":"signin"}</Link>
            </div>
            </div>
            <div>
            {type==="signup"?<LebelledInput label="Name" placeholder="Shubham Ghayal" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })}}/>:null}
            <LebelledInput label="Email" placeholder="Shubham15a@gmail.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email:e.target.value
                })}}/>
            <LebelledInput label="Password" type={"password"} placeholder="********" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })}}/>
            </div>
            <div className="py-5">
            <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
              dark:border-gray-700">
                {type==="signin"?"Sign In":"Sign Up"}
              </button>

            </div>

            </div>

            </div>
    </div>
}
interface LebelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}
function LebelledInput({label,placeholder,onChange,type}:LebelledInputType){
    return <div>
    <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type||"text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}