import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-bel-event-detil',
  templateUrl: './simdik-bel-event-detil.component.html',
  styleUrls: ['./simdik-bel-event-detil.component.scss']
})
export class SimdikBelEventDetilComponent {
  formData: FormGroup;
  submitted = false;
  bel: any;

  constructor(
    public dialogRef: MatDialogRef<SimdikBelEventDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder,
  ){
    this.formData = this.fb.group({
      id: [this.data.data.id, ""],
      tanggal: [this.data.data.tanggal, Validators.required],
      jam: [this.data.data.jam, Validators.required],
      id_suara: [this.data.data.id_suara, Validators.required],
      keterangan: [this.data.data.keterangan, Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  onSubmit(){
    if(this.formData.valid){
      this.submitted = true;
      this.spinner.show();
      if(this.data.data.id == undefined){
        this.api.post('bel-event', this.formData.value).subscribe(res => {
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
        this.api.put('bel-event', this.formData.value).subscribe(res => {
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

  onPilih(id: any){
    this.api.get('bel-suara/'+id).subscribe(res=>{
      this.bel = res;
    },err=>{
      this.helper.error();
    });
  }
}
