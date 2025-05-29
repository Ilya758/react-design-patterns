import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

(function () {
  const l = window.location;
  const searchPattern = /^\/\?\//;
  if (searchPattern.test(l.search)) {
    let fullPathWithQueryHash = l.search.substring(3);
    let pathOnly = '';
    let query = '';
    let hash = l.hash;

    if (fullPathWithQueryHash.includes('#')) {
      const parts = fullPathWithQueryHash.split('#');
      fullPathWithQueryHash = parts[0];
      hash = '#' + parts.slice(1).join('#');
    }

    const queryStartIndex = fullPathWithQueryHash.indexOf('?');
    if (queryStartIndex > -1) {
      pathOnly = '/' + fullPathWithQueryHash.substring(0, queryStartIndex);
      query = '?' + fullPathWithQueryHash.substring(queryStartIndex + 1).replace(/~and~/g, '&');
    } else {
      pathOnly = '/' + fullPathWithQueryHash;
    }

    let reconstructedPath = l.pathname;
    if (pathOnly && pathOnly !== '/') {
      if (reconstructedPath.endsWith('/') && pathOnly.startsWith('/')) {
        reconstructedPath += pathOnly.substring(1);
      } else if (!reconstructedPath.endsWith('/') && !pathOnly.startsWith('/')) {
        reconstructedPath += '/' + pathOnly;
      } else {
        reconstructedPath += pathOnly;
      }
    } else if (pathOnly === '/' && !reconstructedPath.endsWith('/')) {
      reconstructedPath += '/';
    }

    const finalUrl = reconstructedPath.replace(/\/\/+$/, '/') + query + hash;

    if (l.href !== l.origin + finalUrl) {
      history.replaceState(null, '', finalUrl);
    }
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

