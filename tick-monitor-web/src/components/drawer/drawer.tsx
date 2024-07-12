"use client";

import { useState } from "react";
import DrawerItem from "./items";

const drawerItems = [
  { id: 0, label: "Dashboard" },
  { id: 1, label: "Tasks" },
  { id: 2, label: "Chats" },
  { id: 3, label: "Analytics" },
  { id: 4, label: "News" },
  { id: 5, label: "Calls" },
];

const Drawer = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <>
      <div className="w-[250px] border-r-[1px] border-slate-200">
        <div className="w-[100%] h-20 flex items-center justify-center font-bold text-2xl">
          Tick Monitor
        </div>
        {drawerItems.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item.id)}>
            <DrawerItem
              label={item.label}
              selected={item.id === selectedItem}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Drawer;
