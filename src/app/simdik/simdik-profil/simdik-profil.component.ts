import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-profil',
  templateUrl: './simdik-profil.component.html',
  styleUrls: ['./simdik-profil.component.scss']
})
export class SimdikProfilComponent implements OnInit {
  title = 'PROFIL SAYA';
  formData!: FormGroup;
  fileInput: any;
  submitted = false;
  imageSrc?: string;
  
  data: any = {};
  prop: any = [];
  kab: any = [];
  kec: any = [];
  kel: any = [];  
  agama: any = [];
  pendidikan: any = [];

  usernameValue: any;
  usernameOk: boolean = true;
  emailValue: any;
  emailOk: boolean = true;
  hpValue: any;
  hpOk: boolean = true;

  center: google.maps.LatLngLiteral = {
    lat: -8.2222138794068,
    lng: 114.36806470155716
  };

  zoom = 18;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

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

  constructor(
    private api: SimdikAuthService,
    private helper: HelperService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ){
    this.formData = this.fb.group({
      id: ["",Validators.required],
      id_sekolah: ["",Validators.required],
      gelar_depan: ["",""],
      nama: ["",Validators.required],
      gelar_belakang: ["",""],
      alamat: ["",Validators.required],
      rt: ["",""],
      rw: ["",""],
      dusun: ["",""],
      no_prop: ["",Validators.required],
      no_kab: ["",Validators.required],
      no_kec: ["",Validators.required],
      no_kel: ["",Validators.required],
      kodepos: ["",""],
      nip: ["",""],
      jabatan: ["",""],
      pangkat: ["",""],
      golongan: ["",""],
      telp: ["",""],
      hp: ["",Validators.required],
      temp_lahir: ["",""],
      tgl_lahir: ["",""],
      kelamin: ["",Validators.required],
      foto: [null],
      facebook: ["",""],
      instagram: ["",""],
      twitter: ["",""],
      google: ["",""],
      whatsapp: ["",""],
      youtube: ["",""],
      id_agama: ["",Validators.required],
      id_pendidikan: ["",Validators.required],
      sekolah: ["",""],
      lulusan: ["",""],
      angkatan: ["",""],
      tentang: ["",""],
      prestasi: ["",""],
      visimisi: ["",""],
      lat: ["",Validators.required],
      lng: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      username: ["",[Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('profil-edit').subscribe(res=>{
      this.data = res.data;
      this.prop = res.prop;
      this.kab = res.kab;
      this.kec = res.kec;
      this.kel = res.kel;
      this.agama = res.agama;
      this.pendidikan = res.pendidikan;
      this.formData.patchValue(this.data);
      if (this.data.lat && this.data.lng) {
        this.showLocation(this.data.lat, this.data.lng);
      } else {
        this.getLocation();
      }
      
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
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

  onSubmit(): void {
    if(this.formData.valid){
      this.spinner.show();
      this.submitted = true;
      this.api.put('profil',this.formData.value).subscribe(res=>{
        this.spinner.hide();
        this.submitted = false;
        this.helper.simpan();
      },err=>{
        this.spinner.hide();
        this.submitted = false;
        this.helper.error();
      })
    } else {
      return;
    }    
  }

  onValidateUsername(event: any) {
    this.usernameValue = event.target.value;
    this.onValidateUsernameCall(event.target.value);
  }

  onValidateUsernameCall(value: any) {
    setTimeout(this.cekValidateUsernameCall.bind(this), 500, value);
  }

  cekValidateUsernameCall(value: any) {
    if (this.usernameValue == value && this.usernameValue != null) {
      this.api.get('petugas-validasi?id='+this.data.id+'&username=' + value).subscribe(res => {
        this.usernameOk = res;
      }, err => {
        this.helper.error();
      });
    }
  }

  onValidateEmail(event: any) {
    this.emailValue = event.target.value;
    this.onValidateEmailCall(event.target.value);
  }

  onValidateEmailCall(value: any) {
    setTimeout(this.cekValidateEmailCall.bind(this), 500, value);
  }

  cekValidateEmailCall(value: any) {
    if (this.emailValue == value && this.emailValue != null) {
      this.api.get('petugas-validasi?id='+this.data.id+'&email=' + value).subscribe(res => {
        this.emailOk = res;
      }, err => {
        this.helper.error();
      });
    }
  }

  onValidateHp(event: any) {
    this.hpValue = event.target.value;
    this.onValidateHpCall(event.target.value);
  }

  onValidateHpCall(value: any) {
    setTimeout(this.cekValidateHpCall.bind(this), 500, value);
  }

  cekValidateHpCall(value: any) {
    if (this.hpValue == value && this.hpValue != null) {
      this.api.get('petugas-validasi?id='+this.data.id+'&hp=' + value).subscribe(res => {
        this.hpOk = res;
      }, err => {
        this.helper.error();
      });
    }
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

  onFileChange(event: any) {
    const reader = new FileReader();
    this.fileInput = event.target.files[0];

    if (event.target.files && event.target.files.length) {
      if (this.fileInput.size <= 3072000 && (this.fileInput.type == 'image/png' || this.fileInput.type == 'image/jpeg')) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imageSrc = reader.result as string;

          this.formData.patchValue({
            foto: reader.result
          });
        };
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Format JPG, JPEG atau PNG, maksimal 3 MB',
        })
      }
    }
  }
}
