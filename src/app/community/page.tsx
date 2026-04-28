
import React from 'react';
import { Metadata } from 'next';
import CommunityContent from './CommunityContent';

export const metadata: Metadata = {
    title: '커뮤니티 & 후기 - 선수존 (호스트바선수·노래방알바·남성유흥알바·고소득 남성알바 꿀팁)',
    description: '선수존 커뮤니티 소통방. 호스트바·텐카페·남성선수 알바 생생한 후기와 야간알바 꿀팁을 공유하세요.',
    alternates: {
        canonical: 'https://www.sunsujone.kr/community',
    },
    openGraph: {
        title: '커뮤니티 & 후기 - 선수존',
        description: '선수들의 솔직한 알바 후기와 꿀팁, 고민상담. 익명 보장, 100% 리얼 후기.',
        url: 'https://www.sunsujone.kr/community',
        siteName: '선수존',
        type: 'website',
    },
};

export default function CommunityPage() {
    return <CommunityContent />;
}
