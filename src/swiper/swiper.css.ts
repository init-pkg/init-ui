import { css } from "@emotion/css";

export const swiperStyles = css`
  overflow: hidden;
  position: relative;
`;

export const swiperWrapperStyles = css`
  display: flex;
`;

export const swiperSlideStyles = css`
  flex-shrink: 0;
`;

export const swiperFallback = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;
