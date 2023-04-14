import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog',
  templateUrl: './simdik-katalog.component.html',
  styleUrls: ['./simdik-katalog.component.scss']
})
export class SimdikKatalogComponent {
  title = 'KATALOG';
  data: any = [];
  kelas: any = [];
  kategori: any = [];
  jenis: any = [];
  editMode = false;
  idKatalog: any;

  displayedColumns: string[] = ['edit','cover','kode','jenis','kategori','judul','diskripsi','penulis','penerbit','tahun_terbit','file','tahun_pengadaan','bisa_dipinjam','masa_pinjam','item','ada','dipinjam','hilang','harga_buku','harga','denda'];
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
    this.api.get('katalog').subscribe(result => {
      this.data = result.data;
      this.kelas = result.kelas;
      this.jenis = result.jenis;
      this.kategori = result.kategori;
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

  getFilter(kategori: any, jenis: any, kelas: any) {
    this.editMode = false;
    this.api.get('katalog').subscribe(result => {
      this.data = result.data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.helper.error();
    });
  }

  getData() {
    this.editMode = false;
    this.api.get('katalog').subscribe(result => {
      this.data = result.data;
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
        this.api.delete('katalog', this.crypt.encryptUsingAES256(id)).subscribe(result => {
          this.getData();
          this.helper.hapus();
        }, err => {
          this.helper.error();
        });        
      }
    })
  }

  getDetil(data: any) {
    this.editMode = true;
    this.idKatalog = data;
  }
}
