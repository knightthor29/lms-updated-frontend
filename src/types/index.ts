export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType: 'STUDENT' | 'FACULTY' | 'GENERAL';
  joinDate: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  totalBooksIssued: number;
  maxBooksAllowed: number;
}

export interface BookIssue {
  id: string;
  bookId: string;
  memberId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE';
  fine: number;
  book: Book;
  member: Member;
}

export interface LibraryStats {
  totalBooks: number;
  totalMembers: number;
  booksIssued: number;
  overdueBooks: number;
  availableBooks: number;
  totalFines: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}