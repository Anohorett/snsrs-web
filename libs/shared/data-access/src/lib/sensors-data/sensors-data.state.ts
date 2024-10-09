import { SensorsData } from '../../interfaces';

export type SensorsDataState = {
    isLoading: boolean;
    isEditMode: boolean;
    startDate: Date;
    endDate: Date;
    sensorsData: SensorsData[];
};

export const initialSensorsDataState: SensorsDataState = {
    isLoading: false,
    isEditMode: false,
    startDate: new Date('1/1/2024'),
    endDate: new Date('12/31/2024'),
    sensorsData: []
};
