"use client";

import { useState } from "react";
import DrawerItem from "./items";
import {
  Add,
  Analytics,
  Call,
  Chat,
  CircleRounded,
  Dashboard,
  Newspaper,
  Search,
  Task,
} from "@mui/icons-material";
import TextInput from "../ui/form/TextInput";
import { useDomain } from "@/contexts/DomainContext";
import { Button, Dialog, IconButton } from "@mui/material";
import CreateVertical from "./CreateVertical";

const drawerItems = [
  { id: 0, label: "Dashboard", icon: <Dashboard /> },
  { id: 1, label: "Tasks", icon: <Task /> },
  { id: 2, label: "Chats", icon: <Chat /> },
  { id: 3, label: "Analytics", icon: <Analytics /> },
  { id: 4, label: "News", icon: <Newspaper /> },
  { id: 5, label: "Calls", icon: <Call /> },
];

const Drawer = () => {
  const domain = useDomain();
  const [selectedItem, setSelectedItem] = useState(0);
  const [showAddVertical, setShowAddVertical] = useState(false);
  const handleAddVertical = () => {
    setShowAddVertical(true);
  };
  const handleCloseAddVertical = () => {
    setShowAddVertical(false);
  };
  return (
    <div className="flex bg-white">
      <div className={`w-[76px] bg-primary ml-2 my-2 rounded`}>
        <div
          className={`w-[100%] h-12 flex items-center justify-center font-bold text-2xl rounded bg-primary text-neutral`}
        >
          T/M
        </div>
        <div className="" />
        {drawerItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={item.id === selectedItem ? `` : ""}
          >
            <DrawerItem
              icon={item.icon}
              label={item.label}
              selected={item.id === selectedItem}
            />
          </div>
        ))}
      </div>
      <div className="bg-white flex-col w-[170px] border-r border-gray-200 py-3 items-center">
        {/* :Search */}
        <div className="flex items-center mr-4 ml-2 h-7 bg-slate-200 rounded">
          <Search className="scale-75 text-gray-600 ml-1" />
          <input
            className="w-full outline-none bg-slate-200 text-xs"
            placeholder="Search..."
          />
        </div>

        {/* :Projects */}
        <div className="flex flex-col mt-2 mb-1 ml-2 mr-4">
          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-[10px] font-semibold">
              Projects
            </div>
            <div>
              <IconButton
                size="small"
                sx={{
                  width: "24px",
                  height: "24px",
                }}
                onClick={handleAddVertical}
              >
                <Add fontSize="small" className="scale-[0.8]" />
              </IconButton>
            </div>
          </div>
          {domain?.verticals.map((v, i) => (
            <div
              key={i}
              className="text-xs hover:bg-slate-100 rounded text-slate-600 h-7 mt-[0.1em] cursor-pointer flex items-center line-clamp-1 text-ellipsis"
            >
              <CircleRounded className="scale-[0.2]" />
              <div className="w-full text-ellipsis line-clamp-1">{v.name}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-2 mb-1 ml-2 mr-4">
          <div className="text-slate-400 text-[10px] font-semibold">People</div>
          {domain?.users.map((u, i) => (
            <div
              key={i}
              className="text-xs hover:bg-slate-100 rounded text-slate-600 h-7 my-[0.1em] cursor-pointer flex items-center text-ellipsis line-clamp-1"
            >
              <CircleRounded className="scale-[0.2]" />
              <div className="w-full text-ellipsis line-clamp-1">{u.name}</div>
            </div>
          ))}
        </div>
      </div>
      <CreateVertical
        showAddVertical={showAddVertical}
        handleCloseAddVertical={handleCloseAddVertical}
      />
    </div>
  );
};

export default Drawer;
