import {
    MAT_COLOR_FORMATS,
    NGX_MAT_COLOR_FORMATS,
    NgxMatColorPickerModule
} from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ChartSetting } from '@snsrs-web/shared/interfaces';

@Component({
    selector: 'lib-chart-settings-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        NgxMatColorPickerModule,
        ReactiveFormsModule
    ],
    templateUrl: './chart-settings-modal.component.html',
    styleUrl: './chart-settings-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }]
})
export class ChartSettingsModalComponent {
    private formBuilder = inject(FormBuilder);
    readonly dialogRef = inject(MatDialogRef<ChartSettingsModalComponent>);
    readonly chatTypes = ['line', 'bar'];

    chartForm = this.formBuilder.group({
        dataTypes: [[''], Validators.required],
        strokeColor: [''],
        type: ['', Validators.required]
    });

    onNoClick() {
        this.dialogRef.close();
    }

    applySettings() {
        console.log(this.chartForm.value);

        if (!this.chartForm.value.dataTypes) {
            return;
        }

        const charSettingsList: ChartSetting[] =
            this.chartForm.value.dataTypes?.map((dataType) => {
                const setting: ChartSetting = {
                    type: 'line',
                    dataType
                };

                return setting;
            });

        this.dialogRef.close(charSettingsList);
    }
}
