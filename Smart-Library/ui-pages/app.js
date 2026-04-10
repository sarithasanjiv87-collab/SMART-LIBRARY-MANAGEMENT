// Access React from CDN
const { useState, useEffect } = React;
const ReactDOM = window.ReactDOM;

// XML Parsing Utility
const parseLibraryXML = (xmlText) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const books = [];

  const bookElements = xmlDoc.querySelectorAll("book");
  bookElements.forEach((bookEl) => {
    const book = {
      id: bookEl.getAttribute("id"),
      title: bookEl.querySelector("title")?.textContent || "",
      author: bookEl.querySelector("author")?.textContent || "",
      genre: bookEl.querySelector("genre")?.textContent || "",
      status: bookEl.querySelector("status")?.textContent || "available",
      borrower: bookEl.querySelector("borrower")?.textContent || "",
      borrowDate: bookEl.querySelector("borrowDate")?.textContent || "",
      returnDate: bookEl.querySelector("returnDate")?.textContent || "",
    };
    books.push(book);
  });

  return books;
};

// Generate XML from books array
const generateLibraryXML = (books) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<library>\n  <books>\n';

  books.forEach((book) => {
    xml += `    <book id="${book.id}">\n`;
    xml += `      <title>${book.title}</title>\n`;
    xml += `      <author>${book.author}</author>\n`;
    xml += `      <genre>${book.genre}</genre>\n`;
    xml += `      <status>${book.status}</status>\n`;
    xml += `      <borrower>${book.borrower}</borrower>\n`;
    xml += `      <borrowDate>${book.borrowDate}</borrowDate>\n`;
    xml += `      <returnDate>${book.returnDate}</returnDate>\n`;
    xml += `    </book>\n`;
  });

  xml += "  </books>\n</library>";
  return xml;
};

// Download XML file
const downloadXML = (xmlContent, filename = "library.xml") => {
  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Sample initial data
const sampleBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    status: "available",
    borrower: "",
    borrowDate: "",
    returnDate: "",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    status: "borrowed",
    borrower: "John Smith",
    borrowDate: "2026-04-01",
    returnDate: "2026-04-15",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    status: "available",
    borrower: "",
    borrowDate: "",
    returnDate: "",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    status: "borrowed",
    borrower: "Emily Johnson",
    borrowDate: "2026-04-05",
    returnDate: "2026-04-19",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-age Fiction",
    status: "available",
    borrower: "",
    borrowDate: "",
    returnDate: "",
  },
];

// Stat Card Component
const StatCard = ({ title, value, type }) => {
  return (
    <div className={`stat-card ${type}`}>
      <h3>{title}</h3>
      <div className="value">{value}</div>
    </div>
  );
};

// Book Modal Component
const BookModal = ({ isOpen, onClose, onSave, book, isEditing }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    status: "available",
    borrower: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    if (book && isEditing) {
      setFormData(book);
    } else {
      setFormData({
        title: "",
        author: "",
        genre: "",
        status: "available",
        borrower: "",
        borrowDate: "",
        returnDate: "",
      });
    }
  }, [book, isEditing, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEditing ? "Edit Book" : "Add New Book"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Genre *</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>
          {formData.status === "borrowed" && (
            <>
              <div className="form-group">
                <label>Borrower Name</label>
                <input
                  type="text"
                  value={formData.borrower}
                  onChange={(e) =>
                    setFormData({ ...formData, borrower: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Borrow Date</label>
                <input
                  type="date"
                  value={formData.borrowDate}
                  onChange={(e) =>
                    setFormData({ ...formData, borrowDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Return Date</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) =>
                    setFormData({ ...formData, returnDate: e.target.value })
                  }
                />
              </div>
            </>
          )}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Update" : "Add"} Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Borrow Modal Component
const BorrowModal = ({ isOpen, onClose, onBorrow, book }) => {
  const [formData, setFormData] = useState({
    borrower: "",
    borrowDate: new Date().toISOString().split("T")[0],
    returnDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      const borrowDate = new Date().toISOString().split("T")[0];
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      setFormData({
        borrower: "",
        borrowDate: borrowDate,
        returnDate: returnDate.toISOString().split("T")[0],
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBorrow(book.id, formData);
    onClose();
  };

  if (!isOpen || !book) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Borrow Book: {book.title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Borrower Name *</label>
            <input
              type="text"
              value={formData.borrower}
              onChange={(e) =>
                setFormData({ ...formData, borrower: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Borrow Date *</label>
            <input
              type="date"
              value={formData.borrowDate}
              onChange={(e) =>
                setFormData({ ...formData, borrowDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Return Date *</label>
            <input
              type="date"
              value={formData.returnDate}
              onChange={(e) =>
                setFormData({ ...formData, returnDate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Borrow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("libraryBooks");
    return saved ? JSON.parse(saved) : sampleBooks;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  }, [books]);

  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === "available").length;
  const borrowedBooks = books.filter((b) => b.status === "borrowed").length;
  const overdueBooks = books.filter((b) => {
    if (b.status !== "borrowed" || !b.returnDate) return false;
    return new Date(b.returnDate) < new Date();
  }).length;

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new book
  const handleAddBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
    };
    setBooks([...books, newBook]);
  };

  // Update existing book
  const handleEditBook = (bookData) => {
    setBooks(
      books.map((b) => (b.id === selectedBook.id ? { ...b, ...bookData } : b))
    );
  };

  // Delete book
  const handleDeleteBook = (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  // Borrow book
  const handleBorrowBook = (id, borrowData) => {
    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, status: "borrowed", ...borrowData } : b
      )
    );
  };

  // Return book
  const handleReturnBook = (id) => {
    setBooks(
      books.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "available",
              borrower: "",
              borrowDate: "",
              returnDate: "",
            }
          : b
      )
    );
  };

  // Export to XML
  const handleExportXML = () => {
    const xml = generateLibraryXML(books);
    downloadXML(xml, "library-export.xml");
  };

  // Import from XML
  const handleImportXML = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedBooks = parseLibraryXML(event.target.result);
          setBooks(importedBooks);
          alert("Library data imported successfully!");
        } catch (error) {
          alert("Error importing XML file. Please check the format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>📚 Smart Library</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books by title, author, or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsEditing(false);
              setIsAddModalOpen(true);
            }}
          >
            ➕ Add Book
          </button>
          <button className="btn btn-secondary" onClick={handleExportXML}>
            📄 Export XML
          </button>
          <label className="btn btn-secondary" style={{ margin: 0 }}>
            📥 Import XML
            <input
              type="file"
              accept=".xml"
              onChange={handleImportXML}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard title="Total Books" value={totalBooks} type="total" />
        <StatCard title="Available" value={availableBooks} type="available" />
        <StatCard title="Borrowed" value={borrowedBooks} type="borrowed" />
        <StatCard title="Overdue" value={overdueBooks} type="overdue" />
      </div>

      <div className="books-section">
        <h2>Book Inventory</h2>
        <div className="books-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Borrower</th>
                <th>Return Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <strong>{book.title}</strong>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <span className={`status-badge status-${book.status}`}>
                      {book.status}
                    </span>
                  </td>
                  <td>{book.borrower || "-"}</td>
                  <td>{book.returnDate || "-"}</td>
                  <td>
                    <div className="action-btns">
                      {book.status === "available" ? (
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => {
                            setSelectedBook(book);
                            setIsBorrowModalOpen(true);
                          }}
                        >
                          Borrow
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => handleReturnBook(book.id)}
                        >
                          Return
                        </button>
                      )}
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => {
                          setSelectedBook(book);
                          setIsEditing(true);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBooks.length === 0 && (
            <p
              style={{ textAlign: "center", padding: "40px", color: "#718096" }}
            >
              No books found. Try a different search or add a new book.
            </p>
          )}
        </div>
      </div>

      <BookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddBook}
        book={null}
        isEditing={false}
      />

      <BookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditBook}
        book={selectedBook}
        isEditing={true}
      />

      <BorrowModal
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
        onBorrow={handleBorrowBook}
        book={selectedBook}
      />
    </div>
  );
};

// Mount React app
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(Dashboard));
