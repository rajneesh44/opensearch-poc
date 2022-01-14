import {IndicesExists} from '@opensearch-project/opensearch/api/requestParams';
import {readFileSync} from 'fs';
import { type } from 'os';
import path = require('path');
import City from '../types/city';
import osClient from '../utils/config';

export default class CityOsService {
  private indexName = 'cities';

  async initIndex() {
    const params: IndicesExists = {
      index: this.indexName,
    };
    const exists = await osClient.indices.exists(params);
    if (exists.body === true) {
      await osClient.indices.delete({index: this.indexName});
    }
    const response = await osClient.indices.create({index: this.indexName});
    await this.seedData();
    if (response.statusCode === 200) {
      console.log('Cities Index Created!');
    } else {
      throw new Error('Error in creating cities index. ' + response.warnings);
    }
  }

  private async seedData() {
    console.log('Seeding data into open search...');

    const rawdata: string = readFileSync(
      path.resolve(__dirname, '../../resources/cities.json'),
      'utf-8'
    );
    const cities: Array<City> = JSON.parse(rawdata);
    const bulk: any = [];

    // Loop through each city and create and push two objects into the array in each loop.
    // First object sends the index and type you will be saving the data as.
    // Second object is the data you want to index.
    cities.forEach(city => {
      bulk.push({
        index: {
          _index: this.indexName,
          _id: city.id,
        },
      });
      bulk.push(city);
    });

    await osClient.bulk({
      index: this.indexName,
      body: bulk,
      refresh: true,
    });
  }

  async searchCity(name: string, state: string) {
    const res = await osClient.search({
      index: this.indexName,
      body: this.buildQuery(name, state),
    });
    if (res.statusCode === 200) {
      const response = res.body;
      const cities: Array<any> = [];
      response.hits.hits.forEach((element: any) => {
        cities.push(element._source);
      });
      return Promise.resolve(cities);
    } else {
      throw new Error(res.toString());
    }
  }

  private buildQuery(name: string, state: string) {
    const must = [];
    if (name.length !== 0) {
      must.push({
        match_phrase_prefix: {
          name: {
            query: name,
            slop: 3,
          },
        },
      });
    }
    if (state.length !== 0) {
      must.push({
        match_phrase_prefix: {
          state: {
            query: state,
            slop: 3,
          },
        },
      });
    }
    const query = {
      query: {
        bool: {
          must: must,
        },
      },
    };
    return query;
  }
}



// product_type search
//   response:
//     name
//     desc 
//     price
//     ceategory
//     business