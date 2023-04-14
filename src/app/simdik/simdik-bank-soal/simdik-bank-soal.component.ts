import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikBankSoalDetilComponent } from './simdik-bank-soal-detil/simdik-bank-soal-detil.component';

const jsWiris = document.createElement('script');
      jsWiris.type = 'text/javascript';
      jsWiris.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
      document.head.appendChild(jsWiris);

@Component({
  selector: 'app-simdik-bank-soal',
  templateUrl: './simdik-bank-soal.component.html',
  styleUrls: ['./simdik-bank-soal.component.scss']
})
export class SimdikBankSoalComponent implements OnInit  {
  title = 'BANK SOAL';
  data: any = [];
  kelas: any = [];
  mapel: any = [];
  idKelas: any;
  idMapel: any;
  filter: any;

  displayedColumns: string[] = ['edit','jenis','soal','jawaban'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public crypt: CryptService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('bank-soal-buka').subscribe(res => {
      this.kelas = res.kelas;
      this.mapel = res.mapel;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterKelas(idKelas: any) {
    this.idKelas = idKelas.value;
    this.getData();
  }

  filterMapel(idMapel: any) {
    this.idMapel = idMapel.value;
    this.getData();
  }

  getData() {
    if(this.idKelas && this.idMapel){
      this.api.get('bank-soal?id_kelas='+this.idKelas+'&id_mapel='+this.idMapel).subscribe(res => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.helper.error();
      });
    }    
  }

  hapusData(id: any) {
    Swal.fire({
      title: 'Hapus soal ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YA, HAPUS DATA',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('agama', this.crypt.encryptUsingAES256(id)).subscribe(result => {
          this.getData();
          this.helper.hapus();
        }, err => {
          this.helper.error();
        });        
      }
    })
  }

  getDetil(data: any) {
    if(this.dialog.openDialogs && this.dialog.openDialogs.length > 0){
      return false;
    }
    
    let dialog = this.dialog.open(SimdikBankSoalDetilComponent, {
      width: '900px',
      data: {
        data: data,
        kelas: this.idKelas,
        mapel: this.idMapel,
      },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if(res) this.getData();
    })
  }
}
