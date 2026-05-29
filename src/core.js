export function createHabit(name, now = new Date()) {
  const trimmed = normalizeName(name);

  if (!trimmed) {
    throw new Error("Habit name is required.");
  }

  return {
    id: makeId(trimmed, now),
    name: trimmed,
    done: false,
    createdAt: now.toISOString()
  };
}

export function addHabit(habits, name, now = new Date()) {
  const habit = createHabit(name, now);
  return [...habits, habit];
}

export function toggleHabit(habits, id) {
  return habits.map((habit) =>
    habit.id === id ? { ...habit, done: !habit.done } : habit
  );
}

export function editHabitName(habits, id, name) {
  const trimmed = normalizeName(name);

  if (!trimmed) {
    throw new Error("Habit name is required.");
  }

  return habits.map((habit) =>
    habit.id === id ? { ...habit, name: trimmed } : habit
  );
}

export function removeHabit(habits, id) {
  return habits.filter((habit) => habit.id !== id);
}

export function resetHabits() {
  return [];
}

export function getStats(habits) {
  const total = habits.length;
  const completed = habits.filter((habit) => habit.done).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, completionRate };
}

export function getDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeHabits(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((habit) => habit && typeof habit.id === "string" && typeof habit.name === "string")
    .map((habit) => ({
      id: habit.id,
      name: normalizeName(habit.name),
      done: Boolean(habit.done),
      createdAt: typeof habit.createdAt === "string" ? habit.createdAt : new Date(0).toISOString()
    }))
    .filter((habit) => habit.name.length > 0);
}

function normalizeName(name) {
  return String(name ?? "").trim().replace(/\s+/g, " ");
}

function makeId(name, now) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${slug || "habit"}-${now.getTime()}`;
}
