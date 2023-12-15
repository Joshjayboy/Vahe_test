import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SuccessSVG from "../table/svg/SuccessSVG";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles({
  parentText: {
    position: "absolute",
    backgroundColor: "white",
    left: 0,
    borderRadius: "15px",
    marginBottom: "150px",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  text: {
    width: "100%",
    height: "100%",
    color: "black",
    padding: "10px",
    textAlign: "center",
  },
  arrow: {
    position: "absolute",
    left: "50%",
    transform: `translate(-50%)`,
    borderLeft: "10px solid transparent",
    borderTop: "10px solid white",
    borderRight: "10px solid transparent",
  },
  steper: {
    backgroundColor: `rgba(249,250,251,255)`,
    paddingBottom: "10px",
    marginTop: "120px",
  },
});

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "green",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : `rgba(249,250,251,255)`,
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  border:
    ownerState.completed || ownerState.active
      ? "1px green solid"
      : "1px #eaeaf0 solid",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: `rgba(249,250,251,255)`,
  }),
  ...(ownerState.completed && {
    backgroundColor: "transparent",
    backgroundColor: `rgba(249,250,251,255)`,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const classes = useStyles();

  const icons = {
    1: <SuccessSVG />,
    2: <SuccessSVG />,
    3: <SuccessSVG />,
    4: <SuccessSVG />,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? (
        icons[String(props.icon)]
      ) : (
        <div
          style={{
            width: "7px",
            height: "7px",
            backgroundColor: active ? "green" : "#eaeaf0",
            borderRadius: "50%",
          }}
        ></div>
      )}
      {active && (
        <div className={classes.parentText}>
          <p className={classes.text}> Preparing 10.10.2023 </p>
          <div className={classes.arrow}> </div>
        </div>
      )}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["", "", "", ""];

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  return (
    <Stepper
      alternativeLabel
      activeStep={2}
      connector={<ColorlibConnector />}
      className={classes.steper}
    >
      {steps.map((label) => (
        <Step key={uuid()}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
