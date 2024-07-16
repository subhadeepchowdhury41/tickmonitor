import { ArrowRightAlt } from "@mui/icons-material";

const DrawerItem = ({
  label,
  selected,
  icon,
}: {
  label: string;
  selected?: boolean;
  icon: JSX.Element;
}) => {
  return (
    <>
      <div
        className={`w-[94%] h-16 mr-8 flex items-center justify-between pl-8 cursor-pointer rounded-r-full ${
          selected
            ? "text-slate-950 bg-[#DAFFFB] "
            : "text-white border border-transparent  hover:bg-[#ffffff40]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">{icon}</div>
          {label}
        </div>
        <div>
          {selected && (
            <div className="w-12 h-12 mr-2 animate-drawer-arrow-grow rounded-full bg-white flex items-center justify-center shadow-md">
              <ArrowRightAlt />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DrawerItem;
