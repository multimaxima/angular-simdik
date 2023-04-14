import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from 'src/app/simdik/shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-pekerjaan-detil',
  templateUrl: './simdik-pekerjaan-detil.component.html',
  styleUrls: ['./simdik-pekerjaan-detil.component.scss']
})
export class SimdikPekerjaanDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikPekerjaanDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      pekerjaan: [this.data.pekerjaan, Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {    
  }

  onSubmit(){
    if(this.formData.valid){
      this.spinner.show();
      this.submitted = true;
      if(this.data.id == undefined){
        this.api.post('pekerjaan', this.formData.value).subscribe(res => {
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
        this.api.put('pekerjaan', this.formData.value).subscribe(res => {
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
