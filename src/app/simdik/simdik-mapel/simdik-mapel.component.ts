import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikMapelDetilComponent } from './simdik-mapel-detil/simdik-mapel-detil.component';

@Component({
  selector: 'app-simdik-mapel',
  templateUrl: './simdik-mapel.component.html',
  styleUrls: ['./simdik-mapel.component.scss']
})
export class SimdikMapelComponent {
  title = 'JADWAL MATA PELAJARAN';
  senin: any = [];
  selasa: any = [];
  rabu: any = [];
  kamis: any = [];
  jumat: any = [];
  sabtu: any = [];
  idKelas: any;
  kelas: any = [];
  filterValue: any;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public crypt: CryptService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('kelas').subscribe(result => {
      this.kelas = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  ngKelas(id: any): void {
    this.idKelas = id.value;
    this.spinner.show();
    this.api.get('mapel?id_kelas=' + this.idKelas).subscribe(res => {
      this.senin = res.senin;
      this.selasa = res.selasa;
      this.rabu = res.rabu;
      this.kamis = res.kamis;
      this.jumat = res.jumat;
      this.sabtu = res.sabtu;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  getData() {
    this.api.get('mapel?id_kelas=' + this.idKelas).subscribe(res => {
      this.senin = res.senin;
      this.selasa = res.selasa;
      this.rabu = res.rabu;
      this.kamis = res.kamis;
      this.jumat = res.jumat;
      this.sabtu = res.sabtu;
    }, err => {
      this.helper.error();
    });
  }

  getDetil(id: any, kelas: any, hari: any) {
    if (this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
      return false;
    }

    let dialog = this.dialog.open(SimdikMapelDetilComponent, {
      width: '500px',
      data: {
        data: id,
        kelas: kelas,
        hari: hari
      },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if (res) this.getData();
    })
  }

  getHapus(id: any) {
    Swal.fire({
      title: 'Hapus data ?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'BATAL',
      confirmButtonText: 'YA'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.delete('kelas', this.crypt.encryptUsingAES256(id)).subscribe(res => {
          this.getData();
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil dihapus.',
            showConfirmButton: false,
            timer: 1500
          })
        }, err => {
          this.spinner.hide();
          this.helper.error();
        })
      }
    })
  }
}
