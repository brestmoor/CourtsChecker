const pipeline = require('../pipeline');

export default (req, res) => {
    return pipeline.checkCourtsEventHandler();
}