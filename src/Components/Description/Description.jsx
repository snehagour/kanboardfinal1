import React from "react";
import DescriptionTitle from "../description_title/DescriptionTitle";
import DescriptionEdit from "../description_edit/DescriptionEdit";
import DescriptionComments from "../description_comments/DescriptionComments";
import DescriptionActivity from "../description_activity/DescriptionActivity";
import ActivityList from "../activity_list/ActivityList";
import style from "./Description.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function DescriptionModel() {
  const navigate = useNavigate();
  return (
    <div className={style.descriptionContainer}>
      <div className={style.descriptionMainContainer}>
        <div className={style.close}>
          <DescriptionTitle />
          <CloseIcon
            onClick={() => navigate("/kanban")}
            className={style.iconClose}
          />
        </div>
        <DescriptionEdit />
        <DescriptionActivity />
        <DescriptionComments />
        <ActivityList />
      </div>
    </div>
  );
}

export default DescriptionModel;
