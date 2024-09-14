import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-[#53279b] font-medium sm:text-[1.1rem] text-[1rem]" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...props}
        className={`${className} px-3 py-2 outline-none focus:border-[1px] focus:border-[#9e7fd0]  rounded-lg bg-white focus:bg-gray-50 transition-all duration-200 border border-gray-200 w-full placeholder:text-[#ac8fda] text-[#623d9e]`}
        ref={ref}
      />
    </div>
  );
});

export default Input;
