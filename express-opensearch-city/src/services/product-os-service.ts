import {IndicesExists} from '@opensearch-project/opensearch/api/requestParams';
import {readFileSync} from 'fs';
import { type } from 'os';
import path = require('path');
import Product from '../types/product';
import osClient from '../utils/config';

export default class ProductOsService {
  private indexName = 'products';

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
      console.log('products Index Created!');
    } else {
      throw new Error('Error in creating products index. ' + response.warnings);
    }
  }

  private async seedData() {
    console.log('Seeding data into open search...');

    const rawdata: string = readFileSync(
      path.resolve(__dirname, '../../resources/data3.json'),
      'utf-8'
    );
    const products: Array<Product> = JSON.parse(rawdata);
    const bulk: any = [];

    // Loop through each product and create and push two objects into the array in each loop.
    // First object sends the index and type you will be saving the data as.
    // Second object is the data you want to index.
    products.forEach(product => {
      bulk.push({
        index: {
          _index: this.indexName,
          _id: product.id,
        },
      });
      bulk.push(product);
    });

    await osClient.bulk({
      index: this.indexName,
      body: bulk,
      refresh: true,
    });
  }

  async searchProduct(sq: string) {
    const res = await osClient.search({
      index: this.indexName,
      body: this.buildQuery(sq),
    });

    if (res.statusCode === 200) {
      const response = res.body;
      const products: Array<any> = [];
      response.hits.hits.forEach((element: any) => {
        products.push(element._source);
      });
      return Promise.resolve(products);
    } else {
      throw new Error(res.toString());
    }
  }

  private buildQuery(sq: string) {
    const must = [];
    if (sq.length !== 0) {
      must.push({
        match_phrase_prefix: {
          brand: {
            query: sq,
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


