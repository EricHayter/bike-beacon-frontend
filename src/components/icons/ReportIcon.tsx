import { SVGProps } from 'react';

function ReportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="size-[1.5em]"
      strokeWidth="2"
      {...props}
    >
      <path
        d="M12 6v8m0 4h.01"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ReportIcon;
