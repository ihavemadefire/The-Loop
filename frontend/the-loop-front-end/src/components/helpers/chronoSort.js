// Sorts the array by starting time, and bumps events ending within 1 hour to the top

const chronologicalSort = (events) => {
  events.sort((a, b) => {
    return new Date(a.when) - new Date(b.when);
  });
  let now = new Date();

  // Filter out events that have ended
  let currentEvents = [];
  for (let i = 0; i < events.length; i++) {
    let endTime = new Date(events[i].end);
    if ((endTime.getTime() - now.getTime()) > 0) {
      currentEvents.push(events[i]);
    };
  };

  const timeToBump = 60;
  let sortedEvents = [];
  for (let i = 0; i < currentEvents.length; i++) {
    let endTime = new Date(currentEvents[i].end);
    let minutesDifference = (endTime.getTime() - now.getTime()) / (1000 * 60);
    if (minutesDifference < timeToBump && minutesDifference > 0) {
      //console.log('Something ends in less than 60 minutes');
      sortedEvents.push(currentEvents[i]);
    };
  };

  sortedEvents.sort((a, b) => {
    return new Date(a.end) - new Date(b.end)
  })

  for (let i = 0; i < currentEvents.length; i++) {
    if (!sortedEvents.includes(currentEvents[i])) {
      sortedEvents.push(currentEvents[i]);
    };
  };

  //console.log("chronoSorted:");
  //console.log(events);
  return sortedEvents;
};

export default chronologicalSort;