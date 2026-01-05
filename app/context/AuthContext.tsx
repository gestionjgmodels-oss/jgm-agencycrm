"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
    user: any | null;
    login: (provider?: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check for existing session on mount
    useEffect(() => {
        const session = Cookies.get("helixx_admin_session");
        if (session) {
            setUser(JSON.parse(session));
        }
        setIsLoading(false);
    }, []);

    // Protect Routes (Simple Client-Side Protection)
    useEffect(() => {
        if (!isLoading) {
            const isLoginPage = pathname.includes("/login");
            const isAdminRoute = pathname.includes("/admin");

            if (isAdminRoute && !isLoginPage && !user) {
                // Redirect to Login if trying to access admin without user
                // router.replace("/es/admin/login"); 
            } else if (isLoginPage && user) {
                // Redirect to Dashboard if already logged in
                router.replace("/es/admin/dashboard");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = (provider: string = "email") => {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const mockUser = {
                id: "usr_89234",
                name: "Admin Operator",
                email: "operator@helixx.studio",
                role: "admin",
                provider: provider
            };
            setUser(mockUser);
            Cookies.set("helixx_admin_session", JSON.stringify(mockUser), { expires: 7 }); // Persist for 7 days
            router.replace("/es/admin/dashboard");
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("helixx_admin_session");
        router.replace("/es/admin/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
