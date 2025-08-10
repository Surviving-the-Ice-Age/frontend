import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Users,
    TrendingUp,
    MapPin,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    DollarSign,
    Building2,
    PlusCircle,
    MinusCircle,
    Percent
} from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/common/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, subtitle, badgeText, badgeColor, iconColor }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>

            <div className="mb-3">
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}>
                {badgeText}
            </span>
        </div>
    );
};

// Summary Card Component
const SummaryCard = ({ analysisData }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">상권 분석 요약</h3>
            </div>

            {/* 주요 결과 요약 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-2">분석 결과</h4>
                        <p className="text-blue-800">
                            {analysisData?.region?.summary || '상권 분석이 완료되었습니다.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* 상세 분석 정보 - 2열로 배치 */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* 지역 특성 */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">지역 특성</h4>
                    <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">주거인구</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.region?.genderResidence || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">직장인구</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.region?.genderWorker || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">유동인구 시간대</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.region?.floatingTime || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">유동인구 연령대</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.region?.floatingAge || '데이터 없음'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 업종 분석 */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">업종 분석</h4>
                    <div className="space-y-3">
                        <div className="bg-green-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">주요 고객층</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.district?.salesGender || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">매출 집중 시간</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.district?.salesTime || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">소비 연령대</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.district?.salesAge || '데이터 없음'}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">프랜차이즈 비율</span>
                            <p className="text-sm text-gray-700 mt-1">
                                {analysisData?.district?.storeFranchise || '데이터 없음'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Results Page Component
const AnalysisResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { analysisData, ideaData } = location.state || {};
    const { user, logout } = useAuth();

    console.log('idea data:', ideaData);
    console.log('analysis data:', analysisData);

    // 안전한 숫자 변환 함수
    const safeNumber = (value, defaultValue = 0) => {
        const num = Number(value);
        return isNaN(num) ? defaultValue : num;
    };

    // 점수에 따른 배지 색상 결정
    const getBadgeColor = (score, thresholds = { high: 30, medium: 20 }) => {
        if (score >= thresholds.high) return "bg-green-100 text-green-800";
        if (score >= thresholds.medium) return "bg-orange-100 text-orange-800";
        return "bg-red-100 text-red-800";
    };

    const getBadgeText = (score, thresholds = { high: 30, medium: 20 }) => {
        if (score >= thresholds.high) return "높음";
        if (score >= thresholds.medium) return "보통";
        return "낮음";
    };

    const handleSubmit = () => {
        // AI 콘텐츠 생성 페이지로 이동
        alert("AI 콘텐츠 생성 페이지로 이동합니다.");
        navigate('/ai-content-loading', {
            state: {ideaData, analysisData}
        });
    };

    const handlePrevious = () => {
        // 이전 페이지로 이동
        window.history.back();
    };

    // 분석 데이터가 없는 경우 에러 처리
    if (!analysisData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">분석 데이터를 불러올 수 없습니다</h2>
                    <p className="text-gray-600 mb-4">다시 시도해주세요.</p>
                    <button
                        onClick={() => navigate('/idea-input')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        처음부터 다시 시작
                    </button>
                </div>
            </div>
        );
    }

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
                <div className="max-w-6xl mx-auto">
                    {/* 제목 섹션 */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">상권 분석 완료!</h2>
                        <p className="text-gray-600 text-lg">선택하신 지역의 상권 데이터를 분석한 결과입니다.</p>
                    </div>

                    {/* 메트릭 카드들 - 실제 API 데이터 사용 */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <MetricCard
                            icon={Users}
                            title="유동인구"
                            value={safeNumber(analysisData?.score?.유동인구).toLocaleString() + "점"}
                            subtitle="유동인구 점수"
                            badgeText={getBadgeText(safeNumber(analysisData?.score?.유동인구), { high: 30, medium: 15 })}
                            badgeColor={getBadgeColor(safeNumber(analysisData?.score?.유동인구), { high: 30, medium: 15 })}
                            iconColor="bg-blue-100 text-blue-600"
                        />

                        <MetricCard
                            icon={BarChart3}
                            title="동종업종 점포수"
                            value={safeNumber(analysisData?.score?.['동종업종_점포수']).toLocaleString() + "점"}
                            subtitle="경쟁도 지수"
                            badgeText={getBadgeText(safeNumber(analysisData?.score?.['동종업종_점포수']), { high: 70, medium: 40 })}
                            badgeColor={getBadgeColor(safeNumber(analysisData?.score?.['동종업종_점포수']), { high: 70, medium: 40 })}
                            iconColor="bg-orange-100 text-orange-600"
                        />

                        <MetricCard
                            icon={TrendingUp}
                            title="최종점수"
                            value={safeNumber(analysisData?.score?.최종점수).toLocaleString() + "점"}
                            subtitle="종합 평가 점수"
                            badgeText={getBadgeText(safeNumber(analysisData?.score?.최종점수), { high: 30, medium: 20 })}
                            badgeColor={getBadgeColor(safeNumber(analysisData?.score?.최종점수), { high: 30, medium: 20 })}
                            iconColor="bg-green-100 text-green-600"
                        />
                    </div>

                    {/* 요약 카드 */}
                    <div className="mb-12">
                        <SummaryCard analysisData={analysisData} />
                    </div>

                    {/* 매출 정보 카드 - UI 개선 */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* 지역 평균 매출 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <DollarSign className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">지역 평균 매출</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                {/* 매출 금액 추출 및 표시 */}
                                {(() => {
                                    const salesText = analysisData?.region?.areaAverage || '';
                                    const amountMatch = salesText.match(/(\d+(?:,\d+)*)만원/);
                                    const amount = amountMatch ? amountMatch[1] : null;

                                    // 변화량 추출
                                    const increaseMatch = salesText.match(/▲\s*(\d+(?:,\d+)*)만원/);
                                    const decreaseMatch = salesText.match(/▼\s*(\d+(?:,\d+)*)만원/);

                                    return (
                                        <div>
                                            {amount ? (
                                                <div className="mb-4">
                                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                                        {amount}만원
                                                    </div>
                                                    <p className="text-sm text-gray-500">월 평균 매출</p>
                                                </div>
                                            ) : null}

                                            {/* 변화량 표시 */}
                                            <div className="space-y-2">
                                                {increaseMatch && (
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                        <span className="text-red-600">전분기 대비 ▲ {increaseMatch[1]}만원</span>
                                                    </div>
                                                )}
                                                {decreaseMatch && (
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span className="text-blue-600">전분기 대비 ▼ {decreaseMatch[1]}만원</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* 원본 데이터 (작게 표시) */}
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <details className="text-xs text-gray-500">
                                                    <summary className="cursor-pointer hover:text-gray-700">상세 정보</summary>
                                                    <div className="mt-2 whitespace-pre-line">
                                                        {salesText || '데이터 없음'}
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* 업종별 분석 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">업종별 분석</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                {/* 업종 매출 하이라이트 */}
                                {(() => {
                                    const salesText = analysisData?.district?.salesMonthly || '';
                                    const amountMatch = salesText.match(/(\d+(?:,\d+)*)만원/);
                                    const amount = amountMatch ? amountMatch[1] : null;

                                    return amount ? (
                                        <div className="mb-6">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                                {amount}만원
                                            </div>
                                            <p className="text-sm text-gray-500">업종 월 평균 매출</p>
                                        </div>
                                    ) : null;
                                })()}

                                {/* 업종 정보 카드들 */}
                                <div className="grid grid-cols-1 gap-3">
                                    {/* 점포 현황 */}
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Building2 className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium text-blue-900">점포 현황</span>
                                            </div>
                                            <div className="text-sm font-bold text-blue-800">
                                                {(() => {
                                                    const storeText = analysisData?.district?.storeCount || '';
                                                    const match = storeText.match(/(\d+)개/);
                                                    return match ? `${match[1]}개` : '-';
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 개업 현황 */}
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <PlusCircle className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-900">신규 개업</span>
                                            </div>
                                            <div className="text-sm font-bold text-green-800">
                                                {(() => {
                                                    const openText = analysisData?.district?.storeOpen || '';
                                                    const match = openText.match(/(\d+)개/);
                                                    return match ? `${match[1]}개` : '-';
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 폐업 현황 */}
                                    <div className="bg-red-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <MinusCircle className="h-4 w-4 text-red-600" />
                                                <span className="text-sm font-medium text-red-900">폐업</span>
                                            </div>
                                            <div className="text-sm font-bold text-red-800">
                                                {(() => {
                                                    const closeText = analysisData?.district?.storeClose || '';
                                                    const match = closeText.match(/(\d+)개/);
                                                    return match ? `${match[1]}개` : '-';
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 프랜차이즈 비율 */}
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Percent className="h-4 w-4 text-purple-600" />
                                                <span className="text-sm font-medium text-purple-900">프랜차이즈</span>
                                            </div>
                                            <div className="text-sm font-bold text-purple-800">
                                                {analysisData?.district?.storeFranchise?.match(/(\d+\.?\d*)%/)?.[1]
                                                    ? `${analysisData.district.storeFranchise.match(/(\d+\.?\d*)%/)[1]}%`
                                                    : '-'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 상세 정보 */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <details className="text-xs text-gray-500">
                                        <summary className="cursor-pointer hover:text-gray-700">상세 정보</summary>
                                        <div className="mt-2 space-y-2">
                                            <div className="whitespace-pre-line">
                                                <strong>매출:</strong> {analysisData?.district?.salesMonthly || '데이터 없음'}
                                            </div>
                                            <div>
                                                <strong>점포:</strong> {analysisData?.district?.storeCount || '데이터 없음'}
                                            </div>
                                            <div>
                                                <strong>개업:</strong> {analysisData?.district?.storeOpen || '데이터 없음'}
                                            </div>
                                            <div>
                                                <strong>폐업:</strong> {analysisData?.district?.storeClose || '데이터 없음'}
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 네비게이션 버튼 */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>이전</span>
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                            <span>AI 콘텐츠 생성</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* 하단 정보 */}
                    <div className="text-center mt-8 space-y-2 text-sm text-gray-500">
                        <p>🎨 다음 단계에서 AI가 인테리어 이미지와 홍보 문구를 생성합니다</p>
                        <p>📱 생성된 콘텐츠로 실제 SNS 반응을 테스트해보세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResultsPage;