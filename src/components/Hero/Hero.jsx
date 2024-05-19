import SvgCheck from "../../images/SvgCheck";
import SvgGetStarted from "../../images/SvgGetStarted";
import SvgQuestion from "../../images/SvgQuestion";
import SvgUsers from "../../images/SvgUsers";
import HeroImg from "../../images/HeroImg.jpg";
import s from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className={s.heroSection}>
      <div className={s.leftSide}>
        <h1 className={s.title}>
          The road to the <span className={s.titleSpan}>depths</span> of the
          human soul
        </h1>
        <p className={s.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button
          className={s.getStarted}
          onClick={() => navigate("/psychologists")}
        >
          Get started
          <SvgGetStarted />
        </button>
      </div>
      <div>
        <div className={s.rightSide}>
          <SvgUsers className={s.svgUsers} />
          <SvgQuestion className={s.svgQuestion} />
          <img className={s.heroImg} src={HeroImg} alt="Women with glasses" />
          <div className={s.experience}>
            <span className={s.check}>
              <SvgCheck />
            </span>
            <div className={s.infoWrap}>
              <p className={s.infoText}>Experienced psychologists</p>
              <p className={s.infoNumber}>15,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
