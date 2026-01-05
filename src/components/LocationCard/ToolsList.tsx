import { useState, useEffect } from "react";
import CheckIcon from "../icons/CheckIcon";
import ReportIcon from "../icons/ReportIcon";

interface Tool {
//  Id: string;
//  StationId: string;
  Type: string;
}


function ToolsList({ stationId }: {stationId: string}) {
    const [tools, setTools] = useState<Tool[] | null>(null);
    const [loading, setLoading]  = useState<boolean>(true);
    const [error, setError]  = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchToolData = async () => {
          try {
          // Fetch tools for this specific station
          const toolsRes  = await fetch(`${import.meta.env.VITE_API_URL}/stations/${stationId}/tools`);

          if (!toolsRes.ok) {
            throw new Error('Failed to fetch tools');
          }

          const toolsData = await toolsRes.json();

          setTools(toolsData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };

      fetchToolData();
    }, [stationId]);

    return (
              <div>
                <ul className="list bg-base-100">
                  <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                    Available Tools
                  </li>
                  {loading && <li>loading</li>}
                  {tools && tools.map((tool, idx) => (
                    <li key={idx} className="list-row py-2">
                      <div className="flex flex-1 items-center">{formatToolTypeString(tool.Type)}</div>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-xs btn-soft"
                        >
                          Report
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content card card-sm bg-base-100 z-50 w-64 shadow-lg"
                        >
                          <div className="card-body">
                            <button className="btn btn-soft btn-success btn-sm">
                              <CheckIcon />
                              working
                            </button>
                            <button className="btn btn-soft btn-error btn-sm">
                              <ReportIcon />
                              report
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {error && error}
                </ul>
              </div>
    );
}

function formatToolTypeString(toolType: string) {
  return toolType.replace('_', ' ').toLocaleLowerCase().replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

export default ToolsList;
