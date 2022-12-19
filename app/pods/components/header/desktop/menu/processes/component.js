import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeaderDesktopMenuProcessesComponent extends Component {
  @service i18n;

  get processes() {
    return [
      {
        label: this.i18n.t('ui.header.processes.lmpa'),
        icon: 'LMPA-icon',
        routeModel: 'for-low-melting-point-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.osp'),
        icon: 'OSP-soldering-green',
        routeModel: 'for-OSP-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.selective'),
        icon: 'selective-soldering',
        routeModel: 'for-selective-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.jet-fluxing'),
        icon: 'jet-fluxing',
        routeModel: 'for-jet-fluxing'
      },
      {
        label: this.i18n.t('ui.header.processes.hand'),
        icon: 'rework-and-repair',
        routeModel: 'for-hand-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.wave'),
        icon: 'wave-soldering',
        routeModel: 'for-wave-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.jet-pasting'),
        icon: 'solder-paste-jetting',
        routeModel: 'for-solder-paste-jetting'
      },
      {
        label: this.i18n.t('ui.header.processes.robot'),
        icon: 'robot-soldering',
        routeModel: 'for-robot-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.reflow'),
        icon: 'reflow-soldering',
        routeModel: 'for-reflow-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.spray'),
        icon: 'spray-fluxing',
        routeModel: 'for-spray-fluxing'
      },
      {
        label: this.i18n.t('ui.header.processes.laser'),
        icon: 'laser-soldering',
        routeModel: 'for-laser-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.stencil'),
        icon: 'stencil-printing',
        routeModel: 'for-stencil-printing'
      },
      {
        label: this.i18n.t('ui.header.processes.foam'),
        icon: 'foam-fluxing',
        routeModel: 'for-foam-fluxing'
      },
      {
        label: this.i18n.t('ui.header.processes.dispensing'),
        icon: 'dispensing',
        routeModel: 'for-dispensing'
      },
      {
        label: this.i18n.t('ui.header.processes.rework'),
        icon: 'rework-and-repair',
        routeModel: 'for-rework-and-repair'
      },
      {
        label: this.i18n.t('ui.header.processes.pre-tinning'),
        icon: 'pre-tinning',
        routeModel: 'for-pre-tinning'
      },
      {
        label: this.i18n.t('ui.header.processes.solder-bath'),
        icon: 'dip-soldering',
        routeModel: 'for-solder-bath-conditioning'
      },
      {
        label: this.i18n.t('ui.header.processes.vapor'),
        icon: 'vapour-phase-soldering',
        routeModel: 'for-vapor-phase-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.dip'),
        icon: 'dip-soldering',
        routeModel: 'for-dip-soldering'
      },
      {
        label: this.i18n.t('ui.header.processes.cleaning'),
        icon: 'drop-3',
        routeModel: 'for-general-cleaning'
      }
    ];
  }
}
