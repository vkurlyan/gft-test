/**
 * View of list
 */
define(['views/ListItem'],
    function(listItem){

        /**
         * @param options
         * @constructor
         */
        function ListView(options) {
            this.listCollection = options.listCollection;
            this.el = options.el;
        }

        /**
         * Render
         * @returns {ListView}
         */
        ListView.prototype.render = function(){
            this.listCollection.collection.forEach(this.addNewItem.bind(this));
            this.listCollection.on('add', this.addNewItem.bind(this));
            return this;
        };

        /**
         * Add new item to a list
         * @param model
         */
        ListView.prototype.addNewItem = function(model){
            var listItemView = new listItem({
                model: model,
                el: document.createElement("li")
            });
            this.el.appendChild(listItemView.render().el);
        };

        return ListView;
    }
);
