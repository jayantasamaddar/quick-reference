import * as React from "react";

const SvgChevronUpMinor = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M15 13a.997.997 0 0 1-.707-.293L10 8.414l-4.293 4.293a.999.999 0 1 1-1.414-1.414l5-5a.999.999 0 0 1 1.414 0l5 5A.999.999 0 0 1 15 13z"
      fill="currentColor"
    />
  </svg>
);

export default SvgChevronUpMinor;
