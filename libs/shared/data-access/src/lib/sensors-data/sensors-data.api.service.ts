import { Injectable } from '@angular/core';
import { SensorsData } from '../../interfaces';

const SENSORS_DATA: SensorsData[] = [
    {
        date: 'Jan',
        humidity: 52,
        light: 500,
        temperature: -2
    },
    {
        date: 'Feb',
        humidity: 52,
        light: 320,
        temperature: -12
    },
    {
        date: 'Mar',
        humidity: 52,
        light: 480,
        temperature: 10
    }
];

@Injectable({ providedIn: 'root' })
export class SensorsDataApiService {
    getData() {
        return new Promise<SensorsData[]>((resolve) => {
            setTimeout(() => {
                const data = SENSORS_DATA;
                resolve(data);
            }, Math.floor(Math.random() * 3000));
        });
    }
}
