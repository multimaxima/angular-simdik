import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-sanitasi',
  templateUrl: './simdik-sanitasi.component.html',
  styleUrls: ['./simdik-sanitasi.component.scss']
})
export class SimdikSanitasiComponent {
  title = 'SANITASI SEKOLAH';
  formData!: FormGroup;
  submitted = false;
  data: any = {};

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
      id: ["",""], 
      id_sekolah: ["",""], 
      sumber_air: ["",""], 
      sumber_air_minum: ["",""], 
      kecukupan_air_bersih: ["",""], 
      jamban_kebutuhan_khusus: ["",""], 
      tipe_jamban: ["",""], 
      hari_cuci_tangan: ["",""], 
      jml_cuci_tangan: ["",""], 
      jml_cuci_tangan_rusak: ["",""], 
      sabun_air_mengalir: ["",""], 
      pembuangan_limbah_jamban: ["",""], 
      kuras_tangki_septik: ["",""], 
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('sanitasi').subscribe(res => {
      this.data = res;
      this.formData.patchValue(this.data);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.helper.error();
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.spinner.show();
      this.submitted = true;
      this.api.put('sanitasi', this.formData.value).subscribe(res => {
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
}
