// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

// Context 생성
const AuthContext = createContext();

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 앱 시작 시 로그인 상태 복원
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // 저장된 사용자 정보 확인
                const savedUser = localStorage.getItem('user');
                const authCookie = document.cookie.includes('Authorization');

                if (savedUser && authCookie) {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    console.log('✅ 저장된 로그인 상태 복원:', userData);
                } else {
                    console.log('ℹ️ 저장된 로그인 정보 없음');
                }
            } catch (error) {
                console.error('❌ 로그인 상태 복원 실패:', error);
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Google 로그인 성공 처리
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            console.log('🔍 Google 로그인 응답:', credentialResponse);

            // JWT 토큰에서 사용자 정보 추출
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('👤 Google 사용자 정보:', decoded);

            // 백엔드로 Google 로그인 처리 (실제 API 호출)
            const response = await fetch('https://ssgs-server.agong.store/oauth2/authorization/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 쿠키 포함
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                    googleUser: {
                        email: decoded.email,
                        name: decoded.name,
                        picture: decoded.picture,
                        sub: decoded.sub
                    }
                })
            });

            if (response.ok) {
                // 사용자 정보 생성
                const userData = {
                    id: decoded.sub,
                    email: decoded.email,
                    name: decoded.name,
                    picture: decoded.picture,
                    provider: 'google',
                    plan: 'FREE',
                    usageCount: 0,
                    maxUsage: 3,
                    createdAt: new Date().toISOString()
                };

                // 로그인 상태 저장
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));

                console.log('✅ Google 로그인 성공:', userData);
                return { success: true, user: userData };
            } else {
                throw new Error('백엔드 인증 실패');
            }

        } catch (error) {
            console.error('❌ Google 로그인 처리 실패:', error);
            return { success: false, error: error.message };
        }
    };

    // Google 로그인 실패 처리
    const handleGoogleLoginError = (error) => {
        console.error('❌ Google 로그인 실패:', error);
        return { success: false, error: 'Google 로그인에 실패했습니다.' };
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            // 백엔드 로그아웃 API 호출 (옵션)
            try {
                await fetch('https://ssgs-server.agong.store/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (apiError) {
                console.warn('⚠️ 백엔드 로그아웃 API 실패:', apiError);
            }

            // Google 로그아웃
            googleLogout();

            // 로컬 상태 정리
            setUser(null);
            localStorage.removeItem('user');

            // 쿠키 정리 (Authorization 쿠키)
            document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            console.log('✅ 로그아웃 완료');
        } catch (error) {
            console.error('❌ 로그아웃 처리 실패:', error);
        }
    };

    // 사용자 정보 업데이트
    const updateUser = (updatedData) => {
        const newUserData = { ...user, ...updatedData };
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
    };


    // 로그인 상태 체크
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('https://ssgs-server.agong.store/api/auth/me', {
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            console.error('❌ 인증 상태 확인 실패:', error);
            logout();
            return false;
        }
    };

    // Context value
    const value = {
        // 상태
        user,
        loading,
        isLoggedIn: !!user,

        // 함수들
        handleGoogleLoginSuccess,
        handleGoogleLoginError,
        logout,
        updateUser,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
    }
    return context;
};

// Google Login Button Component
export const GoogleLoginButton = ({ onSuccess, onError, text = "Google로 로그인" }) => {
    const { handleGoogleLoginSuccess, handleGoogleLoginError } = useAuth();

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const result = handleGoogleLoginSuccess(credentialResponse);
                if (onSuccess) onSuccess(result);
            }}
            onError={(error) => {
                const result = handleGoogleLoginError(error);
                if (onError) onError(result);
            }}
            useOneTap={false}
            text={text}
            theme="outline"
            size="large"
            width="100%"
        />
    );
};

// HOC for protecting routes
export const withAuth = (Component) => {
    return function AuthenticatedComponent(props) {
        const { user, loading } = useAuth();

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">로딩 중...</p>
                    </div>
                </div>
            );
        }

        if (!user) {
            // 로그인 페이지로 리다이렉트
            window.location.href = '/login';
            return null;
        }

        return <Component {...props} />;
    };
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        window.location.href = '/login';
        return null;
    }

    return children;
};