import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  _mapApi : String = 'AIzaSyB07JTOCN4dELlQ6wbtTX_3MSnD1t8H9XQ';
  _server : String = 'http://127.0.0.1:8000/api/v1/simdik/';
  _master : String = 'http://127.0.0.1:8000/';
  //_server : String = 'https://wrp2023.multimaxima.com/api/v1/simdik/';
  //_master : String = 'https://wrp2023.multimaxima.com/';
  
  constructor() { }

  error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi kesalahan!',
    })
  }

  errorForm(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Silahkan melengkapi isian data!',
    })
  }

  errorUpload(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Gagal mengunggah data!',
    })
  }

  hapus(){
    Swal.fire({
      icon: 'success',
      title: 'Data berhasil dihapus.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  tambah(){
    Swal.fire({
      icon: 'success',
      title: 'Data berhasil ditambahkan.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  simpan(){
    Swal.fire({
      icon: 'success',
      title: 'Data berhasil disimpan.',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
