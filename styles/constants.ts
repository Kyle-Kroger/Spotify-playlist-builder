export const BREAKPOINTS = {
  phoneMax: 600,
  tabletMax: 1100,
  LaptopMax: 1350,
};

export const QUERIES = {
  phone: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
  tabetAndDown: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.LaptopMax / 16}rem)`,
};
