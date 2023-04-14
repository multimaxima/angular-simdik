import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simdik-sidenav',
  templateUrl: './simdik-sidenav.component.html',
  styleUrls: ['./simdik-sidenav.component.scss']
})
export class SimdikSidenavComponent {  
  @Input() administrator = '';
  @Input() kepsek = '';
  @Input() waka = '';
  @Input() tu = '';
  @Input() guru = '';
  @Input() guru_bp = '';
  @Input() perpus = '';
  @Input() web_operator = '';
  @Input() ppdb = '';
  @Input() bel_sekolah = '';
  @Input() walikelas = '';
    
  constructor(){}  
}
