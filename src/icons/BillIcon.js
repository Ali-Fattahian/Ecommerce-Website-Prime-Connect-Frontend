const BillIcon = () => {
  return (
    <div
      style={{
        borderRadius: "4px",
        backgroundColor: "#c0eef2",
        fontSize: '28px',
        padding: '0 8px'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          fill: "#333",
        }}
        height="1em"
        viewBox="0 0 576 512"
      >
        <path d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z" />
      </svg>
    </div>
  );
};

export default BillIcon;
