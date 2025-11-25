// frontend/src/component/SentimentAnalyzer.js

import React, { useState, useRef } from 'react';
import axios from 'axios';

function SentimentAnalyzer() {
    const [text, setText] = useState('');
    const [resultLabel, setResultLabel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultInterpretation, setResultInterpretation] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const recognitionRef = useRef(null);

    const handleAnalyzeClick = async () => {
        setIsLoading(true);
        setError('');
        setResultLabel('');
        const sentimentInterpreter = {
            "Positive": 0,
            "Neutral": 1,
            "Negative": 2
        };

        try {
            const response = await axios.post('https://innless-paloma-xerographic.ngrok-free.dev/sentiment', {
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

    // 🎙️ Start or stop microphone recognition
    const handleMicToggle = () => {
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert('Speech Recognition API is not supported in this browser.');
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                // 👉 Tambahkan hasil speech ke teks yang sudah ada
                setText(prev => {
                    const trimmedPrev = prev.trim();
                    const newPart = finalTranscript.trim();
                    if (!newPart) return prev; // ignore empty results

                    // Only add a space if the previous text doesn't already end with punctuation or space
                    if (trimmedPrev === '') return newPart;
                    if (/[.?!\s]$/.test(trimmedPrev)) {
                        return trimmedPrev + ' ' + newPart;
                    } else {
                        return trimmedPrev + ' ' + newPart;
                    }
                });

            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognition.start();
            recognitionRef.current = recognition;
            setIsRecording(true);
        }
    };

    // 🧹 Clear text and result — only when not recording
    const handleClear = () => {
        if (isRecording) return; // ignore when mic is on
        setText('');
        setResultLabel('');
        setResultInterpretation('');
        setError('');
    };

    return (
       <div className="w-96 p-6 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl">
    <h2 className="text-2xl font-bold text-white mb-4">Analisis Sentimen</h2>

    <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ketik atau ucapkan teks di sini..."
        className="w-full px-4 py-3 text-white bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300 placeholder:text-white/50 resize-none mb-4"
    />

    {/*  Start & Clear Buttons */}
    <div className="flex gap-3 mb-3">
        <button
            onClick={handleMicToggle}
            className={`flex-1 px-4 py-2 text-lg font-semibold text-white border-2 rounded-lg transition-all duration-300 ${
                isRecording
                    ? 'bg-red-500/30 border-red-400 hover:bg-red-500/40'
                    : 'bg-blue-500/30 border-blue-400 hover:bg-blue-500/40'
            }`}
        >
            {isRecording ? 'Stop Speaking' : 'Start Speaking'}
        </button>

        <button
            onClick={handleClear}
            disabled={isRecording}
            className="flex-1 px-4 py-2 text-lg font-semibold text-white bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg hover:bg-white/30 hover:border-white/60 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
        >
            🧹 Clear
        </button>
    </div>

    {/*  Analyze Button Below */}
    <button
        onClick={handleAnalyzeClick}
        disabled={isLoading}
        className="w-full px-4 py-2 text-lg font-semibold text-white bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-lg hover:bg-white/30 hover:border-white/60 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
            <p className="text-red-300 font-semibold">{error}</p>
        </div>
    )}
</div>

    );
}

export default SentimentAnalyzer;
