/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const THEME = {
  primary: "#001529", // Deep Navy
  secondary: "#050A30", // Darker Navy
  accent: "#FFFFFF", // White
  text: "#FFFFFF",
  muted: "rgba(255, 255, 255, 0.6)",
  border: "rgba(255, 255, 255, 0.1)",
  fontSans: "'Inter', sans-serif",
};

export const SITE_CONFIG = {
  name: "MONEY LEAGUE",
  kakaoUrl: "https://open.kakao.com/o/glBaXr9h",
  youtubeUrl: "https://youtube.com/@example",
  instagramUrl: "https://instagram.com/example",
};

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "공지" | "뉴스" | "가이드";
}

export interface LeagueInfo {
  rules: string[];
  prizeMoney: string;
  joinMethod: string;
}

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "제1회 MONEY LEAGUE 개최 안내",
    content: "드디어 제1회 머니 리그가 개최됩니다! 총 상금 100만 원과 함께 펼쳐지는 최고의 FC MOBILE 대전에 참여하세요. 참가 신청은 4월 30일까지 가능합니다.",
    date: "2026-04-22",
    category: "공지",
  },
  {
    id: "2",
    title: "FC MOBILE 최신 전술 가이드",
    content: "최근 메타에서 가장 강력한 4-3-3 홀딩 전술에 대해 알아봅니다. 수비 안정성과 역습의 키 포인트를 확인하세요.",
    date: "2026-04-20",
    category: "가이드",
  },
  {
    id: "3",
    title: "상반기 리그 일정 업데이트",
    content: "5월부터 8월까지 진행되는 상반기 리그 전체 일정을 공개합니다. 매주 주말 펼쳐지는 명경기를 놓치지 마세요.",
    date: "2026-04-18",
    category: "뉴스",
  },
];

export const INITIAL_LEAGUE_INFO: LeagueInfo = {
  rules: [
    "모든 경기는 FC MOBILE을 이용하여 조별, 토너먼트를 진행한다.",
    "네트워크 환경으로 인한 튕김은 협의 후 재경기를 진행한다.",
    "비매너 행위(볼돌,무한임티 등)는 적발 시 즉각 탈락 처리 한다.",
    "대회 세부적인 안내는 추후 조별 리그 오픈톡방에서 안내/확인 한다.",
  ],
  prizeMoney: "NEXON 지원+후원금 추후 대표자방에 공지",
  joinMethod: "MONEY LEAGUE 카카오 오픈톡으로 신청하세요",
};
