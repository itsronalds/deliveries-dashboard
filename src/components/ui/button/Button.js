import classNames from "classnames";

const defaultClasses = "w-full rounded transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};
const colors = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
};

const Button = ({ className, style, type, size = "sm", color = "primary", onClick, children }) => {
  const classes = classNames(defaultClasses, sizes[size], colors[color], className);

  return (
    <button className={classes} style={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
