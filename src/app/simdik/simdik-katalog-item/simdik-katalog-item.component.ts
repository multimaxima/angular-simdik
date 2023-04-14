import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptService } from 'src/app/shared/crypt.service';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-katalog-item',
  templateUrl: './simdik-katalog-item.component.html',
  styleUrls: ['./simdik-katalog-item.component.scss']
})
export class SimdikKatalogItemComponent implements OnInit {
  title = 'KATALOG ITEM';
  data: any = [];

  displayedColumns: string[] = ['judul','kode','ada','hilang','peminjam','pinjam','kembali'];
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
    this.api.get('katalog-item').subscribe(result => {
      this.data = result;
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
}
