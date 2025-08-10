import axios from 'axios';

// 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ssgs-server.agong.store';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000, // AI 생성은 시간이 오래 걸릴 수 있으므로 60초
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // 쿠키 포함
});

// 요청 인터셉터 (로깅용)
apiClient.interceptors.request.use(
    (config) => {
        console.log('🚀 API 요청:', config.method?.toUpperCase(), config.url, config.data);
        return config;
    },
    (error) => {
        console.error('❌ 요청 설정 오류:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (로깅 및 에러 처리)
apiClient.interceptors.response.use(
    (response) => {
        console.log('✅ API 응답 성공:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('💥 API 응답 오류:', error.response?.status, error.message);

        // 에러 메시지 정리
        if (error.code === 'ERR_NETWORK') {
            error.message = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
        } else if (error.code === 'ECONNABORTED') {
            error.message = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
        } else if (error.response?.status === 500) {
            error.message = '서버 내부 오류가 발생했습니다.';
        } else if (error.response?.status === 404) {
            error.message = '요청한 리소스를 찾을 수 없습니다.';
        }

        return Promise.reject(error);
    }
);

// ===============================
// 🔐 회원 관리 API
// ===============================

/**
 * 구글 OAuth 로그인
 * @returns {string} 로그인 URL
 */
export const getGoogleLoginUrl = () => {
    return `${API_BASE_URL}/oauth2/authorization/google`;
};

/**
 * 로그아웃 (구현 예정)
 */
export const logout = async () => {
    // TODO: 구현 예정
    console.log('로그아웃 API 구현 예정');
};

// ===============================
// 🤖 AI 생성 API
// ===============================

/**
 * AI 홍보문구 생성
 * @param {Object} ideaData - 아이디어 정보
 * @param {string} ideaData.category - 업종 (예: "한식")
 * @param {string} ideaData.region - 지역 (예: "서울특별시")
 * @param {string} ideaData.district - 세부지역 (예: "강남구 역삼동")
 * @param {string} ideaData.menu - 메뉴 (예: "김치찌개")
 * @param {string} ideaData.concept - 콘셉트 (예: "전통 한국식")
 * @param {string} ideaData.keyword - 키워드 (예: "가성비")
 * @returns {Promise<string>} 생성된 홍보문구
 */
export const generateText = async (ideaData) => {
    try {
        console.log('📝 AI 홍보문구 생성 요청:', ideaData);

        const response = await apiClient.post('/api/generate/text', ideaData);

        if (response.status === 200 && response.data.code === 'AN200') {
            console.log('✅ AI 홍보문구 생성 성공:', response.data.data.textResponse);
            return response.data.data.textResponse;
        } else {
            throw new Error(`홍보문구 생성 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 AI 홍보문구 생성 실패:', error);
        throw error;
    }
};

/**
 * AI 이미지 생성
 * @param {Object} ideaData - 아이디어 정보 (generateText와 동일한 구조)
 * @returns {Promise<Array<string>>} 생성된 이미지 URL 배열
 */
export const generateImage = async (ideaData) => {
    try {
        console.log('🎨 AI 이미지 생성 요청:', ideaData);

        const response = await apiClient.post('/api/generate/image', ideaData);

        if (response.status === 200 && response.data.code === 'AN201') {
            console.log('✅ AI 이미지 생성 성공:', response.data.data.images);
            return response.data.data.images;
        } else {
            throw new Error(`이미지 생성 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 AI 이미지 생성 실패:', error);
        throw error;
    }
};

/**
 * 홍보물 저장 (홍보글 + 이미지)
 * @param {string} promotion - 홍보문구
 * @param {Array<string>} images - 이미지 URL 배열
 * @returns {Promise<string>} 저장 결과 메시지
 */
export const savePromotion = async (promotion, images) => {
    try {
        console.log('💾 홍보물 저장 요청:', { promotion, images });

        const requestData = {
            promotion: promotion,
            images: images
        };

        const response = await apiClient.post('/api/promotion', requestData);

        if (response.status === 200 && response.data.code === 'AN202') {
            console.log('✅ 홍보물 저장 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`홍보물 저장 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 홍보물 저장 실패:', error);
        throw error;
    }
};

/**
 * 통합 AI 콘텐츠 생성 (텍스트 + 이미지 병렬 생성)
 * @param {Object} ideaData - 아이디어 정보
 * @returns {Promise<Object>} {promotion: string, images: Array<string>}
 */
export const generateAIContent = async (ideaData) => {
    try {
        console.log('🤖 통합 AI 콘텐츠 생성 시작:', ideaData);

        // 텍스트와 이미지를 병렬로 생성
        const [promotion, images] = await Promise.all([
            generateText(ideaData),
            generateImage(ideaData)
        ]);

        const aiContent = {
            promotion,
            images,
            metadata: {
                generatedAt: new Date().toISOString(),
                ideaData: ideaData
            }
        };

        console.log('✅ 통합 AI 콘텐츠 생성 완료:', aiContent);
        return aiContent;

    } catch (error) {
        console.error('💥 통합 AI 콘텐츠 생성 실패:', error);
        throw error;
    }
};

// ===============================
// 📊 데이터 분석 API
// ===============================

/**
 * 상권 분석 (지역별)
 * @param {string} districtCode - 지역 코드 (예: "3110009")
 * @returns {Promise<Object>} 상권 분석 결과
 */
export const getDistrictAnalysis = async (districtCode) => {
    try {
        console.log('🏘️ 상권 분석 요청:', { districtCode });

        const response = await apiClient.get('/api/data/district', {
            params: { districtCode }
        });

        if (response.status === 200 && response.data.code === 'AN203') {
            console.log('✅ 상권 분석 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`상권 분석 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 상권 분석 요청 실패:', error);
        throw error;
    }
};

/**
 * 상권+업종 종합 분석
 * @param {string} districtCode - 지역 코드 (예: "3110009")
 * @param {string} categoryCode - 업종 코드 (예: "CS100001")
 * @returns {Promise<Object>} 종합 분석 결과
 */
export const getDistrictCategoryAnalysis = async (districtCode, categoryCode) => {
    try {
        console.log('🏪 상권+업종 분석 요청:', { districtCode, categoryCode });

        const response = await apiClient.get('/api/data/district', {
            params: { districtCode, categoryCode }
        });

        if (response.status === 200 && response.data.code === 'AN204') {
            console.log('✅ 상권+업종 분석 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`종합 분석 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 상권+업종 분석 요청 실패:', error);
        throw error;
    }
};

/**
 * 상권 분석 점수
 * @param {string} districtCode - 지역 코드
 * @param {string} categoryCode - 업종 코드
 * @returns {Promise<Object>} 점수 분석 결과
 */
export const getScoreAnalysis = async (districtCode, categoryCode) => {
    try {
        console.log('📊 점수 분석 요청:', { districtCode, categoryCode });

        const response = await apiClient.get('/api/data/score', {
            params: { districtCode, categoryCode }
        });

        if (response.status === 200 && response.data.code === 'AN206') {
            console.log('✅ 점수 분석 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`점수 분석 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 점수 분석 요청 실패:', error);
        throw error;
    }
};

/**
 * 상권 분석 요약 데이터
 * @param {string} districtCode - 지역 코드
 * @returns {Promise<Object>} 요약 데이터
 */
export const getAreaSummary = async (districtCode) => {
    try {
        console.log('📈 상권 요약 데이터 요청:', { districtCode });

        const response = await apiClient.get('/api/area/summary', {
            params: { districtCode }
        });

        if (response.status === 200 && response.data.code === 'AN205') {
            console.log('✅ 상권 요약 데이터 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`요약 데이터 조회 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 상권 요약 데이터 요청 실패:', error);
        throw error;
    }
};

/**
 * 댓글 감정분석
 * @param {Array<string>} messages - 분석할 댓글 배열
 * @returns {Promise<Object>} 감정분석 결과
 */
export const analyzeSentiment = async (messages) => {
    try {
        console.log('😊 댓글 감정분석 요청:', { messages });

        const response = await apiClient.post('/api/sentiment/predict', {
            messages: messages
        });

        if (response.status === 200 && response.data.code === 'AN207') {
            console.log('✅ 댓글 감정분석 성공:', response.data.data);
            return response.data.data;
        } else {
            throw new Error(`감정분석 실패: ${response.data.message || '알 수 없는 오류'}`);
        }

    } catch (error) {
        console.error('💥 댓글 감정분석 요청 실패:', error);
        throw error;
    }
};

// ===============================
// 📱 SNS 연동 API
// ===============================

/**
 * 인스타그램 업로드
 * @param {number} promotionId - 홍보물 ID
 * @returns {Promise} 업로드 결과
 */
export const uploadToInstagram = async (promotionId) => {
    try {
        console.log('📸 인스타그램 업로드 요청:', { promotionId });

        const response = await apiClient.post('/api/instagram/posts/upload', {
            promotion_id: promotionId
        });

        if (response.status === 200) {
            console.log('✅ 인스타그램 업로드 성공');
            return { success: true };
        } else {
            throw new Error('인스타그램 업로드 실패');
        }

    } catch (error) {
        console.error('💥 인스타그램 업로드 실패:', error);
        throw error;
    }
};

// ===============================
// 🔄 통합 분석 함수
// ===============================

/**
 * 완전한 상권 분석 (지역 + 업종 + 점수)
 * @param {string} districtCode - 지역 코드
 * @param {string} categoryCode - 업종 코드
 * @returns {Promise<Object>} 통합 분석 결과
 */
export const getCompleteAnalysis = async (districtCode, categoryCode) => {
    try {
        console.log('🔄 통합 분석 시작:', { districtCode, categoryCode });

        // 3개 API를 병렬로 호출 (더 빠름)
        const [regionData, districtData, scoreData] = await Promise.all([
            getDistrictAnalysis(districtCode),
            getDistrictCategoryAnalysis(districtCode, categoryCode),
            getScoreAnalysis(districtCode, categoryCode)
        ]);

        const completeAnalysis = {
            region: regionData,
            district: districtData,
            score: scoreData,
            timestamp: new Date().toISOString()
        };

        console.log('✅ 통합 분석 완료:', completeAnalysis);
        return completeAnalysis;

    } catch (error) {
        console.error('💥 통합 분석 실패:', error);
        throw error;
    }
};

/**
 * 전체 분석 플로우 (상권분석 + AI 콘텐츠 생성)
 * @param {Object} ideaData - 아이디어 데이터 (region_code, category_code 포함)
 * @returns {Promise<Object>} 완전한 분석 결과
 */
export const getFullAnalysis = async (ideaData) => {
    try {
        console.log('🚀 전체 분석 플로우 시작:', ideaData);

        // 상권분석과 AI 콘텐츠를 병렬로 생성
        const [analysisData, aiContent] = await Promise.all([
            getCompleteAnalysis(ideaData.region_code, ideaData.category_code),
            generateAIContent(ideaData)
        ]);

        const fullResult = {
            ...analysisData,
            aiContent,
            ideaData,
            timestamp: new Date().toISOString()
        };

        console.log('✅ 전체 분석 플로우 완료:', fullResult);
        return fullResult;

    } catch (error) {
        console.error('💥 전체 분석 플로우 실패:', error);
        throw error;
    }
};

// ===============================
// 🧪 테스트/개발용 함수들
// ===============================

/**
 * API 연결 테스트
 */
export const testConnection = async () => {
    try {
        // 간단한 GET 요청으로 연결 테스트
        const response = await apiClient.get('/api/data/district?districtCode=3110009');
        console.log('✅ API 연결 테스트 성공');
        return true;
    } catch (error) {
        console.error('💥 API 연결 테스트 실패:', error);
        return false;
    }
};

/**
 * 테스트용 데이터 생성
 */
export const getTestData = () => {
    return {
        // 1. 상권분석 (GET /api/data/district?districtCode=3110009)
        region: {
            code: "AN203",
            message: "상권 분석 결과를 성공적으로 응답하였습니다",
            data: {
                genderResidence: "여성, 60대 이상(13.6%) 주거인구가 가장 많아요.",
                genderWorker: "남성, 30대(16.1%) 직장인구가 가장 많아요.",
                floatingTime: "00~06시 유동인구가 가장 많습니다. (29.8%)",
                floatingAge: "60대 이상(27.4%) 유동인구가 가장 많아요.",
                areaAverage: "최근 분기 전체 평균 점포당 월 매출: 2408만원\n   - 전분기 대비: ▼ 1091만원\n   - 전년 동분기 대비: ▼ 326만원",
                summary: "최근 요약은 이러이러합니다"
            }
        },

        // 2. 상권+업종 종합 분석 (GET /api/data/district?districtCode=3110009&categoryCode=CS100001)
        district: {
            code: "AN204",
            message: "분석 결과를 성공적으로 응답하였습니다",
            data: {
                salesGender: "선택상권은 남성(53.4%) 고객 비중이 높은 상권입니다.",
                salesTime: "11~14시 매출이 가장 많습니다. (36.5%)",
                salesAge: "선택상권은 50대(27.9%) 소비자 매출 비중이 가장 높습니다.",
                salesMonthly: "최근 분기 점포당 월 평균 매출: 3056만원\n   - 전분기 대비: ▼ 1965만원\n   - 전년 동분기 대비: ▼ 677만원",
                storeCount: "최근 분기 점포 수: 10개\n   - 전분기 대비: ▼ 0개\n   - 전년 동분기 대비: ▼ 0개",
                storeOpen: "최근 분기 개업수: 0개\n   - 전분기 대비: ▼ 0개\n   - 전년 동분기 대비: ▼ 0개",
                storeClose: "최근 분기 폐업수: 0개\n   - 전분기 대비: ▼ 0개\n   - 전년 동분기 대비: ▼ 0개",
                storeFranchise: "프랜차이즈 비율: 0.0%"
            }
        },

        // 3. 상권 분석 점수 (GET /api/data/score?districtCode=3110009&categoryCode=CS100001)
        score: {
            code: "AN206",
            message: "분석 점수를 성공적으로 응답하였습니다",
            data: {
                "유동인구": 19,
                "동종업종_점포수": "61.4",
                "동종업종_평균매출": "26.8",
                "상권_평균매출": "23.4",
                "일방문자수": "17.3",
                "최종점수": "29.7"
            }
        },

        // 4. 상권 분석 요약 데이터 (GET /api/area/summary?districtCode=3110009)
        summary: {
            code: "AN205",
            message: "요약 결과를 성공적으로 응답하였습니다",
            data: {
                "상권명": "자하문터널",
                "총_상주인구": 1540,
                "총_직장인구": 347,
                "총_유동인구": 165102,
                "상주인구_그래프": "/static/img/pop_trend_3110009.png",
                "유동인구_그래프": "/static/img/flow_trend_3110009.png",
                "직장인구_그래프": "/static/img/wrk_trend_3110009.png"
            }
        },

        // 5. AI 이미지 생성 (POST /api/generate/image)
        aiImages: {
            code: "AN201",
            message: "이미지가 성공적으로 생성되었습니다.",
            data: {
                images: [
                    "https://ssgs-bucket.s3.amazonaws.com/ssgs/fb1a3e08-e103-4d7b-aa27-0c3d93f2c1f7.jpg",
                    "https://ssgs-bucket.s3.amazonaws.com/ssgs/e16e30ee-e175-4b08-a5fe-9d140f6bc87c.jpg",
                    "https://ssgs-bucket.s3.amazonaws.com/ssgs/17321ecb-3b1a-4d52-8e66-84df9258b271.jpg"
                ]
            }
        },

        // 6. 홍보문구 생성 (POST /api/generate/text)
        aiText: {
            code: "AN200",
            message: "텍스트가 성공적으로 생성되었습니다.",
            data: {
                textResponse: "🔥 강남 역삼동에 새로운 김치찌개 맛집이 오픈합니다! 전통 한국식 요리로 가성비 최고의 맛을 선사해드립니다. 바쁜 직장인들을 위한 빠른 서비스와 깔끔한 인테리어로 편안한 식사 시간을 보장합니다. 지금 방문하시면 특별 할인 혜택까지! #강남맛집 #김치찌개 #전통한식 #가성비맛집 #역삼동맛집 #직장인맛집 #한식당 #오픈이벤트"
            }
        },

        // 7. 홍보물 저장 (POST /api/promotion)
        promotion: {
            code: "AN202",
            message: "홍보물을 성공적으로 저장하였습니다.",
            data: "홍보물을 성공적으로 저장하였습니다."
        },

        // 8. 댓글 감정분석 (POST /api/sentiment/predict)
        sentiment: {
            code: "AN207",
            message: "댓글 감정분석에 성공하였습니다.",
            data: {
                count: 8,
                valid_results: 6,
                positive_ratio: 66.7,
                results: [
                    { text: "와 정말 맛있어 보인다!", label: "긍정", confidence: 0.9823 },
                    { text: "이거 꼭 가봐야겠어요", label: "긍정", confidence: 0.9456 },
                    { text: "가격이 좀 비싸네요", label: "부정", confidence: 0.8234 },
                    { text: "인테리어 진짜 예쁘다", label: "긍정", confidence: 0.9678 },
                    { text: "김치찌개 최고!", label: "긍정", confidence: 0.9912 },
                    { text: "위치가 좀 애매한 것 같은데", label: "부정", confidence: 0.7456 }
                ]
            }
        }
    };
};

// 사용 예시:
// const data = getTestData();
// console.log(data.aiText.data.textResponse); // 홍보문구 내용
// console.log(data.aiImages.data.images[0]); // 첫 번째 이미지 URL
// console.log(data.score.data.최종점수); // 최종 점수

export default apiClient;