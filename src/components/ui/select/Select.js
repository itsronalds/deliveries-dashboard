import classNames from "classnames";

const Select = ({ className, style, name, color, size = "sm", value, onChange, children }) => {
  const classes = classNames(
    className,
    `w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all text-${color}`,
    {
      "p-2 text-sm": size === "sm",
      "p-3 text-base": size === "lg",
    }
  );

  const customProps = {};

  if (typeof value === "string") {
    customProps.value = value;
  }

  return (
    <select className={classes} style={style} name={name} onChange={onChange} {...customProps}>
      {children}
    </select>
  );
};

export default Select;
