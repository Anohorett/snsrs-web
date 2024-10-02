import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { rainbowColors } from '@snsrs-web/shared/constants';
import { GridTile } from '@snsrs-web/shared/interfaces';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

// Chart Options Type Interface

@Component({
    selector: 'lib-dashboard',
    standalone: true,
    imports: [CommonModule, MatGridListModule, AgCharts],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    chartOptions: AgChartOptions;
    tiles: GridTile[] = [
        // {
        //     color: rainbowColors.red,
        //     cols: 3,
        //     rows: 2
        // },
        {
            color: rainbowColors.green,
            cols: 1,
            rows: 2
        },
        {
            color: rainbowColors.blue,
            cols: 2,
            rows: 2
        },
        {
            color: rainbowColors.yellow,
            cols: 2,
            rows: 2
        }
    ];

    constructor() {
        this.chartOptions = {
            // Data: Data to be displayed in the chart
            data: [
                { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
                { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
                { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
                { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
                { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
                { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 }
            ],
            // Series: Defines which chart type and data to use
            series: [
                {
                    type: 'bar',
                    xKey: 'month',
                    yKey: 'iceCreamSales',
                    stroke: 'red',
                    fill: 'lightgreen'
                },
                {
                    type: 'line',
                    xKey: 'month',
                    yKey: 'iceCreamSales',
                    stroke: 'red',
                    marker: {
                        fill: 'purple'
                    }
                    // fill: 'purple'
                }
            ]
        };
    }
}
