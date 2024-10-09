import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    EventEmitter,
    input,
    Input,
    model,
    Output,
    Signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SensorsData } from '@snsrs-web/data-access/interfaces';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'lib-chart',
    standalone: true,
    imports: [CommonModule, AgCharts, MatButtonModule, MatIconModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
    @Input()
    isEditMode = false;

    // chartOptions: AgChartOptions = {};
    chartOptions = input.required<AgChartOptions>();

    @Output()
    closeChart = new EventEmitter();

    datas = input<SensorsData[]>();

    options: Signal<AgChartOptions> = computed(() => ({
        ...this.chartOptions(),
        ...{ data: this.datas() }
    }));
}
