// // analytics.
import ReactGAImplementation from 'react-ga4';


let isInitialized = false;

export const initGA = () => {
  if (!isInitialized) {
    ReactGAImplementation.initialize("G-WBLBS18RCH");
    isInitialized = true;
  }
};

export const trackPageview = (path) => {
  ReactGAImplementation.send({ hitType: "pageview", page: path });
};
