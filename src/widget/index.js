import widget from "./inviteWidget"
if(!customElements.get('invite-widget')) {
    window.customElements.define('invite-widget', widget);
}