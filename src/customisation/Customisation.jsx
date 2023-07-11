import React, { useEffect, useState } from "react";
import { list, wallpaper } from "../recoil/description_atoms/DescriptionAtoms";
import { useRecoilState } from "recoil";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PhotoIcon from "@mui/icons-material/Photo";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AssistantIcon from "@mui/icons-material/Assistant";
import style from "./Customisation.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  studentPreDefinedData,
  studentDefaultBG,
  ProfessionalDefaultBG,
  professionalPreDefinedData,
  companiesImg,
  instituteImg,
  BGimage,
} from "./customisationData";
import PricingCard from "./PricingCard";

function Customisation() {
  let location = useLocation();
  const [listData, setListData] = useRecoilState(list);
  const navigate = useNavigate();
  const [linkOfWallpaper, setLinkOfWallpaper] = useState("");
  const [currentWallpaper, setCurrentWallpaper] = useRecoilState(wallpaper);

  function handleBackground(ele) {
    setCurrentWallpaper(ele);
    localStorage.setItem("userWallpaper", `${ele}`);
    navigate("/kanban");
  }
  function handleLinkOfWallpaper(e) {
    setLinkOfWallpaper(e.target.value);
  }
  function handleSendLinkOfWallpaper() {
    if (linkOfWallpaper !== "") {
      setCurrentWallpaper(linkOfWallpaper);
      localStorage.setItem("userWallpaper", `${linkOfWallpaper}`);
      navigate("/kanban");
    } else {
      alert("select any background");
    }
  }

  useEffect(() => {
    if (location.hash === "#customisation") {
      window.scroll(0, 4600);
    }
  }, []);

  function handleStudentBoard() {
    setListData(studentPreDefinedData);
    localStorage.setItem("userWallpaper", studentDefaultBG);
    navigate("/kanban");
  }
  function handleProfessionalBoard() {
    setListData(professionalPreDefinedData);
    localStorage.setItem("userWallpaper", ProfessionalDefaultBG);
    navigate("/kanban");
  }
  return (
    <div id="top" className={style.mainDiv}>
      <div className={style.introPage}>
        <nav className={style.introNav}>
          <div>
            <img
              className={style.introNavLogo}
              src="https://d29fhpw069ctt2.cloudfront.net/icon/image/38775/preview.svg"
              alt=""
            />

            <a style={{ textDecoration: "none" }} href="#top">
              <h1 style={{ color: "rgba(7, 79, 187, 0.459)" }}>Monday.com</h1>
            </a>
          </div>

          <div className={style.btnDiv}>
            <a href="#features">
              <Button variant="contained" endIcon={<AssistantIcon />}>
                Features
              </Button>
            </a>
            <a href="#videoDiv">
              <Button variant="contained" endIcon={<YouTubeIcon />}>
                Tutorial
              </Button>
            </a>
            <a href="#teams">
              <Button variant="contained" endIcon={<GroupsIcon />}>
                For Teams
              </Button>
            </a>
            <a href="#students">
              <Button variant="contained" endIcon={<EmojiPeopleIcon />}>
                For Students
              </Button>
            </a>

            <a href="#customisation">
              <Button variant="contained" endIcon={<PhotoIcon />}>
                Background
              </Button>
            </a>

            <Button id={style.introNavBlankButtons} variant="contained" />
            <a href="#pricing">
              <Button variant="contained" endIcon={<CurrencyRupeeIcon />}>
                Pricing
              </Button>
            </a>
            <Button
              onClick={() => navigate("/kanban")}
              id={style.introNavGreenButtons}
              color="success"
              variant="contained"
              endIcon={<MoneyOffIcon />}
            >
              Start For Free
            </Button>
          </div>
        </nav>
        <div className={style.centerText}>
          <h1 style={{ fontSize: "60px" }}>
            Organize your Work and Life , finally
          </h1>
          <h2>
            Become focused , organized and calm with Todoist. The worlds #1 task
            manager and to-do list website
          </h2>
        </div>
      </div>

      <h1 style={{ color: "white" }} id="features">
        .
      </h1>
      <br />
      <div className={style.features}>
        <div>
          <img src="/home.png " alt="" />
          <div className={style.featureText}>
            <h1 >The <span style={{backgroundColor:'#7fa0d2',color:'white',display:'inline'}}>KanBan</span>  Board </h1>
            <h3>
              Here you can Create Cards and inside cards you can Add Task and also you can drag and drop from
              card to another card
            </h3>
          </div>
        </div>
      </div>

      <div className={style.descDiv}>
        <div className={style.DecpText}>
          <h1>Add <span style={{backgroundColor:'#7fa0d2',color:'white',display:'inline'}}>Description</span>to Your Task</h1>
          <h3>
            Worry about the minor details or pinpoint to be added to the task
            here is the Description for you to add any details
          </h3>
        </div>

        <img src="/Desc.png " alt="" />
      </div>

      <div className={style.custShow}>
        <img src="/chooseBG.png " alt="" />
        <div className={style.custShowText}>
          {" "}
          <h1><span style={{backgroundColor:'#7fa0d2',color:'white',display:'inline'}}>Customisation</span> on the go</h1>
          <h3>
            Bored of all the old plain boring ToDo-List Websited and KanBan
            board{" "}
          </h3>
          <h3>
            We are here to give you the customisation that you want now you can
            make any background that you like just by pasting the link of the
            image{" "}
          </h3>
        </div>
      </div>
      <div className={style.videoDiv} id="videoDiv">
        <div></div>
        <h1>
          Confused! How to use <span>Kanban Board?</span> Checkout our video
          below
        </h1>
        <iframe
          width="1100"
          height="600"
          src="https://www.youtube.com/embed/6drUzoeHZkg"
          title="Monday.com"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen="true"
        ></iframe>

      </div>

      <div id="teams" className={style.forTeams}>
        <h1>Are you a working Professional?</h1>
        <h2>
          Here is a Template that is specially Designed for the Working
          Professionals
        </h2>
        <h2>
          That template is specially designed for the working professionals in
          which we have special card for arranging task according to your requirement
        </h2>
        <Button onClick={handleProfessionalBoard} variant="contained">
          Get started{" "}
        </Button>
        <h1>Companies that are using our Board</h1>
        <div className={style.companiesIcon}>
          {companiesImg.map((ele, i) => (
            <img src={ele} key={i} alt="alt" />
          ))}
        </div>
      </div>

      <div id="students" className={style.forStudent}>
        
        <h1>Are you a Student?</h1>
        <h2>
          We understand nowadays how hard it is for a student to track all the
          task they have to complete
        </h2>
        <h2>
          We have created a Template for you that is designed specially for
          students so that it will make it easier for them to manage their tasks,
          click on the button below to get started.
        </h2>
        <Button onClick={handleStudentBoard} variant="contained">
          Get started{" "}
        </Button>
        <h1>Institutes that are using our Board</h1>
        <div className={style.companiesIcon}>
          {instituteImg.map((ele, i) => (
            <img src={ele} key={i} alt="alt" />
          ))}


        </div>
      </div>
      <div className={style.bcgDiv} id="customisation"></div>
      <div  className={style.heading}>
        <h1>
          Choose <span>Background</span>{" "}
        </h1>
      </div>
      <div className={style.headingText}>
        <h2>
          Unable to find you perfect background? No worries your board your
          favourite image
        </h2>
        <h2>Just Copy Any Image URL from the internet(GIF feature added)</h2>
      </div>
      <div className={style.inpDiv}>
        <TextField
          // color="success"
          onChange={handleLinkOfWallpaper}
          className={style.textField}
          label="Enter the link of your favourite background"
          variant="outlined"
        />
        <Button onClick={handleSendLinkOfWallpaper} variant="contained">
          Apply This Image
        </Button>
      </div>

      <div className={style.imageDiv}>
        {BGimage.map((ele, index) => (
          <img
            className={style.perImg}
            key={index}
            onClick={() => {
              handleBackground(ele);
            }}
            alt="alt"
            src={ele}
          />
        ))}
      </div>
      <div id="pricing" className={style.pricing}>
        <h1 style={{ color: "transparent", margin: "0", padding: "0" }}>.</h1>
        <h1 className={style.pricingText}>
          Become our <span>Premium</span> User
        </h1>
        <div>
          <PricingCard
            plan="Standard "
            price="₹69/M"
            desc="Unlimited boards. . . . . . . .
            Advanced checklists . . . . . . . . .
            Admin and security features . . . .
            Unlimited automations
            And more!"
          />
          <PricingCard
            plan="Premium"
            price="₹169/M"
            desc="Unlimited boards. . . . . . . .
            Advanced checklists . . . . . . . . .
            Admin and security features . . . .
            Unlimited automations
            And more!"
          />
          <PricingCard
            plan="Enterprise"
            price="₹696/M"
            desc="Unlimited boards. . . . . . . .
            Advanced checklists . . . . . . . . .
            Admin and security features . . . .
            Unlimited automations
            And more!"
          />
        </div>
      </div>

      <footer className={style.footer}>
        <div className="cards">
          <div className="card madewith">
            <p
              onClick={() => {
                alert("hey");
              }}
              className="tip"
            >
              Made with ❤️ by
            </p>
          </div>
          <div className="card laxmi">
            <a
              href="http://www.linkedin.com/in/lakshmiprasannanarapureddy"
              target="_blank"
              rel="noreferrer"
            >
              <p className="tip">Lakshmi</p>
            </a>
          </div>
          <div className="card chandra">
            <a
              href="https://www.linkedin.com/in/chandra-bhan-prajapati-5bb668211/"
              target="_blank"
              rel="noreferrer"
            >
              <p className="tip">Chandra</p>
            </a>
          </div>
          <div className="card samad">
            <a
              href="https://www.linkedin.com/in/samadrahman"
              target="_blank"
              rel="noreferrer"
            >
              <p className="tip">Samad</p>
            </a>
          </div>
          <div className="card rohan">
            <a
              href="https://www.linkedin.com/in/therohanmehta/"
              target="_blank"
              rel="noreferrer"
            >
              <p className="tip">Rohan</p>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Customisation;
