import container from './index.js';

import Animal from './entities/Animal';
import Vet from './entities/Vet';


container.register('name', 'cat');
container.factory('Animal', Animal);
container.factory('Vet', Vet);

const vet = container.get('Vet');