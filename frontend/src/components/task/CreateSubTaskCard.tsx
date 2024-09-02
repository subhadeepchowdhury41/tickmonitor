/* eslint-disable react-hooks/exhaustive-deps */
import { urgencies } from "@/lib/utils/consts";
import {
  Checkbox,
} from "@mui/material";
import { Task } from "@/lib/types/task.type";
import { useState } from "react";
import axios from "axios";
import TextInput from "../ui/form/TextInput";
import DateInput from "../ui/form/DateInput";
import { TaskUser } from "@/lib/types/task-user.type";

const CreateSubTaskCard = ({ t, onAdd }: { t: Task; onAdd: () => void }) => {
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date(t.startDate);
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });
  const [dueDate, setDueDate] = useState<string>(() => {
    const today = new Date(t.dueDate);
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });
  const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  const [urgency, setUrgency] = useState<string>("medium");
  const [people, setPeople] = useState<TaskUser[]>([]);
  const handleUrgencyClick = (urg: string) => {
    setUrgency(urg);
  };
  const handleClick = (id: string) => {
    setPeople((prev) =>
      prev.map((p) => p.id).includes(id)
        ? prev.filter((p) => p.id !== id)
        : [...prev, t.assignedUsers.find((t) => t.id === id)!]
    );
  };
  const addSubTask = async () => {
    await axios
      .post("/api/tasks", {
        title,
        description: desc,
        startDate,
        dueDate,
        urgency,
        vertices: t.vertices.map((v) => v.id),
        assignedUsers: people.map((p) => ({ id: p.user.id, role: "cc" })),
        parentTaskId: t.id,
        assignedBy: t.assignedBy.id,
      })
      .then((res) => {
        console.log(res.data);
        onAdd();
      });
  };
  return (
    <div className="w-full flex flex-col border-l border-primary mb-4 px-4">
      <div className="flex gap-2">
        <TextInput
          label="Title"
          hint="Enter Title"
          className="border-white border-b-disabled rounded-none"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <TextInput
          label="Description"
          hint="Enter Description"
          className="border-white border-b-disabled rounded-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <DateInput
          label="Start Date"
          hint="Enter Title"
          className="border-white border-b-disabled rounded-none"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DateInput
          label="Due Date"
          hint="Enter Description"
          className="border-white border-b-disabled rounded-none"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="flex my-2 w-1/2">
          <div className="flex flex-wrap gap-2">
            {t.assignedUsers.map((tUser, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-200 rounded cursor-pointer h-12 px-2"
                onClick={() => handleClick(tUser.id)}
              >
                <Checkbox
                  size="small"
                  checked={people.map((p) => p.id).includes(tUser.id)}
                  color="success"
                  className=""
                />
                <div className="flex flex-col ">
                  <div className="text-primary font-[500] text-sm">
                    {tUser.user.name}
                  </div>
                  <div className="text-gray-600 font-light text-xs">
                    {tUser.user.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[1/2] gap-2 items-center">
          {urgencies.map((urg, i) => (
            <div
              key={i}
              className="text-xs font-light items-center gap-1 h-12 w-24 flex justify-center rounded-md cursor-pointer"
              style={{
                color: urg.color.color,
                border: "1px solid",
                borderColor:
                  urg.value === urgency
                    ? urg.color.color
                    : urg.color.backgroundColor,
                backgroundColor:
                  urg.value === urgency ? urg.color.backgroundColor : undefined,
              }}
              onClick={() => handleUrgencyClick(urg.value)}
            >
              <div>{}</div>
              <div className="scale-75">{urg.icon}</div>
              {urg.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 my-2">
        <div className="h-10 flex-grow bg-bg rounded text-primary font-[500] flex items-center text-sm cursor-pointer justify-center">
          Cancel
        </div>
        <div
          className="h-10 flex-grow bg-primary rounded text-white font-[500] flex items-center text-sm cursor-pointer justify-center"
          onClick={addSubTask}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default CreateSubTaskCard;