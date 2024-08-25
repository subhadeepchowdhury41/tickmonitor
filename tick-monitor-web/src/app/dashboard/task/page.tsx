"use client";

import DateFilter from "@/components/menus/DateFilter";
import ProjectsFilter from "@/components/menus/ProjectsFilter";
import StatusFilter from "@/components/menus/StatusFilter";
import UrgencyFilter from "@/components/menus/UrgencyFilter";
import TaskRow from "@/components/task/TaskRow";
import AutofillInput from "@/components/ui/form/AutofillInput";
import DateInput from "@/components/ui/form/DateInput";
import MultilineInput from "@/components/ui/form/MultilineInput";
import TextInput from "@/components/ui/form/TextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useDomain } from "@/contexts/DomainContext";
import { useTasks } from "@/contexts/TasksContext";
import { urgencies } from "@/lib/utils/consts";
import { getDateTime } from "@/lib/utils/datetimeUtils";
import { Add, AddBox, Cancel, List, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker";

const Tasks = () => {
  const tasks = useTasks();
  const router = useRouter();
  const domain = useDomain();
  const auth = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [urgency, setUrgency] = useState<string>("medium");
  const [dateFilterEl, setDateFilterEl] = useState<HTMLInputElement | null>(
    null
  );
  const [urgencyFilterEl, setUrgencyFilterEl] = useState<HTMLElement | null>(
    null
  );
  const [statusFilterEl, setStatusFilterEl] = useState<HTMLElement | null>(
    null
  );
  const [projectFilterEl, setProjectFilterEl] = useState<HTMLElement | null>(
    null
  );
  const [to, setTo] = useState<string[]>([]);
  const [cc, setCc] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2); // Months are 0-based in JavaScript
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const handleCreateNav = () => {
    // router.push("/dashboard/task/create");
    setShowCreateDialog(true);
  };
  const handleClose = () => {
    setShowCreateDialog(false);
  };
  const handleDateFilterPress = (e: any) => {
    setDateFilterEl(e.target as HTMLInputElement);
  };
  const handleUrgencyFilterPress = (e: any) => {
    setUrgencyFilterEl(e.currentTarget as HTMLElement);
  };
  const handleStatusFilterPress = (e: any) => {
    setStatusFilterEl(e.target as HTMLElement);
  };
  const handleProjectFilterPress = (e: any) => {
    setProjectFilterEl(e.target as HTMLElement);
  };
  const handleDateFilterClose = () => {
    setDateFilterEl(null);
  };
  const handleUrgencyFilterClose = () => {
    setUrgencyFilterEl(null);
  };
  const handleStatusFilterClose = () => {
    setStatusFilterEl(null);
  };
  const handleProjectFilterClose = () => {
    setProjectFilterEl(null);
  };
  const handleUrgencyClick = (urg: string) => {
    setUrgency(urg);
  };
  const handleAddTask = async () => {
    await axios
      .post("/api/tasks/", {
        title: title,
        description: description,
        assignedBy: auth?.user.sub,
        assignedUsers: [
          ...to.map((t) => ({
            id: t,
            role: "to",
          })),
          ...cc.map((c) => ({
            id: c,
            role: "cc",
          })),
        ],
        vertices: selectedVerticals,
        interval: "none",
        startDate: getDateTime(startDate),
        dueDate: getDateTime(dueDate),
        urgency: urgency,
      })
      .then(async (res) => {
        await tasks?.syncTasks();
        handleClose();
      })
      .catch((err) => err);
  };
  const divRef = useRef(null);
  return (
    <>
      <Dialog open={showCreateDialog} onClose={handleClose}>
        <div ref={divRef} className=" w-[600px] px-2  mt-4">
          <TextInput
            label=""
            hint="Enter a title"
            className="border-none font-bold"
            style={{ fontSize: 23 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex mx-2">
            <div className="flex w-16 items-center text-xs text-slate-600">
              To *
            </div>
            <AutofillInput
              label=""
              parentRef={divRef}
              maxItems={1}
              className="border-none"
              hint="Mention Assignee to this Task"
              renderSelected={(sel, removeItem, idx) => (
                <div
                  key={idx}
                  className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                >
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center w-5 h-5 text-xs bg-slate-400 rounded-full">
                      {sel.name[0]}
                    </div>
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
                  key={index}
                  onClick={() => {
                    console.log("SELECTED: ", index);
                    selectItem(index);
                  }}
                  className={`flex gap-2 p-2 text-xs hover:bg-slate-400 cursor-pointer ${
                    highlighted
                      ? "bg-slate-400 border-l-2 border-slate-800"
                      : "bg-white"
                  }`}
                >
                  <div className="bg-slate-600 rounded-full text-white w-6 h-6 flex items-center justify-center">
                    {item.name[0]}
                  </div>
                  <div className={`text-xs font-bold`}>
                    {item.name}
                    <div className="text-[10px] font-normal">{item.domain}</div>
                  </div>
                </div>
              )}
              options={
                domain?.users
                  .filter((u) => !to.includes(u.id))
                  .map((u) => ({ ...u, domain: "OAB" })) ?? []
              }
              searchMapper={(p: any) => p.name}
              onChange={(curr, full) => setTo(full.map((t) => t.id))}
            />
          </div>
          <div className="flex mx-2 mt-2">
            <div className="flex w-16 items-center text-xs text-slate-600">
              Cc
            </div>
            <AutofillInput
              label=""
              parentRef={divRef}
              maxItems={10}
              className="border-none"
              hint="Mention Assignee to this Task"
              renderSelected={(sel, removeItem, idx) => (
                <div
                  key={idx}
                  className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                >
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center w-5 h-5 text-xs bg-slate-400 rounded-full">
                      {sel.name[0]}
                    </div>
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
                  key={index}
                  onClick={() => {
                    console.log("SELECTED: ", index);
                    selectItem(index);
                  }}
                  className={`flex gap-2 p-2 text-xs hover:bg-slate-400 cursor-pointer ${
                    highlighted
                      ? "bg-slate-400 border-l-2 border-slate-800"
                      : "bg-white"
                  }`}
                >
                  <div className="bg-slate-600 rounded-full text-white w-6 h-6 flex items-center justify-center">
                    {item.name[0]}
                  </div>
                  <div className={`text-xs font-bold`}>
                    {item.name}
                    <div className="text-[10px] font-normal">{item.domain}</div>
                  </div>
                </div>
              )}
              options={
                domain?.users
                  .filter((u) => !cc.includes(u.id))
                  .map((u) => ({ ...u, domain: "OAB" })) ?? []
              }
              searchMapper={(p: any) => p.name}
              onChange={(curr, full) => setCc(full.map((t) => t.id))}
            />
          </div>

          <div className="flex items-center mx-2 mt-4">
            <div className="w-16 flex items-center text-xs text-slate-600">
              Date
            </div>
            <div className="flex gap-2">
              <DateInput
                label="Start Date"
                hint="Select Start Date"
                className=" text-2xl border-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <DateInput
                label="End Date *"
                hint="Select End Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-2xl border-none"
              />
            </div>
          </div>
          <div className="flex items-center mx-2 mt-2">
            <div className="w-16 flex items-center text-xs text-slate-600">
              Project
            </div>
            <AutofillInput
              parentRef={divRef}
              maxItems={1}
              className="border-none"
              label=""
              hint="Mention Businesses involved this Task"
              renderSelected={(sel, removeItem, idx) => (
                <div
                  key={idx}
                  className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                >
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center w-5 h-5 text-xs bg-slate-400 rounded-full">
                      {sel.name[0]}
                    </div>
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
                  key={index}
                  onClick={() => selectItem(index)}
                  className={`flex gap-2 p-2 items-center hover:bg-slate-400 cursor-pointer ${
                    highlighted
                      ? "bg-slate-400 border-l-2 border-slate-800"
                      : "bg-white"
                  }`}
                >
                  <div className="mx-1 flex items-center justify-center w-7 h-7 text-xs bg-slate-600 text-white rounded-full">
                    {item.name[0]}
                  </div>
                  <div className={`text-sm font-bold `}>
                    {item.name}
                    <div className="text-xs font-normal">{item.name}</div>
                  </div>
                </div>
              )}
              options={domain?.verticals ?? []}
              searchMapper={(p) => p.name}
              onChange={(curr, full) =>
                setSelectedVerticals(full.map((v) => v.id))
              }
            />
          </div>
          <div className="flex mx-2 mt-2 items-center">
            <div className="flex w-16 items-center text-xs text-slate-600">
              Urgency
            </div>
            <div className="flex flex-wrap gap-2">
              {urgencies.map((urg, i) => (
                <div
                  key={i}
                  className="text-xs font-light items-center gap-1 h-8 w-24 flex justify-center rounded-md cursor-pointer"
                  style={{
                    color: urg.color.color,
                    border: "1px solid",
                    borderColor:
                      urg.value === urgency
                        ? urg.color.color
                        : urg.color.backgroundColor,
                    backgroundColor:
                      urg.value === urgency
                        ? urg.color.backgroundColor
                        : undefined,
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
          <div className="flex items-center mt-4">
            <MultilineInput
              label=""
              hint="Enter decsription of the task"
              className="border-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogActions>
          <div
            style={{ width: "120px" }}
            onClick={handleClose}
            className="border border-slate-800 rounded hover:bg-slate-100 cursor-pointer h-7 flex items-center justify-center text-xs"
          >
            Cancel
          </div>
          <div
            style={{ width: "120px" }}
            onClick={handleAddTask}
            className="bg-slate-800 hover:bg-slate-700 rounded flex text-white cursor-pointer h-7 justify-center items-center text-xs"
          >
            Confirm
          </div>
        </DialogActions>
      </Dialog>
      <div
        style={{
          height: "calc(100vh - 4rem)",
        }}
        className={`flex-col flex`}
      >
        <div
          className={`px-4 h-12 pt-4 bg-white flex items-center text-2xl font-bold gap-1`}
        >
          Tasks
          <IconButton size="small" onClick={handleCreateNav}>
            <AddBox className="text-gray-300" fontSize="medium" />
          </IconButton>
        </div>
        <div
          className={`px-4 pt-2 pb-2 bg-white flex items-center gap-2 text-xs`}
        >
          <div className="h-6 cursor-pointer hover:bg-slate-50 flex items-center justify-center px-4 rounded bg-slate-100 text-blue-800">
            Board
          </div>
          <div className="h-6 cursor-pointer hover:bg-slate-50 flex items-center justify-center px-4 rounded ">
            Timeline
          </div>
          <div className="h-6 cursor-pointer hover:bg-slate-50 flex items-center justify-center px-4 rounded ">
            Activities
          </div>
        </div>
        <div
          className={`flex flex-col overflow-y-scroll`}
          style={{
            height: "calc(100vh - 2rem)",
          }}
        >
          <div className="flex flex-col mx-4 mt-4">
            <div
              className={`rounded-md w-full flex font-bold text-xs px-4 justify-between`}
            >
              <div className="w-[200px] flex items-center">
                <div>
                  <div className="">Title</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="group flex w-[145px] items-center gap-1">
                  Due Date
                  <div className="invisible group-hover:visible scale-90">
                    <IconButton
                      onClick={handleDateFilterPress}
                      sx={{ width: "30px", height: "30px" }}
                      size="small"
                    >
                      <MoreVert fontSize="small" sx={{}} />
                    </IconButton>
                  </div>
                </div>
                <div className="w-[120px] flex items-center gap-1 group">
                  Urgency
                  <div className="invisible group-hover:visible scale-90">
                    <IconButton
                      onClick={handleUrgencyFilterPress}
                      sx={{ width: "30px", height: "30px" }}
                      size="small"
                    >
                      <MoreVert fontSize="small" sx={{}} />
                    </IconButton>
                  </div>
                </div>
                <div className="w-[120px] flex items-center gap-1 group">
                  Status
                  <div className="invisible group-hover:visible">
                    <IconButton
                      onClick={handleStatusFilterPress}
                      sx={{ width: "30px", height: "30px" }}
                      size="small"
                    >
                      <MoreVert fontSize="small" sx={{}} />
                    </IconButton>
                  </div>
                </div>
                <div className="flex items-center w-[120px] group gap-2">
                  Project
                  <div className="invisible group-hover:visible">
                    <IconButton
                      onClick={handleProjectFilterPress}
                      sx={{ width: "30px", height: "30px" }}
                      size="small"
                    >
                      <MoreVert fontSize="small" sx={{}} />
                    </IconButton>
                  </div>
                </div>
                <div className="w-[180px] text-center">People</div>
                <div className="w-[140px] text-center">Actions</div>
              </div>
            </div>
            <div className="mt-1">
              {tasks?.tasksByMeFiltered.map((t, index) => {
                return <TaskRow key={index} t={t} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <StatusFilter
        options={["To Initiate", "In Progress", "Completed", "On Hold"]}
        onClose={handleStatusFilterClose}
        anchRef={statusFilterEl}
        onChange={(curr, full) => {
          tasks?.addFilter({
            status: [
              "All",
              ...full.map((f) => f.replace(" ", "_").toLowerCase()),
            ],
          });
        }}
      />
      <ProjectsFilter
        options={domain?.verticals.map((v) => v.name) ?? []}
        onChange={(curr, full) => {
          tasks?.addFilter({
            verticals: ["All", ...full],
          });
        }}
        anchRef={projectFilterEl}
        onClose={handleProjectFilterClose}
      />
      <UrgencyFilter
        options={["Critical", "High", "Medium", "Low"]}
        onChange={(curr, full) => {
          tasks?.addFilter({
            urgency: ["All", ...full.map((f) => f.toLowerCase())],
          });
        }}
        anchRef={urgencyFilterEl}
        onClose={handleUrgencyFilterClose}
      />
      <DateFilter
        onChange={(curr, full) => {
          tasks?.addFilter({
            status: ["All", ...full],
          });
        }}
        onClose={handleDateFilterClose}
        anchRef={dateFilterEl}
      />
    </>
  );
};

export default Tasks;
