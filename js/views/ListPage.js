/**
 * View of List Page
 */
define(['views/List', 'models/List'],
    function(ListView, ListModel){

        /**
         * @param options
         * @constructor
         */
        function ListPageView(options) {
            this.el = options.el;
            this.listCollection = options.listCollection;
        }

        /**
         * Render list page
         * @returns {ListPageView}
         */
        ListPageView.prototype.render = function(){
            // Render page skeleton
            this.el.innerHTML = document.getElementById('list-page').innerHTML;

            // Render message about list quantity
            this.elementlistLength = this.el.querySelector('.list-length');
            this.listCollection.on('changed', this.collectionChanged.bind(this));
            this.collectionChanged();

            // Init adding list item
            this.elementNewItemText = this.el.querySelector('.new-item-text');
            this.el.querySelector('.add-list-item').addEventListener('submit', this.addListItem.bind(this));

            // Show list
            var listView = new ListView({
                listCollection: this.listCollection,
                el: this.el.querySelector('.list')
            });
            listView.render();

            return this;
        };

        /**
         * Render list quantity when collection is changed
         */
        ListPageView.prototype.collectionChanged = function(){
            this.elementlistLength.textContent = `${this.listCollection.collection.length} items in list`;
        };

        /**
         * Add list item to collection
         * @param e
         */
        ListPageView.prototype.addListItem = function(e){
            e.preventDefault();
            if (this.elementNewItemText.value){
                this.listCollection.add(new ListModel(this.elementNewItemText.value));
                this.elementNewItemText.value = "";
            }
        };

        return ListPageView;
    }
);
