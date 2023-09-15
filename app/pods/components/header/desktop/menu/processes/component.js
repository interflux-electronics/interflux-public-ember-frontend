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
        routeModel: 'low-melting-point-soldering'
      },
      {
        label: this.translation.t('OSP soldering', 'header.10'),
        icon: 'OSP-soldering-green',
        routeModel: 'OSP-soldering'
      },
      {
        label: this.translation.t('Selective soldering', 'header.11'),
        icon: 'selective-soldering',
        routeModel: 'selective-soldering'
      },
      {
        label: this.translation.t('Jet fluxing', 'header.12'),
        icon: 'jet-fluxing',
        routeModel: 'jet-fluxing'
      },
      {
        label: this.translation.t('Hand soldering', 'header.13'),
        icon: 'rework-and-repair',
        routeModel: 'hand-soldering'
      },
      {
        label: this.translation.t('Wave soldering', 'header.14'),
        icon: 'wave-soldering',
        routeModel: 'wave-soldering'
      },
      {
        label: this.translation.t('Solder paste jetting', 'header.15'),
        icon: 'solder-paste-jetting',
        routeModel: 'solder-paste-jetting'
      },
      {
        label: this.translation.t('Robot soldering', 'header.16'),
        icon: 'robot-soldering',
        routeModel: 'robot-soldering'
      },
      {
        label: this.translation.t('Reflow soldering', 'header.17'),
        icon: 'reflow-soldering',
        routeModel: 'reflow-soldering'
      },
      {
        label: this.translation.t('Spray fluxing', 'header.18'),
        icon: 'spray-fluxing',
        routeModel: 'spray-fluxing'
      },
      {
        label: this.translation.t('Laser soldering', 'header.19'),
        icon: 'laser-soldering',
        routeModel: 'laser-soldering'
      },
      {
        label: this.translation.t('Stencil printing', 'header.20'),
        icon: 'stencil-printing',
        routeModel: 'stencil-printing'
      },
      {
        label: this.translation.t('Foam fluxing', 'header.21'),
        icon: 'foam-fluxing',
        routeModel: 'foam-fluxing'
      },
      {
        label: this.translation.t('Dispensing', 'header.22'),
        icon: 'dispensing',
        routeModel: 'dispensing'
      },
      {
        label: this.translation.t('Rework & repair', 'header.23'),
        icon: 'rework-and-repair',
        routeModel: 'rework-and-repair'
      },
      {
        label: this.translation.t('Pre-tinning', 'header.24'),
        icon: 'pre-tinning',
        routeModel: 'pre-tinning'
      },
      {
        label: this.translation.t('Solder bath conditioning', 'header.25'),
        icon: 'dip-soldering',
        routeModel: 'solder-bath-conditioning'
      },
      {
        label: this.translation.t('Vapor phase soldering', 'header.26'),
        icon: 'vapour-phase-soldering',
        routeModel: 'vapor-phase-soldering'
      },
      {
        label: this.translation.t('Dip soldering', 'header.27'),
        icon: 'dip-soldering',
        routeModel: 'dip-soldering'
      },
      {
        label: this.translation.t('Cleaning', 'header.28'),
        icon: 'drop-3',
        routeModel: 'general-cleaning'
      }
    ];
  }
}
