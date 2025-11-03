// frontend/src/component/SentimentAnalyzer.js

import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalyzer() {
    const [text, setText] = useState('');
    const [resultLabel, setResultLabel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyzeClick = async () => {
        setIsLoading(true);
        setError('');
        setResultLabel('');

        try {
            // 1. Panggil backend Anda di port 5000 (sesuai server.js)
            const response = await axios.post('http://localhost:5000/api/analyze-sentiment', {
                text: text
            });

            // 2. Dapatkan 'label' dari respons backend
            setResultLabel(response.data.label);

        } catch (err) {
            setError('Gagal menganalisis. Coba lagi.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-96 p-6 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Analisis Sentimen</h2>
            <textarea
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tulis teks Anda di sini..."
                className="w-full px-4 py-3 text-white bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300 placeholder:text-white/50 resize-none mb-4"
            />
            <button 
                onClick={handleAnalyzeClick} 
                disabled={isLoading}
                className="w-full px-6 py-3 text-lg font-semibold text-white bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg hover:bg-white/30 hover:border-white/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isLoading ? 'Menganalisis...' : 'Analisis'}
            </button>

            {/* Tampilkan hasil 'label' */}
            {resultLabel && (
                <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-400/50 rounded-lg">
                    <h3 className="text-xl font-bold text-white">
                        Hasil: <span className="text-green-300">{resultLabel}</span>
                    </h3>
                </div>
            )}

            {/* Tampilkan jika ada error */}
            {error && (
                <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-400/50 rounded-lg">
                    <p className="text-red-300 font-semibold">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}

export default SentimentAnalyzer;