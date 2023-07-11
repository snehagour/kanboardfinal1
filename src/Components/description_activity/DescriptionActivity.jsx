import { ShowActivity } from "../../recoil/description_atoms/DescriptionAtoms";
import { useRecoilState } from "recoil";
import style from "./DescriptionActivity.module.css";
import TocIcon from "@mui/icons-material/Toc";

function DescriptionActivity() {
  const [detailsHide, setDetailsHide] = useRecoilState(ShowActivity);

  return (
    <>
      <div className={style.activityContainer}>
        <div className={style.activityLeft}>
          <div className={style.activityIcon}>
            <TocIcon />
          </div>
          <div className={style.activityText}>
            <p>Activity</p>
          </div>
        </div>
        <div
          className={style.hideDetails}
          onClick={() => setDetailsHide(!detailsHide)}
        >
          {detailsHide ? (
            <small>Hide Details</small>
          ) : (
            <small>Show Details</small>
          )}
        </div>
      </div>
    </>
  );
}

export default DescriptionActivity;
