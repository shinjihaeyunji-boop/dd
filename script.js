/* 
 * Yanggu-gun Food Business Declaration One-stop Help Center
 * Interactive Client-side Scripting with Multi-language Translation (Pure JS)
 */

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('[PWA] Service Worker Registered', reg))
            .catch(err => console.error('[PWA] Service Worker Registration Failed', err));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('lang') || 'ko';

    /* ==========================================================================
       Dark Mode / Theme Toggle
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            showToast(currentLang === 'en' ? '🌙 Switched to Dark Mode.' : '🌙 다크 모드로 전환되었습니다.');
        } else {
            localStorage.setItem('theme', 'light');
            showToast(currentLang === 'en' ? '☀️ Switched to Light Mode.' : '☀️ 라이트 모드로 전환되었습니다.');
        }
    });

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    menuToggleBtn.addEventListener('click', () => {
        menuToggleBtn.classList.toggle('active');
        mobileNavPanel.style.display = mobileNavPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Close panel on clicking links
    document.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.addEventListener('click', () => {
            menuToggleBtn.classList.remove('active');
            mobileNavPanel.style.display = 'none';
        });
    });

    /* ==========================================================================
       Notice Banner Slider
       ========================================================================== */
    const slides = document.querySelectorAll('#notice-slider .slide');
    const dots = document.querySelectorAll('#slider-dots-container .dot');
    const prevBtn = document.getElementById('slide-prev-btn');
    const nextBtn = document.getElementById('slide-next-btn');
    let currentSlideIndex = 0;
    let sliderTimer = null;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Wrap-around checks
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    function startSliderAutoPlay() {
        sliderTimer = setInterval(nextSlide, 4500); // 4.5 seconds interval
    }

    function stopSliderAutoPlay() {
        if (sliderTimer) clearInterval(sliderTimer);
    }

    nextBtn.addEventListener('click', () => {
        stopSliderAutoPlay();
        nextSlide();
        startSliderAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        stopSliderAutoPlay();
        prevSlide();
        startSliderAutoPlay();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopSliderAutoPlay();
            showSlide(idx);
            startSliderAutoPlay();
        });
    });

    // Initialize Auto-play
    startSliderAutoPlay();


    /* ==========================================================================
       Document Details Database (양구군 보건소 가이드 기준)
       ========================================================================== */
    const docDetailGuides = {
        '식품영업신고서': {
            title: '식품영업신고서',
            titleEn: 'Food Business Declaration Form',
            desc: '식품접객업(일반음식점, 휴게음식점) 및 즉석판매제조가공업을 시작할 때 양구군청에 제출하는 법정 기본 신고 서식입니다.',
            descEn: 'A mandatory legal declaration form submitted to Yanggu-gun Office when starting food services (General Restaurant, Rest Restaurant, Instant Food Prep).',
            prep: '신고서 작성 시 대표자 인적사항, 점포 상호명, 소재지 및 전용 면적 등을 정확히 기록해야 합니다. 양구군 보건소 민원실에 비치되어 있으나, 서식 자료실에서 양식을 다운로드해 미리 작성해 오시면 처리가 더 빠릅니다.',
            prepEn: 'Fill out the representative’s details, shop name, location, and area. Available at Yanggu Health Center, or pre-fill it by downloading from the Downloads library.',
            fee: '수수료: 28,000원 (접수 시 현장 카드 또는 현금 납부)',
            feeEn: 'Filing fee: 28,000 KRW (Payable by cash or credit card at desk)',
            location: '양구군 보건소 위생관리 담당 부서 (인허가 부서)',
            locationEn: 'Yanggu Health Center Hygiene Administration Desk',
            duration: '즉시 처리 (통상 3시간 이내에 신고증 발급 완료)',
            durationEn: 'Immediate (Usually processed within 3 hours)'
        },
        '식품영업등록신청서': {
            title: '식품영업등록신청서',
            titleEn: 'Food Manufacturing Registration Form',
            desc: '식품제조가공업 등 B2B 대량 생산 및 유통을 진행하는 업종을 시작할 때 구비하는 법정 등록 신청 양식입니다.',
            descEn: 'A mandatory registration form for Food Manufacturing businesses distributing food products wholesale.',
            prep: '일반적인 신고제와 달리 등록제로서 설비 및 건물 배치 도면을 사전에 제출해야 합니다. 서식 자료실에서 다운로드하여 세부 사항을 명확히 작성해야 하며, 현장 조사가 수반됩니다.',
            prepEn: 'Unlike declarations, registrations require floor facility blueprints to check hygiene pathways. Download HWP format from Downloads library.',
            fee: '수수료: 28,000원 (지자체 면허세 등 별도)',
            feeEn: 'Filing fee: 28,000 KRW (License tax excluded)',
            location: '양구군 보건소 위생 부서 및 관련 인허가계',
            locationEn: 'Yanggu Health Center Hygiene Administration Desk',
            duration: '3일 이내 처리 (현장 위생 상태 및 설비 실사 점검 필수)',
            durationEn: 'Within 3 days (Onsite verification visit required)'
        },
        '건강진단결과서': {
            title: '건강진단결과서 (구 보건증)',
            titleEn: 'Health Certificate (Health Card)',
            desc: '식품위생법 제49조에 규정된 의무 건강 진단서로, 식품을 조리, 가공, 서빙하는 대표자와 모든 종업원이 필수 취득해야 합니다.',
            descEn: 'Mandatory sanitary certificate according to Food Sanitation Act Article 49. Required for all handlers of open food products (including CEOs).',
            prep: '본인 신분증을 구비하여 보건소에 방문한 뒤, 폐결핵(X-ray 촬영) 및 장티푸스(분변 검사) 진단을 거쳐야 합니다. 검사 당일 발급되지 않고 수일이 소요되므로 영업 개시 전에 가장 먼저 진행해야 합니다.',
            prepEn: 'Visit a public health center with your ID Card/Passport. Undergo chest X-ray screening and rectal swab test (checks tuberculosis and typhoid). Must be done in advance.',
            fee: '보건소 검사 기준 3,000원 (일반 지정 의원은 약 1.5만 ~ 2만 원)',
            feeEn: '3,000 KRW at public health centers (15,000 - 20,000 KRW at private clinics)',
            location: '양구군 보건소 및 전국 모든 지역 보건소, 지정 의료기관',
            locationEn: 'Yanggu Health Center or any local public health center',
            duration: '검진 후 결과 판정까지 약 5영업일 소요 (정부24 온라인 출력 가능)',
            durationEn: '5 business days (Printable online via Gov24 portal)'
        },
        '보건증': {
            title: '건강진단결과서 (구 보건증)',
            titleEn: 'Health Certificate (Health Card)',
            desc: '식품위생법 제49조에 규정된 의무 건강 진단서로, 식품을 조리, 가공, 서빙하는 대표자와 모든 종업원이 필수 취득해야 합니다.',
            descEn: 'Mandatory sanitary certificate according to Food Sanitation Act Article 49. Required for all handlers of open food products (including CEOs).',
            prep: '본인 신분증을 구비하여 보건소에 방문한 뒤, 폐결핵(X-ray 촬영) 및 장티푸스(분변 검사) 진단을 거쳐야 합니다. 검사 당일 발급되지 않고 수일이 소요되므로 영업 개시 전에 가장 먼저 진행해야 합니다.',
            prepEn: 'Visit a public health center with your ID Card/Passport. Undergo chest X-ray screening and rectal swab test (checks tuberculosis and typhoid). Must be done in advance.',
            fee: '보건소 검사 기준 3,000원 (일반 지정 의원은 약 1.5만 ~ 2만 원)',
            feeEn: '3,000 KRW at public health centers (15,000 - 20,000 KRW at private clinics)',
            location: '양구군 보건소 및 전국 모든 지역 보건소, 지정 의료기관',
            locationEn: 'Yanggu Health Center or any local public health center',
            duration: '검진 후 결과 판정까지 약 5영업일 소요 (정부24 온라인 출력 가능)',
            durationEn: '5 business days (Printable online via Gov24 portal)'
        },
        '위생교육': {
            title: '신규 영업자 위생교육수료증',
            titleEn: 'Hygiene Education Certificate',
            desc: '식품위생법에 따라 업종을 시작하기 전 필수 이수해야 하는 위생 행정 지식 및 조리 안전 법령 교육 수료서입니다.',
            descEn: 'Mandatory safety and hygiene course completion certificate prior to declaring business.',
            prep: '사전 온라인(또는 지정 오프라인) 수강으로 진행됩니다. 수강 시간은 일반음식점/휴게음식점 6시간, 즉석판매/식품제조업은 8시간 분량이며, 동영상 완강 후 간단한 평가 시험(60점 이상 합격)을 통과하여 이수증을 인쇄합니다.',
            prepEn: 'Take online class through certified portals (6 hours for food services, 8 hours for food manufacturing). Pass the 10-question test (60%+ score) to print the certificate.',
            fee: '교육비: 30,000원 ~ 35,000원 (해당 교육 협회 납부)',
            feeEn: 'Registration fee: approx. 30,000 - 35,000 KRW',
            location: '각 업종별 지정 위생교육협회 홈페이지 (한국외식업중앙회, 한국휴게음식업중앙회, 한국식품산업협회)',
            locationEn: 'Certified Association Portals (Korea Food Service Association, etc.)',
            duration: '강의 수강 완료 즉시 전산 발급 및 출력 가능',
            durationEn: 'Instantly issued online upon completion'
        },
        '임대차계약서': {
            title: '부동산 임대차계약서',
            titleEn: 'Lease Agreement',
            desc: '영업을 영위할 점포의 사용 권한이 신청인(대표자)에게 있음을 증명하는 핵심 부동산 계약 문서입니다.',
            descEn: 'A real estate contract proving occupancy of the commercial space under the applicant’s name.',
            prep: '점포의 전세/월세 계약서를 원본으로 지참해야 하며, 계약서상의 영업주 성명(또는 법인명)과 신청서상의 성명이 동일해야 합니다. 특히 계약서 서명 및 특약사항을 꼼꼼히 확인하십시오.',
            prepEn: 'Provide original lease contract. Ensure spelling of your name matches the business registry. Check building utility codes listed.',
            fee: '없음 (부동산 계약 체결에 따른 개인 부담 비용 존재)',
            feeEn: 'None',
            location: '개인 간 임대차 계약 (공인중개사 날인 필수 권장)',
            locationEn: 'Private real estate deal (Certified agency recommended)',
            duration: '즉시 확인',
            durationEn: 'Instant'
        },
        '소방필증': {
            title: '안전시설등 완비증명서 (소방필증)',
            titleEn: 'Fire Safety Certificate',
            desc: '화재 및 재난 피해 방지를 위해 해당 매장의 소방/안전 대피 시설이 적법하게 구축되어 있음을 증명하는 서류입니다.',
            descEn: 'Verification issued by local fire marshal proving code compliance for emergency exits and sprinklers.',
            prep: '지하층 실면적 66㎡ 이상이거나, 지상 2층 이상 100㎡ 이상 매장에만 의무 적용됩니다. 비상구 확보, 방염 벽지 시공, 소화기 및 유도등 배치 후 관할 소방서의 시설 조사를 통과해야 합니다. (지상 1층 및 이하 면적 매장은 면제)',
            prepEn: 'Required for underground shops >= 66㎡ or upper floor shops >= 100㎡. Set up emergency exits, fire extinguishers, and pass inspection by Yanggu Fire Station.',
            fee: '소방 도면 설계 및 시공 업체 대행비 상이',
            feeEn: 'Varies by local fire contractor design plans',
            location: '양구소방서 민원실 및 관할 방호구조과',
            locationEn: 'Yanggu Fire Station safety department',
            duration: '신청서 접수 후 소방관 현장 방문 실사까지 통상 7~10일 소요',
            durationEn: 'approx. 7-10 days (Onsite audit scheduled after filing)'
        },
        'LPG': {
            title: '액화석유가스(LPG) 사용시설 완성검사필증',
            titleEn: 'LPG Facility Inspection Certificate',
            desc: '도시가스 배관을 연동하지 않고 회색 가스통(LPG)을 설치하여 화력 기구를 조리용으로 사용하는 업장에 부과되는 안전성 합격증입니다.',
            descEn: 'Safety certificate proving code compliance for external LPG gas canister hookups.',
            prep: '가스 설비 적격 공사 완료 후 한국가스안전공사에 안전 완비 검사를 사전 요청하여 합격 서류를 받아야 합니다. (전기 인덕션이나 도시가스 사용처는 제출 면제)',
            prepEn: 'Obtain safety approval certificate from Korea Gas Safety Corporation after building LPG pipes and storage tanks.',
            fee: '검사 수수료 (가스 설비 업체 시공료 상이)',
            feeEn: 'Inspection fee varies by gas piping layout',
            location: '한국가스안전공사 강원지역본부 또는 양구 관할 지사',
            locationEn: 'Korea Gas Safety Corporation Gangwon Office',
            duration: '가스 설비 시공 후 가스안전공사 검사관 일정 조율 후 3~5일 이내 실사',
            durationEn: '3-5 days after piping installation is complete'
        },
        '재난배상': {
            title: '재난배상책임보험 가입증명서',
            titleEn: 'Disaster Liability Insurance',
            desc: '재난 발생 시 타인의 신체/재산 피해를 구제하기 위하여 1층 요식업 매장 중 일정 기준 이상 시 의무적으로 가입하는 화재/재난 보험입니다.',
            descEn: 'Mandatory public liability insurance for first-floor restaurants/cafés of certain sizes.',
            prep: '1층에 입점하는 일반음식점 및 휴게음식점 중 전용 면적 100㎡(약 30.2평) 이상인 업소는 의무적으로 영업 개시 전(신고 신청 전) 보험사에 가입한 가입증명(또는 증권 번호)을 준비해야 합니다.',
            prepEn: 'For 1st-floor shops exceeding 100㎡, purchase liability insurance before filing. Submit insurance registration number.',
            fee: '보험사별 가입 등급 및 특약 설계에 따라 연간 보험료 부과',
            feeEn: 'Varies by insurance plan and shop area',
            location: '국내 모든 화재보험/손해보험사',
            locationEn: 'Certified local insurance agencies',
            duration: '보험사 온라인 또는 전화 청약 시 당일 즉시 가입증명서 발급',
            durationEn: 'Instant online certificate issuance'
        },
        '지하수': {
            title: '지하수 수질검사성적서',
            titleEn: 'Groundwater Quality Test Report',
            desc: '영업장에 상수도(수돗물)가 설치되지 않아 자연 지하수(우물)를 정수하거나 조리 용수로 쓸 때 위생 안전 규격에 합격했는지를 입증하는 서적입니다.',
            descEn: 'Official analysis report proving well water meets potability criteria for public consumption.',
            prep: '공인 먹는물검사기관을 통해 용수를 채수하여 수질 검사(대장균, 중금속 등 46개 항목)를 의뢰하고 적합 판정을 받은 검사성적서 정본을 지참하여 신고 시 제출해야 합니다.',
            prepEn: 'Submit water sample to certified labs for chemical and microbial analysis. Must be verified fit for human drinking.',
            fee: '공인 수질분석검사 비용 약 25만 ~ 30만 원 상당',
            feeEn: 'approx. 250,000 - 300,000 KRW for analytical tests',
            location: '강원도보건환경연구원 또는 지정 먹는 물 공인검사대행업체',
            locationEn: 'Gangwon Institute of Health & Environment or certified labs',
            duration: '채수 분석 의뢰 시 결과 판정 및 서류 발급까지 약 15~20일 소요',
            durationEn: 'approx. 15-20 days (Analytical testing takes time)'
        },
        '품목제조': {
            title: '품목제조보고서',
            titleEn: 'Product Manufacturing Report',
            desc: '식품제조가공업체에서 새로이 가공 생산하는 모든 개별 식품 단위에 대하여 가공 재료 성분비와 품질 유통 기준을 관공서에 신고하는 의무 보고서입니다.',
            descEn: 'Mandatory specification sheet containing ingredients percentages and shelf-life logic submitted within 7 days of production.',
            prep: '영업등록을 마친 뒤 실제 가공 생산 개시 전이나 생산 개시일 기준 7일 이내에 식품 유형별 명칭, 원재료 성분 배합 비율(%), 소비 기한 설정사유서를 준비하여 온라인 전산 보고해야 합니다.',
            prepEn: 'Submit through Food Safety Korea portal. Include ingredient weight ratios and scientific logic for expiry date.',
            fee: '수수료 면제',
            feeEn: 'None',
            location: '식품안전나라 민원창구 포털 접수 (온라인)',
            locationEn: 'Food Safety Korea Portal (Online)',
            duration: '접수 즉시 전산 승인 및 반영 완료',
            durationEn: 'Instant online registration'
        },
        '제조방법': {
            title: '제조방법설명서',
            titleEn: 'Manufacturing Method Description',
            desc: '즉석판매제조가공업 또는 식품제조가공업 영업 신고/등록 시 어떠한 제품을 생산하는지 위생 당국에 제출하는 설명 양식입니다.',
            descEn: 'Standard descriptive form specifying food categories, raw materials, and processing flow steps.',
            prep: '제조하려는 식품의 유형명, 상세 원재료명, 사용되는 기계 장비의 종류, 그리고 원료 처리부터 가공 포장까지의 공정 진행표를 HWP 서식에 기재하여 접수해야 합니다.',
            prepEn: 'Fill out raw material composition and step-by-step cooking/packaging process chart. Template is available in the library.',
            fee: '없음',
            feeEn: 'None',
            location: '양구군 보건소 민원실 작성 (서식 자료실 다운로드 작성 가능)',
            locationEn: 'Yanggu Health Center (Downloads available)',
            duration: '영업 접수 시 함께 현장 검토',
            durationEn: 'Reviewed instantly upon filing'
        },
        '위임장': {
            title: '대리인 위임장',
            titleEn: 'Power of Attorney',
            desc: '개인사업 대표자 본인이 직접 관공서에 방문하기 곤란하여 대리인(직원, 가족 등)이 민원 서류 신청을 대신하고자 할 때 지참해야 하는 위무 증명 서식입니다.',
            descEn: 'Standard authorization letter signed by CEO to delegate registration filing to proxy agent.',
            prep: '대표자 본인의 친필 서명 또는 인감 도장이 날인된 위임장을 작성하고 대표자 신분증 사본 및 대리인 본인 신분증을 지참하여 접수처에 제출합니다.',
            prepEn: 'Sign the template with CEO stamp. Provide photocopy of CEO ID card along with proxy agent ID card.',
            fee: '없음',
            feeEn: 'None',
            location: '서식 자료실 다운로드 또는 구청 민원실 현장 양식 작성',
            locationEn: 'Downloads library or Health Center desk',
            duration: '즉시 접수',
            durationEn: 'Instant'
        },
        '지위승계': {
            title: '영업자 지위승계 신고서',
            titleEn: 'License Succession Form',
            desc: '기존 영업자가 운영하던 동일 장소의 기존 식품영업권을 새로운 양수인에게 그대로 양도양수(명의변경)할 때 제출하는 명의 승계 전용 양식입니다.',
            descEn: 'Standard document to transfer existing food permit from former owner to new owner.',
            prep: '이전 사장님(양도인)과 새로운 사장님(양수인)의 인감 합의 계약 양도증명서와 기존 영업신고증 원본이 필요합니다. 가급적 두 명이 함께 양구군 보건소 위생관리팀에 신분증을 들고 내방하는 것이 서류 복잡도를 낮추는 지름길입니다.',
            prepEn: 'Requires old permit certificate, transfer contract signed by both parties. Visitting Yanggu Health Center together is highly recommended.',
            fee: '수수료: 9,300원 (신규 영업신고 28,000원에 비해 저렴)',
            feeEn: '9,300 KRW (Cheaper than filing a new license)',
            location: '양구군 보건소 위생 인허가 부서',
            locationEn: 'Yanggu Health Center Hygiene Desk',
            duration: '즉시 처리 (통상 2시간 이내 완료)',
            durationEn: 'Immediate (Processed in 2 hours)'
        }
    };

    // Modal Control Elements for Document Details
    const docDetailModal = document.getElementById('document-detail-modal');
    const docModalTitle = document.getElementById('doc-modal-title');
    const docModalDesc = document.getElementById('doc-modal-desc');
    const docModalPrep = document.getElementById('doc-modal-prep');
    const docModalFee = document.getElementById('doc-modal-fee');
    const docModalLocation = document.getElementById('doc-modal-location');
    const docModalDuration = document.getElementById('doc-modal-duration');
    const docModalCloseBtn = document.getElementById('doc-modal-close-btn');
    const docModalOkBtn = document.getElementById('doc-modal-ok-btn');

    // Document Modal Open Logic
    function openDocDetailModal(docName) {
        // Strip out brackets, parentheses, and conditional text for exact key matching
        let cleanKey = docName.replace(/\[상세안내\]|\[상세정보\]|\(구 보건증\)|\(식품제조\/즉석판매\)|\(소방필증\)|\(공인기관\)|\(사후 제출\)|\(양도양수\)/g, '').trim();
        
        // Find matching key fuzzy-style
        let guide = null;
        for (let key in docDetailGuides) {
            if (cleanKey.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanKey.toLowerCase())) {
                guide = docDetailGuides[key];
                break;
            }
        }

        // Fallback for missing keys
        if (!guide) {
            guide = {
                title: cleanKey,
                titleEn: cleanKey,
                desc: '식품관련 영업신고(등록)를 진행하기 위해 지자체에 제출하거나 갖추어야 할 서식 서류입니다.',
                descEn: 'Filing paperwork required for food registration or declaration.',
                prep: '양구군 보건소 위생담당 부서(033-480-2723)로 문의하셔서 세부 제출 방식 및 기재 규격을 안내받으시기 바랍니다.',
                prepEn: 'Please contact Yanggu Health Office (+82-33-480-2723) to check details.',
                fee: '별도 안내 확인 필요',
                feeEn: 'Inquire desk',
                location: '양구군 보건소 위생관리팀',
                locationEn: 'Yanggu Health Center Hygiene Desk',
                duration: '즉시 또는 수일 소요',
                durationEn: 'Varies by schedule'
            };
        }

        if (currentLang === 'en') {
            docModalTitle.textContent = `📄 ${guide.titleEn || guide.title} Info`;
            docModalDesc.textContent = guide.descEn || guide.desc;
            docModalPrep.textContent = guide.prepEn || guide.prep;
            docModalFee.textContent = guide.feeEn || guide.fee;
            docModalLocation.textContent = guide.locationEn || guide.location;
            docModalDuration.textContent = guide.durationEn || guide.duration;
        } else {
            docModalTitle.textContent = `📄 ${guide.title} 상세 안내`;
            docModalDesc.textContent = guide.desc;
            docModalPrep.textContent = guide.prep;
            docModalFee.textContent = guide.fee;
            docModalLocation.textContent = guide.location;
            docModalDuration.textContent = guide.duration;
        }

        docDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // block parent scroll
    }

    function closeDocDetailModal() {
        docDetailModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // restore parent scroll
    }

    docModalCloseBtn.addEventListener('click', closeDocDetailModal);
    docModalOkBtn.addEventListener('click', closeDocDetailModal);
    
    // Close when overlay clicked
    docDetailModal.addEventListener('click', (e) => {
        if (e.target === docDetailModal) {
            closeDocDetailModal();
        }
    });

    // Attach listeners to all default document triggers inside static panels
    document.querySelectorAll('.clickable-doc-trigger').forEach(card => {
        card.addEventListener('click', (e) => {
            const docName = card.getAttribute('data-docname');
            openDocDetailModal(docName);
        });
    });


    /* ==========================================================================
       Interactive Self-Diagnostic Wizard Logic
       ========================================================================== */
    let wizardState = {
        step: 1,
        selectedType: '', // restaurant, cafe, instant, factory
        step2Val: '',     // risk-high, risk-low, zone-ok, zone-warning
        lpgUsed: false,
        groundwaterUsed: false,
        isLarge1stFloor: false
    };

    const wizardProgressBar = document.getElementById('wizard-progress-bar');
    const progSteps = document.querySelectorAll('.progress-steps .prog-step');
    const prevStepBtn = document.getElementById('wizard-prev-btn');
    const nextStepBtn = document.getElementById('wizard-next-btn');
    const resetWizardBtn = document.getElementById('wizard-reset-btn');
    const printWizardBtn = document.getElementById('wizard-print-btn');
    const wizardNavBtnsContainer = document.getElementById('wizard-nav-btns');

    // Step elements
    const stepPane1 = document.getElementById('step-pane-1');
    const stepPane2 = document.getElementById('step-pane-2');
    const stepPane3 = document.getElementById('step-pane-3');
    const stepPaneResult = document.getElementById('step-pane-result');

    // Dynamic Step 2 text placeholders
    const step2QuestionTitle = document.getElementById('step2-question-title');
    const step2QuestionHint = document.getElementById('step2-question-hint');
    const step2OptionsContainer = document.getElementById('step2-options-container');

    // Option selectors
    const step1Options = document.querySelectorAll('#step-pane-1 .option-card');
    
    // Checkboxes Step 3
    const chkLpg = document.getElementById('chk-lpg');
    const chkUnderground = document.getElementById('chk-underground');
    const chkInsurance = document.getElementById('chk-insurance');

    // Step 1: Select Type
    step1Options.forEach(opt => {
        opt.addEventListener('click', () => {
            step1Options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            wizardState.selectedType = opt.getAttribute('data-val');
            updateWizardButtons();
        });
    });

    // Configure Step 2 Options based on Step 1 selection
    function setupStep2Pane() {
        const type = wizardState.selectedType;
        step2OptionsContainer.innerHTML = ''; // Clear previous

        let titleText = '';
        let hintText = '';
        let lowCardTitle = '';
        let lowCardDesc = '';
        let highCardTitle = '';
        let highCardDesc = '';

        if (type === 'restaurant' || type === 'cafe') {
            if (currentLang === 'en') {
                titleText = 'Q2. What is the floor and area of your business premises?';
                hintText = 'Assess if your shop requires a Fire Safety Certificate based on basement/floor area.';
                lowCardTitle = 'Standard Fire Safety area';
                lowCardDesc = 'Ground 1st floor shops (any size), or upper floors (under 100㎡) / basements (under 66㎡). waived.';
                highCardTitle = 'Mandatory Fire Safety area';
                highCardDesc = 'Basement area >= 66㎡, or upper floor >= 100㎡. Requires a Fire Safety Certificate.';
            } else {
                titleText = 'Q2. 매장의 건축물 층수와 전용면적은 어떻게 되시나요?';
                hintText = '안전시설 소방 증명 여부를 가리기 위해 층수와 대략적인 면적을 확인합니다.';
                lowCardTitle = '기본 소방시설 대상';
                lowCardDesc = '지상 1층에 입점하며 크기와 상관없거나, 혹은 지상 2층 이상(100㎡ 미만) / 지하층(66㎡ 미만)의 소형 매장입니다.';
                highCardTitle = '다중이용업소 소방 대상';
                highCardDesc = '지하층 면적이 66㎡(약 20평) 이상이거나, 지상 2층 이상의 층에서 실면적 100㎡(약 30평) 이상인 업장입니다. (소방 필증 의무)';
            }
            
            const optLow = createOptionCard('low-risk', lowCardTitle, lowCardDesc, 'green',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>`
            );
            const optHigh = createOptionCard('high-risk', highCardTitle, highCardDesc, 'red',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
            );
            
            step2OptionsContainer.appendChild(optLow);
            step2OptionsContainer.appendChild(optHigh);

        } else if (type === 'instant') {
            if (currentLang === 'en') {
                titleText = 'Q2. What is the zoning of your commercial shop?';
                hintText = 'Check if the building zoning registered allows food processing retail.';
                lowCardTitle = 'Commercial / Retail zoning';
                lowCardDesc = 'Class 1 or Class 2 Neighborhood Commercial or Retail building zones on the ledger.';
                highCardTitle = 'Residential / Illegal zoning';
                highCardDesc = 'Designated as standalone house, barn, agricultural storage, or unauthorized structure.';
            } else {
                titleText = 'Q2. 매장이 위치한 상가의 입지 용도(건축물 용도)는 무엇인가요?';
                hintText = '건축물대장상 점포 용도가 즉석판매업에 합당한지 확인합니다.';
                lowCardTitle = '근린생활시설 / 판매시설 용도';
                lowCardDesc = '건축물대장상 점포 용도가 제1종 또는 제2종 근린생활시설, 혹은 판매시설로 명시되어 있습니다.';
                highCardTitle = '주거용(주택) 또는 무허가 건물 용도';
                highCardDesc = '대장상 단독주택, 공동주택, 농업용 창고 등으로 되어 있거나 가설건축물 형태의 점포입니다.';
            }
            
            const optOk = createOptionCard('zone-ok', lowCardTitle, lowCardDesc, 'green',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
            );
            const optWarning = createOptionCard('zone-warning', highCardTitle, highCardDesc, 'red',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`
            );
            
            step2OptionsContainer.appendChild(optOk);
            step2OptionsContainer.appendChild(optWarning);

        } else if (type === 'factory') {
            if (currentLang === 'en') {
                titleText = 'Q2. What is the real-estate land use zoning zone?';
                hintText = 'Yanggu limits industrial factory registrations to specific industrial zones.';
                lowCardTitle = 'Factory / Manufactory zone';
                lowCardDesc = 'Semi-industrial, commercial, or semi-residential zones. Building ledger code: factory.';
                highCardTitle = 'Strictly Residential zone / Greenbelt';
                highCardDesc = 'Residential areas or Greenbelt reserves. Food factory registration is strictly banned.';
            } else {
                titleText = 'Q2. 가공 시설을 차리고자 하는 장소의 국토계획법상 용도지역은 어디인가요?';
                hintText = '양구군 식품제조가공 공장 설립이 적법한 구역인지 용도지역을 체크합니다.';
                lowCardTitle = '공장 / 제조업소 적합 지역';
                lowCardDesc = '준공업지역, 상업지역 또는 준주거지역에 대지 용도가 제조업소나 공장으로 등록되어 있습니다.';
                highCardTitle = '주거지역 (전용/일반주거) 또는 그린벨트';
                highCardDesc = '전용주거지역, 일반주거지역, 보존지구 또는 개발제한구역(그린벨트) 내 상가 건물입니다.';
            }
            
            const optOk = createOptionCard('zone-ok', lowCardTitle, lowCardDesc, 'green',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
            );
            const optWarning = createOptionCard('zone-warning', highCardTitle, highCardDesc, 'red',
                `<svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
            );
            
            step2OptionsContainer.appendChild(optOk);
            step2OptionsContainer.appendChild(optWarning);
        }

        step2QuestionTitle.textContent = titleText;
        step2QuestionHint.textContent = hintText;

        // Re-attach listeners to dynamically generated option cards in Step 2
        const step2Options = step2OptionsContainer.querySelectorAll('.option-card');
        step2Options.forEach(opt => {
            opt.addEventListener('click', () => {
                step2Options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                wizardState.step2Val = opt.getAttribute('data-val');
                updateWizardButtons();
            });
        });
    }

    // Helper function to build dynamic HTML for options
    function createOptionCard(val, title, text, badgeColor, iconSvg) {
        const btn = document.createElement('button');
        btn.className = 'option-card';
        btn.setAttribute('data-step', '2');
        btn.setAttribute('data-val', val);
        
        let badgeLabel = '';
        if (currentLang === 'en') {
            badgeLabel = badgeColor === 'green' ? 'Legal/Waived' : 'Check/Strict';
        } else {
            badgeLabel = badgeColor === 'green' ? '적법/완화' : '확인필요/강화';
        }
        
        btn.innerHTML = `
            <div class="opt-badge ${badgeColor}">${badgeLabel}</div>
            <div class="opt-icon">${iconSvg}</div>
            <h5>${title}</h5>
            <p>${text}</p>
        `;
        return btn;
    }

    function updateWizardButtons() {
        const step = wizardState.step;
        
        // Prev button disable check
        if (step === 1) {
            prevStepBtn.disabled = true;
        } else {
            prevStepBtn.disabled = false;
        }

        // Next button validation check
        if (step === 1 && !wizardState.selectedType) {
            nextStepBtn.disabled = true;
        } else if (step === 2 && !wizardState.step2Val) {
            nextStepBtn.disabled = true;
        } else {
            nextStepBtn.disabled = false;
        }

        // Next button text
        if (step === 3) {
            nextStepBtn.innerHTML = currentLang === 'en' ? 'Diagnostics Completed &check;' : '진단 완료 &check;';
        } else {
            nextStepBtn.innerHTML = currentLang === 'en' ? 'Next Step &rarr;' : '다음 단계 &rarr;';
        }
    }

    function renderStep() {
        // Hide all steps
        stepPane1.classList.remove('active');
        stepPane2.classList.remove('active');
        stepPane3.classList.remove('active');
        stepPaneResult.classList.remove('active');

        // Update progress nodes
        progSteps.forEach(node => {
            node.classList.remove('active', 'complete');
            const stepNum = node.getAttribute('data-step');
            
            if (wizardState.step === 'result') {
                if (stepNum === 'result') node.classList.add('active');
                else node.classList.add('complete');
            } else {
                if (parseInt(stepNum) < wizardState.step) node.classList.add('complete');
                else if (parseInt(stepNum) === wizardState.step) node.classList.add('active');
            }
        });

        // Set progress bar width
        let percent = 0;
        if (wizardState.step === 1) percent = 15;
        else if (wizardState.step === 2) percent = 50;
        else if (wizardState.step === 3) percent = 80;
        else if (wizardState.step === 'result') percent = 100;
        wizardProgressBar.style.width = percent + '%';

        // Show current pane
        if (wizardState.step === 1) {
            stepPane1.classList.add('active');
            wizardNavBtnsContainer.style.display = 'flex';
        } else if (wizardState.step === 2) {
            setupStep2Pane();
            stepPane2.classList.add('active');
            wizardNavBtnsContainer.style.display = 'flex';
        } else if (wizardState.step === 3) {
            stepPane3.classList.add('active');
            wizardNavBtnsContainer.style.display = 'flex';
        } else if (wizardState.step === 'result') {
            generateDiagnosticResult();
            stepPaneResult.classList.add('active');
            wizardNavBtnsContainer.style.display = 'none'; // Hide next/prev controls in result screen
        }

        updateWizardButtons();
    }

    // Dynamic translate lookup maps for diagnostic outputs
    const docTranslations = {
        en: {
            '건강진단결과서 (구 보건증)': { name: 'Health Certificate (Health Card)', desc: 'For the CEO and food handler workers (Issued by Health Center, valid for 1 year)' },
            '임대차계약서 사본': { name: 'Copy of Lease Agreement', desc: 'Proof of premises occupancy under the applicant name' },
            '신분증': { name: 'ID Card', desc: 'Applicant ID card (Requires corporate registration/seal if corporate)' },
            '식품영업신고서': { name: 'Food Business Declaration Form', desc: 'Filing form available at the Health Center (Filing fee: 28,000 KRW)' },
            '위생교육수료증': { name: 'Hygiene Education Certificate', desc: 'Completion certificate of online course prior to declaration' },
            '안전시설등 완비증명서 (소방필증)': { name: 'Fire Safety Certificate', desc: 'Required for basement >= 66㎡ or upper floor >= 100㎡ (Issued by Fire Station)' },
            'LPG 가스시설 사용 완성검사필증': { name: 'LPG Facility Inspection Certificate', desc: 'Required when installing gray LPG cylinders' },
            '재난배상책임보험 가입증명서': { name: 'Disaster Liability Insurance Certificate', desc: 'Required for 1st-floor shops with area >= 100㎡' },
            '지하수 수질검사성적서': { name: 'Groundwater Quality Test Report', desc: 'Required if well water is used as cooking water' },
            '지하수 수질검사합격서': { name: 'Groundwater Quality Test Report', desc: 'Required if well water is used for coffee machine supply' },
            '제조방법설명서': { name: 'Manufacturing Process Description', desc: 'Describe food categories, ingredient composition, and kitchen process steps' },
            '지하수 수질검사성적서 (공인기관)': { name: 'Groundwater Quality Test Report', desc: 'Required if well water is used for manufacturing water' },
            '식품영업등록신청서': { name: 'Food Manufacturing Registration Form', desc: 'Filing application form for food manufacturing registration' },
            '제조방법설명서 상세본': { name: 'Detailed Manufacturing Process Description', desc: 'Detailed composition ratios and food manufacturing steps' },
            '품목제조보고서': { name: 'Product Manufacturing Report', desc: 'Online report submitted via Food Safety Korea within 7 days of production' }
        }
    };

    // Generate Final Diagnostics Result Data
    function generateDiagnosticResult() {
        const type = wizardState.selectedType;
        const s2 = wizardState.step2Val;
        
        wizardState.lpgUsed = chkLpg.checked;
        wizardState.groundwaterUsed = chkUnderground.checked;
        wizardState.isLarge1stFloor = chkInsurance.checked;

        const resultTypeName = document.getElementById('result-business-type-name');
        const docList = document.getElementById('result-document-list');
        const zoningMain = document.getElementById('result-zoning-main-text');
        const zoningSub = document.getElementById('result-zoning-sub-text');
        const periodText = document.getElementById('result-period');

        docList.innerHTML = ''; // Clear previous

        let title = '';
        let commonDocs = [
            { name: '건강진단결과서 (구 보건증)', desc: '대표자 본인 및 조리 근로 종사자 포함 (보건소 발급, 1년 유효)' },
            { name: '임대차계약서 사본', desc: '영업장 점포 권리 입증용 (본인 또는 법인명의 계약 확인)' },
            { name: '신분증', desc: '대표자 방문 기준 (법인 시 등기부등본, 법인인감, 인감증명 필요)' }
        ];

        let specificDocs = [];
        let zoningMainTxt = '';
        let zoningSubTxt = '';

        if (type === 'restaurant') {
            title = currentLang === 'en' ? 'General Restaurant Permit Target' : '일반음식점 영업신고 대상';
            periodText.textContent = currentLang === 'en' ? 'Immediate (within 3 hours)' : '즉시 (접수 완료 후 3시간 이내)';
            zoningMainTxt = currentLang === 'en' ? 'Class 2 Neighborhood Commercial (Restaurant)' : '제2종 근린생활시설(일반음식점)';
            zoningSubTxt = currentLang === 'en' ? 'Requires septic tank load review. Banned structures will cause approval delays.' : '건물 내 기존 정화조 오수 한도 검토 필수. 불법 무단 증축(위반건축물) 부지가 있으면 신고증 교부가 보류됩니다.';
            
            specificDocs.push({ name: '식품영업신고서', desc: '보건소 민원실 비치 양식 (수수료 28,000원)' });
            specificDocs.push({ name: '위생교육수료증', desc: '한국외식업중앙회 또는 한국외식산업협회 사전 이수 필수' });

            if (s2 === 'high-risk') {
                specificDocs.push({ name: '안전시설등 완비증명서 (소방필증)', desc: '지하 66㎡ 이상 또는 지상 2층 이상 100㎡ 이상 시 소방서 발행본 필수' });
            }
            if (wizardState.lpgUsed) {
                specificDocs.push({ name: 'LPG 가스시설 사용 완성검사필증', desc: '액화석유가스 가스통 배관 사용 시 한국가스안전공사 합격증 제출' });
            }
            if (wizardState.isLarge1stFloor) {
                specificDocs.push({ name: '재난배상책임보험 가입증명서', desc: '지상 1층이고 전용 면적 100㎡ 이상인 요식업소 필수 의무 가입' });
            }
            if (wizardState.groundwaterUsed) {
                specificDocs.push({ name: '지하수 수질검사성적서', desc: '상수도가 아닌 지하수를 요리용수로 공급받아 쓰는 경우' });
            }

        } else if (type === 'cafe') {
            title = currentLang === 'en' ? 'Rest Restaurant Permit Target' : '휴게음식점 영업신고 대상';
            periodText.textContent = currentLang === 'en' ? 'Immediate (within 3 hours)' : '즉시 (접수 완료 후 3시간 이내)';
            zoningMainTxt = currentLang === 'en' ? 'Class 1 or 2 Neighborhood Commercial (Rest Restaurant)' : '제1종 또는 제2종 근린생활시설(휴게음식점)';
            zoningSubTxt = currentLang === 'en' ? 'No alcohol consumption permitted. Violating structures cannot be registered.' : '주류 판매가 불가한 다과/베이커리/카페 업종입니다. 위반건축물 상의 점포는 신고 불가합니다.';
            
            specificDocs.push({ name: '식품영업신고서', desc: '보건소 민원실 비치 양식 (수수료 28,000원)' });
            specificDocs.push({ name: '위생교육수료증', desc: '한국휴게음식업중앙회 또는 한국외식업중앙회 온라인 이수' });

            if (s2 === 'high-risk') {
                specificDocs.push({ name: '안전시설등 완비증명서 (소방필증)', desc: '지하 66㎡ 이상 또는 지상 2층 이상 100㎡ 이상 매장 시 소방서 완비증명 필수' });
            }
            if (wizardState.lpgUsed) {
                specificDocs.push({ name: 'LPG 가스시설 완성검증필증', desc: 'LPG 화구 사용 점포 필수' });
            }
            if (wizardState.isLarge1stFloor) {
                specificDocs.push({ name: '재난배상책임보험 가입증명서', desc: '지상 1층 면적 100㎡ 이상 영업주 필수 가입' });
            }
            if (wizardState.groundwaterUsed) {
                specificDocs.push({ name: '지하수 수질검사합격서', desc: '커피머신 조리용수 지하수 공급 시 필수 제출' });
            }

        } else if (type === 'instant') {
            title = currentLang === 'en' ? 'Instant Food Prep Declaration Target' : '즉석판매제조가공업 영업신고 대상';
            periodText.textContent = currentLang === 'en' ? 'Immediate (within 3 hours)' : '즉시 (접수 완료 후 3시간 이내)';
            zoningMainTxt = currentLang === 'en' ? 'Class 1/2 Neighborhood Commercial or Retail' : '제1종 또는 제2종 근린생활시설, 판매시설';
            zoningSubTxt = currentLang === 'en' ? 'Kitchen and retail payment areas must be physically partitioned.' : '제조작업장(조리실)과 소비자 거래 창구(판매대)가 완전히 공간 구획 또는 격벽으로 구분되어야 신고 실사가 통과됩니다.';
            
            specificDocs.push({ name: '식품영업신고서', desc: '보건소 민원실 비치 (수수료 28,000원)' });
            specificDocs.push({ name: '제조방법설명서', desc: '판매할 모든 세부 식품 유형과 가공 공정도 기술 (양식 다운로드 작성 가능)' });
            specificDocs.push({ name: '위생교육수료증', desc: '한국식품산업협회 신규 온라인 교육 이수 수료증' });

            if (s2 === 'zone-warning') {
                zoningMainTxt = currentLang === 'en' ? '⚠️ Invalid Zoning (Residential/Illegal)' : '⚠️ 용도 부적합 경고 (주거용/무허가)';
                zoningSubTxt = currentLang === 'en' ? 'Manufacturing is banned in residential zones. Modify your shop lease agreement.' : '주택이나 무허가 건물지에서는 즉석판매업 영위가 법적으로 불가합니다. 반드시 근린생활 용도의 상가 점포로 부동산 계약을 변경하십시오.';
            }
            if (wizardState.groundwaterUsed) {
                specificDocs.push({ name: '지하수 수질검사성적서 (공인기관)', desc: '가공용수로 지하수 사용 시 필수' });
            }

        } else if (type === 'factory') {
            title = currentLang === 'en' ? 'Food Manufacturing Registration Target' : '식품제조가공업 영업등록 대상';
            periodText.textContent = currentLang === 'en' ? 'Within 3 days (Onsite verification visit required)' : '3일 이내 (현장 위생 설비 조사 실사 필요)';
            zoningMainTxt = currentLang === 'en' ? 'Factory building code or Class 2 Commercial (Manufactory)' : '공장 용도 또는 제2종 근린생활시설(제조업소)';
            zoningSubTxt = currentLang === 'en' ? 'Limit rules apply for industrial factory layout. Land use zones check required.' : '식품 대량 유통을 위한 공장 등록입니다. 공업지역, 준주거지역 등 설립 한계선이 명확하므로 입지 조회가 절대적입니다.';
            
            specificDocs.push({ name: '식품영업등록신청서', desc: '영업 신고가 아닌 등록 절차입니다. (수수료 28,000원)' });
            specificDocs.push({ name: '제조방법설명서 상세본', desc: '식품 원재료 배합비율과 구체적인 제조공정도 등 상세 도표 작성' });
            specificDocs.push({ name: '위생교육수료증', desc: '한국식품산업협회 식품제조가공업 위생교육 필수' });
            specificDocs.push({ name: '품목제조보고서', desc: '영업등록 후 제품 가공 생산 7일 이내에 식품안전나라 온라인 사이트에 보고 필수' });

            if (s2 === 'zone-warning') {
                zoningMainTxt = currentLang === 'en' ? '⚠️ Factory Construction Banned Area Warning' : '⚠️ 용도 부적합/제조업 금지지역 경고';
                zoningSubTxt = currentLang === 'en' ? 'Factory registration is absolutely blocked in residential zones or Greenbelts.' : '주거지역이나 개발제한구역(그린벨트) 등 용도제한으로 식품공장 등록이 절대 불가능합니다. 상업지 또는 준공업지 공장 매물로 다시 탐색하십시오.';
            }
            if (wizardState.groundwaterUsed) {
                specificDocs.push({ name: '지하수 수질검사성적서', desc: '가공 배출 용수가 공인 식음 검사 규격에 합격해야 함' });
            }
        }

        resultTypeName.textContent = title;
        zoningMain.textContent = zoningMainTxt;
        
        // Render alert warning color if warning
        if (zoningMainTxt.includes('경고') || zoningMainTxt.includes('부적합') || zoningMainTxt.includes('Warning') || zoningMainTxt.includes('Banned')) {
            zoningMain.style.color = '#ff6f3c';
        } else {
            zoningMain.style.color = 'inherit';
        }
        zoningSub.textContent = zoningSubTxt;

        // Merge and render document checklist with 상세보기 button
        const finalDocs = [...specificDocs, ...commonDocs];
        finalDocs.forEach((doc, idx) => {
            let docNameTranslated = doc.name;
            let docDescTranslated = doc.desc;

            // Apply translation map lookup
            if (currentLang === 'en' && docTranslations.en[doc.name]) {
                docNameTranslated = docTranslations.en[doc.name].name;
                docDescTranslated = docTranslations.en[doc.name].desc;
            }

            const li = document.createElement('li');
            li.className = 'result-doc-item';
            li.innerHTML = `
                <span class="chk">&#10004;</span>
                <div style="flex-grow: 1;">
                    <h6>${idx + 1}. ${docNameTranslated}</h6>
                    <p>${docDescTranslated}</p>
                </div>
                <button class="btn-doc-detail-trigger" data-docname="${doc.name}">${currentLang === 'en' ? 'Details' : '상세보기'}</button>
            `;
            docList.appendChild(li);
        });

        // Bind click events on dynamic result list elements
        docList.querySelectorAll('.btn-doc-detail-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const docName = btn.getAttribute('data-docname');
                openDocDetailModal(docName);
            });
        });

        docList.querySelectorAll('.result-doc-item').forEach(item => {
            item.addEventListener('click', () => {
                const docName = item.querySelector('.btn-doc-detail-trigger').getAttribute('data-docname');
                openDocDetailModal(docName);
            });
        });
    }

    // Step Nav Button Event Handlers
    nextStepBtn.addEventListener('click', () => {
        if (wizardState.step === 1 && wizardState.selectedType) {
            wizardState.step = 2;
            renderStep();
        } else if (wizardState.step === 2 && wizardState.step2Val) {
            wizardState.step = 3;
            renderStep();
        } else if (wizardState.step === 3) {
            wizardState.step = 'result';
            renderStep();
            showToast(currentLang === 'en' ? '📄 Custom required papers report generated successfully.' : '📄 나에게 최적화된 서류 결과표가 생성되었습니다.');
        }
    });

    prevStepBtn.addEventListener('click', () => {
        if (wizardState.step === 2) {
            wizardState.step = 1;
            wizardState.step2Val = ''; // Clear selection
            renderStep();
        } else if (wizardState.step === 3) {
            wizardState.step = 2;
            renderStep();
        }
    });

    // Reset Wizard
    resetWizardBtn.addEventListener('click', () => {
        wizardState = {
            step: 1,
            selectedType: '',
            step2Val: '',
            lpgUsed: false,
            groundwaterUsed: false,
            isLarge1stFloor: false
        };
        
        // Reset checkbox DOM states
        chkLpg.checked = false;
        chkUnderground.checked = false;
        chkInsurance.checked = false;
        
        // Reset selections classes
        step1Options.forEach(o => o.classList.remove('selected'));
        
        renderStep();
        showToast(currentLang === 'en' ? '🔄 Questionnaire reset.' : '🔄 자가진단 문항이 초기화되었습니다.');
    });

    // Mock Print Checksheet
    printWizardBtn.addEventListener('click', () => {
        showToast(currentLang === 'en' ? '🖨️ Opening print/PDF options...' : '🖨️ 인쇄/PDF 저장 창을 호출합니다.');
        setTimeout(() => {
            window.print();
        }, 300);
    });

    // Init Wizard
    updateWizardButtons();

    /* ==========================================================================
       Tab Guide Panel Controller (업종별 상세 가이드)
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active classes
            btn.classList.add('active');
            const targetTabId = btn.getAttribute('data-tab');
            
            // Map tab to pane ID
            let panelId = 'panel-general';
            if (targetTabId === 'rest') panelId = 'panel-rest';
            else if (targetTabId === 'instant-store') panelId = 'panel-instant-store';
            else if (targetTabId === 'factory-store') panelId = 'panel-factory-store';

            document.getElementById(panelId).classList.add('active');
            
            showToast(currentLang === 'en' 
                ? `📂 Opening [${btn.querySelector('.tab-title').textContent}] guide.`
                : `📂 [${btn.querySelector('.tab-title').textContent}] 가이드를 엽니다.`);
        });
    });

    /* ==========================================================================
       Roadmap Step Node Interactions
       ========================================================================== */
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.querySelector('.step-num-node').style.backgroundColor = 'var(--primary-color)';
            step.querySelector('.step-num-node').style.color = 'white';
        });
        step.addEventListener('mouseleave', () => {
            // Restore back unless it's focused
            step.querySelector('.step-num-node').style.backgroundColor = 'var(--card-bg)';
            step.querySelector('.step-num-node').style.color = 'var(--primary-color)';
        });
    });

    /* ==========================================================================
       Document Search Filter (실시간 자료실 서식 필터링)
       ========================================================================== */
    const liveSearchInput = document.getElementById('live-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const downloadCards = document.querySelectorAll('.download-card');
    const searchNoResults = document.getElementById('search-no-results');

    liveSearchInput.addEventListener('input', () => {
        const query = liveSearchInput.value.toLowerCase().trim();
        let matchCount = 0;

        if (query.length > 0) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }

        downloadCards.forEach(card => {
            const titleText = card.querySelector('h4').textContent.toLowerCase();
            const descText = card.querySelector('p').textContent.toLowerCase();
            const tagsText = card.getAttribute('data-tags').toLowerCase();

            if (titleText.includes(query) || descText.includes(query) || tagsText.includes(query)) {
                card.style.display = 'flex';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (matchCount === 0) {
            searchNoResults.style.display = 'block';
        } else {
            searchNoResults.style.display = 'none';
        }
    });

    // Clear Search Input
    clearSearchBtn.addEventListener('click', () => {
        liveSearchInput.value = '';
        clearSearchBtn.style.display = 'none';
        
        // Reset all cards
        downloadCards.forEach(card => {
            card.style.display = 'flex';
        });
        searchNoResults.style.display = 'none';
        liveSearchInput.focus();
        showToast(currentLang === 'en' ? '🔍 Filter cleared.' : '🔍 검색 필터가 해제되었습니다.');
    });

    // Header Search integration
    const headerSearchInput = document.getElementById('header-search-input');
    const headerSearchBtn = document.getElementById('header-search-btn');

    headerSearchBtn.addEventListener('click', () => {
        triggerHeaderSearch();
    });

    headerSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            triggerHeaderSearch();
        }
    });

    function triggerHeaderSearch() {
        const val = headerSearchInput.value.trim();
        if (val) {
            liveSearchInput.value = val;
            // Scroll to search block
            const searchSection = document.getElementById('downloads');
            searchSection.scrollIntoView({ behavior: 'smooth' });
            
            // Dispatch input event to trigger filter
            const event = new Event('input', { bubbles: true });
            liveSearchInput.dispatchEvent(event);
            
            headerSearchInput.value = ''; // clear header box
            showToast(currentLang === 'en' 
                ? `🔎 Search forms for [${val}]`
                : `🔎 [${val}] 키워드로 서식을 검색했습니다.`);
        }
    }

    /* ==========================================================================
       Mock File Download Handler & Toast Alerts
       ========================================================================== */
    const mockDownloadBtns = document.querySelectorAll('.mock-download-btn');
    mockDownloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = btn.getAttribute('data-file');
            
            // Show toast first
            showToast(currentLang === 'en' 
                ? `📥 Downloading file: ${fileName}...`
                : `📥 ${fileName} 파일 다운로드가 시작되었습니다.`);
            
            // Simulate file download delay
            btn.innerHTML = currentLang === 'en' ? 'Loading..' : '다운 중..';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = currentLang === 'en' ? 'Download' : '다운로드';
                btn.disabled = false;
                
                // Create a virtual mock-download trigger for client demonstration
                const headerText = currentLang === 'en' ? '[Yanggu-gun Health Center Food Business Form Sample]' : '[양구군보건소 식품영업민원 샘플]';
                const footerText = currentLang === 'en' ? 'Food sanitary code template virtual download completed.' : '식품위생법 인허가 관련 서식 가상 예문 파일 다운로드 구동 완료.';
                const blob = new Blob([`${headerText}\nFileName: ${fileName}\n\n${footerText}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showToast(currentLang === 'en' ? `✅ Downloaded ${fileName}!` : `✅ ${fileName} 다운로드 완료!`);
            }, 1000);
        });
    });

    /* ==========================================================================
       FAQ Accordion Interactions (자주 묻는 질문 아코디언)
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Toggle current FAQ item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       Floating Widgets & Modal Location Popup
       ========================================================================== */
    const mainWidgetBtn = document.getElementById('main-widget-btn');
    const widgetSubMenu = document.getElementById('widget-sub-menu');
    const locationModalBtn = document.getElementById('widget-btn-location');
    const locationModal = document.getElementById('location-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    mainWidgetBtn.addEventListener('click', () => {
        widgetSubMenu.classList.toggle('active');
        mainWidgetBtn.classList.toggle('widget-active');
    });

    // Close speed dial sub menu on clicking out
    window.addEventListener('click', (e) => {
        if (!mainWidgetBtn.contains(e.target) && !widgetSubMenu.contains(e.target)) {
            widgetSubMenu.classList.remove('active');
            mainWidgetBtn.classList.remove('widget-active');
        }
    });

    // Open Modal
    locationModalBtn.addEventListener('click', () => {
        locationModal.classList.add('active');
        widgetSubMenu.classList.remove('active');
        mainWidgetBtn.classList.remove('widget-active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    });

    // Close Modal
    function closeModal() {
        locationModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOkBtn.addEventListener('click', closeModal);

    // Close on overlay clicking
    locationModal.addEventListener('click', (e) => {
        if (e.target === locationModal) {
            closeModal();
        }
    });

    /* ==========================================================================
       Global Toast Alert System
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');

    function showToast(message) {
        // Create toast node
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Set fade out
        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3200);
    }


    /* ==========================================================================
       Multi-language Translation Toggle (i18n System)
       ========================================================================== */
    const translations = {
        ko: {
            "page-title": "양구군 보건소 | 식품영업신고 원스톱 지원센터",
            "skip-nav-text": "본문 바로가기",
            "gov-home": "양구군청 바로가기",
            "online-minwon": "온라인 민원창구",
            "logo-title": "양구군보건소",
            "logo-subtitle": "식품영업신고 원스톱 지원센터",
            "menu-wizard": "맞춤형 자가진단",
            "menu-guide": "업종별 상세가이드",
            "menu-roadmap": "신고 로드맵",
            "menu-downloads": "서식 자료실",
            "menu-faq": "자주 묻는 질문",
            "search-placeholder": "서류 또는 키워드 입력",
            "hero-tag": "양구군 민원 지원 솔루션",
            "hero-title": "양구에서 식품 창업을<br>준비하시나요?",
            "hero-desc": "즉석판매제조가공업, 일반음식점, 휴게음식점, 식품제조가공업 영업신고 및 등록에 필요한 서류와 복잡한 요건을 군민의 눈높이에서 한눈에 보여드립니다.",
            "hero-btn-wizard": "내게 맞는 서류 진단하기",
            "hero-btn-guide": "업종별 가이드 보기",
            "slide1-tag": "알림존",
            "slide1-title": "보건소 위생교육 수료 안내",
            "slide1-desc": "양구군에서 영업신고 전 위생교육 사전 이수는 필수 의무사항입니다. 각 업종별 법정 위생교육 기관을 확인하고 미리 수료증을 준비하세요.",
            "slide2-tag": "군정소식",
            "slide2-title": "양구 맛집 위생등급제 지원",
            "slide2-desc": "양구군 보건소는 군민 및 양구를 찾으시는 외지 관광객분들께 안전한 식문화를 제공하고자, 위생점검 사전 지도 및 식중독 예방 사업을 추진 중입니다.",
            "slide3-tag": "인허가 중요",
            "slide3-title": "상가 계약 전 용도 확인 필수",
            "slide3-desc": "부동산 가계약 이전에 해당 점포가 식품영업이 가능한 건축물대장상 용도(근린생활시설 등)인지 반드시 양구군 보건소 위생관리팀에 사전 확인하세요!",
            "slide-details": "자세히 보기 &rarr;",
            "quick1-title": "준비 서류 일괄 안내",
            "quick1-desc": "상세 설명 팝업 연결 지원",
            "quick2-title": "평균 민원 처리 시간",
            "quick2-desc": "접수 완료 후 당일(3시간 이내)",
            "quick3-title": "보건증 간편 발급",
            "quick3-desc": "양구군 보건소 검진 접수",
            "quick4-title": "보건소 위생팀 상담",
            "quick4-desc": "민원 핫라인 033-480-2723",
            "wiz-section-subtitle": "SMART WIZARD",
            "wiz-section-title": "식품영업인허가 맞춤형 자가진단",
            "wiz-section-desc": "간단한 질문에 답변하시면 해당 업종 판정과 양구군청 제출에 필요한 서류 체크리스트를 동적으로 확인하실 수 있습니다.",
            "wiz-prog1": "업종 분류",
            "wiz-prog2": "시설 파악",
            "wiz-prog3": "세부 옵션",
            "wiz-prog4": "결과 진단서",
            "wiz-q1": "Q1. 하시고자 하는 식품 비즈니스의 주요 형태는 무엇인가요?",
            "wiz-hint1": "가장 부합하는 카드를 하나 선택해 주세요.",
            "badge-service": "식품접객업",
            "badge-mfg": "식품제조업",
            "wiz-opt1a-title": "조리 음식 판매 및 주류 매장",
            "wiz-opt1a-desc": "매장에서 직접 조리한 음식을 서빙하여 손님이 드실 수 있게 하고, 소주/맥주 등 주류 판매도 필요합니다. (일반식당, 고깃집, 일식집 등)",
            "wiz-opt1b-title": "음료, 제과 위주 및 주류 판매 없음",
            "wiz-opt1b-desc": "커피, 전통차, 디저트, 빵, 아이스크림 등을 전문으로 판매하며, 매장 내 주류 판매나 안주 제공은 불가능합니다. (카페, 베이커리, 주스숍 등)",
            "wiz-opt1c-title": "직접 제조/가공하여 소비자 대상 판매",
            "wiz-opt1c-desc": "매장 내 작업장에서 반찬, 떡, 한과, 밀키트 등을 직접 조리해 오프라인 매장 혹은 배송/택배(온라인)로 최종 손님에게 직접 판매합니다. (반찬가게, 수제잼, 떡집 등)",
            "wiz-opt1d-title": "대량 생산 및 유통/마트 등 B2B 납품",
            "wiz-opt1d-desc": "전문 공장이나 제조업소 설비를 갖춰 대량으로 식품을 생산하고, 타 마트나 온라인 도매처, 소매업체 등에 납품하여 유통시키고자 합니다. (식품 제조 공장)",
            "wiz-q3": "Q3. 비즈니스 시설에 사용 예정인 인프라 세부 사양은 어떻게 되나요?",
            "wiz-hint3": "중요한 세 가지 설비/보험 여부를 체크해 주세요. (해당되는 것 모두 선택)",
            "wiz-chk3a-title": "액화석유가스(LPG) 조리 연료 사용",
            "wiz-chk3a-desc": "도시가스(LNG) 배관망을 쓰지 않고 회색 가스통(LPG)을 설치해 주방 화구용 연료로 사용합니다. (LPG 사용 완성검사필증 필수 대상)",
            "wiz-chk3b-title": "상수도 대신 지하수(우물) 공급수 사용",
            "wiz-chk3b-desc": "시 외곽 지역 등 수돗물이 들어오지 않아 지하수를 영업장 조리수 및 식수로 사용합니다. (지하수 수질검사성적서 필수 대상)",
            "wiz-chk3c-title": "1층 바닥 면적이 100㎡(약 30평) 이상",
            "wiz-chk3c-desc": "1층에 입점하는 요식업 중 바닥 실평수 면적이 100㎡ 이상인 업장입니다. (재난배상책임보험 의무 가입)",
            "result-head": "진단이 성공적으로 완료되었습니다!",
            "result-list-title": "📋 나만을 위한 영업신고 필수 서류 체크리스트",
            "result-list-notice": "* 각 서류명을 클릭하시거나 [상세보기] 버튼을 누르시면 준비요령 팝업이 뜹니다.",
            "result-zoning-title": "🏢 건축물대장 용도 확인 사항",
            "result-fee-title": "관련 비용 및 처리기간 안내",
            "result-col-period": "처리 기간",
            "result-col-fee": "신고 수수료",
            "result-val-fee": "28,000원",
            "result-col-tax": "등록면허세",
            "result-val-tax": "면적에 따라 차등 부과 (약 18,000원 ~ 67,500원)",
            "result-btn-reset": "다시 자가진단하기",
            "result-btn-print": "진단 결과 프린트 / 저장",
            "wiz-btn-prev": "이전 단계",
            "wiz-btn-next": "다음 단계 &rarr;",
            "guide-subtitle": "DETAILED GUIDE",
            "guide-title": "업종별 영업인허가 기준 상세 안내",
            "guide-desc": "업종 카드를 클릭하시고 서류들의 [상세 정보] 버튼을 통해 발급 처리를 구체적으로 알아보세요.",
            "tab1-title": "일반음식점",
            "tab1-sub": "식사 및 주류 판매 요식업",
            "tab2-title": "휴게음식점",
            "tab2-sub": "카페, 제과점, 분식점",
            "tab3-title": "즉석판매제조가공업",
            "tab3-sub": "반찬가게, 떡집, 직접 소매",
            "tab4-title": "식품제조가공업",
            "tab4-sub": "B2B 대량 유통 및 공장",
            "tab1-panel-title": "식사 조리와 함께 주류 판매가 허용되는 대표적인 식품접객업종입니다.",
            "tab1-panel-desc": "식사 조리 판매와 소주, 맥주, 막걸리 등 반주 형태의 술 판매가 허용됩니다. 삼겹살전문점, 이자카야, 호프집, 일반 한식당 등이 해당됩니다. (서류명을 누르면 상세 발급안내가 뜹니다.)",
            "tab-docs-title": "필요 구비서류 체크리스트",
            "doc-item-report": "식품영업신고서",
            "btn-detail": "[상세안내]",
            "doc-item-report-desc": "보건소 민원실 비치 서식 (민원 수수료: 28,000원)",
            "doc-item-health": "건강진단결과서 (구 보건증)",
            "doc-item-health-desc": "종사자 및 대표자 필수 검사. 장티푸스, 폐결핵 검증용 (5영업일 소요)",
            "doc-item-hygiene": "위생교육수료증",
            "doc-item-hygiene-desc-general": "<strong>한국외식업중앙회</strong> 온라인 사전 위생교육 이수 필수",
            "doc-item-hygiene-desc-rest": "<strong>한국휴게음식업중앙회</strong> 또는 한국외식업중앙회 신규 위생교육 이수",
            "doc-item-hygiene-desc-instant": "<strong>한국식품산업협회</strong> 즉석판매제조가공업 동영상 교육과정(8시간)",
            "doc-item-hygiene-desc-factory": "<strong>한국식품산업협회</strong>의 신규 식품제조가공업 동영상 교육(8시간)",
            "doc-item-lease": "부동산 임대차계약서",
            "doc-item-lease-desc": "영업주의 명의로 확보된 상가 점포 임대 계약 서류",
            "tag-cond": "조건부",
            "doc-item-fire": "안전시설등 완비증명서 (소방필증)",
            "doc-item-fire-desc": "지하 66㎡ 이상 또는 지상 2층 이상 100㎡ 이상 영업장 해당 (양구소방서 발행)",
            "doc-item-lpg": "LPG 완성검사필증",
            "doc-item-lpg-desc": "액화석유가스(LPG) 가스통 연료 배관 적용 시 (가스안전공사 합격증)",
            "tab1-zoning-title": "일반음식점 시설 허가 기준",
            "tab2-zoning-title": "휴게음식점 시설 허가 기준",
            "tab3-zoning-title": "즉석판매제조가공업 시설 허가 기준",
            "tab4-zoning-title": "식품제조가공업 공장 등록 허가 기준",
            "tab-zoning-p1": "<strong>건축물대장 용도:</strong> <strong>제2종 근린생활시설(일반음식점)</strong>이 기본입니다. 다른 경우 기재사항 변경이나 표시 변경 절차가 수반됩니다.",
            "tab-zoning-p2": "<strong>위반건축물 조회:</strong> 무단 외장 천막 확장이나 불법 테라스 시공 등이 등재되어 있으면, 시정이 완료되기 전까지는 신규 영업신고가 원천 반려됩니다.",
            "tab-zoning-p3": "<strong>정화조 용량:</strong> 양구읍내 상가건물의 정화조 총 처리용량을 요식업 오수 기준량으로 초과하는지 여부를 보건소 위생팀에서 사전 연동 검토해야 합니다.",
            "tab-tip-title": "💡 양구군 위생업무 실무 팁",
            "tab-tip-desc": "\"이전 식당 사장님이 운영하던 매장을 그대로 인수하는 상황이라면, 폐업 후 신규 등록을 하지 마시고 **영업자 지위승계**를 이용해 보세요. 기존 소방 완비증명서가 자동으로 승계되어 비용과 소방서 서류 절차가 생략됩니다.\"",
            "tab2-panel-title": "커피, 차, 과자, 빵류 등을 판매하고 매장 내 주류 음주가 엄금된 요식업종입니다.",
            "tab2-panel-desc": "주류 일체 판매 불가 및 안주 취급 금지가 특징입니다. 커피전문점, 베이커리, 디저트 카페, 분식점, 패스트푸드점이 포함됩니다.",
            "tab2-zoning-p1": "<strong>건축물대장 용도:</strong> <strong>제1종 또는 제2종 근린생활시설(휴게음식점)</strong>에서 적법 승인됩니다.",
            "tab2-zoning-p2": "<strong>무인 판매점/무인 카페 주의:</strong> 상주 근로자 없이 키오스크 기계로 가동되는 무인 밀키트 판매기, 로봇 커피 자판기 매장도 기계를 통한 휴게음식점 영업신고 필증을 부착해야 위반 처벌을 피합니다.",
            "tab2-zoning-p3": "<strong>지하수 수질성적서:</strong> 상수관로가 연결되지 않은 양구군 외곽 도서/산간지 부지에서 지하수로 에스프레소 머신 커피 추출을 할 경우 먹는 물 지하수 수질검사성적이 추가 제출되어야 합니다.",
            "tab3-panel-title": "영업장에서 식품을 제조/가공하여 최종 소비자에게만 판매(소매)하는 가공업종입니다.",
            "tab3-panel-desc": "작업장 내에서 떡, 김치, 반찬, 한과, 참기름 등을 직접 가공하여 현장 고객에게 팔거나 택배/인터넷 쇼핑몰로 최종 구매자에게 발송할 수 있습니다. 마트 납품 및 유통(도매) 행위는 불가능합니다.",
            "doc-item-process": "제조방법설명서",
            "doc-item-process-desc": "판매 예정인 식품의 품목 유형과 배합, 가공 단계를 기술하는 서식",
            "tab3-zoning-p1": "<strong>건축물대장 용도:</strong> <strong>제1종/제2종 근린생활시설 및 판매시설</strong> 용도의 상가여야 영업신고가 나옵니다.",
            "tab3-zoning-p2": "<strong>조리실 구획 분리:</strong> 식품을 제조하는 청결작업장(조리실)은 일반 판매 구역이나 외부와 격벽, 투명 유리 등으로 완전히 물리적 차단 구획되어야 합니다.",
            "tab3-zoning-p3": "<strong>자가품질검사 의무:</strong> 판매하는 식품 유형(예: 즉석섭취식품 등)에 따라 정기적인 자가품질검사(대장균, 식중독균 등 검사) 의무 규정을 따릅니다.",
            "tab4-panel-title": "대량 기계 설비를 갖추고 마트, 온라인몰, 도매상 등에 B2B로 납품 및 유통이 가능한 정식 식품제조 공장입니다.",
            "tab4-panel-desc": "유통 제한이 없는 반면 공장 등록 절차를 거쳐야 하며, 건축물 용도 규제가 매우 엄격합니다. 타 업체에 납품 유통하는 도매가 이에 해당됩니다.",
            "doc-item-reg": "식품영업등록신청서",
            "doc-item-reg-desc": "신고 서식이 아닌 **등록 법정 서식** 작성 제출 (수수료: 28,000원)",
            "doc-item-prod": "품목제조보고서",
            "doc-item-prod-desc": "영업등록 완료 후 제품 생산 시작 7일 이내 식품안전나라 온라인 전산 보고",
            "tab4-zoning-p1": "<strong>건축물대장 용도:</strong> 건축물 용도가 반드시 <strong>공장</strong> 또는 <strong>제2종 근린생활시설(제조업소)</strong>이어야 정식 등록이 가능합니다. 주택가 등의 입지는 절대 불가능합니다.",
            "tab4-zoning-p2": "<strong>용도지역 한계:</strong> 국토계획법상 전용주거지역, 녹지지역, 상수원보호구역 등에서는 식품제조가공 공장 설립이 불가하며 양구군 조례상 제한 거리를 준수해야 합니다.",
            "tab4-zoning-p3": "<strong>자가품질검사 주기 강화:</strong> 유통되는 대량 생산 식품이므로, 즉석판매제조업에 비해 훨씬 잦은 주기(1~3개월 단위)로 시험 전문 위탁 기관의 자가품질검사를 거쳐 결과를 보관해야 합니다.",
            "tab4-tip-title": "⚠️ 등록 실사 거절 요소 대비",
            "tab4-tip-desc": "\"식품제조가공업은 영업등록 신청 시 보건소 담당 위생팀 공무원의 **현장 실사**가 무조건 발생합니다. 원료 창고, 배합/가공실, 내포장실, 외포장실, 근로자 탈의 및 위생전실이 완전히 독립 구획되어 있지 않으면 보완 및 지연 명령이 발생하므로 레이아웃 수립 시 보건소에 사전 자문을 받으세요.\"",
            "road-desc": "첫 아이디어 기획부터 영업신고증 수령까지 거쳐야 하는 명확한 행정 타임라인을 안내해 드립니다.",
            "road-step1-cost": "비용: 3,000원 내외",
            "road-step1-desc": "식품 취급자의 필수 요건입니다. 양구군 보건소 또는 가까운 보건기관에서 장티푸스, 폐결핵 검사를 받으시며, 발급까지 **영업일 기준 5일**이 소요됩니다.",
            "road-step1-tag": "1단계",
            "road-step1-title": "보건증(건강진단결과서) 발급",
            "road-step2-cost": "비용: 약 30,000원 ~ 35,000원",
            "road-step2-desc": "업종에 맞는 위생 교육기관 사이트에 가입하여 신규 영업주 강의(6~8시간)를 완료하고 수료증을 출력해 둡니다.",
            "road-step2-tag": "2단계",
            "road-step2-title": "법정 위생교육 이수",
            "road-step3-cost": "비용: 부동산 중개료 등",
            "road-step3-desc": "상가 건물의 대장 용도(근생/제조업 등) 및 위반건축물 등재 여부를 군 보건소 위생 담당자와 가계약 전에 미리 연동 조율합니다.",
            "road-step3-tag": "3단계",
            "road-step3-title": "임대차 계약 및 건축물대장 검토",
            "road-step4-cost": "비용: 설비 시공비 및 검사료",
            "road-step4-desc": "지하층/고층 식당은 소방서 소방완비증명서를 획득하고, LPG 가스 사용처는 가스안전공사 완성검사를 통과해야 합니다. 지하수 사용 시 수질성적서가 요구됩니다.",
            "road-step4-tag": "4단계",
            "road-step4-title": "소방필증 및 가스완성검사 (해당 시)",
            "road-step5-cost": "비용: 수수료 28,000원",
            "road-step5-desc": "양구군 보건소 1층 위생담당에 방문하여 구비한 서류 묶음 일체를 접수합니다. 서류 적법성과 신원 조회가 현장에서 이루어집니다.",
            "road-step5-tag": "5단계",
            "road-step5-title": "보건소 방문 및 영업신고 접수",
            "road-step6-cost": "비용: 면허세 1.8만 ~ 6.7만 원",
            "road-step6-desc": "서류가 적격할 경우 면허세 고지서를 세무 부서에 즉시 납부하면, 최종 영업신고증 정본을 즉시(3시간 이내) 현장 발급받으실 수 있습니다.",
            "road-step6-tag": "6단계",
            "road-step6-title": "등록면허세 납부 및 신고증 수령",
            "down-search-placeholder": "원하는 서식 이름을 입력해 보세요 (예: 신고서, 제조방법설명서, 위임장)...",
            "down-tag5": "수질 관리",
            "down-card5-title": "지하수 수질검사 신청서",
            "down-card5-desc": "상수도가 아닌 지하수를 조리용수로 사용 시 먹는 물 공인검사기관에 검사를 요청하는 법적 절차 안내 문서입니다.",
            "down-size5": "크기: 120 KB",
            "down-tag6": "명의 승계",
            "down-card6-title": "영업자 지위승계 신고서",
            "down-card6-desc": "기존에 운영되던 식품영업권을 다른 사람에게 양도양수(명의변경)할 때 작성하는 양식으로 포괄 승계 시 사용합니다.",
            "down-size6": "크기: 40 KB",
            "down-no-results": "검색 결과와 일치하는 서식이 존재하지 않습니다. 다른 검색어로 다시 검색해 주세요.",
            "loc-modal-bus-title": "🚌 대중교통 및 도로 안내",
            "loc-modal-bus-p1": "<strong>시외버스:</strong> **양구시외버스터미널** 하차 후 양구군청 방향 도보 15분 (약 900m)",
            "loc-modal-bus-p2": "<strong>차량 주차:</strong> 보건소 및 군청 주변 무료 공영 주차장 완비",
            "loc-tel1": "보건소 대표 위생 행정:",
            "loc-tel2": "예방접종 / 보건증 담당:",
            "loc-tel3": "양구군청 종합민원실:",
            "doc-detail-lbl-desc": "📋 서류 개요",
            "doc-detail-lbl-prep": "🔍 발급 절차 및 준비물",
            "doc-detail-lbl-fee": "💰 수수료 / 소요 비용",
            "doc-detail-lbl-location": "📍 발급 및 검진 기관",
            "doc-detail-lbl-duration": "⏱️ 발급 소요 시간",
            "footer-brand": "양구군보건소",
            "footer-slogan": "깨끗한 자연, 군민이 화합하는 강원 양구군",
            "footer-addr": "강원특별자치도 양구군 양구읍 관공서로 42 (양구군보건소 위생관리팀)",
            "footer-phone": "위생과 대표문의 : 033-480-2723 | 팩스 : 033-480-2525",
            "footer-links-title": "바로가기 서비스",
            "footer-lnk1": "식품안전나라 사이트",
            "footer-lnk2": "정부24 민원접수",
            "footer-lnk3": "양구군청 홈페이지",
            "footer-disclaimer-title": "⚠️ 법적 고지사항 (Disclaimer)",
            "footer-disclaimer-desc": "본 웹페이지의 자가진단 및 상세 가이드 정보는 양구군 식품 인허가 예비 창업주의 민원 편의를 위해 행정 조례를 가독성 높게 정리한 모의 안내서입니다. 점포 보수 공사 및 상가 계약 잔금 처리 전, 반드시 **양구군 보건소 위생관리팀 인허가 담당 실무자와 사전 대면 상담**을 거치셔야 돌발적인 법적 피해를 방지할 수 있습니다.",
            "footer-copyright": "&copy; 2026 Yanggu-gun Public Health Center. All Rights Reserved. Model page designed for startup helper.",
            "footer-wa": "웹 접근성 인증 마크 우회",
            "popup-title": "📢 중요 공지사항",
            "popup-text": "영업신고 전 담당자 유선통화 후 방문",
            "popup-subtext": "양구군보건소 위생관리팀 <a href=\"tel:0334802723\" class=\"notice-phone-link\">033-480-2723</a>",
            "popup-close-today": "오늘 하루 보지 않기",
            "popup-close": "닫기"
        },
        en: {
            "page-title": "Yanggu-gun Health Center | Food Business Declaration One-stop Center",
            "skip-nav-text": "Skip Navigation",
            "gov-home": "Yanggu-gun Office",
            "online-minwon": "Online Civil Service Desk",
            "logo-title": "Yanggu Health Center",
            "logo-subtitle": "Food Permit Support Center",
            "menu-wizard": "Diagnostic Wizard",
            "menu-guide": "Business Guides",
            "menu-roadmap": "Declaration Roadmap",
            "menu-downloads": "Forms Library",
            "menu-faq": "FAQ Check",
            "search-placeholder": "Search forms or keywords",
            "hero-tag": "Yanggu Startup Support Solution",
            "hero-title": "Preparing for a Food<br>Business in Yanggu?",
            "hero-desc": "We guide you through the documents and complex requirements for Instant Food Prep, General Restaurants, Rest Restaurants, and Food Manufacturing from the citizens' perspective.",
            "hero-btn-wizard": "Diagnose Required Documents",
            "hero-btn-guide": "View Business Guides",
            "slide1-tag": "Notice Zone",
            "slide1-title": "Mandatory Hygiene Education Notice",
            "slide1-desc": "Completing hygiene training prior to declaration is mandatory in Yanggu-gun. Check the designated education institute for your business type and prepare the certificate in advance.",
            "slide2-tag": "County News",
            "slide2-title": "Yanggu Restaurant Hygiene Grade Support",
            "slide2-desc": "Yanggu Health Center runs hygiene guidance inspections and food poisoning prevention programs to ensure a safe dining culture for residents and visitors.",
            "slide3-tag": "Important Permit",
            "slide3-title": "Verify Building Zoning Before Signing Lease",
            "slide3-desc": "Before signing a commercial lease deposit, consult with the Yanggu Health Center Hygiene Department to check if the store's building ledger zoning is fit for food businesses!",
            "slide-details": "Read Details &rarr;",
            "quick1-title": "All Documents at a Glance",
            "quick1-desc": "Click to view detailed guide popups",
            "quick2-title": "Average Processing Time",
            "quick2-desc": "Within 3 hours on the day of filing",
            "quick3-title": "Easy Health Card Issuance",
            "quick3-desc": "Walk-in screening at Yanggu Health Center",
            "quick4-title": "Direct Counseling Hotline",
            "quick4-desc": "Call Hygiene Team: +82-33-480-2723",
            "wiz-section-subtitle": "SMART WIZARD",
            "wiz-section-title": "Interactive Self-Diagnostic Wizard",
            "wiz-section-desc": "Answer a few simple questions to dynamically generate a checklist of required documents for submission to the Yanggu-gun Office.",
            "wiz-prog1": "Category",
            "wiz-prog2": "Premises",
            "wiz-prog3": "Infrastructure",
            "wiz-prog4": "Report Result",
            "wiz-q1": "Q1. What is the primary form of your food business?",
            "wiz-hint1": "Please select the card that fits best.",
            "badge-service": "Food Services",
            "badge-mfg": "Manufacturing",
            "wiz-opt1a-title": "Cooked Food & Alcoholic Beverages",
            "wiz-opt1a-desc": "Serve cooked dishes for dining-in, and sell alcoholic beverages (soju, beer, etc.). (General Restaurant, Korean BBQ, Izakaya, etc.)",
            "wiz-opt1b-title": "Desserts & Non-alcoholic Drinks",
            "wiz-opt1b-desc": "Sell coffee, tea, pastries, bread, ice cream, etc. No alcohol can be sold or consumed on-site. (Cafe, Bakery, Juice Bar, etc.)",
            "wiz-opt1c-title": "Retail Sales of Self-prepared Food",
            "wiz-opt1c-desc": "Prepare food (banchan, rice cakes, meal kits, jam) in the workshop and sell directly to consumers (both on-site or online courier). (Side-dish Shop, Rice-cake Shop, etc.)",
            "wiz-opt1d-title": "Wholesale B2B Distribution & Large Scale",
            "wiz-opt1d-desc": "Produce food in a manufacturing plant with proper machinery and distribute to other grocery marts, online wholesale networks, or retailers. (Food Manufacturing Factory)",
            "wiz-q3": "Q3. What are the infrastructure specifications of your business premises?",
            "wiz-hint3": "Select the applicable equipment/conditions. (Check all that apply)",
            "wiz-chk3a-title": "Use Liquefied Petroleum Gas (LPG) Cylinders",
            "wiz-chk3a-desc": "Use LPG tanks for kitchen cooking fuel instead of town gas (LNG) pipeline. (Requires LPG Inspection Certificate)",
            "wiz-chk3b-title": "Use Groundwater (Well Water) for Kitchen Supply",
            "wiz-chk3b-desc": "Supply natural well water instead of public tap water for cooking or drinking. (Requires Groundwater Potability Test Report)",
            "wiz-chk3c-title": "1st Floor Premises Exceeding 100㎡ in Area",
            "wiz-chk3c-desc": "The store is located on the first floor and its net exclusive area exceeds 100㎡. (Mandatory Disaster Liability Insurance)",
            "result-head": "Diagnostics Completed Successfully!",
            "result-list-title": "📋 Custom Required Documents Checklist",
            "result-list-notice": "* Click each document name or the [Details] button to view the preparation guide popup.",
            "result-zoning-title": "🏢 Building Ledger Zoning & Regulations",
            "result-fee-title": "Fees & Processing Time Guide",
            "result-col-period": "Processing Time",
            "result-col-fee": "Filing Fee",
            "result-val-fee": "28,000 KRW",
            "result-col-tax": "License Tax",
            "result-val-tax": "Charged based on area (approx. 18,000 to 67,500 KRW)",
            "result-btn-reset": "Restart Diagnostic Wizard",
            "result-btn-print": "Print / Save Result as PDF",
            "wiz-btn-prev": "Previous Step",
            "wiz-btn-next": "Next Step &rarr;",
            "guide-subtitle": "REGISTRATION GUIDE",
            "guide-title": "Registration Criteria by Business Type",
            "guide-desc": "Select a tab below to check definition, mandatory checklist documents, zoning criteria, and practical tips from the Health Center.",
            "tab1-title": "General Restaurant",
            "tab1-sub": "Meal & Alcohol Sales Allowed",
            "tab2-title": "Rest Restaurant",
            "tab2-sub": "Café, Bakery, Snacks",
            "tab3-title": "Instant Food Prep",
            "tab3-sub": "Banchan, Rice Cake, Retail",
            "tab4-title": "Food Manufacturing",
            "tab4-sub": "B2B Wholesale & Factory",
            "tab1-panel-title": "Food service license allowing cooked dining-in and alcoholic beverage sales.",
            "tab1-panel-desc": "Allows serving meals along with beer, soju, and other alcohol. Typical examples include Korean BBQ, Izakayas, Pubs, and traditional restaurants. (Click document names for detail popups.)",
            "tab-docs-title": "Mandatory Document Checklist",
            "doc-item-report": "Food Declaration Form",
            "btn-detail": "[Details]",
            "doc-item-report-desc": "Basic filing template available at Health Center (Fee: 28,000 KRW)",
            "doc-item-health": "Health Certificate (Health Card)",
            "doc-item-health-desc": "Mandatory hygiene check for representative and staff. Checks tuberculosis & typhoid (takes 5 days)",
            "doc-item-hygiene-desc-general": "Pre-training certificate from the <strong>Korea Food Service Association</strong>",
            "doc-item-hygiene-desc-rest": "Pre-training certificate from the <strong>Korea Rest Restaurant Association</strong>",
            "doc-item-hygiene-desc-instant": "Pre-training certificate from the <strong>Korea Food Industry Association</strong> (Instant Food Prep, 8 Hours)",
            "doc-item-hygiene-desc-factory": "Pre-training certificate from the <strong>Korea Food Industry Association</strong> (Food Manufacturing, 8 Hours)",
            "doc-item-lease": "Lease Agreement Copy",
            "doc-item-lease-desc": "Rental contract under the representative's legal name establishing occupancy",
            "tag-cond": "Conditional",
            "doc-item-fire": "Fire Safety Certificate",
            "doc-item-fire-desc": "Required for basements >= 66㎡ or upper floors >= 100㎡ (Issued by Fire Station)",
            "doc-item-lpg": "LPG Safety Certificate",
            "doc-item-lpg-desc": "Required if kitchen stoves are connected to LPG cylinders (Korea Gas Safety Corp)",
            "tab1-zoning-title": "General Restaurant Premises Requirements",
            "tab2-zoning-title": "Rest Restaurant Premises Requirements",
            "tab3-zoning-title": "Instant Food Prep Premises Requirements",
            "tab4-zoning-title": "Food Manufacturing Factory Registration Requirements",
            "tab-zoning-p1": "<strong>Building Ledger Zoning:</strong> Must be registered as <strong>Class 2 Neighborhood Commercial (Restaurant)</strong>. Otherwise, zoning code modification is required.",
            "tab-zoning-p2": "<strong>Illegal Modifications:</strong> If there are illegal extensions (e.g. unauthorized terrace cover, canopy), registration will be suspended until resolved.",
            "tab-zoning-p3": "<strong>Septic Tank Capacity:</strong> The building's total septic tank capacity must match the load of a restaurant. Pre-screened by the Hygiene Department.",
            "tab-tip-title": "💡 Yanggu Health Center Practical Tip",
            "tab-tip-desc": "\"If you are taking over an existing restaurant space, do not file a new permit. Use **License Succession ( 지위승계 )** instead. This inherits the old Fire Safety certificate automatically, saving money and inspections.\"",
            "tab2-panel-title": "Food service license for coffee, tea, confectionery, where alcohol consumption is strictly banned.",
            "tab2-panel-desc": "Bans all alcoholic beverage sales. Typical examples include coffee shops, dessert cafes, bakeries, school snack shops, and fast-food chains.",
            "tab2-zoning-p1": "<strong>Building Ledger Zoning:</strong> Must be registered as <strong>Class 1 or Class 2 Neighborhood Commercial (Rest Restaurant)</strong>.",
            "tab2-zoning-p2": "<strong>Unmanned Stores:</strong> Even robot cafes or unmanned meal kit stores without permanent staff must obtain a Rest Restaurant permit and mount the certificate.",
            "tab2-zoning-p3": "<strong>Groundwater test:</strong> If drawing well-water in remote mountain outskirts of Yanggu for espresso machine water, you must submit a drinking water test report.",
            "tab3-panel-title": "Retail production license for preparing foods sold strictly to final consumers.",
            "tab3-panel-desc": "Allows making banchan, kimchi, rice cakes, sesame oil, and selling on-site, online, or shipping via courier. B2B wholesale supply to other stores or marts is prohibited.",
            "doc-item-process": "Manufacturing Method Form",
            "doc-item-process-desc": "Filing template detailing food categories, ingredients weight ratios, and process flowchart",
            "tab3-zoning-p1": "<strong>Building Ledger Zoning:</strong> Must be registered as <strong>Class 1 or 2 Neighborhood Commercial or Retail building</strong>.",
            "tab3-zoning-p2": "<strong>Partitioning Workspace:</strong> The clean kitchen zone (manufacturing area) must be physically partitioned from the sales desk or public counter (via walls or glass).",
            "tab3-zoning-p3": "<strong>Self-Quality Testing:</strong> Depending on the food type (e.g. ready-to-eat foods), you must regularly inspect products for microbial pathogens.",
            "tab4-panel-title": "Standard food factory license for B2B mass manufacturing, wholesale, and mart distribution.",
            "tab4-panel-desc": "No distribution restrictions apply. However, it requires formal factory registration and is subject to extremely strict zoning and layout codes.",
            "doc-item-reg": "Food Registration Form",
            "doc-item-reg-desc": "A legal registration form instead of standard declaration. (Fee: 28,000 KRW)",
            "doc-item-prod": "Product Manufacture Report",
            "doc-item-prod-desc": "Mandatory online ingredient specification report filed via Food Safety Korea within 7 days of manufacturing",
            "tab4-zoning-p1": "<strong>Building Ledger Zoning:</strong> Must be registered as <strong>Factory ( 공장 )</strong> or <strong>Class 2 Neighborhood Commercial (Manufactory)</strong>. Banned in residential properties.",
            "tab4-zoning-p2": "<strong>Zoning Limits:</strong> Prohibited in exclusive residential areas, greenbelts, and water source protection zones under the Yanggu County building bylaws.",
            "tab4-zoning-p3": "<strong>Rigorous testing:</strong> Products must undergo regular sanitary testing by certified labs every 1 to 3 months, and records must be kept for auditing.",
            "tab4-tip-title": "⚠️ Onsite Factory Audit Warning",
            "tab4-tip-desc": "\"Food manufacturing factories will always undergo a physical inspection by hygiene officials. Raw material warehouses, processing halls, inner packing rooms, outer packaging areas, changing rooms, and sanitary entry locks must be completely separated. Get layout counseling first.\"",
            "road-desc": "We guide you through the administrative timeline from the first business concept to obtaining the official registration certificate.",
            "road-step1-tag": "Step 1",
            "road-step1-title": "Get Health Certificate",
            "road-step1-cost": "Cost: approx. 3,000 KRW",
            "road-step1-desc": "Required for all food handlers. Screen for tuberculosis and typhoid at Yanggu Health Center. Takes **5 business days** to issue.",
            "road-step2-tag": "Step 2",
            "road-step2-title": "Complete Hygiene Course",
            "road-step2-cost": "Cost: approx. 30,000 - 35,000 KRW",
            "road-step2-desc": "Take mandatory 6-8 hour online courses certified by designated associations and print the completion certificate in advance.",
            "road-step3-tag": "Step 3",
            "road-step3-title": "Lease Contract & Zoning Check",
            "road-step3-cost": "Cost: Real estate deposit/fees",
            "road-step3-desc": "Consult building ledger zoning codes and illegal structures status with Yanggu hygiene team before committing to lease contracts.",
            "road-step4-tag": "Step 4",
            "road-step4-title": "Fire & Gas Safety Inspections",
            "road-step4-cost": "Cost: Installation/Inspection fees",
            "road-step4-desc": "Apply for Fire Certificate for basement/upper floor stores. Get LPG safety approval for canister setups. Draw groundwater? Test potability.",
            "road-step5-tag": "Step 5",
            "road-step5-title": "Submit Forms at Health Center",
            "road-step5-cost": "Cost: 28,000 KRW",
            "road-step5-desc": "Visit the 1st floor Hygiene Desk of Yanggu Health Center with all required paperwork. Your background and code compliance are audited.",
            "road-step6-tag": "Step 6",
            "road-step6-title": "Pay Taxes & Collect License",
            "road-step6-cost": "Cost: Tax 18,000 - 67,500 KRW",
            "road-step6-desc": "Upon approval, pay the local license tax. The official permit document is issued immediately (within 3 hours on the day).",
            "down-subtitle": "DOWNLOAD CENTER",
            "down-title": "Standard Administrative Forms Archive",
            "down-desc": "Pre-fill the mandatory paperwork before visiting the Health Center. Use our real-time search tool below.",
            "down-search-placeholder": "Enter form name (e.g. declaration, method, delegation)...",
            "down-tag5": "Water Safety",
            "down-card5-title": "Groundwater Potability Test Request Form",
            "down-card5-desc": "A legal request form submitted to certified labs to check if well water is fit for public food services.",
            "down-size5": "Size: 120 KB",
            "down-tag6": "Permit Succession",
            "down-card6-title": "License Succession (Transfer) Form",
            "down-card6-desc": "Used when transferring the existing food business license from the former owner to a new owner.",
            "down-size6": "Size: 40 KB",
            "down-no-results": "No files match your query. Try searching for other keywords.",
            "loc-modal-bus-title": "🚌 Bus & Parking Guide",
            "loc-modal-bus-p1": "<strong>Intercity Bus:</strong> Get off at **Yanggu Intercity Bus Terminal**, walk 15 minutes towards County Office (approx. 900m).",
            "loc-modal-bus-p2": "<strong>Car Parking:</strong> Free public parking lots are available around the Health Center and County Office.",
            "loc-tel1": "Main Hygiene Administration:",
            "loc-tel2": "Vaccination / Health Card Desk:",
            "loc-tel3": "Yanggu County Civil Office:",
            "doc-detail-lbl-desc": "📋 Document Summary",
            "doc-detail-lbl-prep": "🔍 Steps & Requirements",
            "doc-detail-lbl-fee": "💰 Fee & Expenses",
            "doc-detail-lbl-location": "📍 Issuing Institutes",
            "doc-detail-lbl-duration": "⏱️ Time Required",
            "footer-brand": "Yanggu Health Center",
            "footer-slogan": "Clean Nature, United People, Yanggu-gun",
            "footer-addr": "42 Gwangongseo-ro, Yanggu-eup, Yanggu-gun, Gangwon-do (Hygiene Team)",
            "footer-phone": "Hygiene Hotline: +82-33-480-2723 | Fax: +82-33-480-2525",
            "footer-links-title": "Quick Services",
            "footer-lnk1": "Food Safety Korea",
            "footer-lnk2": "Gov24 Portal",
            "footer-lnk3": "Yanggu Office Home",
            "footer-disclaimer-title": "⚠️ Disclaimer Notice",
            "footer-disclaimer-desc": "The self-diagnostic checks and guides on this page are compiled from Yanggu building bylaws for convenience. Before signing lease contracts or beginning store renovations, please consult directly with the Yanggu Health Center Hygiene Team to prevent any legal or financial issues.",
            "footer-copyright": "&copy; 2026 Yanggu-gun Public Health Center. All Rights Reserved. Model page designed for startup helper.",
            "footer-wa": "Web Accessibility Waiver",
            "popup-title": "📢 Important Notice",
            "popup-text": "Please make a phone call to the officer before visiting for declaration.",
            "popup-subtext": "Hygiene Team, Yanggu Health Center: <a href=\"tel:0334802723\" class=\"notice-phone-link\">+82-33-480-2723</a>",
            "popup-close-today": "Do not show again today",
            "popup-close": "Close"
        }
    };

    const langToggleBtn = document.getElementById('lang-toggle-btn');

    // Apply translations on load
    applyLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        localStorage.setItem('lang', currentLang);
        applyLanguage(currentLang);
        
        showToast(currentLang === 'en' ? '🇺🇸 Language switched to English.' : '🇰🇷 한국어로 번역되었습니다.');
    });

    function applyLanguage(lang) {
        // Toggle language button text
        langToggleBtn.textContent = lang === 'ko' ? 'English' : '한국어';
        document.documentElement.lang = lang;

        // Loop elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Keep html tag configurations inside translation (like &rarr; or <br>)
                if (translations[lang][key].includes('&') || translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Loop placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Trigger updates for dynamic wizard buttons and outputs if results are displayed
        updateWizardButtons();
        if (wizardState.step === 'result') {
            generateDiagnosticResult();
        }
    }

    /* ==========================================================================
       Notice Popup Control
       ========================================================================== */
    const noticeModal = document.getElementById('notice-popup-modal');
    const noticeCloseBtn = document.getElementById('notice-close-btn');
    const todayCloseCheckbox = document.getElementById('today-close-checkbox');

    if (noticeModal && noticeCloseBtn && todayCloseCheckbox) {
        const hideNoticeUntil = localStorage.getItem('hideNoticeUntil');
        const now = new Date().getTime();

        if (!hideNoticeUntil || now > parseInt(hideNoticeUntil, 10)) {
            noticeModal.classList.add('active');
        } else {
            noticeModal.classList.remove('active');
        }

        noticeCloseBtn.addEventListener('click', () => {
            if (todayCloseCheckbox.checked) {
                // Calculate timestamp for 24 hours later (today close check)
                const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
                localStorage.setItem('hideNoticeUntil', expiryTime);
            }
            noticeModal.classList.remove('active');
        });
    }
});

