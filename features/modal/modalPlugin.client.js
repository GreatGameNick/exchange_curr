import {ModalService} from './modalService'

export default function ({app}, inject) {
  inject('modal', modalPluginArgs => new ModalService(modalPluginArgs, app.store))
}

