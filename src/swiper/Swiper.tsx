"use client";

import React from "react";
import { cn } from "@/inner/cn";
import "@/swiper/swiper.scss";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  SwiperModule,
  SwiperOptions,
  Swiper as SwiperType,
} from "swiper/types";

export interface SwiperProps<T extends object> {
  options?: SwiperOptions;
  perView?: number | "auto";
  spaceBetween?: number;
  children?: ReactNode | ReactNode[];

  /**
   * @description data for swiper
   */
  data: T[];

  /**
   * @description function that will be called to render each slide
   * @param slide - current slide data
   * @returns ReactNode
   */
  renderSlide: (slide: T) => ReactNode;

  /**
   * @param swiperRef - a ef for swiper instance
   * - provide here an object ref to tet swiper instance upon initialization
   */
  swiperRef?: RefObject<SwiperType | undefined>;

  className?: string;
  wrapperClassName?: string;
  slideClassName?: string;

  /**
   * @description modules for swiper
   */
  modules?: SwiperModule[];

  /**
   * @function onSlideChange
   * @description callback that will be called when slide is changed
   * @param slide - acutal slide number
   * @param swiper - swiper instance
   */

  onSlideChange?: (slide: number, swiper: SwiperType) => void;

  /**
   * @function onInit
   * @description Callback-функция, которая будет вызвана при инициализации Swiper.
   * @param swiper - swiper instance
   */

  onInit?: (swiper: SwiperType) => void;

  /**
   * @description fallback content that will be shown until swiper is mounted
   */
  swiperFallback?: ReactNode;
}

/**
 *
 * @see {@link https://swiperjs.com/ | Swiper JS} for more info about swiper js
 * @param options - swiper options
 * @param modules - swiper modules, default modules are `[Navigation, Pagination, Autoplay]`
 * @param data - provide there an array of data for swiper
 * @param renderSlide - function that will be called to render each slide
 * @param className - className for swiper
 * @param perView - number of slides per view
 * @param spaceBetween - space between slides
 * @param swiperRef - a ef for swiper instance
 */

export function SwiperNext<T extends object>({
  options,
  data,
  renderSlide,
  className,
  perView,
  spaceBetween,
  onSlideChange,
  onInit,
  wrapperClassName,
  slideClassName,
  modules = [],
  swiperFallback,
  swiperRef: externalRef,
}: SwiperProps<T>) {
  const swiperElement = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!swiperElement.current) return;

    const defaultOptions: SwiperOptions = {
      modules: [Navigation, Pagination, Autoplay, ...modules],

      slidesPerView: perView || 1,

      spaceBetween: spaceBetween || 0,

      ...options,
    };

    defaultOptions.on = {
      slideChange(swiper) {
        onSlideChange?.(swiper.realIndex, swiper);
      },
      init(swiper) {
        setIsMounted(true);
        onInit?.(swiper);
        if (externalRef) externalRef.current = swiper;
      },
      ...defaultOptions.on,
    };

    const swiper = new Swiper(swiperElement.current, defaultOptions);
    swiperRef.current = swiper;

    return () => {
      swiper.destroy();
    };
  }, [JSON.stringify(data)]);

  return (
    <>
      {!isMounted && swiperFallback}
      <div
        ref={swiperElement}
        className={cn("swiper", className, {
          "swiper-hidden": swiperFallback && !isMounted,
        })}
      >
        <div className={cn("swiper-wrapper", wrapperClassName)}>
          {data.map((slide, index) => (
            <div
              key={index}
              className={cn("swiper-slide", slideClassName)}
            >
              {renderSlide(slide)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
