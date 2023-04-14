import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog-keluar-detil',
  templateUrl: './simdik-katalog-keluar-detil.component.html',
  styleUrls: ['./simdik-katalog-keluar-detil.component.scss']
})
export class SimdikKatalogKeluarDetilComponent implements OnInit {
  title = 'CARI DATA SISWA';
  siswa: any = [];

  displayedColumns: string[] = ['foto','nis','nama','kelas'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SimdikKatalogKeluarDetilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public spinner: NgxSpinnerService,
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('siswa-list').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  clickedRows(id: any){
    this.dialogRef.close(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
}
