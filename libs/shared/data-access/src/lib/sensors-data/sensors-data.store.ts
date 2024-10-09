import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { SensorsDataApiService } from './sensors-data.api.service';
import { initialSensorsDataState } from './sensors-data.state';
import { SensorsData } from '../../interfaces';

export const SensorsDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialSensorsDataState),
    withComputed(({ sensorsData, startDate, endDate }) => ({
        sensorsForThePeriod: computed(() => {
            const newSensorsData = sensorsData().filter(
                (x) =>
                    new Date(x.date) >= startDate() &&
                    new Date(x.date) <= endDate()
            );
            return newSensorsData;
        })
    })),
    withMethods(
        (store, sensorsDataApiService = inject(SensorsDataApiService)) => ({
            setIsEditMode(isEditMode: boolean) {
                patchState(store, { isEditMode });
            },
            setDataRange(range: { startDate: Date; endDate: Date }) {
                patchState(store, { ...range });
            },
            async getPoints(): Promise<void> {
                patchState(store, { isLoading: true });

                const sensorsData: SensorsData[] =
                    await sensorsDataApiService.getData();

                patchState(store, {
                    sensorsData,
                    isLoading: false
                });
            }
        })
    )
);
