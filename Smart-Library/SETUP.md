# Smart Library - Quick Start Guide

## 🚀 Getting Started

### Option 1: Simple HTTP Server (Recommended)

1. **Install dependencies** (optional, only needed for build tools):

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

   This will automatically open your browser to `http://localhost:3000`

3. **Or manually open** the `index.html` file in your browser:
   - Just double-click `index.html` in your file explorer
   - Or drag it into your browser window

### Option 2: Using Vite (Alternative)

If you want to use Vite's build system:

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start Vite dev server**:
   ```bash
   npx vite
   ```

## 📁 Project Structure

```
Smart-Library/
│
├── update-set/
│   └── library.xml              # Sample library data
│
├── docs/
│   └── README.md                # Documentation guide
│
├── ui-pages/
│   └── app.js                   # React application code
│
├── index.html                   # Main entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── README.md                    # Full documentation
└── SETUP.md                     # This file
```

## ✨ Features

- ✅ **Add, Edit, Delete Books** - Full CRUD operations
- ✅ **Borrow/Return System** - Track borrowed books with dates
- ✅ **Search & Filter** - Find books by title, author, or genre
- ✅ **Dashboard Statistics** - View total, available, borrowed, and overdue books
- ✅ **XML Import/Export** - Backup and restore library data
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Local Storage** - Data persists in browser

## 📖 How to Use

### Adding a Book

1. Click the "➕ Add Book" button
2. Fill in the book details (title, author, genre)
3. Click "Add Book"

### Borrowing a Book

1. Find an available book in the table
2. Click the "Borrow" button
3. Enter borrower name and dates
4. Click "Confirm Borrow"

### Returning a Book

1. Find a borrowed book in the table
2. Click the "Return" button
3. Book status updates automatically

### Exporting to XML

1. Click "📄 Export XML"
2. File downloads as `library-export.xml`

### Importing from XML

1. Click "📥 Import XML"
2. Select an XML file
3. Library data updates immediately

## 🔧 Troubleshooting

### React not loading?

- Make sure you have an internet connection (React loads from CDN)
- Check browser console for errors

### Data not persisting?

- The app uses browser localStorage
- Clearing browser data will reset the library
- Use XML export to backup your data

### Can't open index.html directly?

- Some browsers block local file access
- Use a local server: `npx http-server . -p 3000`

## 📝 Notes

- The app runs entirely in the browser
- No backend server required
- Data is stored in localStorage
- XML files are used for import/export only
- React 18 is loaded from CDN (requires internet)

## 🎨 Customization

To customize the application:

- **Styles**: Edit the CSS in `index.html` or create a separate `.css` file
- **Features**: Modify `ui-pages/app.js`
- **Sample Data**: Edit `update-set/library.xml`

## 📞 Support

For issues or questions, refer to:

- `README.md` - Full project documentation
- `docs/README.md` - Architecture and diagrams

---

**Enjoy your Smart Library! 📚**
