import range from 'lodash/range';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import find from 'lodash/find';

export const springSetting = { stiffness: 150, damping: 16 };

export const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

export const calculateVisiblePositions = (newOrder, width, height) => {
    return newOrder.map((column, col) => {
       return range(column.length + 1).map((item, row) => {
           return [width * col, height * row];
       });
   });
}

export const toColumns = (data, columns) => {
    return chunk(data, Math.ceil(data.length / columns));
};

export const reinsert = (array, colFrom, rowFrom, colTo, rowTo, columns, fixed) => {
    rowTo = Math.min(rowTo, array[colTo].length - 1);

    var _array = array.slice(0);
    const val = _array[colFrom][rowFrom];

    _array[colFrom].splice(rowFrom, 1);
    _array[colTo].splice(rowTo === 0 && colTo !== colFrom && fixed ? rowTo + 1 : rowTo, 0, val);

    if (colTo !== colFrom && fixed) {
        const data = flatten(_array);
        _array = toColumns(data, columns);
    }

    return _array;
};

export const getOrder = (columns) => {
    return flatten(columns);
};

export const reorderData = (data, columns, getKey) => {
    const order = getOrder(columns);

    return getKey ? map(order, key => find(data, item => getKey(item) === key))
        : map(order, row => data[Number(row)]);
};

export const itemStyles = {
    boxSizing: 'border-box',
    position: 'absolute',
    userSelect: 'none',
};
