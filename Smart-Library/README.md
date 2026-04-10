# Smart Library Management System

A modern, React-based library management system with XML data storage and a beautiful dashboard interface.

## Features

- 📚 **Book Inventory Management** - Add, edit, delete, and search books
- 🔄 **Borrow/Return Tracking** - Track borrowed books and due dates
- 📊 **Dashboard Statistics** - Visual overview of library metrics
- 📄 **XML Import/Export** - Store and backup library data in XML format
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18+ with Vite
- **Data Storage**: XML files with localStorage fallback
- **Styling**: Modern CSS with responsive design
- **Build Tool**: Vite for fast development and optimization

## Project Structure

```
Smart-Library/
│
├── update-set/
│   └── library.xml          # Library data storage
│
├── docs/
│   ├── architecture.png     # System architecture diagram
│   └── flow-diagram.png     # Data flow diagram
│
├── ui-pages/
│   ├── dashboard.html       # Main dashboard HTML
│   └── app.js              # React application logic
│
├── README.md               # This file
└── package.json            # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd Smart-Library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

## Usage

### Managing Books

- **Add Book**: Click the "Add Book" button and fill in the book details
- **Edit Book**: Click the edit icon next to any book
- **Delete Book**: Click the delete icon next to any book
- **Search Books**: Use the search bar to find books by title, author, or genre

### Borrowing Books

- Click the "Borrow" button on an available book
- Enter borrower name and return date
- Track borrowed books in the dashboard

### Returning Books

- Click the "Return" button on a borrowed book
- System will update the book status automatically

### XML Data Management

- **Export**: Click "Export to XML" to download current library data
- **Import**: Click "Import XML" to load library data from an XML file

## XML Data Format

The library data is stored in `update-set/library.xml` with the following structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<library>
  <books>
    <book id="1">
      <title>Book Title</title>
      <author>Author Name</author>
      <genre>Genre</genre>
      <status>available|borrowed</status>
      <borrower>Borrower Name</borrower>
      <borrowDate>YYYY-MM-DD</borrowDate>
      <returnDate>YYYY-MM-DD</returnDate>
    </book>
  </books>
</library>
```

## Documentation

- **Architecture Diagram**: See `docs/architecture.png`
- **Flow Diagram**: See `docs/flow-diagram.png`

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
