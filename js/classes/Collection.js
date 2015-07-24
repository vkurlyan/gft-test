define(['classes/Observer'],
    function(Observer){
        /**
         * @param options
         * @constructor
         */
        function Collection(options) {
            Collection.prototype.constructor.apply(this);
            options = options || {};
            this.collection = options.collection || [];
            this.collection.forEach(function(model){
                model.on('remove', this.remove.bind(this));
            }, this);
        }

        // Inheritance
        Collection.prototype = Object.create(Observer.prototype);
        Collection.prototype.constructor = Observer;

        /**
         * Add model to collection
         * @param model
         */
        Collection.prototype.add = function(model){
            this.collection.push(model);
            model.on('remove', this.remove.bind(this));
            this.trigger('changed', this);
            this.trigger('add', model);
        };

        /**
         * Remove model from collection
         * @param model
         */
        Collection.prototype.remove = function(model) {
            var modelIndex = this.collection.indexOf(model);

            if (modelIndex > -1) {
                this.collection.splice(modelIndex, 1);
                this.trigger('changed', this);
            }
        };

        return Collection;
    }
);
