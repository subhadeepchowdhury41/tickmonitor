"use client";

import Editor from "@/components/editor/editor";
import AddPeoplePopup from "@/components/popups/AddPeople";
import AutofillInput from "@/components/ui/AutofillInput";
import DateInput from "@/components/ui/DateInput";
import { LineBreak } from "@/components/ui/LineBeak";
import MultilineInput from "@/components/ui/MultilineInput";
import TextInput from "@/components/ui/TextInput";
import {
  Assignment,
  Cancel,
  Comment,
  DateRange,
  Delete,
  People,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";

const people = [
  {
    domain: "OAB",
    name: "Subhadeep Chowdhury",
    id: "1",
  },
  {
    domain: "AntiMatter",
    name: "Avishek Neogi",
    id: "2",
  },
  {
    domain: "ABMCL",
    name: "Sumanth Kongani",
    id: "3",
  },
  {
    domain: "Grasim",
    name: "Mrityunjai Sinha",
    id: "4",
  },
  {
    domain: "Grasim",
    name: "Sahil Khakar",
    id: "5",
  },
  {
    domain: "Grasim",
    name: "Tanishka Bhat",
    id: "6",
  },
  {
    domain: "Grasim",
    name: "Nveen Edala",
    id: "7",
  },
];

const CreateTask = () => {
  const [showAddPeople, setShowAddPeople] = useState(false);
  const handleClose = () => setShowAddPeople(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [addedPeople, setAddedPeople] = useState();
  return (
    <>
      <div
        style={{
          height: "calc(100vh - 5rem)",
        }}
        className="flex-col flex"
      >
        <div className="px-4 flex items-center justify-between text-2xl font-bold bg-[#FC6736]">
          <div className="flex items-center gap-2 py-2 mt-4 text-white">
            <Assignment sx={{ color: "white" }} />
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
            <Button
              onClick={() => setShowAddPeople(true)}
              size="small"
              variant="contained"
              className="text-xs rounded-full px-4 text-white"
            >
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
                hint="Enter Title"
                style={{
                  fontSize: 14,
                }}
                className="text-2xl"
              />
            </div>
            <div className="mx-4 mt-2">
              <MultilineInput
                label="Description"
                hint="Describe your Task"
                inputClassName=""
                style={{
                  fontSize: 14,
                  paddingTop: "0.3em",
                  resize: "none",
                }}
                className=""
              />
            </div>
            <div className="mx-4 mt-2 flex gap-2">
              <DateInput
                label="Start                                                                                                            Date"
                hint="Select Start Date"
                className=" text-2xl"
              />
              <DateInput
                label="End Date"
                hint="Select End Date"
                className="text-2xl"
              />
            </div>
            <div className="mx-4 mt-2">
              <AutofillInput
                label="To"
                hint="Mention Assignee to this Task"
                renderSelected={(sel, removeItem, idx) => (
                  <div
                    key={idx}
                    className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                  >
                    <div className="flex items-center">
                      <Avatar className="mx-1 w-5 h-5 text-xs">
                        {sel.name[0]}
                      </Avatar>
                      <div className="mr-2">{sel.name}</div>
                    </div>
                    <Cancel
                      className="w-6 h-6 cursor-pointer mr-[0.125em]"
                      onClick={() => removeItem(sel.id)}
                    />
                  </div>
                )}
                renderAutofillItem={(item, highlighted, selectItem, index) => (
                  <div
                    onClick={() => selectItem(index)}
                    className={`flex gap-2 p-2 hover:bg-slate-400 cursor-pointer ${
                      highlighted
                        ? "bg-slate-400 border-l-2 border-slate-800"
                        : "bg-white"
                    }`}
                  >
                    <Avatar>{item.name[0]}</Avatar>
                    <div className={`text-sm font-bold`}>
                      {item.name}
                      <div className="text-xs font-normal">{item.domain}</div>
                    </div>
                  </div>
                )}
                options={people}
                searchMapper={(p: any) => p.name}
              />
            </div>
            <div className="mx-4 mt-2">
              <AutofillInput
                label="Cc"
                hint="Mention Ccs to this Task"
                renderSelected={(sel, removeItem, idx) => (
                  <div
                    key={idx}
                    className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                  >
                    <div className="flex items-center">
                      <Avatar className="mx-1 w-5 h-5 text-xs">
                        {sel.name[0]}
                      </Avatar>
                      <div className="mr-2">{sel.name}</div>
                    </div>
                    <Cancel
                      className="w-6 h-6 cursor-pointer mr-[0.125em]"
                      onClick={() => removeItem(sel.id)}
                    />
                  </div>
                )}
                renderAutofillItem={(item, highlighted, selectItem, index) => (
                  <div
                    onClick={() => selectItem(index)}
                    className={`flex gap-2 p-2 hover:bg-slate-400 cursor-pointer ${
                      highlighted
                        ? "bg-slate-400 border-l-2 border-slate-800"
                        : "bg-white"
                    }`}
                  >
                    <Avatar>{item.name[0]}</Avatar>
                    <div className={`text-sm font-bold`}>
                      {item.name}
                      <div className="text-xs font-normal">{item.domain}</div>
                    </div>
                  </div>
                )}
                options={people}
                searchMapper={(p) => p.name}
              />
            </div>
            <div className="bg-slate-200 h-10 mx-4 mt-2 w-400 rounded-md">
              <div className="m-2">
                <div className="w-6 h-6 bg-slate-800"></div>
                <div></div>
              </div>
            </div>
            <Editor />
          </div>
          <div className="w-[320px] border-l bg-[#EEEEEE]">
            <div className="font-[600] flex gap-3 items-center py-4 px-4 text-xl bg-[#0f4658fb] text-white">
              <Comment fontSize={"small"} sx={{ color: "whitesmoke" }} />
              Comments
            </div>
            <LineBreak />
          </div>
        </div>
        <AddPeoplePopup open={showAddPeople} onClose={handleClose} />
      </div>
    </>
  );
};

export default CreateTask;
