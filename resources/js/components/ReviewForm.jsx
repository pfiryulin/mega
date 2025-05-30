import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, onAddReview }) => {
    const [form, setForm] = useState({ username: '', rating: '', comment: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.username) newErrors.username = 'Имя обязательно';
        else if (form.username.length > 50) newErrors.username = 'Не более 50 символов';

        if (!form.rating) newErrors.rating = 'Рейтинг обязателен';
        else if (!(form.rating >= 1 && form.rating <= 5)) newErrors.rating = 'Рейтинг от 1 до 5';

        if (form.comment && form.comment.length > 10000) newErrors.comment = 'Комментарий слишком длинный';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            const res = await axios.post('/api/reviews', {
                ...form,
                book_id: bookId
            });
            onAddReview(res.data.review);
            setForm({ username: '', rating: '', comment: '' });
        } catch (err) {
            console.error(err);
            alert('Ошибка при добавлении отзыва');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div class="form__reviews">
            <form onSubmit={handleSubmit}>
                <h4>Добавить отзыв</h4>
                <div className="form__firstLine">
                    <div>
                        <label>Имя пользователя:</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={e => setForm({...form, username: e.target.value})}
                        />
                        {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                    </div>

                    <div>
                        <label>Оценка:</label>
                        <select
                            value={form.rating}
                            onChange={e => setForm({...form, rating: Number(e.target.value)})}
                        >
                            <option value="">Выберите</option>
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        {errors.rating && <p style={{color: 'red'}}>{errors.rating}</p>}
                    </div>
                </div>


                <div>
                    <label>Комментарий:</label><br/>
                    <textarea
                        value={form.comment}
                        onChange={e => setForm({...form, comment: e.target.value})}
                        rows={4}
                    />
                    {errors.comment && <p style={{color: 'red'}}>{errors.comment}</p>}
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Отправка...' : 'Добавить отзыв'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
