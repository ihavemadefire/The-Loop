export const dayFormatter = (time) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //const today = new Date();
  //const todayFlair = 'TODAY!';
  //const dayIsToday = (time.toDateString() === today.toDateString())
  const dayString = `${days[time.getDay()]} ${month[time.getMonth()]} ${time.getDate()}`
  //return (dayIsToday ? todayFlair : dayString);
  return dayString;
};

export const startTimeFormatter = (eventStartTime) => {
  const today = new Date();
  const startedFlair = `-ONGOING- Started at ${eventStartTime.toLocaleTimeString()}`;
  const dayIsToday = (eventStartTime.toDateString() === today.toDateString())
  if (dayIsToday && (eventStartTime.getTime() < today.getTime())) {
    return startedFlair;
  }
  const timeToStart = eventStartTime.getTime() - today.getTime();
  const timeString = `${eventStartTime.toLocaleTimeString()} (in ${msToTime(timeToStart)})`
  return timeString;
};

export const endTimeFormatter = (eventEndTime) => {
  const today = new Date();
  const timeToEnd = eventEndTime - today;
  const endsFlair = `${eventEndTime.toLocaleTimeString()} ends in ${msToTime(timeToEnd)}`;
  //const dayIsToday = (eventEndTime.toDateString() === today.toDateString())
  if (eventEndTime.getTime() > today.getTime()) {
    return endsFlair;
  }
  const timeString = `-ENDED- ${eventEndTime.toLocaleTimeString()}`
  return timeString;
};

const msToTime = (ms) => {
  //let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(0);
  let hours = (ms / (1000 * 60 * 60)).toFixed(0);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
  //if (seconds < 60) return seconds + " Sec";
  if (minutes < 60) return minutes + " Min";
  if (hours < 24) return hours + " Hrs";
  else return days + " Days"
}