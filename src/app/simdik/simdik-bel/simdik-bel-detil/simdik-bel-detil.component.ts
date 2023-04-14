import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-bel-detil',
  templateUrl: './simdik-bel-detil.component.html',
  styleUrls: ['./simdik-bel-detil.component.scss']
})
export class SimdikBelDetilComponent {
  formData: FormGroup;
  hari: any[] = [];
  suara: any[] = [];
  testSuara: any;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SimdikBelDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.data.id, ""],
      id_hari: [this.data.data.id_hari, Validators.required],
      jam: [this.data.data.jam, Validators.required],
      id_suara: [this.data.data.id_suara, Validators.required],
      keterangan: [this.data.data.keterangan, ""],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit(){
    if(this.formData.valid){
      this.submitted = true;
      if(this.data.data.id == undefined){
        this.api.post('bel-sekolah', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.helper.tambah();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.helper.error();
        });
      } else {
        this.api.put('bel-sekolah', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.helper.simpan();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.helper.error();
        })
      }      
    } else {
      return;
    }
  }

  onPilih(id: any){
    this.api.get('bel-suara/'+id).subscribe(res=>{
      this.testSuara = res;
    },err=>{
      this.helper.error();
    });
  }
}
