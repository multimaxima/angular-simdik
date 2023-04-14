import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { SimdikKelasDetilComponent } from './simdik-kelas-detil/simdik-kelas-detil.component';

@Component({
  selector: 'app-simdik-kelas',
  templateUrl: './simdik-kelas.component.html',
  styleUrls: ['./simdik-kelas.component.scss']
})
export class SimdikKelasComponent implements OnInit {
  title = 'DAFTAR KELAS';
  data: any = [];

  displayedColumns: string[] = ['edit','kelas','walikelas','kurikulum','siswa'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public crypt: CryptService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('kelas').subscribe(result => {
      this.data = result;
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.api.get('kelas').subscribe(result => {
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
    
    let dialog = this.dialog.open(SimdikKelasDetilComponent, {
      width: '500px',
      data: data,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if(res) this.getData();
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
        this.api.delete('kelas',this.crypt.encryptUsingAES256(id)).subscribe(res=>{
          this.getData();
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Data berhasil dihapus.',
            showConfirmButton: false,
            timer: 1500
          })
        },err=>{
          this.spinner.hide();
          this.helper.error();
        })        
      }
    })
  }
}
