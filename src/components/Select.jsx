import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id} className="text-[#53279b] font-medium sm:text-[1.1rem] text-[1rem]">{label}</label>}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-[#53279b] outline-none focus:bg-gray-50 duration-200 focus:border-[#9e7fd0] border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
