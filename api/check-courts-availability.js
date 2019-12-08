const pipeline = require('/pipeline');``

export default (req, res) => {
    pipeline.checkCourtsEventHandler();
    res.json({ name: 'John', email: 'courts checked' })
}