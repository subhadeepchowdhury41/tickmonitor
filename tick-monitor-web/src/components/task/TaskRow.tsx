/* eslint-disable react-hooks/exhaustive-deps */
import { urgencies } from "@/lib/utils/consts";
import UserAvatar from "../user/UserAvatar";
import {
  Add,
  ArrowForward,
  Comment as CommentIcon,
  InfoOutlined,
  KeyboardArrowDown,
  Send,
  SendOutlined,
  SendRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Task } from "@/lib/types/task.type";
import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import { Comment } from "@/lib/types/comment-app.type";
import axios from "axios";
import TextInput from "../ui/form/TextInput";
import { useAuth } from "@/contexts/AuthContext";

const TaskRow = ({ t }: { t: Task }) => {
  const auth = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [expandPeople, setExpandPeople] = useState(false);
  const [statusChangeConfirmation, setStatusChangeConfirmation] =
    useState(false);
  const [statusChangeTo, setStatusChangeTo] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [curComment, setCurrComment] = useState<string>("");
  const [attatchments, setAttatchments] = useState([]);
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
    await axios.put(`/api/tasks/${t.id}`).then((res) => {
      if (res.data.success) {
        setStatusChangeConfirmation(false);
      }
    });
  };
  useEffect(() => {
    if (showDetails) {
      fetchDetails();
    }
  }, [showDetails]);
  return (
    <div className="h-16 border my-1 rounded-md flex items-center font-bold px-4 shadow-sm justify-between">
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
            className="bg-slate-800 hover:bg-slate-700 rounded flex text-white cursor-pointer h-7 justify-center items-center text-xs"
          >
            Confirm
          </div>
        </DialogActions>
      </Dialog>
      <Drawer anchor="right" open={showDetails} onClose={handleClose}>
        <SectionHeading
          text="Task Details"
          style={{
            backgroundColor: urgencies.filter((u) => u.value === t.urgency)[0]
              .color.backgroundColor,
            color: urgencies.filter((u) => u.value === t.urgency)[0].color
              .color,
          }}
          className="mx-0 px-4 mt-0 pt-4"
          icon={<InfoOutlined fontSize="small" />}
        />
        <div className="flex flex-col w-[540px] mx-4">
          <div className="flex mt-4 items-center">
            <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
              Title
            </div>
            <div className="text-md font-bold">{t.title}</div>
          </div>
          <div className="flex text-sm mt-1">
            <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
              Description
            </div>
            <div className="text-slate-600">{t.description}</div>
          </div>
          <div className="flex items-center mt-4 gap-1">
            <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
              Date
            </div>
            <div className="text-xs bg-slate-200 p-2 rounded">
              {new Date(t.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </div>
            <ArrowForward fontSize="small" sx={{ color: "gray" }} />
            <div className="text-xs bg-slate-200 p-2 rounded">
              {new Date(t.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </div>
          </div>
          <div>
            <div className="flex items-center mt-4 gap-1">
              <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
                Business
              </div>
              <div className="w-[120px]">
                {t.vertices.length !== 0 ? (
                  <div className="h-7 flex items-center justify-between text-xs rounded-full border text-[#13495b] border-slate-400">
                    <div className="flex items-center">
                      <Avatar className="mx-1 w-5 h-5 text-xs">
                        {t.vertices[0].name[0]}
                      </Avatar>
                      <div className="mr-2 text-ellipsis text-nowrap line-clamp-1">
                        {t.vertices[0].name}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
                Urgency
              </div>
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
            </div>
            <div className="flex items-center mt-4 gap-1">
              <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
                People
              </div>
              <div className="w-[120px] flex justify-between flex-grow">
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
                    sx={{ color: "gray", position: "relative", left: "30px" }}
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

            {expandPeople && (
              <div className="flex items-center mt-4 gap-1">
                <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600"></div>
                <div className="w-[120px] flex justify-between flex-grow border border-slate-400 p-2 px-4 rounded ">
                  <div className="flex flex-col">
                    {t.assignedUsers.map((tUser, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center my-1"
                      >
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
            )}
            <div className="flex items-center mt-4 gap-1">
              <div className="text-xs text-end font-bold w-[80px] mr-4 pr-2 border-r border-slate-600 text-slate-600">
                Status
              </div>
              {["Is Initiated", "In Progress", "Completed", "On Hold"].map(
                (s, i) => (
                  <div
                    key={i}
                    className={`font-normal flex items-center justify-center hover:bg-slate-200 cursor-pointer h-7 w-24 text-[12px] rounded-md ${
                      t.status === s || i === 1
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
            <SectionHeading
              text="Comments"
              icon={<CommentIcon fontSize="small" />}
            />
            {comments.length === 0 ? (
              <div className="w-full text-center text-xs text-slate-400 mt-10">
                There is no commets so far
              </div>
            ) : null}
            {comments
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((comment, index) => {
                const separate =
                  index === 0 ||
                  comment.user.id !== comments[index - 1].user.id ||
                  new Date(comment.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) !==
                    new Date(comments[index - 1].createdAt).toLocaleString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    );
                return (
                  <div key={index} className="flex flex-col">
                    {separate && (
                      <div className="w-full text-center text-xs text-slate-400 mt-6">
                        {new Date(comment.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    )}
                    <div
                      className={`flex items-center justify-between mx-2 ${
                        separate ? "mt-4" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {separate ? (
                          <Tooltip title={comment.user.name}>
                            <div className="rounded-full cursor-pointer w-8 h-8 bg-slate-800 flex items-center justify-center text-white">
                              {comment.user!.name[0]}
                            </div>
                          </Tooltip>
                        ) : (
                          <div className="w-8" />
                        )}
                        <div className="flex flex-col ">
                          {separate && (
                            <div className="text-xs text-slate-600">
                              {comment.user!.name}
                            </div>
                          )}
                          <div className="bg-slate-200 px-2 py-1 mt-1 rounded">
                            <div className="text-sm font-[500]">
                              {comment.content}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(comment.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="mx-2 mt-10 flex items-center">
              <div className="" />
              <TextInput
                hint="Enter your comment"
                label="Comment"
                className="border-white mt-2 mb-4"
                value={curComment}
                onChange={(e) => setCurrComment(e.target.value)}
              />
              <div className="w-[60px] group">
                <IconButton onClick={sendComment}>
                  <Send fontSize="medium" className="" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      {/* :Col1 */}
      <div className="w-[230px] text-sm">
        {t.title}
        <div className="font-light text-slate-600 text-xs text-ellipsis line-clamp-1 ">
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
            className={`font-normal flex items-center justify-center h-7 w-24 text-[12px] rounded-md border border-slate-600`}
          >
            Is Initiate
          </div>
        </div>
        <div className="w-[120px] flex">
          {t.vertices.length !== 0 ? (
            <div className="h-7 flex items-center justify-between text-xs rounded-full border text-[#13495b] border-slate-400">
              <div className="flex items-center">
                <Avatar className="mx-1 w-5 h-5 text-xs">
                  {t.vertices[0].name[0]}
                </Avatar>
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
          {t.assignedUsers.map((u, index) => (
            <UserAvatar
              key={index}
              tUser={t.assignedUsers[index]}
              id={u.user.id}
              left={`${index * 17}px`}
            />
          ))}
        </div>
        <div className="flex gap-2 w-[120px]">
          <IconButton>
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
  );
};

export default TaskRow;
