import React, {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, Store, Coffee, Lightbulb, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

// 컴포넌트 imports
import { Button } from "../components/common/Button";
import { Header } from "../components/common/Header";
import { useAuth } from "../contexts/AuthContext";
import SelectField from "../components/common/SelectField.jsx";
import InputField from "../components/common/InputField.jsx";

const IdeaInputPage = () => {
    const navigate = useNavigate();
    const { user, logout, incrementUsage } = useAuth();

    const [locationData, setLocationData] = useState(null);
    const [categoryCodeOptions, setCategoryCodeOptions] = useState([]);

    // formData 구조 개선
    const [formData, setFormData] = useState({
        category: '',           // 업종명 (한국어)
        category_code: '',      // 업종 코드
        gu: '',                // 구
        dong: '',              // 동
        region: '',            // 상권명 (한국어)
        region_code: '',       // 상권 코드
        back_region: '서울특별시',    // 백엔드용 - 시/도
        back_district: '',     // 백엔드용 - 구 + 동
        menu: '',
        concept: '',
        keywords: ''
    });

    const [errors, setErrors] = useState({});

    // 데이터 로딩
    useEffect(() => {
        fetch('/data/regions.json')
            .then(res => res.json())
            .then(data => setLocationData(data))
            .catch(err => console.error('지역 데이터 로드 실패:', err));
    }, []);

    useEffect(() => {
        fetch('/data/business_types.json')
            .then(res => res.json())
            .then(data => {
                setCategoryCodeOptions(
                    data.map(type => ({
                        label: type.업종명,
                        value: type.코드
                    }))
                );
            })
            .catch(err => console.error('업종 데이터 로드 실패:', err));
    }, []);

    // 구 목록
    const guOptions = useMemo(() => {
        if (!locationData) return [];
        return Object.keys(locationData).map(gu => ({
            value: gu,
            label: gu
        }));
    }, [locationData]);

    // 동 옵션 (선택된 구 기준)
    const dongOptions = useMemo(() => {
        if (!locationData || !formData.gu) return [];
        const guData = locationData[formData.gu];
        if (!guData) return [];

        return Object.keys(guData).map(dong => ({
            value: dong,  // 동 이름을 value로 사용
            label: dong
        }));
    }, [locationData, formData.gu]);

    // 상권 옵션 (선택된 구/동 기준)
    const regionOptions = useMemo(() => {
        if (!locationData || !formData.gu || !formData.dong) return [];
        const areaList = locationData[formData.gu][formData.dong] || [];

        return areaList.map(area => ({
            value: area.코드,  // 백엔드에 보낼 코드값
            label: area.이름  // 사용자에게 보여줄 이름
        }));
    }, [locationData, formData.gu, formData.dong]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.category_code) newErrors.category_code = '업종을 선택해주세요';
        if (!formData.gu) newErrors.gu = '구를 선택해주세요';
        if (!formData.dong) newErrors.dong = '동을 선택해주세요';
        if (!formData.region_code) newErrors.region_code = '상권을 선택해주세요';
        if (!formData.menu.trim()) newErrors.menu = '메뉴를 입력해주세요';
        if (!formData.concept.trim()) newErrors.concept = '콘셉트를 입력해주세요';
        if (!formData.keywords.trim()) newErrors.keywords = '키워드를 입력해주세요';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        console.log('handleSubmit 호출됨');
        console.log('formData:', formData);
        console.log('현재 사용자:', user);

        if (validateForm()) {
            try {
                // 사용량 증가 (로그인된 경우)
                if (user) {
                    incrementUsage();
                }

                // API 제출용 데이터 준비
                const submitData = {
                    category: formData.category,
                    region: formData.back_region,           // "서울특별시"
                    district: `${formData.gu} ${formData.dong}`,  // "강남구 역삼동"
                    menu: formData.menu,
                    concept: formData.concept,
                    keyword: formData.keywords
                };

                console.log("API 제출용 데이터:", submitData);

                // 분석 페이지로 이동 (전체 formData 전달)
                navigate(`/analysis-loading`, {
                    state: {
                        ideaData: submitData   // API용 데이터
                    }
                });

            } catch (error) {
                console.error('아이디어 제출 실패:', error);
                alert('제출에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header
                type="app"
                currentStep={0}
                showSteps={true}
                user={user}
                onLogout={handleLogout}
                onLogin={() => navigate('/login')}
                onSignup={() => navigate('/login')}
            />

            <div className="py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            창업 아이디어를 입력해주세요
                        </h1>
                        <p className="text-gray-600">
                            입력하신 정보를 바탕으로 상권 분석과 AI 콘텐츠 생성을 진행합니다.
                        </p>

                        {user && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    💡 이번 달 사용량: {user.usageCount}/{user.maxUsage}회
                                    ({user.plan} 플랜)
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="space-y-6">
                            {/* 업종 선택 */}
                            <SelectField
                                label="업종 *"
                                icon={Store}
                                value={formData.category_code}
                                onChange={(value) => {
                                    const selectedCategory = categoryCodeOptions.find(opt => opt.value === value);
                                    handleInputChange('category_code', value);
                                    handleInputChange('category', selectedCategory?.label || '');
                                }}
                                options={categoryCodeOptions}
                                placeholder="업종을 선택해주세요"
                                error={errors.category_code}
                            />

                            {/* 지역 선택 */}
                            <div className="space-y-6">
                                {/* 구 선택 */}
                                <SelectField
                                    label="구 *"
                                    icon={MapPin}
                                    value={formData.gu}
                                    onChange={(value) => {
                                        handleInputChange('gu', value);
                                        // 구 변경시 하위 선택 초기화
                                        handleInputChange('dong', '');
                                        handleInputChange('region', '');
                                        handleInputChange('region_code', '');
                                        // back_district 업데이트는 dong 선택 시에
                                    }}
                                    options={guOptions}
                                    placeholder="구를 선택해주세요"
                                    error={errors.gu}
                                />

                                {/* 동 선택 */}
                                <SelectField
                                    label="동 *"
                                    icon={MapPin}
                                    value={formData.dong}
                                    onChange={(value) => {
                                        handleInputChange('dong', value);
                                        // 동 변경시 상권 선택 초기화
                                        handleInputChange('region', '');
                                        handleInputChange('region_code', '');
                                        // back_district 업데이트
                                        handleInputChange('back_district', `${formData.gu} ${value}`);
                                    }}
                                    options={dongOptions}
                                    placeholder={formData.gu ? "동을 선택해주세요" : "먼저 구를 선택해주세요"}
                                    error={errors.dong}
                                    disabled={!formData.gu}
                                />

                                {/* 상권명 선택 */}
                                <SelectField
                                    label="상권명 *"
                                    icon={MapPin}
                                    value={formData.region_code}
                                    onChange={(value) => {
                                        const selectedRegion = regionOptions.find(opt => opt.value === value);
                                        handleInputChange('region_code', value);
                                        handleInputChange('region', selectedRegion?.label || '');
                                    }}
                                    options={regionOptions}
                                    placeholder={formData.dong ? "상권을 선택해주세요" : "먼저 동을 선택해주세요"}
                                    error={errors.region_code}
                                    disabled={!formData.dong}
                                />
                            </div>

                            {/* 메뉴 입력 */}
                            <InputField
                                label="메뉴 *"
                                icon={Coffee}
                                value={formData.menu}
                                onChange={(value) => handleInputChange('menu', value)}
                                placeholder="예: 아메리카노, 라떼, 샌드위치"
                                error={errors.menu}
                            />

                            {/* 콘셉트 입력 */}
                            <InputField
                                label="콘셉트 *"
                                icon={Lightbulb}
                                value={formData.concept}
                                onChange={(value) => handleInputChange('concept', value)}
                                placeholder="예: 북유럽 스타일의 미니멀한 인테리어, 직장인 타겟의 빠른 서비스"
                                error={errors.concept}
                                multiline
                            />

                            {/* 키워드 입력 */}
                            <InputField
                                label="키워드 *"
                                icon={Tag}
                                value={formData.keywords}
                                onChange={(value) => handleInputChange('keywords', value)}
                                placeholder="예: 힐링, 모던, 친환경, 프리미엄"
                                error={errors.keywords}
                            />

                            {/* 버튼 */}
                            <div className="flex justify-between pt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    이전
                                </Button>

                                <Button
                                    onClick={handleSubmit}
                                    className="px-8"
                                    // disabled={!user}  // 로그인하지 않은 경우 비활성화
                                >
                                    상권 분석 시작
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6 text-sm text-gray-500 space-y-1">
                        <p>🤖 AI가 콘텐츠를 생성하고 SNS 반응을 분석해드립니다</p>
                        <p>📊 약 5-10분 후 시장성 리포트를 받아보세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaInputPage;