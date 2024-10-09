import {
    Color,
    MAT_COLOR_FORMATS,
    NGX_MAT_COLOR_FORMATS,
    NgxMatColorPickerModule
} from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
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

    axies: FormGroup[] = [];
    prevAxies: string[] = [];

    onNoClick() {
        this.dialogRef.close();
    }

    applySettings() {
        if (!this.axies.length) {
            return;
        }

        const charSettingsList = this.axies.map((x, idx) => {
            const setting: ChartSetting = {
                type: x.controls['type'].value,
                dataType: this.prevAxies[idx],
                strokeColor: '#' + x.controls['color'].value?.hex
            };
            return setting;
        });

        this.dialogRef.close(charSettingsList);
    }

    changeChartLines(event: MatButtonToggleChange) {
        const newAxies: string[] = event.value;

        //adding
        if (this.prevAxies.length < newAxies.length) {
            const group = this.formBuilder.group({
                type: this.formBuilder.control('line'),
                color: this.formBuilder.control(
                    new Color(
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255)
                    )
                )
            });

            this.axies.push(group);
            this.prevAxies = newAxies;
            return;
        }

        //removing
        const indexOfDelEl = this.prevAxies.findIndex(
            (x) => !newAxies.includes(x)
        );

        this.axies = this.axies.filter((_, idx) => idx !== indexOfDelEl);
        this.prevAxies = newAxies;
    }
}
