import moment from "moment";

export default function formatDate(dateString) {
  const date = new Date(dateString);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
    daySuffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  return `${dayOfWeek}, ${day}${daySuffix} ${month} ${year}`;
}



export const formatSchedule = (schedule) => {
  // const date = new Date(schedule?.date);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  // const formattedDate = date.toLocaleDateString('en-GB', options);

  const convertTime = (time) => {
    let [hours, minutes] = time?.split(':');
    let period = 'AM';
    hours = parseInt(hours, 10);
    if (hours >= 12) {
      period = 'PM';
      hours = hours > 12 ? hours - 12 : hours;
    } else if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes} ${period}`;
  };

  const formattedStartTime = schedule?.startTime ? convertTime(schedule?.startTime) : '';
  const formattedEndTime = schedule?.endTime ? convertTime(schedule?.endTime) : '';
  const formattedTimeSlot = `${formattedStartTime} to ${formattedEndTime}`;

  return { 
    // formattedDate, 
    formattedTimeSlot };
};



export const getCurrentDateInFormat = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00.000Z`;
};


export const shouldDisableButton = (data) => {
  const currentTime = moment();
  const currentDay = currentTime.format('dddd');

  if (currentDay !== data?.schedule?.day) {
    return true; 
  }

  const [startHours, startMinutes] = data.schedule.startTime.split(':').map(Number);
  const [endHours, endMinutes] = data.schedule.endTime.split(':').map(Number);

  const startTime = moment().set({ hour: startHours, minute: startMinutes, second: 0, millisecond: 0 });
  const endTime = moment().set({ hour: endHours, minute: endMinutes, second: 0, millisecond: 0 });

  return (currentTime.isAfter(endTime) || currentTime.isBefore(startTime));
};


export const sortClassesByDayAndTime = (classes) => {
  const now = moment();
  const currentDay = now.format('dddd'); 

  return classes.sort((a, b) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const aDayIndex = daysOfWeek.indexOf(a?.schedule?.day);
    const bDayIndex = daysOfWeek.indexOf(b?.schedule?.day);

    const aStartTime = moment(a.schedule.startTime, "HH:mm");
    const aEndTime = moment(a.schedule.endTime, "HH:mm");
    const bStartTime = moment(b.schedule.startTime, "HH:mm");
    const bEndTime = moment(b.schedule.endTime, "HH:mm");

    const isACurrentlyRunning = a?.schedule?.day === currentDay && now.isBetween(aStartTime, aEndTime);
    const isBCurrentlyRunning = b?.schedule?.day === currentDay && now.isBetween(bStartTime, bEndTime);

    if (isACurrentlyRunning && !isBCurrentlyRunning) return -1;
    if (!isACurrentlyRunning && isBCurrentlyRunning) return 1;

    if (isACurrentlyRunning && isBCurrentlyRunning) {
      return aStartTime.isAfter(bStartTime) ? 1 : -1;
    }

    if (a?.schedule?.day === currentDay && b?.schedule?.day === currentDay) {
      return aStartTime.isAfter(bStartTime) ? 1 : -1;
    }
    if (a?.schedule?.day === currentDay) return -1;
    if (b?.schedule?.day === currentDay) return 1;
    if (aDayIndex !== bDayIndex) {
      return aDayIndex - bDayIndex;
    }
    return aStartTime.isAfter(bStartTime) ? 1 : -1;
  });
};




export const getRelativeTime = (date) => {
  const now = moment();
  const diffInSeconds = now.diff(date, 'seconds');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2419200) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = now.diff(date, 'months');
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
};
