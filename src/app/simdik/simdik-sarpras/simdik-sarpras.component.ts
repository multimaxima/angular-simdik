import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikSarprasDetilComponent } from './simdik-sarpras-detil/simdik-sarpras-detil.component';

@Component({
  selector: 'app-simdik-sarpras',
  templateUrl: './simdik-sarpras.component.html',
  styleUrls: ['./simdik-sarpras.component.scss']
})
export class SimdikSarprasComponent {
  title = 'SARANA PRASARANA SEKOLAH';
  data: any = [];
  editMode = false;
  idGuru: any;

  displayedColumns: string[] = ['edit','sarpras','tahun','ganjil','genap'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public dialog: MatDialog,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public crypt: CryptService,
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('sarpras').subscribe(result => {
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
    this.editMode = false;
    this.api.get('sarpras').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.helper.error();
    });
  }

  getDetil(data: any) {
    if(this.dialog.openDialogs && this.dialog.openDialogs.length > 0){
      return false;
    }
    
    let dialog = this.dialog.open(SimdikSarprasDetilComponent, {
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