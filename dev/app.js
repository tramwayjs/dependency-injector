import container from './ServiceContainer';
import Animal from './Entity/Animal';
import Vet from './Entity/Vet';


container.register('name', 'cat');
container.factory('Animal', Animal);
container.factory('Vet', Vet);

const vet = container.get('Vet');