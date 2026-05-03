/**
 * [단축 URL 리디렉터] /go/[slug]
 *
 * X(트위터) 등 SNS에서 한글 URL 인식 불가 문제 해결을 위한
 * 영문 단축 슬러그 → 한글 경로 리디렉트 시스템
 *
 * 사용법: sunsuzone.kr/go/gangnam-room → /sunsu/서울-강남구/호스트바선수
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── 슬러그 → 경로 매핑 테이블 ─────────────────────────────────────────────────

const SLUG_MAP: Record<string, string> = {

    // ── 서울 ──────────────────────────────────────────────────────────────────
    'gangnam-room':     '/sunsu/서울-강남구/호스트바선수',
    'gangnam-ten':      '/sunsu/서울-강남구/텐프로',
    'gangnam-tencafe':  '/sunsu/서울-강남구/텐카페',
    'gangnam-bar':      '/sunsu/서울-강남구/바알바',
    'gangnam-jjumoh':   '/sunsu/서울-강남구/쩜오알바',

    'hongdae-room':     '/sunsu/서울-마포구/호스트바선수',
    'hongdae-ten':      '/sunsu/서울-마포구/텐프로',
    'hongdae-bar':      '/sunsu/서울-마포구/바알바',

    'yeongdeungpo-room': '/sunsu/서울-영등포구/호스트바선수',
    'yeongdeungpo-ten':  '/sunsu/서울-영등포구/텐프로',

    'seoul-room':       '/sunsu/서울/호스트바선수',
    'seoul-ten':        '/sunsu/서울/텐프로',
    'seoul-bar':        '/sunsu/서울/바알바',
    'seoul-tencafe':    '/sunsu/서울/텐카페',
    'seoul-massage':    '/sunsu/서울/마사지',

    // ── 경기 ──────────────────────────────────────────────────────────────────
    'suwon-room':       '/sunsu/경기-수원시/호스트바선수',
    'suwon-ten':        '/sunsu/경기-수원시/텐프로',
    'suwon-bar':        '/sunsu/경기-수원시/바알바',
    'suwon-tencafe':    '/sunsu/경기-수원시/텐카페',

    'bundang-room':     '/sunsu/경기-성남시/호스트바선수',
    'bundang-ten':      '/sunsu/경기-성남시/텐프로',
    'bundang-bar':      '/sunsu/경기-성남시/바알바',

    'bucheon-room':     '/sunsu/경기-부천시/호스트바선수',
    'bucheon-ten':      '/sunsu/경기-부천시/텐프로',

    'gyeonggi-room':    '/sunsu/경기/호스트바선수',
    'gyeonggi-ten':     '/sunsu/경기/텐프로',
    'gyeonggi-bar':     '/sunsu/경기/바알바',

    // ── 인천 ──────────────────────────────────────────────────────────────────
    'incheon-room':     '/sunsu/인천/호스트바선수',
    'incheon-ten':      '/sunsu/인천/텐프로',
    'incheon-bar':      '/sunsu/인천/바알바',

    // ── 부산 ──────────────────────────────────────────────────────────────────
    'busan-room':       '/sunsu/부산/호스트바선수',
    'busan-ten':        '/sunsu/부산/텐프로',
    'busan-bar':        '/sunsu/부산/바알바',
    'busan-tencafe':    '/sunsu/부산/텐카페',

    'seomyeon-room':    '/sunsu/부산-부산진구/호스트바선수',
    'seomyeon-ten':     '/sunsu/부산-부산진구/텐프로',
    'seomyeon-bar':     '/sunsu/부산-부산진구/바알바',

    'haeundae-room':    '/sunsu/부산-해운대구/호스트바선수',
    'haeundae-ten':     '/sunsu/부산-해운대구/텐프로',

    // ── 대전 ──────────────────────────────────────────────────────────────────
    'daejeon-room':     '/sunsu/대전/호스트바선수',
    'daejeon-ten':      '/sunsu/대전/텐프로',
    'daejeon-bar':      '/sunsu/대전/바알바',

    'yuseong-room':     '/sunsu/대전-유성구/호스트바선수',
    'yuseong-ten':      '/sunsu/대전-유성구/텐프로',
    'yuseong-bar':      '/sunsu/대전-유성구/바알바',
    'yuseong-jjumoh':   '/sunsu/대전-유성구/쩜오알바',

    // ── 대구 ──────────────────────────────────────────────────────────────────
    'daegu-room':       '/sunsu/대구/호스트바선수',
    'daegu-ten':        '/sunsu/대구/텐프로',
    'daegu-bar':        '/sunsu/대구/바알바',

    'suseong-room':     '/sunsu/대구-수성구/호스트바선수',
    'suseong-ten':      '/sunsu/대구-수성구/텐프로',

    // ── 광주 ──────────────────────────────────────────────────────────────────
    'gwangju-room':     '/sunsu/광주/호스트바선수',
    'gwangju-ten':      '/sunsu/광주/텐프로',
    'gwangju-bar':      '/sunsu/광주/바알바',

    'sangmu-room':      '/sunsu/광주-서구/호스트바선수',
    'sangmu-ten':       '/sunsu/광주-서구/텐프로',
    'sangmu-bar':       '/sunsu/광주-서구/바알바',

    // ── 울산 ──────────────────────────────────────────────────────────────────
    'ulsan-room':       '/sunsu/울산/호스트바선수',
    'ulsan-ten':        '/sunsu/울산/텐프로',
    'ulsan-bar':        '/sunsu/울산/바알바',

    // ── 충청 ──────────────────────────────────────────────────────────────────
    'cheonan-room':     '/sunsu/충남-천안시/호스트바선수',
    'cheonan-ten':      '/sunsu/충남-천안시/텐프로',
    'cheonan-bar':      '/sunsu/충남-천안시/바알바',

    'cheongju-room':    '/sunsu/충북-청주시/호스트바선수',
    'cheongju-ten':     '/sunsu/충북-청주시/텐프로',

    // ── 전라 ──────────────────────────────────────────────────────────────────
    'jeonju-room':      '/sunsu/전북-전주시/호스트바선수',
    'jeonju-ten':       '/sunsu/전북-전주시/텐프로',
    'jeonju-bar':       '/sunsu/전북-전주시/바알바',

    // ── 전국 / 공통 ────────────────────────────────────────────────────────────
    'room':             '/sunsu/서울/호스트바선수',
    'ten':              '/sunsu/서울/텐프로',
    'bar':              '/sunsu/서울/바알바',
    'tencafe':          '/sunsu/서울/텐카페',
    'massage':          '/sunsu/서울/마사지',
    'jjumoh':           '/sunsu/서울/쩜오알바',
    'karaoke':          '/sunsu/서울/노래주점',
};

// ─── 리디렉터 ────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug: rawSlug } = await params;
    const slug = rawSlug?.toLowerCase().trim();
    const target = SLUG_MAP[slug];

    if (!target) {
        // 매핑 없으면 메인 페이지로
        return NextResponse.redirect(new URL('/', 'https://www.sunsuzone.kr'), 302);
    }

    return NextResponse.redirect(
        new URL(target, 'https://www.sunsuzone.kr'),
        { status: 301 } // 영구 리디렉트 (SEO 주스 전달)
    );
}
