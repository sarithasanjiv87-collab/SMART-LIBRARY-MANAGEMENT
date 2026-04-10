# Smart Library Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Dashboard Component                │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │ Stat Cards  │  │ Books Table  │  │   Modals   │  │   │
│  │  │ (Total,     │  │ (Search,     │  │ (Add,Edit, │  │   │
│  │  │ Available,  │  │ Filter,      │  │ Borrow)    │  │   │
│  │  │ Borrowed)   │  │ Actions)     │  │            │  │   │
│  │  └─────────────┘  └──────────────┘  └────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│                                                              │
│  ┌────────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │  State Mgmt    │  │ XML Parser    │  │  XML Gen      │  │
│  │  (useState,    │  │ (Read XML     │  │ (Write XML    │  │
│  │  useEffect)    │  │  to JS)       │  │  from JS)     │  │
│  └────────────────┘  └───────────────┘  └───────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Book Management Functions                   │   │
│  │  • addBook()     • editBook()     • deleteBook()     │   │
│  │  • borrowBook()  • returnBook()   • searchBooks()    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA PERSISTENCE                         │
│                                                              │
│  ┌──────────────────────┐          ┌────────────────────┐   │
│  │   Browser localStorage│          │   XML Files        │   │
│  │   (Primary Storage)  │          │   (Import/Export)  │   │
│  │                      │          │                    │   │
│  │  • Auto-save on      │          │  • library.xml     │   │
│  │    change            │          │  • library-export  │   │
│  │  • Persistent across │          │    .xml            │   │
│  │    sessions          │          │                    │   │
│  └──────────────────────┘          └────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Book Operations Flow

```
User Action → Event Handler → State Update → Re-render → localStorage Save
     │
     └─→ Add/Edit/Delete/Borrow/Return Book
```

### XML Export Flow

```
Click Export → Generate XML from State → Create Blob → Download File
```

### XML Import Flow

```
Select File → Read File → Parse XML → Update State → Save to localStorage
```

## Component Hierarchy

```
Dashboard
├── Header
│   ├── Search Bar
│   └── Action Buttons (Add, Export, Import)
├── StatsGrid
│   ├── StatCard (Total)
│   ├── StatCard (Available)
│   ├── StatCard (Borrowed)
│   └── StatCard (Overdue)
├── BooksSection
│   └── BooksTable
│       └── BookRow (for each book)
│           ├── Status Badge
│           └── Action Buttons
├── BookModal (Add/Edit)
└── BorrowModal
```

## Technology Stack

- **Frontend Framework**: React 18 (CDN)
- **Build Tool**: Vite (optional)
- **Transpiler**: Babel (CDN)
- **Storage**: Browser localStorage + XML files
- **Styling**: Vanilla CSS
- **Server**: HTTP Server (development)

## Key Features Implementation

1. **State Management**: React hooks (useState, useEffect)
2. **XML Processing**: DOMParser API
3. **Data Persistence**: localStorage API
4. **File Download**: Blob API
5. **File Upload**: FileReader API
6. **Routing**: Single page (no routing needed)

## Security Considerations

- All data stored client-side
- No server-side processing
- No authentication (can be added)
- XSS protection via React's escaping
- File validation on import

## Performance Optimizations

- React's virtual DOM for efficient updates
- localStorage for fast data access
- Debounced search (can be added)
- Lazy loading for large datasets (future)
