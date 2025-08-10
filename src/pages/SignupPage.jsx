import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import { TrendingUp, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    // 이미 로그인된 경우 홈으로 리다이렉트
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleGoogleLogin = async () => {
        try {
            console.log('Google 로그인 시작');

            // 실제 구현에서는 백엔드 OAuth URL 사용
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ssgs-server.agong.store';
            const googleAuthUrl = `${baseUrl}/oauth2/authorization/google`;

            // Google OAuth 로그인 페이지로 리다이렉트
            window.location.href = googleAuthUrl;

        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleDemoLogin = () => {
        // 데모 계정으로 로그인 (개발/테스트용)
        const demoUser = {
            id: 'demo_user',
            name: '데모 사용자',
            email: 'demo@example.com',
            avatar: null,
            plan: 'Free',
            maxUsage: 3,
            usageCount: 0
        };

        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('auth', JSON.stringify(demoUser));
        console.log('✅ 데모 로그인 성공:', demoUser);
        navigate('/');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* 로고 */}
                        <div
                            onClick={handleBackToHome}
                            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">빙하기에서 살아남기</h1>
                        </div>

                        {/* 뒤로가기 버튼 */}
                        <Button
                            variant="outline"
                            onClick={handleBackToHome}
                            className="flex items-center space-x-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>홈으로</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
                <div className="w-full max-w-lg">
                    {/* Login Card */}
                    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                        <CardHeader className="text-center space-y-6 p-8">
                            {/* 아이콘과 제목 */}
                            <div className="space-y-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                                        창업 여정을 시작하세요
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                                        Google 계정으로 간편하게 로그인하고<br />
                                        AI 기반 창업 아이디어 검증을 경험해보세요
                                    </CardDescription>
                                </div>
                            </div>

                            {/* 로그인 버튼들 */}
                            <div className="space-y-4">
                                {/* Google Login Button */}
                                <Button
                                    onClick={handleGoogleLogin}
                                    size="lg"
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        {/* Google Icon */}
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        <span className="text-gray-700 font-medium">Google로 계속하기</span>
                                    </div>
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-3 text-gray-500">또는</span>
                                    </div>
                                </div>

                                {/* Demo Login Button */}
                                <Button
                                    onClick={handleDemoLogin}
                                    size="lg"
                                    variant="outline"
                                    className="w-full border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="font-medium">데모 계정으로 체험하기</span>
                                    </div>
                                </Button>
                            </div>

                            {/* Service Benefits */}
                            <div className="space-y-4 text-left">
                                <h3 className="text-sm font-semibold text-gray-900 text-center">
                                    ✨ 로그인하면 이런 서비스를 이용할 수 있어요
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">AI 기반 상권 분석</p>
                                            <p className="text-xs text-gray-600">공공데이터로 지역별 시장성 평가</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">AI 콘텐츠 자동 생성</p>
                                            <p className="text-xs text-gray-600">DALL-E와 ChatGPT로 홍보물 제작</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">SNS 반응 테스트</p>
                                            <p className="text-xs text-gray-600">Instagram 업로드로 시장 반응 측정</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">종합 리포트 제공</p>
                                            <p className="text-xs text-gray-600">PDF 다운로드 가능한 분석 결과</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 추가 정보 */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">무료 체험:</span> 월 3회까지 무료로 이용 가능
                                </p>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* 약관 동의 */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 leading-relaxed">
                            로그인하면{' '}
                            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                                이용약관
                            </span>{' '}
                            및{' '}
                            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                                개인정보처리방침
                            </span>
                            에<br />동의하는 것으로 간주됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold">빙하기에서 살아남기</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-center mt-2 text-sm">
                        © 2025 빙하기에서 살아남기. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}