import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-kelas-detil',
  templateUrl: './simdik-kelas-detil.component.html',
  styleUrls: ['./simdik-kelas-detil.component.scss']
})
export class SimdikKelasDetilComponent {
  formData: FormGroup;
  submitted = false;
  kelas: any = [];
  jurusan: any = [];
  guru: any = [];
  kurikulum: any = [];

  constructor(
    public dialogRef: MatDialogRef<SimdikKelasDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ){
    this.formData = this.fb.group({
      id: ["",""],
      id_sekolah: ["",Validators.required],
      id_simdik: ["",""],
      id_kelas: ["",Validators.required],
      sub_kelas: ["",""],
      id_jurusan: ["",""],
      id_kurikulum: ["",Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    if(this.data == '0'){
      forkJoin({
        kelas: this.api.get('kelas-baru?tingkat='+this.api._idTingkat+'&id_sekolah='+this.api._idSekolah),
        kurikulum: this.api.get('kurikulum'),
      }).subscribe(res=>{
        this.kelas = res.kelas.kelas;
        this.jurusan = res.kelas.jurusan;
        this.guru = res.kelas.guru;
        this.kurikulum = res.kurikulum;
        this.formData.controls['id_sekolah'].patchValue(this.api._idSekolah);
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.helper.error();
      });
    } else {
      forkJoin({
        kelas: this.api.get('kelas-detil?id='+this.data+'&tingkat='+this.api._idTingkat+'&id_sekolah='+this.api._idSekolah),
        kurikulum: this.api.get('kurikulum'),
      }).subscribe(res=>{
        this.kelas = res.kelas.kelas;
        this.jurusan = res.kelas.jurusan;
        this.guru = res.kelas.guru;
        this.kurikulum = res.kurikulum;
        this.formData.patchValue(res.kelas.data);
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.helper.error();
      })
    }
  }

  onSubmit(){
    if(this.formData.valid){
      this.spinner.show();
      this.submitted = true;
      if(this.data == '0'){
        this.api.post('kelas', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.tambah();
          this.dialogRef.close(res);
        }, err => {
          this.submitted = false;
          this.helper.error();
        });
      } else {
        this.api.put('kelas', this.formData.value).subscribe(res => {
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