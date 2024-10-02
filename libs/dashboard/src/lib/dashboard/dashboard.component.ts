import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { rainbowColors } from '@snsrs-web/shared/constants';
import { GridTile } from '@snsrs-web/shared/interfaces';

@Component({
    selector: 'lib-dashboard',
    standalone: true,
    imports: [CommonModule, MatGridListModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    tiles: GridTile[] = [
        {
            color: rainbowColors.red,
            cols: 2,
            rows: 2
        },
        {
            color: rainbowColors.green,
            cols: 2,
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
}
