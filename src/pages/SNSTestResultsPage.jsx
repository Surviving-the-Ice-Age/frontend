"use client"

import React, { useState, useEffect } from 'react';
import {Badge} from "../components/common/index.js";
import { ArrowRight, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Eye, TrendingUp, Brain, ChevronLeft, ChevronRight, Upload, CheckCircle } from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/common/Card.jsx";
import {Button} from "../components/common/Button.jsx";
import {Header} from "../components/common/Header.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useLocation, useNavigate} from "react-router-dom";

// Progress Component
const Progress = ({ value, className = '' }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div
            className="h-full w-full flex-1 bg-blue-600 transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </div>
);

// Instagram Image Carousel Component
const InstagramCarousel = ({ images, promotionText }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">이미지가 없습니다</span>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto">
            {/* Instagram Header */}
            <div className="flex items-center p-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-0.5">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-800">S</span>
                    </div>
                </div>
                <div className="ml-3">
                    <p className="font-semibold text-sm text-gray-900">startup_test_account</p>
                    <p className="text-xs text-gray-500">테스트 계정</p>
                </div>
            </div>

            {/* Image Carousel */}
            <div className="relative aspect-square">
                <img
                    src={images[currentImageIndex]}
                    alt={`게시물 이미지 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x400?text=Image+${currentImageIndex + 1}`;
                    }}
                />

                {/* Image Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Instagram Actions */}
            <div className="p-4">
                <div className="flex items-center space-x-4 mb-3">
                    <Heart className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
                    <Share2 className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
                    <Bookmark className="h-6 w-6 text-gray-700 cursor-pointer ml-auto hover:text-gray-900 transition-colors" />
                </div>

                {/* Caption */}
                <div className="space-y-2">
                    <p className="text-sm text-gray-900">
                        <span className="font-semibold">startup_test_account</span> {promotionText || '홍보 문구가 여기에 표시됩니다...'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function SNSTestPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // state에서 데이터 가져오기
    const analysisData = location.state?.analysisData;
    const ideaData = location.state?.ideaData;
    const aiContent = location.state?.aiContent;
    const promotionId = location.state?.promotionId;

    console.log('SNS Test Page Data:', { analysisData, ideaData, aiContent, promotionId });

    const [testPhase, setTestPhase] = useState("preparing");
    const [progress, setProgress] = useState(0);
    const [uploadResult, setUploadResult] = useState(null);

    // 안전한 데이터 추출
    const displayImages = aiContent?.images?.data?.images || aiContent?.images?.images || [];
    const displayPromotionText = aiContent?.promotion?.data?.textResponse || aiContent?.promotion?.textResponse || '';

    useEffect(() => {
        // 준비 단계
        if (testPhase === "preparing") {
            const timer = setTimeout(() => {
                setTestPhase("uploading");
                setProgress(10);
            }, 1000);
            return () => clearTimeout(timer);
        }

        // 업로드 단계
        if (testPhase === "uploading") {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev + Math.random() * 15 + 5;
                    if (newProgress >= 100) {
                        setTestPhase("completed");
                        setUploadResult({
                            postId: "p_" + Date.now(),
                            uploadTime: new Date().toLocaleString(),
                            status: "success"
                        });
                        return 100;
                    }
                    return newProgress;
                });
            }, 800);

            return () => clearInterval(interval);
        }
    }, [testPhase]);

    const handleNext = () => {
        if (testPhase === "completed") {
            navigate('/final-report', {
                state: {
                    analysisData,
                    ideaData,
                    aiContent,
                    uploadResult,
                    promotionId
                }
            });
        }
    };

    const handlePrevious = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header
                type="app"
                currentStep={3}
                showSteps={true}
                user={user}
                onLogout={logout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/signup')}
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">SNS 업로드 테스트</h2>
                        <p className="text-gray-600">
                            생성된 콘텐츠를 Instagram에 업로드하여 게시물을 생성합니다.
                        </p>
                    </div>

                    {/* 업로드 상태 */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Upload className="h-5 w-5 text-blue-600" />
                                <span>업로드 진행 상황</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        {testPhase === "preparing" && "업로드 준비 중..."}
                                        {testPhase === "uploading" && "Instagram에 업로드 중..."}
                                        {testPhase === "completed" && "업로드 완료!"}
                                    </span>
                                    <Badge variant={testPhase === "completed" ? "default" : "secondary"}>
                                        {testPhase === "preparing" && "준비"}
                                        {testPhase === "uploading" && "업로드"}
                                        {testPhase === "completed" && "완료"}
                                    </Badge>
                                </div>
                                <Progress value={progress} className="h-3" />
                                <div className="text-xs text-gray-500 text-center">
                                    {testPhase === "preparing" && "콘텐츠를 준비하고 있습니다..."}
                                    {testPhase === "uploading" && "이미지와 홍보 문구를 Instagram에 업로드하고 있습니다..."}
                                    {testPhase === "completed" && "Instagram 게시물이 성공적으로 업로드되었습니다!"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 게시물 미리보기 */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* Instagram 미리보기 */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Instagram 게시물 미리보기</CardTitle>
                                <CardDescription>
                                    Instagram에 업로드될 콘텐츠입니다. 이미지를 좌우로 넘겨보세요.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <InstagramCarousel
                                    images={displayImages}
                                    promotionText={displayPromotionText}
                                />
                            </CardContent>
                        </Card>

                        {/* 업로드 정보 */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    {testPhase === "completed" ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <Upload className="h-5 w-5 text-blue-600" />
                                    )}
                                    <span>업로드 정보</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">이미지 수:</span>
                                            <div className="font-semibold">{displayImages.length}장</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">계정:</span>
                                            <div className="font-semibold">startup_test_account</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">카테고리:</span>
                                            <div className="font-semibold">{ideaData?.category || '-'}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">지역:</span>
                                            <div className="font-semibold">
                                                {ideaData?.district || `${ideaData?.gu || ''} ${ideaData?.dong || ''}`.trim() || '-'}
                                            </div>
                                        </div>
                                    </div>

                                    {uploadResult && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                            <h4 className="font-semibold text-green-900 mb-2">업로드 성공!</h4>
                                            <div className="text-sm text-green-800 space-y-1">
                                                <p><span className="font-medium">게시물 ID:</span> {uploadResult.postId}</p>
                                                <p><span className="font-medium">업로드 시간:</span> {uploadResult.uploadTime}</p>
                                                <p className="text-green-700 mt-2">
                                                    게시물이 성공적으로 업로드되었습니다. 이제 최종 리포트를 확인해보세요!
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {testPhase !== "completed" && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-900 mb-2">업로드 중...</h4>
                                            <p className="text-sm text-blue-800">
                                                콘텐츠를 Instagram에 업로드하고 있습니다. 잠시만 기다려주세요.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 다음 단계 안내 */}
                    {testPhase === "completed" && (
                        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                            <CardHeader>
                                <CardTitle className="text-green-900">다음 단계: 최종 리포트</CardTitle>
                                <CardDescription className="text-green-700">
                                    상권 분석 결과와 AI 콘텐츠를 종합한 최종 리포트를 확인하세요
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white/60 border border-green-100 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-900 mb-2">최종 리포트 내용</h4>
                                    <ul className="text-sm text-green-800 space-y-1">
                                        <li>• 상권 분석 결과 및 점수</li>
                                        <li>• AI 생성 콘텐츠 요약</li>
                                        <li>• 창업 가능성 종합 평가</li>
                                        <li>• 개선 방안 및 추천사항</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* 네비게이션 버튼 */}
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={handlePrevious}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            이전
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="px-8"
                            disabled={testPhase !== "completed"}
                        >
                            최종 리포트 보기
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* 하단 정보 */}
                    <div className="text-center mt-8 space-y-2 text-sm text-gray-500">
                        <p>📱 게시물이 성공적으로 업로드되면 다음 단계로 진행할 수 있습니다</p>
                        <p>📊 최종 리포트에서 창업 아이디어의 종합 평가를 확인해보세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
}