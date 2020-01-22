import React, { useState } from "react";
import Button from "./Button";

const AddPlayerCard = ({
  type = "normal",
  name,
  id,
  handleAddPlayer,
  handleRemovePlayer
}) => {
  const [add, setAdd] = useState({
    name: ""
  });
  const handleChange = e => {
    const name = e.target.value;
    setAdd({ name });
  };
  const handleKeyDown = e => {
    if (e.which === 13) {
      e.preventDefault();
      handleAddPlayer(add.name, resetName);
    }
  };

  const resetName = () => setAdd({ name: "" });
  return (
    <div className={`add-player-card ${type}`}>
      {type === "normal" ? (
        <>
          <div className="name">{name}</div>
          <Button
            text="-"
            additionalClasses="delete"
            click={() => handleRemovePlayer(id)}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            value={add.name}
            onChange={e => handleChange(e)}
            onKeyDown={e => handleKeyDown(e)}
          />
          <Button
            text="+"
            additionalClasses="add-new"
            click={() => handleAddPlayer(add.name, resetName)}
          />
        </>
      )}
    </div>
  );
};
export default AddPlayerCard;
