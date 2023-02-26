import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderDesktopMenuProcessesComponent extends Component {
  @service translation;

  get processes() {
    return [
      {
        label: this.translation.t(
          'Low melting point soldering – LMPA-Q',
          'header.9'
        ),
        icon: 'LMPA-icon',
        routeModel: 'for-low-melting-point-soldering'
      },
      {
        label: this.translation.t('OSP soldering', 'header.10'),
        icon: 'OSP-soldering-green',
        routeModel: 'for-OSP-soldering'
      },
      {
        label: this.translation.t('Selective soldering', 'header.11'),
        icon: 'selective-soldering',
        routeModel: 'for-selective-soldering'
      },
      {
        label: this.translation.t('Jet fluxing', 'header.12'),
        icon: 'jet-fluxing',
        routeModel: 'for-jet-fluxing'
      },
      {
        label: this.translation.t('Hand soldering', 'header.13'),
        icon: 'rework-and-repair',
        routeModel: 'for-hand-soldering'
      },
      {
        label: this.translation.t('Wave soldering', 'header.14'),
        icon: 'wave-soldering',
        routeModel: 'for-wave-soldering'
      },
      {
        label: this.translation.t('Solder paste jetting', 'header.15'),
        icon: 'solder-paste-jetting',
        routeModel: 'for-solder-paste-jetting'
      },
      {
        label: this.translation.t('Robot soldering', 'header.16'),
        icon: 'robot-soldering',
        routeModel: 'for-robot-soldering'
      },
      {
        label: this.translation.t('Reflow soldering', 'header.17'),
        icon: 'reflow-soldering',
        routeModel: 'for-reflow-soldering'
      },
      {
        label: this.translation.t('Spray fluxing', 'header.18'),
        icon: 'spray-fluxing',
        routeModel: 'for-spray-fluxing'
      },
      {
        label: this.translation.t('Laser soldering', 'header.19'),
        icon: 'laser-soldering',
        routeModel: 'for-laser-soldering'
      },
      {
        label: this.translation.t('Stencil printing', 'header.20'),
        icon: 'stencil-printing',
        routeModel: 'for-stencil-printing'
      },
      {
        label: this.translation.t('Foam fluxing', 'header.21'),
        icon: 'foam-fluxing',
        routeModel: 'for-foam-fluxing'
      },
      {
        label: this.translation.t('Dispensing', 'header.22'),
        icon: 'dispensing',
        routeModel: 'for-dispensing'
      },
      {
        label: this.translation.t('Rework & repair', 'header.23'),
        icon: 'rework-and-repair',
        routeModel: 'for-rework-and-repair'
      },
      {
        label: this.translation.t('Pre-tinning', 'header.24'),
        icon: 'pre-tinning',
        routeModel: 'for-pre-tinning'
      },
      {
        label: this.translation.t('Solder bath conditioning', 'header.25'),
        icon: 'dip-soldering',
        routeModel: 'for-solder-bath-conditioning'
      },
      {
        label: this.translation.t('Vapor phase soldering', 'header.26'),
        icon: 'vapour-phase-soldering',
        routeModel: 'for-vapor-phase-soldering'
      },
      {
        label: this.translation.t('Dip soldering', 'header.27'),
        icon: 'dip-soldering',
        routeModel: 'for-dip-soldering'
      },
      {
        label: this.translation.t('Cleaning', 'header.28'),
        icon: 'drop-3',
        routeModel: 'for-general-cleaning'
      }
    ];
  }
}
