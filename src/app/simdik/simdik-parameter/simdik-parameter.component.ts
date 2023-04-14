import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-parameter',
  templateUrl: './simdik-parameter.component.html',
  styleUrls: ['./simdik-parameter.component.scss']
})
export class SimdikParameterComponent {
  title: any;
  formData!: FormGroup;
  fileInput: any;
  fileInput1: any;
  submitted = false;
  imageSrc?: string;
  imageSrc1?: string;
  data: any = {};
  prop: any = [];
  kab: any = [];
  kec: any = [];
  kel: any = [];
  bentuk: any = [];
  bank: any = [];
  kepemilikan: any = [];
  iso: any = [];
  kurikulum: any = [];
  kontak: any = [];
  id: any;

  center: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  zoom = 18;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.formData = this.fb.group({
      id: ["", ""],
      nama: ["", Validators.required],
      alamat: ["", Validators.required],
      rt: ["", ""],
      rw: ["", ""],
      dusun: ["", ""],
      no_kel: ["", Validators.required],
      no_kec: ["", Validators.required],
      no_kab: ["", Validators.required],
      no_prop: ["", Validators.required],
      kodepos: ["", ""],
      lat: ["", Validators.required],
      lng: ["", Validators.required],
      npsn: ["", ""],
      status: ["", Validators.required],
      bentuk_pendidikan: ["", Validators.required],
      status_kepemilikan: ["", Validators.required],
      sk_pendirian: ["", ""],
      tgl_pendirian: ["", ""],
      sk_izin: ["", ""],
      tgl_sk_izin: ["", ""],
      kebutuhan_khusus: ["", Validators.required],
      bank: ["", Validators.required],
      cabang: ["", ""],
      rek_atas_nama: ["", ""],
      no_rek: ["", ""],
      status_bos: ["", Validators.required],
      waktu_penyelenggaraan: ["", ""],
      sertifikasi_iso: ["", Validators.required],
      sumber_listrik: ["", ""],
      daya_listrik: ["", ""],
      akses_internet: ["", ""],
      akreditasi: ["", ""],
      kurikulum: ["", Validators.required],
      telp: ["", ""],
      fax: ["", ""],
      email: ["", [Validators.required, Validators.email]],
      web: ["", Validators.required],
      facebook: ["", ""],
      twitter: ["", ""],
      instagram: ["", ""],
      google: ["", ""],
      youtube: ["", ""],
      whatsapp: ["", ""],
      logo: [null],
      logo_web: [null],
      motto: ["", ""],
      id_simdiks: ["", Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions = [];
      this.markerPositions.push(event.latLng.toJSON());

      this.formData.controls['lat'].patchValue(this.markerPositions[0].lat);
      this.formData.controls['lng'].patchValue(this.markerPositions[0].lng);
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.markerPositions = [];
      this.formData.controls['lat'].patchValue(position.coords.latitude);
      this.formData.controls['lng'].patchValue(position.coords.longitude);

      this.markerPositions.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }, error => {
      alert("Izinkan Google Maps untuk melacak posisi Anda pada browser.");
    });
  }

  showLocation(lat: any, lng: any) {
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

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('sekolah').subscribe(res => {
      this.prop = res.propinsi;
      this.kab = res.kota;
      this.kec = res.kecamatan;
      this.kel = res.desa;
      this.bentuk = res.bentuk;
      this.bank = res.bank;
      this.kepemilikan = res.kepemilikan;
      this.iso = res.iso;
      this.kurikulum = res.kurikulum;
      this.kontak = res.kontak;
      this.data = res.data;
      this.formData.patchValue(res.data);

      if (res.data.lat && res.data.lng) {
        this.showLocation(res.data.lat, res.data.lng);
      }

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  getKota(prop: any) {
    this.api.get('kota?no_prop=' + prop).subscribe(res => {
      this.kab = res;
      this.formData.controls['no_kab'].patchValue(null);
      this.formData.controls['no_kec'].patchValue(null);
      this.formData.controls['no_kel'].patchValue(null);
    })
  }

  getKecamatan(prop: any, kab: any) {
    this.api.get('kecamatan?no_prop=' + prop + '&no_kab=' + kab).subscribe(res => {
      this.kec = res;
      this.formData.controls['no_kec'].patchValue(null);
      this.formData.controls['no_kel'].patchValue(null);
    })
  }

  getDesa(prop: any, kab: any, kec: any) {
    this.api.get('desa?no_prop=' + prop + '&no_kab=' + kab + '&no_kec=' + kec).subscribe(res => {
      this.kel = res;
      this.formData.controls['no_kel'].patchValue(null);
    })
  }

  onSubmit() {
    if (this.formData.valid) {
      this.spinner.show();
      this.submitted = true;
      this.api.put('sekolah', this.formData.value).subscribe(res => {
        this.submitted = false;
        this.spinner.hide();
        this.helper.simpan();
      }, err => {
        this.submitted = false;
        this.spinner.hide();
        this.helper.error();
      })
    } else {
      return;
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.fileInput = event.target.files[0];

    if (event.target.files && event.target.files.length) {
      if (this.fileInput.size <= 3072000 && this.fileInput.type == 'image/png') {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.api._logoWeb = reader.result;

          this.formData.patchValue({
            logo_web: reader.result
          });
        };
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Format PNG, maksimal 3 MB',
        })
      }
    }
  }

  onFileChange1(event: any) {
    const reader = new FileReader();
    this.fileInput1 = event.target.files[0];

    if (event.target.files && event.target.files.length) {
      if (this.fileInput1.size <= 3072000 && this.fileInput1.type == 'image/png') {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imageSrc1 = reader.result as string;

          this.formData.patchValue({
            logo: reader.result
          });
        };
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Format PNG, maksimal 3 MB',
        })
      }
    }
  }
}
