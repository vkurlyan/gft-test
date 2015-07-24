/**
 * Observer
 */
define(
    function(){
        /**
         * @constructor
         */
        function Observer() {
            this.subscribers = [];
        }

        /**
         * Method for subscribing
         * @param eventName
         * @param callBack
         */
        Observer.prototype.on = function(eventName, callBack){
            this.subscribers[eventName] = this.subscribers[eventName] || [];
            this.subscribers[eventName].push(callBack);
        };

        /**
         * Method for event triggering
         * @param eventName
         * @param data
         */
        Observer.prototype.trigger = function(eventName, data){
            this.subscribers[eventName] &&
            this.subscribers[eventName].forEach(
                function(callBack) {
                    callBack(data);
                }
            );
        };

        return Observer;
    }
);
