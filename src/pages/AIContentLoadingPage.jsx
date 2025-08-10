import React, { useState, useEffect } from 'react';
import { Brain, Camera, Type, Sparkles, CheckCircle, Clock, Loader, Zap, Palette } from 'lucide-react';
import { Header } from "../components/common/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { generateText, generateImage, savePromotion, getTestData } from '../api/apiClient';

// AI Progress Component
const AIProgressCard = ({ currentTask, progress }) => {
    const tasks = [
        {
            name: 'AI 홍보문구 생성',
            icon: Type,
            description: 'ChatGPT로 홍보문구 및 해시태그 생성',
            color: 'text-green-600'
        },
        {
            name: 'AI 이미지 생성',
            icon: Camera,
            description: 'DALL·E로 인테리어 및 메뉴 이미지 생성',
            color: 'text-purple-600'
        },
        {
            name: '홍보물 저장',
            icon: Sparkles,
            description: '생성된 콘텐츠를 데이터베이스에 저장',
            color: 'text-orange-600'
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-8">
                {/* 메인 AI 아이콘 */}
                <div className="text-center mb-8">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse opacity-20"></div>
                        <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <Brain className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles className="h-3 w-3 text-yellow-800" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">AI가 창의적인 콘텐츠를 생성하고 있습니다</h3>
                </div>

                {/* 작업 목록 */}
                {tasks.map((task, index) => {
                    const Icon = task.icon;
                    let status = 'pending';
                    if (index < currentTask) status = 'completed';
                    else if (index === currentTask) status = 'current';

                    return (
                        <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                status === 'completed'
                                    ? 'bg-green-100'
                                    : status === 'current'
                                        ? 'bg-blue-100'
                                        : 'bg-gray-100'
                            }`}>
                                {status === 'completed' ? (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                ) : status === 'current' ? (
                                    <Loader className="h-6 w-6 text-blue-600 animate-spin" />
                                ) : (
                                    <Icon className={`h-6 w-6 ${task.color} opacity-50`} />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={`font-medium ${
                                        status === 'pending' ? 'text-gray-400' : 'text-gray-900'
                                    }`}>
                                        {task.name}
                                    </h4>
                                    <span className={`text-sm font-medium ${
                                        status === 'completed'
                                            ? 'text-green-600'
                                            : status === 'current'
                                                ? 'text-blue-600 animate-pulse'
                                                : 'text-gray-400'
                                    }`}>
                                        {status === 'completed' ? '완료' : status === 'current' ? '진행중...' : '대기중'}
                                    </span>
                                </div>
                                <p className={`text-sm ${
                                    status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    {task.description}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* Progress Bar */}
                <div className="mt-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>전체 진행률</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Features Card Component
const FeaturesCard = () => {
    const features = [
        {
            icon: Type,
            title: 'ChatGPT 홍보문구',
            description: '업종과 콘셉트에 맞는 효과적인 홍보문구 자동 생성',
            color: 'text-green-600 bg-green-100'
        },
        {
            icon: Camera,
            title: 'DALL·E 이미지 생성',
            description: '전문적인 인테리어 및 메뉴 이미지 3개 생성',
            color: 'text-purple-600 bg-purple-100'
        },
        {
            icon: Palette,
            title: '홍보물 저장',
            description: '생성된 콘텐츠를 데이터베이스에 안전하게 보관',
            color: 'text-orange-600 bg-orange-100'
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

// Main AI Content Loading Page Component
const AIContentLoadingPage = () => {
    // 🎯 상태 관리
    const [currentTask, setCurrentTask] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [aiContent, setAiContent] = useState(null);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // 이전 페이지에서 전달받은 데이터
    const analysisData = location.state?.analysisData;
    const ideaData = location.state?.ideaData;

    // 🚀 AI 콘텐츠 생성 시작
    useEffect(() => {
        const generateAIContent = async () => {
            // 필요한 데이터가 없으면 이전 페이지로 이동
            if (!ideaData) {
                console.error('❌ 필요한 데이터가 없습니다');
                navigate('/idea-input');
                return;
            }

            try {
                console.log('🎨 AI 콘텐츠 생성 시작');
                console.log('📊 분석 데이터:', analysisData);
                console.log('💡 아이디어 데이터:', ideaData);

                const results = {};

                // 📝 1단계: AI 홍보문구 생성
                setCurrentTask(0);
                setProgress(10);

                // 프로그레스 애니메이션
                for (let i = 10; i <= 30; i += 5) {
                    setProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                console.log('📝 ChatGPT 홍보문구 생성 중...');
                // const textResponse = await generateText(ideaData);
                const textResponse = getTestData().aiText
                console.log('✅ 홍보문구 생성 완료:', textResponse);
                results.promotion = textResponse.data;

                // 🎨 2단계: AI 이미지 생성
                setCurrentTask(1);
                setProgress(40);

                for (let i = 40; i <= 70; i += 5) {
                    setProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                console.log('🎨 DALL·E 이미지 생성 중...');
                // const images = await generateImage(ideaData);
                const images = getTestData().aiImages;
                console.log('✅ 이미지 생성 완료:', images);
                results.images = images.data;

                // 💾 3단계: 홍보물 저장
                setCurrentTask(2);
                setProgress(80);

                for (let i = 80; i <= 95; i += 5) {
                    setProgress(i);
                    await new Promise(resolve => setTimeout(resolve, 150));
                }

                console.log('💾 홍보물 저장 중...');
                // const saveResult = await savePromotion(results.promotion, results.images);
                const saveResult = getTestData().promotion
                console.log('✅ 홍보물 저장 완료:', saveResult);

                // ✅ 완료
                setProgress(100);
                await new Promise(resolve => setTimeout(resolve, 1000));

                const finalContent = {
                    promotion: results.promotion,
                    images: results.images,
                    saveResult: saveResult,
                    timestamp: new Date().toISOString()
                };

                setAiContent(finalContent);
                setIsLoading(false);

                console.log('🎉 AI 콘텐츠 생성 완료! AI 콘텐츠 결과 페이지로 이동합니다.');

                // 📱 SNS 업로드 페이지로 이동
                setTimeout(() => {
                    navigate('/ai-content-results', {
                        state: {
                            analysisData: analysisData,
                            ideaData: ideaData,
                            aiContent: finalContent
                        },
                        replace: true
                    });
                }, 1500);

            } catch (error) {
                console.error('💥 AI 콘텐츠 생성 실패:', error);
                setError(error);

                // 🔄 에러 발생 시 테스트 데이터로 진행
                handleAIError();
            }
        };

        generateAIContent();
    }, [analysisData, ideaData, navigate]);

    // 🛠️ 에러 처리 함수
    const handleAIError = async () => {
        console.log('🔄 AI 에러 처리 모드로 전환 - 테스트 데이터 사용');

        try {
            // 테스트 데이터 가져오기
            const testData = getTestData();

            // 진행률 시뮬레이션
            setCurrentTask(2);
            setProgress(90);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProgress(100);
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockAiContent = {
                promotion: testData.aiContent.promotion,
                images: testData.aiContent.images,
                saveResult: "테스트 모드로 저장되었습니다.",
                timestamp: new Date().toISOString(),
                isTestMode: true
            };

            setAiContent(mockAiContent);
            setError(null);
            setIsLoading(false);

            console.log('✅ 테스트 데이터로 완료:', mockAiContent);

            setTimeout(() => {
                navigate('/sns-upload', {
                    state: {
                        analysisData: analysisData,
                        ideaData: ideaData,
                        aiContent: mockAiContent,
                        isTestMode: true
                    },
                    replace: true
                });
            }, 1500);

        } catch (testError) {
            console.error('💥 테스트 데이터도 실패:', testError);
            setError(testError);
            setIsLoading(false);
        }
    };

    // 🎨 에러 화면
    if (error && !aiContent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
                <Header
                    type="app"
                    currentStep={3}
                    showSteps={true}
                    user={user}
                    onLogout={logout}
                    onLogin={() => navigate('/login')}
                    onSignup={() => navigate('/login')}
                />
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Brain className="h-10 w-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-4">AI 콘텐츠 생성 중 오류가 발생했습니다</h2>
                        <p className="text-gray-600 mb-6">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
                        <div className="space-x-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                            >
                                다시 시도
                            </button>
                            <button
                                onClick={() => navigate('/analysis-results')}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                            >
                                이전으로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <Header
                type="app"
                currentStep={3}
                showSteps={true}
                user={user}
                onLogout={logout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/login')}
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* 제목 섹션 */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Zap className="h-8 w-8 text-yellow-500 animate-bounce" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                {isLoading ? 'AI 콘텐츠 생성 중' : 'AI 콘텐츠 생성 완료!'}
                            </h2>
                            <Zap className="h-8 w-8 text-yellow-500 animate-bounce" />
                        </div>
                        <p className="text-gray-600 text-lg">
                            {isLoading
                                ? 'ChatGPT와 DALL·E가 당신만의 독창적인 마케팅 콘텐츠를 만들고 있습니다'
                                : '창의적인 콘텐츠가 준비되었습니다! SNS 업로드 페이지로 이동합니다.'
                            }
                        </p>
                    </div>

                    {/* 진행률 카드 */}
                    <AIProgressCard
                        currentTask={currentTask}
                        progress={progress}
                    />

                    {/* 기능 소개 카드 */}
                    <FeaturesCard />

                    {/* 생성 대상 정보 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <Brain className="h-5 w-5 text-purple-600" />
                            <h4 className="font-semibold text-gray-900">AI 생성 대상 정보</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">업종:</span>
                                <span className="font-medium">{ideaData?.category || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">지역:</span>
                                <span className="font-medium">{ideaData?.gu} {ideaData?.dong}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">메뉴:</span>
                                <span className="font-medium">{ideaData?.menu || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">콘셉트:</span>
                                <span className="font-medium">{ideaData?.concept || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* 하단 정보 */}
                    <div className="text-center mt-12 space-y-3">
                        {isLoading ? (
                            <>
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    <p className="text-lg font-semibold">✨ AI가 만드는 프로페셔널한 콘텐츠</p>
                                </div>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>🎨 약 2-3분 후 고품질 이미지와 홍보 문구가 준비됩니다</p>
                                    <p>📱 생성된 콘텐츠로 바로 SNS 테스트를 진행할 수 있습니다</p>
                                    {error && (
                                        <p className="text-orange-500">⚠️ 네트워크 오류로 테스트 모드로 진행됩니다</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-green-600">
                                    <p className="text-lg font-semibold">🎉 콘텐츠 생성 완료!</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p>📱 SNS 업로드 페이지로 이동 중...</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIContentLoadingPage;