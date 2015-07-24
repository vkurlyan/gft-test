define(['classes/Collection', 'views/ListPage'],
    function(Collection, ListPageView){

        /**
         * Create list collection and render view
         */
        function execute(){
            this.listCollection = this.listCollection || new Collection();

            (new ListPageView({
                listCollection: this.listCollection,
                el: document.querySelector('.content')
            })).render();
        }

        return {
            execute: execute
        };
    }
);
