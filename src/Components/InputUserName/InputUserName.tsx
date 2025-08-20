import React, { useState } from "react";
import "./Styles/InputUserName.css";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function InputUserName({ onSubmit, className, onInputChange }: { onSubmit: (username: string) => void; className?: string; onInputChange?: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const { trackUserSearch } = useAnalytics();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    onInputChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (username.trim()) {
      trackUserSearch(username.trim());
      onSubmit(username);
    }
  };

  return (
    <div id="poda">
      <div className="darkBorderBg" />
      <div className="border" />
      <div className="white" />
      <div className="glow" />
      <div className="searchContainer">
        <div className="searchIcon">
          {/* search icon SVG */}
        </div>
        <input
          className={className}
          type="text"
          placeholder="Enter Chess.com Username"
          value={username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}