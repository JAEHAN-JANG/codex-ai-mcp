import assert from "node:assert/strict";
import {
  addHabit,
  createHabit,
  editHabitName,
  filterHabits,
  getDayKey,
  getStats,
  normalizeHabits,
  removeHabit,
  resetHabits,
  toggleHabit
} from "../src/core.js";

const fixedDate = new Date("2026-05-29T00:00:00.000Z");

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

test("createHabit trims names and starts incomplete", () => {
  const habit = createHabit("  Read   daily  ", fixedDate);

  assert.equal(habit.name, "Read daily");
  assert.equal(habit.done, false);
  assert.equal(habit.createdAt, fixedDate.toISOString());
  assert.equal(habit.id, `read-daily-${fixedDate.getTime()}`);
});

test("createHabit rejects blank names", () => {
  assert.throws(() => createHabit("   ", fixedDate), /Habit name is required/);
});

test("addHabit appends without mutating the original list", () => {
  const original = [];
  const next = addHabit(original, "Stretch", fixedDate);

  assert.equal(original.length, 0);
  assert.equal(next.length, 1);
  assert.equal(next[0].name, "Stretch");
});

test("toggleHabit flips only the matching habit", () => {
  const habits = [
    { id: "a", name: "Read", done: false, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: false, createdAt: fixedDate.toISOString() }
  ];

  const next = toggleHabit(habits, "b");

  assert.equal(next[0].done, false);
  assert.equal(next[1].done, true);
  assert.equal(habits[1].done, false);
});

test("editHabitName updates only the matching habit", () => {
  const habits = [
    { id: "a", name: "Read", done: false, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: false, createdAt: fixedDate.toISOString() }
  ];

  const next = editHabitName(habits, "b", "  Evening walk  ");

  assert.equal(next[0].name, "Read");
  assert.equal(next[1].name, "Evening walk");
  assert.equal(habits[1].name, "Walk");
});

test("editHabitName rejects blank names", () => {
  const habits = [{ id: "a", name: "Read", done: false, createdAt: fixedDate.toISOString() }];

  assert.throws(() => editHabitName(habits, "a", " "), /Habit name is required/);
});

test("removeHabit removes only the matching habit", () => {
  const habits = [
    { id: "a", name: "Read", done: false, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: true, createdAt: fixedDate.toISOString() }
  ];

  assert.deepEqual(removeHabit(habits, "a"), [habits[1]]);
});

test("resetHabits returns an empty list", () => {
  assert.deepEqual(resetHabits(), []);
});

test("getStats calculates completion rate", () => {
  const habits = [
    { id: "a", name: "Read", done: true, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: false, createdAt: fixedDate.toISOString() },
    { id: "c", name: "Water", done: true, createdAt: fixedDate.toISOString() }
  ];

  assert.deepEqual(getStats(habits), {
    total: 3,
    completed: 2,
    completionRate: 67
  });
});

test("filterHabits hides completed habits without changing the source list", () => {
  const habits = [
    { id: "a", name: "Read", done: true, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: false, createdAt: fixedDate.toISOString() },
    { id: "c", name: "Water", done: true, createdAt: fixedDate.toISOString() }
  ];

  assert.deepEqual(filterHabits(habits, { hideDone: true }), [habits[1]]);
  assert.equal(habits.length, 3);
});

test("filterHabits returns every habit when hideDone is off", () => {
  const habits = [
    { id: "a", name: "Read", done: true, createdAt: fixedDate.toISOString() },
    { id: "b", name: "Walk", done: false, createdAt: fixedDate.toISOString() }
  ];

  assert.equal(filterHabits(habits, { hideDone: false }), habits);
});

test("getDayKey formats dates for per-day storage", () => {
  assert.equal(getDayKey(new Date(2026, 4, 9)), "2026-05-09");
});

test("normalizeHabits drops invalid rows and normalizes fields", () => {
  const value = [
    null,
    { id: "a", name: "  Read  ", done: 1 },
    { id: 2, name: "Walk", done: false },
    { id: "b", name: "   ", done: false }
  ];

  assert.deepEqual(normalizeHabits(value), [
    {
      id: "a",
      name: "Read",
      done: true,
      createdAt: "1970-01-01T00:00:00.000Z"
    }
  ]);
});
