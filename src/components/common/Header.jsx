import React, { useState } from 'react';
import { Brain, TrendingUp, Menu, X, User, LogOut, Settings, FileText, Plus } from 'lucide-react';
import {Button} from "./Button.jsx";
import {Badge} from "./Badge.jsx";


// 드롭다운 메뉴 컴포넌트들
const DropdownMenu = ({ trigger, children, isOpen, onToggle }) => (
    <div className="relative">
        <div onClick={onToggle} className="cursor-pointer">
            {trigger}
        </div>
        {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {children}
            </div>
        )}
    </div>
);

const DropdownItem = ({ icon: Icon, children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 ${className}`}
    >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{children}</span>
    </button>
);

// Progress Steps 컴포넌트
const ProgressSteps = ({ steps = [] }) => (
    <div className="hidden lg:flex items-center space-x-2 text-sm">
        {steps.map((step, index) => (
            <React.Fragment key={step.number}>
                <div className="flex items-center space-x-2">
                    <Badge
                        variant={step.status === 'completed' ? 'success' :
                            step.status === 'current' ? 'default' : 'secondary'}
                        className={`${
                            step.status === 'completed' ? 'bg-green-600 text-white' :
                                step.status === 'current' ? 'bg-blue-600 text-white' :
                                    'bg-gray-200 text-gray-400'
                        }`}
                    >
                        {step.status === 'completed' ? '✓' : step.number}
                    </Badge>
                    <span className={`${
                        step.status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                        {step.label}
                    </span>
                </div>
                {index < steps.length - 1 && (
                    <span className="text-gray-300">→</span>
                )}
            </React.Fragment>
        ))}
    </div>
);

// 랜딩페이지 네비게이션 컴포넌트
const LandingNavigation = ({ onNavigate, onStartAnalysis }) => (
    <nav className="hidden md:flex items-center space-x-6">
        <Button
            variant="ghost"
            onClick={() => onNavigate('features')}
        >
            기능
        </Button>
        <Button
            variant="ghost"
            onClick={() => onNavigate('how-it-works')}
        >
            사용법
        </Button>
        {/* 로그인 버튼 추가 */}
        <Button
            variant="outline"
            onClick={() => window.location.href = '/login'}
        >
            로그인
        </Button>
        <Button
            variant="default"
            onClick={onStartAnalysis}
        >
            시작하기
        </Button>
    </nav>
);

// 통합 Header 컴포넌트
export const Header = ({
                           // 페이지 타입
                           type = 'landing', // 'landing' | 'app'

                           // 공통 props
                           user = null,
                           onLogin,
                           onSignup,
                           onLogout,
                           className = '',

                           // 랜딩페이지 props
                           onNavigate, // 섹션 네비게이션 함수
                           onStartAnalysis, // 시작하기 버튼 클릭

                           // 앱 내부 props
                           currentStep = 0,
                           showSteps = false,
                       }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // 진행 단계 정의
    const defaultSteps = [
        { number: 1, label: '아이디어 입력', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'pending' },
        { number: 2, label: '상권 분석', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
        { number: 3, label: 'AI 콘텐츠', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
        { number: 4, label: 'SNS 테스트', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending' },
        { number: 5, label: '리포트', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending' }
    ];

    const userData = user || {
        name: '홍길동',
        email: 'hong@example.com',
        avatar: null,
        usageCount: 2,
        maxUsage: 3
    };

    // 랜딩페이지인지 앱 내부인지에 따라 로고 아이콘 변경
    const LogoIcon = type === 'landing' ? TrendingUp : Brain;

    const handleNewAnalysis = () => {
        console.log('새 분석 시작');
        if (onStartAnalysis) {
            onStartAnalysis();
        } else {
            window.location.href = '/idea-input';
        }
    };

    const handleMyPage = () => {
        console.log('마이페이지로 이동');
        window.location.href = '/mypage';
    };

    const handleSettings = () => {
        console.log('설정 페이지로 이동');
        window.location.href = '/settings';
    };

    const handleHistory = () => {
        console.log('분석 히스토리로 이동');
        window.location.href = '/history';
    };

    return (
        <header className={`border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 ${className}`}>
            <div className={`container mx-auto px-4 py-4 ${type === 'landing' ? 'max-w-7xl' : 'container'}`}>
                <div className="flex items-center justify-between">
                    {/* 로고 */}
                    <a
                        href="/"
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        <Brain className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">StartupAnalyzer</h1>
                    </a>

                    {/* 중앙 영역 - 진행 단계 (앱 내부) 또는 비워둠 (랜딩) */}
                    {type === 'app' && showSteps && (
                        <ProgressSteps currentStep={currentStep} steps={defaultSteps} />
                    )}

                    {/* 우측 네비게이션 */}
                    <div className="flex items-center">
                        {type === 'landing' ? (
                            // 랜딩페이지 네비게이션
                            <>
                                <LandingNavigation
                                    onNavigate={onNavigate}
                                    onStartAnalysis={onStartAnalysis}
                                />

                                {/* 모바일 시작하기 버튼 */}
                                <div className="md:hidden">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={onStartAnalysis}
                                    >
                                        시작하기
                                    </Button>
                                </div>
                            </>
                        ) : (
                            // 앱 내부 네비게이션
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    // 로그인된 상태
                                    <>
                                        {/* 새 분석 버튼 */}
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={handleNewAnalysis}
                                            className="hidden sm:flex"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            새 분석
                                        </Button>

                                        {/* 사용량 표시 */}
                                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                                            <span>이번 달</span>
                                            <Badge variant="outline">
                                                {userData.usageCount}/{userData.maxUsage}
                                            </Badge>
                                        </div>

                                        {/* 사용자 메뉴 */}
                                        <DropdownMenu
                                            isOpen={isUserMenuOpen}
                                            onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            trigger={
                                                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
                                                    {userData.avatar ? (
                                                        <img
                                                            src={userData.avatar}
                                                            alt="프로필"
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">
                                                                {userData.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="hidden sm:block text-left">
                                                        <div className="text-sm font-medium text-gray-900">{userData.name}</div>
                                                        <div className="text-xs text-gray-500">{userData.plan} 플랜</div>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <DropdownItem icon={User} onClick={handleMyPage}>
                                                마이페이지
                                            </DropdownItem>
                                            <DropdownItem icon={FileText} onClick={handleHistory}>
                                                분석 히스토리
                                            </DropdownItem>
                                            <DropdownItem icon={Settings} onClick={handleSettings}>
                                                설정
                                            </DropdownItem>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <DropdownItem
                                                icon={LogOut}
                                                onClick={onLogout}
                                                className="text-red-600 hover:bg-red-50"
                                            >
                                                로그아웃
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </>
                                ) : (
                                    // 로그인되지 않은 상태
                                    <>
                                        <div className="hidden sm:flex items-center space-x-3">
                                            <span className="text-sm text-gray-600">계정이 없으신가요?</span>
                                            <Button variant="outline" size="sm" onClick={onSignup}>
                                                회원가입
                                            </Button>
                                            <Button variant="default" size="sm" onClick={onLogin}>
                                                로그인
                                            </Button>
                                        </div>

                                        {/* 모바일 메뉴 버튼 */}
                                        <button
                                            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        >
                                            {isMenuOpen ? (
                                                <X className="h-6 w-6 text-gray-600" />
                                            ) : (
                                                <Menu className="h-6 w-6 text-gray-600" />
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 모바일 진행률 (앱 내부 + 단계 표시 시) */}
                    {type === 'app' && showSteps && (
                        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
                            <span className="text-sm text-gray-600">{currentStep + 1}/5</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 모바일 메뉴 (앱 내부 + 로그인되지 않은 상태) */}
                {type === 'app' && !user && isMenuOpen && (
                    <div className="sm:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                onClick={onSignup}
                            >
                                회원가입
                            </Button>
                            <Button
                                variant="default"
                                className="w-full justify-center"
                                onClick={onLogin}
                            >
                                로그인
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

// 사용법 예시:
/*
// 1. 랜딩페이지에서 사용
<Header
  type="landing"
  onNavigate={(section) => scrollToSection(section)}
  onStartAnalysis={() => navigate('/idea-input')}
/>

// 2. 앱 내부 (로그인 전)
<Header
  type="app"
  onLogin={() => navigate('/login')}
  onSignup={() => navigate('/signup')}
/>

// 3. 앱 내부 (로그인 후 + 진행 단계)
<Header
    type="app"
    currentStep={3}
    showSteps={true}
    user={user}
    onLogout={logout}
    onLogin={() => navigate('/login')}
    onSignup={() => navigate('/signup')}
/>

// 4. 앱 내부 (로그인 후 + 진행 단계 없음)
<Header
  type="app"
  user={user}
  showSteps={false}
  onLogout={handleLogout}
/>
*/