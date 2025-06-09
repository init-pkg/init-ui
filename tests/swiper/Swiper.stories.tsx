import React from "react";
import { SwiperNext } from "@/swiper";
import { Meta, StoryObj } from "@storybook/react/*";
import "./swiper-story.scss";
import clsx from "clsx";

const swiperData = [
  {
    id: 1,
    title: "Beautiful Mountain",
    description: "Experience breathtaking mountain views",
    theme: "mountain",
    icon: "🏔️",
  },
  {
    id: 2,
    title: "Ocean Paradise",
    description: "Dive into crystal clear waters",
    theme: "ocean",
    icon: "🌊",
  },
  {
    id: 3,
    title: "City Lights",
    description: "Explore vibrant urban landscapes",
    theme: "city",
    icon: "🏙️",
  },
  {
    id: 4,
    title: "Forest Adventure",
    description: "Discover nature's hidden secrets",
    theme: "forest",
    icon: "🌲",
  },
];

type SwiperType = typeof SwiperNext<(typeof swiperData)[number]>;

const meta: Meta<SwiperType> = {
  title: "Swiper",
  component: SwiperNext,
  args: {
    data: swiperData,
    spaceBetween: 20,
    perView: 1,
    className: "swiper-story",
    swiperFallback: <div className="fallback-block" />,
    slideClassName: "swiper-story-slide",
    renderSlide: (item) => (
      <div className={clsx("slide-content", item.theme)}>
        <div className="slide-icon">{item.icon}</div>
        <h3 className="slide-title">{item.title}</h3>
        <p className="slide-description">{item.description}</p>
      </div>
    ),
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    perView: 1,
    spaceBetween: 20,
  },
};

export const MultipleSlides: Story = {
  args: {
    perView: 2,
    spaceBetween: 15,
    className: "swiper-story multiple-slides",
  },
};

export const AutoSlide: Story = {
  args: {
    options: {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    },
  },
};

export default meta;
