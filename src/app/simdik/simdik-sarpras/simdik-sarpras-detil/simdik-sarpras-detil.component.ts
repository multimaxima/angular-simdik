import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-sarpras-detil',
  templateUrl: './simdik-sarpras-detil.component.html',
  styleUrls: ['./simdik-sarpras-detil.component.scss']
})
export class SimdikSarprasDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikSarprasDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ) {
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      ganjil: [this.data.ganjil, ""],
      genap: [this.data.genap, ""],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit() {
    if (this.formData.valid) {
      this.submitted = true;
      this.spinner.show();
      this.api.put('sarpras', this.formData.value).subscribe(res => {
        this.submitted = false;
        this.spinner.hide();
        this.helper.simpan();
        this.dialogRef.close(res);
      }, err => {
        this.submitted = false;
        this.spinner.hide();
        this.helper.error();
      })
    } else {
      return;
    }
  }
}
