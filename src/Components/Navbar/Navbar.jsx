import Button from "@mui/material/Button";
import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useRecoilState } from "recoil";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { list } from "../../recoil/description_atoms/DescriptionAtoms";
function Navbar() {
  const [showStar, setShowStar] = useState(true);
  const [showBgChange, setshowBgChange] = useState(true);
  const navigate = useNavigate();
  const [listData, setListData] = useRecoilState(list);
  function handleClearBoard() {
    setListData([]);
    localStorage.removeItem("listData");
  }
  return (
    <>
      <nav className={style.navBar}>
        <div className={style.left}>
          <Button variant="text" onClick={() => navigate("/")}>
            Monday.com
          </Button>
          {showStar ? (
            <Button
              onClick={() => {
                setShowStar(!showStar);
              }}
            >
              <StarBorderIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowStar(!showStar);
              }}
            >
              <StarIcon />
            </Button>
          )}
     
          
          
        </div>

        <div className={style.right}>
        <Button
            sx={{ color: "white", textTransform: "none" }}
            variant="text"
            onClick={() => navigate("/")}
            startIcon={<HomeIcon/>}
          >
            Home
          </Button>
        {showBgChange ? (
            <Button
              onClick={() => {
                setshowBgChange(!showBgChange);
              }}
              variant="text"
              startIcon={<AutoAwesomeIcon />}
            >
              {" "}
              Edit Board
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/#customisation");
              }}
              variant="contained"
              id={style.whiteBtn}
              startIcon={<AddPhotoAlternateIcon />}
            >
             
              Change Background
            </Button>
          )}
          <Button
            variant="text"
            onClick={handleClearBoard}
            startIcon={<BoltIcon />}
          >
            Clear Board
          </Button>
         
          <Button variant="text" startIcon={<MoreHorizOutlinedIcon />} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
