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
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
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
