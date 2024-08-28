/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
// import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ children, id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-transparent border-none p-2 rounded-md hover:bg-yellow-400 transition-all duration-200"
    >
      {/* <HiEllipsisVertical className="w-6 h-6 text-gray-500" /> */}
      {children}
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(() => {
    close();
  }, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="fixed bg-white shadow-lg rounded-md z-50 p-2 w-56"
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex items-center gap-4 w-full text-left bg-transparent p-3 rounded-md hover:bg-gray-100 transition-all duration-200"
      >
        {icon}
        <span className="text-gray-700">{children}</span>
      </button>
    </li>
  );
}

function Menu({ children }) {
  return <div className="flex justify-end items-center">{children}</div>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
