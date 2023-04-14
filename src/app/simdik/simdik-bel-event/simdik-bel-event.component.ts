import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
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
import { SimdikBelEventDetilComponent } from './simdik-bel-event-detil/simdik-bel-event-detil.component';

@Component({
  selector: 'app-simdik-bel-event',
  templateUrl: './simdik-bel-event.component.html',
  styleUrls: ['./simdik-bel-event.component.scss'],
})
export class SimdikBelEventComponent {
  title = 'BEL TERJADWAL';
  data: any = [];
  suara: any = [];

  displayedColumns: string[] = ['edit', 'tanggal','jam','keterangan','suara'];
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
    forkJoin({
      data: this.api.get('bel-event'),
      suara: this.api.get('bel-suara'),
    }).subscribe(res=>{
      this.suara = res.suara;
      this.data = res.data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.api.get('bel-event').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.helper.error();
    });
  }

  hapusData(id: any) {
    Swal.fire({
      title: 'Hapus event ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YA, HAPUS DATA',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('bel-event', this.crypt.encryptUsingAES256(id)).subscribe(result => {
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
    
    let dialog = this.dialog.open(SimdikBelEventDetilComponent, {
      width: '500px',
      data: {
        data: data,
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