import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Calendar, Row, Col, Badge, Popover, Modal, Icon, Radio, Select} from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'

const Option = Select.Option

class WorkoutCalendar extends Component {
  constructor(params) {
    super()
    this.state = {
      value: moment(Date.now()),
      selectedValue: moment(Date.now()),
      hovered: false,
      hoverContent: "",
      modalVisible: false,
      exerciseCategory: [],
      exerciseSelected: {}
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
      value,
      selectedValue: value,
    });
  }

  onAddWorkoutClick = (value) => {
    this.setState({
      value,
      selectedValue: value,
      modalVisible: true
    })
  }

  onRadioChange = (value) => {
    const { allExercises } = this.props
    let exerciseCategory = allExercises.filter(exercise => exercise.category === value.target.value)
    this.setState({
      exerciseCategory
    })
  }

  // handleExerciseChange = (value) => {
  //   const { exerciseCategory } = this.state
  //   let exerciseSelected = exerciseCategory.filter(exercise => exercise.name === value.target.value)
  //   debugger
  //   this.setState({
  //     exerciseSelected
  //   })
  // }

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
    const { value, modalVisible, exerciseCategory } = this.state;
    return (
      <div>
        <Modal
          title={`Add a new workout on ${value.format('MM-DD-YYYY')}`}
          centered
          width={600}
          visible={modalVisible}
          onOk={() => this.setState({modalVisible: false})}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <Row>
            <Col span={22} offset={1}>
              <Radio.Group 
                defaultValue="Arms" 
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
          <Row>
            {isEmpty(exerciseCategory)? null : 
              <Col span={22} offset={1}>
                <Select 
                  defaultValue="Select Exercise" 
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
          </Row>
        </Modal>
        <Calendar 
          value={value} 
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

export default connect(mapStateToProps)(WorkoutCalendar)