import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/books')
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Не удалось загрузить список книг.');
                setLoading(false);
            });
    }, []);

    const fetchBookDetails = (id) => {
        setSelectedBook(null);
        setLoading(true);
        axios.get(`/api/books/${id}`)
            .then(response => {
                setSelectedBook(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Не удалось загрузить данные книги.');
                setLoading(false);
            });
    };

    // 🔧 Функция для сокращения строки
    const truncate = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    if (selectedBook) {
        return (
            <div>
                <h2>{selectedBook.book_name}</h2>
                <p><strong>Автор:</strong> {selectedBook.author?.name ?? 'Неизвестно'}</p>
                <p><strong>Жанр:</strong> {selectedBook.genre?.genre ?? 'Без жанра'}</p>
                <p><strong>Описание:</strong> {selectedBook.description}</p>
                <button onClick={() => setSelectedBook(null)}>← Назад к списку</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Список книг</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {books.map(book => (
                    <li key={book.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                        <h3>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchBookDetails(book.id);
                                }}
                            >
                                {book.book_name}
                            </a>
                        </h3>
                        <p><strong>Автор:</strong> {book.author?.name ?? 'Неизвестно'}</p>
                        <p><strong>Жанр:</strong> {book.genre?.genre ?? 'Без жанра'}</p>
                        <p><strong>Описание:</strong> {truncate(book.description, 50)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
