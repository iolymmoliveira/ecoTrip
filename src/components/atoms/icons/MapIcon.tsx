export const getMapIconSvg = (): string => `
  <div style="
    width:32px;
    height:32px;
    background:#10b981;
    border-radius:9999px;
    border:2px solid white;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:0 4px 12px rgba(0,0,0,.2);
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.74a2 2 0 0 1-2.602 0C8.139 20.193 2.6 14.993 2.6 10a8 8 0 1 1 14.8 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  </div>
`;
