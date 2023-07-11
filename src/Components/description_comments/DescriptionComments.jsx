import { useState } from "react";
import style from "./DescriptionComments.module.css";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { getData } from "../../utils/Services";
import {
  list,
  uidOfListItem,
  atomListUid,
} from "../../recoil/description_atoms/DescriptionAtoms";
import Moment from "react-moment";

import PersonIcon from "@mui/icons-material/Person";

function DescriptionComments() {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const tempList = getData();

  const [currentListUid, setCurrentListUid] = useRecoilState(atomListUid);
  const [listData, setListData] = useRecoilState(list);
  const [uidOfList, setUidOfList] = useRecoilState(uidOfListItem);

  const commentsListIndex = tempList.findIndex(
    (ele) => ele.ListId === currentListUid
  );
  const CommentsCardIndex = tempList[commentsListIndex].tasks.findIndex(
    (ele) => ele.cardItemId === uidOfList
  );

  const currentComment =
    tempList[commentsListIndex].tasks[CommentsCardIndex].comments;
  const [comments, setComments] = useState(currentComment || []);

  function handleComments(e) {
    e.preventDefault();
    if (commentText.trim() === "") {
      return;
    }
    const commentTimeValue = {
      id: new Date(),
      comment: commentText,
      time: new Date().getTime(),
    };

    let updatedComments = [...comments, commentTimeValue];
    setComments(updatedComments);

    const listIndex = tempList.findIndex(
      (ele) => ele.ListId === currentListUid
    );
    const cardIndex = tempList[listIndex].tasks.findIndex(
      (ele) => ele.cardItemId === uidOfList
    );
    tempList[listIndex].tasks[cardIndex].comments = updatedComments;
    localStorage.setItem("listData", JSON.stringify(tempList));
    setListData(tempList);

    setCommentText("");
  }

  function handleDelete(i) {
    let removeItems = comments.filter((element, index) => {
      return index !== i;
    });
    setComments(removeItems);

    const listIndex = tempList.findIndex(
      (ele) => ele.ListId === currentListUid
    );
    const cardIndex = tempList[listIndex].tasks.findIndex(
      (ele) => ele.cardItemId === uidOfList
    );
    tempList[listIndex].tasks[cardIndex].comments = removeItems;
    localStorage.setItem("listData", JSON.stringify(tempList));
  }

  return (
    <>
      <PersonIcon className={style.mainComments} />
      <div className={style.commentContainer}>
        {showComment ? (
          <div className={style.commentTexts}>
            <div className={style.comment}>
              <input
                type="text"
                placeholder="Write a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={style.comments}
              />
            </div>
            <div>
              <Button
                variant="contained"
                sx={{ width: "18%", ml: 4.7 }}
                onClick={handleComments}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className={style.comment}>
            <input
              type="text"
              placeholder="Write a comment..."
              onClick={() => setShowComment(!showComment)}
              className={style.comments}
            />
          </div>
        )}

        {comments.map(
          (comment, index) =>
            comment &&
            comment.comment &&
            comment.comment.trim() !== "" && (
              <div key={comment.id} className={style.commentsContainer}>
                <PersonIcon className={style.mainComment} />
                <small className={style.user}>
                  <span>User</span>{" "}
                  <Moment fromNow className={style.commentsTime}>
                    {comment.time}
                  </Moment>
                </small>
                <div className={style.eachComment}>{comment.comment}</div>
                <div className={style.updateComment}>
                  <small
                    style={{ color: "red" }}
                    onClick={() => handleDelete(index)}
                    className={style.modifyComment}
                  >
                    Delete
                  </small>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default DescriptionComments;
