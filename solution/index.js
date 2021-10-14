module.exports = function (Homework) {
    const getLength = async (array) => {
        return new Promise(
            (resolve) => {
                array.length(resolve);
            },
            (reject) => {
                reject(new Error("Array has no length"));
            }
        );
    };
    const getItem = async (array, index) => {
        return new Promise(
            (resolve) => {
                array.get(index, resolve);
            },
            (reject) => {
                reject(new Error("Can't get a value from array"));
            }
        );
    };
    const accumulate = async (acc, item, index, array, fn) => {
        return new Promise((resolve) => {
            fn(acc, item, index, array, (res) => {
                resolve(res);
            }),
                (reject) => {
                    reject(new Error("Function execution error"));
                };
        });
    };
    return async (array, fn, initialValue, cb) => {
        let acc = initialValue;
        const length = await getLength(array);
        for (let index = 0; index < length; index++) {
            let item = await getItem(array, index);
            acc = await accumulate(acc, item, index, array, fn);
        }
        cb(acc);
    };
};
