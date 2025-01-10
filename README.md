# Text Summarizer

A React-based text summarization tool that uses the Hugging Face API to generate concise summaries of long texts.

## Features

- Text summarization using Hugging Face's BART model
- Adjustable summary length (short, medium, long)
- Clean, responsive UI built with React and Tailwind CSS
- Real-time processing status updates
- Error handling and user feedback

## Prerequisites

Before you begin, ensure you have:
- Node.js (version 14 or higher)
- NPM (Node Package Manager)
- A Hugging Face API token

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd text-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Hugging Face API token:
```env
VITE_HUGGING_FACE_TOKEN=your_token_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Paste your text into the input field
3. Select your desired summary length
4. Click "Summarize" and wait for the result

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Hugging Face Inference API
- shadcn/ui components

## Project Structure

```
text-summarizer/
├── src/
│   ├── services/
│   │   └── summarizer.ts    # Hugging Face API integration
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── styles/
│       └── globals.css    # Global styles
├── public/
├── .env                  # Environment variables
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for their amazing API
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
