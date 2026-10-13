# 나두삼국지 (Nadoo Three Kingdoms)

정사(진수 『삼국지』)와 소설(『삼국지연의』)을 장면마다 견주는 한국어 삼국지 안내 사이트. Next.js 15 SSG.

- 시대 8 · 사건 · 인물 · 세력도 · 가계도(TreePanel) · 지도(SVG) · 한반도 연결 · 사자성어 · 교훈 · 명대사 · 계책 · AI 그림 · 영화·드라마 · 퀴즈
- 표시: «정사», «소설 각색», «전해지는 이야기»
- 방문자 수: abacus `nadoo-samguk/visits`, 운영 도메인 외·봇·webdriver는 조회만
- AI 그림: `public/illustrations/<slug>.webp`에 두고 `data/gallery.ts`의 `image`를 채웁니다.

```bash
npm ci && npm run build
```
