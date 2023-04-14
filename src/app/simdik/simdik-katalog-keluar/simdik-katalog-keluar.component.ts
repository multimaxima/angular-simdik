import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikKatalogKeluarDetilComponent } from './simdik-katalog-keluar-detil/simdik-katalog-keluar-detil.component';
import { SimdikKatalogKeluarGuruComponent } from './simdik-katalog-keluar-guru/simdik-katalog-keluar-guru.component';

@Component({
  selector: 'app-simdik-katalog-keluar',
  templateUrl: './simdik-katalog-keluar.component.html',
  styleUrls: ['./simdik-katalog-keluar.component.scss']
})
export class SimdikKatalogKeluarComponent {
  title = 'BUKU KELUAR';
  buku: any = [];
  detilSiswa: any;
  detilGuru: any;
  formData: FormGroup;

  displayedColumns: string[] = ['edit', 'cover', 'judul', 'kode', 'pinjam', 'harusKembali', 'kembali', 'status', 'denda'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public crypt: CryptService,
    public dialog: MatDialog,
    public fb: FormBuilder,
  ) {
    this.formData = this.fb.group({
      id_siswa: ["", ""],
      id_guru: ["", ""],
      barcode: ["", Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  cariSiswa() {
    if (this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
      return false;
    }

    let dialog = this.dialog.open(SimdikKatalogKeluarDetilComponent, {
      width: '800px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        forkJoin({
          siswa: this.api.get('siswa-detil?id=' + result),
          buku: this.api.get('katalog-dipinjam?idSiswa=' + result)
        }).subscribe(res => {
          this.detilSiswa = res.siswa;
          this.detilGuru = "";
          this.buku = res.buku;
          this.formData.controls['id_siswa'].patchValue(this.detilSiswa.id);
          this.formData.controls['id_guru'].patchValue("");
          this.dataSource = new MatTableDataSource(this.buku);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.helper.error();
        })
      }
    })
  }

  cariGuru() {
    if (this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
      return false;
    }

    let dialog = this.dialog.open(SimdikKatalogKeluarGuruComponent, {
      width: '800px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        forkJoin({
          guru: this.api.get('guru-detil-perpus?id=' + result),
          buku: this.api.get('katalog-dipinjam?idGuru=' + result)
        }).subscribe(res => {
          this.detilGuru = res.guru;
          this.detilSiswa = "";
          this.buku = res.buku;
          this.formData.controls['id_siswa'].patchValue("");
          this.formData.controls['id_guru'].patchValue(this.detilGuru.id);
          this.dataSource = new MatTableDataSource(this.buku);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          this.helper.error();
        })
      }
    })
  }

  getData() {
    if (this.detilGuru) {
      this.api.get('katalog-dipinjam?idGuru=' + this.detilGuru.id).subscribe(res => {
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

    if (this.detilSiswa) {
      this.api.get('katalog-dipinjam?idSiswa='+this.detilSiswa.id).subscribe(res=>{
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.formData.valid) {
      this.spinner.show();
      this.api.post('katalog-pinjam', this.formData.value).subscribe(res => {
        this.buku = res;
        this.dataSource = new MatTableDataSource(this.buku);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        })
      });
      this.formData.controls['barcode'].patchValue("");
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
