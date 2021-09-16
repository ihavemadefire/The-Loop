export const dayFormatter = (eventStartTime) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const time = new Date();
  if (time > eventStartTime) {
    return 'NOW!'
  } 
  //const todayFlair = 'TODAY!';
  //const dayIsToday = (time.toDateString() === today.toDateString())
  const dayString = `${days[eventStartTime.getDay()]} ${month[eventStartTime.getMonth()]} ${eventStartTime.getDate()}`
  //return (dayIsToday ? todayFlair : dayString);
  return dayString;
};

export const startTimeFormatter = (eventStartTime) => {
  const today = new Date();
  
  const timeToStart = eventStartTime.getTime() - today.getTime();
  const ongoingFlair = `started ${msToTime(timeToStart * -1)} ago`;
  if (timeToStart < 0) {
    return ongoingFlair;
  }
  const timeString = `starting in: ${msToTime(timeToStart)}`
  return timeString;
};

export const endTimeFormatter = (eventEndTime) => {
  const today = new Date();
  const timeToEnd = eventEndTime - today;
  const endsFlair = `ends in: ${msToTime(timeToEnd)}`;
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
  if (minutes < 60) return minutes + " min";
  if (hours < 2) return hours + ' hr';
  if (hours < 24) return hours + " hrs";
  else return days + " Days"
}