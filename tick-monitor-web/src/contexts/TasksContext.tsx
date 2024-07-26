/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Task } from "@/lib/types/task.type";

interface TasksContextType {
  myTasks: Task[];
  tasksByMe: Task[];
  syncTasks: () => Promise<void>;
  createTask: ({
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
    startDate: string;
    dueDate: string;
    startTime: string;
    dueTime: string;
    interval: Interval;
  }) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | null>(null);

type Interval = "DAILY" | "WEEKLY" | "MONTHLY" | "ANNUAL";

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [tasksByMe, setTasksByMe] = useState<Task[]>([]);
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
    startDate: string;
    dueDate: string;
    startTime: string;
    dueTime: string;
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
        interval,
      });
    } catch (err) {
      throw err;
    }
  };
  const getTasks = async () => {
    try {
      const response = await axios.get(`/api/users/${auth?.user.sub}/tasks/`);
      return response.data.response;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log("SET_MY_TASKS: ", myTasks);
  }, [myTasks]);
  useEffect(() => {
    console.log("SET_TASKS_BY_ME: ", tasksByMe);
  }, [tasksByMe]);
  useEffect(() => {
    if (!auth?.user) return;
    getTasks().then((response) => {
      setMyTasks(response.assigned);
      setTasksByMe(response.assigns);
    });
  }, [auth?.user]);
  const syncTasks = async () => {
    getTasks().then((response) => {
      setMyTasks(response.assigned);
      setTasksByMe(response.assigns);
    });
  };
  return (
    <TasksContext.Provider
      value={{ createTask, myTasks, tasksByMe, syncTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
