interface FileTagProps {
  name: string;
  onClick: () => void;
}

const FileTag = ({ name, onClick }: FileTagProps) => {
  return (
    <div className="flex gap-1.5 p-1 text-neutral-7 border border-neutral-6 rounded-[5px] text-sm items-center">
      {name}
      <svg
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        onClick={onClick}
      >
        <path
          d="M8.85938 9.01562L5.25 5.37891L1.61328 9.01562C1.44922 9.17969 1.17578 9.17969 0.984375 9.01562C0.820312 8.82422 0.820312 8.55078 0.984375 8.38672L4.62109 4.75L0.984375 1.14062C0.820312 0.976562 0.820312 0.703125 0.984375 0.511719C1.17578 0.347656 1.44922 0.347656 1.61328 0.511719L5.25 4.14844L8.85938 0.511719C9.02344 0.347656 9.29688 0.347656 9.48828 0.511719C9.65234 0.703125 9.65234 0.976562 9.48828 1.14062L5.85156 4.75L9.48828 8.38672C9.65234 8.55078 9.65234 8.82422 9.48828 9.01562C9.29688 9.17969 9.02344 9.17969 8.85938 9.01562Z"
          fill="#70707B"
        />
      </svg>
    </div>
  );
};

export default FileTag;
