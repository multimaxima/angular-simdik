import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-simdik-chat',
  templateUrl: './simdik-chat.component.html',
  styleUrls: ['./simdik-chat.component.scss']
})
export class SimdikChatComponent implements OnInit, OnDestroy {
  title = 'CHAT';
  chat: any = [];
  formData: FormGroup;
  guru: any = [];
  siswa: any = [];
  admin: any = [];
  fotoChat: any;
  namaChat: any;
  statusChat: any;

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    private db: AngularFireDatabase,
    public fb: FormBuilder,
    public datepipe: DatePipe,
  ){
    this.formData = this.fb.group({
      id_sekolah: [this.api._idSekolah, Validators.required],
      id_sim_kirim: ["", Validators.required],
      id_simdik_kirim: [this.api._idUser, Validators.required],
      id_siswa_kirim: ["", Validators.required],
      id_wali_kirim: ["", Validators.required],
      id_sim_terima: ["", Validators.required],
      id_simdik_terima: ["", Validators.required],
      id_siswa_terima: ["", Validators.required],
      id_wali_terima: ["", Validators.required],
      pesan: ["", Validators.required],
      status: ["0", Validators.required],
      created_at: [this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss'), Validators.required],
    });
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    const status = this.db.object('chat-status');
    status.set({ 
      idUser: this.api._idUser,
      status: 'Online',
      waktu: this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss'),
    });

    this.db.list('chat').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, data: c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.chat = data;
    });    

    forkJoin({
      guru: this.api.get('guru'),
      siswa: this.api.get('siswa-list'),
      admin: this.api.get('admin')
    }).subscribe(res=>{
      this.guru = res.guru;
      this.siswa = res.siswa;
      this.admin = res.admin;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();      
    })
  }

  onKirim() {
    const pesan = this.db.list('chat');
    pesan.push(this.formData.value);
    this.m['pesan'].patchValue("");
  }

  onPilihGuru(id: any) {
    this.m['id_simdik_terima'].patchValue(id);
  }

  onPilihSiswa(data: any) {
    this.m['id_siswa_terima'].patchValue(data.id);
    this.namaChat = data.nama;
    this.fotoChat = data.foto;
    const kelas = data.kelas ? data.kelas : "";
    const kode = data.kode ? ' '+data.kode : "";
    const subKelas = data.sub_kelas ? ' '+data.sub_kelas : "";
    this.statusChat = data.nis+' - '+kelas+kode+subKelas;
  }

  applyFilterSiswa(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.siswa.filter = filterValue.trim().toLowerCase();
    return this.siswa;
  }

  ngOnDestroy(): void {
    const status = this.db.object('chat-status');
    status.set({ 
      idUser: this.api._idUser,
      status: 'Offline',
      waktu: this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss'),
    });
  }
}
