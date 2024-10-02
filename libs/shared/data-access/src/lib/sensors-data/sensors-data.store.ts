import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { SensorsDataApiService } from './sensors-data.api.service';
import { initialSensorsDataState } from './sensors-data.state';
import { SensorsData } from '../../interfaces';

export const SensorsDataStore = signalStore(
    { providedIn: 'root' },
    withState(initialSensorsDataState),
    withMethods(
        (store, sensorsDataApiService = inject(SensorsDataApiService)) => ({
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
