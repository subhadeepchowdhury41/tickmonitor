import Image from "next/image";
import DashboardIcon from "@/assets/icons/dashboard.png";

const DrawerItem = ({
  label,
  selected,
}: {
  label: string;
  selected?: boolean;
}) => {
  return (
    <>
      <div
        className={`w-[94%] h-16 mr-8 hover:bg-slate-200 flex items-center justify-between pl-8 cursor-pointer rounded-r-full ${
          selected
            ? "text-slate-950 bg-slate-100 "
            : "text-slate-500 border border-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">
            <Image src={DashboardIcon} alt={`${label}-icon`} />
          </div>
          {label}
        </div>
        <div>
          {selected && (
            <div className="w-12 h-12 mr-2 rounded-full bg-white"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default DrawerItem;
