import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-mapel-detil',
  templateUrl: './simdik-mapel-detil.component.html',
  styleUrls: ['./simdik-mapel-detil.component.scss']
})
export class SimdikMapelDetilComponent {
  formData: FormGroup;
  submitted = false;
  kelas: any = [];
  jurusan: any = [];
  guru: any = [];
  mata: any = [];

  constructor(
    public dialogRef: MatDialogRef<SimdikMapelDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ){
    this.formData = this.fb.group({
      id: ["",""],
      id_sekolah: ["",Validators.required],
      id_kelas_sekolah: ["",Validators.required],
      id_simdik: ["",""],
      id_mapel: ["",Validators.required],
      hari: [data.hari,Validators.required],
      jam: ["",Validators.required],
      awal: ["",Validators.required],
      akhir: ["",Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('mapel/'+this.data.data).subscribe(res=>{
      this.kelas = res.kelas;
      this.jurusan = res.jurusan;
      this.guru = res.guru;
      this.mata = res.mapel;
  
      if(this.data.data == '0'){     
        this.formData.controls['id_sekolah'].patchValue(this.api._idSekolah);
        this.formData.controls['id_kelas_sekolah'].patchValue(this.data.kelas);
      } else {
        this.formData.patchValue(res.data);
      }
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    })
  }

  onSubmit(){
    if(this.formData.valid){
      this.spinner.show();
      this.submitted = true;
      if(this.data.data == '0'){
        this.api.post('mapel', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.tambah();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.helper.error();
        });
      } else {
        this.api.put('mapel', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
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
}
