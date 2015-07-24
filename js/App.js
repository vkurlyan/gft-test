define(['controllers/List'],
    function (listController){
        function init(){

            // Router should be implemented here
            // But we have only one controller. So execute it
            listController.execute();
        }

        return {
            init: init
        };
    }
);
