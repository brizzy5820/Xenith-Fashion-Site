"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import {
  cellKey,
  DayOfWeek,
  TimePeriod,
  TimetableEntry,
  TimetableState,
} from "@/src/features/students/schedule/type/schedule.type";
import {
  defaultEntries,
  defaultPeriods,
} from "@/src/features/students/schedule/data/schedule.data";

const STORAGE_KEY = "elm.timetable.v1";

type EntryPayload = Omit<TimetableEntry, "id" | "day" | "periodId">;

type Action =
  | { type: "HYDRATE"; state: TimetableState }
  | { type: "SET_ENTRY"; day: DayOfWeek; periodId: string; payload: EntryPayload }
  | { type: "CLEAR_ENTRY"; day: DayOfWeek; periodId: string }
  | { type: "ADD_PERIOD"; period: TimePeriod }
  | { type: "UPDATE_PERIOD"; id: string; patch: Partial<Omit<TimePeriod, "id">> }
  | { type: "REMOVE_PERIOD"; id: string }
  | { type: "RESET" };

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const byStartTime = (a: TimePeriod, b: TimePeriod) =>
  a.startTime.localeCompare(b.startTime);

const seedState = (): TimetableState => ({
  periods: defaultPeriods.map((period) => ({ ...period })),
  entries: defaultEntries.map((item) => ({ ...item })),
});

function reducer(state: TimetableState, action: Action): TimetableState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "SET_ENTRY": {
      const others = state.entries.filter(
        (item) =>
          !(item.day === action.day && item.periodId === action.periodId),
      );

      return {
        ...state,
        entries: [
          ...others,
          {
            id: makeId(),
            day: action.day,
            periodId: action.periodId,
            ...action.payload,
          },
        ],
      };
    }

    case "CLEAR_ENTRY":
      return {
        ...state,
        entries: state.entries.filter(
          (item) =>
            !(item.day === action.day && item.periodId === action.periodId),
        ),
      };

    case "ADD_PERIOD":
      return {
        ...state,
        periods: [...state.periods, action.period].sort(byStartTime),
      };

    case "UPDATE_PERIOD":
      return {
        ...state,
        periods: state.periods
          .map((period) =>
            period.id === action.id
              ? { ...period, ...action.patch }
              : period,
          )
          .sort(byStartTime),
      };

    case "REMOVE_PERIOD":
      return {
        periods: state.periods.filter((period) => period.id !== action.id),
        entries: state.entries.filter(
          (item) => item.periodId !== action.id,
        ),
      };

    case "RESET":
      return seedState();

    default:
      return state;
  }
}

interface TimetableContextValue extends TimetableState {
  entryMap: Map<string, TimetableEntry>;
  setEntry: (
    day: DayOfWeek,
    periodId: string,
    payload: EntryPayload,
  ) => void;
  clearEntry: (day: DayOfWeek, periodId: string) => void;
  addPeriod: (period: Omit<TimePeriod, "id">) => void;
  updatePeriod: (id: string, patch: Partial<Omit<TimePeriod, "id">>) => void;
  removePeriod: (id: string) => void;
  reset: () => void;
}

const TimetableContext = createContext<TimetableContextValue | null>(null);

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as TimetableState;

        if (Array.isArray(parsed?.periods) && Array.isArray(parsed?.entries)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      } catch {
        // Ignore corrupt storage and fall back to the seed.
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<TimetableContextValue>(() => {
    const entryMap = new Map<string, TimetableEntry>();

    for (const item of state.entries) {
      entryMap.set(cellKey(item.day, item.periodId), item);
    }

    return {
      ...state,
      entryMap,
      setEntry: (day, periodId, payload) =>
        dispatch({ type: "SET_ENTRY", day, periodId, payload }),
      clearEntry: (day, periodId) =>
        dispatch({ type: "CLEAR_ENTRY", day, periodId }),
      addPeriod: (period) =>
        dispatch({ type: "ADD_PERIOD", period: { ...period, id: makeId() } }),
      updatePeriod: (id, patch) =>
        dispatch({ type: "UPDATE_PERIOD", id, patch }),
      removePeriod: (id) => dispatch({ type: "REMOVE_PERIOD", id }),
      reset: () => dispatch({ type: "RESET" }),
    };
  }, [state]);

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  const context = useContext(TimetableContext);

  if (!context) {
    throw new Error("useTimetable must be used within a TimetableProvider");
  }

  return context;
}
