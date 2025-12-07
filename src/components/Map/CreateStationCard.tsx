import { useState, useRef } from "react";

interface CreateStationCardProps {
  onCancel: () => void;
  onCreate: () => void;
}

const AVAILABLE_TOOLS = [
  "Tire Pump",
  "Multi-tool",
  "Chain Lubricant",
  "Patch Kit",
  "Tire Levers",
  "Hex Keys",
  "Screwdriver",
  "Chain Tool",
];

function CreateStationCard({ onCancel, onCreate }: CreateStationCardProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>(AVAILABLE_TOOLS[0]);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleAddTool = () => {
    if (selectedTool && !selectedTools.includes(selectedTool)) {
      setSelectedTools([...selectedTools, selectedTool]);
    }
  };

  const handleRemoveTool = (toolToRemove: string) => {
    setSelectedTools(selectedTools.filter((tool) => tool !== toolToRemove));
  };

  return (
    <div className="absolute top-20 left-4 z-20">
      <div className="card bg-base-100 w-96 shadow-lg">
        <div className="card-body p-0">
          <h2 className="card-title px-6 pt-6">Create New Bike Station</h2>

          <button
            onClick={onCancel}
            className="btn btn-sm btn-square btn-ghost absolute top-2 right-2"
            aria-label="Close"
          >
            ✕
          </button>

          <div>
            <ul className="list">
              <li className="px-6 pt-4 pb-2 text-xs tracking-wide opacity-60">
                Available Tools
              </li>

              {selectedTools.map((tool, idx) => (
                <li
                  key={idx}
                  className="list-row flex items-center gap-2 px-6 py-2"
                >
                  <div className="flex-1">{tool}</div>
                  <button
                    onClick={() => handleRemoveTool(tool)}
                    className="btn btn-sm btn-square btn-soft btn-error"
                  >
                    ✕
                  </button>
                </li>
              ))}

              <li className="list-row flex items-center gap-2 px-6 py-2">
                <details ref={dropdownRef} className="dropdown flex-1">
                  <summary className="btn btn-sm w-full justify-start">
                    {selectedTool}
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full shadow-lg">
                    {AVAILABLE_TOOLS.filter(
                      (tool) => !selectedTools.includes(tool)
                    ).map((tool) => (
                      <li key={tool}>
                        <a
                          onClick={() => {
                            setSelectedTool(tool);
                            if (dropdownRef.current) {
                              dropdownRef.current.open = false;
                            }
                          }}
                        >
                          {tool}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
                <button
                  onClick={handleAddTool}
                  className="btn btn-sm btn-square btn-soft btn-success"
                >
                  +
                </button>
              </li>
            </ul>
          </div>

          <div className="card-actions mt-4 justify-end px-6 pb-6">
            <button
              onClick={onCreate}
              className="btn btn-sm btn-soft btn-primary"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStationCard;
