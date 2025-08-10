import {
    ArrowRight,
    BarChart3,
    Brain,
    Camera,
    Share2,
    FileText,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Header} from "../components/common/Header.jsx";

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartAnalysis = () => {
        if(localStorage.getItem('user') === null) {
            alert('로그인부터 해주세요.')
            navigate('/login');
        }else{
            navigate('/idea-input');
        }
    };

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    const features = [
        {
            icon: FileText,
            title: "1. 아이디어 입력",
            description: "업종, 지역, 메뉴, 콘셉트 등 창업 아이디어의 핵심 정보를 입력합니다.",
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: BarChart3,
            title: "2. 상권 분석",
            description: "공공데이터를 활용해 유동인구, 경쟁도 등을 분석하여 창업 적합성을 평가합니다.",
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: Camera,
            title: "3. AI 이미지 생성",
            description: "DALL·E를 활용해 인테리어, 메뉴 등의 시각적 콘텐츠를 자동 생성합니다.",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: Brain,
            title: "4. AI 홍보문구 생성",
            description: "ChatGPT로 업종과 콘셉트에 맞는 홍보문구와 해시태그를 생성합니다.",
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600"
        },
        {
            icon: Share2,
            title: "5. SNS 테스트",
            description: "실제 Instagram에 게시하여 좋아요, 댓글 등 실제 반응을 수집합니다.",
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600"
        },
        {
            icon: FileText,
            title: "6. 시장성 리포트",
            description: "모든 데이터를 종합하여 창업 아이디어의 시장성 리포트를 생성합니다.",
            bgColor: "bg-red-100",
            iconColor: "text-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <Header
                type="landing"
                onNavigate={(section) => scrollToSection(section)}
                onStartAnalysis={() => navigate('/idea-input')}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/login')}
            />

            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            창업 아이디어를 <span className="text-blue-600">데이터로 검증</span>하세요
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            AI와 빅데이터를 활용하여 창업 아이디어의 시장성을 분석하고, 실제 SNS 반응까지 테스트해보는 올인원 플랫폼입니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleStartAnalysis}
                                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                무료로 분석 시작하기
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className="inline-flex items-center justify-center border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                사용법 보기
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            6단계로 완성하는 창업 아이디어 검증
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            복잡한 시장조사 과정을 AI가 자동화하여 빠르고 정확한 결과를 제공합니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
                                >
                                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                        <IconComponent className={`h-6 w-6 ${feature.iconColor}`} />
                                    </div>
                                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            어떻게 작동하나요?
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            간단한 입력만으로 전문가 수준의 창업 분석 결과를 얻어보세요
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {[
                                {
                                    number: 1,
                                    title: "창업 아이디어 입력",
                                    description: "카페, 음식점 등 업종과 원하는 지역, 메뉴, 콘셉트를 입력합니다."
                                },
                                {
                                    number: 2,
                                    title: "데이터 기반 상권 분석",
                                    description: "공공데이터를 활용해 해당 지역의 유동인구, 경쟁업체 현황을 분석합니다."
                                },
                                {
                                    number: 3,
                                    title: "AI 콘텐츠 생성",
                                    description: "AI가 인테리어 이미지와 홍보문구를 자동으로 생성합니다."
                                },
                                {
                                    number: 4,
                                    title: "실제 SNS 반응 테스트",
                                    description: "생성된 콘텐츠를 Instagram에 게시하여 실제 사용자 반응을 측정합니다."
                                },
                                {
                                    number: 5,
                                    title: "종합 리포트 제공",
                                    description: "모든 분석 결과를 종합하여 창업 성공 가능성을 평가한 리포트를 제공합니다."
                                }
                            ].map((step) => (
                                <div key={step.number} className="flex items-start space-x-6 group">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                                        {step.number}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            지금 바로 창업 아이디어를 검증해보세요
                        </h3>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            데이터 기반의 정확한 분석으로 창업 성공률을 높이세요
                        </p>
                    </div>


                    <div className="text-center">
                        <button
                            onClick={handleStartAnalysis}
                            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            무료 분석 시작하기
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <TrendingUp className="h-6 w-6" />
                            <span className="text-lg font-semibold">StartupAnalyzer</span>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <button className="hover:text-white transition-colors">이용약관</button>
                            <button className="hover:text-white transition-colors">개인정보처리방침</button>
                            <button className="hover:text-white transition-colors">문의하기</button>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2024 StartupAnalyzer. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;