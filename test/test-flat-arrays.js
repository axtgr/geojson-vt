import test from 'tape';
import geojsonvt from '../src/index.js';

test('works with a flat array as coordinates', (t) => {
    const array = [[-5, -5], [5, 5]];
    const flatArray = [];

    array.forEach(([lon, lat], i) => {
        flatArray[i * 2] = lon;
        flatArray[i * 2 + 1] = lat;
    });

    const expected = geojsonvt({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: array
        },
    });

    const result = geojsonvt({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: flatArray
        },
    });

    t.equal(JSON.stringify(result), JSON.stringify(expected));
    t.end();
});


test('works with an array buffer as coordinates', (t) => {
    const array = [[-5, -5], [5, 5]];
    const buffer = new ArrayBuffer(array.length * 2 * 4);
    const float32Array = new Float32Array(buffer);

    array.forEach(([lon, lat], i) => {
        float32Array[i * 2] = lon;
        float32Array[i * 2 + 1] = lat;
    });

    const expected = geojsonvt({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: array
        },
    });

    const result = geojsonvt({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: float32Array
        },
    });

    t.equal(JSON.stringify(result), JSON.stringify(expected));
    t.end();
});
