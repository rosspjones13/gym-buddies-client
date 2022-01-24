import React, { Component } from "react";
import { Badge } from "antd";

class DayExerciseList extends Component {
  render() {
    const { workout } = this.props;
    return (
      <li style={{ whiteSpace: "nowrap" }}>
        <Badge status="success" text={workout.exercise.name} />
      </li>
    );
  }
}

export default DayExerciseList;
