/**
 * View of one listy item
 */
define(
    function(){

        /**
         * @param options
         * @constructor
         */
        function ListItemView(options) {
            this.model = options.model;
            this.el = options.el;
        }

        /**
         * render list item and subscribes for removing it
         * @returns {ListItemView}
         */
        ListItemView.prototype.render = function(){
            this.el.innerHTML = this.model.text + ' <button class="delete">Delete</button>';
            this.el.querySelector('.delete').addEventListener('click', ListItemView.prototype.remove.bind(this));
            return this;
        };

        /**
         * Removes list item
         */
        ListItemView.prototype.remove = function(){
            this.el.remove();
            this.model.remove();
        };

        return ListItemView;
    }
);
