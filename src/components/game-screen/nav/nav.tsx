import styles from "./nav.module.scss";
import type { ReactElement } from "react";

export const GameScreenNav = (): ReactElement => {
  return (
    <div className={styles.nav}>
      <button className={styles.navButton}>
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-sentry-element="svg"
          data-sentry-component="BackIcon"
          data-sentry-source-file="BackIcon.tsx"
        >
          <path
            d="M24.2904 13.5026H2.70703M2.70703 13.5026L13.4987 24.2943M2.70703 13.5026L13.4987 2.71094"
            stroke="#1E1E1E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-sentry-element="path"
            data-sentry-source-file="BackIcon.tsx"
          ></path>
        </svg>
      </button>

      <div className={styles.navInfo}>
        <div className={styles.navInfoDate}>13 September, 2025</div>
        <div className={styles.navInfoAuthor}>By Chrystal Chea</div>
      </div>

      <div className={styles.navLogo}>
        <svg
          width="33"
          height="30"
          viewBox="0 0 406 406"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-sentry-element="svg"
          data-sentry-component="Logo"
          data-sentry-source-file="LogoWhiteShadow.tsx"
        >
          <g
            clip-path="url(#clip0_10114_10166)"
            data-sentry-element="g"
            data-sentry-source-file="LogoWhiteShadow.tsx"
          >
            <path
              d="M26.0078 56C26.0078 39.4315 39.4393 26 56.0078 26H376.008C392.576 26 406.008 39.4315 406.008 56V376C406.008 392.569 392.576 406 376.008 406H56.0078C39.4393 406 26.0078 392.569 26.0078 376V56Z"
              fill="white"
              data-sentry-element="path"
              data-sentry-source-file="LogoWhiteShadow.tsx"
            ></path>
            <path
              d="M0.0078125 30C0.0078125 13.4315 13.4393 0 30.0078 0H350.008C366.576 0 380.008 13.4315 380.008 30V350C380.008 366.569 366.576 380 350.008 380H30.0078C13.4393 380 0.0078125 366.569 0.0078125 350V30Z"
              fill="#F5D1FD"
              data-sentry-element="path"
              data-sentry-source-file="LogoWhiteShadow.tsx"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M350.008 28H30.0078C28.9032 28 28.0078 28.8954 28.0078 30V350C28.0078 351.105 28.9032 352 30.0078 352H350.008C351.112 352 352.008 351.105 352.008 350V30C352.008 28.8954 351.112 28 350.008 28ZM30.0078 0C13.4393 0 0.0078125 13.4315 0.0078125 30V350C0.0078125 366.569 13.4393 380 30.0078 380H350.008C366.576 380 380.008 366.569 380.008 350V30C380.008 13.4315 366.576 0 350.008 0H30.0078Z"
              fill="black"
              data-sentry-element="path"
              data-sentry-source-file="LogoWhiteShadow.tsx"
            ></path>
            <path
              d="M356.65 298.187C320.542 305.205 299.761 294.689 294.309 266.638C291.93 254.403 290.987 236.005 291.477 211.444C292.208 186.527 292.541 169.12 292.475 159.223C292.418 136.626 291.723 121.896 290.389 115.033C287.431 99.8136 280.282 93.3061 268.942 95.5103C261.481 96.9605 255.185 103.604 250.054 115.441C244.864 126.979 242.629 143.362 243.349 164.591L243.004 296.65L157.458 322.47L157.963 210.454C158.039 196.503 157.791 181.686 157.22 166.003C156.649 150.32 156.131 141.285 155.667 138.897C152.999 125.17 146.592 119.293 136.446 121.265C129.582 122.599 123.406 129.064 117.918 140.661C112.43 152.257 109.627 168.905 109.51 190.607L109.613 336.915L23.1713 363.008L24.0569 116.633L95.2791 93.4978L96.4574 140.187C101.084 122.564 109.892 108.929 122.882 99.2812C135.814 89.3349 153.47 82.1866 175.851 77.8362C188.683 75.3419 199.886 76.4161 209.459 81.0586C219.033 85.7011 226.149 92.8344 230.807 102.458C233.85 91.0279 241.207 81.0813 252.879 72.6187C264.791 63.7998 278.655 57.8531 294.471 54.7788C310.585 51.6465 322.87 51.1167 331.325 53.1896C340.02 54.906 347.306 58.1351 353.183 62.8768C363.27 71.7552 370.17 85.7436 373.882 104.842C377.537 123.642 379.135 153.372 378.676 194.03C378.211 213.941 378.674 227.477 380.066 234.639C381.401 241.503 384.413 246.646 389.105 250.07C394.095 253.436 399.632 254.837 405.716 254.274C404.704 265 399.556 274.362 390.272 282.36C381.286 290.301 370.078 295.576 356.65 298.187Z"
              fill="black"
              data-sentry-element="path"
              data-sentry-source-file="LogoWhiteShadow.tsx"
            ></path>
          </g>
          <defs
            data-sentry-element="defs"
            data-sentry-source-file="LogoWhiteShadow.tsx"
          >
            <clipPath
              id="clip0_10114_10166"
              data-sentry-element="clipPath"
              data-sentry-source-file="LogoWhiteShadow.tsx"
            >
              <rect
                width="406"
                height="406"
                fill="white"
                data-sentry-element="rect"
                data-sentry-source-file="LogoWhiteShadow.tsx"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};
