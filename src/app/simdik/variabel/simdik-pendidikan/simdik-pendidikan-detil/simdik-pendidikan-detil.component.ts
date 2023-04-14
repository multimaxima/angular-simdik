import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from 'src/app/simdik/shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-pendidikan-detil',
  templateUrl: './simdik-pendidikan-detil.component.html',
  styleUrls: ['./simdik-pendidikan-detil.component.scss']
})
export class SimdikPendidikanDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikPendidikanDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      pendidikan: [this.data.pendidikan, Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formData.valid){
      this.submitted = true;
      this.spinner.show();
      if(this.data.id == undefined){
        this.api.post('pendidikan', this.formData.value).subscribe(res => {
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
        this.api.put('pendidikan', this.formData.value).subscribe(res => {
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
