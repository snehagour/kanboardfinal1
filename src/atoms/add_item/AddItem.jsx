import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import style from "./AddItem.module.css";
import Swal from "sweetalert2";

function AddItem({ setAddItem, handleAddCardItem }) {
  const [titleForCard, setTitleForCard] = useState("");

  const handleCloseAddCard = () => {
    setAddItem(false);
  };
  const AddCardItem = () => {
    
    if (titleForCard != "") {
      handleAddCardItem(titleForCard);
      setTitleForCard("");
    }
    else {
      Swal.fire("Please enter a task")
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div>
        <textarea
          className={style.titleForItemField}
          type="text"
          placeholder="Enter a title for this card..."
          value={titleForCard}
          rows={3}
          onChange={(e) => setTitleForCard(e.target.value)}
        ></textarea>
      </div>
      <div className={style.addCardFooter}>
        <div>
          <button onClick={() => AddCardItem()} className={style.addCardBtn}>
            Add card
          </button>
          <CloseOutlinedIcon
            onClick={handleCloseAddCard}
            sx={{ marginBottom: "-8px", marginLeft: "7px",cursor:'pointer' }}
            color="disabled"
          />
     
        </div> 
        <div>
          <MoreHorizIcon color="disabled" />
        </div>
      </div>
    </div>
  );
}

export default AddItem;
