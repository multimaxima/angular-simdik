import { MatPaginatorIntl } from '@angular/material/paginator';

const idRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 dari total ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} dari total ${length}`;
};

export function getIdPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Data per halaman:';
  paginatorIntl.getRangeLabel = idRangeLabel;

  return paginatorIntl;
}
