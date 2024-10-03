import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SensorsDataStore } from '@snsrs-web/data-access';
import { ChartComponent } from '@snsrs-web/shared-ui';
import { rainbowColors } from '@snsrs-web/shared/constants';
import { GridTile } from '@snsrs-web/shared/interfaces';
import { AgChartOptions } from 'ag-charts-community';
import { ChartSettingsModalComponent } from '../chart-settings-modal/chart-settings-modal.component';

// Chart Options Type Interface

@Component({
    selector: 'lib-dashboard',
    standalone: true,
    imports: [
        ChartComponent,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    readonly dialog = inject(MatDialog);
    readonly sensorsStore = inject(SensorsDataStore);
    readonly MAX_CHARTS_LENGHT = 4;
    chartArray: { tile: GridTile; options: AgChartOptions }[] = [];

    cdr = inject(ChangeDetectorRef);
    chartOptions: AgChartOptions;

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

    addChart() {
        const dialogRef = this.dialog.open(ChartSettingsModalComponent, {
            height: '50%',
            width: '40%'
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);

            this.chartArray.push({
                tile: { color: rainbowColors.purple, cols: 2, rows: 2 },
                options: this.chartOptions
            });

            console.log(this.chartArray);
            this.cdr.markForCheck();
        });
    }

    closeChart(index: number) {
        this.chartArray.splice(index, 1);
    }
}
