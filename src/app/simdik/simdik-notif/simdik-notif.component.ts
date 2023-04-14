import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/helper.service';
import { SimdikAuthService } from '../shared/simdik-auth.service';

@Component({
  selector: 'app-simdik-notif',
  templateUrl: './simdik-notif.component.html',
  styleUrls: ['./simdik-notif.component.scss']
})
export class SimdikNotifComponent {
  title = 'NOTIFIKASI';
  notif: any;
  
  constructor(
    public api: SimdikAuthService,
    public helper: HelperService,
    private spinner: NgxSpinnerService,
    private db: AngularFireDatabase
  ){}

  ngOnInit(): void {
    this.spinner.show();
    this.notif = this.db.list('notifikasi').valueChanges();
    this.spinner.hide();
  }
}
