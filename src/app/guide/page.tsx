import React from 'react';
import { Metadata } from 'next';
import GuideClient from './GuideClient';

export const metadata: Metadata = {
    title: '이용가이드 - 선수존 (호스트바선수·노래방알바·남성유흥알바 초보 가이드)',
    description: '남성알바 구인구직 1위 선수존 이용 방법. 호스트바선수, 노래방알바, 남성유흥알바를 안전하고 현명하게 구하는 팁과 고객센터 이용 안내.',
    keywords: ['선수존가이드', '남성유흥알바가이드', '야간알바꿀팁', '초보알바가이드', '노래방알바팁', '호스트바선수팁'],
    alternates: {
        canonical: 'https://www.sunsuzone.kr/guide',
    },
    openGraph: {
        title: '이용가이드 - 선수존',
        description: '남성알바 성공을 위한 첫걸음, 선수존 이용 가이드를 확인해보세요.',
        url: 'https://www.sunsuzone.kr/guide',
        siteName: '선수존',
        images: [{ url: 'https://www.sunsuzone.kr/og-image.jpg', width: 1200, height: 630 }],
        type: 'website',
    },
};

export default function GuidePage() {
    return <GuideClient />;
}
