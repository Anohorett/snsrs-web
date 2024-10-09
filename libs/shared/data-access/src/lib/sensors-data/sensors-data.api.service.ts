import { Injectable } from '@angular/core';
import { SensorsData } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class SensorsDataApiService {
    getData() {
        return new Promise<SensorsData[]>((resolve) => {
            setTimeout(() => {
                const data = this.generateFakeSensorsData();
                resolve(data);
            }, Math.floor(Math.random() * 3000));
        });
    }

    private generateFakeSensorsData(): SensorsData[] {
        const monthNameList = [
            'Wed Jan 03 2024 00:00:00 GMT+0300',
            'Thu Feb 01 2024 00:00:00 GMT+0300',
            'Fri Mar 01 2024 00:00:00 GMT+0300',
            'Mon Apr 01 2024 00:00:00 GMT+0300 ',
            'Sat May 11 2024 00:00:00 GMT+0300',
            'Fri Jun 07 2024 00:00:00 GMT+0300',
            'Tue Jul 23 2024 00:00:00 GMT+0300',
            'Thu Aug 15 2024 00:00:00 GMT+0300',
            'Fri Sep 27 2024 00:00:00 GMT+0300',
            'Wed Oct 09 2024 00:00:00 GMT+0300',
            'Fri Nov 08 2024 00:00:00 GMT+0300',
            'Tue Dec 31 2024 00:00:00 GMT+0300'
        ];
        const data: SensorsData[] = [];
        for (let i = 0; i < 12; i++) {
            const item: SensorsData = {
                date: monthNameList[i],
                humidity: Math.floor(Math.random() * 100),
                light: Math.floor(Math.random() * 100),
                temperature: Math.floor(Math.random() * 100)
            };

            data.push(item);
        }

        return data;
    }
}
