import React,{ useState, useEffect } from 'react';
import  axios from 'axios';

const account=()=>{
    const [data,setData]=useState({
        username:'',
        email:'',
        password:'',
        phone:'',
        address:'',
        city:'',
        state:'',
        zip:''
    });

    useEffect(()=>{
        const fetchAccount=async()=>{
            try{
                const response=await axios.get('/api/account');
                console.log(response.data);
                setData(response.data);
            }catch(error){
                console.error(error);
            }
        };
        fetchAccount();
    }
    ,[]);

    return(
    <div className='flex flex-row justify-between'>

        <div className='flex flex-col w-1/4'>
            <h1 className='text-2xl font-serif underline text-center'>Account Information</h1>
            <p className='text-lg font-serif'>Username: </p>
            <p className='text-lg font-serif'>Email: </p>
            <p className='text-lg font-serif'>Password: </p>
            <p className='text-lg font-serif'>Phone Number: </p>
            <p className='text-lg font-serif'>Address: </p>
            <p className='text-lg font-serif'>City: </p>
            <p className='text-lg font-serif'>State: </p>
            <p className='text-lg font-serif'>Zip Code: </p>

            <div className='flex flex-row justify-between'>
                <button className='bg-blue-950 border-2 rounded-md text-white text-lg font-serif'>Edit</button>
                <button className='bg-blue-950 text-white border-2 rounded-md text-lg font-serif'>Delete</button>
            </div>
        </div>

        <div className='flex flex-col'>
            <h1 className='text-2xl font-serif underline text-center mr-10'>Your Information</h1>
        </div>
    </div>
    )
}

export default account;