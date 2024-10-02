import { SensorsData } from '../../interfaces';

export type SensorsDataState = {
    isLoading: boolean;
    isEditMode: boolean;
    sensorsData: SensorsData[];
};

export const initialSensorsDataState: SensorsDataState = {
    isLoading: false,
    isEditMode: false,
    sensorsData: []
};
