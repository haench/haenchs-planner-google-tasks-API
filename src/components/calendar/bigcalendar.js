import BigCalendar from "react-big-calendar";
import globalize from "globalize";

const localizer = BigCalendar.globalizeLocalizer(globalize);

const MyBigCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
);

export default MyBigCalendar;
