import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-6 bg-green-100 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>
        Book Details
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white border border-gray-200 rounded-xl w-full max-w-xl p-8 mx-auto shadow-md'>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              ID:
            </span>
            <span className='text-xl text-gray-700'>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              Title:
            </span>
            <span className='text-xl text-gray-700'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              Author:
            </span>
            <span className='text-xl text-gray-700'>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              Publish Year:
            </span>
            <span className='text-xl text-gray-700'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              Created At:
            </span>
            <span className='text-xl text-gray-700'>
              {new Date(book.createdAt).toLocaleString()}
            </span>
          </div>
          <div className='my-4'>
            <span className='block text-lg font-semibold text-gray-500 mb-2'>
              Last Updated At:
            </span>
            <span className='text-xl text-gray-700'>
              {new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
