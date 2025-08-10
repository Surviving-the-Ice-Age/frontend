import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    BarChart3,
    Users,
    TrendingUp,
    MapPin,
    Building2,
    Award,
    CheckCircle2,
    Clock,
    Loader2
} from 'lucide-react';
import { Header } from "../components/common/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
    // getDistrictAnalysis,
    getDistrictCategoryAnalysis,
    getScoreAnalysis,
    // getFullAnalysis,
    getTestData
} from '../api/apiClient';

const AnalysisLoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { ideaData } = location.state || {};
    const { user, logout } = useAuth();

    // 로딩 상태 관리
    const [loadingStages, setLoadingStages] = useState({
        region: { status: 'waiting', progress: 0 },       // 상권분석
        district: { status: 'waiting', progress: 0 },     // 상권+업종 분석
        score: { status: 'waiting', progress: 0 }         // 점수 분석
    });

    const [overallProgress, setOverallProgress] = useState(0);

    // 단계별 분석 실행
    const executeAnalysis = async () => {
        try {
            console.log('🚀 분석 시작 - 전송할 데이터:', ideaData);

            const results = {};

            // 1단계: 상권 분석
            updateStageStatus('region', 'loading', 0);

            // 프로그레스 애니메이션
            for (let i = 0; i <= 90; i += 10) {
                updateStageStatus('region', 'loading', i);
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            console.log('📡 API 호출 중...');
            // const regionData = await getDistrictAnalysis(region_code);
            const regionData = getTestData().region
            console.log('✅ 상권 분석 완료:', regionData);

            results.region = regionData;
            updateStageStatus('region', 'completed', 100);
            await new Promise(resolve => setTimeout(resolve, 300));

            // 2단계: 상권+업종 분석
            updateStageStatus('district', 'loading', 0);

            for (let i = 0; i <= 90; i += 10) {
                updateStageStatus('district', 'loading', i);
                await new Promise(resolve => setTimeout(resolve, 120));
            }

            // const districtData = await getDistrictCategoryAnalysis(region_code, category_code);
            const districtData = getTestData().district;
            console.log('✅ 상권+업종 분석 완료:', districtData);

            results.district = districtData;
            updateStageStatus('district', 'completed', 100);
            await new Promise(resolve => setTimeout(resolve, 300));


            // 3단계: 점수 분석
            updateStageStatus('score', 'loading', 0);

            for (let i = 0; i <= 90; i += 10) {
                updateStageStatus('score', 'loading', i);
                await new Promise(resolve => setTimeout(resolve, 80));
            }

            // const scoreData = await getScoreAnalysis(region_code, category_code);
            const scoreData = getTestData().score
            console.log('✅ 점수 분석 완료:', scoreData);

            results.score = scoreData;
            updateStageStatus('score', 'completed', 100);

            // 모든 분석 완료
            const finalResults = {
                region: results.region.data,
                district: results.district.data,
                score: results.score.data,
                timestamp: new Date().toISOString()
            };

            console.log('✅ API 응답 받음:', finalResults);

            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('🎉 분석 완료! 결과 페이지로 이동합니다.');

            // 결과 페이지로 이동
            navigate('/analysis-results', {
                state: {
                    analysisData: finalResults,
                    ideaData: ideaData
                }
            });

        } catch (error) {
            console.error('분석 중 오류 발생:', error);
            alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
            navigate('/idea-input');
        }
    };

    // 로딩 상태 업데이트
    const updateStageStatus = (stage, status, progress) => {
        setLoadingStages(prev => {
            const newStages = {
                ...prev,
                [stage]: { status, progress }
            };

            // 전체 진행률 계산
            const totalProgress = (newStages.region.progress + newStages.district.progress + newStages.score.progress) / 3;
            setOverallProgress(totalProgress);

            return newStages;
        });
    };

    // 컴포넌트 마운트 시 분석 시작
    useEffect(() => {
        if (!ideaData) {
            navigate('/idea-input');
            return;
        }

        executeAnalysis();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header
                type="app"
                currentStep={2}
                showSteps={true}
                user={user}
                onLogout={logout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/login')}
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="h-8 w-8 text-blue-600 animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">상권 데이터를 분석하고 있습니다</h2>
                        <p className="text-gray-600 mb-8">공공데이터를 활용하여 유동인구, 경쟁도 등을 분석 중입니다...</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="space-y-4">
                            {/* 1단계: 상권 분석 */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-3">
                                    {loadingStages.region.status === 'completed' ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : loadingStages.region.status === 'loading' ? (
                                        <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                    ) : (
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    )}
                                    <span>상권 데이터 수집</span>
                                </div>
                                <span className={
                                    loadingStages.region.status === 'completed' ? 'text-green-600' :
                                        loadingStages.region.status === 'loading' ? 'text-blue-600' :
                                            'text-gray-400'
                                }>
                                    {loadingStages.region.status === 'completed' ? '완료' :
                                        loadingStages.region.status === 'loading' ? '진행중...' : '대기중'}
                                </span>
                            </div>

                            {/* 2단계: 상권+업종 분석 */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-3">
                                    {loadingStages.district.status === 'completed' ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : loadingStages.district.status === 'loading' ? (
                                        <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                    ) : (
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    )}
                                    <span>업종업체 현황 분석</span>
                                </div>
                                <span className={
                                    loadingStages.district.status === 'completed' ? 'text-green-600' :
                                        loadingStages.district.status === 'loading' ? 'text-blue-600' :
                                            'text-gray-400'
                                }>
                                    {loadingStages.district.status === 'completed' ? '완료' :
                                        loadingStages.district.status === 'loading' ? '진행중...' : '대기중'}
                                </span>
                            </div>

                            {/* 3단계: 점수 분석 */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-3">
                                    {loadingStages.score.status === 'completed' ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : loadingStages.score.status === 'loading' ? (
                                        <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                    ) : (
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    )}
                                    <span>시장 전망 평가</span>
                                </div>
                                <span className={
                                    loadingStages.score.status === 'completed' ? 'text-green-600' :
                                        loadingStages.score.status === 'loading' ? 'text-blue-600' :
                                            'text-gray-400'
                                }>
                                    {loadingStages.score.status === 'completed' ? '완료' :
                                        loadingStages.score.status === 'loading' ? '진행중...' : '대기중'}
                                </span>
                            </div>

                            {/* 전체 진행률 바 */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${Math.round(overallProgress)}%` }}
                                ></div>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                {Math.round(overallProgress)}% 완료
                            </div>
                        </div>
                    </div>

                    {/* 분석 대상 정보 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <Users className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-900">분석 대상 정보</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <div className="text-center mt-8 space-y-2 text-sm text-gray-500">
                        <p>📊 공공데이터를 기반으로 정확한 분석을 진행합니다</p>
                        <p>⏱️ 분석 완료까지 약 30초 정도 소요됩니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisLoadingPage;