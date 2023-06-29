export const BREAKPOINTS = {
  phoneMax: 700,
  tabletMax: 1200,
  LaptopMax: 1400,
};

export const QUERIES = {
  phone: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
  tabetAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.LaptopMax / 16}rem)`,
};
