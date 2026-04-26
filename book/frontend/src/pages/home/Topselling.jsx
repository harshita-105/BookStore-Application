import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories=["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const Topselling = () => {
  
  const [selectedCategory, setSelectedCategory]= useState("Choose a genre");

  const {data:books=[]}=useFetchAllBooksQuery();
  console.log("books:", books);

  const filteredBooks =
  selectedCategory === "Choose a genre"
    ? books
    : books.filter(
        (book) =>
          book.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className='py-10 px-10'>
      <h2 className='text-3xl font-semibold mb-6'>Topsellers</h2>

      {/*categories*/}
      <div className='mb-8 flex items-center'>
        <select name="category" id="category" onChange={(e)=>setSelectedCategory(e.target.value)} className='border bg-[#EAEAEA] border-gray-300 rounded-md px-5 py-2 focus:outline-none'>
          {
            categories.map((category,index)=>(
              <option key={index} value={category}>{category}</option>
            ))
          }
        </select>
      </div>      

      {/*caraousel*/}

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

      {
        filteredBooks.length>0 && filteredBooks.map((book,index)=>(
            <SwiperSlide key={index}>
              <BookCard book={book}/>
            </SwiperSlide> 
        ))
      }
       
      </Swiper>
    </div>
  )

}

export default Topselling;
