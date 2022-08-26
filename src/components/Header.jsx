import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <h1
      className="header"
      onClick={() => {
        handleClick();
      }}
    >
      NEWS
    </h1>
  );
};

export default Header;
