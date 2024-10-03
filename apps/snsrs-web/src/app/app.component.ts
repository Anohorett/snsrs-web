import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
    MatSlideToggleChange,
    MatSlideToggleModule
} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SensorsDataStore } from '@snsrs-web/data-access';

@Component({
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatToolbarModule,
        RouterModule,
        ReactiveFormsModule
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    readonly sensorsStore = inject(SensorsDataStore);
    title = 'snsrs-web';

    getData() {
        this.sensorsStore.getPoints();
    }

    toggleEditMode(event: MatSlideToggleChange) {
        this.sensorsStore.setIsEditMode(event.checked);
    }
}
