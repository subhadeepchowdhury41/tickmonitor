/* eslint-disable react-hooks/exhaustive-deps */
import { urgencies } from "@/lib/utils/consts";
import UserAvatar from "../user/UserAvatar";
import {
  Add,
  ArrowForward,
  Attachment,
  Cancel,
  Comment as CommentIcon,
  Download,
  History,
  InfoOutlined,
  KeyboardArrowDown,
  Send,
  Upload,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Task } from "@/lib/types/task.type";
import { useCallback, useEffect, useState } from "react";
import { Comment } from "@/lib/types/comment-app.type";
import axios from "axios";
import TextInput from "../ui/form/TextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useTasks } from "@/contexts/TasksContext";
import Comments from "./Comments";
import DateInput from "../ui/form/DateInput";
import { TaskUser } from "@/lib/types/task-user.type";
import { formatSizeInBytes } from "@/lib/utils/fileSize";

const TaskRow = ({ t }: { t: Task }) => {
  const auth = useAuth();
  const tasks = useTasks();
  const [showDetails, setShowDetails] = useState(false);
  const [expandPeople, setExpandPeople] = useState(false);
  const [expandSubs, setExpandSubs] = useState(false);
  const [statusChangeConfirmation, setStatusChangeConfirmation] =
    useState(false);
  const [statusChangeTo, setStatusChangeTo] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [curComment, setCurrComment] = useState<string>("");
  const [attatchments, setAttatchments] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const sendComment = async () => {
    const res = await axios
      .post("/api/comments", {
        taskId: t.id,
        userId: auth?.user.sub,
        content: curComment,
      })
      .then((res) => {
        fetchDetails();
        setCurrComment("");
      });
  };
  const handleSubAdd = () => {
    setExpandSubs((prev) => !prev);
  };
  const handleOpen = () => {
    setShowDetails(true);
  };
  const handleClose = () => {
    setShowDetails(false);
    setComments([]);
  };
  const handleConfirmationialogClose = () => {
    setStatusChangeConfirmation(false);
  };
  const handleExpandPeople = () => {
    setExpandPeople(!expandPeople);
  };
  const handleStatusChange = (status: string) => {
    setStatusChangeTo(status);
    setStatusChangeConfirmation(true);
  };
  const fetchDetails = async () => {
    await axios.get(`/api/tasks/${t.id}`).then((res) => {
      console.log("SET_COMMENTS: ", res.data.response.comments);
      setComments(res.data.response.comments);
      setAttatchments(res.data.response.attatchments);
    });
  };
  const submitStatusChange = async () => {
    await axios
      .put(`/api/tasks/${t.id}`, {
        status: statusChangeTo.replace(" ", "_").toLowerCase(),
      })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.success) {
          setStatusChangeConfirmation(false);
          await tasks?.syncTasks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addAttachment = async () => {
    if (!files.length) {
      console.log(t);
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userId", auth?.user.sub);
    formData.append("taskId", t.id);
    const res = await axios.post(
      `/api/attachments`,
      formData
    );
    console.log(res.data);
    tasks?.syncTasks();
  };
  useEffect(() => {
    if (showDetails) {
      fetchDetails();
    }
  }, [showDetails]);
  const ExpandPeople = useCallback(
    () => (
      <div className="flex items-center mx-4 gap-1">
        <div className="w-[120px] flex justify-between flex-grow border border-slate-400 p-2 px-4 rounded ">
          <div className="flex flex-col">
            {t.assignedUsers.map((tUser, index) => (
              <div key={index} className="flex flex-row items-center my-1">
                <div className="flex flex-row items-center">
                  <div
                    style={{ textTransform: "capitalize" }}
                    className="text-xs font-bold mr-2"
                  >
                    {tUser.role}
                  </div>
                  <div className="flex items-center">
                    <UserAvatar tUser={tUser} />
                    <div className="flex flex-col ml-[37px]">
                      <div className="text-sm font-[600]">
                        {tUser.user.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {tUser.user.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    [t]
  );
  return (
    <div className={`bg-neutral flex w-full flex-col justify-center px-4 `}>
      {/* :Dialog */}
      <Dialog
        open={statusChangeConfirmation}
        onClose={handleConfirmationialogClose}
      >
        <DialogTitle className="text-sm">
          Are you sure you want to continue?
        </DialogTitle>
        <DialogContent className="text-xs">
          Confirming this will change the Task status. Please review your work
          before submitting.
        </DialogContent>
        <DialogActions>
          <div
            style={{ width: "120px" }}
            onClick={handleConfirmationialogClose}
            className="border border-slate-800 rounded hover:bg-slate-100 cursor-pointer h-7 flex items-center justify-center text-xs"
          >
            Cancel
          </div>
          <div
            style={{ width: "120px" }}
            onClick={submitStatusChange}
            className="bg-slate-800 hover:bg-slate-700 rounded flex text-white cursor-pointer h-7 justify-center items-center text-xs"
          >
            Confirm
          </div>
        </DialogActions>
      </Dialog>

      {/* :Drawer */}
      <Drawer anchor="right" open={showDetails} onClose={handleClose}>
        <div className="h-screen flex flex-col w-[540px]">
          {/* <SectionHeading
            text="Task Details"
            style={{
              backgroundColor: urgencies.filter((u) => u.value === t.urgency)[0]
                .color.backgroundColor,
              color: urgencies.filter((u) => u.value === t.urgency)[0].color
                .color,
              margin: "0 0",
            }}
            className=" px-2 pt-4"
            icon={<InfoOutlined fontSize="small" />}
          /> */}
          <div className="flex mt-4 items-center rounded-lg mx-2">
            <div className="text-2xl flex flex-wrap gap-2 items-center font-bold px-2 py-2 text-wrap break-words">
              {t.title}
              <div className="flex items-center scale-90">
                <div
                  className="text-xs font-light items-center gap-1 h-6 px-2 flex justify-center rounded-md"
                  style={{
                    ...urgencies.filter((u) => u.value === t.urgency)[0].color,
                    borderColor: urgencies.filter(
                      (u) => u.value === t.urgency
                    )[0].color.color,
                    borderWidth: "1px",
                  }}
                >
                  {/* <div className="scale-75">
                    {urgencies.filter((u) => u.value === t.urgency)[0].icon}
                  </div> */}
                  {urgencies.filter((u) => u.value === t.urgency)[0].label}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mx-4 gap-1">
            <div className="text-xs text-start w-[60px] text-slate-400">
              People
            </div>
            <div className="w-[120px] px-4 py-1 flex justify-between flex-grow">
              <div className="flex items-center">
                <UserAvatar
                  tUser={{
                    id: t.assignedBy.id,
                    role: "assigne",
                    user: t.assignedBy,
                  }}
                  left={`0px`}
                />
                <ArrowForward
                  fontSize="small"
                  sx={{
                    color: "gray",
                    position: "relative",
                    left: "30px",
                  }}
                />
                {t.assignedUsers.map((u, index) => (
                  <UserAvatar
                    key={index}
                    tUser={t.assignedUsers[index]}
                    id={u.user.id}
                    left={`${index * 17 + 30}px`}
                  />
                ))}
              </div>
              <div>
                <IconButton onClick={handleExpandPeople}>
                  <InfoOutlined
                    fontSize="small"
                    className="scale-90 cursor-pointer"
                  />
                </IconButton>
              </div>
            </div>
          </div>
          {expandPeople && <ExpandPeople />}

          <div className="flex items-center mx-4 mt-2 gap-1">
            <div className="text-xs text-start w-[60px] mr-4 pr-2 text-slate-400">
              Timeline
            </div>
            <div className="text-xs bg-slate-200 h-7 flex items-center justify-center px-2 rounded">
              {new Date(t.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </div>
            <ArrowForward fontSize="small" sx={{ color: "gray" }} />
            <div className="text-xs bg-slate-200 h-7 flex items-center justify-center px-2 rounded">
              {new Date(t.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </div>
          </div>
          <div className="flex items-center mt-4 mx-4 gap-2">
            <div className="text-xs text-start mr-3 w-[60px] text-slate-400">
              Business
            </div>
            <div className="w-[120px]">
              {t.vertices.length !== 0 ? (
                <div className="h-7 flex items-center justify-between text-xs rounded-full border text-[#13495b] border-slate-400">
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center text-white bg-slate-600 rounded-full w-5 h-5 text-xs">
                      {t.vertices[0].name[0]}
                    </div>
                    <div className="mr-2 text-ellipsis text-nowrap line-clamp-1">
                      {t.vertices[0].name}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center mx-4 mt-4 gap-2">
            <div className="text-xs text-start w-[60px] mr-3 text-slate-400">
              Status
            </div>
            {["To Initiate", "In Progress", "Completed", "On Hold"].map(
              (s, i) => (
                <div
                  key={i}
                  className={`font-normal flex items-center justify-center hover:bg-slate-200 cursor-pointer h-7 w-24 text-[12px] rounded-md ${
                    t.status === s.replace(" ", "_").toLowerCase()
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : ""
                  } border border-slate-600`}
                  onClick={() => handleStatusChange(s)}
                >
                  {s}
                </div>
              )
            )}
          </div>
          {/* :Tab */}
          <div className="flex h-12 mx-4 font-bold justify-between items-center mt-4 text-sm">
            <div
              className={`flex-grow h-12 flex border-b cursor-pointer items-center border-slate-200`}
            >
              <div className="flex gap-2">
                {selectedTab === 0 && "Info"}
                {selectedTab === 1 && "Comment"}
                {selectedTab === 2 && "Attachment"}
                {selectedTab === 3 && "Log"}
              </div>
            </div>
            <div className="flex h-12 w-[50%] items-center text-center">
              <div
                className={`flex-grow flex h-12 justify-center border-b cursor-pointer items-center hover:bg-slate-200 ${
                  selectedTab === 0
                    ? " border-slate-800 bg-slate-100 "
                    : "border-slate-200"
                }`}
                onClick={() => setSelectedTab(0)}
              >
                <InfoOutlined fontSize={"small"} />
              </div>
              <div
                className={`flex-grow flex h-12 justify-center border-b cursor-pointer items-center hover:bg-slate-200 ${
                  selectedTab === 1
                    ? " border-slate-800 bg-slate-100 "
                    : "border-slate-200"
                }`}
                onClick={() => setSelectedTab(1)}
              >
                <CommentIcon fontSize={"small"} />
              </div>
              <div
                className={`flex-grow flex h-12 justify-center border-b cursor-pointer items-center hover:bg-slate-200 ${
                  selectedTab === 2
                    ? "border-slate-800 bg-slate-100"
                    : "border-slate-200"
                }`}
                onClick={() => setSelectedTab(2)}
              >
                <Attachment fontSize={"small"} />
              </div>
              <div
                className={`flex-grow flex h-12 justify-center border-b cursor-pointer items-center hover:bg-slate-200 ${
                  selectedTab === 3
                    ? " border-slate-800  bg-slate-100"
                    : "border-slate-200"
                }`}
                onClick={() => setSelectedTab(3)}
              >
                <History fontSize={"small"} />
              </div>
            </div>
          </div>
          {selectedTab === 0 ? (
            <div className="flex flex-col mx-2">
              <div className="flex text-sm items-center my-2 mx-2">
                {/* <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
                  Description
                </div> */}
                <div className="text-md font-normal overflow-y-auto border-gray-400 text-slate-600 border-l-[1px] px-4 py-1 text-wrap break-words">
                  {t.description}
                </div>
              </div>
            </div>
          ) : null}
          {selectedTab === 1 ? (
            <Comments
              sendComment={sendComment}
              setCurrComment={setCurrComment}
              curComment={curComment}
              comments={comments}
            />
          ) : null}

          {selectedTab === 2 ? (
            <div className="flex flex-wrap gap-2 px-4 py-2 pb-[100px]">
              {t.attatchments.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center px-2 border rounded py-2 gap-2"
                >
                  <div>
                    <Tooltip className="cursor-pointer" title={a.user.name}>
                      <div className="flex items-center justify-center w-8 h-8 bg-slate-600 text-white rounded-full">
                        {a.user.name[0]}
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex flex-col max-w-[100px] flex-grow h-full">
                    <div className="text-sm text-slate-800 font-[500] text-ellipsis line-clamp-1">
                      {a.name}
                    </div>
                    <div className="text-xs text-slate-400 font-light">
                      {a.name.split(".")[1]}
                    </div>
                  </div>
                  <div>
                    <IconButton href={a.url} download size="medium">
                      <Download />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {selectedTab === 2 ? (
          <div className="absolute flex flex-col bg-white border w-[540px] bottom-0">
            <div className="flex gap-2 px-2 overflow-x-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="h-16 w-36 my-2 flex justify-between border border-slate-500 rounded-md px-2 py-1 "
                >
                  <div className="flex flex-col w-24 text-xs font-bold text-ellipsis line-clamp-2 whitespace-nowrap overflow-hidden">
                    {file.name}
                    <div className="text-xs font-normal">
                      {formatSizeInBytes(file.size)}
                    </div>
                  </div>
                  <div>
                    <Cancel
                      className="cursor-pointer"
                      fontSize="small"
                      onClick={() => {
                        setFiles((prev) =>
                          prev.filter((file) => file.name !== files[index].name)
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* :FileInput */}
            <div className="flex items-center justify-between gap-2 px-2">
              <Tooltip title="Attach File">
                <label
                  htmlFor="attatchment-add-button"
                  className="h-12 w-14 flex items-center justify-center cursor-pointer hover:bg-slate-200"
                >
                  <input
                    id="attatchment-add-button"
                    hidden
                    type="file"
                    onChange={(e) => {
                      if (e.target && e.target.files?.length === 0) return;
                      const newFiles: File[] = [];
                      for (let i = 0; i < e.target.files!.length; i++) {
                        newFiles.push(e.target.files!.item(i)!);
                      }
                      console.log(newFiles);
                      setFiles((prev) => [...prev, ...newFiles]);
                    }}
                  />
                  {/* <Add fontSize="small" className="flex-grow" />
                <div className="text-xs font-semibold flex-grow">
                Add Attachment
                </div> */}
                  <Attachment />
                </label>
              </Tooltip>

              <div className="w-[60px] group">
                <IconButton onClick={() => addAttachment()}>
                  <Upload fontSize="medium" className="" />
                </IconButton>
              </div>
            </div>
          </div>
        ) : null}

        {/* :CommentInput */}
        {selectedTab === 1 ? (
          <div className="absolute bg-white border w-[540px] bottom-0">
            <div className="px-2 flex items-center">
              <div className="" />
              <TextInput
                hint="Enter your comment"
                label="Comment"
                className="border-white mt-2 "
                value={curComment}
                onChange={(e) => setCurrComment(e.target.value)}
              />
              <div className="w-[60px] group">
                <IconButton onClick={() => sendComment()}>
                  <Send fontSize="medium" className="" />
                </IconButton>
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>

      {/* :Row */}
      <div className="flex h-16 w-full items-center justify-between font-bold">
        <div className="w-[200px] text-sm">
          <div className="w-[180px] line-clamp-1 text-ellipsis">{t.title}</div>
          <div className="font-light w-[200px] text-slate-600 text-xs text-ellipsis line-clamp-1 ">
            {t.description}
          </div>
        </div>

        <div className="flex items-center">
          {/* :Col2 */}
          <div className="w-[130px] font-[500] text-slate-500 text-xs">
            {new Date(t.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "short",
            })}
          </div>
          {/* :Col3 */}
          <div className="w-[120px]">
            <div
              className="text-xs font-light items-center gap-1 h-7 w-24 flex justify-center rounded-md"
              style={{
                ...urgencies.filter((u) => u.value === t.urgency)[0].color,
              }}
            >
              <div className="scale-75">
                {urgencies.filter((u) => u.value === t.urgency)[0].icon}
              </div>
              {urgencies.filter((u) => u.value === t.urgency)[0].label}
            </div>
          </div>
          {/* :Col4 */}
          <div className="w-[120px] flex items-center">
            <div
              className={`font-normal capitalize flex items-center justify-center h-7 w-24 text-[12px] rounded-md border border-slate-600`}
            >
              {t.status.replace("_", " ")}
            </div>
          </div>
          <div className="w-[120px] flex">
            {t.vertices.length !== 0 ? (
              <div className="h-7 flex items-center justify-between text-xs rounded-full border text-[#13495b] border-slate-400">
                <div className="flex items-center">
                  <div className="mx-1 flex items-center rounded-full bg-slate-600 text-white justify-center w-5 h-5 text-xs">
                    {t.vertices[0].name[0]}
                  </div>
                  <div className="mr-2 text-ellipsis text-nowrap line-clamp-1">
                    {t.vertices[0].name}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex w-[180px] items-center justify-center">
            <UserAvatar
              tUser={{
                id: t.assignedBy.id,
                role: "assigne",
                user: t.assignedBy,
              }}
              left={`-30px`}
            />
            <ArrowForward fontSize="small" sx={{ color: "gray" }} />
            {t.assignedUsers.slice(0, 3).map((u, index) =>
              index < 2 || (index === 2 && t.assignedUsers.length === 3) ? (
                <UserAvatar
                  key={index}
                  tUser={t.assignedUsers[index]}
                  id={u.user.id}
                  left={`${index * 17}px`}
                />
              ) : (
                <div key={index} className="relative flex items-center">
                  <Tooltip title={`${u.role} ${u.user.name} & Others`}>
                    <div
                      style={{
                        left: `${index * 17}px`,
                      }}
                      className={`absolute rounded-full flex items-center justify-center text-xs bg-gray-500 border border-white
              text-white w-7 h-7 shadow-md cursor-pointer transform transition-transform ease-out-cubic hover:scale-110 hover:z-10`}
                    >
                      +{t.assignedUsers.length - 3}
                    </div>
                  </Tooltip>
                </div>
              )
            )}
          </div>
          <div className="flex gap-2 w-[140px]">
            <IconButton onClick={handleSubAdd}>
              <Add sx={{ color: "#1e293b" }} />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <InfoOutlined sx={{ color: "#1e293b" }} />
            </IconButton>
            <IconButton sx={{ color: "#1e293b" }}>
              <KeyboardArrowDown />
            </IconButton>
          </div>
        </div>
      </div>

      {/* :Subtasks */}
      {expandSubs && <CreateSubTaskCard t={t} />}
    </div>
  );
};

const CreateSubTaskCard = ({ t }: { t: Task }) => {
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
  const [urgency, setUrgency] = useState<string>("normal");
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
  return (
    <div className="w-full flex flex-col border-l border-primary mb-4 px-4">
      <div className="flex gap-2">
        <TextInput
          label="Title"
          hint="Enter Title"
          className="border-white border-b-disabled rounded-none"
        />
        <TextInput
          label="Description"
          hint="Enter Description"
          className="border-white border-b-disabled rounded-none"
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
        <div className="h-10 flex-grow bg-primary rounded text-white font-[500] flex items-center text-sm cursor-pointer justify-center">
          Submit
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
