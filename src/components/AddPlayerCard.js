import React, { useState } from "react";

const AddPlayerCard = ({ type = "normal", name, id, handleAddPlayer, handleRemovePlayer }) => {
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
          <button className="delete" onClick={() => handleRemovePlayer(id)}>-</button>
        </>
      ) : (
        <>
          <input type="text" value={add.name} onChange={e => handleChange(e)} />
          <button
            className="add-new"
            onClick={() => handleAddPlayer(add.name, resetName)}
          >
            +
          </button>
        </>
      )}
    </div>
  );
};
export default AddPlayerCard;
