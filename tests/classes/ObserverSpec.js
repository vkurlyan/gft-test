define(['classes/Observer'], function(Observer) {

    describe("Observer", function () {

        it("tests observer is defined", function () {
            expect(Observer).toBeDefined();
        });

        it("tests subscribing and publishing", function () {
            var observer = new Observer(),
                mock = jasmine.createSpyObj('mock', ['callBack']);

            observer.on('someEvent', mock.callBack);
            observer.trigger('someEvent', 'some argument');

            expect(mock.callBack).toHaveBeenCalledWith('some argument');
        });
    });

});