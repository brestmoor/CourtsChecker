const onCompletion = (onSuccess, onError) => {
    return (promise) => promise.then(onSuccess).catch(onError)
};


module.exports.onCompletion = onCompletion