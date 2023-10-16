/* eslint-disable react/prop-types */
import "./Li.css";

const Li = ({ Icon, title, onClick }) => {
  return (
    <div className="nav-links" style={{ cursor: "pointer" }} onClick={onClick}>
      {Icon && <Icon className="icon" />}
      <span>{title ? title : null}</span>
    </div>
  );
};

export default Li;
