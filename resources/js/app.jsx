import React from 'react';
import ReactDOM from 'react-dom/client';
import BookList from './components/BookList';

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <BookList />
        </React.StrictMode>
    );
}
