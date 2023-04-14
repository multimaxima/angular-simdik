import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-guru',
  templateUrl: './simdik-guru.component.html',
  styleUrls: ['./simdik-guru.component.scss']
})
export class SimdikGuruComponent implements OnInit {
  title = 'DATA GURU';
  data: any = [];
  editMode = false;
  idGuru: any;

  displayedColumns: string[] = ['edit','foto','nama','alamat','jabatan','hp','akses'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    public crypt: CryptService,
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('guru').subscribe(result => {
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
    this.api.get('guru').subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.helper.error();
    });
  }

  getDetil(id: any) {
    this.editMode = true;
    this.idGuru = id;
  }

  getReset(id: any, data: any) {
    Swal.fire({
      title: 'Reset password '+data.nama+' ?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'RESET',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.get('guru-reset?id='+id).subscribe(res=>{
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Password berhasil direset.',
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

  getHapus(id: any, data: any) {    
    Swal.fire({
      title: 'Hapus data '+data.nama+' ?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'BATAL',
      confirmButtonText: 'HAPUS'
    }).then((result) => {    
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.delete('guru',this.crypt.encryptUsingAES256(id)).subscribe(res=>{
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
