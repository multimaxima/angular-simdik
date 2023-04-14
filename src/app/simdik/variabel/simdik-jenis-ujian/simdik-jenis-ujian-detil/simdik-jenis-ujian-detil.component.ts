import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from 'src/app/simdik/shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-jenis-ujian-detil',
  templateUrl: './simdik-jenis-ujian-detil.component.html',
  styleUrls: ['./simdik-jenis-ujian-detil.component.scss']
})
export class SimdikJenisUjianDetilComponent {
  formData: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikJenisUjianDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.id, ""],
      jenis_ujian: [this.data.jenis_ujian, Validators.required],
      kode: [this.data.kode, ""],
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
        this.api.post('jenis-ujian', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.tambah();
          this.dialogRef.close(res);
        }, err => {
          this.spinner.hide();
          this.submitted = false;
          this.helper.error();
        });
      } else {
        this.api.put('jenis-ujian', this.formData.value).subscribe(res => {
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
