import { colorTheme } from "@/lib/utils/colors";
import { Notifications } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Appbar = () => {
  return (
    <>
      <div
        className={`flex-grow h-12 border-slate-200 flex items-center justify-between px-4 bg-primary shadow-lg`}
      >
        <div></div>
        <div className="flex items-center gap-8">
          <IconButton sx={{ color: "white" }} size="small">
            <Notifications fontSize="small" sx={{ color: "white" }} />
          </IconButton>
          <div
            className={`w-8 h-8 ${colorTheme.secondary} rounded-full cursor-pointer`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
