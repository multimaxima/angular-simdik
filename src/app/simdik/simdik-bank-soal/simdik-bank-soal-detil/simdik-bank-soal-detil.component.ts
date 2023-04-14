import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-bank-soal-detil',
  templateUrl: './simdik-bank-soal-detil.component.html',
  styleUrls: ['./simdik-bank-soal-detil.component.scss']
})
export class SimdikBankSoalDetilComponent implements OnInit {
  formData: FormGroup;
  submitted = false;

  public options: Object = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 200,
    external_plugins: {
      'tiny_mce_wiris' : `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`
    },
    htmlAllowedTags: ['.*'],
    htmlAllowedAttrs: ['.*'],
    extended_valid_elements: '*[.*]',
    draggable_modal: true,
    toolbar:
       'undo redo | styleselect | formatselect | bold italic backcolor | image media | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry',
    plugins: ['image', 'media'],
  };

  constructor(
    public dialogRef: MatDialogRef<SimdikBankSoalDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder,
    public crypt: CryptService
  ) {
    this.formData = this.fb.group({
      id: [this.data.data.id, ""],
      strata: [this.api._idTingkat, Validators.required],
      id_kelas: [this.data.kelas, Validators.required],
      id_mapel: [this.data.mapel, Validators.required],
      jenis: [this.data.data.jenis, Validators.required],
      soal: [this.data.data.soal, Validators.required],
      jawaban: this.fb.array([]),
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    if(this.data.data.jawaban){
      const jawaban = this.data.data.jawaban;
      const jawab = this.formData.get("jawaban") as FormArray;

      jawaban.forEach((x: any) => {
        jawab.push(
          this.fb.group({  
            id: x.id,
            jawaban: x.jawaban,
            kunci: x.kunci,
          })  
        )        
      });
    }
  }

  jawaban() : FormArray {  
    return this.formData.get("jawaban") as FormArray  
  }  
     
  newJawaban(): FormGroup {  
    return this.fb.group({  
      id: '',
      jawaban: '',
      kunci: '',
    })  
  }  
     
  addJawaban() {  
    this.jawaban().push(this.newJawaban());  
  }  
     
  removeJawaban(i:number) {  
    this.jawaban().removeAt(i);  
  }  

  onSubmit() {
    if (this.formData.valid) {
      this.submitted = true;
      this.spinner.show();
      if (this.data.data.id == undefined) {
        this.api.post('bank-soal', this.formData.value).subscribe(res => {
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
        this.api.put('bank-soal', this.formData.value).subscribe(res => {
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

  onHapusJawaban(id: any){
    this.api.delete('bank-soal-jawaban',this.crypt.encryptUsingAES256(id)).subscribe(err=>{
      this.helper.error();
    })
  }
}
