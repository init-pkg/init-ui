import { safeJSONStringify } from "@/utils/stringify";
import React, {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  SwiperModule,
  SwiperOptions,
  Swiper as SwiperType,
} from "swiper/types";
import {
  swiperSlideStyles,
  swiperStyles,
  swiperWrapperStyles,
} from "./swiper.css";
import { useMounted } from "@/utils/isMounted";
import clsx from "clsx";

/**
 * @interface SwiperProps - props for Swiper component
 * @template T - type of data for swiper (ReactNode or object)
 */
export interface SwiperProps<T extends ReactNode | object = ReactNode> {
  options?: SwiperOptions;
  perView?: number | "auto";
  spaceBetween?: number;

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
   * @param swiperRef - a ref for swiper instance
   * @description provide here an object ref to get swiper instance upon initialization
   */
  swiperRef?: RefObject<SwiperType | undefined>;

  className?: string;
  wrapperClassName?: string;
  slideClassName?: string;

  /**
   * - modules for swiper
   * - built-in modules cannot be overridden
   * ```ts
   * [Navigation, Pagination, Autoplay] // Built-in modules
   * ```
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
 * @param swiperRef - a ref for swiper instance
 */

export function SwiperNext<T extends ReactNode | object = ReactNode>(
  props: SwiperProps<T>
) {
  const {
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
  } = props;

  const swiperElement = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  const { isClient } = useMounted();
  const [isMounted, setIsMounted] = useState(false);
  const isCompleted = isClient && isMounted;

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
  }, [safeJSONStringify(data)]);

  return (
    <>
      {!isCompleted && (
        <div className={clsx("swiper-fallback", swiperFallback)}>
          {swiperFallback}
        </div>
      )}

      <div
        ref={swiperElement}
        style={{ display: isCompleted ? "flex" : "none" }}
        className={clsx("swiper", swiperStyles, className)}
      >
        <div
          className={clsx(
            "swiper-wrapper",
            swiperWrapperStyles,
            wrapperClassName
          )}
        >
          {data.map((slide, index) => (
            <div
              key={index}
              className={clsx(
                "swiper-slide",
                swiperSlideStyles,
                slideClassName
              )}
            >
              {renderSlide(slide)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
