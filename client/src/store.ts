import create from "zustand";

interface TimerState {
	minutes: number;
	seconds: number;
	isRunning: boolean;
	increaseMinutes: () => void;
	decreaseMinutes: () => void;
	toggleIsRunning: () => void;
}

export const useTimerStore = create<TimerState>()((set) => ({
	minutes: 0,
	seconds: 0,
	isRunning: false,
	increaseMinutes: () => set((state) => ({ minutes: state.minutes + 1 })),
	decreaseMinutes: () => {
		set((state) => ({ minutes: Math.max(state.minutes - 1, 0) }))
    },
	toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
}));
