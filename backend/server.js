// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000; // Port untuk backend Anda

// Mapping label ke angka
const sentimentMapping = {
    "Very Negative": 0,
    "Negative": 1,
    "Neutral": 2,
    "Positive": 3,
    "Very Positive": 4
};

// Middleware
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parsing body JSON dari request

// Definisikan rute (endpoint) untuk diakses frontend
app.post('/api/analyze-sentiment', async (req, res) => {
    // 1. Dapatkan teks dari body request yang dikirim frontend
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    // 2. Siapkan data untuk dikirim ke API eksternal
    const externalApiUrl = 'https://api.tabularis.ai/';
    const apiRequestBody = {
        text: text,
        return_all_scores: false
    };

    try {
        // 3. Panggil API eksternal dengan konfigurasi yang lebih lengkap
        const apiResponse = await axios.default.post(externalApiUrl, apiRequestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site'
            },
            timeout: 30000, // 30 detik timeout
            validateStatus: function (status) {
                return status < 500; // Resolve only if status code is less than 500
            }
        });

        // Cek jika response tidak sukses
        if (apiResponse.status >= 400) {
            console.error('API returned error status:', apiResponse.status, apiResponse.data);
            return res.status(apiResponse.status).json({ 
                error: 'API returned an error', 
                details: apiResponse.data 
            });
        }

        // Log full response untuk debugging
        console.log('API Response:', JSON.stringify(apiResponse.data, null, 2));

        // 4. Ekstrak 'label' dari respons API eksternal
        // Struktur response: data.output.results.label
        const labelString = apiResponse.data?.output?.results?.label;

        if (!labelString) {
            console.error('Label not found in response:', apiResponse.data);
            return res.status(500).json({ 
                error: 'Invalid API response structure',
                receivedData: apiResponse.data 
            });
        }

        console.log('Label received from API:', labelString);

        // 5. Coba konversi label ke angka, jika ada di mapping
        let labelToSend = labelString; // Default: kirim string
        
        if (sentimentMapping.hasOwnProperty(labelString)) {
            labelToSend = sentimentMapping[/** @type {keyof typeof sentimentMapping} */ (labelString)];
            console.log('Label converted to number:', labelToSend);
        } else {
            console.log('Label not in mapping, sending as string:', labelString);
        }

        // 6. Kirim label (angka atau string) kembali ke frontend
        res.json({ 
            label: labelToSend,  // Angka 0-4 jika ada di mapping, atau string original
            labelText: labelString,  // Text label original
            score: apiResponse.data.output.results.score,
            status: apiResponse.data.status
        });

    } catch (/** @type {any} */ error) {
        // Ini akan mencetak error asli (seperti 504) ke terminal backend
        console.error('Error calling external API:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        } 
        
        // Ini yang mengirim error 500 ke frontend
        res.status(500).json({ error: 'Failed to analyze sentiment' }); 
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});