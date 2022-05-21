import { showCatalog } from './catalog.js';
import { showUpdate } from './update.js';
import { render } from './utility.js';
import { showCreate } from './create.js';

const root = document.body;
const ctx = {
    update
};
update();
function update(){
    render([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx)
    ], root);
}

