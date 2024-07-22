import axios from "axios";
import { NextResponse } from "next/server";
import { createContext, useContext } from "react";

interface TasksContextType {}

const TasksContext = createContext<TasksContextType | null>({});

type Interval = "DAILY" | "WEEKLY" | "MONTHLY" | "ANNUAL";

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const createTask = async ({
    title,
    description,
    startDate,
    dueDate,
    startTime,
    dueTime,
    interval,
  }: {
    title: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    startTime: Date;
    dueTime: Date;
    interval?: Interval;
  }) => {
    try {
      const response = await axios.post("/api/tasks", {
        title,
        description,
        startDate,
        startTime,
        dueDate,
        dueTime,
        interval
      });
      return NextResponse.json({ success: true, response: response.data });
    } catch (err) {
      return NextResponse.json({ success: false, error: err });
    }
  };
  return (
    <TasksContext.Provider value={{ createTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
