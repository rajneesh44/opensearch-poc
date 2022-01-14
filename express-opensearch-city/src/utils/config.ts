import {Client} from '@opensearch-project/opensearch';

const protocol = process.env.OS_PROTOCOL;
const auth = process.env.OS_AUTH;
const host = process.env.OS_HOST;
const port = process.env.OS_PORT;

const osClient: Client = new Client({
  node: protocol + '://' + auth + '@' + host + ':' + port,
});

export default osClient;
