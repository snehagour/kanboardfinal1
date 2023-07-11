import { ShowActivity } from "../../recoil/description_atoms/DescriptionAtoms";
import { useRecoilValue } from "recoil";
import style from "./ActivityList.module.css";
import { getData } from "../../utils/Services";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import {
  list,
  uidOfListItem,
  atomListUid,
} from "../../recoil/description_atoms/DescriptionAtoms";
import PersonIcon from "@mui/icons-material/Person";

function ActivityList() {
  const detailsHide = useRecoilValue(ShowActivity);

  const [uidOfList, setUidOfList] = useRecoilState(uidOfListItem);
  const [currentListUid, setCurrentListUid] = useRecoilState(atomListUid);
  const [todoAction, setTodoAction] = useState("");
  const [tempData, setTempData] = useState(list);

  let listData = getData();
  const listIndex = listData.findIndex((ele) => ele.ListId === currentListUid);
  const cardIndex = listData[listIndex].tasks.findIndex(
    (ele) => ele.cardItemId === uidOfList
  );

  const [time, setTime] = useState(
    listData[listIndex].tasks[cardIndex].activity
  );
  let activityTime = [];
  localStorage.setItem("listData", JSON.stringify(listData));

  useEffect(() => {
    const listIndex = listData.findIndex(
      (item) => item.ListId === currentListUid
    );
    if (listIndex !== -1) {
      const nameOfList = listData[listIndex].nameOfList;
      setTodoAction(nameOfList);
      activityTime = listData[listIndex].tasks[cardIndex].activity;
    }

    setTime(activityTime);
    setTempData(listData);
  }, []);

  return (
    <>
      <div className={style.activityMain}>
        {detailsHide && (
          <div className={style.timeContainer}>
            {/* <PersonIcon /> */}
            <div className={style.activity}>
              {time.map((ele, index) => (
                <div className={style.activityUserDetails} key={index}>
                  <div className={style.userDetails}>
                    <div className={style.users}>
                      <PersonIcon />
                    </div>
                    <div className={style.activityAlign}>
                      <span className={style.activityUser}>User</span>
                      <span className={style.activityUserText}>{ele.text}</span>
                    </div>
                  </div>

                  <div>
                    <span className={style.userTime}>{ele.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ActivityList;
