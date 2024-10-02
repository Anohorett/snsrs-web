import { SensorsData } from '../../interfaces';

export type SensorsDataState = {
    isLoading: boolean;
    sensorsData: SensorsData[];
};

export const initialSensorsDataState: SensorsDataState = {
    isLoading: false,
    sensorsData: []
};
