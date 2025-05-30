import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const BookCard = ({ bookId, goBack }) => {
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    const fetchBook = async () => {
        const res = await axios.get(`/api/books/${bookId}`);
        setBook(res.data);
        setReviews(res.data.reviews || []);
    };

    useEffect(() => {
        fetchBook();
    }, [bookId]);

    const handleAddReview = (newReview) => {
        setReviews(prev => [...prev, newReview]);
    };

    if (!book) return <p>Загрузка...</p>;

    return (
        <div class="book__info-wrapper">
            <button class="back" onClick={goBack}>← Назад</button>
            <div className="book__info">
                <h2>{book.book_name}</h2>
                <p><strong>Автор:</strong> {book.author?.name}</p>
                <p><strong>Жанр:</strong> {book.genre?.genre}</p>
                <p><strong>Описание:</strong> {book.description}</p>
            </div>
            <div className="reviews__list">
                <h3>Отзывы</h3>
                {reviews.length === 0 ? (
                    <p>Отзывов пока нет.</p>
                ) : (
                    <ul>
                        {reviews.map((rev) => (
                            <li key={rev.id}>
                                <p><strong>{rev.username}</strong> Оценка: {rev.rating} из 5</p>
                                <p>{rev.comment}</p>
                            </li>
                        ))}
                    </ul>
                )}


                <ReviewForm bookId={bookId} onAddReview={handleAddReview}/>
            </div>

        </div>
    );
};

export default BookCard;
