import shadowSEO from '@/lib/data/Shadow_SEO_Master.json';
import { isPreRelease } from '@/lib/config';

const decodeB64 = (str: string) => {
    try {
        return Buffer.from(str, 'base64').toString('utf8');
    } catch (e) {
        return str;
    }
};

export type SEOMode = 'CLEAN' | 'SHADOW';

export const CURRENT_SEO_MODE: SEOMode = isPreRelease ? 'CLEAN' : 'SHADOW';

export interface SEOConfig {
  theme: {
      colorScheme: string;
      supportedColorSchemes: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords?: string[];
    verification?: {
      google?: string;
      other?: {
        'naver-site-verification'?: string[];
      };
    };
    other?: {
        [key: string]: string | number | (string | number)[];
    };
  };
  schemas: any[]; // JSON-LD Schemas
}

const BASE_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SUNSUJONE (선수존)",
  "url": "https://sunsujone.kr",
  "logo": "https://sunsujone.kr/logo.png",
  "sameAs": [
      "https://www.facebook.com/sunsujone",
      "https://www.instagram.com/sunsujone"
  ],
  "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-1877-1442",
      "contactType": "customer service",
      "areaServed": "KR",
      "availableLanguage": "Korean"
  }
};

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "선수존은 어떤 플랫폼인가요?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "선수존은 주로 호스트바 선수 및 남성 구직자들을 대상으로 유흥 및 고소득 아르바이트 구인구직 정보를 제공하는 온라인 플랫폼입니다. 호스트바선수, 선수알바, 호빠알바, 남성유흥알바 등 다양한 업종의 채용 공고와 급여, 근무 환경 정보를 제공하며, 업계 종사 선수들이 정보를 공유하고 소통하는 커뮤니티 공간도 운영합니다."
            }
        },
        {
            "@type": "Question",
            "name": "선수존의 주요 서비스는 무엇인가요?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "선수존은 세 가지 핵심 서비스를 제공합니다. 첫째, 업종별 구인 정보로 호스트바, 가라오케, 클럽 등 남성 구직자 대상 다양한 업종의 공고를 확인할 수 있습니다. 둘째, 지역별 정보로 전국 단위의 지역별 선수 알바 정보를 제공합니다. 셋째, 커뮤니티 기능으로 업계 선수들이 익명으로 정보를 공유하고 고민을 나눌 수 있는 공간을 운영합니다."
            }
        },
        {
            "@type": "Question",
            "name": "선수존 이용 시 주의사항은 무엇인가요?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "선수존은 사업자 등록이 완료된 검증된 업체만 공고를 등록할 수 있으나, 실제 면접이나 근무 시 안전 여부는 개인이 꼼꼼히 확인해야 합니다. 면접 전 과도한 개인정보를 요구하거나 선입금을 요구하는 곳은 피하시기 바랍니다."
            }
        },
        {
            "@type": "Question",
            "name": "선수존 커뮤니티는 어떻게 운영되나요?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "선수존 커뮤니티는 해당 업계에 종사하는 선수들이 실제 근무 후기, 업계 정보, 고민 등을 자유롭게 나누는 공간입니다. 이용자들의 익명성을 최우선으로 보장하며 안전하게 정보를 공유할 수 있습니다."
            }
        }
    ]
};

const CLEAN_LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "선수존(SUNSUJONE) - 호스트바선수 선수알바 호빠알바 1등 플랫폼",
    "description": "지역 내 검증된 고소득 일자리와 구직자를 안전하게 연결하는 대한민국 대표 선수 전용 채용 플랫폼입니다. 호스트바, 가라오케, 클럽 정보를 실시간 제공합니다.",
    "url": "https://sunsujone.kr",
    "image": "https://sunsujone.kr/logo.png"
};

const CLEAN_SEO: SEOConfig = {
  theme: {
    colorScheme: 'light',
    supportedColorSchemes: 'light',
  },
  metadata: {
    title: "호스트바선수·선수알바·호빠알바·남성유흥알바 1위 선수존",
    description: "선수존은 호스트바선수, 선수알바, 호빠알바, 남성유흥알바, 가라오케선수 구인정보 1위 플랫폼입니다. 검증된 업체, 당일지급 100% 보장.",
    keywords: ["호스트바선수", "선수알바", "호빠알바", "남성유흥알바", "가라오케선수", "남성알바", "야간알바", "고수익알바", "당일지급알바"],
    verification: {
        google: 'enzbVhzoI9Bq9YzGqFaLghzkqVlFHwe-DBnnNajWC0Y',
        other: {
            'naver-site-verification': ['950201bcd2e28188884dfc9feeb6951a40c0887c'],
        },
    },
  },
  schemas: [BASE_ORGANIZATION_SCHEMA, CLEAN_LOCAL_BUSINESS_SCHEMA, FAQ_SCHEMA]
};

const getShadowSEO = (): SEOConfig => ({
  theme: {
    colorScheme: shadowSEO?.themes?.colorScheme || 'light',
    supportedColorSchemes: shadowSEO?.themes?.supportedColorSchemes || 'light',
  },
  metadata: {
    title: shadowSEO?.metadata?.title || '선수존',
    description: shadowSEO?.metadata?.description || '선수알바 No.1 플랫폼',
    keywords: shadowSEO?.metadata?.keywords || [],
    verification: shadowSEO?.metadata?.verification,
  },
  schemas: [
    {
        ...BASE_ORGANIZATION_SCHEMA,
        name: "SUNSUJONE (선수존)",
    },
    ...(Array.isArray(shadowSEO?.schemas) ? shadowSEO.schemas : []),
  ]
});

export const getCurrentSEO = (): SEOConfig => {
  if (CURRENT_SEO_MODE === 'SHADOW') {
      return getShadowSEO();
  }
  return CLEAN_SEO;
};
