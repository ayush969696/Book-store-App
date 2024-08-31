import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book data', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-green-100 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>
        Edit Book
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white border border-gray-200 rounded-xl w-full max-w-lg p-8 mx-auto shadow-lg'>
          <div className='my-4'>
            <label className='block text-lg font-medium text-gray-700 mb-2'>
              Title
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
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
              className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
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
              className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter publish year'
            />
          </div>
          <button
            className='w-full py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300'
            onClick={handleEditBook}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
