"use client";

import { useState } from "react";
import DrawerItem from "./items";
import {
  Analytics,
  Call,
  Chat,
  Dashboard,
  Newspaper,
  Task,
} from "@mui/icons-material";

const drawerItems = [
  { id: 0, label: "Dashboard", icon: <Dashboard /> },
  { id: 1, label: "Tasks", icon: <Task /> },
  { id: 2, label: "Chats", icon: <Chat /> },
  { id: 3, label: "Analytics", icon: <Analytics /> },
  { id: 4, label: "News", icon: <Newspaper /> },
  { id: 5, label: "Calls", icon: <Call /> },
];

const Drawer = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <>
      <div className="w-[250px] bg-[#176B87]">
        <div className="w-[100%] h-20 flex items-center justify-center font-bold text-2xl text-white bg-[#13495b]">
          Tick Monitor
        </div>
        <div className="mt-4"/>
        {drawerItems.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item.id)}>
            <DrawerItem
              icon={item.icon}
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
