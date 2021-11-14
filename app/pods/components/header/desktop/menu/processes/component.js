import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class HeaderDesktopMenuProcessesComponent extends Component {
  @tracked processes = [
    {
      label: 'Low melting point soldering – LMPA™',
      icon: 'LMPA-icon',
      routeModel: 'for-low-melting-point-soldering'
    },
    {
      label: 'OSP soldering',
      icon: 'OSP-soldering-green',
      routeModel: 'for-OSP-soldering'
    },
    {
      label: 'Selective soldering',
      icon: 'selective-soldering',
      routeModel: 'for-selective-soldering'
    },
    {
      label: 'Jet fluxing',
      icon: 'jet-fluxing',
      routeModel: 'for-jet-fluxing'
    },
    {
      label: 'Hand soldering',
      icon: 'rework-and-repair',
      routeModel: 'for-hand-soldering'
    },
    {
      label: 'Wave soldering',
      icon: 'wave-soldering',
      routeModel: 'for-wave-soldering'
    },
    {
      label: 'Solder paste jetting',
      icon: 'solder-paste-jetting',
      routeModel: 'for-solder-paste-jetting'
    },
    {
      label: 'Robot soldering',
      icon: 'robot-soldering',
      routeModel: 'for-robot-soldering'
    },
    {
      label: 'Reflow soldering',
      icon: 'reflow-soldering',
      routeModel: 'for-reflow-soldering'
    },
    {
      label: 'Spray fluxing',
      icon: 'spray-fluxing',
      routeModel: 'for-spray-fluxing'
    },
    {
      label: 'Laser soldering',
      icon: 'laser-soldering',
      routeModel: 'for-laser-soldering'
    },
    {
      label: 'Stencil printing',
      icon: 'stencil-printing',
      routeModel: 'for-stencil-printing'
    },
    {
      label: 'Foam fluxing',
      icon: 'foam-fluxing',
      routeModel: 'for-foam-fluxing'
    },
    {
      label: 'Dispensing',
      icon: 'dispensing',
      routeModel: 'for-dispensing'
    },
    {
      label: 'Rework & repair',
      icon: 'rework-and-repair',
      routeModel: 'for-rework-and-repair'
    },
    {
      label: 'Pre-tinning',
      icon: 'pre-tinning',
      routeModel: 'for-pre-tinning'
    },
    {
      label: 'Solder bath conditioning',
      icon: 'dip-soldering',
      routeModel: 'for-solder-bath-conditioning'
    },
    {
      label: 'Vapor phase soldering',
      icon: 'vapour-phase-soldering',
      routeModel: 'for-vapor-phase-soldering'
    },
    {
      label: 'Dip soldering',
      icon: 'dip-soldering',
      routeModel: 'for-dip-soldering'
    },
    { label: 'Cleaning', icon: 'drop-3', routeModel: 'for-general-cleaning' }
  ];
}
