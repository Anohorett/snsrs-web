import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SensorsDataStore } from '@snsrs-web/data-access';
import { ChartComponent } from '@snsrs-web/shared-ui';
import { rainbowColors } from '@snsrs-web/shared/constants';
import { ChartSetting, GridTile } from '@snsrs-web/shared/interfaces';
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
export class DashboardComponent implements OnInit {
    readonly dialog = inject(MatDialog);
    readonly sensorsStore = inject(SensorsDataStore);
    readonly MAX_CHARTS_LENGHT = 4;
    chartArray = signal<{ tile: GridTile; options: AgChartOptions }[]>([]);

    ngOnInit(): void {
        this.sensorsStore.getPoints();
    }

    addChart() {
        const dialogRef = this.dialog.open(ChartSettingsModalComponent, {
            height: '50%',
            minWidth: '40%'
        });

        dialogRef.afterClosed().subscribe((chartSetting: ChartSetting[]) => {
            if (!chartSetting) {
                return;
            }

            const seriesOfChart = chartSetting.map((x) => {
                return {
                    ...{
                        type: x.type,
                        xKey: 'date',
                        yKey: x.dataType,
                        stroke: x.strokeColor || 'blue'
                    },
                    ...(x.type === 'bar'
                        ? { fill: x.strokeColor || 'red' }
                        : {
                              marker: {
                                  fill: x.strokeColor || 'green'
                              }
                          })
                };
            });

            const chartOptions: AgChartOptions = {
                data: [...this.sensorsStore.sensorsData()],

                // for avoid type error with passing arrays of other objects
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                series: seriesOfChart as any[]
            };
            const arr = [
                ...this.chartArray(),
                ...[
                    {
                        tile: { color: rainbowColors.purple, cols: 2, rows: 2 },
                        options: chartOptions
                    }
                ]
            ];

            this.chartArray.set(arr);
        });
    }

    closeChart(index: number) {
        this.chartArray.update((chartArray) =>
            chartArray.filter((_, idx) => idx !== index)
        );
    }
}
