import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
         <img src={listing.imageUrls[0] || "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="listing cover"  className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
         <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-red-600'/>
                <p className='text-sm text-gray-600 truncate'>
                {listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold'>
                $
                {listing.offer ? listing.discountedPrice : listing.regularPrice}
                {listing.type === 'rent' && ' / Month'}
            </p>
            <div className='text-slate-700 flex gap-4'>
                <div className='font-bold text-x-5'>
                     {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom` }
                </div>
                <div className='font-bold text-x-5'>
                     {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom` }
                </div>
            </div>
         </div>
        </Link>
    </div>
  )
}
