import React, { Component } from 'react'
import { Calendar, Alert } from 'antd'
import moment from 'moment'

class WorkoutCalendar extends Component {
  constructor(params) {
    super()
    this.state = {
      value: moment(Date.now()),
      selectedValue: moment(Date.now()),
    }
  }
    

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }

  onPanelChange = (value) => {
    this.setState({ value });
  }

  // dateCellRender = (value) => {
  //   const listData = getListData(value);
  //   return (
  //     <ul className="workouts">
  //       {
  //         listData.map(item => (
  //           <li key={item.content}>
  //             <Badge status={item.type} text={item.content} />
  //           </li>
  //         ))
  //       }
  //     </ul>
  //   )
  // }

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('MM-DD-YYYY')}`} />
        <Calendar 
          value={value} 
          onSelect={this.onSelect} 
          onPanelChange={this.onPanelChange}
          // dateCellRender={this.dateCellRender}
        />
      </div>
    );
  }
}

export default WorkoutCalendar