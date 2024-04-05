export const separateReminders = (reminders) => {
  const completedReminders = reminders.filter(
    (reminder) => reminder.state === true,
  );

  const uncompletedReminders = reminders.filter(
    (reminder) => reminder.state === false,
  );

  return { completedReminders, uncompletedReminders };
};

const sortRemindersByHour = (reminders) => {
  return reminders.sort((a, b) => {
    if (!a.hour && b.hour) {
      return -1;
    }

    if (a.hour && !b.hour) {
      return 1;
    }

    if (a.hour && b.hour) {
      const [aHour, aMinute] = a.hour.split(":").map(Number);
      const [bHour, bMinute] = b.hour.split(":").map(Number);
      return aHour - bHour || aMinute - bMinute;
    }

    return 0;
  });
};

const aggregateAllReminders = (reminderLists) => {
  const allReminders = reminderLists.flatMap((list) => list.reminders);

  allReminders.sort((a, b) => a.id - b.id);

  return allReminders;
};

export const filterReminders = (
  showCompletedReminders,
  uncompletedReminders,
  completedReminders,
) => {
  return showCompletedReminders
    ? [...uncompletedReminders, ...completedReminders]
    : uncompletedReminders;
};

export const sortTodayReminders = (reminderLists) => {
  const allReminders = aggregateAllReminders(reminderLists);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const scheduledReminders = allReminders.filter((reminder) => reminder.date);

  const todayReminders = scheduledReminders.filter((reminder) => {
    const reminderDate = new Date(reminder.date);
    return reminderDate.toDateString() === today.toDateString();
  });

  const { completedReminders, uncompletedReminders } =
    separateReminders(todayReminders);

  const noHourReminders = [];
  const morningReminders = [];
  const afternoonReminders = [];
  const eveningReminders = [];

  todayReminders.forEach((reminder) => {
    if (!reminder.hour) {
      noHourReminders.push(reminder);
      return;
    }

    const hour = parseInt(reminder.hour.split(":")[0]);
    if (hour >= 0 && hour < 12) {
      morningReminders.push(reminder);
      return;
    }

    if (hour < 18) {
      afternoonReminders.push(reminder);
      return;
    }

    eveningReminders.push(reminder);
  });

  const sortedMorningRemindersByHour = sortRemindersByHour(morningReminders);
  const sortedAfternoonRemindersByHour =
    sortRemindersByHour(afternoonReminders);
  const sortedEveningRemindersByHour = sortRemindersByHour(eveningReminders);

  const separatedNoHourReminders = separateReminders(noHourReminders);
  const separatedMorningReminders = separateReminders(
    sortedMorningRemindersByHour,
  );
  const separatedAfternoonReminders = separateReminders(
    sortedAfternoonRemindersByHour,
  );
  const separatedEveningReminders = separateReminders(
    sortedEveningRemindersByHour,
  );

  return {
    completedAfternoonReminders: separatedAfternoonReminders.completedReminders,
    completedEveningReminders: separatedEveningReminders.completedReminders,
    completedMorningReminders: separatedMorningReminders.completedReminders,
    completedNoHourReminders: separatedNoHourReminders.completedReminders,
    completedTodayReminders: completedReminders,
    uncompletedAfternoonReminders:
      separatedAfternoonReminders.uncompletedReminders,
    uncompletedEveningReminders: separatedEveningReminders.uncompletedReminders,
    uncompletedMorningReminders: separatedMorningReminders.uncompletedReminders,
    uncompletedNoHourReminders: separatedNoHourReminders.uncompletedReminders,
    uncompletedTodayReminders: uncompletedReminders,
  };
};

export const sortScheduledReminders = (reminderLists) => {
  const allReminders = aggregateAllReminders(reminderLists);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const scheduledReminders = allReminders.filter((reminder) => reminder.date);

  const { completedReminders, uncompletedReminders } =
    separateReminders(scheduledReminders);

  const overdueReminders = [];
  const todayReminders = [];
  const upcomingReminders = [];

  scheduledReminders.forEach((reminder) => {
    const reminderDate = new Date(reminder.date);

    if (reminderDate < today) {
      overdueReminders.push(reminder);
      return;
    }

    if (reminderDate.toDateString() === today.toDateString()) {
      todayReminders.push(reminder);
      return;
    }

    upcomingReminders.push(reminder);
  });

  const sortedOverdueRemindersByHour = sortRemindersByHour(overdueReminders);
  const sortedTodayRemindersByHour = sortRemindersByHour(todayReminders);
  const sortedUpcomingRemindersByHour = sortRemindersByHour(upcomingReminders);

  const separatedOverdueReminders = separateReminders(
    sortedOverdueRemindersByHour,
  );
  const separatedTodayReminders = separateReminders(sortedTodayRemindersByHour);
  const separatedUpcomingReminders = separateReminders(
    sortedUpcomingRemindersByHour,
  );

  return {
    completedOverdueReminders: separatedOverdueReminders.completedReminders,
    completedScheduledReminders: completedReminders,
    completedTodayReminders: separatedTodayReminders.completedReminders,
    completedUpcomingReminders: separatedUpcomingReminders.completedReminders,
    uncompletedOverdueReminders: separatedOverdueReminders.uncompletedReminders,
    uncompletedScheduledReminders: uncompletedReminders,
    uncompletedTodayReminders: separatedTodayReminders.uncompletedReminders,
    uncompletedUpcomingReminders:
      separatedUpcomingReminders.uncompletedReminders,
  };
};

export const sortAllReminders = (reminderLists) => {
  const allReminders = aggregateAllReminders(reminderLists);

  const { completedReminders, uncompletedReminders } =
    separateReminders(allReminders);

  return {
    completedAllReminders: completedReminders,
    uncompletedAllReminders: uncompletedReminders,
  };
};

export const sortFlaggedReminders = (reminderLists) => {
  const allReminders = aggregateAllReminders(reminderLists);

  const flaggedReminders = allReminders.filter(
    (reminder) => reminder.flag === true,
  );

  const { completedReminders, uncompletedReminders } =
    separateReminders(flaggedReminders);

  return {
    completedFlaggedReminders: completedReminders,
    uncompletedFlaggedReminders: uncompletedReminders,
  };
};

export const sortCompletedReminders = (reminderLists) => {
  const allReminders = aggregateAllReminders(reminderLists);
  const today = new Date();

  const completedReminders = allReminders.filter((reminder) => reminder.state);

  const remindersFromLast7Days = [];
  const remindersFromLast30Days = [];
  const remindersOlderThan30Days = [];

  completedReminders.forEach((reminder) => {
    const checkedDate = new Date(reminder.checkedDate);
    const timeDiff = Math.abs(today.getTime() - checkedDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) {
      remindersFromLast7Days.push(reminder);
      return;
    }

    if (daysDiff <= 30) {
      remindersFromLast30Days.push(reminder);
      return;
    }

    remindersOlderThan30Days.push(reminder);
  });

  return {
    completedReminders: completedReminders,
    remindersFromLast7Days: remindersFromLast7Days.sort(
      (a, b) =>
        new Date(b.checkedDate).getTime() - new Date(a.checkedDate).getTime(),
    ),
    remindersFromLast30Days: remindersFromLast30Days.sort(
      (a, b) =>
        new Date(b.checkedDate).getTime() - new Date(a.checkedDate).getTime(),
    ),
    remindersOlderThan30Days: remindersOlderThan30Days.sort(
      (a, b) =>
        new Date(b.checkedDate).getTime() - new Date(a.checkedDate).getTime(),
    ),
  };
};

export const sortRemindersByListId = (reminderLists, listId) => {
  const reminderList = reminderLists.find(
    (list) => list.id === parseInt(listId),
  );

  const { completedReminders, uncompletedReminders } = separateReminders(
    reminderList.reminders,
  );

  return {
    completedListReminders: completedReminders,
    reminderList,
    uncompletedListReminders: uncompletedReminders,
  };
};
