import * as zrUtil from 'zrender/src/core/util';

var coordinateSystemCreators = {};

function CoordinateSystemManager() {

    this._coordinateSystems = [];
}

CoordinateSystemManager.prototype = {

    constructor: CoordinateSystemManager,

    create: function (ecModel, api) {
        var coordinateSystems = [];
        zrUtil.each(coordinateSystemCreators, function (creater, type) {
            var list = creater.create(ecModel, api);
            coordinateSystems = coordinateSystems.concat(list || []);
        });

        this._coordinateSystems = coordinateSystems;
    },

    update: function (ecModel, api) {
        zrUtil.each(this._coordinateSystems, function (coordSys) {
            coordSys.update && coordSys.update(ecModel, api);
        });
    },

    getCoordinateSystems: function () {
        return this._coordinateSystems.slice();
    }
};

CoordinateSystemManager.register = function (type, coordinateSystemCreator) {
    coordinateSystemCreators[type] = coordinateSystemCreator;
};

CoordinateSystemManager.get = function (type) {
    return coordinateSystemCreators[type];
};

export default CoordinateSystemManager;