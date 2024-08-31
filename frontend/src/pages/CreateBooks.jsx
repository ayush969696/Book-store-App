import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-green-100 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>
        Add New Book
      </h1>
      {loading && <Spinner />}
      <div className='flex flex-col bg-white border-2 border-gray-200 rounded-xl w-full max-w-lg p-6 mx-auto shadow-md'>
        <div className='my-4'>
          <label className='block text-lg font-medium text-gray-700 mb-2'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400'
            placeholder='Enter book title'
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-gray-700 mb-2'>
            Author
          </label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400'
            placeholder='Enter author name'
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg font-medium text-gray-700 mb-2'>
            Publish Year
          </label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400'
            placeholder='Enter publish year'
          />
        </div>
        <button
          className='w-full py-3 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300'
          onClick={handleSaveBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
