// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(rentListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
        try {
          const res= await fetch('/api/listing/get?offer=true&limit=4');
          const data = await res.json();
          setOfferListings(data);
          fetchRentListings();
        } catch (error) {
          console.log(error);
        }
    }
    const fetchRentListings = async () => {
      try {
         const res= await fetch('/api/listing/get?type=rent&limit=4');
         const data = await res.json();
         setRentListings(data);
         fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async () => {
      try {
         const res= await fetch('/api/listing/get?type=sale&limit=4');
         const data = await res.json();
         setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);
  return (
    <div>
     
     <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1  className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find a place you'll <span className='text-slate-500'>dream</span> 
          <br/>
          to stay
        </h1>
      <div className='text-gray-400 text-xs sm:text-sm'>
        KPVC Estate will help you find your next stay fast, easy, comfortable.
        <br />
        We have wide range of properties available 🏠.
      </div>
      <Link to={'/search'} className='text-xs sm:text-sm text-green-600 font-bold hover:underline '>
         Start your search now...
      </Link>
     </div>
      <Swiper navigation>
      {
        offerListings &&offerListings.length > 1 && (
             offerListings.map((listing) => (
              <SwiperSlide>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} className='h-[500px]'>
              </div>
              </SwiperSlide>
             ))
        )
      }
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length > 1 && (
            <div className=''>
               <div className='my-3'>
                 <h2  className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                 <Link className='text-green-500 text-sm hover:underline' to={'/search?offer=true'}>
                  Show more offers
                 </Link>
               </div>
               <div className='flex flex-wrap gap-4'>
                   {
                    offerListings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing}/>
                    ))
                   }
               </div>
            </div>
          )}
          {rentListings && rentListings.length > 1 && (
            <div className=''>
               <div className='my-3'>
                 <h2  className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
                 <Link className='text-green-500 text-sm hover:underline' to={'/search?type=rent'}>
                  Show more places for rent
                 </Link>
               </div>
               <div className='flex flex-wrap gap-4'>
                   {
                    rentListings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing}/>
                    ))
                   }
               </div>
            </div>
          )}
          {saleListings && saleListings.length > 1 && (
            <div className=''>
               <div className='my-3'>
                 <h2  className='text-2xl font-semibold text-slate-600'>Recent places for Sale</h2>
                 <Link className='text-green-500 text-sm hover:underline' to={'/search?type=sale'}>
                  Show more places for sale
                 </Link>
               </div>
               <div className='flex flex-wrap gap-4'>
                   {
                    saleListings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing}/>
                    ))
                   }
               </div>
            </div>
          )}
      </div>
    </div>
  )
}
