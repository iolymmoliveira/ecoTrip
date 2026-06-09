export const themeScriptCode = `
  try {
    const savedTheme = localStorage.getItem('ecotrip-theme');

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const shouldUseDark =
      savedTheme === 'dark' ||
      (!savedTheme && systemPrefersDark);

    document.documentElement.classList.toggle(
      'dark',
      shouldUseDark
    );
  } catch (_) {}
`;
