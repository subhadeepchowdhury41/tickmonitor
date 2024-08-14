"use client";

import DateFilter from "@/components/menus/DateFilter";
import ProjectsFilter from "@/components/menus/ProjectsFilter";
import StatusFilter from "@/components/menus/StatusFilter";
import UrgencyFilter from "@/components/menus/UrgencyFilter";
import TaskRow from "@/components/task/TaskRow";
import SectionHeading from "@/components/ui/SectionHeading";
import { useDomain } from "@/contexts/DomainContext";
import { useTasks } from "@/contexts/TasksContext";
import { colorTheme } from "@/lib/utils/colors";
import { Add, AddBox, List, MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
  return (
    <>
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
          <IconButton size="small">
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
