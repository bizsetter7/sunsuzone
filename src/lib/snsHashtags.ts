/**
 * SNS 해시태그 엔진 (선수존)
 */

// ─── 지역별 해시태그 ───────────────────────────────────────────────────────────

export const REGION_HASHTAGS: Record<string, string[]> = {
    '서울':                  ['서울선수', '서울호빠'],
    '서울-강남구':            ['강남선수', '강남호빠'],
    '서울-마포구':            ['홍대선수', '홍대호빠'],
    '경기-수원시':            ['수원선수', '인계동선수'],
    '부산':                  ['부산선수', '서면선수'],
    '대전':                  ['대전선수', '유성선수'],
    '대구':                  ['대구선수', '대구호빠'],
    '인천':                  ['인천선수', '부평호빠'],
};

// ─── 업종별 해시태그 ───────────────────────────────────────────────────────────

export const WORKTYPE_HASHTAGS: Record<string, string[]> = {
    '호스트바':  ['호스트바선수', '호빠선수'],
    '가라오케':  ['가라오케선수', '선수알바'],
    '클럽':      ['클럽선수', '박스구인'],
    '나이트':    ['나이트선수', '나이트부킹'],
    '바':        ['바선수', '바텐더'],
    '기타':      ['남성알바', '선수알바'],
};

// ─── 세부 지역 약칭 매핑 ───────────────────────────────────────────────────

export const REGION_SHORT_NAME: Record<string, string> = {
    '서울-강남구':    '강남',
    '서울-서초구':    '서초',
    '서울-마포구':    '홍대',
    '서울-영등포구':  '영등포',
    '서울-용산구':    '이태원',
    '경기-수원시':    '수원',
    '경기-성남시':    '분당',
    '부산-해운대구':  '해운대',
    '부산-부산진구':  '서면',
    '대전-유성구':    '유성',
};

// ─── 공통 브랜드 해시태그 ────────────────────────────────────────────────────

export const BRAND_HASHTAGS = ['선수존', '선수알바', '남성알바', '호빠알바'];

// ─── 해시태그 생성기 ──────────────────────────────────────────────────────────

export function buildHashtags(regionSlug: string, workType: string): string[] {
    const shortName    = REGION_SHORT_NAME[regionSlug];                              
    const mainRegion   = regionSlug.split('-')[0];                                   
    const regionTags   = REGION_HASHTAGS[regionSlug] ?? REGION_HASHTAGS[mainRegion] ?? [];
    const worktypeTags = WORKTYPE_HASHTAGS[workType] ?? [];

    const detailTag = shortName && workType ? `${shortName}${workType}` : null;
    const broadTag  = mainRegion && workType && mainRegion !== shortName
        ? `${mainRegion}${workType}`
        : null;

    const all = [
        detailTag,          
        broadTag,           
        regionTags[0],      
        worktypeTags[0],    
        ...BRAND_HASHTAGS,  
    ].filter((t): t is string => !!t);

    return [...new Set(all)].slice(0, 5);
}

export function formatHashtags(tags: string[]): string {
    return tags.map(t => `#${t}`).join(' ');
}
