import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderDesktopMenuProcessesComponent extends Component {
  @service i18n;

  get processes() {
    return [
      {
        label: this.i18n.translate('Low melting point soldering – LMPA-Q'),
        icon: 'LMPA-icon',
        routeModel: 'for-low-melting-point-soldering'
      },
      {
        label: this.i18n.translate('OSP soldering', 'header'),
        icon: 'OSP-soldering-green',
        routeModel: 'for-OSP-soldering'
      },
      {
        label: this.i18n.translate('Selective soldering', 'header'),
        icon: 'selective-soldering',
        routeModel: 'for-selective-soldering'
      },
      {
        label: this.i18n.translate('Jet fluxing', 'header'),
        icon: 'jet-fluxing',
        routeModel: 'for-jet-fluxing'
      },
      {
        label: this.i18n.translate('Hand soldering', 'header'),
        icon: 'rework-and-repair',
        routeModel: 'for-hand-soldering'
      },
      {
        label: this.i18n.translate('Wave soldering', 'header'),
        icon: 'wave-soldering',
        routeModel: 'for-wave-soldering'
      },
      {
        label: this.i18n.translate('Solder paste jetting', 'header'),
        icon: 'solder-paste-jetting',
        routeModel: 'for-solder-paste-jetting'
      },
      {
        label: this.i18n.translate('Robot soldering', 'header'),
        icon: 'robot-soldering',
        routeModel: 'for-robot-soldering'
      },
      {
        label: this.i18n.translate('Reflow soldering', 'header'),
        icon: 'reflow-soldering',
        routeModel: 'for-reflow-soldering'
      },
      {
        label: this.i18n.translate('Spray fluxing', 'header'),
        icon: 'spray-fluxing',
        routeModel: 'for-spray-fluxing'
      },
      {
        label: this.i18n.translate('Laser soldering', 'header'),
        icon: 'laser-soldering',
        routeModel: 'for-laser-soldering'
      },
      {
        label: this.i18n.translate('Stencil printing', 'header'),
        icon: 'stencil-printing',
        routeModel: 'for-stencil-printing'
      },
      {
        label: this.i18n.translate('Foam fluxing', 'header'),
        icon: 'foam-fluxing',
        routeModel: 'for-foam-fluxing'
      },
      {
        label: this.i18n.translate('Dispensing', 'header'),
        icon: 'dispensing',
        routeModel: 'for-dispensing'
      },
      {
        label: this.i18n.translate('Rework & repair', 'header'),
        icon: 'rework-and-repair',
        routeModel: 'for-rework-and-repair'
      },
      {
        label: this.i18n.translate('Pre-tinning', 'header'),
        icon: 'pre-tinning',
        routeModel: 'for-pre-tinning'
      },
      {
        label: this.i18n.translate('Solder bath conditioning', 'header'),
        icon: 'dip-soldering',
        routeModel: 'for-solder-bath-conditioning'
      },
      {
        label: this.i18n.translate('Vapor phase soldering', 'header'),
        icon: 'vapour-phase-soldering',
        routeModel: 'for-vapor-phase-soldering'
      },
      {
        label: this.i18n.translate('Dip soldering', 'header'),
        icon: 'dip-soldering',
        routeModel: 'for-dip-soldering'
      },
      {
        label: this.i18n.translate('Cleaning', 'header'),
        icon: 'drop-3',
        routeModel: 'for-general-cleaning'
      }
    ];
  }
}
