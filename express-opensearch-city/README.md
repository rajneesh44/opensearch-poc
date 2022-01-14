# express-opensearch-city
A demo project built with ExpressJS which allows to search city by name and state. Search is leveraged by OpenSearch.

## How to start?
- Clone the project.
- Run `npm i`.
- Create a `.env` file in the root folder of the project and copy `.sample-env` contents to it.
- Run `docker-compose up`.
- Then, run `npm start`.
- Done. Hit `http://localhost:3000/api/v1/city/search` with query parameters `name` or `state` or both.

## Note:
- Data is seeded by cities.json file in resource folder.
- OpenSearch Dashboard can also be visited at `http://localhost:5601` with username as `admin` & password as `admin`.
