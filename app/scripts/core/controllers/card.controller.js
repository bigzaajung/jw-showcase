/**
 * Copyright 2015 Longtail Ad Solutions Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 **/

(function () {

    angular
        .module('app.core')
        .controller('CardController', CardController);

    /**
     * @ngdoc controller
     * @name app.core.controller:CardController
     * @requires app.core.utils
     */
    CardController.$inject = ['utils'];
    function CardController (utils) {

        var vm = this;

        vm.duration       = 0;
        vm.getClassNames  = getClassNames;
        vm.onClickHandler = onClickHandler;

        activate();

        ////////////////

        /**
         * Initialize controller
         */
        function activate () {

            vm.duration = utils.getVideoDurationByItem(vm.item);
        }

        /**
         * @returns {Object.<string, boolean>}
         */
        function getClassNames () {

            return {
                'jw-card--featured': vm.featured,
                'jw-card--default':  !vm.featured,
                'jw-card--touch':    'ontouchstart' in window ||
                                     (window.DocumentTouch && document instanceof window.DocumentTouch)
            };
        }

        /**
         * @param {Object}      event               Event object
         * @param {boolean}     clickedOnPlayIcon   True if the user clicked on the play icon
         */
        function onClickHandler (event, clickedOnPlayIcon) {

            if (angular.isFunction(vm.onClick)) {
                vm.onClick(vm.item, clickedOnPlayIcon);
            }

            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

}());
