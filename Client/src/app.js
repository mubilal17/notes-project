import Vue from 'vue'
import App from './Vue Views/App.vue'
import { Workspace } from './Workspace.js'
Vue.config.productionTip = false;

async function init()
{
    const response = await fetch('/api/workspace?workspaceId=1');
    const data = await response.json();
    let workspace = new Workspace(data);
    const section = workspace.getSection(1);
    section.Id = 6;
    console.log(section.Id);
}

init()

new Vue({
    el: '#app',
    template: '<App />',
    components: { App }
});