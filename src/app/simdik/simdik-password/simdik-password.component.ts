import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-password',
  templateUrl: './simdik-password.component.html',
  styleUrls: ['./simdik-password.component.scss']
})
export class SimdikPasswordComponent {
  title = 'GANTI PASSWORD'
  formData: FormGroup;
  submitted = false;
  hide = true;
  hide1 = true;

  constructor(
    public dialogRef: MatDialogRef<SimdikPasswordComponent>,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ){
    this.formData = this.fb.group({
      password: ["",[Validators.required, Validators.minLength(6)]],
      konfirmasi: ["",[Validators.required, Validators.minLength(6)]],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit(){
    if(this.formData.valid){
      if(this.formData.controls['password'].value === this.formData.controls['konfirmasi'].value){
        this.spinner.show();
      this.submitted = true;
        this.api.post('profil-password', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Password berhasil dirubah.',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close(res);
        }, err => {
          this.spinner.hide();
          this.submitted = false;
          this.helper.error();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Konfirmasi password tidak sama!',
        })
      }      
    } else {
      return;
    }
  }
}
