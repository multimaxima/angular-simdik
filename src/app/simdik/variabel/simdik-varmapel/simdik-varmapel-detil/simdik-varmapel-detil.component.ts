import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from 'src/app/simdik/shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-varmapel-detil',
  templateUrl: './simdik-varmapel-detil.component.html',
  styleUrls: ['./simdik-varmapel-detil.component.scss']
})
export class SimdikVarmapelDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikVarmapelDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      mapel: [this.data.mapel, Validators.required],
      kode: [this.data.kode, ""],
      tingkat_1: [this.data.tingkat_1, ""],
      tingkat_2: [this.data.tingkat_2, ""],
      tingkat_3: [this.data.tingkat_3, ""],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit(){
    if(this.formData.valid){
      this.spinner.show();
      this.submitted = true;
      if(this.data.id == undefined){
        this.api.post('mata-pelajaran', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.tambah();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.error();
        });
      } else {
        this.api.put('mata-pelajaran', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.simpan();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.error();
        })
      }      
    } else {
      return;
    }
  }
}
