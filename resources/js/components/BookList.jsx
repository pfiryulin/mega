import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        axios.get('/api/books')
            .then(res => setBooks(res.data))
            .catch(err => console.error('Ошибка загрузки книг', err));
    }, []);

    const truncate = (text, len) => {
        return text.length > len ? text.slice(0, len) + '...' : text;
    };

    if (selectedBookId) {
        return (
            <BookCard
                bookId={selectedBookId}
                goBack={() => setSelectedBookId(null)}
            />
        );
    }

    return (
        <div class="book__lost">
            <h2>Список книг</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {books.map(book => (
                    <li key={book.id} style={{ marginBottom: '1.5rem' }}>
                        <h3>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setSelectedBookId(book.id);
                            }}>
                                {book.book_name}
                            </a>
                        </h3>
                        <p><strong>Автор:</strong> {book.author?.name}</p>
                        <p><strong>Жанр:</strong> {book.genre?.genre}</p>
                        <p><strong>Описание:</strong> {truncate(book.description, 50)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
