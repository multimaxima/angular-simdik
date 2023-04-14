import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-pengaturan-detil',
  templateUrl: './simdik-pengaturan-detil.component.html',
  styleUrls: ['./simdik-pengaturan-detil.component.scss']
})
export class SimdikPengaturanDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikPengaturanDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      jenis: [this.data.jenis, Validators.required],
      keterangan: [this.data.keterangan, Validators.required],
      tanggal: [this.data.tanggal, ""],
      akhir: [this.data.akhir, ""],
      nominal: [this.data.nominal, Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit(){
    if(this.formData.valid){
      this.submitted = true;
      this.spinner.show();
      if(this.data.id == undefined){
        this.api.post('pengaturan-pembayaran', this.formData.value).subscribe(res => {
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
        this.api.put('pengaturan-pembayaran', this.formData.value).subscribe(res => {
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
