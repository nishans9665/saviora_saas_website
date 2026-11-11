"use client";

import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
}

export function CountryFlag({ code, className = "w-5 h-3.5" }: CountryFlagProps) {
  const norm = code.toUpperCase().trim();

  switch (norm) {
    case "US":
    case "USA":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="United States Flag">
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
          <path fill="#192f5d" d="M0 0h260v258H0z" />
          {/* Subtle stars pattern representation */}
          <circle cx="45" cy="40" r="10" fill="#fff" />
          <circle cx="95" cy="40" r="10" fill="#fff" />
          <circle cx="145" cy="40" r="10" fill="#fff" />
          <circle cx="195" cy="40" r="10" fill="#fff" />
          <circle cx="70" cy="85" r="10" fill="#fff" />
          <circle cx="120" cy="85" r="10" fill="#fff" />
          <circle cx="170" cy="85" r="10" fill="#fff" />
          <circle cx="45" cy="130" r="10" fill="#fff" />
          <circle cx="95" cy="130" r="10" fill="#fff" />
          <circle cx="145" cy="130" r="10" fill="#fff" />
          <circle cx="195" cy="130" r="10" fill="#fff" />
          <circle cx="70" cy="175" r="10" fill="#fff" />
          <circle cx="120" cy="175" r="10" fill="#fff" />
          <circle cx="170" cy="175" r="10" fill="#fff" />
          <circle cx="45" cy="220" r="10" fill="#fff" />
          <circle cx="95" cy="220" r="10" fill="#fff" />
          <circle cx="145" cy="220" r="10" fill="#fff" />
          <circle cx="195" cy="220" r="10" fill="#fff" />
        </svg>
      );

    case "GB":
    case "UK":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="United Kingdom Flag">
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path fill="#fff" d="m75 0 245 180L565 0h75v50L400 240l240 180v60h-75L320 300 75 480H0v-50l240-190L0 60V0z" />
          <path fill="#c8102e" d="m424 288 216 162v30h-38L382 318zm178-288L362 254l22 28L640 92V0zM196 162 0 15v35l176 132zm-28 30L0 342v58l216-162z" />
          <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
          <path fill="#c8102e" d="M266 0h108v480H266zM0 186h640v108H0z" />
        </svg>
      );

    case "AU":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Australia Flag">
          <path fill="#00008b" d="M0 0h640v480H0z" />
          {/* Canton UK */}
          <path fill="#012169" d="M0 0h320v240H0z" />
          <path fill="#fff" d="m37 0 123 90L283 0h37v25L200 120l120 90v30h-37L160 150 37 240H0v-25l120-95L0 30V0z" />
          <path fill="#c8102e" d="m212 144 108 81v15h-19L191 159zm89-144L181 127l11 14L320 46V0zM98 81 0 7v18l88 66zm-14 15L0 171v29l108-81z" />
          <path fill="#fff" d="M120 0h80v240h-80zM0 80h320v80H0z" />
          <path fill="#c8102e" d="M133 0h54v240h-54zM0 93h320v54H0z" />
          {/* Commonwealth Star */}
          <polygon fill="#fff" points="160,280 167,310 197,310 172,328 181,357 160,339 139,357 148,328 123,310 153,310" />
          {/* Southern Cross */}
          <polygon fill="#fff" points="480,100 484,115 500,115 487,125 491,140 480,130 469,140 473,125 460,115 476,115" />
          <polygon fill="#fff" points="560,180 564,195 580,195 567,205 571,220 560,210 549,220 553,205 540,195 556,195" />
          <polygon fill="#fff" points="480,360 484,375 500,375 487,385 491,400 480,390 469,400 473,385 460,375 476,375" />
          <polygon fill="#fff" points="420,240 424,255 440,255 427,265 431,280 420,270 409,280 413,265 400,255 416,255" />
          <polygon fill="#fff" points="505,270 508,280 520,280 510,287 513,298 505,291 497,298 500,287 490,280 502,280" />
        </svg>
      );

    case "CA":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Canada Flag">
          <path fill="#d80621" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          {/* Maple Leaf */}
          <path fill="#d80621" d="m320 80 18 54 44-24-12 50 50 14-46 36 28 46-52-4-8 56-22-38-22 38-8-56-52 4 28-46-46-36 50-14-12-50 44 24zm-6 248h12v72h-12z" />
        </svg>
      );

    case "IN":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="India Flag">
          <path fill="#f4c430" d="M0 0h640v160H0z" />
          <path fill="#fff" d="M0 160h640v160H0z" />
          <path fill="#228b22" d="M0 320h640v160H0z" />
          {/* Ashoka Chakra */}
          <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="8" />
          <circle cx="320" cy="240" r="15" fill="#000080" />
        </svg>
      );

    case "LK":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/Flag_of_Sri_Lanka.svg.webp"
          alt="Sri Lanka Flag"
          className={`${className.replace(/\bobject-cover\b/g, "")} object-fill inline-block`}
          loading="eager"
        />
      );

    case "SG":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Singapore Flag">
          <path fill="#ed2939" d="M0 0h640v240H0z" />
          <path fill="#fff" d="M0 240h640v240H0z" />
          {/* Crescent */}
          <path fill="#fff" d="M130 50a70 70 0 1 0 0 140 60 60 0 1 1 0-140z" />
          {/* 5 Stars */}
          <circle cx="160" cy="95" r="8" fill="#fff" />
          <circle cx="185" cy="115" r="8" fill="#fff" />
          <circle cx="175" cy="145" r="8" fill="#fff" />
          <circle cx="145" cy="145" r="8" fill="#fff" />
          <circle cx="135" cy="115" r="8" fill="#fff" />
        </svg>
      );

    case "AE":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="UAE Flag">
          <path fill="#00732f" d="M160 0h480v160H160z" />
          <path fill="#fff" d="M160 160h480v160H160z" />
          <path fill="#000" d="M160 320h480v160H160z" />
          <path fill="#f00" d="M0 0h160v480H0z" />
        </svg>
      );

    default:
      return (
        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
          {code}
        </span>
      );
  }
}
