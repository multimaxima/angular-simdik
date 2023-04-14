import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikBelDetilComponent } from './simdik-bel-detil/simdik-bel-detil.component';

@Component({
  selector: 'app-simdik-bel',
  templateUrl: './simdik-bel.component.html',
  styleUrls: ['./simdik-bel.component.scss']
})
export class SimdikBelComponent {
  title = 'BEL HARIAN';
  data: any = [];
  hari: any[] = [];
  suara: any[] = [];
  filterValue: any;

  displayedColumns: string[] = ['edit','hari','jam','bel','suara','keterangan'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public crypt: CryptService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('bel-sekolah').subscribe(res => {
      this.data = res.data;
      this.hari = res.hari;
      this.suara = res.suara;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.spinner.show();
    this.api.get('bel-sekolah-refresh').subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, err => {
      this.helper.error();
      this.spinner.hide();
    });
  }

  hapusData(id: any) {
    Swal.fire({
      title: 'Hapus jadwal ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YA, HAPUS DATA',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('bel-sekolah', this.crypt.encryptUsingAES256(id)).subscribe(result => {
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
    
    let dialog = this.dialog.open(SimdikBelDetilComponent, {
      width: '600px',
      data: {
        data: data,
        hari: this.hari,
        suara: this.suara,
      },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if(res) this.getData();
    })
  }
}
