import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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

    @Input({ required: true })
    chartOptions: AgChartOptions = {};

    @Output()
    closeChart = new EventEmitter();
}
