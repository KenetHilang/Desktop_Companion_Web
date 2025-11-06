# Backend - TypeScript Sentiment Analysis API

A TypeScript-based Express.js backend for sentiment analysis using an external API.

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── config.ts     # Environment and API configuration
│   │   └── sentimentMapping.ts  # Sentiment label mappings
│   ├── routes/           # Express route handlers
│   │   └── sentimentRoutes.ts   # Sentiment analysis routes
│   ├── services/         # Business logic services
│   │   └── sentimentService.ts  # External API integration
│   ├── types/            # TypeScript type definitions
│   │   └── sentiment.types.ts   # Sentiment-related types
│   └── server.ts         # Main entry point
├── dist/                 # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## Scripts

- `pnpm dev` - Run development server with ts-node
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run compiled JavaScript in production
- `pnpm watch` - Watch mode for TypeScript compilation

## API Endpoints

### POST /api/analyze-sentiment

Analyzes the sentiment of provided text.

**Request Body:**
```json
{
  "text": "Your text to analyze"
}
```

**Response:**
```json
{
  "label": 3,
  "labelText": "Positive",
  "score": 0.95,
  "status": "success"
}
```

**Sentiment Labels:**
- 0: Very Negative
- 1: Negative
- 2: Neutral
- 3: Positive
- 4: Very Positive

### GET /health

Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T10:30:00.000Z"
}
```

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run in development mode:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   pnpm start
   ```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)

## Migration Notes

This is the TypeScript version of the original `server.js` file, now organized into:

- **Types** (`src/types/`): All TypeScript interfaces and enums
- **Config** (`src/config/`): Configuration constants and mappings
- **Services** (`src/services/`): Business logic and external API calls
- **Routes** (`src/routes/`): Express route handlers
- **Server** (`src/server.ts`): Main application setup

The original `server.js` can be safely removed after testing the new TypeScript version.
