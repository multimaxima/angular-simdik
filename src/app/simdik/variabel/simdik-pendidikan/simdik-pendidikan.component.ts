import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../../shared/simdik-auth.service';
import { SimdikPendidikanDetilComponent } from './simdik-pendidikan-detil/simdik-pendidikan-detil.component';

@Component({
  selector: 'app-simdik-pendidikan',
  templateUrl: './simdik-pendidikan.component.html',
  styleUrls: ['./simdik-pendidikan.component.scss']
})
export class SimdikPendidikanComponent {
  title = 'PENDIDIKAN';
  data: any = [];

  displayedColumns: string[] = ['edit', 'pendidikan'];
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
    this.api.get('pendidikan').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, err => {
      this.helper.error();
      this.spinner.hide();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.api.get('pendidikan').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.helper.error();
    });
  }

  hapusData(id: any, data: any) {
    Swal.fire({
      title: 'Hapus '+data+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YA, HAPUS DATA',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('pendidikan', this.crypt.encryptUsingAES256(id)).subscribe(result => {
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
    
    let dialog = this.dialog.open(SimdikPendidikanDetilComponent, {
      width: '500px',
      data: data,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if(res) this.getData();
    })
  }
}
