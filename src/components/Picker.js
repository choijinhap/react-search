import 'rc-calendar/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;


const SHOW_TIME = true;

class Picker extends React.Component {
  state = {
    showTime: SHOW_TIME,
    disabled: false,
  };

  render() {
    const props = this.props;
    const calendar = (<Calendar
      locale={cn ? zhCN : enUS}
      defaultValue={now}
      timePicker={props.showTime ? timePickerElement : null}
      disabledDate={props.disabledDate}
    />);
    return (<DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {
        ({ value }) => {
          return (
            <span>
                <input
                  style={{ width: 150 }}
                  disabled={props.disabled}
                  readOnly
                  value={value && value.format(getFormat(props.showTime)) || ''}
                />
                </span>
          );
        }
      }
    </DatePicker>);
  }
}

class Demo extends React.Component {
constructor(props){
  super(props);
  this.state={
    startValue: '',
    endValue: '',
  }
    this.onAllChanged=this.onAllChanged.bind(this);
    this.onRangeChanged=this.onRangeChanged.bind(this);
}


  onAllChanged(e){
    this.setState({
      startValue:'',
      endValue:'',
    });
  }

  onRangeChanged(e){
    this.setState({
      startValue:'',
      endValue:'',
    });
  }

  onChange = (field, value) => {
    console.log('onChange', field, value && value.format(getFormat(SHOW_TIME)));
    this.setState({
      [field]: value,
    });
  }

  disabledEndDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
    endValue.diff(startValue, 'days') <= 0;
  }

  disabledStartDate = (startValue) => {
    if (!startValue) {
      return false;
    }
    const endValue = this.state.endValue;
    if (!endValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
    endValue.diff(startValue, 'days') <= 0;
  }

  render() {
    const state = this.state;
    return (
      <div className="box" id="cal">
        <p className="tit">기간</p>
      <div className="date_setting">
        <label className="radio-type">
          <input type="radio" name="dt" value="ALL" onChange={this.onAllChanged} />
          <span>전체</span>
        </label>
        <label className="radio-type">
          <input type="radio" name="dt" value="1" onChange={this.onRangeChanged}/>
          <span>기간</span>
        </label>


        <Picker
          disabledDate={this.disabledStartDate}
          value={state.startValue}
          onChange={this.onChange.bind(this, 'startValue')}
        />
        <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ~
      <br/>
        <Picker
          disabledDate={this.disabledEndDate}
          value={state.endValue}
          onChange={this.onChange.bind(this, 'endValue')}
        />

    </div>
    </div>
  );
  }
}

export default Demo;
//ReactDOM.render(<Demo />, document.getElementById('cal'));
