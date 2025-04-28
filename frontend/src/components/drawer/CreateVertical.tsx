import { Dialog } from "@mui/material";
import { useRef, useState } from "react";
import TextInput from "../ui/form/TextInput";
import AutofillInput from "../ui/form/AutofillInput";
import { Cancel } from "@mui/icons-material";
import { useDomain } from "@/contexts/DomainContext";
import axios from "axios";

const CreateVertical = ({
  showAddVertical,
  handleCloseAddVertical,
}: {
  showAddVertical: boolean;
  handleCloseAddVertical: () => void;
}) => {
  const domain = useDomain();
  const [newVerticalName, setNewVerticalName] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const divRef = useRef(null);
  const [selectedVertical, setSelectedVertical] = useState<string[]>([]);

  const handleAddVertical = async () => {
    if (!newVerticalName) return;
    if (!selectedPeople.length) return;
    await axios
      .post("/api/verticals", {
        name: newVerticalName,
        users: selectedPeople,
      })
      .then(async (res) => {
        handleCloseAddVertical();
        setNewVerticalName("");
        setSelectedPeople([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={showAddVertical}
      onClose={handleCloseAddVertical}
    >
      <div className="flex flex-col justify-between px-6 mt-4" ref={divRef}>
        <div className="py-2">
          <div className="text-slate-800 text-2xl font-bold mb-2">
            Add Business Vertical
          </div>
          <TextInput
            label="Name"
            hint="Enter Vertical Name"
            className=""
            value={newVerticalName}
            onChange={(e) => setNewVerticalName(e.target.value)}
          />

          {/* People */}
          <div>
            <AutofillInput
              label="People"
              parentRef={divRef}
              className="mt-2"
              hint="Add People to this Vertical"
              renderSelected={(sel, removeItem, idx) => (
                <div
                  key={idx}
                  className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                >
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center w-5 h-5 text-xs bg-slate-400 rounded-full">
                      {sel.name[0]}
                    </div>
                    <div className="mr-2">{sel.name}</div>
                  </div>
                  <Cancel
                    className="w-6 h-6 cursor-pointer mr-[0.125em]"
                    onClick={() => {
                      removeItem(sel.id);
                      setSelectedPeople((prev) =>
                        prev.filter((f) => f !== sel.id)
                      );
                    }}
                  />
                </div>
              )}
              renderAutofillItem={(item, highlighted, selectItem, index) => (
                <div
                  key={index}
                  onClick={() => {
                    console.log("SELECTED: ", index);
                    selectItem(index);
                  }}
                  className={`flex gap-2 p-2 text-xs hover:bg-slate-400 cursor-pointer ${
                    highlighted
                      ? "bg-slate-400 border-l-2 border-slate-800"
                      : "bg-white"
                  }`}
                >
                  <div className="bg-slate-600 rounded-full text-white w-6 h-6 flex items-center justify-center">
                    {item.name[0]}
                  </div>
                  <div className={`text-xs font-bold`}>
                    {item.name}
                    <div className="text-[10px] font-normal">{item.domain}</div>
                  </div>
                </div>
              )}
              options={
                domain?.users
                  .filter((u) => !selectedPeople.includes(u.id))
                  .map((u) => ({ ...u, domain: "OAB" })) ?? []
              }
              searchMapper={(p: any) => p.name}
              onChange={(curr, full) => {
                console.log(full);
                setSelectedPeople(full.map((t) => t.id));
              }}
            />
          </div>

          {/* Project */}
          <div>
            <AutofillInput
              label="Parent Vertical"
              parentRef={divRef}
              maxItems={1}
              className="mt-2"
              hint="Mention Businesses involved this Task"
              renderSelected={(sel, removeItem, idx) => (
                <div
                  key={idx}
                  className="h-7 flex items-center justify-between text-xs ml-2 rounded-full bg-[#13495b] text-white min-w-[120px] text-ellipsis text-nowrap"
                >
                  <div className="flex items-center">
                    <div className="mx-1 flex items-center justify-center w-5 h-5 text-xs bg-slate-400 rounded-full">
                      {sel.name[0]}
                    </div>
                    <div className="mr-2">{sel.name}</div>
                  </div>
                  <Cancel
                    className="w-6 h-6 cursor-pointer mr-[0.125em]"
                    onClick={() => removeItem(sel.id)}
                  />
                </div>
              )}
              renderAutofillItem={(item, highlighted, selectItem, index) => (
                <div
                  key={index}
                  onClick={() => selectItem(index)}
                  className={`flex gap-2 p-2 items-center hover:bg-slate-400 cursor-pointer ${
                    highlighted
                      ? "bg-slate-400 border-l-2 border-slate-800"
                      : "bg-white"
                  }`}
                >
                  <div className="mx-1 flex items-center justify-center w-7 h-7 text-xs bg-slate-600 text-white rounded-full">
                    {item.name[0]}
                  </div>
                  <div className={`text-sm font-bold `}>
                    {item.name}
                    <div className="text-xs font-normal">{item.name}</div>
                  </div>
                </div>
              )}
              options={domain?.verticals ?? []}
              searchMapper={(p) => p.name}
              onChange={(curr, full) =>
                setSelectedVertical(full.map((v) => v.id))
              }
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 mb-4">
          <div
            style={{ width: "120px" }}
            onClick={handleCloseAddVertical}
            className="border border-slate-800 rounded hover:bg-slate-100 cursor-pointer h-9 flex items-center justify-center text-xs"
          >
            Cancel
          </div>
          <div
            style={{ width: "120px" }}
            onClick={handleAddVertical}
            className="bg-slate-800 hover:bg-slate-700 rounded flex text-white cursor-pointer h-9 justify-center items-center text-xs"
          >
            Add
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateVertical;
