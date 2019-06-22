import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) { }

  /*
   * Array de objetos contendo todas as páginas da lista de componentes do Angular.
   */
  public angular: Array<{ titulo: string; pagina: any }> = [
    { titulo: 'Data Binding e Variáveis', pagina: '/binding' },
    { titulo: 'Métodos / Ações / Funções', pagina: '/metodos' },
    { titulo: 'NgIf', pagina: '/ng-if' },
    { titulo: 'NgFor', pagina: '/ng-for' },
    { titulo: 'NgSwitch', pagina: '/ng-switch' },
    { titulo: 'Ngclass', pagina: '/ng-class' },
    { titulo: 'Form', pagina: '/forms' },
    { titulo: 'Navegação / Enviar Dados', pagina: '/navegacao' }
  ];

  /**
   * Array de objetos contendo todas as páginas da lista de componentes.
   */
  public componentes: Array<{ titulo: string; pagina: any }> = [
    { titulo: 'Buttons', pagina: 'ButtonsPage' },
    { titulo: 'Action Sheet', pagina: 'ActionSheetPage' },
    { titulo: 'Alert', pagina: 'AlertPage' },
    { titulo: 'Toast', pagina: 'ToastPage' },
    { titulo: 'Badge e Chip', pagina: 'BadgesChipsPage' },
    { titulo: 'Cards', pagina: 'CardsPage' },
    { titulo: 'Grid', pagina: 'GridPage' },
    { titulo: 'Loading', pagina: 'LoadingPage' },
    { titulo: 'Spinner', pagina: 'SpinnerPage' },
    { titulo: 'Lists', pagina: 'ListsPage' },
    { titulo: 'Item', pagina: 'ItemPage' },
    { titulo: 'FAB', pagina: 'FabsPage' },
    { titulo: 'Gestures', pagina: 'GesturesPage' },
    { titulo: 'Footer', pagina: 'FooterPage' },
    { titulo: 'Header', pagina: 'HeaderPage' },
    { titulo: 'Segment', pagina: 'SegmentPage' },
    { titulo: 'Icons', pagina: 'IconsPage' },
    { titulo: 'Inputs', pagina: 'InputsPage' },
    { titulo: 'Datetime', pagina: 'DatetimePage' },
    { titulo: 'Range', pagina: 'RangePage' },
    { titulo: 'Toggle', pagina: 'TogglePage' },
    { titulo: 'Modal', pagina: 'ModalPage' },
    { titulo: 'Popover', pagina: 'PopoverPage' },
    { titulo: 'Infinite Scroll', pagina: 'InfiniteScrollPage' },
    { titulo: 'Refresher', pagina: 'RefresherPage' },
    { titulo: 'Searchbar', pagina: 'SearchbarPage' },
    { titulo: 'Menus', pagina: 'MenusPage' },
    { titulo: 'Tabs', pagina: 'TabsPage' },
    { titulo: 'Virtual Scroll', pagina: 'VirtualScrollPage' }
  ];

  /**
   * Array de objetos contendo todas as páginas da lista de plugins.
   */
  public apis: Array<{ titulo: string; pagina: any }> = [
    { titulo: 'Pipes', pagina: 'PipesPage' },
    { titulo: 'Directives', pagina: 'DirectivesPage' },
    { titulo: 'Providers', pagina: 'ProvidersPage' },
    { titulo: 'Components', pagina: 'ComponentsPage' },
  ];

  /**
   * Array de objetos contendo todas as páginas da lista de plugins.
   */
  public plugins: Array<{ titulo: string; pagina: any }> = [
    { titulo: 'Camera', pagina: 'CameraPage' },
    { titulo: 'Geolocation', pagina: 'GeolocationPage' },
    { titulo: 'Network', pagina: 'NetworkPage' }
  ];

  /**
   * Variavel para controlar o menu de segmentação
   */
  public segmento: string = 'angular';

  /**
   * Metodo que leva para outra página a partir do nome do componentes da página passado por parametro
   * @param {string} pagina - Nome do componente lazy-loaded da página.
   */
  public irParaPagina(pagina: string) {
    this.router.navigateByUrl(pagina);
  }
}
