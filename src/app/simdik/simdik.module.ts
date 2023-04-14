import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimdikComponent } from './simdik/simdik.component';
import { SimdikDashboardComponent } from './simdik-dashboard/simdik-dashboard.component';
import { SimdikHeaderComponent } from './layout/simdik-header/simdik-header.component';
import { SimdikSidenavComponent } from './layout/simdik-sidenav/simdik-sidenav.component';
import { SimdikProfilComponent } from './simdik-profil/simdik-profil.component';
import { SimdikPasswordComponent } from './simdik-password/simdik-password.component';
import { SimdikGuruComponent } from './simdik-guru/simdik-guru.component';
import { MaterialDesign } from 'src/material/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatNativeDateModule } from '@angular/material/core';
import { SimdikGuruDetilComponent } from './simdik-guru/simdik-guru-detil/simdik-guru-detil.component';
import { SimdikSiswaComponent } from './simdik-siswa/simdik-siswa.component';
import { SimdikSiswaDetilComponent } from './simdik-siswa/simdik-siswa-detil/simdik-siswa-detil.component';
import { SimdikWaliComponent } from './simdik-wali/simdik-wali.component';
import { SimdikWaliDetilComponent } from './simdik-wali/simdik-wali-detil/simdik-wali-detil.component';
import { SimdikParameterComponent } from './simdik-parameter/simdik-parameter.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SimdikKelasComponent } from './simdik-kelas/simdik-kelas.component';
import { SimdikKelasDetilComponent } from './simdik-kelas/simdik-kelas-detil/simdik-kelas-detil.component';
import { SimdikMapelComponent } from './simdik-mapel/simdik-mapel.component';
import { SimdikMapelDetilComponent } from './simdik-mapel/simdik-mapel-detil/simdik-mapel-detil.component';
import { SimdikAgamaComponent } from './variabel/simdik-agama/simdik-agama.component';
import { SimdikAgamaDetilComponent } from './variabel/simdik-agama/simdik-agama-detil/simdik-agama-detil.component';
import { SimdikBahasaComponent } from './variabel/simdik-bahasa/simdik-bahasa.component';
import { SimdikBahasaDetilComponent } from './variabel/simdik-bahasa/simdik-bahasa-detil/simdik-bahasa-detil.component';
import { SimdikPendidikanComponent } from './variabel/simdik-pendidikan/simdik-pendidikan.component';
import { SimdikPendidikanDetilComponent } from './variabel/simdik-pendidikan/simdik-pendidikan-detil/simdik-pendidikan-detil.component';
import { SimdikPekerjaanComponent } from './variabel/simdik-pekerjaan/simdik-pekerjaan.component';
import { SimdikPekerjaanDetilComponent } from './variabel/simdik-pekerjaan/simdik-pekerjaan-detil/simdik-pekerjaan-detil.component';
import { SimdikVarmapelComponent } from './variabel/simdik-varmapel/simdik-varmapel.component';
import { SimdikVarmapelDetilComponent } from './variabel/simdik-varmapel/simdik-varmapel-detil/simdik-varmapel-detil.component';
import { SimdikJenisUjianComponent } from './variabel/simdik-jenis-ujian/simdik-jenis-ujian.component';
import { SimdikJenisUjianDetilComponent } from './variabel/simdik-jenis-ujian/simdik-jenis-ujian-detil/simdik-jenis-ujian-detil.component';
import { SimdikJurusanComponent } from './variabel/simdik-jurusan/simdik-jurusan.component';
import { SimdikJurusanDetilComponent } from './variabel/simdik-jurusan/simdik-jurusan-detil/simdik-jurusan-detil.component';
import { SimdikSarprasComponent } from './simdik-sarpras/simdik-sarpras.component';
import { SimdikSanitasiComponent } from './simdik-sanitasi/simdik-sanitasi.component';
import { SimdikSarprasDetilComponent } from './simdik-sarpras/simdik-sarpras-detil/simdik-sarpras-detil.component';
import { SimdikKatalogComponent } from './simdik-katalog/simdik-katalog.component';
import { SimdikKatalogDetilComponent } from './simdik-katalog/simdik-katalog-detil/simdik-katalog-detil.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { SimdikKatalogKeluarComponent } from './simdik-katalog-keluar/simdik-katalog-keluar.component';
import { SimdikKatalogKembaliComponent } from './simdik-katalog-kembali/simdik-katalog-kembali.component';
import { SimdikPerpusKasComponent } from './simdik-perpus-kas/simdik-perpus-kas.component';
import { SimdikBelComponent } from './simdik-bel/simdik-bel.component';
import { SimdikBelDetilComponent } from './simdik-bel/simdik-bel-detil/simdik-bel-detil.component';
import { SimdikPengaturanComponent } from './simdik-pengaturan/simdik-pengaturan.component';
import { SimdikChatComponent } from './simdik-chat/simdik-chat.component';
import { SimdikNotifComponent } from './simdik-notif/simdik-notif.component';
import { SimdikChatDetilComponent } from './simdik-chat/simdik-chat-detil/simdik-chat-detil.component';
import { SimdikBelEventComponent } from './simdik-bel-event/simdik-bel-event.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { SimdikKaldikComponent } from './simdik-kaldik/simdik-kaldik.component';
import { SimdikKatalogDipinjamComponent } from './simdik-katalog-dipinjam/simdik-katalog-dipinjam.component';
import { SimdikPerpusKasDetilComponent } from './simdik-perpus-kas/simdik-perpus-kas-detil/simdik-perpus-kas-detil.component';
import { SimdikPengaturanDetilComponent } from './simdik-pengaturan/simdik-pengaturan-detil/simdik-pengaturan-detil.component';
import { SimdikBelEventDetilComponent } from './simdik-bel-event/simdik-bel-event-detil/simdik-bel-event-detil.component';
import { SimdikKatalogKeluarDetilComponent } from './simdik-katalog-keluar/simdik-katalog-keluar-detil/simdik-katalog-keluar-detil.component';
import { SimdikKatalogKeluarGuruComponent } from './simdik-katalog-keluar/simdik-katalog-keluar-guru/simdik-katalog-keluar-guru.component';
import { SimdikKatalogItemComponent } from './simdik-katalog-item/simdik-katalog-item.component';
import { SimdikBankSoalComponent } from './simdik-bank-soal/simdik-bank-soal.component';
import { SimdikBankSoalDetilComponent } from './simdik-bank-soal/simdik-bank-soal-detil/simdik-bank-soal-detil.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NoSanitizePipe } from './shared/nosanitizerpipe';
import { SimdikUjianComponent } from './simdik-ujian/simdik-ujian.component';
import { SimdikPengawasanUjianComponent } from './simdik-pengawasan-ujian/simdik-pengawasan-ujian.component';
import { SimdikHasilUjianComponent } from './simdik-hasil-ujian/simdik-hasil-ujian.component';
import { SimdikNilaiSiswaComponent } from './simdik-nilai-siswa/simdik-nilai-siswa.component';
import { SimdikUjianDetilComponent } from './simdik-ujian/simdik-ujian-detil/simdik-ujian-detil.component';
import { SimdikAbsensiSiswaComponent } from './simdik-absensi-siswa/simdik-absensi-siswa.component';
import { SimdikAbsensiGuruComponent } from './simdik-absensi-guru/simdik-absensi-guru.component';

const routes: Routes = [
  {
    path:'',
    component:SimdikComponent,
    children:[
      { path:'dashboard', component: SimdikDashboardComponent },
      { path:'profil', component: SimdikProfilComponent },
      { path:'guru', component: SimdikGuruComponent },
      { path:'siswa', component: SimdikSiswaComponent },
      { path:'wali', component: SimdikWaliComponent },
      { path:'parameter/data-sekolah', component: SimdikParameterComponent },
      { path:'parameter/sarpras', component: SimdikSarprasComponent },
      { path:'parameter/sanitasi', component: SimdikSanitasiComponent },
      { path:'parameter/pengaturan', component: SimdikPengaturanComponent },
      { path:'kelas', component: SimdikKelasComponent },
      { path:'mata-pelajaran', component: SimdikMapelComponent },
      { path:'variabel/agama', component: SimdikAgamaComponent },
      { path:'variabel/bahasa', component: SimdikBahasaComponent },
      { path:'variabel/pekerjaan', component: SimdikPekerjaanComponent },
      { path:'variabel/pendidikan', component: SimdikPendidikanComponent },
      { path:'variabel/mata-pelajaran', component: SimdikVarmapelComponent },
      { path:'variabel/jurusan', component: SimdikJurusanComponent },
      { path:'variabel/jenis-ujian', component: SimdikJenisUjianComponent },
      { path:'katalog', component: SimdikKatalogComponent },
      { path:'katalog-item', component: SimdikKatalogItemComponent },
      { path:'katalog-keluar', component: SimdikKatalogKeluarComponent },
      { path:'katalog-kembali', component: SimdikKatalogKembaliComponent },
      { path:'katalog-dipinjam', component: SimdikKatalogDipinjamComponent },
      { path:'perpus-kas', component: SimdikPerpusKasComponent },
      { path:'bel-sekolah', component: SimdikBelComponent },
      { path:'bel-sekolah-event', component: SimdikBelEventComponent },
      { path:'chat', component: SimdikChatComponent },
      { path:'notifikasi', component: SimdikNotifComponent },
      { path:'kalender-pendidikan', component: SimdikKaldikComponent },
      { path:'bank-soal', component: SimdikBankSoalComponent },
      { path:'ujian', component: SimdikUjianComponent },
      { path:'pengawasan-ujian', component: SimdikPengawasanUjianComponent },
      { path:'hasil-ujian', component: SimdikHasilUjianComponent },
      { path:'nilai-siswa', component: SimdikNilaiSiswaComponent },
      { path:'absensi-siswa', component: SimdikAbsensiSiswaComponent },
      { path:'absensi-guru', component: SimdikAbsensiGuruComponent },
    ]
  }
];

@NgModule({
  declarations: [
    SimdikComponent,
    SimdikDashboardComponent,
    SimdikHeaderComponent,
    SimdikSidenavComponent,
    SimdikProfilComponent,
    SimdikPasswordComponent,
    SimdikGuruComponent,
    SimdikGuruDetilComponent,
    SimdikSiswaComponent,
    SimdikSiswaDetilComponent,
    SimdikWaliComponent,
    SimdikWaliDetilComponent,
    SimdikParameterComponent,
    SimdikKelasComponent,
    SimdikKelasDetilComponent,
    SimdikMapelComponent,
    SimdikMapelDetilComponent,
    SimdikAgamaComponent,
    SimdikAgamaDetilComponent,
    SimdikBahasaComponent,
    SimdikBahasaDetilComponent,
    SimdikPendidikanComponent,
    SimdikPendidikanDetilComponent,
    SimdikPekerjaanComponent,
    SimdikPekerjaanDetilComponent,
    SimdikVarmapelComponent,
    SimdikVarmapelDetilComponent,
    SimdikJenisUjianComponent,
    SimdikJenisUjianDetilComponent,
    SimdikJurusanComponent,
    SimdikJurusanDetilComponent,
    SimdikSarprasComponent,
    SimdikSanitasiComponent,
    SimdikSarprasDetilComponent,
    SimdikKatalogComponent,
    SimdikKatalogDetilComponent,
    SimdikKatalogKeluarComponent,
    SimdikKatalogKembaliComponent,
    SimdikPerpusKasComponent,
    SimdikBelComponent,
    SimdikBelDetilComponent,
    SimdikPengaturanComponent,
    SimdikChatComponent,
    SimdikNotifComponent,
    SimdikChatDetilComponent,
    SimdikBelEventComponent,
    SimdikKaldikComponent,
    SimdikKatalogDipinjamComponent,
    SimdikPerpusKasDetilComponent,
    SimdikPengaturanDetilComponent,
    SimdikBelEventDetilComponent,
    SimdikKatalogKeluarDetilComponent,
    SimdikKatalogKeluarGuruComponent,
    SimdikKatalogItemComponent,
    SimdikBankSoalComponent,
    SimdikBankSoalDetilComponent,
    NoSanitizePipe,
    SimdikUjianComponent,
    SimdikPengawasanUjianComponent,
    SimdikHasilUjianComponent,
    SimdikNilaiSiswaComponent,
    SimdikUjianDetilComponent,
    SimdikAbsensiSiswaComponent,
    SimdikAbsensiGuruComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    GoogleMapsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
    NgxBarcode6Module,
    NgxSummernoteModule,
    EditorModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideDatabase(() => getDatabase())
  ]
})
export class SimdikModule { }
