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
  const resetName = () => setAdd({ name: "" });
  return (
    <div className={`add-player-card ${type}`}>
      {type === "normal" ? (
        <>
          <div className="name">{name}</div>
          {/* <button className="delete" onClick={() => handleRemovePlayer(id)}>-</button> */}
          <Button
            text="-"
            additionalClasses="delete"
            click={() => handleRemovePlayer(id)}
          />
        </>
      ) : (
        <>
          <input type="text" value={add.name} onChange={e => handleChange(e)} />
          {/* <button
            className="add-new"
            onClick={() => handleAddPlayer(add.name, resetName)}
          >
            +
          </button> */}
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
