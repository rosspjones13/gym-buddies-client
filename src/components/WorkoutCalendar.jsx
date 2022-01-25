import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postNewWorkout, updateUserWorkouts } from "../redux/actions/workouts";
import {
  Calendar,
  Row,
  Col,
  Badge,
  Popover,
  Modal,
  Radio,
  Select,
  TimePicker,
  InputNumber,
  Typography,
  Drawer,
  Divider,
  Carousel,
  Button,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import moment from "moment";
import DayExerciseList from "./DayExerciseList";

const { Text, Title } = Typography;
const { Option } = Select;
const format = "mm:ss";

const WorkoutCalendar = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const userWorkouts = useSelector((state) => state.userWorkouts);
  const allExercises = useSelector((state) => state.allExercises);

  let today = Date.now();
  const [state, setState] = useState({
    selectedDay: moment(today),
    hoverContent: "",
    dayDrawer: false,
    modalVisible: false,
    todaysWorkouts: [],
    exerciseCategory: [],
    exerciseSelected: {},
    measurableAmount: 0,
    reps: 0,
  });

  const handleHoverChange = (visible) => {
    const { exercise, workout } = visible;
    let content = "";
    if (exercise.category === "Cardio") {
      let minutes = Math.floor(workout.measurable_amount / 60);
      let seconds = workout.measurable_amount - minutes * 60;
      content = `${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }/mile for ${workout.reps} miles`;
    } else {
      content = `${workout.measurable_amount}lbs for ${workout.reps} reps`;
    }
    setState({
      ...state,
      hoverContent: content,
    });
  };

  const onSelect = (value) => {
    setState({
      ...state,
      dayDrawer: value.month() === selectedDay.month() ? true : false,
      selectedDay: value,
      todaysWorkouts: findTodaysWorkouts(value),
    });
  };

  const onCloseDrawer = (visible) => {
    setState({
      ...state,
      dayDrawer: false,
    });
  };

  const onAddWorkoutClick = (value) => {
    setState({
      ...state,
      modalVisible: true,
    });
  };

  const onRadioChange = (value) => {
    let exerciseCategory = allExercises.filter(
      (exercise) => exercise.category === value.target.value
    );
    setState({
      ...state,
      exerciseCategory,
      exerciseSelected: {},
    });
  };

  const handleExerciseChange = (value) => {
    const { exerciseCategory } = state;
    let exerciseSelected = exerciseCategory.find(
      (exercise) => exercise.name === value
    );
    setState({
      ...state,
      exerciseSelected: exerciseSelected,
      measurableAmount: 0,
      reps: 0,
    });
  };

  const onRepsChange = (value) => {
    setState({
      ...state,
      reps: value,
    });
  };

  const onTimeChange = (value) => {
    let minutes = value.minutes();
    let seconds = value.seconds();
    let time = minutes * 60 + seconds;
    setState({
      ...state,
      measurableAmount: time,
    });
  };

  const onWeightChange = (value) => {
    setState({
      ...state,
      measurableAmount: value,
    });
  };

  const onAddWorkoutSubmit = (e) => {
    const { exerciseSelected, reps, measurableAmount, selectedDay } =
      state;
    let day = moment(selectedDay).format("YYYY-MM-DD");
    let workoutObj = {};
    if (reps === 0) {
      return;
    } else if (exerciseSelected === "Cardio") {
      let time = measurableAmount / reps;
      workoutObj = {
        user_id: currentUser.id,
        exercise_id: exerciseSelected.id,
        workout_date: day,
        measurable_amount: time,
        reps,
      };
    } else {
      workoutObj = {
        user_id: currentUser.id,
        exercise_id: exerciseSelected.id,
        workout_date: day,
        measurable_amount: measurableAmount,
        reps,
      };
    }
    setState({
      ...state,
      modalVisible: false,
      exerciseCategory: {},
      exerciseSelected: {},
      reps: 0,
      measurableAmount: 0,
      selectedDay: moment(Date.now()),
    });
    dispatch(postNewWorkout(workoutObj));
    dispatch(updateUserWorkouts(workoutObj, exerciseSelected));
  };

  const onPanelChange = (value) => {
    setState({ 
      ...state,
      selectedDay: value 
    });
  };

  const dateCellRender = (value) => {
    const { hoverContent } = state;
    let todaysWorkouts = findTodaysWorkouts(value);
    const hoverInfo = <div>{hoverContent}</div>;
    return (
      <Fragment>
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {todaysWorkouts.map((workout) => (
            <Popover
              key={workout.workout.id}
              style={{ width: 500 }}
              placement="right"
              content={hoverInfo}
              title={workout.exercise.name}
              trigger="hover"
              onVisibleChange={() => handleHoverChange(workout)}
            >
              <li style={{ whiteSpace: "nowrap" }}>
                <Badge status="success" text={workout.exercise.name} />
              </li>
            </Popover>
          ))}
        </ul>
      </Fragment>
    );
  };

  const findTodaysWorkouts = (value) => {
    // const { userWorkouts } = props;
    let date = moment(value).format("YYYY-MM-DD");
    return userWorkouts.filter(
      (workout) => workout.workout.workout_date === date
    );
  };

  // render() {
  const {
    selectedDay,
    modalVisible,
    exerciseCategory,
    exerciseSelected,
    dayDrawer,
    todaysWorkouts,
  } = state;
  return (
    <div>
      <Title level={4} style={{ margin: "1vh 1vw" }}>
        My Workout Calendar
      </Title>
      <Modal
        title={`Add a new workout on ${selectedDay.format("MM-DD-YYYY")}`}
        centered
        width={600}
        visible={modalVisible}
        okText="Add"
        onOk={onAddWorkoutSubmit}
        onCancel={() =>
          setState({ 
            ...state,
            modalVisible: false,
            exerciseSelected: {},
          })
        }
      >
        <Row>
          <Col span={22} offset={1}>
            <Radio.Group buttonStyle="outline" onChange={onRadioChange}>
              <Radio.Button value="Arms">Arms</Radio.Button>
              <Radio.Button value="Legs">Legs</Radio.Button>
              <Radio.Button value="Abs">Abs</Radio.Button>
              <Radio.Button value="Chest">Chest</Radio.Button>
              <Radio.Button value="Back">Back</Radio.Button>
              <Radio.Button value="Shoulders">Shoulders</Radio.Button>
              <Radio.Button value="Cardio">Cardio</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="space-between"
          // justify="center"
          align="middle"
          style={{ marginTop: "20px" }}
        >
          {isEmpty(exerciseCategory) ? null : (
            <Col span={8} offset={2}>
              <Select
                defaultValue="Select Exercise..."
                style={{ width: 200 }}
                onChange={handleExerciseChange}
              >
                {exerciseCategory.map((exercise) => (
                  <Option value={`${exercise.name}`} key={exercise.id}>
                    {exercise.name}
                  </Option>
                ))}
              </Select>
            </Col>
          )}
          {isEmpty(exerciseSelected) ? null : (
            <Col span={12} offset={2}>
              <Carousel
                autoplay
                effect="fade"
              >
                <div>
                  <img
                    src={exerciseSelected.start_image}
                    style={{ 
                      objectFit: "contain",
                      height: "300px", 
                      width: "100%",
                      lineHeight: "300px",
                    }}
                    alt="Demonstration"
                  />
                </div>
                <div>
                  <img
                    src={exerciseSelected.end_image}
                    style={{
                      objectFit: "contain",
                      height: "300px", 
                      width: "100%", 
                      lineHeight: "300px",
                    }}
                    alt="Demonstration"
                  />
                </div>
              </Carousel>
            </Col>
          )}
        </Row>
        {isEmpty(exerciseSelected) ? null : (
          <Row type="flex" align="middle" style={{ marginTop: "20px" }}>
            {exerciseSelected.category === "Cardio" ? (
              <Fragment>
                <Col span={10} offset={2}>
                  <Text style={{ marginRight: "5px" }}>
                    Total Time Mins:Secs
                  </Text>
                  <TimePicker
                    defaultValue={moment("15:00", format)}
                    format={format}
                    onChange={onTimeChange}
                  />
                </Col>
                <Col span={6} offset={2}>
                  <Text style={{ marginRight: "5px" }}>Miles</Text>
                  <InputNumber
                    min={0}
                    max={15}
                    step={0.25}
                    onChange={onRepsChange}
                  />
                </Col>
              </Fragment>
            ) : (
              <Fragment>
                {exerciseSelected.category === "Abs" ||
                exerciseSelected.name === "Push Ups" ||
                exerciseSelected.name === "Dips" ||
                exerciseSelected.name === "Chin-ups" ||
                exerciseSelected.name === "Hyperextensions" ? null : (
                  <Col span={10} offset={2}>
                    <Text style={{ marginRight: "5px" }}>Weight</Text>
                    <InputNumber
                      min={0}
                      max={300}
                      step={5}
                      onChange={onWeightChange}
                    />
                    <Text style={{ marginLeft: "5px" }}>lbs</Text>
                  </Col>
                )}
                <Col span={6} offset={2}>
                  <Text style={{ marginRight: "5px" }}>Reps</Text>
                  <InputNumber
                    min={0}
                    max={30}
                    step={1}
                    onChange={onRepsChange}
                  />
                </Col>
              </Fragment>
            )}
          </Row>
        )}
      </Modal>
      <Drawer
        title={`Workouts on ${selectedDay.format("MM-DD-YYYY")}`}
        closable={true}
        onClose={onCloseDrawer}
        visible={dayDrawer}
      >
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {todaysWorkouts.map((workout) => (
            <DayExerciseList key={workout.workout.id} workout={workout} />
          ))}
        </ul>
        <Divider />
        <Button onClick={onAddWorkoutClick}>
          <PlusCircleOutlined /> Add a workout
        </Button>
      </Drawer>
      <Calendar
        value={selectedDay}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
      />
    </div>
  );
}

export default WorkoutCalendar;
