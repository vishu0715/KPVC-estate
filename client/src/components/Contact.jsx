import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord, setLandlord]=useState(null);
    const [message, setMessage]=useState('');
    const onChange = (e) => {
        setMessage(e.target.value)
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            }
            catch(error){
                console.log(error);
            }
        }

        fetchLandlord();

    }, [listing.userRef])
  return (
    <div className=''>
        {landlord && (
            <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username} for
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
            </span></p>
            <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter your message here.....' className='w-full border p-3 rounded-lg'></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-blue-500 text-white font-bold p-3 rounded-lg text-center uppercase hover:opacity-95'>
                Send Message
            </Link>
            </div>
        )}
    </div>
  )
}
