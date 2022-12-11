import create from "zustand";

interface TimerState {
	minutes: number;
	seconds: number;
	isRunning: boolean;
	increaseMinutes: () => void;
	decreaseMinutes: () => void;
	toggleIsRunning: () => void;
	countdown: () => void;
	reset: () => void;
}

export const useTimerStore = create<TimerState>()((set) => ({
	minutes: 0,
	seconds: 0,
	isRunning: false,
	increaseMinutes: () => set((state) => ({ minutes: state.minutes + 1 })),
	decreaseMinutes: () => {
		set((state) => ({ minutes: Math.max(state.minutes - 1, 0) }));
	},
	toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
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
	reset: () => set((state) => ({ minutes: 0, seconds: 0 })),
}));
