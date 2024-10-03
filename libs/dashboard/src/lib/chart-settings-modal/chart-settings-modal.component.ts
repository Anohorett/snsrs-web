import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'lib-chart-settings-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatFormFieldModule,
        MatDialogTitle,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './chart-settings-modal.component.html',
    styleUrl: './chart-settings-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSettingsModalComponent {
    private formBuilder = inject(FormBuilder);

    chartForm = this.formBuilder.group({
        firstName: [''],
        lastName: ['']
    });
}
