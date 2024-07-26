"use client";

import DateFilter from "@/components/menus/DateFilter";
import ProjectsFilter from "@/components/menus/ProjectsFilter";
import StatusFilter from "@/components/menus/StatusFilter";
import UrgencyFilter from "@/components/menus/UrgencyFilter";
import AssignedTaskCard from "@/components/task/AssignedTaskCard";
import TaskRow from "@/components/task/TaskRow";
import { LineBreak } from "@/components/ui/LineBeak";
import SectionHeading from "@/components/ui/SectionHeading";
import UserAvatar from "@/components/user/UserAvatar";
import { useDomain } from "@/contexts/DomainContext";
import { useTasks } from "@/contexts/TasksContext";
import { urgencies } from "@/lib/utils/consts";
import {
  Add,
  ArrowForward,
  ArrowRight,
  ArrowRightSharp,
  CommentOutlined,
  InfoOutlined,
  KeyboardArrowDown,
  List,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Tasks = () => {
  const tasks = useTasks();
  const router = useRouter();
  const domain = useDomain();
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
  console.log(tasks?.tasksByMe);
  return (
    <>
      <div
        style={{
          height: "calc(100vh - 5rem)",
        }}
        className="flex-col flex"
      >
        <div className="px-4 flex items-center justify-between text-2xl font-bold py-2 bg-blue-600">
          <div className="flex items-center justify-between gap-2 text-white">
            <List sx={{ color: "white" }} />
            Task List
          </div>
          <div>
            <IconButton
              sx={{ bgcolor: "white", "&:hover": { bgcolor: "whitesmoke" } }}
              onClick={() => {
                router.push("/dashboard/task/create");
              }}
            >
              <Add />
            </IconButton>
          </div>
        </div>
        <div
          className="flex flex-col overflow-y-scroll"
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          <SectionHeading text="Tasks" className="mx-4" />
          <div className="flex flex-col mx-4 mt-4">
            <div
              className="rounded-md flex font-bold text-xs px-4
                  justify-between"
            >
              <div className="w-[230px] flex">
                <div>
                  <div className="">Title</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="group flex w-[130px] items-center gap-1">
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
                <div className="w-[120px]">Actions</div>
              </div>
            </div>
            <div className="mt-1 ">
              {tasks?.tasksByMe.map((t, index) => {
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
          console.log(curr, full);
        }}
      />
      <ProjectsFilter
        options={domain?.verticals ?? []}
        onChange={(curr, full) => {}}
        anchRef={projectFilterEl}
        onClose={handleProjectFilterClose}
      />
      <UrgencyFilter
        options={["Critical", "High", "Medium", "Low"]}
        onChange={(curr, full) => {}}
        anchRef={urgencyFilterEl}
        onClose={handleUrgencyFilterClose}
      />
      <DateFilter
        onChange={(curr, full) => {}}
        onClose={handleDateFilterClose}
        anchRef={dateFilterEl}
      />
    </>
  );
};

export default Tasks;
