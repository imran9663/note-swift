# Note Swift 🗒️

A modern, minimalist note-taking and OCR web app built using React.js, Draft.js, Tailwind CSS, and Tesseract.js.

![Note Swift App](./public/favicon.ico)

## 🌐 Live Demo

👉 Visit the app: [Note Swift - Scan](https://note-swift.netlify.app/scan)

## 🧰 Tech Stack

- **Frontend**: React.js
- **Rich Text Editing**: Draft.js
- **Styling**: Tailwind CSS
- **OCR Engine**: [Tesseract.js](https://github.com/naptha/tesseract.js#tesseractjs) — supports 100+ languages

## ✨ Features

### 📝 Note-taking
- Add new notes
- Edit existing notes
- Download notes in various formats
- No login or signup required

### 🔍 OCR Text Extraction (`/scan` Route)
- Upload multiple image files (supports all common formats like PNG, JPG, BMP, etc.)
- Paste screenshots directly using **Ctrl + V**
- Extract text using powerful Tesseract.js OCR engine
- Download extracted text as `.txt`, `.docx`, or `.pdf`

## 🚀 Installation & Usage

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imran9663/note-swift.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run start
   ```

---

📌 Built with ❤️ by Imran Pasha