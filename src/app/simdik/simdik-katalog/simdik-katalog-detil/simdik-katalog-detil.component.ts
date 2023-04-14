import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog-detil',
  templateUrl: './simdik-katalog-detil.component.html',
  styleUrls: ['./simdik-katalog-detil.component.scss']
})
export class SimdikKatalogDetilComponent implements OnInit {
  formData!: FormGroup;
  title: any;
  data: any = {};
  kelas: any = [];
  jenis: any = [];
  kategori: any = [];
  item: any = [];
  submitted = false;
  generate = false;
  imageSrc?: String;
  fileInput: any;
  kodeKategori: any;
  kodeJenis: any;  
  itemGenerate: any;

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

  @Input() idKatalog = '';
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ){
    this.formData = this.fb.group({
      id: ["",""],
      id_sekolah: ["",Validators.required],
      id_kategori: ["",Validators.required],
      id_jenis: ["",Validators.required],
      wajib: ["",""],
      id_kelas_tingkat: ["",""],
      kode: ["",Validators.required],
      judul: ["",Validators.required],
      diskripsi: ["",""],
      penulis: ["",""],
      penerbit: ["",""],
      tahun_terbit: ["",Validators.maxLength(4)],
      cover: ["",""],
      file: ["",""],
      tahun_pengadaan: ["",Validators.maxLength(4)],
      bisa_dipinjam: ["",""],
      masa_pinjam: ["",""],
      facebook: ["",""],
      twitter: ["",""],
      instagram: ["",""],
      youtube: ["",""],
      google: ["",""],
      buka: ["",""],
      download: ["",""],
      item: ["",""],
      harga_buku: ["",""],
      harga: ["",""],
      denda: ["",""],
    })
  }

  get m() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.get('katalog-detil?id='+this.idKatalog).subscribe(res=>{
      this.kelas = res.kelas;
      this.kategori = res.kategori;
      this.jenis = res.jenis;

      if(this.idKatalog == '0'){
        this.title = 'TAMBAH KATALOG';
        this.formData.controls['id_sekolah'].patchValue(this.api._idSekolah);
      } else {
        this.title = 'EDIT KATALOG';
        this.item = res.item;
        this.data = res.data;
        this.formData.patchValue(this.data);
      }     
      
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    });
  }

  getData() {
    this.api.get('katalog-detil?id='+this.idKatalog).subscribe(res=>{
      this.kelas = res.kelas;
      this.kategori = res.kategori;
      this.jenis = res.jenis;

      if(this.idKatalog == '0'){
        this.title = 'TAMBAH KATALOG';
        this.formData.controls['id_sekolah'].patchValue(this.api._idSekolah);
      } else {
        this.title = 'EDIT KATALOG';
        this.item = res.item;
        this.data = res.data;
        this.formData.patchValue(this.data);
      }     
    },err=>{
      this.helper.error();
    });
  }

  onJenis(data: any) {
    this.kodeJenis = data;
  }

  onKategori(data: any) {
    this.kodeKategori = data;
  }

  onSubmit() {
    if (this.formData.valid) {
      this.spinner.show();
      this.submitted = true;
      if(this.idKatalog == '0'){
        this.api.post('katalog', this.formData.value).subscribe(res => {
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
        this.api.put('katalog', this.formData.value).subscribe(res => {
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

  onBatal(){
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
          if (jenis == 'cover') {
            this.imageSrc = reader.result as string;
            this.formData.controls['cover'].patchValue(reader.result);
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

  onGenerate(){
    this.generate = true;
  }

  onGenerateInput(event: Event){
    this.itemGenerate = (event.target as HTMLInputElement).value;
  }

  onGenerateItem(){
    this.generate = false;
    this.spinner.show();
    this.api.get('katalog-generate?id='+this.idKatalog+'&item='+this.itemGenerate+'&id_sekolah='+this.api._idSekolah).subscribe(res=>{
      this.getData();
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.helper.error();
    });
  }
}
