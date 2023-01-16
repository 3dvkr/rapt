import create from "zustand";

interface TimerState {
	minutes: number;
	seconds: number;
	start: Date;
	duration: number;
	isRunning: boolean;
	hasStarted: boolean;
	increaseMinutes: () => void;
	decreaseMinutes: () => void;
	toggleIsRunning: () => void;
	toggleHasStarted: () => void;
	setCanSubmit: (newState: boolean) => void;
	countdown: () => void;
	reset: () => void;
	canSubmit: boolean;
	setSessionInfo: () => void;
}

export const useTimerStore = create<TimerState>()((set) => ({
	minutes: 0,
	seconds: 0,
	start: new Date(),
	duration: 0,
	isRunning: false,
	hasStarted: false,
	canSubmit: false,
	increaseMinutes: () => set((state) => ({ minutes: state.minutes + 1 })),
	decreaseMinutes: () => {
		set((state) => ({ minutes: Math.max(state.minutes - 1, 0) }));
	},
	toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
	toggleHasStarted: () => set((state) => ({ isRunning: !state.hasStarted })),
	setCanSubmit: (newState) => set((state) => ({ canSubmit: newState })),
	countdown: () =>
		set((state) => {
			if (state.seconds === 0 && state.minutes === 0) {
				return { minutes: 0, seconds: 0 };
			}
			if (state.seconds === 0) {
				return { minutes: Math.max(state.minutes - 1, 0), seconds: 59 };
			} else {
				return { seconds: Math.max(state.seconds - 1, 0) };
			}
		}),
	reset: () =>
		set((state) => {
			return { minutes: 0, seconds: 0, isRunning: false, hasStarted: false };
		}),
	setSessionInfo: () =>
		set((state) => {
			return { duration: state.minutes, start: new Date(), hasStarted: true };
		}),
}));
