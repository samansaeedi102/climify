const breakpoints = {
  xsm: "576px",
  sm: "768px",
  md: "990px",
  lg: "1200px",
  xl: "1280px",
  xl2: "1536px",
};

const mediaRules = {
  xsm: `@media (min-width: ${breakpoints.xsm})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  xl2: `@media (min-width: ${breakpoints.xl2})`,
};

export { breakpoints, mediaRules };
