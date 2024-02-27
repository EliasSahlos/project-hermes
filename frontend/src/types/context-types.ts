interface PaginationContextProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    currentPosts: Article[]
    pages: number
}

interface AuthContextProps {
    isAuthenticated: boolean;
    register: (token: string) => void;
    login: (token: string) => void;
    logout: () => void;
}