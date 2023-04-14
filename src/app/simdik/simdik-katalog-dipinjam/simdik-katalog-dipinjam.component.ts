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
  selector: 'app-simdik-katalog-dipinjam',
  templateUrl: './simdik-katalog-dipinjam.component.html',
  styleUrls: ['./simdik-katalog-dipinjam.component.scss']
})
export class SimdikKatalogDipinjamComponent implements OnInit {
  title = 'BUKU DIPINJAM';
  buku: any = [];

  displayedColumns: string[] = ['edit','cover','judul','peminjam','pinjam','harusKembali','denda'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    public crypt: CryptService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('data-katalog-dipinjam').subscribe(res=>{
      this.buku = res;
      this.dataSource = new MatTableDataSource(this.buku);
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

  getData(){
    this.api.get('data-katalog-dipinjam').subscribe(res=>{
      this.buku = res;
      this.dataSource = new MatTableDataSource(this.buku);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      this.helper.error();
    })
  }

  onKembali(data: any){
    Swal.fire({
      title: 'Kembalikan buku ?',
      html: '<span style="font-size: 16px;">'+data.judul+'<br>Barcode : '+data.barcode+'<br>Denda Rp. '+data.denda+'</span>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'YA',
      cancelButtonText: 'TIDAK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.get('katalog-kembali?id=' + data.id).subscribe(res => {
          this.spinner.hide();
          this.getData();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.success.message,
            showConfirmButton: false,
            timer: 1500
          })
        }, err => {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
        });
      }
    })
  }
}
