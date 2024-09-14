import React from "react";
import '../styles/button.css'

function Button({
  children, 
  type = "button",
  textColor = "text-white",
  bgColor = "bg-blue-600",
  className = "",
  btntext="",
  ...props
}) {
  return (
    
     <button
      className={`px-4 py-2 rounded-lg button ${textColor} ${bgColor} ${className} glow-button `}
      {...props}
    >
      {children}
        
    </button>
    
    
  );
}

export default Button;
