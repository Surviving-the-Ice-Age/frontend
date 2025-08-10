import React, { useState } from 'react';
import { FileText, Download, Share, Star, TrendingUp, Users, MapPin, Brain, Share2, BarChart3, CheckCircle2, AlertTriangle, Lightbulb, Target, Award, Calendar, DollarSign } from 'lucide-react';
import {Header} from "../components/common/Header.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

// Executive Summary Component
const ExecutiveSummary = () => {
    const overallScore = 82;
    const recommendation = "창업 추천";

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <Award className="h-8 w-8" />
                        <h2 className="text-2xl font-bold">종합 시장성 평가</h2>
                    </div>

                    <div className="text-6xl font-bold mb-4">{overallScore}점</div>
                    <div className="text-blue-100 text-lg mb-6">100점 만점</div>

                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold ${
                        overallScore >= 80 ? 'bg-green-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>{recommendation}</span>
                    </div>
                </div>

                <div className="bg-white bg-opacity-20 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">핵심 결론</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>강남구 카페 창업은 <strong>높은 성공 가능성</strong>을 보입니다</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>북유럽 감성 콘셉트가 <strong>시장 트렌드</strong>와 부합합니다</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>SNS 반응이 <strong>업계 평균 대비 32% 높음</strong></span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>예상 회수 기간: <strong>18-24개월</strong></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Detailed Analysis Component
const DetailedAnalysis = () => {
    const analysisData = [
        {
            category: '상권 분석',
            icon: MapPin,
            score: 85,
            color: 'from-green-500 to-green-600',
            details: [
                '일평균 유동인구: 45,230명 (높음)',
                '대중교통 접근성: 우수',
                '주변 오피스 밀집도: 높음',
                '경쟁업체 수: 보통 수준'
            ]
        },
        {
            category: 'AI 콘텐츠',
            icon: Brain,
            score: 88,
            color: 'from-purple-500 to-purple-600',
            details: [
                '이미지 품질: 전문가 수준',
                '홍보 문구: 높은 완성도',
                '브랜드 일관성: 우수',
                '플랫폼 최적화: 완료'
            ]
        },
        {
            category: 'SNS 반응',
            icon: Share2,
            score: 78,
            color: 'from-pink-500 to-pink-600',
            details: [
                '총 조회수: 9,774회',
                '평균 참여율: 6.7%',
                '타겟층 반응: 매우 높음',
                '지역 관심도: 강남권 집중'
            ]
        },
        {
            category: '시장 적합성',
            icon: Target,
            score: 82,
            color: 'from-blue-500 to-blue-600',
            details: [
                '트렌드 부합도: 높음',
                '타겟 고객층: 명확',
                '차별화 요소: 우수',
                '확장 가능성: 보통'
            ]
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            {analysisData.map((analysis, index) => {
                const Icon = analysis.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 bg-gradient-to-r ${analysis.color} rounded-full flex items-center justify-center`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{analysis.category}</h3>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{analysis.score}점</div>
                                <div className="text-sm text-gray-600">100점 만점</div>
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {analysis.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

// Risk Assessment Component
const RiskAssessment = () => {
    const risks = [
        {
            level: 'low',
            title: '시장 포화도',
            description: '강남구 카페 밀도는 높지만, 차별화된 콘셉트로 경쟁력 확보 가능',
            impact: '낮음'
        },
        {
            level: 'medium',
            title: '임대료 상승',
            description: '강남권 임대료 상승 추세로 초기 투자비용 증가 가능성',
            impact: '보통'
        },
        {
            level: 'low',
            title: '계절적 변동',
            description: '카페는 계절별 매출 변동이 크지 않은 안정적 업종',
            impact: '낮음'
        }
    ];

    const getRiskColor = (level) => {
        switch (level) {
            case 'high': return 'text-red-600 bg-red-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'low': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getRiskText = (level) => {
        switch (level) {
            case 'high': return '높음';
            case 'medium': return '보통';
            case 'low': return '낮음';
            default: return '미정';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">리스크 분석</h3>
            </div>

            <div className="space-y-4">
                {risks.map((risk, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.level)}`}>
                {getRiskText(risk.level)}
              </span>
                        </div>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Financial Projection Component
const FinancialProjection = () => {
    const projections = [
        { period: '1개월', revenue: '1,200만원', profit: '240만원' },
        { period: '6개월', revenue: '7,800만원', profit: '1,950만원' },
        { period: '12개월', revenue: '1억 6,800만원', profit: '5,040만원' },
        { period: '24개월', revenue: '3억 6,000만원', profit: '1억 2,600만원' }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">수익성 전망</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                {projections.map((proj, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-xl">
                        <div className="text-lg font-bold text-green-800 mb-2">{proj.period}</div>
                        <div className="text-sm text-gray-600 mb-1">매출</div>
                        <div className="text-xl font-bold text-gray-900 mb-2">{proj.revenue}</div>
                        <div className="text-sm text-gray-600 mb-1">순이익</div>
                        <div className="text-lg font-semibold text-green-600">{proj.profit}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 text-blue-800">
                    <Lightbulb className="h-5 w-5" />
                    <span className="font-medium">초기 투자 회수 예상 기간: 18-24개월</span>
                </div>
            </div>
        </div>
    );
};

// Action Plan Component
const ActionPlan = () => {
    const steps = [
        {
            phase: '1단계 (1-2개월)',
            title: '사업 준비',
            tasks: ['임대차 계약 체결', '인테리어 공사', '사업자 등록', '직원 채용']
        },
        {
            phase: '2단계 (3개월)',
            title: '오픈 준비',
            tasks: ['메뉴 개발 완료', 'SNS 마케팅 시작', '시범 운영', '정식 오픈']
        },
        {
            phase: '3단계 (4-6개월)',
            title: '안정화',
            tasks: ['고객 기반 확보', '운영 최적화', '추가 메뉴 출시', '단골 고객 관리']
        },
        {
            phase: '4단계 (7-12개월)',
            title: '성장',
            tasks: ['매출 안정화', '브랜드 강화', '확장 계획 수립', '추가 매장 검토']
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">실행 계획</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{step.title}</div>
                                <div className="text-sm text-blue-600">{step.phase}</div>
                            </div>
                        </div>
                        <ul className="space-y-1">
                            {step.tasks.map((task, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                                    <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                                    <span>{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Export Actions Component
const ExportActions = () => {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async (format) => {
        setDownloading(true);
        // 다운로드 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDownloading(false);
        console.log(`${format} 다운로드 완료`);
    };

    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">리포트 다운로드</h3>
                <p className="text-purple-100 mb-8">
                    완성된 시장성 리포트를 다양한 형태로 저장하고 공유하세요
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => handleDownload('PDF')}
                        disabled={downloading}
                        className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
                    >
                        <Download className="h-4 w-4" />
                        <span>{downloading ? '다운로드 중...' : 'PDF 다운로드'}</span>
                    </button>

                    <button
                        onClick={() => handleDownload('Excel')}
                        disabled={downloading}
                        className="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-xl hover:bg-opacity-30 transition-colors font-medium disabled:opacity-50"
                    >
                        <BarChart3 className="h-4 w-4" />
                        <span>Excel 다운로드</span>
                    </button>

                    <button
                        onClick={() => navigator.share({ title: '창업 시장성 리포트', text: '82점의 높은 시장성을 보인 강남구 카페 창업 리포트입니다.' })}
                        className="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-xl hover:bg-opacity-30 transition-colors font-medium"
                    >
                        <Share className="h-4 w-4" />
                        <span>공유하기</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Report Page Component
const FinalReportPage = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Header
                type="app"
                currentStep={4}
                showSteps={true}
                user={user}
                onLogout={logout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/signup')}
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* 제목 섹션 */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">시장성 분석 리포트</h1>
                        <p className="text-gray-600 text-lg">강남구 북유럽 감성 카페 창업 종합 분석</p>
                        <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                            <span>분석 일자: 2025.07.30</span>
                            <span>•</span>
                            <span>리포트 ID: SA-2025-0730-001</span>
                        </div>
                    </div>

                    {/* 종합 평가 */}
                    <ExecutiveSummary />

                    {/* 세부 분석 */}
                    <DetailedAnalysis />

                    {/* 리스크 분석 */}
                    <RiskAssessment />

                    {/* 수익성 전망 */}
                    <FinancialProjection />

                    {/* 실행 계획 */}
                    <ActionPlan />

                    {/* 다운로드 액션 */}
                    <ExportActions />

                    {/* 하단 정보 */}
                    <div className="text-center mt-12 space-y-2 text-sm text-gray-500">
                        <p>🎉 축하합니다! 높은 시장성을 보이는 창업 아이디어입니다</p>
                        <p>📞 추가 컨설팅이 필요하시면 언제든 연락주세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalReportPage;