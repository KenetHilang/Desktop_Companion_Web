// frontend/src/component/SentimentAnalyzer.js

import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalyzer() {
    const [text, setText] = useState('');
    const [resultLabel, setResultLabel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultInterpretation, setResultInterpretation] = useState('');

    const handleAnalyzeClick = async () => {
        setIsLoading(true);
        setError('');
        setResultLabel('');
        const sentimentInterpreter = {
            0: "Very Negative",
            1: "Negative",
            2: "Neutral",
            3: "Positive",
            4: "Very Positive"
        };

        try {
            const response = await axios.post('http://localhost:5000/api/analyze-sentiment', {
                text: text
            });

            setResultLabel(response.data.label);
            setResultInterpretation(sentimentInterpreter[response.data.label] || "Unknown");

        } catch (err) {
            setError('Analysis failed. Please try again.');
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
                placeholder="Write your text here..."
                className="w-full px-4 py-3 text-white bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300 placeholder:text-white/50 resize-none mb-4"
            />
            <button 
                onClick={handleAnalyzeClick} 
                disabled={isLoading}
                className="w-full px-6 py-3 text-lg font-semibold text-white bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg hover:bg-white/30 hover:border-white/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>

            {resultLabel && (
                <div className="mt-4 p-4 bg-green-500/20 border-2 border-green-400/50 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        Result: <span className="text-green-300">{resultLabel}</span>
                        <br />
                        Interpretation: <span className="text-green-300">{resultInterpretation}</span>
                    </h3>
                </div>
            )}

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