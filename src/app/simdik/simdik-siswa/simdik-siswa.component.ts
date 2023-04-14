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
  selector: 'app-simdik-siswa',
  templateUrl: './simdik-siswa.component.html',
  styleUrls: ['./simdik-siswa.component.scss']
})
export class SimdikSiswaComponent implements OnInit {
  title = 'DATA SISWA';
  data: any = [];
  kelas: any = [];
  editMode = false;
  idSiswa: any;
  fileExcel: any;
  idKelas: any;

  displayedColumns: string[] = ['edit','foto','nama','kelas','panggilan','alamat_tinggal','status_tinggal','jarak_sekolah','jarak_rumah','alamat_rumah','nis','nisn','telp','hp','whatsapp','temp_lahir','tgl_lahir','kelamin','tgl_masuk','asal_sekolah','tgl_sttb','no_sttb','tgl_stl','no_stl','lama_belajar','asal_pindahan','alasan_pindahan','agama','wna','negara','anak_ke','sdr_kandung','sdr_tiri','sdr_angkat','yatim','bahasa','goldar','sakit','kelainan','tinggi','berat','kesenian','olahraga','organisasi','lain','beasiswa','tgl_meninggalkan','pindah_ke','alasan_pindah_ke','no_ijasah_lulus','no_tanda_lulus','nilai_rata','melanjutkan_ke','bekerja_di','nik','no_kk','email','username'];
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
    this.api.get('siswa').subscribe(result => {
      this.kelas = result.kelas;
      this.data = result.data;
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

  getMaster() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = this.helper._master+'dokumen/master_siswa.xls';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getDatas(kelas: any) {
    this.idKelas = kelas.value;
    this.getData(this.idKelas);
  }  

  getData(kelas: any) {
    this.editMode = false;
    if(kelas == '0'){
      this.api.get('siswa').subscribe(result => {
        this.data = result.data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.helper.error();
      });
    } else {
      this.api.get('siswa?id_kelas='+kelas).subscribe(result => {
        this.data = result.data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.helper.error();
      });
    }    
  }

  getDetil(id: any){
    this.editMode = true;
    this.idSiswa = id;
  }

  getReset(id: any, data: any) {
    Swal.fire({
      title: 'Reset password '+data.nama+' ?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'RESET',
      cancelButtonText: 'BATAL'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.get('siswa-reset?id='+id).subscribe(res=>{
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
      confirmButtonText: 'HAPUS',
      cancelButtonText: 'BATAL'
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

  getImport(event: any){
    this.spinner.show();
    this.fileExcel = event.target.files[0];

    const formUpload = new FormData();
    formUpload.append('file',this.fileExcel);
    formUpload.append('id_kelas_sekolah',this.idKelas);

    this.api.post('siswa-import',formUpload).subscribe(res=>{
      this.getData(this.idKelas);      
      this.spinner.hide();
    },err=>{
      this.helper.error();
      this.spinner.hide();
    });
  }
}
