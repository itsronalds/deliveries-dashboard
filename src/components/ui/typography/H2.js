import classNames from "classnames";

const defaultClasses = "text-2xl";
const weights = {
  normal: "font-normal",
  bold: "font-bold"
}

const H2 = ({ className, style, weight = "bold", children }) => {
  const classes = classNames(defaultClasses, weights[weight], className);

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};

export default H2;
