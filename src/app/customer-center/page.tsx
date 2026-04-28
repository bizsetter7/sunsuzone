import React from 'react';
import { Metadata } from 'next';
import CustomerCenterClient from './CustomerCenterClient';

export const metadata: Metadata = {
    title: '고객센터 - 선수존 (공지사항·FAQ·1:1문의)',
    description: '선수존 고객센터입니다. 공지사항, 자주 묻는 질문(FAQ), 1:1 문의를 통해 궁금한 점을 해결해 드립니다. 호스트바선수·노래방알바·남성유흥알바 정보 No.1 선수존.',
    keywords: ['선수존고객센터', '야간알바고객센터', '남성유흥알바문의', '공지사항', 'FAQ', '1:1문의'],
    alternates: {
        canonical: 'https://www.sunsuzone.kr/customer-center',
    },
    openGraph: {
        title: '고객센터 - 선수존',
        description: '도움이 필요하신가요? 선수존 고객센터에서 친절하게 안내해 드립니다.',
        url: 'https://www.sunsuzone.kr/customer-center',
        siteName: '선수존',
        images: [{ url: 'https://www.sunsuzone.kr/og-image.jpg', width: 1200, height: 630 }],
        type: 'website',
    },
};

export default function CustomerCenterPage() {
    return <CustomerCenterClient />;
}
