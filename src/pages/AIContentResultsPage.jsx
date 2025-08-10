import React, { useState, useEffect } from 'react';
import { Brain, Camera, Type, Download, RefreshCw, Copy, Check, ArrowRight, ArrowLeft, Sparkles, Heart, MessageSquare, Bookmark, Upload } from 'lucide-react';
import {
    Button, Card, Badge,
    CardContent, CardDescription,
    CardHeader,
    CardTitle, Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "../components/common/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/common/Header.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { generateAIContent, getTestData, savePromotion } from "../api/apiClient.jsx";

// Image Gallery Component
const ImageGallery = ({ images }) => {
    return (
        <Card className="border-gray-200">
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <Camera className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-xl">생성된 이미지</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {images && images.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-4">
                        {images.map((imageUrl, index) => (
                            <Card key={index} className="overflow-hidden border-gray-200">
                                <div className="aspect-[4/3] relative overflow-hidden group">
                                    <img
                                        src={imageUrl}
                                        alt={`AI 생성 이미지 ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/400x300?text=Image+${index + 1}`;
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 hover:bg-white"
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = imageUrl;
                                                link.download = `ai-image-${index + 1}.jpg`;
                                                link.click();
                                            }}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary">
                                            이미지 {index + 1}
                                        </Badge>
                                    </div>
                                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                                        AI 생성 이미지 {index + 1}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                        DALL-E로 생성된 이미지
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>이미지가 없습니다.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Text Content Component
const TextContent = ({ promotionText, onPromotionChange, onCopy }) => {
    const [copiedText, setCopiedText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');

    // promotionText가 변경되면 editedText도 업데이트
    useEffect(() => {
        const textToSet = typeof promotionText === 'string' ? promotionText : '';
        setEditedText(textToSet);
    }, [promotionText]);

    const handleCopy = async (text) => {
        try {
            if (typeof text === 'string' && text.trim()) {
                await navigator.clipboard.writeText(text);
                setCopiedText('copied');
                setTimeout(() => setCopiedText(''), 2000);
                onCopy && onCopy();
            }
        } catch (error) {
            console.error('복사 실패:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onPromotionChange(editedText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        const textToSet = typeof promotionText === 'string' ? promotionText : '';
        setEditedText(textToSet);
        setIsEditing(false);
    };

    const displayText = typeof promotionText === 'string' ? promotionText : '';
    const hasValidText = displayText.trim().length > 0;

    return (
        <Card className="border-gray-200">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Type className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-xl">홍보 문구</CardTitle>
                    </div>
                    <div className="flex space-x-2">
                        {!isEditing && hasValidText && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCopy(displayText)}
                                >
                                    {copiedText === 'copied' ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2 text-green-600" />
                                            <span className="text-green-600">복사됨</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-2" />
                                            복사
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleEdit}
                                >
                                    <Type className="h-4 w-4 mr-2" />
                                    수정
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {hasValidText ? (
                    <div className="space-y-4">
                        {isEditing ? (
                            <div className="space-y-4">
                                <textarea
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="홍보 문구를 입력하세요..."
                                />
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        저장
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Card className="border-gray-200 bg-gray-50">
                                <CardContent className="p-4">
                                    <p className="text-gray-800 whitespace-pre-line leading-relaxed text-sm">
                                        {displayText}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>홍보 문구가 없습니다.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Main Results Page Component
const AIContentResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    // state에서 데이터 가져오기
    const analysisData = location.state?.analysisData;
    const ideaData = location.state?.ideaData;
    const aiContent = location.state?.aiContent;

    console.log("analysisData : ", analysisData);
    console.log("ideaData : ", ideaData);
    console.log("aiContent : ", aiContent);

    const [promotionId, setPromotionId] = useState(null);
    const [currentAiContent, setCurrentAiContent] = useState(aiContent);
    const [isContentReady, setIsContentReady] = useState(false);
    // 안전한 데이터 접근을 위한 기본값 설정
    console.log('currentAiContent:', currentAiContent);

    // aiContent의 실제 구조에 맞게 데이터 추출
    const displayImages = currentAiContent?.images?.images || currentAiContent?.images?.images || [];
    const displayPromotionText = currentAiContent?.promotion?.data?.textResponse || currentAiContent?.promotion?.textResponse || '';
    const displayCategory = ideaData?.category || '';
    const displayLocation = ideaData ? `${ideaData.gu || ideaData.district?.split(' ')[0] || ''} ${ideaData.dong || ideaData.district?.split(' ')[1] || ''}`.trim() : '';
    const displayMenu = ideaData?.menu || '';

    console.log('displayImages:', displayImages);
    console.log('displayPromotionText:', displayPromotionText);


    // aiContent가 준비되었는지 확인
    useEffect(() => {
        const hasImages = displayImages && Array.isArray(displayImages) && displayImages.length > 0;
        const hasPromotion = displayPromotionText && typeof displayPromotionText === 'string';

        if (hasImages && hasPromotion) {
            setIsContentReady(true);
            console.log('isContentReady : ', true);
        } else {
            setIsContentReady(false);
            console.log('isContentReady : ', false, { hasImages, hasPromotion });
        }
    }, [displayImages, displayPromotionText]);

    // 홍보문구 변경 핸들러
    const handlePromotionChange = (newPromotionText) => {
        setCurrentAiContent(prev => {
            // 기존 구조를 유지하면서 업데이트
            if (prev?.promotion?.data) {
                return {
                    ...prev,
                    promotion: {
                        ...prev.promotion,
                        data: {
                            ...prev.promotion.data,
                            textResponse: newPromotionText
                        }
                    }
                };
            } else {
                return {
                    ...prev,
                    promotion: {
                        data: {
                            textResponse: newPromotionText
                        }
                    }
                };
            }
        });
        console.log('홍보문구 변경됨:', newPromotionText);
    };

    const handleNext = async () => {
        try {
            // 홍보물 저장 (실제 환경에서는 savePromotion API 호출)
            const saved = getTestData().promotion;
            console.log('saved : ', saved);

            if (saved) {
                navigate('/sns-test-results', {
                    state: {
                        analysisData,
                        ideaData,
                        aiContent: currentAiContent, // 업데이트된 aiContent 전달
                        promotionId: promotionId || 'test-promotion-id'
                    }
                });
            } else {
                alert('홍보물 저장에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('다음 단계 진행 실패:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handlePrevious = () => {
        navigate(-1);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header
                type="app"
                currentStep={2}
                showSteps={true}
                user={user}
                onLogout={logout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/signup')}
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* 제목 섹션 */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI 콘텐츠 생성 완료!</h2>
                        <p className="text-gray-600">
                            {displayCategory && displayLocation && displayMenu ?
                                `${displayCategory} · ${displayLocation} · ${displayMenu}` :
                                '입력하신 창업 아이디어를 바탕으로 AI가 콘텐츠를 생성했습니다.'
                            }
                        </p>
                    </div>

                    {/* 탭 구성 - SNS 미리보기 제거 */}
                    <Tabs defaultValue="images" className="mb-8">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="images" className="flex items-center space-x-2">
                                <Camera className="h-4 w-4" />
                                <span>AI 이미지</span>
                            </TabsTrigger>
                            <TabsTrigger value="texts" className="flex items-center space-x-2">
                                <Type className="h-4 w-4" />
                                <span>홍보 문구</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="images" className="mt-6">
                            <ImageGallery
                                images={displayImages}
                            />
                        </TabsContent>

                        <TabsContent value="texts" className="mt-6">
                            <TextContent
                                promotionText={displayPromotionText}
                                onPromotionChange={handlePromotionChange}
                                onCopy={() => console.log('텍스트 복사됨')}
                            />
                        </TabsContent>
                    </Tabs>

                    {/* 다음 단계 안내 */}
                    <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardHeader>
                            <CardTitle className="text-blue-900">다음 단계: SNS 반응 테스트</CardTitle>
                            <CardDescription className="text-blue-700">
                                생성된 콘텐츠를 실제 Instagram에 게시하여 사용자 반응을 측정합니다
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-white/60 border border-blue-100 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">테스트 진행 방식</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• 생성된 이미지와 문구를 조합하여 Instagram 게시물 작성</li>
                                        <li>• 24시간 동안 좋아요, 댓글, 저장 등의 반응 수집</li>
                                        <li>• 인게이지먼트 분석을 통한 시장 반응 평가</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 네비게이션 버튼 */}
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            className="flex items-center space-x-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>이전</span>
                        </Button>

                        <Button
                            onClick={handleNext}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            size="lg"
                            disabled={!isContentReady}
                        >
                            <span>SNS 테스트 시작</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* 하단 정보 */}
                    <div className="text-center mt-8 space-y-2 text-sm text-gray-500">
                        <p>📱 홍보 문구는 수정하여 원하는 대로 변경할 수 있습니다</p>
                        <p>🚀 SNS 테스트를 통해 실제 시장 반응을 확인해보세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIContentResultsPage;