"use client";

import { LineBreak } from "@/components/ui/LineBeak";
import MultilineInput from "@/components/ui/MultilineInput";
import TextInput from "@/components/ui/TextInput";
import { Assignment, Comment } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import { useState } from "react";

const CreateTask = () => {
  const [people, setPeople] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <div
      style={{
        height: "calc(100vh - 5rem)",
      }}
      className="flex-col flex"
    >
      <div className="px-4 flex items-center justify-between text-2xl font-bold bg-[#64CCC5]">
        <div className="flex items-center gap-2 py-2 mt-4 text-[#DAFFFB]">
          <Assignment sx={{ color: "#DAFFFB" }} />
          Assign Task
        </div>
        <div className="flex gap-2 font-normal">
          <AvatarGroup max={4}>
            <Avatar>N</Avatar>
            <Avatar>I</Avatar>
            <Avatar>G</Avatar>
            <Avatar>G</Avatar>
            <Avatar>E</Avatar>
            <Avatar>R</Avatar>
          </AvatarGroup>
          <Button size="small" className="text-xs rounded-full px-4 text-white">
            + Add People
          </Button>
        </div>
      </div>
      {/* <LineBreak className="" /> */}
      <div className="flex flex-grow">
        <div className="flex-grow mt-4">
          <div className="mx-4">
            <TextInput
              label="Title"
              hint="Give a Title to Your Task"
              style={{
                fontSize: 27,
                fontWeight: "500",
              }}
              className="border-white text-2xl"
            />
          </div>
          <div className="mx-4">
            <MultilineInput
              label="Description"
              hint="Describe your Task"
              inputClassName=""
              style={{
                fontSize: 14,
                paddingTop: "0.3em",
                resize: "none",
              }}
              className="border-white"
            />
          </div>
        </div>
        <div className="w-[320px] border-l bg-[#EEEEEE]">
          <div className="font-[600] flex gap-3 items-center py-4 px-4 text-xl bg-slate-700 text-white">
            <Comment fontSize={"small"} sx={{ color: "whitesmoke" }} />
            Comments
          </div>
          <LineBreak />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
