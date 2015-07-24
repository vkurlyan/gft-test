define(['classes/Collection', 'views/ListPage', 'models/List'], function(Collection, ListPageView, ListModel) {

    describe("List Page", function () {

        var listCollection,
            addItemElement,
            addItemButton,
            listLengthElement,
            contentElement = document.createElement('div'),
            script = document.createElement('script');

        // Add template on a page
        script.type = 'text/template';
        script.id = 'list-page';
        script.innerHTML = '<form class="add-list-item">\
        <input class="new-item-text" type="text" placeholder="Add items to list"/>\
        <input type="submit" value="Add"/></form><ul class="list"></ul><div class="list-length"></div>';
        document.body.appendChild(script);
        document.body.appendChild(contentElement);

        // Create collection
        listCollection = new Collection({
            collection: [
                new ListModel('Test 1'),
                new ListModel('Test 2'),
                new ListModel('Test 3')
            ]
        });

        // render page
        (new ListPageView({
            listCollection: listCollection,
            el: contentElement
        })).render();

        addItemElement = contentElement.querySelector('.new-item-text');
        addItemButton = contentElement.querySelector('.add-list-item input[type="submit"]');
        listLengthElement = contentElement.querySelector('.list-length');

        it("checks whether list page was rendered", function () {
            expect(addItemElement).not.toBeNull();
            expect(addItemButton).not.toBeNull();
            expect(listLengthElement).not.toBeNull();
        });

        it("checks message about list quantity on load", function () {
            expect(listLengthElement.textContent).toMatch("3");
        });

        it("checks adding of item to a list", function (done) {
            addItemElement.value = "New Item";
            addItemButton.click();
            setTimeout(function(){
                expect(listCollection.collection.length).toEqual(4);
                expect(listLengthElement.textContent).toMatch("4");
                done();
            }, 0);
        });

        it("checks removing of item from a list", function (done) {
            var removeButton = contentElement.querySelector('.list .delete');
            removeButton.click();
            setTimeout(function(){
                expect(listCollection.collection.length).toEqual(3);
                expect(listLengthElement.textContent).toMatch("3");
                done();
            }, 0);
        });


    });

});