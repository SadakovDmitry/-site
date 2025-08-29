import React from 'react';

const TestPage = () => {
    return (
        <div style={{
            padding: '100px 20px',
            textAlign: 'center',
            color: 'white',
            fontSize: '2rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)'
        }}>
            <h1>Тестовая страница работает! 🎉</h1>
            <p>React функционирует нормально</p>
            <button
                style={{
                    padding: '20px 40px',
                    fontSize: '1.5rem',
                    background: '#019CE5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
                onClick={() => alert('Кнопка работает!')}
            >
                Нажми меня!
            </button>
        </div>
    );
};

export default TestPage;
