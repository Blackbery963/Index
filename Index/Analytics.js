// analytics.js
import ReactGA from 'react-ga4';

ReactGA.initialize("G-WBLBS18RCH"); // Your GA4 Measurement ID

export const trackPageview = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
