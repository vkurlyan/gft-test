/**
 * Model of one list item
 */
define(['classes/Observer'],
    function(Observer){

        /**
         * @param text
         * @constructor
         */
        function List(text){
            List.prototype.constructor.apply(this);
            this.text = text || '';
        }

        /**
         * Inheritance
         */
        List.prototype = Object.create(Observer.prototype);
        List.prototype.constructor = Observer;

        /**
         * Remove one list item
         */
        List.prototype.remove = function() {
            this.trigger('remove', this);
            // remove from server
        };

        return List;
    }
);