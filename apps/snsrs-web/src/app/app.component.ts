import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SensorsDataStore } from '@snsrs-web/data-access';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
    standalone: true,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatToolbarModule,
        RouterModule,
        ReactiveFormsModule
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [provideNativeDateAdapter()],
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    readonly sensorsStore = inject(SensorsDataStore);
    readonly range = new FormGroup({
        startDate: new FormControl<Date>(
            new Date('1/1/2024'),
            Validators.required
        ),
        endDate: new FormControl<Date>(
            new Date('12/1/2024'),
            Validators.required
        )
    });
    title = 'snsrs-web';

    formCahngeSubscr = new Subscription();

    ngOnInit() {
        this.formCahngeSubscr = this.range.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300))
            .subscribe((value) => {
                if (!this.range.invalid && !value.endDate) {
                    return;
                }

                const rangeValue = {
                    startDate: value.startDate || new Date('1/1/2024'),
                    endDate: value.endDate || new Date('31/12/2024')
                };

                this.sensorsStore.setDataRange(rangeValue);
            });
    }

    getData() {
        this.sensorsStore.getPoints();
    }

    toggleEditMode(event: MatSlideToggleChange) {
        this.sensorsStore.setIsEditMode(event.checked);
    }

    ngOnDestroy(): void {
        this.formCahngeSubscr.unsubscribe();
    }
}
