import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/helper.service';
import Swal from 'sweetalert2';
import { SimdikAuthService } from '../../shared/simdik-auth.service';
import { SimdikPasswordComponent } from '../../simdik-password/simdik-password.component';
import { SimdikComponent } from '../../simdik/simdik.component';

@Component({
  selector: 'app-simdik-header',
  templateUrl: './simdik-header.component.html',
  styleUrls: ['./simdik-header.component.scss']
})
export class SimdikHeaderComponent {
  @Input() userId = '';
  @Input() nama = '';
  @Input() foto = '';
  @Input() username = '';
  @Input() logo = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public master: SimdikComponent,
    public auth: SimdikAuthService,
    public helper: HelperService,
    public dialog: MatDialog,    
  ) {}

  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    Swal.fire({
      title: 'Keluar dari Aplikasi ?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'BATAL',
      confirmButtonText: 'YA'
    }).then((result) => {
      if (result.isConfirmed) {
        this.master.signOut();
      }
    })    
  }

  password() {
    if (this.dialog.openDialogs && this.dialog.openDialogs.length > 0) {
      return false;
    }

    let dialog = this.dialog.open(SimdikPasswordComponent, {
      width: '400px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.master.getUser();
      }
    })
  }
}
