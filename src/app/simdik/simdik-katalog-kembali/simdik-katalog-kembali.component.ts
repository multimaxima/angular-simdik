import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog-kembali',
  templateUrl: './simdik-katalog-kembali.component.html',
  styleUrls: ['./simdik-katalog-kembali.component.scss']
})
export class SimdikKatalogKembaliComponent {
  title = 'BUKU KEMBALI';
  barcode: any;
  buku: any = [];
  siswa: any;
  guru: any;
  formBarcode: FormGroup;
  formNis: FormGroup;
  formNip: FormGroup;
  idSiswa: any;
  kode: any;
  idGuru: any;

  displayedColumns: string[] = ['edit', 'cover', 'judul', 'kode', 'pinjam', 'harusKembali', 'kembali', 'status', 'denda'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public crypt: CryptService,
    public fb: FormBuilder,
  ) {
    this.formBarcode = this.fb.group({
      barcode: ["", Validators.required],
    });

    this.formNis = this.fb.group({
      nis: ["", Validators.required],
    });

    this.formNip = this.fb.group({
      nip: ["", Validators.required],
    });
  }

  onBarcode(){
    this.kode = this.formBarcode.controls['barcode'].value;
    this.spinner.show();
    this.api.post('katalog-kembali-barcode',this.formBarcode.value).subscribe(res=>{
      this.siswa = res.siswa;
      this.guru = res.guru;
      this.buku = res.buku;
      this.dataSource = new MatTableDataSource(this.buku);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
      Swal.fire({
        title: 'Kembalikan buku ?',
        html: '<span style="font-size: 16px;">'+res.cek.judul+'<br>Barcode : '+res.cek.barcode+'<br>Denda Rp. '+res.cek.denda+'</span>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'YA',
        cancelButtonText: 'TIDAK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();
          this.api.get('katalog-kembali?id=' + res.cek.id).subscribe(res => {
            this.spinner.hide();
            this.getData();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.success.message,
              showConfirmButton: false,
              timer: 1500
            })
          }, err => {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message,
            })
          });
        }
      })
    },err=>{
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
      })
    });
    this.formBarcode.controls['barcode'].patchValue("");
  }

  onNis(){
    this.idSiswa = this.formNis.controls['nis'].value;
    this.spinner.show();
    this.api.post('katalog-kembali-nis',this.formNis.value).subscribe(res=>{
      this.siswa = res.siswa;
      this.idSiswa = res.siswa.id;
      this.guru = "";
      this.idGuru = "";
      this.buku = res.buku;
      this.dataSource = new MatTableDataSource(this.buku);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    });
    this.formNis.controls['nis'].patchValue("");
  }

  onNip(){
    this.idGuru = this.formNip.controls['nip'].value;
    this.spinner.show();
    this.api.post('katalog-kembali-nip',this.formNip.value).subscribe(res=>{
      this.siswa = "";
      this.idSiswa = "";
      this.guru = res.guru;
      this.idGuru = res.guru.id;
      this.buku = res.buku;
      this.dataSource = new MatTableDataSource(this.buku);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    });
    this.formNip.controls['nip'].patchValue("");
  }

  getData() {
    if (this.guru) {
      this.api.get('katalog-dipinjam?idGuru=' + this.guru.id).subscribe(res => {
        this.buku = res;
        this.dataSource = new MatTableDataSource(this.buku);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.helper.error();
      })
    }

    if (this.siswa) {
      this.api.get('katalog-dipinjam?idSiswa='+this.siswa.id).subscribe(res=>{
        this.buku = res;
        this.dataSource = new MatTableDataSource(this.buku);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },err=>{
        this.spinner.hide();
        this.helper.error();
      })
    }
  }

  onKembali(data: any) {
    Swal.fire({
      title: 'Kembalikan buku ?',
      html: '<span style="font-size: 16px;">'+data.judul+'<br>Barcode : '+data.barcode+'<br>Denda Rp. '+data.denda+'</span>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'YA',
      cancelButtonText: 'TIDAK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.get('katalog-kembali?id=' + data.id).subscribe(res => {
          this.spinner.hide();
          this.getData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.success.message,
            showConfirmButton: false,
            timer: 1500
          })
        }, err => {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        });
      }
    })
  }
}
