import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { postNewWorkout, updateUserWorkouts } from '../redux/actions/workouts'
import { Calendar, Row, Col, Badge, Popover, Modal, Icon, Radio, Select, TimePicker, InputNumber, Typography } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'

const { Text } = Typography
const { Option } = Select
const format = 'mm:ss'

class WorkoutCalendar extends Component {
  constructor() {
    super()
    let today = Date.now()
    this.state = {
      selectedDay: moment(today),
      // selectedMonth: moment(today).month(),
      hovered: false,
      hoverContent: "",
      modalVisible: false,
      exerciseCategory: [],
      exerciseSelected: {},
      currentImage: "",
      measurableAmount: 0,
      reps: 0
    }
  }
    
  handleHoverChange = (visible) => {
    const { exercise, workout } = visible
    let content = ""
    if (exercise.category === "Cardio") {
      let minutes = Math.floor(workout.measurable_amount / 60)
      let seconds = workout.measurable_amount - minutes * 60
      content = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}/mile for ${workout.reps} miles`
    }
    else {
      content = `${workout.measurable_amount}lbs for ${workout.reps} reps`
    }
    this.setState({
      hoverContent: content,
    });
  }

  onSelect = (value) => {
    this.setState({
      selectedDay: value,
    });
  }

  onAddWorkoutClick = (value) => {
    this.setState({
      selectedDay: value,
      selectedMonth: value.month(),
      modalVisible: true
    })
  }

  onRadioChange = (value) => {
    const { allExercises } = this.props
    let exerciseCategory = allExercises.filter(exercise => exercise.category === value.target.value)
    this.setState({
      exerciseCategory,
      exerciseSelected: {}
    })
  }

  handleExerciseChange = (value) => {
    const { exerciseCategory } = this.state
    let exerciseSelected = exerciseCategory.find(exercise => exercise.name === value)
    this.setState({
      exerciseSelected: exerciseSelected,
      currentImage: exerciseSelected.start_image,
      measurableAmount: 0,
      reps: 0
    })
  }

  handleChangeImage = (e) => {
    const { exerciseSelected, currentImage } = this.state
    let nextImage = ""
    if (currentImage === exerciseSelected.start_image) {
      nextImage = exerciseSelected.end_image
    } 
    else {
      nextImage = exerciseSelected.start_image
    }
    this.setState({
      currentImage: nextImage
    })
  }

  onRepsChange = (value) => {
    this.setState({
      reps: value
    })
  }

  onTimeChange = (value) => {
    let minutes = value.minutes()
    let seconds = value.seconds()
    let time = minutes * 60 + seconds
    this.setState({
      measurableAmount: time
    })
  }

  onWeightChange = (value) => {
    this.setState({
      measurableAmount: value
    })
  }

  onAddWorkoutSubmit = (e) => {
    const { exerciseSelected, reps, measurableAmount, selectedDay } = this.state
    const { currentUser, postNewWorkout, updateUserWorkouts } = this.props
    let day = moment(selectedDay).format('YYYY-MM-DD')
    let workoutObj = {}
    if (reps === 0) {
      return
    }
    else if (exerciseSelected === "Cardio") {
      let time = measurableAmount / reps
      workoutObj = {user_id: currentUser.id, exercise_id: exerciseSelected.id, workout_date: day, measurable_amount: time, reps}
    } 
    else {
      workoutObj = {user_id: currentUser.id, exercise_id: exerciseSelected.id, workout_date: day, measurable_amount: measurableAmount, reps}
    }
    this.setState({ 
      modalVisible: false, 
      exerciseCategory: {},
      exerciseSelected: {},
      reps: 0,
      measurableAmount: 0,
      selectedDay: moment(Date.now()),
    })
    postNewWorkout(workoutObj)
    updateUserWorkouts(workoutObj, exerciseSelected)
  }

  onPanelChange = (value) => {
    this.setState({ value });
  }

  dateCellRender = (value) => {
    const { userWorkouts } = this.props
    const { hoverContent } = this.state
    let date = moment(value).format('YYYY-MM-DD')
    let todaysWorkouts = userWorkouts.filter(workout => workout.workout.workout_date === date)
    const hoverInfo = (
      <div>
        {hoverContent}
      </div>
    );
    return (
      <Fragment>
        <Icon type="plus-circle" onClick={() => this.onAddWorkoutClick(value)}/> Add
        <ul
          className="workouts" 
          style={{ listStyle: "none", margin: "0", padding: "0" }}
        >
          {
            todaysWorkouts.map(workout =>
              <Popover
                key={workout.workout.id}
                style={{ width: 500 }}
                placement="topLeft"
                content={hoverInfo}
                title={workout.exercise.name}
                trigger="hover"
                onVisibleChange={() => this.handleHoverChange(workout)}
              >
                <li >
                  <Badge
                    status="success"
                    text={workout.exercise.name} 
                    />
                </li>
              </Popover>
            )
          }
        </ul>
      </Fragment>
    )
  }

  render() {
    const { selectedDay, modalVisible, exerciseCategory, exerciseSelected, currentImage } = this.state;
    return (
      <div>
        <Modal
          title={`Add a new workout on ${selectedDay.format('MM-DD-YYYY')}`}
          centered
          width={600}
          visible={modalVisible}
          okText="Add"
          onOk={this.onAddWorkoutSubmit}
          onCancel={() => this.setState({ modalVisible: false, exerciseCategory: {} })}
        >
          <Row>
            <Col span={22} offset={1}>
              <Radio.Group 
                buttonStyle="outline"
                onChange={this.onRadioChange}
              >
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
          <Row type="flex" justify="space-between" align="middle" style={{ marginTop: '20px' }}>
            {isEmpty(exerciseCategory) ? null : 
              <Col span={8} offset={1}>
                <Select
                  defaultValue="Select Exercise..."
                  style={{ width: 200 }} 
                  onChange={this.handleExerciseChange}
                >
                  {exerciseCategory.map(exercise => 
                    <Option value={`${exercise.name}`} key={exercise.id}>
                      {exercise.name}
                    </Option>
                  )}
                </Select>
              </Col>
            }
            {isEmpty(exerciseSelected) ? null :
              <Col span={12} offset={1}>
                <img 
                  src={currentImage}
                  style={{ height: '250px', maxWidth: '250px' }}
                  alt="Demonstration" 
                  onClick={this.handleChangeImage}
                />
              </Col>
            }
          </Row>
          {isEmpty(exerciseSelected)? null :
            <Row type="flex" align="middle" style={{ marginTop: '20px' }}>
                {exerciseSelected.category === "Cardio" ?
                  <Fragment>
                    <Col span={10} offset={2}>
                      <Text style={{ marginRight: '5px' }}>Total Time Mins:Secs</Text>
                      <TimePicker defaultValue={moment('15:00', format)} format={format} onChange={this.onTimeChange}/>
                    </Col>
                    <Col span={6} offset={2}>
                      <Text style={{ marginRight: '5px' }}>Miles</Text>
                      <InputNumber min={0} max={15} step={0.25} onChange={this.onRepsChange} />
                    </Col>
                  </Fragment>
                  :
                  <Fragment>
                    {exerciseSelected.category === "Abs" || exerciseSelected.name === "Push Ups" ||
                    exerciseSelected.name === "Dips" || exerciseSelected.name === "Chin-ups" ||
                    exerciseSelected.name === "Hyperextensions" ? null :
                    <Col span={10} offset={2}>
                      <Text style={{ marginRight: '5px' }}>Weight</Text>
                      <InputNumber min={0} max={300} step={5} onChange={this.onWeightChange} />
                      <Text style={{ marginLeft: '5px' }}>lbs</Text>
                    </Col>
                    }
                    <Col span={6} offset={2}>
                      <Text style={{ marginRight: '5px' }}>Reps</Text>
                      <InputNumber min={0} max={30} step={1} onChange={this.onRepsChange} />
                    </Col>
                  </Fragment>
                }
            </Row>
          }
        </Modal>
        <Calendar 
          value={selectedDay} 
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
          dateCellRender={this.dateCellRender}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    userWorkouts: state.userWorkouts,
    allExercises: state.allExercises,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postNewWorkout: (newWorkout) => { dispatch(postNewWorkout(newWorkout)) },
    updateUserWorkouts: (newWorkout, exercise) => { dispatch(updateUserWorkouts(newWorkout, exercise)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCalendar)