import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-siswa-detil',
  templateUrl: './simdik-siswa-detil.component.html',
  styleUrls: ['./simdik-siswa-detil.component.scss']
})
export class SimdikSiswaDetilComponent {
  title: any;
  data: any = {};
  dataWali: any = {};
  agama: any = [];
  bahasa: any = [];
  pekerjaan: any = [];
  pendidikan: any = [];
  kelas: any = [];
  prop: any = [];
  kab_tinggal: any = [];
  kec_tinggal: any = [];
  kel_tinggal: any = [];
  kab_rumah: any = [];
  kec_rumah: any = [];
  kel_rumah: any = [];
  kab_ayah: any = [];
  kec_ayah: any = [];
  kel_ayah: any = [];
  kab_ibu: any = [];
  kec_ibu: any = [];
  kel_ibu: any = [];
  kab_wali: any = [];
  kec_wali: any = [];
  kel_wali: any = [];
  formData!: FormGroup;
  fileInput: any;
  imageSrc?: string;
  imageSrc1?: string;
  imageSrc2?: string;
  imageSrc3?: string;
  imageSrc4?: string;
  imageSrc5?: string;
  imageFotoAyah?: string;
  imageFotoIbu?: string;
  imageFotoWali?: string;
  imageKtpAyah?: string;
  imageKtpIbu?: string;
  imageKtpWali?: string;
  submitted = false;

  validateValue: any;
  usernameOk: boolean = true;
  emailOk: boolean = true;

  zoom = 18;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  center: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  center1: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  markerPositions1: google.maps.LatLngLiteral[] = [];

  centerAyah: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  markerPositionsAyah: google.maps.LatLngLiteral[] = [];

  centerIbu: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  markerPositionsIbu: google.maps.LatLngLiteral[] = [];

  centerWali: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  markerPositionsWali: google.maps.LatLngLiteral[] = [];

  config: any = {
    airMode: false,
    tabDisable: true,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']],
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear',
          ],
        ],
      ],
    },
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true,
  };

  @Input() idSiswa = '';
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.formData = this.fb.group({
      siswa: this.fb.group({
        id: ["", ""],
        id_sekolah: ["", Validators.required],
        nama: ["", Validators.required],
        panggilan: ["", ""],
        alamat_tinggal: ["", Validators.required],
        dusun_tinggal: ["", ""],
        rt_tinggal: ["", ""],
        rw_tinggal: ["", ""],
        no_prop_tinggal: ["", Validators.required],
        no_kab_tinggal: ["", Validators.required],
        no_kec_tinggal: ["", Validators.required],
        no_kel_tinggal: ["", Validators.required],
        kodepos_tinggal: ["", ""],
        lat_tinggal: ["", Validators.required],
        lng_tinggal: ["", Validators.required],
        status_tinggal: ["", Validators.required],
        jarak_sekolah: ["", ""],
        tinggalrumah: ["", ""],
        jarak_rumah: ["", ""],
        alamat_rumah: ["", ""],
        dusun_rumah: ["", ""],
        rt_rumah: ["", ""],
        rw_rumah: ["", ""],
        no_prop_rumah: ["", ""],
        no_kab_rumah: ["", ""],
        no_kec_rumah: ["", ""],
        no_kel_rumah: ["", ""],
        kodepos_rumah: ["", ""],
        lat_rumah: ["", ""],
        lng_rumah: ["", ""],
        nis: ["", Validators.required],
        nisn: ["", ""],
        telp: ["", ""],
        hp: ["", Validators.required],
        whatsapp: ["", ""],
        temp_lahir: ["", ""],
        tgl_lahir: ["", ""],
        kelamin: ["", Validators.required],
        foto: [null],
        id_kelas_sekolah: ["", Validators.required],
        tgl_masuk: ["", ""],
        asal_sekolah: ["", ""],
        tgl_sttb: ["", ""],
        no_sttb: ["", ""],
        tgl_stl: ["", ""],
        no_stl: ["", ""],
        id_kelas_terima: ["", ""],
        asal_pindahan: ["", ""],
        alasan_pindahan: ["", ""],
        id_agama: ["", Validators.required],
        wna: ["", Validators.required],
        negara: ["", ""],
        anak_ke: ["", ""],
        sdr_kandung: ["", ""],
        sdr_tiri: ["", ""],
        sdr_angkat: ["", ""],
        yatim: ["", ""],
        id_bahasa: ["", ""],
        goldar: ["", ""],
        sakit: ["", ""],
        kelainan: ["", ""],
        tinggi: ["", ""],
        berat: ["", ""],
        kesenian: ["", ""],
        olahraga: ["", ""],
        organisasi: ["", ""],
        lain: ["", ""],
        beasiswa: ["", ""],
        tgl_meninggalkan: ["", ""],
        pindah_ke: ["", ""],
        alasan_pindah_ke: ["", ""],
        no_ijasah_lulus: ["", ""],
        no_tanda_lulus: ["", ""],
        nilai_rata: ["", ""],
        melanjutkan_ke: ["", ""],
        bekerja_di: ["", ""],
        nik: ["", ""],
        no_kk: ["", ""],
        fc_akte: ["", ""],
        fc_kk: ["", ""],
        fc_ktp: ["", ""],
        fc_nisn: ["", ""],
        fc_skl: ["", ""],
        email: ["", [Validators.required, Validators.email]],
      }),
      wali: this.fb.group({
        id: ["", ""],
        id_sekolah: ["", Validators.required],
        nama_ayah: ["", ""],
        temp_lahir_ayah: ["", ""],
        tgl_lahir_ayah: ["", ""],
        id_agama_ayah: ["", ""],
        warganegara_ayah: ["", ""],
        negara_ayah: ["", ""],
        id_pendidikan_ayah: ["", ""],
        id_pekerjaan_ayah: ["", ""],
        penghasilan_ayah: ["", ""],
        alamat_ayah: ["", ""],
        dusun_ayah: ["", ""],
        rt_ayah: ["", ""],
        rw_ayah: ["", ""],
        no_prop_ayah: ["", ""],
        no_kab_ayah: ["", ""],
        no_kec_ayah: ["", ""],
        no_kel_ayah: ["", ""],
        lat_ayah: ["", ""],
        lng_ayah: ["", ""],
        telp_ayah: ["", ""],
        hp_ayah: ["", ""],
        whatsapp_ayah: ["", ""],
        email_ayah: ["", Validators.email],
        nik_ayah: ["", ""],
        no_kk_ayah: ["", ""],
        foto_ayah: [null],
        ktp_ayah: [null],
        kk_ayah: [null],
        status_ayah: ["", ""],
        nama_ibu: ["", ""],
        temp_lahir_ibu: ["", ""],
        tgl_lahir_ibu: ["", ""],
        id_agama_ibu: ["", ""],
        warganegara_ibu: ["", ""],
        negara_ibu: ["", ""],
        id_pendidikan_ibu: ["", ""],
        id_pekerjaan_ibu: ["", ""],
        penghasilan_ibu: ["", ""],
        alamat_ibu: ["", ""],
        dusun_ibu: ["", ""],
        rt_ibu: ["", ""],
        rw_ibu: ["", ""],
        no_prop_ibu: ["", ""],
        no_kab_ibu: ["", ""],
        no_kec_ibu: ["", ""],
        no_kel_ibu: ["", ""],
        lat_ibu: ["", ""],
        lng_ibu: ["", ""],
        telp_ibu: ["", ""],
        hp_ibu: ["", ""],
        whatsapp_ibu: ["", ""],
        email_ibu: ["", Validators.email],
        nik_ibu: ["", ""],
        no_kk_ibu: ["", ""],
        foto_ibu: [null],
        ktp_ibu: [null],
        kk_ibu: [null],
        status_ibu: ["", ""],
        nama_wali: ["", ""],
        temp_lahir_wali: ["", ""],
        tgl_lahir_wali: ["", ""],
        id_agama_wali: ["", ""],
        warganegara_wali: ["", ""],
        negara_wali: ["", ""],
        id_pendidikan_wali: ["", ""],
        id_pekerjaan_wali: ["", ""],
        penghasilan_wali: ["", ""],
        alamat_wali: ["", ""],
        dusun_wali: ["", ""],
        rt_wali: ["", ""],
        rw_wali: ["", ""],
        no_prop_wali: ["", ""],
        no_kab_wali: ["", ""],
        no_kec_wali: ["", ""],
        no_kel_wali: ["", ""],
        lat_wali: ["", ""],
        lng_wali: ["", ""],
        telp_wali: ["", ""],
        hp_wali: ["", ""],
        whatsapp_wali: ["", ""],
        email_wali: ["", Validators.email],
        nik_wali: ["", ""],
        no_kk_wali: ["", ""],
        foto_wali: [null],
        ktp_wali: [null],
        kk_wali: [null],
        nisn: ["", ""],
      })
    });
  }

  get m() {
    return (<FormGroup>this.formData.get('siswa')).controls;
  }

  get w() {
    return (<FormGroup>this.formData.get('wali')).controls;
  }

  addMarker(event: google.maps.MapMouseEvent, jenis: any) {
    if (event.latLng != null) {
      if (jenis == 'tinggal') {
        this.markerPositions = [];
        this.markerPositions.push(event.latLng.toJSON());

        this.formData.patchValue({
          siswa: {
            lat_tinggal: this.markerPositions[0].lat,
            lng_tinggal: this.markerPositions[0].lng,
          }
        })
      }

      if (jenis == 'rumah') {
        this.markerPositions1 = [];
        this.markerPositions1.push(event.latLng.toJSON());

        this.formData.patchValue({
          siswa: {
            lat_rumah: this.markerPositions1[0].lat,
            lng_rumah: this.markerPositions1[0].lng,
          }
        })
      }

      if (jenis == 'ayah') {
        this.markerPositionsAyah = [];
        this.markerPositionsAyah.push(event.latLng.toJSON());

        this.formData.patchValue({
          wali: {
            lat_ayah: this.markerPositionsAyah[0].lat,
            lng_ayah: this.markerPositionsAyah[0].lng,
          }
        })
      }

      if (jenis == 'ibu') {
        this.markerPositionsIbu = [];
        this.markerPositionsIbu.push(event.latLng.toJSON());

        this.formData.patchValue({
          wali: {
            lat_ibu: this.markerPositionsIbu[0].lat,
            lng_ibu: this.markerPositionsIbu[0].lng,
          }
        })
      }

      if (jenis == 'wali') {
        this.markerPositionsWali = [];
        this.markerPositionsWali.push(event.latLng.toJSON());

        this.formData.patchValue({
          wali: {
            lat_wali: this.markerPositionsWali[0].lat,
            lng_wali: this.markerPositionsWali[0].lng,
          }
        })
      }
    }
  }

  getLocation(jenis: any) {
    if (jenis == 'tinggal') {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPositions = [];
        this.formData.patchValue({
          siswa: {
            lat_tinggal: position.coords.latitude,
            lng_tinggal: position.coords.longitude,
          }
        });

        this.markerPositions.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.zoom = 18;
      }, error => {
        alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
      });
    }

    if (jenis == 'rumah') {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPositions1 = [];
        this.formData.patchValue({
          siswa: {
            lat_rumah: position.coords.latitude,
            lng_rumah: position.coords.longitude,
          }
        });

        this.markerPositions1.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.center1 = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.zoom = 18;
      }, error => {
        alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
      });
    }

    if (jenis == 'ayah') {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPositionsAyah = [];
        this.formData.patchValue({
          wali: {
            lat_ayah: position.coords.latitude,
            lng_ayah: position.coords.longitude,
          }
        });

        this.markerPositionsAyah.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.centerAyah = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.zoom = 18;
      }, error => {
        alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
      });
    }

    if (jenis == 'ibu') {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPositionsIbu = [];
        this.formData.patchValue({
          wali: {
            lat_ibu: position.coords.latitude,
            lng_ibu: position.coords.longitude,
          }
        });

        this.markerPositionsIbu.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.centerIbu = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.zoom = 18;
      }, error => {
        alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
      });
    }

    if (jenis == 'wali') {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPositionsWali = [];
        this.formData.patchValue({
          wali: {
            lat_wali: position.coords.latitude,
            lng_wali: position.coords.longitude,
          }
        });

        this.markerPositionsWali.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        this.centerWali = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.zoom = 18;
      }, error => {
        alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
      });
    }
  }

  showLocation(lat: any, lng: any, jenis: any) {
    if (jenis == 'tinggal') {
      this.markerPositions = [];
      this.markerPositions.push({
        lat: +lat,
        lng: +lng
      });

      this.center = {
        lat: +lat,
        lng: +lng
      };
    }

    if (jenis == 'rumah') {
      this.markerPositions1 = [];
      this.markerPositions1.push({
        lat: +lat,
        lng: +lng
      });

      this.center1 = {
        lat: +lat,
        lng: +lng
      };
    }

    if (jenis == 'ayah') {
      this.markerPositionsAyah = [];
      this.markerPositionsAyah.push({
        lat: +lat,
        lng: +lng
      });

      this.centerAyah = {
        lat: +lat,
        lng: +lng
      };
    }

    if (jenis == 'ibu') {
      this.markerPositionsIbu = [];
      this.markerPositionsIbu.push({
        lat: +lat,
        lng: +lng
      });

      this.centerIbu = {
        lat: +lat,
        lng: +lng
      };
    }

    if (jenis == 'wali') {
      this.markerPositionsWali = [];
      this.markerPositionsWali.push({
        lat: +lat,
        lng: +lng
      });

      this.centerWali = {
        lat: +lat,
        lng: +lng
      };
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('siswa/' + this.idSiswa).subscribe(res => {
      this.prop = res.propinsi;
      this.agama = res.agama;
      this.bahasa = res.bahasa;
      this.kelas = res.kelas;
      this.pekerjaan = res.pekerjaan;
      this.pendidikan = res.pendidikan;

      if (this.idSiswa == '0') {
        this.title = 'TAMBAH DATA SISWA';
        this.getLocation('tinggal');
        this.getLocation('rumah');
        this.getLocation('ayah');
        this.getLocation('ibu');
        this.getLocation('wali');
        this.formData.patchValue({
          siswa: {
            id_sekolah: this.api._idSekolah,
          },
          wali: {
            id_sekolah: this.api._idSekolah,
          }
        })
        this.spinner.hide();
      } else {
        this.title = 'EDIT DATA SISWA';

        this.kab_tinggal = res.kota_tinggal;
        this.kec_tinggal = res.kecamatan_tinggal;
        this.kel_tinggal = res.desa_tinggal;
        this.kab_rumah = res.kota_rumah;
        this.kec_rumah = res.kecamatan_rumah;
        this.kel_rumah = res.desa_rumah;
        this.kab_ayah = res.kota_ayah;
        this.kec_ayah = res.kecamatan_ayah;
        this.kel_ayah = res.desa_ayah;
        this.kab_ibu = res.kota_ibu;
        this.kec_ibu = res.kecamatan_ibu;
        this.kel_ibu = res.desa_ibu;
        this.kab_wali = res.kota_wali;
        this.kec_wali = res.kecamatan_wali;
        this.kel_wali = res.desa_wali;
        this.data = res.data;
        this.dataWali = res.wali;
        this.formData.patchValue({
          siswa: res.data,
          wali: res.wali,
        })

        if (res.data.lat_tinggal && res.data.lng_tinggal) {
          this.showLocation(res.data.lat_tinggal, res.data.lng_tinggal, 'tinggal');
        } else {
          this.getLocation('tinggal');
        }

        if (res.data.lat_rumah && res.data.lng_rumah) {
          this.showLocation(res.data.lat_rumah, res.data.lng_rumah, 'rumah');
        } else {
          this.getLocation('rumah');
        }

        if (res.wali.lat_ayah && res.wali.lng_ayah) {
          this.showLocation(res.wali.lat_ayah, res.wali.lng_ayah, 'ayah');
        } else {
          this.getLocation('ayah');
        }

        if (res.wali.lat_ibu && res.wali.lng_ibu) {
          this.showLocation(res.wali.lat_ibu, res.wali.lng_ibu, 'ibu');
        } else {
          this.getLocation('ibu');
        }

        if (res.wali.lat_wali && res.wali.lng_wali) {
          this.showLocation(res.wali.lat_wali, res.wali.lng_wali, 'wali');
        } else {
          this.getLocation('wali');
        }

        this.spinner.hide();
      }
    }, err => {
      this.spinner.hide();
      this.helper.error();
    })
  }

  onSubmit() {
    if (this.formData.valid) {
      this.spinner.show();
      this.submitted = true;

      if (this.m['tinggalrumah'].value == 1) {
        this.formData.patchValue({
          siswa: {
            alamat_rumah: this.m['alamat_tinggal'].value,
            dusun_rumah: this.m['dusun_tinggal'].value,
            rt_rumah: this.m['rt_tinggal'].value,
            rw_rumah: this.m['rw_tinggal'].value,
            no_prop_rumah: this.m['no_prop_tinggal'].value,
            no_kab_rumah: this.m['no_kab_tinggal'].value,
            no_kec_rumah: this.m['no_kec_tinggal'].value,
            no_kel_rumah: this.m['no_kel_tinggal'].value,
            lat_rumah: this.m['lat_tinggal'].value,
            lng_rumah: this.m['lng_tinggal'].value,
            kodepos_rumah: this.m['kodepos_tinggal'].value,
            jarak_rumah: 0,
          }
        })
      }

      if (this.idSiswa == '0') {
        this.api.post('siswa', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.tambah();
          this.newItemEvent.emit(false);
        }, err => {
          this.spinner.hide();
          this.submitted = false;
          this.helper.error();
        });
      } else {
        this.api.put('siswa', this.formData.value).subscribe(res => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.simpan();
          this.newItemEvent.emit(false);
        }, err => {
          this.submitted = false;
          this.spinner.hide();
          this.helper.error();
        })
      }
    } else {
      return;
    }
  }

  getKota(prop: any, jenis: any) {
    this.api.get('kota?no_prop=' + prop).subscribe(res => {
      if (jenis == 'tinggal') {
        this.kab_tinggal = res;
        this.formData.patchValue({
          siswa: {
            no_kab_tinggal: null,
            no_kec_tinggal: null,
            no_kel_tinggal: null,
          }
        })
      }

      if (jenis == 'rumah') {
        this.kab_rumah = res;
        this.formData.patchValue({
          siswa: {
            no_kab_rumah: null,
            no_kec_rumah: null,
            no_kel_rumah: null,
          }
        })
      }

      if (jenis == 'ayah') {
        this.kab_ayah = res;
        this.formData.patchValue({
          wali: {
            no_kab_ayah: null,
            no_kec_ayah: null,
            no_kel_ayah: null,
          }
        })
      }

      if (jenis == 'ibu') {
        this.kab_ibu = res;
        this.formData.patchValue({
          wali: {
            no_kab_ibu: null,
            no_kec_ibu: null,
            no_kel_ibu: null,
          }
        })
      }

      if (jenis == 'wali') {
        this.kab_wali = res;
        this.formData.patchValue({
          wali: {
            no_kab_wali: null,
            no_kec_wali: null,
            no_kel_wali: null,
          }
        })
      }
    })
  }

  getKecamatan(prop: any, kab: any, jenis: any) {
    this.api.get('kecamatan?no_prop=' + prop + '&no_kab=' + kab).subscribe(res => {
      if (jenis == 'tinggal') {
        this.kec_tinggal = res;
        this.formData.patchValue({
          siswa: {
            no_kec_tinggal: null,
            no_kel_tinggal: null,
          }
        })
      }

      if (jenis == 'rumah') {
        this.kec_rumah = res;
        this.formData.patchValue({
          siswa: {
            no_kec_rumah: null,
            no_kel_rumah: null,
          }
        })
      }

      if (jenis == 'ayah') {
        this.kec_ayah = res;
        this.formData.patchValue({
          wali: {
            no_kec_ayah: null,
            no_kel_ayah: null,
          }
        })
      }

      if (jenis == 'ibu') {
        this.kec_ibu = res;
        this.formData.patchValue({
          wali: {
            no_kec_ibu: null,
            no_kel_ibu: null,
          }
        })
      }

      if (jenis == 'wali') {
        this.kec_wali = res;
        this.formData.patchValue({
          wali: {
            no_kec_wali: null,
            no_kel_wali: null,
          }
        })
      }
    })
  }

  getDesa(prop: any, kab: any, kec: any, jenis: any) {
    this.api.get('desa?no_prop=' + prop + '&no_kab=' + kab + '&no_kec=' + kec).subscribe(res => {
      if (jenis == 'tinggal') {
        this.kel_tinggal = res;
        this.formData.patchValue({
          siswa: {
            no_kel_tinggal: null,
          }
        });
      }

      if (jenis == 'rumah') {
        this.kel_rumah = res;
        this.formData.patchValue({
          siswa: {
            no_kel_rumah: null,
          }
        });
      }

      if (jenis == 'ayah') {
        this.kel_ayah = res;
        this.formData.patchValue({
          wali: {
            no_kel_ayah: null,
          }
        });
      }

      if (jenis == 'ibu') {
        this.kel_ibu = res;
        this.formData.patchValue({
          wali: {
            no_kel_ibu: null,
          }
        });
      }

      if (jenis == 'wali') {
        this.kel_wali = res;
        this.formData.patchValue({
          wali: {
            no_kel_wali: null,
          }
        });
      }
    })
  }

  onBatal() {
    this.newItemEvent.emit(false);
  }

  onFileChange(event: any, jenis: any) {
    const reader = new FileReader();
    this.fileInput = event.target.files[0];

    if (event.target.files && event.target.files.length) {
      if (this.fileInput.size <= 3072000 && (this.fileInput.type == 'image/png' || this.fileInput.type == 'image/jpeg')) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (jenis == 'foto') {
            this.imageSrc = reader.result as string;
            this.formData.patchValue({
              siswa: {
                foto: reader.result
              }              
            });
          }

          if (jenis == 'fc_akte') {
            this.imageSrc1 = reader.result as string;
            this.formData.patchValue({
              siswa: {
                fc_akte: reader.result
              }              
            });
          }

          if (jenis == 'fc_kk') {
            this.imageSrc2 = reader.result as string;
            this.formData.patchValue({
              siswa: {
                fc_kk: reader.result
              }              
            });
          }

          if (jenis == 'fc_ktp') {
            this.imageSrc3 = reader.result as string;
            this.formData.patchValue({
              siswa: {
                fc_ktp: reader.result
              }              
            });
          }

          if (jenis == 'fc_nisn') {
            this.imageSrc4 = reader.result as string;
            this.formData.patchValue({
              siswa: {
                fc_nisn: reader.result
              }              
            });
          }

          if (jenis == 'fc_skl') {
            this.imageSrc5 = reader.result as string;
            this.formData.patchValue({
              siswa: {
                fc_skl: reader.result
              }              
            });
          }

          if (jenis == 'foto_ayah') {
            this.imageFotoAyah = reader.result as string;
            this.formData.patchValue({
              wali: {
                foto_ayah: reader.result
              }              
            });
          }

          if (jenis == 'foto_ibu') {
            this.imageFotoIbu = reader.result as string;
            this.formData.patchValue({
              wali: {
                foto_ibu: reader.result
              }              
            });
          }

          if (jenis == 'foto_wali') {
            this.imageFotoWali = reader.result as string;
            this.formData.patchValue({
              wali: {
                foto_wali: reader.result
              }              
            });
          }

          if (jenis == 'ktp_ayah') {
            this.imageKtpAyah = reader.result as string;
            this.formData.patchValue({
              wali: {
                ktp_ayah: reader.result
              }              
            });
          }

          if (jenis == 'ktp_ibu') {
            this.imageKtpIbu = reader.result as string;
            this.formData.patchValue({
              wali: {
                ktp_ibu: reader.result
              }              
            });
          }

          if (jenis == 'ktp_wali') {
            this.imageKtpWali = reader.result as string;
            this.formData.patchValue({
              wali: {
                ktp_wali: reader.result
              }              
            });
          }
        };
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Format JPG, JPEG atau PNG maksimal 3 MB',
        })
      }
    }
  }

  onValidate(event: any, jenis: any) {
    this.validateValue = event.target.value;
    this.onValidateCall(event.target.value, jenis);
  }

  onValidateCall(value: any, jenis: any) {
    setTimeout(this.cekValidateCall.bind(this), 500, value, jenis);
  }

  cekValidateCall(value: any, jenis: any) {
    if (this.validateValue == value && this.validateValue != '') {
      if (jenis == 'email') {
        if (this.idSiswa == '0') {
          this.api.get('siswa-validasi?email=' + value).subscribe(res => {
            this.emailOk = res;
          }, err => {
            this.helper.error();
          });
        } else {
          this.api.get('siswa-validasi?id=' + this.idSiswa + '&email=' + value).subscribe(res => {
            this.emailOk = res;
          }, err => {
            this.helper.error();
          });
        }
      }
    }
  }
}