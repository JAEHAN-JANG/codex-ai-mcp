import {
  addHabit,
  editHabitName,
  getDayKey,
  getStats,
  normalizeHabits,
  removeHabit,
  resetHabits,
  toggleHabit
} from "./core.js";

const legacyStorageKey = "habit-check:habits";
const dayKey = getDayKey();
const storageKey = `habit-check:habits:${dayKey}`;

const form = document.querySelector("#habit-form");
const input = document.querySelector("#habit-name");
const error = document.querySelector("#form-error");
const list = document.querySelector("#habit-list");
const emptyState = document.querySelector("#empty-state");
const completedCount = document.querySelector("#completed-count");
const completionRate = document.querySelector("#completion-rate");
const resetButton = document.querySelector("#reset-habits");
const dayLabel = document.querySelector("#day-label");

let habits = loadHabits();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    habits = addHabit(habits, input.value);
    input.value = "";
    error.textContent = "";
    saveAndRender();
  } catch (caught) {
    error.textContent = caught instanceof Error ? caught.message : "Could not add habit.";
  }
});

list.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const item = target.closest("[data-id]");
  if (!(item instanceof HTMLElement)) {
    return;
  }

  const id = item.dataset.id;

  if (target.matches("[data-action='toggle']")) {
    habits = toggleHabit(habits, id);
    saveAndRender();
  }

  if (target.matches("[data-action='remove']")) {
    habits = removeHabit(habits, id);
    saveAndRender();
  }
});

list.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (!target.matches("[data-action='edit']")) {
    return;
  }

  const item = target.closest("[data-id]");
  if (!(item instanceof HTMLElement)) {
    return;
  }

  try {
    habits = editHabitName(habits, item.dataset.id, target.value);
    error.textContent = "";
    saveAndRender();
  } catch (caught) {
    error.textContent = caught instanceof Error ? caught.message : "Could not edit habit.";
    render();
  }
});

resetButton.addEventListener("click", () => {
  if (habits.length === 0) {
    return;
  }

  if (window.confirm("Reset all habits for today?")) {
    habits = resetHabits();
    error.textContent = "";
    saveAndRender();
  }
});

function render() {
  const stats = getStats(habits);

  completedCount.textContent = String(stats.completed);
  completionRate.textContent = `${stats.completionRate}%`;
  emptyState.hidden = habits.length > 0;
  resetButton.disabled = habits.length === 0;
  dayLabel.textContent = dayKey;

  list.replaceChildren(
    ...habits.map((habit) => {
      const item = document.createElement("li");
      item.className = habit.done ? "habit-item is-done" : "habit-item";
      item.dataset.id = habit.id;

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "check-button";
      toggle.dataset.action = "toggle";
      toggle.setAttribute(
        "aria-label",
        habit.done ? `Mark ${habit.name} as not done` : `Mark ${habit.name} as done`
      );
      toggle.textContent = habit.done ? "OK" : "";

      const name = document.createElement("input");
      name.type = "text";
      name.className = "habit-name";
      name.dataset.action = "edit";
      name.value = habit.name;
      name.maxLength = 40;
      name.setAttribute("aria-label", `Edit ${habit.name}`);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-button";
      remove.dataset.action = "remove";
      remove.setAttribute("aria-label", `Remove ${habit.name}`);
      remove.textContent = "X";

      item.append(toggle, name, remove);
      return item;
    })
  );
}

function saveAndRender() {
  localStorage.setItem(storageKey, JSON.stringify(habits));
  render();
}

function loadHabits() {
  try {
    const stored = localStorage.getItem(storageKey) ?? localStorage.getItem(legacyStorageKey) ?? "[]";
    return normalizeHabits(JSON.parse(stored));
  } catch {
    return [];
  }
}
