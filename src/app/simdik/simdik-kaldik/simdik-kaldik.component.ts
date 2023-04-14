import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simdik-kaldik',
  templateUrl: './simdik-kaldik.component.html',
  styleUrls: ['./simdik-kaldik.component.scss'],
})
export class SimdikKaldikComponent {
  title = 'KALENDAR PENDIDIKAN';
  selected?: Date | null;
}
