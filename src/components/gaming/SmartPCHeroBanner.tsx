import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SmartPCHeroBannerProps {
  onExploreGames?: () => void;
  onOpenTournament?: () => void;
  onOpenCashout?: () => void;
}

const SLIDES = [
  {
    id: "slide-1",
    banners: [
      {
        id: "sbn2",
        src: "/assets/banner/sbn2.png",
        alt: "Betwise Smart PC Special 1",
      },
      {
        id: "sbn3",
        src: "/assets/banner/sbn3.png",
        alt: "Betwise Smart PC Special 2",
      },
    ],
  },
  {
    id: "slide-2",
    banners: [
      {
        id: "sbn6",
        src: "/assets/banner/sbn6.png",
        alt: "Betwise Smart PC Special 3",
      },
      {
        id: "sbn11",
        src: "/assets/banner/sbn11.png",
        alt: "Betwise Smart PC Special 4",
      },
    ],
  },
];

export const SmartPCHeroBanner: React.FC<SmartPCHeroBannerProps> = ({
  onOpenTournament,
  onExploreGames,
}) => {
  return (
    <div className="smartpc-hero-wrapper mb-3 mb-md-4">
      <div className="smartpc-hero-frame">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".smartpc-hero-pagination",
            bulletClass: "smartpc-hero-bullet",
            bulletActiveClass: "smartpc-hero-bullet-active",
          }}
          navigation={{
            prevEl: ".smartpc-hero-btn-prev",
            nextEl: ".smartpc-hero-btn-next",
          }}
          loop={true}
          speed={600}
          className="smartpc-hero-swiper"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="row g-2 g-md-3 px-1">
                {slide.banners.map((banner, bIdx) => (
                  <div key={banner.id} className="col-6">
                    <div
                      className="smartpc-dual-banner-card"
                      onClick={() => {
                        if (bIdx === 0 && onOpenTournament) {
                          onOpenTournament();
                        } else if (onExploreGames) {
                          onExploreGames();
                        }
                      }}
                    >
                      <img
                        src={banner.src}
                        alt={banner.alt}
                        className="smartpc-banner-img"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Controls */}
        <button
          type="button"
          className="smartpc-hero-btn smartpc-hero-btn-prev"
          aria-label="Previous Banner"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          type="button"
          className="smartpc-hero-btn smartpc-hero-btn-next"
          aria-label="Next Banner"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Pagination Dots */}
        <div className="smartpc-hero-pagination"></div>
      </div>
    </div>
  );
};
