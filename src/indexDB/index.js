
class IDB {
	constructor( collectionName ) {
		this.db = null;
		this.collection = collectionName;

		this.indexById = 'by_id';
		this.indexByTitle = 'by_title';
		this.indexByLabels = 'by_labels';

		const request = indexedDB.open('mercapp2');

		const that = this;
		request.onupgradeneeded = function() {
			const db = request.result;
			const insumosStore = db.createObjectStore('insumos', {
				keyPath: 'id',
				autoIncrement: true
			});
				
			// Crear indices
			insumosStore.createIndex( that.indexById, 'id', { unique: true } );
			insumosStore.createIndex( that.indexByTitle, 'title', { unique: false } );
			insumosStore.createIndex( that.indexByLabels, 'labels', { unique: false } );
		}

		request.onsuccess = function() {
			that.db = request.result;
		};

	}

	post( newInsumo ) {
		const tx = this.db.transaction( this.collection, 'readwrite' );
		const store = tx.objectStore( this.collection );

		store.put( newInsumo );

		return new Promise( (resolve, reject) => {
			tx.oncomplete = function() {
				resolve(true);
			};

			tx.onerror = function(err) {
				reject('Error al registrar un insumo: ', err);
			};
		} )
	}

	getAll() {

		const tx = this.db.transaction( this.collection, 'readonly' );
		const request = tx.objectStore( this.collection ).getAll();

		return new Promise( (resolve, reject) => {
			request.onsuccess = function(ev) {
				resolve( ev.target.result );
			};

			request.onerror = function(err) {
				reject( 'Error al obtener los insumos: ', err );
			};
		} )
	}

	delete( id ) {
		const tx = this.db.transaction( this.collection, 'readwrite' );
		const deleting = tx.objectStore( this.collection ).delete(id);

		return new Promise( (resolve, reject) => {
			deleting.onsuccess = () => {
				resolve( true );
			}

			deleting.onerror = () => {
				reject(`Error eliminando el insumo ${id}`);
			}
		})
	}

	update( insumo ) {
		const tx = this.db.transaction( this.collection, 'readwrite' );
		// coleccion
		const objectStore = tx.objectStore( this.collection );
		// obtengo el insumo de la base de datos
		const updating = objectStore.get(insumo.id);

		return new Promise( (resolve, reject) => {
			updating.onerror = (err) => {
				reject(`Insumo con id: ${insumo.id}, no conseguido: ${err}`);
			}

			// obtencion exitosa del insumo de la base de datos
			updating.onsuccess = () => {
				// actualizar insumo de la base de datos con la nueva informacion
				const updateInsumo = objectStore.put( insumo );

				// operacion exitosa de actualizacion
				updateInsumo.onsuccess = (ev) => {
					resolve( ev.target.result );
				}

				updateInsumo.onerror = (err) => {
					reject(`No fue posible actualizar el insumo con id ${insumo.id}: ${err}`);
				}

			}
		})
	}
}

export default IDB;
