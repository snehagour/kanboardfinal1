import React, { useEffect, useState, useRef } from "react";
import style from "./AddTodo.module.css";
import AddIcon from "@mui/icons-material/Add";
import RollerShadesClosedOutlinedIcon from "@mui/icons-material/RollerShadesClosedOutlined";
import AddItem from "../../atoms/add_item/AddItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { v4 as uuid } from "uuid";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import {
  uidOfListItem,
  atomListUid,
  atomCardName,
} from "../../recoil/description_atoms/DescriptionAtoms";
import { useRecoilState } from "recoil";
import { list } from "../../recoil/description_atoms/DescriptionAtoms";
import { getData } from "../../utils/Services";
import MorePopOver from "./more/More";
import { Draggable, Droppable } from "react-beautiful-dnd";

function AddTodo({ listName, listId, handleDelete, index }) {
  const [listData, setListData] = useRecoilState(list);

  let data = getData();
  let tasks = [];
  let currentList = listData.find((ele) => ele.ListId == listId);
  if (currentList != undefined) {
    tasks = currentList.tasks ? currentList.tasks : [];
  }

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [todoname, setTodoName] = useState(listName);
  const [isShow, setIsShow] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [uidOfListItem1, setUidOfListItem1] = useRecoilState(uidOfListItem);
  const [updatedNameOfCardItem, setUpdatedNameOfCardItem] = useState("");
  const [todoList, setTodoList] = useState(tasks);
  const [cardName, setCardName] = useRecoilState(atomCardName);
  const [currentListUid, setCurrentListUid] = useRecoilState(atomListUid);

  useEffect(() => {
    setTodoList(tasks);
  }, [listData]);

  const handleOpenAddItemBox = () => {
    setAddItem(true);
  };
  const handleAddCardItem = (nameOfCardItem) => {
    const currentTime = new Date().toLocaleString();
    const tempDataOfCard = {
      cardItemId: uuid(),
      nameOfCardItem: nameOfCardItem,
      description: "",
      activity: [
        {
          text: `${nameOfCardItem} added to ${listName}`,
          time: currentTime,
        },
      ],
    };
    let tempListData = listData.map((list) => {
      if (list.ListId == listId) {
        return {
          ListId: list.ListId,
          nameOfList: list.nameOfList,
          tasks: [...todoList, tempDataOfCard],
        };
      }
      return list;
    });

    setTodoList([...todoList, tempDataOfCard]);
    setListData([...tempListData]);
  };

  const handleUpdationOfCartItem = (id, close) => {
    //!stop
    if (updatedNameOfCardItem != "") {
      const tempTodoItem = todoList.map((item) => {
        if (item.cardItemId == id) {
          return {
            ...item,
            nameOfCardItem: updatedNameOfCardItem,
          };
        }
        return item;
      });

      let tempListData = listData.map((list) => {
        if (list.ListId == listId) {
          return {
            ListId: list.ListId,
            nameOfList: list.nameOfList,
            tasks: [...tempTodoItem],
          };
        }
        return list;
      });
      setTodoList([...tempTodoItem]);
      setListData([...tempListData]);
      close();
    }
  };
  useEffect(() => {
    if (isShow) {
      inputRef.current.focus();
    }
  }, [isShow]);
  function handleChange() {
    //Changing the name of the list
    setIsShow(false);
    const update = [...listData];
    const index = update.findIndex((ele) => ele.ListId == listId);
    const updatedObj = { ...update[index] };
    updatedObj.nameOfList = todoname;
    update[index] = updatedObj;
    setListData(update);
  }
  function handleCardItemDelete(id) {
    let updateList = [...listData];
    const index = updateList.findIndex((ele) => ele.ListId == listId);
    let currentList = { ...updateList[index] };
    const updatedTasks = currentList.tasks.filter(
      (ele) => ele.cardItemId != id
    );
    currentList.tasks = updatedTasks;
    updateList[index] = currentList;
    setListData(updateList);
    setTodoList(updatedTasks);
  }
  return (
    <Draggable
      draggableId={listId}
      index={index}
      key={listId}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            marginLeft: "20px",
            ...provided.draggableProps.style,
          }}
        >
          <Droppable droppableId={listId} key={listId}>
            {(provided, snapshot) => (
              <div
                className={style.mainCardDiv}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <header>
                  <div>
                    {isShow ? (
                      <form onSubmit={handleChange}>
                        <input
                          ref={inputRef}
                          className={style.todoNameField}
                          type="text"
                          placeholder={listName}
                          onChange={(e) => setTodoName(e.target.value)}
                        />
                      </form>
                    ) : (
                      <span onClick={() => setIsShow(!isShow)}>{listName}</span>
                    )}
                  </div>
                  <div>
                    <MorePopOver func={handleDelete} name={todoname} />
                  </div>
                </header>
                <section>
                  {todoList.map((todoList, index) => (
                    <Draggable
                      draggableId={todoList.cardItemId}
                      index={index}
                      key={todoList.cardItemId}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={style.itemOfCardDiv}
                          key={todoList.cardItemId}
                        >
                          <div
                            className={style.cardTitle}
                            onClick={() => {
                              setUidOfListItem1(todoList.cardItemId);
                              setCurrentListUid(listId);
                              localStorage.setItem("itemid", listId);
                              localStorage.setItem(
                                "uidOfListItem",
                                todoList.cardItemId
                              );
                              localStorage.setItem(
                                "cardName",
                                todoList.nameOfCardItem
                              );
                              const test = todoList.cardItemId;
                              setCardName(todoList.nameOfCardItem);
                              navigate(`/task/:${test}`);
                            }}
                          >
                            {todoList.nameOfCardItem}
                          </div>

                          <div className={style.btnWrapper}>
                            <Popup
                              trigger={
                                <div>
                                  <button className={style.editBtn}>
                                    <EditOutlinedIcon fontSize="5px" />
                                  </button>
                                </div>
                              }
                              position="bottom center"
                            >
                              {(close) => (
                                <div className={style.cardItemUpdationDiv}>
                                  <div>
                                    <textarea
                                      className={style.titleForItemField}
                                      type="text"
                                      placeholder={todoList.nameOfCardItem}
                                      value={updatedNameOfCardItem}
                                      rows={3}
                                      onChange={(e) =>
                                        setUpdatedNameOfCardItem(e.target.value)
                                      }
                                    ></textarea>
                                  </div>
                                  <div>
                                    <button
                                      onClick={() =>
                                        handleUpdationOfCartItem(
                                          todoList.cardItemId,
                                          close
                                        )
                                      }
                                      className={style.updateCardItemBtn}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Popup>

                            <button
                              className={style.dltBtn}
                              onClick={() =>
                                handleCardItemDelete(todoList.cardItemId)
                              }
                            >
                              ❌
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </section>

                <footer>
                  <div>
                    {addItem && (
                      <AddItem
                        setAddItem={setAddItem}
                        handleAddCardItem={handleAddCardItem}
                      />
                    )}
                  </div>
                  {!addItem && (
                    <div className={style.addCartItem}>
                      <div>
                        <button
                          onClick={handleOpenAddItemBox}
                          className={style.addCardBtn}
                        >
                          <AddIcon
                            sx={{ marginBottom: "-5px", paddingRight: "4px" }}
                            fontSize="small"
                            color="#B7BCC7"
                          />
                          Add a card
                        </button>
                      </div>
                      <div>
                        <RollerShadesClosedOutlinedIcon
                          fontSize="small"
                          color="disabled"
                        />
                      </div>
                    </div>
                  )}
                </footer>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default AddTodo;
