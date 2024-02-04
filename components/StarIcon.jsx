const StarIcon = ({ isClicked, onClick, fillColor, strokeColor, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <svg
      onClick={handleClick}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isClicked ? fillColor : strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      cursor={!disabled ? "pointer" : "not-allowed"}
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={isClicked ? fillColor : "none"}
      />
    </svg>
  );
};

export default StarIcon;
