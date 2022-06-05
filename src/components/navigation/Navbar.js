import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { DASHBOARD_SECTIONS } from "../../constants";
import image from "../../assets/images/image.png";
import navItems from "./navItems";

const handlerBg = (navItem, currentItem) => {
  if (navItem === currentItem) {
    return "bg-blue-500";
  }
};

const Navbar = ({ current, change }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const handler = (section) => {
    const name = DASHBOARD_SECTIONS.english[section];

    change(name);
  };

  return (
    <div className="p-3 flex justify-between items-center" style={{ background: "#0E1A35" }}>
      <div>
        <GiHamburgerMenu className="text-2xl text-white cursor-pointer" onClick={onClick} />
      </div>

      <div
        className="z-50 flex flex-col gap-2 w-full p-3 transition-all"
        style={{
          background: "#0E1A35",
          position: "absolute",
          top: "64px",
          left: isOpen ? "0" : "-100%",
          height: "calc(100vh - 64px)",
        }}
      >
        {navItems.map((item) => {
          const { id, name, icon } = item;

          const translationName = DASHBOARD_SECTIONS.spanish[name];
          const itemBg = handlerBg(DASHBOARD_SECTIONS.english[name], current);

          return (
            <div
              key={id}
              className={`flex items-center text-white py-3 px-3 rounded cursor-pointer shadow-sm transition-all ${itemBg}`}
              onClick={() => handler(name)}
            >
              <div>{icon}</div>

              <span className="ml-3 text-sm">{translationName}</span>
            </div>
          );
        })}
      </div>

      <div>
        <img className="w-10 h-10 rounded-full object-cover" src={image} alt="Ronald Abu Saleh" />
      </div>
    </div>
  );
};

export default Navbar;
