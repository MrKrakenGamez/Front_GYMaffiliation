
import { Routes } from '@angular/router';

export const AFFILIATES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./affiliate-list/affiliate-list').then((m) => m.AffiliateListComponent),
    title: 'Afiliados',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./affiliate-form/affiliate-form').then((m) => m.AffiliateFormComponent),
    title: 'Nuevo afiliado',
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./affiliate-form/affiliate-form').then((m) => m.AffiliateFormComponent),
    title: 'Editar afiliado',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./affiliate-detail/affiliate-detail').then(
        (m) => m.AffiliateDetailComponent
      ),
    title: 'Detalle de afiliado',
  },
];