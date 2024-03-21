import React, { useState } from 'react';

const AddInformationForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      setTimeout(() => {
        setBooks(prevBooks => [...prevBooks, { title, author, favorite }]);
        setTitle('');
        setAuthor('');
        setFavorite(false);
        setSuccessMessage('Book added successfully');
        setErrorMessage('');
      }, 1000);
    } catch (error) {
      setErrorMessage('Error adding book. Please try again.');
    }
  };

  const handleDelete = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
    setSuccessMessage('Book deleted successfully');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add New Book</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Author:</label>
                  <input type="text" id="author" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" id="favorite" className="form-check-input" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
                  <label htmlFor="favorite" className="form-check-label">Favorite</label>
                </div>
                <button type="submit" className="btn btn-success btn-block">Add a new Book</button>
              </form>
              {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
              {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <h3 className="text-center mb-4">List of Books</h3>
          <ul className="list-group">
            {filteredBooks.map((book, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center shadow">
                <div>
                  <strong>Title:</strong> {book.title} | <strong>Author:</strong> {book.author} | <strong>Favorite:</strong> {book.favorite ? 'Yes' : 'No'}
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddInformationForm;
