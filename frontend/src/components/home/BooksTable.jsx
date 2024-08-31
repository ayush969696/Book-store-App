import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse shadow-lg rounded-lg'>
        <thead>
          <tr className='bg-gradient-to-r from-green-400 to-green-600 text-white'>
            <th className='py-3 px-4 border-b border-gray-200'>No</th>
            <th className='py-3 px-4 border-b border-gray-200'>Title</th>
            <th className='py-3 px-4 border-b border-gray-200 max-md:hidden'>Author</th>
            <th className='py-3 px-4 border-b border-gray-200 max-md:hidden'>Publish Year</th>
            <th className='py-3 px-4 border-b border-gray-200'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className='h-12 hover:bg-gray-100 transition-colors duration-200'
            >
              <td className='py-6 px-4 text-md text-center border-b border-gray-200'>
                {index + 1}
              </td>
              <td className='py-6 px-4 text-md text-center border-b border-gray-200'>
                {book.title}
              </td>
              <td className='py-6 px-4 text-md text-center border-b border-gray-200 max-md:hidden'>
                {book.author}
              </td>
              <td className='py-6 px-4 text-md text-center border-b border-gray-200 max-md:hidden'>
                {book.publishYear}
              </td>
              <td className='py-6 px-4 text-md text-center border-b border-gray-200'>
                <div className='flex justify-center gap-x-4'>
                  <Link
                    to={`/books/details/${book._id}`}
                    className='hover:scale-110 transition-transform duration-200'
                  >
                    <BsInfoCircle className='text-2xl text-green-700' />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className='hover:scale-110 transition-transform duration-200'
                  >
                    <AiOutlineEdit className='text-2xl text-yellow-500' />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className='hover:scale-110 transition-transform duration-200'
                  >
                    <MdOutlineDelete className='text-2xl text-red-500' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
