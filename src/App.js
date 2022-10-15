import React, { useState, useRef } from "react";

import "./App.css";

function App() {
  const [menu, setMenu] = useState([
    { name: "John", id: 1, parent: 0 },
    { name: "Sarah", id: 2, parent: 0 },
    { name: "Bob", id: 3, parent: 1 },
    { name: "Johnny", id: 4, parent: 1 },
    { name: "Ethan", id: 5, parent: 2 },
    { name: "Paula", id: 6, parent: 2 },
    { name: "Donald", id: 7, parent: 1 },
    { name: "Jennifer", id: 8, parent: 1 },
    { name: "Courtney", id: 9, parent: 3 },
    { name: "Jane", id: 10, parent: 3 },
  ]);

  const [levelSelected, setLevelSelected] = useState("");
  const [menuName, setMenuName] = useState("");
  const [user, setUser] = useState({
    name: "Thao",
    age: 25,
  });

  console.log(menu);

  const counter = useRef(0);

  const onCloseSubMenu = id => {
    let newMenu = menu.filter(e => e?.id !== id);
    setMenu(newMenu);
  };

  const renderMenu = (level = 0) => (
    <ul>
      {menu.map(e => {
        if (e?.parent === level) {
          return (
            <li key={e?.id}>
              <div className="item">
                <span>{e?.name}</span>
                <span
                  className="close-icon"
                  onClick={() => onCloseSubMenu(e?.id)}
                >
                  x
                </span>
              </div>
              {renderMenu(e?.id)}
            </li>
          );
        }
      })}
    </ul>
  );

  const onAddSubMenu = () => {
    if (menuName) {
      let newMenu = [...menu];
      newMenu.push({
        id: counter.current + 1,
        name: menuName,
        parent: levelSelected || 0,
      });

      setMenu(newMenu);
      counter.current++;
      setMenuName("");
      if (levelSelected) {
        setLevelSelected("");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">{`Add Sub Menu: ${user.name} - ${user.age}`}</h1>
      <div className="flex items-center justify-center">
        {menu?.length > 0 && (
          <select
            className="select-custom"
            value={levelSelected}
            defaultValue={levelSelected}
            onChange={e => {
              setLevelSelected(Number(e.target.value));
            }}
          >
            <option value="" className="hidden">
              Select your Menu Level
            </option>
            {menu.map(e => (
              <option value={e?.id} key={e?.id}>
                {e?.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          className="ml-30 input-custom"
          value={menuName}
          onChange={e => setMenuName(e.target.value)}
          placeholder="Enter Menu Name"
          onKeyDown={e => {
            if (e.key === "Enter") {
              onAddSubMenu();
            }
          }}
        />
        <button
          type="button"
          className="ml-30 btn-custom"
          onClick={onAddSubMenu}
        >
          Add SubMenu
        </button>
      </div>
      <div className="bg-gray p-30 mt-30">
        <h1 className="text-center">Render Sub Menu</h1>
        {renderMenu()}
      </div>
    </div>
  );
}

export default App;
