const DownloadIcon = ({ width = "1rem" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6 20q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11Z"
      />
    </svg>
  );
};

export default DownloadIcon;
