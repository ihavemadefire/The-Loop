const chronologicalSort = (events) => {
  events.sort((a, b) => {
    return new Date(a.when) - new Date(b.when);
  });
  console.log("chronoSorted:");
  console.log(events);
  return events;
};

export default chronologicalSort;