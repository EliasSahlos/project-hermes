interface PaginationContextProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    currentPosts: Article[]
    pages: number
}

interface AuthContextProps {
    isAuthenticated: boolean;
    userInfo: any
    register: (token: string) => void;
    login: (token: string, user: any) => void;
    logout: () => void;
}