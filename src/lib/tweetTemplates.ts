/**
 * 트윗 템플릿 엔진 (선수존)
 */

import { buildHashtags, formatHashtags } from './snsHashtags';
import { slugify } from '@/utils/shopUtils';

const BASE_URL = 'https://www.sunsujone.kr';

// ─── TYPE_A: 신규 구인 공고 알림 ─────────────────────────────────────────────

export interface NewJobTweetData {
    shopId:    string | number;
    name:      string;
    region:    string;          
    regionSlug:string;          
    workType:  string;
    pay:       string | number;
    payType:   string;          
    conditions:string[];        
}

export function buildNewJobTweet(data: NewJobTweetData): string {
    const { shopId, name, regionSlug, workType, pay, payType, conditions } = data;

    const payDisplay = String(pay) === '면접후결정'
        ? '💬 면접 후 결정'
        : `💰 ${payType} ${Number(pay).toLocaleString()}원`;

    const condStr = conditions.slice(0, 2).join(' · ');
    const hashtags = formatHashtags(buildHashtags(regionSlug, workType));
    const url = `${BASE_URL}/coco/${encodeURIComponent(regionSlug)}/${shopId}`;

    const lines = [
        `🆕 ${workType} 신규 구인`,
        `📍 ${name}`,
        payDisplay,
        condStr ? `✅ ${condStr}` : '',
        '',
        `▶ 상세 보기 ${url}`,
        '',
        hashtags,
    ].filter(l => l !== undefined);

    return lines.join('\n');
}

// ─── TYPE_B: 지역 시세 정보 ───────────────────────────────────────────────────

export interface SalaryInfoTweetData {
    regionSlug:  string;
    regionName:  string;
    workType:    string;
    avgPay:      number;
    maxPay:      number;
    shopCount:   number;
    payType:     string;
}

export function buildSalaryInfoTweet(data: SalaryInfoTweetData): string {
    const { regionSlug, regionName, workType, avgPay, maxPay, shopCount, payType } = data;

    const hashtags = formatHashtags(buildHashtags(regionSlug, workType));
    const url = `${BASE_URL}/sunsu/${encodeURIComponent(regionSlug)}/${encodeURIComponent(workType)}`;

    const lines = [
        `📊 ${regionName} ${workType} 이번 주 시세`,
        ``,
        `평균 ${payType}: ${avgPay.toLocaleString()}원`,
        `최고 ${payType}: ${maxPay.toLocaleString()}원`,
        `구인 업소: ${shopCount}개`,
        ``,
        `💡 전체 보기 ${url}`,
        ``,
        hashtags,
    ];

    return lines.join('\n');
}

// ─── TYPE_C: 정보성 가이드 콘텐츠 ────────────────────────────────────────────

export interface GuideTweetData {
    workType:   string;
    regionSlug: string;
    regionName: string;
    tip:        string;   
    guideUrl?:  string;   
}

const GUIDE_TIPS: Record<string, string[]> = {
    '호스트바':    [
        '선수 면접 전 TC 단가와 방 갯수를 반드시 확인하세요',
        '초보자도 깔끔한 스타일과 매너만 있다면 도전 가능합니다',
        '지명 손님 관리가 고수입의 핵심입니다',
    ],
    '가라오케':    [
        '가라오케 선수는 밝은 에너지와 분위기 메이커 역할이 중요합니다',
        '단체 손님이 많을수록 수입이 안정적입니다',
    ],
    '클럽':  [
        '클럽 선수는 트렌디한 스타일이 중요하며 인맥이 자산입니다',
    ],
    '나이트':    [
        '나이트 선수는 영업력과 체력이 뒷받침되어야 합니다',
    ],
    '바':  [
        '바 선수는 차분한 대화 능력과 매너가 수입을 결정합니다',
    ],
};

export function buildGuideTweet(data: GuideTweetData): string {
    const { workType, regionSlug, regionName, guideUrl } = data;

    const tips   = GUIDE_TIPS[workType] ?? ['업소 면접 전 계약 조건을 반드시 확인하세요'];
    const dayIdx = new Date().getDate() % tips.length;
    const tip    = data.tip || tips[dayIdx];

    const hashtags = formatHashtags(buildHashtags(regionSlug, workType));
    const url      = guideUrl ?? `${BASE_URL}/sunsu/${encodeURIComponent(regionSlug)}/${encodeURIComponent(workType)}`;

    const lines = [
        `💡 ${regionName} ${workType} 꿀팁`,
        ``,
        tip,
        ``,
        `📖 ${workType} 가이드 전체 보기`,
        url,
        ``,
        hashtags,
    ];

    return lines.join('\n');
}

export type TweetType = 'new_job' | 'salary_info' | 'guide' | 'manual';

export function getTweetTypeByHour(): TweetType {
    const kstHour = (new Date().getUTCHours() + 9) % 24;
    if (kstHour >= 7  && kstHour < 10)  return 'salary_info';  
    if (kstHour >= 11 && kstHour < 14)  return 'new_job';      
    if (kstHour >= 17 && kstHour < 20)  return 'guide';        
    if (kstHour >= 21 && kstHour < 24)  return 'new_job';      
    return 'guide'; 
}

const REGION_ROTATION = [
    { slug: '서울-강남구',    name: '강남' },
    { slug: '부산-해운대구',  name: '해운대' },
    { slug: '대전-유성구',    name: '대전 유성' },
    { slug: '경기-수원시',    name: '수원' },
    { slug: '대구-수성구',    name: '대구 수성' },
    { slug: '광주-서구',      name: '광주 상무' },
    { slug: '서울-마포구',    name: '홍대' },
    { slug: '서울-영등포구',  name: '영등포' },
    { slug: '경기-성남시',    name: '분당·성남' },
    { slug: '부산-부산진구',  name: '서면' },
    { slug: '경기-부천시',    name: '부천' },
    { slug: '충남-천안시',    name: '천안' },
    { slug: '충북-청주시',    name: '청주' },
    { slug: '전북-전주시',    name: '전주' },
];

export function getTodayRegion(): { slug: string; name: string } {
    const dayOfWeek = new Date().getDay();
    return REGION_ROTATION[dayOfWeek % REGION_ROTATION.length];
}

const WORKTYPE_ROTATION = ['호스트바', '가라오케', '클럽', '나이트', '바', '기타'];

export function getTodayWorkType(): string {
    const dayOfMonth = new Date().getDate();
    return WORKTYPE_ROTATION[(dayOfMonth - 1) % WORKTYPE_ROTATION.length];
}
