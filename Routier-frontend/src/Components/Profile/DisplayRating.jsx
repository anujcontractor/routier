// Style sheet
import styles from "./Profile.module.css";

// Images
import fill from "../Assets/profile/star_fill_profile.svg";
import empty from "../Assets/profile/star_empty_profile.svg";

const DisplayRating = (props) => {
  return (
    <div className={styles.stars}>
      {props.rate > 0 ? <img src={fill} /> : <img src={empty} />}
      {props.rate > 1 ? <img src={fill} /> : <img src={empty} />}
      {props.rate > 2 ? <img src={fill} /> : <img src={empty} />}
      {props.rate > 3 ? <img src={fill} /> : <img src={empty} />}
      {props.rate > 4 ? <img src={fill} /> : <img src={empty} />}
    </div>
  );
};
export default DisplayRating;
