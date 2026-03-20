export function createMediaQueryList(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
}

export function createBodyElement(): HTMLElement {
  const body = document.createElement('body');
  body.style.setProperty('--primary-color', '#ff0000');
  document.body.appendChild(body);
  return body;
}
