import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog-keluar-guru',
  templateUrl: './simdik-katalog-keluar-guru.component.html',
  styleUrls: ['./simdik-katalog-keluar-guru.component.scss']
})
export class SimdikKatalogKeluarGuruComponent {
  title = 'CARI DATA GURU';
  siswa: any = [];

  displayedColumns: string[] = ['foto','nip','nama','jabatan'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SimdikKatalogKeluarGuruComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public api: SimdikAuthService,    
    public helper: HelperService,
    public spinner: NgxSpinnerService,
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('guru').subscribe(result => {
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
