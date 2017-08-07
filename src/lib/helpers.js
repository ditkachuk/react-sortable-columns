import range from 'lodash/range';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';

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
    _array[colTo].splice(rowTo, 0, val);

    if (colTo !== colFrom && fixed) {
        const data = flatten(_array);
        _array = toColumns(data, columns);
    }

    return _array;
};
