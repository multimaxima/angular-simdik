import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikPerpusKasDetilComponent } from './simdik-perpus-kas-detil/simdik-perpus-kas-detil.component';

@Component({
  selector: 'app-simdik-perpus-kas',
  templateUrl: './simdik-perpus-kas.component.html',
  styleUrls: ['./simdik-perpus-kas.component.scss']
})
export class SimdikPerpusKasComponent implements OnInit {
  title = 'KAS PERPUSTAKAAN';
  kas: any[] = [];

  displayedColumns: string[] = ['edit', 'waktu','keterangan','masuk','keluar','sisa'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public crypt: CryptService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('kas-perpustakaan').subscribe(res=>{
      this.kas = res;
      this.dataSource = new MatTableDataSource(this.kas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    },err=>{
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

  getDetil(data: any) {
    if(this.dialog.openDialogs && this.dialog.openDialogs.length > 0){
      return false;
    }
    
    let dialog = this.dialog.open(SimdikPerpusKasDetilComponent, {
      width: '500px',
      data: data,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      
    })
  }
}
