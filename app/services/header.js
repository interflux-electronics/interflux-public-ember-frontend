import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeaderService extends Service {
  @tracked title = 'Interflux';
  @tracked crumbs = [];
  @tracked backRoute = 'index';
  @tracked backModel = null;

  get productLinks() {
    return [
      {
        label: 'LMPA-Q',
        route: 'products.use',
        model: 'low-melting-point-soldering',
        i18n: 'header.30'
      },
      {
        label: 'Soldering fluxes',
        route: 'products.family',
        model: 'soldering-fluxes',
        i18n: 'header.31'
      },
      {
        label: 'Solder pastes',
        route: 'products.family',
        model: 'solder-pastes',
        i18n: 'header.32'
      },
      {
        label: 'Solder wires',
        route: 'products.family',
        model: 'solder-wires',
        i18n: 'header.33'
      },
      {
        label: 'Solder alloys',
        route: 'products.family',
        model: 'solder-alloys',
        i18n: 'header.34'
      },
      {
        label: 'Auxiliaries',
        route: 'products.family',
        model: 'auxiliaries',
        i18n: 'header.35'
      },
      {
        label: 'Fluxing systems',
        route: 'products.family',
        model: 'fluxing-systems',
        i18n: 'header.36'
      },
      {
        label: 'All products',
        route: 'products.index',
        model: null,
        i18n: 'header.39'
      }
    ];
  }

  get processLinks() {
    return [
      {
        label: 'Low melting point soldering – LMPA-Q',
        i18n: 'header.9',
        icon: 'LMPA-icon',
        route: 'products.use',
        model: 'low-melting-point-soldering'
      },
      {
        label: 'OSP soldering',
        i18n: 'header.10',
        icon: 'OSP-soldering-green',
        route: 'products.use',
        model: 'OSP-soldering'
      },
      {
        label: 'Selective soldering',
        i18n: 'header.11',
        icon: 'selective-soldering',
        route: 'products.use',
        model: 'selective-soldering'
      },
      {
        label: 'Jet fluxing',
        i18n: 'header.12',
        icon: 'jet-fluxing',
        route: 'products.use',
        model: 'jet-fluxing'
      },
      {
        label: 'Hand soldering',
        i18n: 'header.13',
        icon: 'rework-and-repair',
        route: 'products.use',
        model: 'hand-soldering'
      },
      {
        label: 'Wave soldering',
        i18n: 'header.14',
        icon: 'wave-soldering',
        route: 'products.use',
        model: 'wave-soldering'
      },
      {
        label: 'Solder paste jetting',
        i18n: 'header.15',
        icon: 'solder-paste-jetting',
        route: 'products.use',
        model: 'solder-paste-jetting'
      },
      {
        label: 'Robot soldering',
        i18n: 'header.16',
        icon: 'robot-soldering',
        route: 'products.use',
        model: 'robot-soldering'
      },
      {
        label: 'Reflow soldering',
        i18n: 'header.17',
        icon: 'reflow-soldering',
        route: 'products.use',
        model: 'reflow-soldering'
      },
      {
        label: 'Spray fluxing',
        i18n: 'header.18',
        icon: 'spray-fluxing',
        route: 'products.use',
        model: 'spray-fluxing'
      },
      {
        label: 'Laser soldering',
        i18n: 'header.19',
        icon: 'laser-soldering',
        route: 'products.use',
        model: 'laser-soldering'
      },
      {
        label: 'Stencil printing',
        i18n: 'header.20',
        icon: 'stencil-printing',
        route: 'products.use',
        model: 'stencil-printing'
      },
      {
        label: 'Foam fluxing',
        i18n: 'header.21',
        icon: 'foam-fluxing',
        route: 'products.use',
        model: 'foam-fluxing'
      },
      {
        label: 'Dispensing',
        i18n: 'header.22',
        icon: 'dispensing',
        route: 'products.use',
        model: 'dispensing'
      },
      {
        label: 'Rework & repair',
        i18n: 'header.23',
        icon: 'rework-and-repair',
        route: 'products.use',
        model: 'rework-and-repair'
      },
      {
        label: 'Pre-tinning',
        i18n: 'header.24',
        icon: 'pre-tinning',
        route: 'products.use',
        model: 'pre-tinning'
      },
      {
        label: 'Solder bath conditioning',
        i18n: 'header.25',
        icon: 'dip-soldering',
        route: 'products.use',
        model: 'solder-bath-conditioning'
      },
      {
        label: 'Vapor phase soldering',
        i18n: 'header.26',
        icon: 'vapour-phase-soldering',
        route: 'products.use',
        model: 'vapor-phase-soldering'
      },
      {
        label: 'Dip soldering',
        i18n: 'header.27',
        icon: 'dip-soldering',
        route: 'products.use',
        model: 'dip-soldering'
      },
      {
        label: 'Cleaning',
        i18n: 'header.28',
        icon: 'drop-3',
        route: 'products.use',
        model: 'general-cleaning'
      }
    ];
  }
}
