Transforms CSV to JSON in accordance with the specifications set by the W3C’s [CSV on the Web Working Group](http://www.w3.org/2013/csvw).


## Getting Started

_(Coming soon)_


## Documentation

_(Coming soon)_


## Examples

```js
var request = require('request'),
    csvTransformer = require('csv-transformer');

var csv = 'http://example.com/test.csv',
    metadata = 'http://example.com/metadata.json',
    csvTransformer = new csvTransformer({
      csv: csv,
      metadata: metadata
    });

request.get(csv)
  .pipe(csvTransformer)
  .pipe(console.stdout);
```


## Contributing

*Contributions welcome*

## License

Copyright (c) 2015 Bill Ingram  
Licensed under the UofI-NCSA license.
