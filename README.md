# PollyGlot

PollyGlot is a web application designed to provide accurate translations using advanced generative AI models. Users can enter text, select a target language, and receive translated text with the help of Google's Generative AI API.

## Features

- **Text Translation**: Input text and select a target language to get accurate translations.
- **Language Options**: Supports French, Spanish, Japanese and Chinese.
- **Responsive Design**: Mobile-friendly interface.
- **Text-to-Speech**: Functionality for pronunciation of translated text using Chrome Speechify API(chrome tts).

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **API**: Google Generative AI API, Chrome Speechify

## Installation

### Prerequisites

- Node.js (version 16 or later)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/your-username/pollyglot.git
cd pollyglot
npm install
```

### Create a .env file 
Add your apikey "API_KEY=your-google-generative-ai-api-key" and port "PORT=3000"

### Start the server
```bash
node server.js
```

## File Structure

### `PollyGlot/`

- **.gitignore**: Specifies files and directories to be ignored by Git, such as `node_modules` and `.env`.
- **server.js**: The main server file using Express.js to serve static files and handle API requests.
- **package.json**: Contains metadata about the project and its dependencies.

### `public/`

- **assets/**: Contains image assets used in the application.
- **index.html**: The main HTML file with the user interface.
- **index.css**: Stylesheet for the application.
- **index.js**: JavaScript file handling the translation logic and interactions.


