import { Notifications } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Appbar = () => {
  return (
    <>
      <div className="flex-grow h-20 border-slate-200 flex items-center justify-between px-4 bg-[#0f4658fb]">
        <div></div>
        <div className="flex items-center gap-8">
          <IconButton sx={{color: 'white'}}>
            <Notifications fontSize="large" sx={{ color: "white" }} />
          </IconButton>
          <div className="w-12 h-12 bg-slate-200 rounded-full cursor-pointer"></div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
